from __future__ import annotations

import argparse
import copy
import json
import logging
import re
import subprocess
import sys
import tempfile
import time
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urlencode, urljoin
from urllib.request import Request, urlopen
from typing import Any

from kp_lstm_forecaster import KpLstmForecast, KpLstmForecaster

UTC = timezone.utc
BASE_DIR = Path(__file__).resolve().parent
DEFAULT_CONFIG_PATH = BASE_DIR / "config.json"
DEFAULT_CONFIG: dict[str, Any] = {
    "poll_interval_seconds": 300,
    "output_dir": "output",
    "download_images": True,
    "alerting": {
        "min_level": "warning",
        "webhook_url": "",
    },
    "intermagnet": {
        "stations": ["BOU", "FRD", "OTT"],
        "hours_back": 6,
    },
    "kp_lstm": {
        "enabled": True,
        "lookback_points": 18,
        "forecast_horizon_minutes": 180,
        "training_history_limit": 720,
        "max_training_samples": 160,
        "min_training_samples": 24,
        "hidden_size": 6,
        "epochs": 12,
        "learning_rate": 0.015,
        "gradient_clip": 1.5,
        "random_seed": 42,
        "archive_enabled": True,
        "archive_training_days": 2190,
        "archive_sample_ratio": 0.45,
    },
    "thresholds": {
        "kp_watch": 5.0,
        "kp_warning": 7.0,
        "solar_wind_speed_watch": 600.0,
        "solar_wind_speed_warning": 750.0,
        "bz_watch": -10.0,
        "bz_warning": -18.0,
        "density_watch": 20.0,
        "density_warning": 35.0,
        "ground_delta_watch_nt": 120.0,
        "ground_delta_warning_nt": 250.0,
        "risk_watch_percent": 35.0,
        "risk_warning_percent": 60.0,
        "risk_severe_percent": 85.0,
    },
}
DAILY_GEOMAGNETIC_URL = "https://services.swpc.noaa.gov/text/daily-geomagnetic-indices.txt"


def utc_now() -> datetime:
    return datetime.now(tz=UTC)


def parse_iso8601(value: str) -> datetime:
    normalized = value.replace("Z", "+00:00")
    return datetime.fromisoformat(normalized)


def format_utc_minute_precision(value: datetime) -> str:
    normalized = value.astimezone(UTC).replace(second=0, microsecond=0)
    return normalized.strftime("%Y-%m-%dT%H:%MZ")


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def unlink_if_exists(path: Path) -> None:
    try:
        path.unlink()
    except FileNotFoundError:
        pass


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def write_json(path: Path, payload: dict[str, Any]) -> None:
    ensure_dir(path.parent)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, ensure_ascii=False)


def append_jsonl(path: Path, payload: dict[str, Any]) -> None:
    ensure_dir(path.parent)
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload, ensure_ascii=False) + "\n")


def load_jsonl(path: Path, limit: int | None = None) -> list[dict[str, Any]]:
    if not path.exists():
        return []

    records: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            try:
                payload = json.loads(line)
            except json.JSONDecodeError:
                continue
            if isinstance(payload, dict):
                records.append(payload)

    if limit is not None and limit >= 0:
        return records[-limit:]
    return records


def default_config() -> dict[str, Any]:
    return copy.deepcopy(DEFAULT_CONFIG)


def resolve_config_path(config_arg: str | Path | None) -> Path:
    requested = Path(config_arg) if config_arg is not None else DEFAULT_CONFIG_PATH
    candidates = [requested] if requested.is_absolute() else [Path.cwd() / requested, BASE_DIR / requested]

    for candidate in candidates:
        if candidate.exists():
            return candidate

    target = candidates[-1]
    example_candidates = [
        target.with_name("config.example.json"),
        BASE_DIR / "config.example.json",
    ]
    for example_path in example_candidates:
        if example_path.exists():
            write_json(target, load_json(example_path))
            return target

    write_json(target, default_config())
    return target


class HttpClient:
    def __init__(self, timeout_seconds: int = 30) -> None:
        self.timeout_seconds = timeout_seconds
        self.user_agent = "space-weather-early-warning/1.0"

    def _build_url(self, url: str, params: dict[str, Any] | None = None) -> str:
        if not params:
            return url
        query = urlencode(params)
        separator = "&" if "?" in url else "?"
        return f"{url}{separator}{query}"

    @staticmethod
    def _ps_quote(value: str) -> str:
        return value.replace("'", "''")

    def _should_use_powershell_fallback(self, exc: Exception) -> bool:
        message = str(exc).lower()
        return sys.platform.startswith("win") and (
            "unknown url type: https" in message
            or "ssl" in message
            or "certificate" in message
        )

    def _powershell_text(self, url: str, params: dict[str, Any] | None = None) -> str:
        full_url = self._build_url(url, params=params)
        with tempfile.NamedTemporaryFile(delete=False, suffix=".txt") as handle:
            temp_path = Path(handle.name)

        try:
            script = (
                f"Invoke-WebRequest -UseBasicParsing -Headers @{{'User-Agent'='{self._ps_quote(self.user_agent)}'}} "
                f"-Uri '{self._ps_quote(full_url)}' "
                f"-OutFile '{self._ps_quote(str(temp_path))}'"
            )
            subprocess.run(
                ["powershell", "-NoProfile", "-Command", script],
                check=True,
                capture_output=True,
                text=True,
                encoding="utf-8",
            )
            return temp_path.read_text(encoding="utf-8-sig")
        finally:
            unlink_if_exists(temp_path)

    def _powershell_download(self, url: str, target_path: Path) -> None:
        script = (
            f"Invoke-WebRequest -UseBasicParsing -Headers @{{'User-Agent'='{self._ps_quote(self.user_agent)}'}} "
            f"-Uri '{self._ps_quote(url)}' "
            f"-OutFile '{self._ps_quote(str(target_path))}'"
        )
        subprocess.run(
            ["powershell", "-NoProfile", "-Command", script],
            check=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )

    def _powershell_post_json(self, url: str, payload: dict[str, Any]) -> None:
        body = json.dumps(payload, ensure_ascii=False)
        script = (
            f"$body = '{self._ps_quote(body)}'; "
            f"Invoke-WebRequest -UseBasicParsing -Method POST -ContentType 'application/json' "
            f"-Headers @{{'User-Agent'='{self._ps_quote(self.user_agent)}'}} "
            f"-Uri '{self._ps_quote(url)}' -Body $body | Out-Null"
        )
        subprocess.run(
            ["powershell", "-NoProfile", "-Command", script],
            check=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
        )

    def get_json(self, url: str, params: dict[str, Any] | None = None) -> Any:
        return json.loads(self.get_text(url, params=params))

    def get_text(self, url: str, params: dict[str, Any] | None = None) -> str:
        try:
            request = Request(
                self._build_url(url, params=params),
                headers={"User-Agent": self.user_agent},
            )
            with urlopen(request, timeout=self.timeout_seconds) as response:
                charset = response.headers.get_content_charset() or "utf-8"
                return response.read().decode(charset)
        except Exception as exc:  # noqa: BLE001
            if self._should_use_powershell_fallback(exc):
                return self._powershell_text(url, params=params)
            raise

    def download_file(self, url: str, target_path: Path) -> Path:
        ensure_dir(target_path.parent)
        try:
            request = Request(url, headers={"User-Agent": self.user_agent})
            with urlopen(request, timeout=self.timeout_seconds) as response:
                with target_path.open("wb") as handle:
                    while True:
                        chunk = response.read(8192)
                        if not chunk:
                            break
                        handle.write(chunk)
        except Exception as exc:  # noqa: BLE001
            if self._should_use_powershell_fallback(exc):
                self._powershell_download(url, target_path)
            else:
                raise
        return target_path

    def post_json(self, url: str, payload: dict[str, Any]) -> None:
        try:
            body = json.dumps(payload).encode("utf-8")
            request = Request(
                url,
                data=body,
                headers={
                    "User-Agent": self.user_agent,
                    "Content-Type": "application/json",
                },
                method="POST",
            )
            with urlopen(request, timeout=self.timeout_seconds):
                return
        except Exception as exc:  # noqa: BLE001
            if self._should_use_powershell_fallback(exc):
                self._powershell_post_json(url, payload)
                return
            raise


@dataclass
class NoaaSnapshot:
    observed_at: str
    solar_wind_speed_km_s: float | None
    proton_density_p_cm3: float | None
    bz_nt: float | None
    bt_nt: float | None
    kp: float | None
    kp_estimated: float | None = None
    kp_lstm_forecast: KpLstmForecast | None = None


@dataclass
class IntermagnetStationSnapshot:
    station: str
    last_time: str | None
    component: str | None
    last_value_nt: float | None
    delta_nt: float | None
    samples: int
    error: str | None = None


class NoaaSwpcClient:
    MAG_URLS = [
        "https://services.swpc.noaa.gov/json/rtsw/rtsw_mag_1m.json",
        "https://services.swpc.noaa.gov/products/solar-wind/mag-2-hour.json",
    ]
    PLASMA_URLS = [
        "https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json",
        "https://services.swpc.noaa.gov/products/solar-wind/plasma-2-hour.json",
    ]
    KP_URL = "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json"
    OBSERVED_KP_URL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"
    DAILY_GEOMAGNETIC_URL = DAILY_GEOMAGNETIC_URL

    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def _fetch_first_available(self, urls: list[str]) -> Any:
        errors: list[str] = []
        for url in urls:
            try:
                return self.http.get_json(url)
            except Exception as exc:  # noqa: BLE001
                errors.append(f"{url}: {exc}")
        raise RuntimeError("NOAA verisi alinamadi: " + " | ".join(errors))

    @staticmethod
    def _normalize_rows(payload: Any) -> list[dict[str, Any]]:
        if not isinstance(payload, list) or not payload:
            return []

        first = payload[0]
        if isinstance(first, dict):
            return [row for row in payload if isinstance(row, dict)]

        if isinstance(first, list) and len(payload) >= 2:
            headers = first
            parsed: list[dict[str, Any]] = []
            for row in payload[1:]:
                if not isinstance(row, list) or len(row) != len(headers):
                    continue
                parsed.append(dict(zip(headers, row)))
            return parsed

        return []

    @staticmethod
    def _safe_float(value: Any) -> float | None:
        try:
            if value in (None, "", "null"):
                return None
            return float(value)
        except (TypeError, ValueError):
            return None

    @staticmethod
    def _pick_latest_row(rows: list[dict[str, Any]]) -> dict[str, Any]:
        if not rows:
            return {}

        def row_sort_key(row: dict[str, Any]) -> tuple[int, str]:
            active = bool(row.get("active")) if "active" in row else True
            time_tag = str(row.get("time_tag", ""))
            return (1 if active else 0, time_tag)

        return max(rows, key=row_sort_key)

    @staticmethod
    def _parse_time_tag(value: Any) -> datetime | None:
        text = str(value or "").strip()
        if not text:
            return None
        if " " in text and "T" not in text:
            text = text.replace(" ", "T")
        if text.endswith("Z"):
            text = text[:-1] + "+00:00"
        try:
            parsed = datetime.fromisoformat(text)
        except ValueError:
            return None
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=UTC)
        return parsed.astimezone(UTC)

    def _extract_kp_value(self, row: dict[str, Any]) -> float | None:
        estimated_value = self._safe_float(row.get("estimated_kp"))
        if estimated_value is not None:
            return estimated_value

        fallback_value = self._safe_float(row.get("kp_index"))
        if fallback_value is None:
            return None

        # Some NOAA 1-minute rows surface a placeholder 0.0 via kp_index while
        # the actual estimated_kp field is blank. Ignore that row and fall back
        # to the latest real estimate instead of publishing a false zero.
        kp_label = str(row.get("kp", "")).strip()
        if fallback_value == 0.0 and not kp_label:
            return None

        return fallback_value

    def _pick_latest_estimated_kp_row(self, rows: list[dict[str, Any]]) -> dict[str, Any]:
        valid_rows = [row for row in rows if self._extract_kp_value(row) is not None]
        if not valid_rows:
            return {}

        latest_row = self._pick_latest_row(valid_rows)
        latest_value = self._extract_kp_value(latest_row)
        latest_time = self._parse_time_tag(latest_row.get("time_tag"))
        if latest_value != 0.0 or latest_time is None:
            return latest_row

        recent_nonzero_rows = [
            row
            for row in valid_rows
            if (self._extract_kp_value(row) or 0.0) > 0.0
        ]
        if not recent_nonzero_rows:
            return latest_row

        latest_recent_nonzero = self._pick_latest_row(recent_nonzero_rows)
        nonzero_time = self._parse_time_tag(latest_recent_nonzero.get("time_tag"))
        if nonzero_time is None:
            return latest_row

        if (latest_time - nonzero_time).total_seconds() <= 3 * 60 * 60:
            return latest_recent_nonzero

        return latest_row

    @classmethod
    def _parse_daily_geomagnetic_kp_series(cls, text: str) -> list[tuple[datetime, float]]:
        series: list[tuple[datetime, float]] = []
        for raw_line in text.splitlines():
            line = raw_line.strip()
            if not line or not line[:4].isdigit():
                continue

            tokens = line.split()
            if len(tokens) < 11:
                continue

            try:
                year, month, day = (int(tokens[0]), int(tokens[1]), int(tokens[2]))
            except ValueError:
                continue

            kp_tokens = tokens[-8:]
            if len(kp_tokens) != 8:
                continue

            base_time = datetime(year, month, day, tzinfo=UTC)
            for slot_index, raw_value in enumerate(kp_tokens, start=1):
                value = cls._safe_float(raw_value)
                if value is None or value < 0:
                    continue
                series.append((base_time + timedelta(hours=slot_index * 3), value))

        return series

    @staticmethod
    def _latest_recent_daily_estimated_kp(
        points: list[tuple[datetime, float]],
        reference_time: datetime | None,
    ) -> tuple[datetime, float] | None:
        if reference_time is None or not points:
            return None

        eligible = [
            (point_time, point_value)
            for point_time, point_value in points
            if point_value > 0.0 and 0 <= (reference_time - point_time).total_seconds() <= 3 * 60 * 60
        ]
        if not eligible:
            return None
        return max(eligible, key=lambda item: item[0])

    def fetch_snapshot(self) -> NoaaSnapshot:
        mag_rows = self._fetch_first_available(self.MAG_URLS)
        plasma_rows = self._fetch_first_available(self.PLASMA_URLS)
        kp_rows = self.http.get_json(self.KP_URL)
        observed_kp_rows = self.http.get_json(self.OBSERVED_KP_URL)
        daily_geomagnetic_text = self.http.get_text(self.DAILY_GEOMAGNETIC_URL)

        mag = self._normalize_rows(mag_rows)
        plasma = self._normalize_rows(plasma_rows)
        kp = self._normalize_rows(kp_rows)
        observed_kp = self._normalize_rows(observed_kp_rows)
        daily_estimated_points = self._parse_daily_geomagnetic_kp_series(daily_geomagnetic_text)

        latest_mag = self._pick_latest_row(mag)
        latest_plasma = self._pick_latest_row(plasma)
        latest_kp = self._pick_latest_estimated_kp_row(kp)
        latest_observed_kp = self._pick_latest_row(observed_kp)
        latest_kp_time = self._parse_time_tag(latest_kp.get("time_tag"))
        latest_kp_value = self._extract_kp_value(latest_kp)
        if latest_kp_value == 0.0:
            daily_fallback = self._latest_recent_daily_estimated_kp(daily_estimated_points, latest_kp_time)
            if daily_fallback is not None:
                _, latest_kp_value = daily_fallback

        observed_at = (
            latest_mag.get("time_tag")
            or latest_plasma.get("time_tag")
            or latest_kp.get("time_tag")
            or utc_now().isoformat()
        )

        return NoaaSnapshot(
            observed_at=observed_at,
            solar_wind_speed_km_s=self._safe_float(
                latest_plasma.get("proton_speed", latest_plasma.get("speed"))
            ),
            proton_density_p_cm3=self._safe_float(
                latest_plasma.get("proton_density", latest_plasma.get("density"))
            ),
            bz_nt=self._safe_float(latest_mag.get("bz_gsm")),
            bt_nt=self._safe_float(latest_mag.get("bt")),
            kp=self._safe_float(latest_observed_kp.get("Kp")),
            kp_estimated=latest_kp_value,
        )


class NasaImageClient:
    SOHO_PAGE_URL = "https://soho.nascom.nasa.gov/data/realtime-images.html"
    SOHO_BASE_URL = "https://soho.nascom.nasa.gov"
    LIVE_IMAGE_SPECS: dict[str, dict[str, str]] = {
        "soho_eit_171": {
            "title": "SOHO EIT 171 A",
            "provider": "SOHO/EIT",
            "relative_path": "/data/realtime/eit_171/512/latest.jpg",
            "detail_path": "/data/realtime/eit_171/512/",
        },
        "soho_eit_195": {
            "title": "SOHO EIT 195 A",
            "provider": "SOHO/EIT",
            "relative_path": "/data/realtime/eit_195/512/latest.jpg",
            "detail_path": "/data/realtime/eit_195/512/",
        },
        "soho_eit_284": {
            "title": "SOHO EIT 284 A",
            "provider": "SOHO/EIT",
            "relative_path": "/data/realtime/eit_284/512/latest.jpg",
            "detail_path": "/data/realtime/eit_284/512/",
        },
        "soho_eit_304": {
            "title": "SOHO EIT 304 A",
            "provider": "SOHO/EIT",
            "relative_path": "/data/realtime/eit_304/512/latest.jpg",
            "detail_path": "/data/realtime/eit_304/512/",
        },
        "sdo_hmi_intensitygram": {
            "title": "SDO HMI Intensitygram",
            "provider": "SDO/HMI",
            "relative_path": "/data/realtime/hmi_igr/512/latest.jpg",
            "detail_path": "/data/realtime/hmi_igr/512/",
        },
        "sdo_hmi_magnetogram": {
            "title": "SDO HMI Magnetogram",
            "provider": "SDO/HMI",
            "relative_path": "/data/realtime/hmi_mag/512/latest.jpg",
            "detail_path": "/data/LATEST/latest-hmiMag.html",
        },
        "soho_lasco_c2": {
            "title": "SOHO LASCO C2",
            "provider": "SOHO/LASCO",
            "relative_path": "/data/realtime/c2/512/latest.jpg",
            "detail_path": "/data/realtime/c2/512/",
        },
        "soho_lasco_c3": {
            "title": "SOHO LASCO C3",
            "provider": "SOHO/LASCO",
            "relative_path": "/data/realtime/c3/512/latest.jpg",
            "detail_path": "/data/realtime/c3/512/",
        },
    }

    def __init__(self, http: HttpClient, output_dir: Path) -> None:
        self.http = http
        self.output_dir = output_dir

    def list_live_images(self) -> list[dict[str, str]]:
        html = self.http.get_text(self.SOHO_PAGE_URL)
        extracted_urls = self._extract_live_image_urls(html)

        live_images: list[dict[str, str]] = []
        for name, spec in self.LIVE_IMAGE_SPECS.items():
            image_url = extracted_urls.get(name) or self._absolute_soho_url(spec["relative_path"])
            live_images.append(
                {
                    "name": name,
                    "title": spec["title"],
                    "provider": spec["provider"],
                    "image_url": image_url,
                    "detail_url": self._absolute_soho_url(spec["detail_path"]),
                    "source_page": self.SOHO_PAGE_URL,
                }
            )
        return live_images

    def download_latest_images(self, live_images: list[dict[str, str]] | None = None) -> dict[str, str]:
        images_dir = self.output_dir / "images"
        ensure_dir(images_dir)

        saved: dict[str, str] = {}
        live_images = self.list_live_images() if live_images is None else live_images

        for item in live_images:
            name = item.get("name")
            url = item.get("image_url")
            if not name or not url:
                continue
            target = images_dir / f"{name}.jpg"
            try:
                self.http.download_file(url, target)
                saved[name] = str(target)
            except Exception as exc:  # noqa: BLE001
                logging.warning("NASA image download skipped for %s: %s", name, exc)

        return saved

    def _extract_live_image_urls(self, html: str) -> dict[str, str]:
        matches = re.findall(r'<img[^>]+src="([^"]+)"', html, flags=re.IGNORECASE)
        resolved: dict[str, str] = {}
        for src in matches:
            absolute_url = self._absolute_soho_url(src)
            lower = absolute_url.lower()
            for name, spec in self.LIVE_IMAGE_SPECS.items():
                if name in resolved:
                    continue
                if spec["relative_path"].lower() in lower:
                    resolved[name] = absolute_url
        return resolved

    def _absolute_soho_url(self, src: str) -> str:
        return urljoin(f"{self.SOHO_BASE_URL}/", src)


class IntermagnetClient:
    HAPI_BASE = "https://imag-data.bgs.ac.uk/GIN_V1/hapi"

    def __init__(self, http: HttpClient) -> None:
        self.http = http

    def fetch_station_snapshot(
        self,
        station: str,
        start_time: datetime,
        end_time: datetime,
    ) -> IntermagnetStationSnapshot:
        dataset = f"{station}/best-avail/PT1M/xyzf"
        info = self.http.get_json(f"{self.HAPI_BASE}/info", params={"id": dataset})
        start_time, end_time = self._clamp_time_range(info, start_time, end_time)
        if start_time >= end_time:
            return IntermagnetStationSnapshot(
                station=station,
                last_time=None,
                component=None,
                last_value_nt=None,
                delta_nt=None,
                samples=0,
                error="INTERMAGNET veri araligi uygun degil.",
            )

        component_spec = self._select_component(info.get("parameters", []))
        if not component_spec:
            raise RuntimeError(f"{station} icin uygun manyetik bilesen bulunamadi.")

        data = self.http.get_json(
            f"{self.HAPI_BASE}/data",
            params={
                "id": dataset,
                "parameters": f"Time,{component_spec['parameter_name']}",
                "time.min": format_utc_minute_precision(start_time),
                "time.max": format_utc_minute_precision(end_time),
                "format": "json",
            },
        )

        rows = data.get("data", [])
        values: list[tuple[str, float]] = []
        for row in rows:
            if len(row) < 2:
                continue
            try:
                value = self._extract_component_value(row[1], component_spec)
                if value is None:
                    continue
                values.append((str(row[0]), value))
            except (TypeError, ValueError):
                continue

        if len(values) < 2:
            return IntermagnetStationSnapshot(
                station=station,
                last_time=None,
                component=component_spec["component_label"],
                last_value_nt=None,
                delta_nt=None,
                samples=len(values),
                error="Yeterli INTERMAGNET ornegi alinmadi.",
            )

        last_time, last_value = values[-1]
        baseline = values[0][1]
        delta_nt = last_value - baseline

        return IntermagnetStationSnapshot(
            station=station,
            last_time=last_time,
            component=component_spec["component_label"],
            last_value_nt=last_value,
            delta_nt=delta_nt,
            samples=len(values),
            error=None,
        )

    @staticmethod
    def _select_component(parameters: list[dict[str, Any]]) -> dict[str, Any] | None:
        for parameter in parameters:
            labels = parameter.get("label")
            if isinstance(labels, list) and "X" in labels:
                return {
                    "parameter_name": parameter["name"],
                    "component_label": "X",
                    "component_index": labels.index("X"),
                }

        for candidate in ("X", "H", "Y", "Z", "F"):
            for parameter in parameters:
                if parameter.get("name") == candidate or parameter.get("label") == candidate:
                    return {
                        "parameter_name": parameter["name"],
                        "component_label": candidate,
                        "component_index": None,
                    }
        return None

    @staticmethod
    def _extract_component_value(raw_value: Any, component_spec: dict[str, Any]) -> float | None:
        index = component_spec["component_index"]
        if index is None:
            value = raw_value
        else:
            if not isinstance(raw_value, list) or len(raw_value) <= index:
                return None
            value = raw_value[index]

        numeric = float(value)
        if numeric >= 99999.0:
            return None
        return numeric

    @staticmethod
    def _clamp_time_range(
        info: dict[str, Any],
        start_time: datetime,
        end_time: datetime,
    ) -> tuple[datetime, datetime]:
        available_start = info.get("startDate")
        available_stop = info.get("stopDate")
        if available_start:
            start_time = max(start_time, parse_iso8601(str(available_start)))
        if available_stop:
            end_time = min(end_time, parse_iso8601(str(available_stop)))
        return start_time, end_time


class EarlyWarningEngine:
    RISK_WEIGHTS = {
        "kp": 0.30,
        "solar_wind": 0.20,
        "bz": 0.25,
        "density": 0.10,
        "ground": 0.15,
    }
    SECTOR_PROFILES = (
        {
            "id": "gnss",
            "title": "GPS / GNSS",
            "subtitle": "Türkiye’de hassas konumlama, drone ve RTK uygulamaları",
            "weights": {
                "kp": 0.34,
                "solar_wind": 0.14,
                "bz": 0.18,
                "density": 0.04,
                "ground": 0.30,
            },
            "summaries": {
                "normal": "Standart navigasyon için belirgin bir bozulma beklenmez. Hassas ölçüm kullanan sistemlerde rutin izleme yeterlidir.",
                "watch": "Hassas konumlama, RTK ve drone rotalarında küçük sapmalar görülebilir. Ölçüm kalitesi yakından izlenmelidir.",
                "warning": "Hassas GNSS doğruluğunda düşüş ve konum oynaklığı riski artıyor. Kesintiye duyarlı operasyonlarda korumalı iş akışına geçilmelidir.",
                "severe": "Hassas GNSS hizmetlerinde belirgin doğruluk kaybı ve kısa süreli kesinti riski var. Kritik görevler alternatif navigasyonla desteklenmelidir.",
            },
        },
        {
            "id": "hf_comm",
            "title": "HF Haberleşme",
            "subtitle": "Uzun mesafe telsiz, deniz ve yedek haberleşme hatları",
            "weights": {
                "kp": 0.28,
                "solar_wind": 0.22,
                "bz": 0.30,
                "density": 0.08,
                "ground": 0.12,
            },
            "summaries": {
                "normal": "HF haberleşmede dikkat gerektiren belirgin bir bozulma işareti yok. Frekans planı genel olarak stabil kalır.",
                "watch": "Uzun mesafe HF bağlantılarında dalgalanma ve kalite düşüşü görülebilir. Operatörlerin frekans alternatiflerini hazır tutması faydalı olur.",
                "warning": "HF bağlantılarında kopma, zayıflama ve yeniden frekans seçme ihtiyacı artabilir. Yedek kanal planlaması devreye alınmalıdır.",
                "severe": "HF haberleşmede belirgin bozulma ve kullanılamayan pencereler oluşabilir. Kritik iletişimler farklı taşıyıcılarla desteklenmelidir.",
            },
        },
        {
            "id": "satellite_ops",
            "title": "Uydu Operasyonları",
            "subtitle": "Uydu bağlantı kalitesi, izleme ve operasyonel dikkat seviyesi",
            "weights": {
                "kp": 0.24,
                "solar_wind": 0.26,
                "bz": 0.22,
                "density": 0.18,
                "ground": 0.10,
            },
            "summaries": {
                "normal": "Uydu operasyonları için belirgin baskı işareti görünmüyor. Sistemler rutin izleme seviyesinde kalabilir.",
                "watch": "Uydu bağlantı kalitesi ve izleme doğruluğunda dikkat gerektiren koşullar oluşabilir. Operasyon ekipleri telemetriyi daha sık kontrol etmelidir.",
                "warning": "Uydu sistemlerinde yüzey şarjlanması ve operasyonel dikkat ihtiyacı artıyor. Hassas manevra ve bakım işleri gözden geçirilmelidir.",
                "severe": "Uydu operasyonlarında yüksek yük, şarjlanma ve bağlantı kararsızlığı riski belirgin. Koruyucu prosedürler aktif tutulmalıdır.",
            },
        },
        {
            "id": "power_grid",
            "title": "Enerji Şebekesi",
            "subtitle": "Türkiye enlemlerinde uzun iletim hatları ve işletme takibi",
            "weights": {
                "kp": 0.20,
                "solar_wind": 0.12,
                "bz": 0.22,
                "density": 0.06,
                "ground": 0.40,
            },
            "summaries": {
                "normal": "Türkiye enlemlerinde şebekeye yansıyan etki çoğu durumda sınırlı kalır. Standart izleme yeterlidir.",
                "watch": "Uzun iletim hatlarında dikkat gerektiren küçük indüklenmiş akımlar oluşabilir. İşletme ekipleri trendleri yakından izlemelidir.",
                "warning": "Jeomanyetik indüklenen akımlar nedeniyle işletme ekiplerinin izlemesi gereken bir pencere oluşabilir. Koruma ve yük dağılımı yeniden kontrol edilmelidir.",
                "severe": "Türkiye enlemlerinde bile uzun iletim hatları ve trafo işletmesi için tedbir seviyesi yükseltilmelidir. Kritik ekipler hazır beklemelidir.",
            },
        },
    )
    COMPONENT_LABELS = {
        "kp": "Kp yükselişi",
        "solar_wind": "güneş rüzgârı hızı",
        "bz": "negatif Bz",
        "density": "proton yoğunluğu",
        "ground": "yer istasyonu oynaklığı",
    }

    def __init__(self, thresholds: dict[str, float]) -> None:
        self.thresholds = thresholds

    def evaluate(
        self,
        noaa: NoaaSnapshot,
        stations: list[IntermagnetStationSnapshot],
    ) -> dict[str, Any]:
        score = 0
        reasons: list[str] = []
        kp_value = self._effective_kp(noaa)
        component_risks = self._component_risks(noaa, stations)

        if self._is_warning(kp_value, "kp_warning"):
            score += 3
            reasons.append(f"Kp uyarı eşiğini aştı: {kp_value}")
        elif self._is_watch(kp_value, "kp_watch"):
            score += 2
            reasons.append(f"Kp izleme eşiğini aştı: {kp_value}")

        if self._is_warning(noaa.solar_wind_speed_km_s, "solar_wind_speed_warning"):
            score += 2
            reasons.append(f"Güneş rüzgârı hızı çok yüksek: {noaa.solar_wind_speed_km_s} km/s")
        elif self._is_watch(noaa.solar_wind_speed_km_s, "solar_wind_speed_watch"):
            score += 1
            reasons.append(f"Güneş rüzgârı hızı yüksek: {noaa.solar_wind_speed_km_s} km/s")

        if self._is_negative_warning(noaa.bz_nt, "bz_warning"):
            score += 3
            reasons.append(f"IMF Bz kuvvetli güney yönlü: {noaa.bz_nt} nT")
        elif self._is_negative_watch(noaa.bz_nt, "bz_watch"):
            score += 2
            reasons.append(f"IMF Bz negatif: {noaa.bz_nt} nT")

        if self._is_warning(noaa.proton_density_p_cm3, "density_warning"):
            score += 1
            reasons.append(f"Proton yoğunluğu uyarı seviyesinde: {noaa.proton_density_p_cm3}")
        elif self._is_watch(noaa.proton_density_p_cm3, "density_watch"):
            score += 1
            reasons.append(f"Proton yoğunluğu izleme seviyesinde: {noaa.proton_density_p_cm3}")

        station_impacts: list[dict[str, Any]] = []
        for station in stations:
            station_payload = asdict(station)
            station_impacts.append(station_payload)
            delta_abs = abs(station.delta_nt) if station.delta_nt is not None else None
            if delta_abs is None:
                continue
            if delta_abs >= self.thresholds["ground_delta_warning_nt"]:
                score += 2
                reasons.append(f"{station.station} istasyonunda şiddetli alan değişimi: {station.delta_nt:.1f} nT")
            elif delta_abs >= self.thresholds["ground_delta_watch_nt"]:
                score += 1
                reasons.append(f"{station.station} istasyonunda alan değişimi: {station.delta_nt:.1f} nT")

        risk_percent = self._calculate_risk_percent(noaa, stations, component_risks=component_risks)
        level = self._risk_percent_to_level(risk_percent)
        confidence = self._calculate_confidence(noaa, stations)
        sector_impacts = self._build_sector_impacts(component_risks)
        return {
            "level": level,
            "score": score,
            "risk_percent": risk_percent,
            "confidence_percent": confidence["percent"],
            "confidence_label": confidence["label"],
            "confidence_reasons": confidence["reasons"],
            "component_risks": {key: int(round(value * 100)) for key, value in component_risks.items()},
            "sector_impacts": sector_impacts,
            "reasons": reasons,
            "noaa": asdict(noaa),
            "intermagnet": station_impacts,
        }

    @staticmethod
    def _effective_kp(noaa: NoaaSnapshot) -> float | None:
        candidates = [value for value in (noaa.kp, noaa.kp_estimated) if value is not None]
        if not candidates:
            return None
        return max(candidates)

    def _is_watch(self, value: float | None, key: str) -> bool:
        return value is not None and value >= self.thresholds[key]

    def _is_warning(self, value: float | None, key: str) -> bool:
        return value is not None and value >= self.thresholds[key]

    def _is_negative_watch(self, value: float | None, key: str) -> bool:
        return value is not None and value <= self.thresholds[key]

    def _is_negative_warning(self, value: float | None, key: str) -> bool:
        return value is not None and value <= self.thresholds[key]

    def _calculate_risk_percent(
        self,
        noaa: NoaaSnapshot,
        stations: list[IntermagnetStationSnapshot],
        component_risks: dict[str, float] | None = None,
    ) -> int:
        component_risks = component_risks or self._component_risks(noaa, stations)
        kp_value = self._effective_kp(noaa)
        kp_risk = component_risks["kp"]
        speed_risk = component_risks["solar_wind"]
        bz_risk = component_risks["bz"]
        density_risk = component_risks["density"]
        ground_risk = component_risks["ground"]

        weighted_risk = (
            kp_risk * self.RISK_WEIGHTS["kp"]
            + speed_risk * self.RISK_WEIGHTS["solar_wind"]
            + bz_risk * self.RISK_WEIGHTS["bz"]
            + density_risk * self.RISK_WEIGHTS["density"]
            + ground_risk * self.RISK_WEIGHTS["ground"]
        )
        warning_hits = sum(
            [
                self._is_warning(kp_value, "kp_warning"),
                self._is_warning(noaa.solar_wind_speed_km_s, "solar_wind_speed_warning"),
                self._is_negative_warning(noaa.bz_nt, "bz_warning"),
                self._is_warning(noaa.proton_density_p_cm3, "density_warning"),
                any(
                    station.delta_nt is not None
                    and abs(station.delta_nt) >= self.thresholds["ground_delta_warning_nt"]
                    for station in stations
                ),
            ]
        )
        watch_hits = sum(
            [
                self._is_watch(kp_value, "kp_watch"),
                self._is_watch(noaa.solar_wind_speed_km_s, "solar_wind_speed_watch"),
                self._is_negative_watch(noaa.bz_nt, "bz_watch"),
                self._is_watch(noaa.proton_density_p_cm3, "density_watch"),
                any(
                    station.delta_nt is not None
                    and abs(station.delta_nt) >= self.thresholds["ground_delta_watch_nt"]
                    for station in stations
                ),
            ]
        )

        synergy_bonus = 0.0
        if warning_hits >= 2:
            synergy_bonus += min(18.0, float((warning_hits - 1) * 6))
        if watch_hits >= 3:
            synergy_bonus += min(10.0, float((watch_hits - 2) * 3))

        return max(0, min(100, int(round((weighted_risk * 100) + synergy_bonus))))

    def _component_risks(
        self,
        noaa: NoaaSnapshot,
        stations: list[IntermagnetStationSnapshot],
    ) -> dict[str, float]:
        kp_value = self._effective_kp(noaa)
        return {
            "kp": self._positive_risk_ratio(kp_value, "kp_watch", "kp_warning"),
            "solar_wind": self._positive_risk_ratio(
                noaa.solar_wind_speed_km_s,
                "solar_wind_speed_watch",
                "solar_wind_speed_warning",
            ),
            "bz": self._negative_risk_ratio(noaa.bz_nt, "bz_watch", "bz_warning"),
            "density": self._positive_risk_ratio(noaa.proton_density_p_cm3, "density_watch", "density_warning"),
            "ground": self._ground_risk_ratio(stations),
        }

    def _calculate_confidence(
        self,
        noaa: NoaaSnapshot,
        stations: list[IntermagnetStationSnapshot],
    ) -> dict[str, Any]:
        percent = 22
        reasons: list[str] = []

        if noaa.kp is not None:
            percent += 14
            reasons.append("gözlenen Kp mevcut")
        if noaa.kp_estimated is not None:
            percent += 12
            reasons.append("tahmini Kp mevcut")
        if noaa.solar_wind_speed_km_s is not None:
            percent += 10
        if noaa.bz_nt is not None:
            percent += 12
        if noaa.proton_density_p_cm3 is not None:
            percent += 8

        valid_stations = [
            station for station in stations
            if station.delta_nt is not None and not station.error
        ]
        if valid_stations:
            station_points = min(18, len(valid_stations) * 6)
            percent += station_points
            reasons.append(f"{len(valid_stations)} yer istasyonu teyidi var")
        else:
            reasons.append("yer istasyonu teyidi zayıf")

        if noaa.kp is not None and noaa.kp_estimated is not None:
            kp_gap = abs(noaa.kp - noaa.kp_estimated)
            if kp_gap <= 1.0:
                percent += 8
                reasons.append("gözlenen ve tahmini Kp uyumlu")
            elif kp_gap >= 3.0:
                percent -= 10
                reasons.append("gözlenen ve tahmini Kp farkı yüksek")

        available_core_signals = sum(
            value is not None
            for value in (
                noaa.kp,
                noaa.kp_estimated,
                noaa.solar_wind_speed_km_s,
                noaa.bz_nt,
            )
        )
        if available_core_signals <= 2:
            percent -= 12
            reasons.append("çekirdek NOAA sinyallerinde eksik veri var")

        percent = max(0, min(100, int(round(percent))))
        return {
            "percent": percent,
            "label": self._confidence_label(percent),
            "reasons": reasons[:3],
        }

    @staticmethod
    def _confidence_label(percent: int) -> str:
        if percent >= 80:
            return "yuksek"
        if percent >= 60:
            return "orta"
        return "dusuk"

    def _build_sector_impacts(self, component_risks: dict[str, float]) -> list[dict[str, Any]]:
        impacts: list[dict[str, Any]] = []
        for profile in self.SECTOR_PROFILES:
            weights = profile["weights"]
            weighted_score = sum(component_risks[key] * weights.get(key, 0.0) for key in self.RISK_WEIGHTS)
            if component_risks["kp"] >= 0.85 and component_risks["bz"] >= 0.85:
                weighted_score += 0.08
            if component_risks["ground"] >= 0.75 and profile["id"] in {"gnss", "power_grid"}:
                weighted_score += 0.08
            if component_risks["solar_wind"] >= 0.70 and component_risks["density"] >= 0.60 and profile["id"] == "satellite_ops":
                weighted_score += 0.06

            risk_percent = max(0, min(100, int(round(weighted_score * 100))))
            level = self._risk_percent_to_level(risk_percent)
            drivers = self._sector_drivers(component_risks, weights)
            impacts.append(
                {
                    "id": profile["id"],
                    "title": profile["title"],
                    "subtitle": profile["subtitle"],
                    "risk_percent": risk_percent,
                    "level": level,
                    "summary": profile["summaries"][level],
                    "drivers": drivers,
                }
            )
        return impacts

    def _sector_drivers(
        self,
        component_risks: dict[str, float],
        weights: dict[str, float],
    ) -> list[str]:
        ranked_keys = sorted(
            self.RISK_WEIGHTS.keys(),
            key=lambda key: component_risks[key] * weights.get(key, 0.0),
            reverse=True,
        )
        drivers: list[str] = []
        for key in ranked_keys:
            contribution = component_risks[key] * weights.get(key, 0.0)
            if contribution < 0.08:
                continue
            drivers.append(self.COMPONENT_LABELS[key])
            if len(drivers) == 2:
                break
        return drivers

    def _positive_risk_ratio(self, value: float | None, watch_key: str, warning_key: str) -> float:
        if value is None:
            return 0.0

        watch = float(self.thresholds[watch_key])
        warning = float(self.thresholds[warning_key])
        if watch <= 0 or warning <= watch or value <= 0:
            return 0.0

        if value < watch:
            return min(0.45, 0.45 * (value / watch))
        if value < warning:
            return 0.45 + (0.40 * ((value - watch) / (warning - watch)))

        upper_span = max(1.0, warning * 0.5)
        return min(1.0, 0.85 + (0.15 * ((value - warning) / upper_span)))

    def _negative_risk_ratio(self, value: float | None, watch_key: str, warning_key: str) -> float:
        if value is None or value >= 0:
            return 0.0

        watch = abs(float(self.thresholds[watch_key]))
        warning = abs(float(self.thresholds[warning_key]))
        severity = abs(value)
        if watch <= 0 or warning <= watch:
            return 0.0

        if severity < watch:
            return min(0.45, 0.45 * (severity / watch))
        if severity < warning:
            return 0.45 + (0.40 * ((severity - watch) / (warning - watch)))

        upper_span = max(1.0, warning * 0.5)
        return min(1.0, 0.85 + (0.15 * ((severity - warning) / upper_span)))

    def _ground_risk_ratio(self, stations: list[IntermagnetStationSnapshot]) -> float:
        watch = float(self.thresholds["ground_delta_watch_nt"])
        ratios: list[float] = []
        impacted_count = 0

        for station in stations:
            if station.delta_nt is None:
                continue
            ratio = self._positive_risk_ratio(abs(station.delta_nt), "ground_delta_watch_nt", "ground_delta_warning_nt")
            ratios.append(ratio)
            if abs(station.delta_nt) >= watch:
                impacted_count += 1

        if not ratios:
            return 0.0

        peak_ratio = max(ratios)
        if impacted_count > 1:
            peak_ratio = min(1.0, peak_ratio + (0.06 * (impacted_count - 1)))
        return peak_ratio

    def _risk_percent_to_level(self, risk_percent: int) -> str:
        severe_threshold = float(self.thresholds.get("risk_severe_percent", 85.0))
        warning_threshold = float(self.thresholds.get("risk_warning_percent", 60.0))
        watch_threshold = float(self.thresholds.get("risk_watch_percent", 35.0))

        if risk_percent >= severe_threshold:
            return "severe"
        if risk_percent >= warning_threshold:
            return "warning"
        if risk_percent >= watch_threshold:
            return "watch"
        return "normal"

    @staticmethod
    def _score_to_level(score: int) -> str:
        if score >= 8:
            return "severe"
        if score >= 5:
            return "warning"
        if score >= 2:
            return "watch"
        return "normal"


class SpaceWeatherEarlyWarningApp:
    def __init__(self, config: dict[str, Any], base_dir: Path | None = None) -> None:
        self.config = config
        base_dir = base_dir or BASE_DIR
        output_dir = Path(config.get("output_dir", "output"))
        self.output_dir = output_dir if output_dir.is_absolute() else base_dir / output_dir
        self.http = HttpClient()
        self.noaa = NoaaSwpcClient(self.http)
        self.nasa = NasaImageClient(self.http, self.output_dir)
        self.intermagnet = IntermagnetClient(self.http)
        self.engine = EarlyWarningEngine(config["thresholds"])
        self.kp_lstm = KpLstmForecaster(config.get("kp_lstm", {}))

    def run_once(self, download_images: bool | None = None) -> dict[str, Any]:
        run_at = utc_now()
        download_images = self.config.get("download_images", True) if download_images is None else download_images

        noaa_snapshot = self.noaa.fetch_snapshot()
        history_limit = int(self.config.get("kp_lstm", {}).get("training_history_limit", 720))
        history_records = load_jsonl(self.output_dir / "alerts" / "history.jsonl", limit=history_limit)
        current_record = {
            "generated_at": run_at.isoformat(),
            "evaluation": {
                "noaa": asdict(noaa_snapshot),
            },
        }
        try:
            noaa_snapshot.kp_lstm_forecast = self.kp_lstm.forecast(history_records, current_record, run_at)
        except Exception:  # noqa: BLE001
            logging.exception("Kp LSTM forecast failed")

        station_results: list[IntermagnetStationSnapshot] = []
        hours_back = int(self.config["intermagnet"].get("hours_back", 6))
        start_time = run_at - timedelta(hours=hours_back)
        end_time = run_at

        for station in self.config["intermagnet"].get("stations", []):
            try:
                station_results.append(
                    self.intermagnet.fetch_station_snapshot(station, start_time, end_time)
                )
            except Exception as exc:  # noqa: BLE001
                logging.exception("INTERMAGNET station fetch failed for %s", station)
                station_results.append(
                    IntermagnetStationSnapshot(
                        station=station,
                        last_time=None,
                        component=None,
                        last_value_nt=None,
                        delta_nt=None,
                        samples=0,
                        error=str(exc),
                    )
                )

        evaluation = self.engine.evaluate(noaa_snapshot, station_results)

        nasa_live_images: list[dict[str, str]] = []
        images: dict[str, str] = {}
        image_error: str | None = None
        try:
            nasa_live_images = self.nasa.list_live_images()
        except Exception as exc:  # noqa: BLE001
            logging.exception("NASA live image catalog failed")
            image_error = str(exc)

        if download_images:
            try:
                images = self.nasa.download_latest_images(nasa_live_images)
            except Exception as exc:  # noqa: BLE001
                logging.exception("NASA image download failed")
                image_error = str(exc)

        payload = {
            "generated_at": run_at.isoformat(),
            "data_sources": {
                "noaa_swpc": "https://services.swpc.noaa.gov/",
                "nasa_sdo": "https://sdo.gsfc.nasa.gov/assets/img/latest/",
                "nasa_soho": "https://soho.nascom.nasa.gov/data/realtime-images.html",
                "intermagnet": "https://imag-data.bgs.ac.uk/GIN_V1/hapi",
            },
            "evaluation": evaluation,
            "nasa_live_images": nasa_live_images,
            "images": images,
            "image_error": image_error,
        }

        try:
            self._dispatch_alert_if_needed(payload)
        except Exception:  # noqa: BLE001
            logging.exception("Alert dispatch failed")

        alerts_dir = self.output_dir / "alerts"
        write_json(alerts_dir / "latest_alert.json", payload)
        append_jsonl(alerts_dir / "history.jsonl", payload)
        return payload

    def monitor(self, download_images: bool | None = None) -> None:
        interval = int(self.config.get("poll_interval_seconds", 300))
        while True:
            payload = self.run_once(download_images=download_images)
            level = payload["evaluation"]["level"]
            score = payload["evaluation"]["score"]
            risk_percent = payload["evaluation"].get("risk_percent")
            logging.info("Evaluation complete: level=%s risk=%s%% score=%s", level, risk_percent, score)
            time.sleep(interval)

    def _dispatch_alert_if_needed(self, payload: dict[str, Any]) -> None:
        alerting = self.config.get("alerting", {})
        webhook_url = alerting.get("webhook_url", "").strip()
        if not webhook_url:
            return

        min_level = alerting.get("min_level", "warning")
        current_level = payload["evaluation"]["level"]
        if self._level_rank(current_level) < self._level_rank(min_level):
            return

        webhook_payload = {
            "generated_at": payload["generated_at"],
            "level": current_level,
            "score": payload["evaluation"]["score"],
            "risk_percent": payload["evaluation"].get("risk_percent"),
            "reasons": payload["evaluation"]["reasons"],
            "noaa": payload["evaluation"]["noaa"],
            "intermagnet": payload["evaluation"]["intermagnet"],
            "images": payload["images"],
        }
        self.http.post_json(webhook_url, webhook_payload)

    @staticmethod
    def _level_rank(level: str) -> int:
        order = {
            "normal": 0,
            "watch": 1,
            "warning": 2,
            "severe": 3,
        }
        return order.get(level, 0)


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Uzay havası erken uyarı sistemi")
    parser.add_argument("command", nargs="?")
    parser.add_argument("--config", default=str(DEFAULT_CONFIG_PATH))
    parser.add_argument("--no-images", action="store_true")
    parser.add_argument("--log-level", default="INFO")
    args, unknown = parser.parse_known_args(argv)

    if args.command not in (None, "run", "monitor"):
        unknown.insert(0, args.command)
        args.command = None

    args.command = args.command or "run"
    if unknown:
        setattr(args, "unknown_args", unknown)
    return args


def configure_logging(level_name: str) -> None:
    logging.basicConfig(
        level=getattr(logging, level_name.upper(), logging.INFO),
        format="%(asctime)s | %(levelname)s | %(message)s",
    )


def run(
    command: str = "run",
    config_path: str | Path | None = None,
    download_images: bool = True,
    log_level: str = "INFO",
) -> dict[str, Any] | None:
    configure_logging(log_level)
    resolved_config_path = resolve_config_path(config_path)
    config = load_json(resolved_config_path)
    app = SpaceWeatherEarlyWarningApp(config, base_dir=resolved_config_path.parent)

    if command == "run":
        return app.run_once(download_images=download_images)
    if command == "monitor":
        app.monitor(download_images=download_images)
        return None
    raise ValueError(f"Gecersiz komut: {command}")


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])
    configure_logging(args.log_level)

    if getattr(args, "unknown_args", None):
        logging.info("Beklenmeyen argumanlar yoksayildi: %s", " ".join(args.unknown_args))

    resolved_config_path = resolve_config_path(args.config)
    app = SpaceWeatherEarlyWarningApp(
        load_json(resolved_config_path),
        base_dir=resolved_config_path.parent,
    )

    if args.command == "run":
        payload = app.run_once(download_images=not args.no_images)
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return 0

    app.monitor(download_images=not args.no_images)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
