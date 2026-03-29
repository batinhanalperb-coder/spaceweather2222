from __future__ import annotations

import argparse
import copy
import json
import logging
import re
import subprocess
import sys
import tempfile
import threading
import time
from datetime import datetime, timedelta, timezone
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlparse
from urllib.request import Request, urlopen

sys.path.insert(0, str(Path(__file__).resolve().parent))

from IMF_Bz import ImfBzForecaster
from gunes_ruzgarhizi import SolarWindSpeedForecaster
from kp_lstm_forecaster import KpDailyCycleForecaster
from space_weather_early_warning import (
    BASE_DIR,
    UTC,
    NoaaSwpcClient,
    SpaceWeatherEarlyWarningApp,
    configure_logging,
    load_json,
    resolve_config_path,
    utc_now,
    write_json,
)


STATIC_DIR = BASE_DIR / "web"
TURKEY_TZ = timezone(timedelta(hours=3), name="TSİ")
CHART_WINDOW_DAYS = 27
CHART_CACHE_SECONDS = 300
SOLAR_FOCUS_CACHE_SECONDS = 60
DEFAULT_DASHBOARD_HISTORY_LIMIT = 720
RTSW_DATA_PATH = BASE_DIR / "rtsw_plot_data_1998-01-01T00_00_00.txt"
ACCESS_STATE_PATH = BASE_DIR / "output" / "access" / "access_state.json"
NOTIFICATION_SETTINGS_PATH = BASE_DIR / "output" / "access" / "notification_settings.json"
NOTIFICATION_STATE_PATH = BASE_DIR / "output" / "access" / "notification_state.json"
PUBLIC_NOTIFICATION_TOPIC = "uheup"
DAILY_GEOMAGNETIC_URL = "https://services.swpc.noaa.gov/text/daily-geomagnetic-indices.txt"
SUNSPOT_NOAA_URLS = [
    "https://services.swpc.noaa.gov/json/solar-cycle/sunspot.json",
    "https://services.swpc.noaa.gov/json/solar-cycle/sunspot-number.json",
]
SUNSPOT_PREDICT_NOAA_URLS = [
    "https://services.swpc.noaa.gov/json/solar-cycle/sunspot-predicted.json",
    "https://services.swpc.noaa.gov/json/solar-cycle/sunspot_predicted.json",
    "https://services.swpc.noaa.gov/json/solar-cycle/predicted-sunspot-number.json",
]
SILSO_DAILY_URLS = [
    "https://www.sidc.be/SILSO/DATA/SN_d_tot_V2.0.txt",
    "https://sidc.oma.be/SILSO/DATA/SN_d_tot_V2.0.txt",
]
SILSO_EISN_URLS = [
    "https://www.sidc.be/SILSO/DATA/EISN/EISN_current.csv",
    "https://www.sidc.be/SILSO/DATA/EISN/EISN_current.txt",
    "https://sidc.oma.be/SILSO/DATA/EISN/EISN_current.csv",
]
SILSO_PREDICT_URLS = [
    "https://www.sidc.be/SILSO/DATA/KFprediML.txt",
    "https://sidc.oma.be/SILSO/DATA/KFprediML.txt",
    "https://www.sidc.be/SILSO/DATA/prediML.txt",
]
GOES_XRAY_URLS = [
    "https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json",
    "https://services.swpc.noaa.gov/json/goes/secondary/xrays-1-day.json",
]
SOLAR_FLARE_URLS = [
    "https://services.swpc.noaa.gov/json/solar_flare_summary.json",
    "https://services.swpc.noaa.gov/json/solar_flare_summary.json",
]
NOTIFICATIONS_URLS = [
    "https://services.swpc.noaa.gov/json/notifications.json",
]
SOLAR_FLUX_URLS = [
    "https://services.swpc.noaa.gov/json/solar-cycle/observed-solar-cycle.json",
    "https://services.swpc.noaa.gov/json/solar-cycle/solar-cycle.json",
]
CHART_SERIES_KEYS = (
    "kp_observed",
    "kp_daily_archive_actual",
    "kp_estimated",
    "solar_wind_speed_km_s",
    "proton_density_p_cm3",
    "bz_nt",
    "bt_nt",
    "kp_lstm_predicted_kp",
    "kp_lstm_confidence_percent",
)
PLASMA_SERIES_URLS = [
    "https://services.swpc.noaa.gov/products/solar-wind/plasma-7-day.json",
    *NoaaSwpcClient.PLASMA_URLS,
]
MAG_SERIES_URLS = [
    "https://services.swpc.noaa.gov/products/solar-wind/mag-7-day.json",
    *NoaaSwpcClient.MAG_URLS,
]
ACE_SWEPAM_SERIES_URLS = [
    "https://services.swpc.noaa.gov/json/ace/swepam/ace_swepam_1h.json",
    "https://services.swpc.woc.noaa.gov/json/ace/swepam/ace_swepam_1h.json",
]
ACE_MAG_SERIES_URLS = [
    "https://services.swpc.noaa.gov/json/ace/mag/ace_mag_1h.json",
    "https://services.swpc.woc.noaa.gov/json/ace/mag/ace_mag_1h.json",
]


def load_latest_alert(output_dir: Path) -> dict[str, Any] | None:
    latest_path = output_dir / "alerts" / "latest_alert.json"
    if not latest_path.exists():
        return None
    payload = load_json(latest_path)
    return payload if isinstance(payload, dict) else None


def _mapping(value: Any) -> dict[str, Any]:
    return value if isinstance(value, dict) else {}


def _entry_evaluation(entry: dict[str, Any] | None) -> dict[str, Any]:
    return _mapping(_mapping(entry).get("evaluation"))


def _entry_noaa(entry: dict[str, Any] | None) -> dict[str, Any]:
    return _mapping(_entry_evaluation(entry).get("noaa"))


def _entry_kp_lstm(entry: dict[str, Any] | None) -> dict[str, Any]:
    return _mapping(_entry_noaa(entry).get("kp_lstm_forecast"))


def load_history(output_dir: Path, limit: int = DEFAULT_DASHBOARD_HISTORY_LIMIT) -> list[dict[str, Any]]:
    history_path = output_dir / "alerts" / "history.jsonl"
    if not history_path.exists():
        return []

    entries: list[dict[str, Any]] = []
    with history_path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            try:
                parsed = json.loads(line)
            except json.JSONDecodeError:
                continue
            if isinstance(parsed, dict):
                entries.append(parsed)
    return entries[-limit:]


def default_access_state() -> dict[str, Any]:
    return {
        "mode": "local_only",
        "local_url": "http://127.0.0.1:8080",
        "public_url": None,
        "message": "Dış ağ bağlantısı henüz hazırlanmadı.",
        "updated_at": None,
        "tunnel_pid": None,
    }


def load_access_state(path: Path = ACCESS_STATE_PATH) -> dict[str, Any]:
    payload = default_access_state()
    if not path.exists():
        return payload

    try:
        raw = json.loads(path.read_text(encoding="utf-8-sig"))
    except Exception:  # noqa: BLE001
        return payload

    if not isinstance(raw, dict):
        return payload

    for key in ("mode", "local_url", "public_url", "message", "updated_at", "tunnel_pid"):
        if key in raw:
            payload[key] = raw.get(key)
    return payload


def default_notification_settings() -> dict[str, Any]:
    return {
        "provider": "pushbullet",
        "enabled": True,
        "pushbullet_token": "",
        "min_level": "watch",
        "cooldown_minutes": 60,
    }


def sanitize_notification_settings(payload: dict[str, Any] | None) -> dict[str, Any]:
    settings = default_notification_settings()
    incoming = payload if isinstance(payload, dict) else {}
    settings["enabled"] = bool(incoming.get("enabled", settings["enabled"]))
    settings["provider"] = "pushbullet"
    settings["pushbullet_token"] = str(incoming.get("pushbullet_token", settings["pushbullet_token"]) or "").strip()
    min_level = str(incoming.get("min_level", settings["min_level"]) or "watch").strip().lower()
    settings["min_level"] = min_level if min_level in {"watch", "warning", "severe"} else "watch"
    cooldown = incoming.get("cooldown_minutes", settings["cooldown_minutes"])
    try:
        settings["cooldown_minutes"] = max(5, min(720, int(cooldown)))
    except (TypeError, ValueError):
        settings["cooldown_minutes"] = 60
    return settings


def load_notification_settings(path: Path = NOTIFICATION_SETTINGS_PATH) -> dict[str, Any]:
    if not path.exists():
        return default_notification_settings()
    try:
        raw = json.loads(path.read_text(encoding="utf-8-sig"))
    except Exception:  # noqa: BLE001
        return default_notification_settings()
    return sanitize_notification_settings(raw if isinstance(raw, dict) else None)


def save_notification_settings(payload: dict[str, Any], path: Path = NOTIFICATION_SETTINGS_PATH) -> dict[str, Any]:
    settings = sanitize_notification_settings(payload)
    write_json(path, settings)
    return settings


def default_notification_state() -> dict[str, Any]:
    return {
        "last_sent_at": None,
        "last_level": None,
        "last_risk_percent": None,
        "last_kp": None,
        "last_seen_at": None,
        "last_seen_level": None,
        "last_seen_risk_percent": None,
        "last_seen_kp": None,
        "last_title": None,
        "last_message": None,
        "last_error": None,
    }


def load_notification_state(path: Path = NOTIFICATION_STATE_PATH) -> dict[str, Any]:
    payload = default_notification_state()
    if not path.exists():
        return payload
    try:
        raw = json.loads(path.read_text(encoding="utf-8-sig"))
    except Exception:  # noqa: BLE001
        return payload
    if not isinstance(raw, dict):
        return payload
    for key in payload:
        if key in raw:
            payload[key] = raw.get(key)
    return payload


def save_notification_state(payload: dict[str, Any], path: Path = NOTIFICATION_STATE_PATH) -> dict[str, Any]:
    state = default_notification_state()
    if isinstance(payload, dict):
        for key in state:
            if key in payload:
                state[key] = payload.get(key)
    write_json(path, state)
    return state


def web_image_map(payload: dict[str, Any]) -> dict[str, str]:
    mapped: dict[str, str] = {}
    for name, raw_path in payload.get("images", {}).items():
        raw_value = str(raw_path)
        if raw_value.startswith("http://") or raw_value.startswith("https://"):
            mapped[name] = raw_value
        else:
            mapped[name] = f"/media/{Path(raw_value).name}"
    return mapped


def media_filename_from_path(path: str) -> str:
    prefix = "/media/"
    relative_path = path[len(prefix):] if path.startswith(prefix) else path
    return Path(relative_path).name


def web_nasa_image_cards(payload: dict[str, Any]) -> list[dict[str, Any]]:
    cached_images = web_image_map(payload)
    cards: list[dict[str, Any]] = []
    seen_names: set[str] = set()

    for item in payload.get("nasa_live_images", []):
        name = str(item.get("name", "")).strip()
        if not name:
            continue
        seen_names.add(name)
        remote_url = item.get("image_url")
        cached_url = cached_images.get(name)
        cards.append(
            {
                "name": name,
                "title": item.get("title") or name.replace("_", " ").title(),
                "provider": item.get("provider") or "NASA",
                "image_url": cached_url or remote_url,
                "remote_url": remote_url,
                "detail_url": item.get("detail_url") or item.get("source_page") or remote_url,
                "source_page": item.get("source_page"),
                "cached": bool(cached_url and cached_url.startswith("/media/")),
            }
        )

    for name, image_url in cached_images.items():
        if name in seen_names:
            continue
        cards.append(
            {
                "name": name,
                "title": name.replace("_", " ").title(),
                "provider": "NASA",
                "image_url": image_url,
                "remote_url": None,
                "detail_url": image_url,
                "source_page": None,
                "cached": image_url.startswith("/media/"),
            }
        )

    return [card for card in cards if card.get("image_url")]


def _safe_float(value: Any) -> float | None:
    try:
        if value in (None, "", "null"):
            return None
        return float(value)
    except (TypeError, ValueError):
        return None


def _parse_timestamp(value: Any) -> datetime | None:
    if value in (None, ""):
        return None

    text = str(value).strip()
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


def _isoformat_z(value: datetime) -> str:
    return value.astimezone(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _format_turkey_timestamp(value: Any) -> str:
    timestamp = _parse_timestamp(value)
    if timestamp is None:
        text = str(value or "").strip()
        return text or "-"
    return timestamp.astimezone(TURKEY_TZ).strftime("%d.%m.%Y %H:%M TSİ")


def _normalize_chart_series(
    points: list[tuple[datetime, float]],
    window_start: datetime,
    window_end: datetime,
) -> dict[str, Any]:
    merged: dict[str, float] = {}
    for timestamp, value in points:
        if timestamp < window_start or timestamp > window_end:
            continue
        normalized_time = timestamp.astimezone(UTC).replace(second=0, microsecond=0)
        merged[_isoformat_z(normalized_time)] = value

    normalized_points = [
        {"time": timestamp, "value": merged[timestamp]}
        for timestamp in sorted(merged)
    ]
    if len(normalized_points) >= 2:
        start_time = _parse_timestamp(normalized_points[0]["time"])
        end_time = _parse_timestamp(normalized_points[-1]["time"])
        coverage_days = (
            round((end_time - start_time).total_seconds() / 86400.0, 1)
            if start_time and end_time
            else 0.0
        )
    else:
        coverage_days = 0.0

    return {
        "coverage_days": coverage_days,
        "points": normalized_points,
    }


def empty_charts_payload(
    window_days: int = CHART_WINDOW_DAYS,
    window_end: datetime | None = None,
) -> dict[str, Any]:
    end = (window_end or utc_now()).astimezone(UTC).replace(second=0, microsecond=0)
    start = end - timedelta(days=window_days)
    empty_series = {"coverage_days": 0.0, "points": []}
    return {
        "window_days": window_days,
        "window_start": _isoformat_z(start),
        "window_end": _isoformat_z(end),
        "kp_observed": copy.deepcopy(empty_series),
        "kp_daily_archive_actual": copy.deepcopy(empty_series),
        "kp_estimated": copy.deepcopy(empty_series),
        "solar_wind_speed_km_s": copy.deepcopy(empty_series),
        "proton_density_p_cm3": copy.deepcopy(empty_series),
        "bz_nt": copy.deepcopy(empty_series),
        "bt_nt": copy.deepcopy(empty_series),
        "kp_lstm_predicted_kp": copy.deepcopy(empty_series),
        "kp_lstm_confidence_percent": copy.deepcopy(empty_series),
    }


def chart_payload_has_points(charts: dict[str, Any]) -> bool:
    return any(charts.get(key, {}).get("points") for key in CHART_SERIES_KEYS)


def build_history_chart_payload(
    history: list[dict[str, Any]],
    window_days: int = CHART_WINDOW_DAYS,
    window_end: datetime | None = None,
) -> dict[str, Any]:
    end = (window_end or utc_now()).astimezone(UTC).replace(second=0, microsecond=0)
    start = end - timedelta(days=window_days)
    chart_payload = empty_charts_payload(window_days=window_days, window_end=end)
    series: dict[str, list[tuple[datetime, float]]] = {
        key: [] for key in CHART_SERIES_KEYS
    }

    for item in history:
        if not isinstance(item, dict):
            continue
        evaluation = _entry_evaluation(item)
        noaa = _entry_noaa(item)
        observed_at = (
            _parse_timestamp(noaa.get("observed_kp_at"))
            or _parse_timestamp(noaa.get("observed_at"))
            or _parse_timestamp(item.get("generated_at"))
        )
        estimated_at = (
            _parse_timestamp(noaa.get("estimated_kp_at"))
            or observed_at
        )
        generated_at = _parse_timestamp(item.get("generated_at")) or observed_at

        kp_value = _safe_float(noaa.get("kp"))
        if observed_at and kp_value is not None and kp_value >= 0:
            series["kp_observed"].append((observed_at, kp_value))

        kp_estimated_value = _safe_float(noaa.get("kp_estimated"))
        if estimated_at and kp_estimated_value is not None and kp_estimated_value >= 0:
            series["kp_estimated"].append((estimated_at, kp_estimated_value))

        speed_value = _safe_float(noaa.get("solar_wind_speed_km_s"))
        if generated_at and speed_value is not None:
            series["solar_wind_speed_km_s"].append((generated_at, speed_value))

        density_value = _safe_float(noaa.get("proton_density_p_cm3"))
        if generated_at and density_value is not None:
            series["proton_density_p_cm3"].append((generated_at, density_value))

        bz_value = _safe_float(noaa.get("bz_nt"))
        if generated_at and bz_value is not None:
            series["bz_nt"].append((generated_at, bz_value))

        bt_value = _safe_float(noaa.get("bt_nt"))
        if generated_at and bt_value is not None:
            series["bt_nt"].append((generated_at, bt_value))

        kp_lstm = _entry_kp_lstm(item)
        forecast_at = _parse_timestamp(kp_lstm.get("target_time")) or generated_at
        kp_lstm_value = _safe_float(kp_lstm.get("predicted_kp"))
        if forecast_at and kp_lstm_value is not None and kp_lstm_value >= 0:
            series["kp_lstm_predicted_kp"].append((forecast_at, kp_lstm_value))

        kp_lstm_confidence = _safe_float(kp_lstm.get("confidence_percent"))
        if forecast_at and kp_lstm_confidence is not None:
            series["kp_lstm_confidence_percent"].append((forecast_at, kp_lstm_confidence))

    for key, points in series.items():
        chart_payload[key] = _normalize_chart_series(points, start, end)
    return chart_payload


def build_archive_daily_kp_chart_payload(
    forecaster: KpDailyCycleForecaster | None,
    window_days: int = CHART_WINDOW_DAYS,
    window_end: datetime | None = None,
) -> dict[str, Any]:
    end = (window_end or utc_now()).astimezone(UTC).replace(second=0, microsecond=0)
    start = end - timedelta(days=window_days)
    chart_payload = empty_charts_payload(window_days=window_days, window_end=end)
    if forecaster is None:
        return chart_payload

    archive_points: list[tuple[datetime, float]] = []
    for record in forecaster.records:
        point_time = datetime(
            record.day.year,
            record.day.month,
            record.day.day,
            12,
            0,
            tzinfo=UTC,
        )
        if point_time < start or point_time > end:
            continue
        archive_points.append((point_time, float(record.daily_max_kp)))

    chart_payload["kp_daily_archive_actual"] = _normalize_chart_series(archive_points, start, end)
    return chart_payload


def merge_chart_payloads(*payloads: dict[str, Any] | None) -> dict[str, Any]:
    candidates = [payload for payload in payloads if payload]
    if not candidates:
        return empty_charts_payload()

    window_days = max(int(payload.get("window_days", CHART_WINDOW_DAYS) or CHART_WINDOW_DAYS) for payload in candidates)
    window_end = max(
        (
            _parse_timestamp(payload.get("window_end"))
            or utc_now().astimezone(UTC).replace(second=0, microsecond=0)
        )
        for payload in candidates
    )
    window_start = window_end - timedelta(days=window_days)
    merged_payload = empty_charts_payload(window_days=window_days, window_end=window_end)

    for key in CHART_SERIES_KEYS:
        merged_points: list[tuple[datetime, float]] = []
        for payload in candidates:
            for point in payload.get(key, {}).get("points", []):
                timestamp = _parse_timestamp(point.get("time"))
                value = _safe_float(point.get("value"))
                if timestamp and value is not None:
                    merged_points.append((timestamp, value))
        merged_payload[key] = _normalize_chart_series(merged_points, window_start, window_end)

    return merged_payload


def parse_daily_geomagnetic_kp_series(text: str) -> list[tuple[datetime, float]]:
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
            value = _safe_float(raw_value)
            if value is None or value < 0:
                continue
            series.append((base_time + timedelta(hours=slot_index * 3), value))

    return series


def fetch_noaa_chart_payload(
    noaa_client: NoaaSwpcClient,
    window_days: int = CHART_WINDOW_DAYS,
) -> dict[str, Any]:
    window_end = utc_now().astimezone(UTC).replace(second=0, microsecond=0)
    window_start = window_end - timedelta(days=window_days)

    http = noaa_client.http
    chart_payload = empty_charts_payload(window_days=window_days, window_end=window_end)

    observed_rows = NoaaSwpcClient._normalize_rows(http.get_json(NoaaSwpcClient.OBSERVED_KP_URL))
    observed_points: list[tuple[datetime, float]] = []
    for row in observed_rows:
        timestamp = _parse_timestamp(row.get("time_tag"))
        value = _safe_float(row.get("Kp"))
        if timestamp and value is not None and value >= 0:
            observed_points.append((timestamp, value))

    daily_kp_points = parse_daily_geomagnetic_kp_series(http.get_text(DAILY_GEOMAGNETIC_URL))
    estimated_points = list(daily_kp_points)
    observed_points.extend(daily_kp_points)
    estimated_rows = NoaaSwpcClient._normalize_rows(http.get_json(NoaaSwpcClient.KP_URL))
    latest_estimated_row = noaa_client._pick_latest_estimated_kp_row(estimated_rows)
    latest_estimated_time = _parse_timestamp(latest_estimated_row.get("time_tag"))
    latest_estimated_value = noaa_client._extract_kp_value(latest_estimated_row)
    if latest_estimated_value == 0.0:
        daily_fallback = noaa_client._latest_recent_daily_estimated_kp(
            estimated_points,
            latest_estimated_time,
        )
        if daily_fallback is not None:
            latest_estimated_time, latest_estimated_value = daily_fallback
    if latest_estimated_time and latest_estimated_value is not None and latest_estimated_value >= 0:
        estimated_points.append((latest_estimated_time, latest_estimated_value))

    plasma_rows = NoaaSwpcClient._normalize_rows(
        noaa_client._fetch_first_available(PLASMA_SERIES_URLS)
    )
    ace_swepam_rows: list[dict[str, Any]] = []
    try:
        ace_swepam_rows = NoaaSwpcClient._normalize_rows(
            noaa_client._fetch_first_available(ACE_SWEPAM_SERIES_URLS)
        )
    except Exception:  # noqa: BLE001
        logging.info("ACE SWEPAM archive fetch skipped")
    plasma_points: list[tuple[datetime, float]] = []
    density_points: list[tuple[datetime, float]] = []
    for row in plasma_rows + ace_swepam_rows:
        timestamp = _parse_series_timestamp(row)
        speed_value = _extract_speed_value(row)
        if timestamp and speed_value is not None and speed_value > -9000:
            plasma_points.append((timestamp, speed_value))
        density_value = _extract_density_value(row)
        if timestamp and density_value is not None and density_value > -9000:
            density_points.append((timestamp, density_value))

    mag_rows = NoaaSwpcClient._normalize_rows(
        noaa_client._fetch_first_available(MAG_SERIES_URLS)
    )
    ace_mag_rows: list[dict[str, Any]] = []
    try:
        ace_mag_rows = NoaaSwpcClient._normalize_rows(
            noaa_client._fetch_first_available(ACE_MAG_SERIES_URLS)
        )
    except Exception:  # noqa: BLE001
        logging.info("ACE MAG archive fetch skipped")
    bz_points: list[tuple[datetime, float]] = []
    bt_points: list[tuple[datetime, float]] = []
    for row in mag_rows + ace_mag_rows:
        timestamp = _parse_series_timestamp(row)
        bz_value = _extract_bz_value(row)
        if timestamp and bz_value is not None and bz_value > -9000:
            bz_points.append((timestamp, bz_value))
        bt_value = _extract_bt_value(row)
        if timestamp and bt_value is not None and bt_value > -9000:
            bt_points.append((timestamp, bt_value))

    chart_payload["kp_observed"] = _normalize_chart_series(observed_points, window_start, window_end)
    chart_payload["kp_estimated"] = _normalize_chart_series(estimated_points, window_start, window_end)
    chart_payload["solar_wind_speed_km_s"] = _normalize_chart_series(plasma_points, window_start, window_end)
    chart_payload["proton_density_p_cm3"] = _normalize_chart_series(density_points, window_start, window_end)
    chart_payload["bz_nt"] = _normalize_chart_series(bz_points, window_start, window_end)
    chart_payload["bt_nt"] = _normalize_chart_series(bt_points, window_start, window_end)
    return chart_payload


def _latest_chart_value(charts: dict[str, Any], key: str) -> float | None:
    points = charts.get(key, {}).get("points", [])
    if not points:
        return None
    return _safe_float(points[-1].get("value"))


def _latest_chart_time(charts: dict[str, Any], key: str) -> str | None:
    points = charts.get(key, {}).get("points", [])
    if not points:
        return None
    time_tag = points[-1].get("time")
    return str(time_tag) if time_tag else None


def _chart_series(charts: dict[str, Any], key: str) -> list[tuple[datetime, float]]:
    points = charts.get(key, {}).get("points", [])
    series: list[tuple[datetime, float]] = []
    for point in points:
        timestamp = _parse_timestamp(point.get("time"))
        value = _safe_float(point.get("value"))
        if timestamp and value is not None:
            series.append((timestamp, value))
    return series


def _parse_series_timestamp(row: dict[str, Any]) -> datetime | None:
    return (
        _parse_timestamp(row.get("time_tag"))
        or _parse_timestamp(row.get("time"))
        or _parse_timestamp(row.get("timestamp"))
    )


def _extract_speed_value(row: dict[str, Any]) -> float | None:
    return _safe_float(
        row.get("speed", row.get("proton_speed", row.get("bulk_speed")))
    )


def _extract_density_value(row: dict[str, Any]) -> float | None:
    return _safe_float(
        row.get("density", row.get("proton_density", row.get("dens")))
    )


def _extract_bz_value(row: dict[str, Any]) -> float | None:
    return _safe_float(
        row.get("bz_gsm", row.get("bz", row.get("gsm_bz")))
    )


def _extract_bt_value(row: dict[str, Any]) -> float | None:
    return _safe_float(
        row.get("bt", row.get("b_total", row.get("bt_gsm")))
    )


def _fetch_first_available_json(http: NoaaSwpcClient, urls: list[str]) -> Any:
    errors: list[str] = []
    for url in urls:
        try:
            return http.http.get_json(url)
        except Exception as exc:  # noqa: BLE001
            errors.append(f"{url}: {exc}")
    raise RuntimeError("Solar veri alinamadi: " + " | ".join(errors))


def _fetch_first_available_text(http: NoaaSwpcClient, urls: list[str]) -> str:
    errors: list[str] = []
    for url in urls:
        try:
            return http.http.get_text(url)
        except Exception as exc:  # noqa: BLE001
            errors.append(f"{url}: {exc}")
    raise RuntimeError("Solar veri alinamadi: " + " | ".join(errors))


def _safe_number_from_row(row: dict[str, Any], keys: tuple[str, ...]) -> float | None:
    for key in keys:
        value = _safe_float(row.get(key))
        if value is not None:
            return value
    return None


def _latest_row(rows: list[dict[str, Any]]) -> dict[str, Any]:
    if not rows:
        return {}

    def sort_key(row: dict[str, Any]) -> str:
        return str(row.get("time_tag") or row.get("date") or row.get("time") or "")

    return max(rows, key=sort_key)


def _split_silso_fields(line: str) -> list[str]:
    if ";" in line:
        return [part.strip() for part in line.split(";") if part.strip()]
    if "," in line:
        return [part.strip() for part in line.split(",") if part.strip()]
    return [part.strip() for part in line.split() if part.strip()]


def _parse_silso_daily(text: str) -> dict[str, Any] | None:
    last_valid: tuple[datetime, float] | None = None
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        parts = _split_silso_fields(line)
        if len(parts) < 5:
            continue
        try:
            year, month, day = int(parts[0]), int(parts[1]), int(parts[2])
            value = float(parts[4])
        except (ValueError, TypeError):
            continue
        if value < 0:
            continue
        last_valid = (datetime(year, month, day, tzinfo=UTC), value)
    if not last_valid:
        return None
    date, value = last_valid
    return {"value": value, "date": _isoformat_z(date), "source": "SILSO"}


def _parse_silso_eisn(text: str) -> dict[str, Any] | None:
    last_valid: dict[str, Any] | None = None
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        parts = _split_silso_fields(line)
        if len(parts) < 5:
            continue
        if not re.fullmatch(r"\d{4}", parts[0]):
            continue
        try:
            year, month, day = int(parts[0]), int(parts[1]), int(parts[2])
            value = float(parts[4])
        except (ValueError, TypeError):
            continue
        if value < 0:
            continue
        observed_at = datetime(year, month, day, tzinfo=UTC)
        entry = {
            "value": value,
            "date": _isoformat_z(observed_at),
            "source": "SILSO EISN",
            "provisional": True,
        }
        if last_valid is None or (entry["date"] or "") >= (last_valid.get("date") or ""):
            last_valid = entry
    return last_valid


def _parse_silso_predicted_sunspot(text: str) -> dict[str, Any] | None:
    current_month = utc_now().astimezone(UTC).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    future_entry: dict[str, Any] | None = None
    last_valid: dict[str, Any] | None = None

    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        parts = _split_silso_fields(line)
        if len(parts) < 4:
            continue
        if not re.fullmatch(r"\d{4}", parts[0]):
            continue
        try:
            year, month = int(parts[0]), int(parts[1])
            value = float(parts[3])
        except (ValueError, TypeError):
            continue
        if value < 0:
            continue
        try:
            forecast_date = datetime(year, month, 15, tzinfo=UTC)
        except ValueError:
            continue
        entry = {
            "value": value,
            "date": _isoformat_z(forecast_date),
            "uncertainty": _safe_float(parts[4]) if len(parts) > 4 else None,
            "source": "SILSO KF ML",
        }
        last_valid = entry
        if future_entry is None and forecast_date >= current_month:
            future_entry = entry

    return future_entry or last_valid


def _parse_noaa_sunspot(rows: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not rows:
        return None
    row = _latest_row(rows)
    value = _safe_number_from_row(row, ("ssn", "sunspot_number", "sunspot", "sunspot_num"))
    if value is None:
        return None
    timestamp = _parse_timestamp(row.get("time_tag") or row.get("date") or row.get("time"))
    return {
        "value": value,
        "date": _isoformat_z(timestamp) if timestamp else None,
        "source": "NOAA SWPC",
    }


def _parse_noaa_predicted_sunspot(rows: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not rows:
        return None
    row = _latest_row(rows)
    value = _safe_number_from_row(
        row,
        (
            "predicted_ssn",
            "predicted_sunspot_number",
            "predicted_sunspot",
            "sunspot",
            "ssn",
        ),
    )
    if value is None:
        return None
    timestamp = _parse_timestamp(row.get("time_tag") or row.get("date") or row.get("time"))
    return {
        "value": value,
        "date": _isoformat_z(timestamp) if timestamp else None,
        "source": "NOAA SWPC",
    }


def _xray_class(flux: float | None) -> dict[str, Any] | None:
    if flux is None or flux <= 0:
        return None
    thresholds = [
        ("A", 1e-7),
        ("B", 1e-6),
        ("C", 1e-5),
        ("M", 1e-4),
        ("X", 1e-3),
    ]
    for label, upper in thresholds:
        if flux < upper:
            base = upper / 10
            magnitude = flux / base if base else flux
            return {"class": label, "magnitude": round(magnitude, 2)}
    magnitude = flux / 1e-4
    return {"class": "X", "magnitude": round(magnitude, 2)}


def _parse_xray(rows: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not rows:
        return None
    long_channel: dict[str, Any] | None = None
    short_channel: dict[str, Any] | None = None
    latest_time: datetime | None = None
    for row in rows:
        energy = str(row.get("energy", "")).strip()
        flux = _safe_float(row.get("flux"))
        timestamp = _parse_timestamp(row.get("time_tag") or row.get("time"))
        if not energy or flux is None or timestamp is None:
            continue
        if energy == "0.1-0.8nm":
            if latest_time is None or timestamp >= latest_time:
                long_channel = {"flux": flux, "time": timestamp}
                latest_time = timestamp
        elif energy == "0.05-0.4nm":
            short_channel = {"flux": flux, "time": timestamp}
    if not long_channel and not short_channel:
        return None
    long_flux = long_channel["flux"] if long_channel else None
    short_flux = short_channel["flux"] if short_channel else None
    xray_class = _xray_class(long_flux)
    time_tag = long_channel["time"] if long_channel else short_channel["time"]
    return {
        "time": _isoformat_z(time_tag) if time_tag else None,
        "long_w_m2": long_flux,
        "short_w_m2": short_flux,
        "class": xray_class,
    }


def _parse_xray_series(rows: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not rows:
        return None
    points: list[dict[str, Any]] = []
    for row in rows:
      էնergy = str(row.get("energy", "")).strip()
      if էնergy != "0.1-0.8nm":
          continue
      flux = _safe_float(row.get("flux"))
      timestamp = _parse_timestamp(row.get("time_tag") or row.get("time"))
      if flux is None or flux <= 0 or timestamp is None:
          continue
      points.append(
          {
              "time": _isoformat_z(timestamp),
              "value": flux,
          }
      )
    if not points:
        return None
    points.sort(key=lambda item: str(item.get("time") or ""))
    return {
        "points": points,
        "coverage_days": 1,
        "source": "GOES X-ray",
    }

def _parse_xray_series(rows: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not rows:
        return None
    points: list[dict[str, Any]] = []
    for row in rows:
        energy = str(row.get("energy", "")).strip()
        if energy != "0.1-0.8nm":
            continue
        flux = _safe_float(row.get("flux"))
        timestamp = _parse_timestamp(row.get("time_tag") or row.get("time"))
        if flux is None or flux <= 0 or timestamp is None:
            continue
        points.append(
            {
                "time": _isoformat_z(timestamp),
                "value": flux,
            }
        )
    if not points:
        return None
    points.sort(key=lambda item: str(item.get("time") or ""))
    return {
        "points": points,
        "coverage_days": 1,
        "source": "GOES X-ray",
    }


def _parse_flare_rows(rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    flares: list[dict[str, Any]] = []
    for row in rows:
        flare_class = row.get("max_class") or row.get("class") or row.get("max_classification")
        if not flare_class:
            continue
        flares.append(
            {
                "class": str(flare_class),
                "start": row.get("begin_time") or row.get("start_time"),
                "peak": row.get("peak_time"),
                "end": row.get("end_time"),
                "region": row.get("region") or row.get("active_region"),
                "source": "NOAA SWPC",
            }
        )
    return flares[:8]


def _parse_notifications(payload: Any) -> list[dict[str, Any]]:
    if not isinstance(payload, list):
        return []
    return [row for row in payload if isinstance(row, dict)]


def _parse_latest_cme(notifications: list[dict[str, Any]]) -> dict[str, Any] | None:
    cme_items = [
        item for item in notifications
        if str(item.get("message_type", "")).upper().startswith("CME")
        or "CME" in str(item.get("type", "")).upper()
        or "CME" in str(item.get("message", "")).upper()
    ]
    if not cme_items:
        return None
    cme_items.sort(key=lambda item: str(item.get("issue_time") or item.get("time_tag") or ""), reverse=True)
    message = str(cme_items[0].get("message", "")).strip()
    speed = None
    width = None
    direction = None
    impact = None
    arrival = None
    for token in re.findall(r"(\d{3,5})\s*km/s", message, flags=re.IGNORECASE):
        speed = _safe_float(token)
        break
    for token in re.findall(r"(?:width|angular width)\s*[:=]?\s*(\d{2,3})", message, flags=re.IGNORECASE):
        width = _safe_float(token)
        break
    if "halo" in message.lower():
        direction = "halo"
    else:
        match = re.search(r"(?:direction|dir|toward|towards)\s*[:=]?\s*([NSEW]{1,3})", message, flags=re.IGNORECASE)
        if match:
            direction = match.group(1).upper()
    match = re.search(r"(\d{1,3})\s*%", message)
    if match:
        impact = _safe_float(match.group(1))
    time_match = re.search(r"(\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2})", message)
    if time_match:
        arrival = time_match.group(1).replace(" ", "T")
    return {
        "time": cme_items[0].get("issue_time") or cme_items[0].get("time_tag"),
        "speed_km_s": speed,
        "width_deg": width,
        "direction": direction,
        "impact_probability": impact,
        "arrival_time": arrival,
        "summary": message[:240] if message else None,
        "source": "NOAA SWPC Notifications",
    }


def _parse_latest_radio_burst(notifications: list[dict[str, Any]]) -> dict[str, Any] | None:
    items = [
        item for item in notifications
        if str(item.get("message_type", "")).upper().startswith("RBR")
        or "RADIO" in str(item.get("message", "")).upper()
    ]
    if not items:
        return None
    items.sort(key=lambda item: str(item.get("issue_time") or item.get("time_tag") or ""), reverse=True)
    message = str(items[0].get("message", "")).strip()
    burst_type = None
    match = re.search(r"(Type\s*[IVX]+)", message, flags=re.IGNORECASE)
    if match:
        burst_type = match.group(1).title()
    return {
        "time": items[0].get("issue_time") or items[0].get("time_tag"),
        "type": burst_type,
        "summary": message[:220] if message else None,
        "source": "NOAA SWPC Notifications",
    }


def _parse_flare_class_label(value: str) -> tuple[str | None, float | None]:
    if not value:
        return None, None
    match = re.match(r"([ABCMX])\s*([0-9]+(?:\.[0-9]+)?)", value.strip(), flags=re.IGNORECASE)
    if not match:
        return None, None
    return match.group(1).upper(), _safe_float(match.group(2))


def _xray_flux_from_class(flare_class: dict[str, Any] | None) -> float | None:
    if not flare_class:
        return None
    label = flare_class.get("class")
    magnitude = _safe_float(flare_class.get("magnitude"))
    if not label or magnitude is None:
        return None
    base = {
        "A": 1e-8,
        "B": 1e-7,
        "C": 1e-6,
        "M": 1e-5,
        "X": 1e-4,
    }.get(str(label).upper())
    if base is None:
        return None
    return base * magnitude


def _estimate_solar_flux_from_ssn(ssn: float | None) -> float | None:
    if ssn is None:
        return None
    # Empirical proxy: F10.7 ≈ 63.7 + 0.728*SSN + 0.00089*SSN^2
    return round(63.7 + (0.728 * ssn) + (0.00089 * ssn * ssn), 1)


def _apply_solar_fallbacks(
    solar: dict[str, Any],
    noaa: dict[str, Any] | None = None,
    charts: dict[str, Any] | None = None,
    insights: dict[str, Any] | None = None,
) -> dict[str, Any]:
    solar = copy.deepcopy(solar or {})
    sources = solar.setdefault("sources", {})
    notes: list[str] = []

    sunspot_noaa = solar.get("sunspot_noaa")
    sunspot_silso = solar.get("sunspot_silso")
    if sunspot_noaa is None and sunspot_silso and sunspot_silso.get("value") is not None:
        solar["sunspot_noaa"] = {
            "value": sunspot_silso.get("value"),
            "date": sunspot_silso.get("date"),
            "source": "Model (SILSO->NOAA bridge)",
            "estimated": True,
        }
        sources["sunspot_noaa"] = "Model (SILSO->NOAA bridge)"
        notes.append("sunspot_noaa")
    if sunspot_silso is None and sunspot_noaa and sunspot_noaa.get("value") is not None:
        solar["sunspot_silso"] = {
            "value": sunspot_noaa.get("value"),
            "date": sunspot_noaa.get("date"),
            "source": "Model (NOAA->SILSO bridge)",
            "estimated": True,
        }
        sources["sunspot_silso"] = "Model (NOAA->SILSO bridge)"
        notes.append("sunspot_silso")

    sunspot_now = solar.get("sunspot_noaa") or solar.get("sunspot_silso")
    sunspot_pred = solar.get("sunspot_predicted")
    silso_pred = solar.get("sunspot_silso_predicted")
    if sunspot_pred is None and silso_pred and silso_pred.get("value") is not None:
        solar["sunspot_predicted"] = copy.deepcopy(silso_pred)
        sources["sunspot_predicted"] = silso_pred.get("source") or "SILSO KF ML"
        sunspot_pred = solar["sunspot_predicted"]
    if silso_pred is None and sunspot_pred and sunspot_pred.get("value") is not None:
        solar["sunspot_silso_predicted"] = {
            "value": sunspot_pred.get("value"),
            "date": sunspot_pred.get("date"),
            "source": "Model (NOAA->SILSO forecast bridge)",
            "estimated": True,
        }
        sources["sunspot_silso_predicted"] = "Model (NOAA->SILSO forecast bridge)"
        silso_pred = solar["sunspot_silso_predicted"]
        notes.append("sunspot_silso_predicted")
    if sunspot_pred is None and sunspot_now and sunspot_now.get("value") is not None:
        solar["sunspot_predicted"] = {
            "value": sunspot_now.get("value"),
            "date": sunspot_now.get("date"),
            "source": "Model (SSN persistence)",
            "estimated": True,
        }
        sources["sunspot_predicted"] = "Model (SSN persistence)"
        notes.append("sunspot_predicted")
        sunspot_pred = solar["sunspot_predicted"]
    if solar.get("sunspot_silso_predicted") is None and sunspot_pred and sunspot_pred.get("value") is not None:
        solar["sunspot_silso_predicted"] = {
            "value": sunspot_pred.get("value"),
            "date": sunspot_pred.get("date"),
            "source": "Model (SSN persistence)",
            "estimated": True,
        }
        sources["sunspot_silso_predicted"] = "Model (SSN persistence)"
        notes.append("sunspot_silso_predicted")

    xray = solar.get("xray_flux")
    flares = solar.get("flares") or []
    if xray is None and flares:
        flare_label, flare_mag = _parse_flare_class_label(str(flares[0].get("class") or ""))
        if flare_label and flare_mag is not None:
            flare_class = {"class": flare_label, "magnitude": flare_mag}
            xray = {
                "time": flares[0].get("peak") or flares[0].get("start"),
                "long_w_m2": _xray_flux_from_class(flare_class),
                "short_w_m2": None,
                "class": flare_class,
                "estimated": True,
            }
            solar["xray_flux"] = xray
            sources["xray_flux"] = "Model (flare class)"
            notes.append("xray_flux")

    if not flares and xray and xray.get("class"):
        flare_class = xray.get("class")
        flare_label = f"{flare_class.get('class')}{flare_class.get('magnitude')}"
        solar["flares"] = [
            {
                "class": flare_label,
                "start": xray.get("time"),
                "peak": xray.get("time"),
                "end": None,
                "region": None,
                "source": "Model (X-ray class)",
                "estimated": True,
            }
        ]
        sources["flares"] = "Model (X-ray class)"
        notes.append("flares")

    if solar.get("solar_flux") is None:
        ssn = None
        if sunspot_now and sunspot_now.get("value") is not None:
            ssn = _safe_float(sunspot_now.get("value"))
        if ssn is not None:
            flux_value = _estimate_solar_flux_from_ssn(ssn)
            if flux_value is not None:
                solar["solar_flux"] = {
                    "value": flux_value,
                    "time": sunspot_now.get("date"),
                    "source": "Model (SSN->F10.7)",
                    "estimated": True,
                }
                sources["solar_flux"] = "Model (SSN->F10.7)"
                notes.append("solar_flux")

    if solar.get("radio_burst") is None and xray and xray.get("class"):
        flare_class = xray.get("class")
        label = flare_class.get("class")
        magnitude = flare_class.get("magnitude")
        if label:
            severity = "olası" if label in {"M", "X"} else "düşük olasılık"
            solar["radio_burst"] = {
                "time": xray.get("time"),
                "type": "Proxy",
                "summary": f"X-ray sınıfı {label}{magnitude or ''} nedeniyle radio burst {severity}.",
                "source": "Model (X-ray proxy)",
                "estimated": True,
            }
            sources["radio_burst"] = "Model (X-ray proxy)"
            notes.append("radio_burst")

    if solar.get("cme") is None:
        noaa = noaa or {}
        insights = insights or {}
        cme_window = insights.get("cme_window") if isinstance(insights, dict) else None
        speed = _safe_float(noaa.get("solar_wind_speed_km_s"))
        bz = _safe_float(noaa.get("bz_nt"))
        confidence = _safe_float(cme_window.get("confidence_percent")) if isinstance(cme_window, dict) else None
        impact = None
        if confidence is not None:
            impact = min(95.0, max(5.0, confidence))
        if bz is not None and bz < -10 and impact is not None:
            impact = min(98.0, impact + 8.0)
        arrival = cme_window.get("window_start") if isinstance(cme_window, dict) else None
        direction = "Earthward" if isinstance(cme_window, dict) and cme_window.get("status") in {"active", "watch"} else None
        solar["cme"] = {
            "time": cme_window.get("window_start") if isinstance(cme_window, dict) else None,
            "speed_km_s": speed,
            "width_deg": None,
            "direction": direction,
            "impact_probability": impact,
            "arrival_time": arrival,
            "summary": "Yakın-Dünya NOAA verileriyle türetilmiş CME olasılığı.",
            "source": "Model (NOAA near-Earth + CME window)",
            "estimated": True,
        }
        sources["cme"] = "Model (NOAA near-Earth + CME window)"
        notes.append("cme")

    if notes:
        solar["estimated_fields"] = notes
    return solar


def _parse_solar_flux(rows: list[dict[str, Any]]) -> dict[str, Any] | None:
    if not rows:
        return None
    row = _latest_row(rows)
    value = _safe_number_from_row(
        row,
        (
            "f10.7",
            "f107",
            "f10_7",
            "f10.7_observed",
            "f107_obs",
        ),
    )
    if value is None:
        return None
    timestamp = _parse_timestamp(row.get("time_tag") or row.get("date") or row.get("time"))
    return {
        "value": value,
        "time": _isoformat_z(timestamp) if timestamp else None,
        "source": "NOAA SWPC",
    }


def fetch_solar_focus_payload(noaa_client: NoaaSwpcClient) -> dict[str, Any]:
    solar: dict[str, Any] = {"sources": {}}
    errors: dict[str, str] = {}

    try:
        noaa_rows = NoaaSwpcClient._normalize_rows(_fetch_first_available_json(noaa_client, SUNSPOT_NOAA_URLS))
        solar["sunspot_noaa"] = _parse_noaa_sunspot(noaa_rows)
        solar["sources"]["sunspot_noaa"] = SUNSPOT_NOAA_URLS
    except Exception as exc:  # noqa: BLE001
        errors["sunspot_noaa"] = str(exc)

    try:
        pred_rows = NoaaSwpcClient._normalize_rows(_fetch_first_available_json(noaa_client, SUNSPOT_PREDICT_NOAA_URLS))
        solar["sunspot_predicted"] = _parse_noaa_predicted_sunspot(pred_rows)
        solar["sources"]["sunspot_predicted"] = SUNSPOT_PREDICT_NOAA_URLS
    except Exception as exc:  # noqa: BLE001
        errors["sunspot_predicted"] = str(exc)

    silso_errors: list[str] = []
    try:
        silso_current_text = _fetch_first_available_text(noaa_client, SILSO_EISN_URLS)
        solar["sunspot_silso"] = _parse_silso_eisn(silso_current_text)
        solar["sources"]["sunspot_silso"] = SILSO_EISN_URLS
    except Exception as exc:  # noqa: BLE001
        silso_errors.append(str(exc))

    try:
        if solar.get("sunspot_silso") is None:
            silso_text = _fetch_first_available_text(noaa_client, SILSO_DAILY_URLS)
            solar["sunspot_silso"] = _parse_silso_daily(silso_text)
            solar["sources"]["sunspot_silso"] = SILSO_DAILY_URLS
    except Exception as exc:  # noqa: BLE001
        silso_errors.append(str(exc))

    if solar.get("sunspot_silso") is None and silso_errors:
        errors["sunspot_silso"] = " | ".join(silso_errors)

    try:
        silso_predict_text = _fetch_first_available_text(noaa_client, SILSO_PREDICT_URLS)
        solar["sunspot_silso_predicted"] = _parse_silso_predicted_sunspot(silso_predict_text)
        solar["sources"]["sunspot_silso_predicted"] = SILSO_PREDICT_URLS
    except Exception as exc:  # noqa: BLE001
        errors["sunspot_silso_predicted"] = str(exc)

    try:
        xray_rows = NoaaSwpcClient._normalize_rows(_fetch_first_available_json(noaa_client, GOES_XRAY_URLS))
        solar["xray_flux"] = _parse_xray(xray_rows)
        solar["sources"]["xray_flux"] = GOES_XRAY_URLS
        solar["xray_series"] = _parse_xray_series(xray_rows)
        solar["sources"]["xray_series"] = GOES_XRAY_URLS
    except Exception as exc:  # noqa: BLE001
        errors["xray_flux"] = str(exc)

    try:
        flare_rows = NoaaSwpcClient._normalize_rows(_fetch_first_available_json(noaa_client, SOLAR_FLARE_URLS))
        solar["flares"] = _parse_flare_rows(flare_rows)
        solar["sources"]["flares"] = SOLAR_FLARE_URLS
    except Exception as exc:  # noqa: BLE001
        errors["flares"] = str(exc)

    try:
        notifications = _parse_notifications(_fetch_first_available_json(noaa_client, NOTIFICATIONS_URLS))
        solar["cme"] = _parse_latest_cme(notifications)
        solar["radio_burst"] = _parse_latest_radio_burst(notifications)
        solar["sources"]["notifications"] = NOTIFICATIONS_URLS
    except Exception as exc:  # noqa: BLE001
        errors["notifications"] = str(exc)

    try:
        flux_rows = NoaaSwpcClient._normalize_rows(_fetch_first_available_json(noaa_client, SOLAR_FLUX_URLS))
        solar["solar_flux"] = _parse_solar_flux(flux_rows)
        solar["sources"]["solar_flux"] = SOLAR_FLUX_URLS
    except Exception as exc:  # noqa: BLE001
        errors["solar_flux"] = str(exc)

    if errors:
        solar["errors"] = errors
    return solar


def _latest_point_before(points: list[tuple[datetime, float]], target: datetime) -> tuple[datetime, float] | None:
    candidate: tuple[datetime, float] | None = None
    for point in points:
        if point[0] <= target:
            candidate = point
        else:
            break
    return candidate


def _recent_values(points: list[tuple[datetime, float]], since: datetime) -> list[float]:
    return [value for timestamp, value in points if timestamp >= since]


def enrich_latest_payload_with_charts(
    payload: dict[str, Any] | None,
    charts: dict[str, Any],
) -> dict[str, Any] | None:
    if not payload:
        return payload

    evaluation = _mapping(payload.get("evaluation"))
    if payload.get("evaluation") is not evaluation:
        payload["evaluation"] = evaluation
    noaa = _mapping(evaluation.get("noaa"))
    if evaluation.get("noaa") is not noaa:
        evaluation["noaa"] = noaa
    authoritative_kp = _latest_chart_value(charts, "kp_observed")
    if authoritative_kp is not None:
        noaa["kp"] = authoritative_kp

    authoritative_kp_estimated = _latest_chart_value(charts, "kp_estimated")
    if authoritative_kp_estimated is not None:
        noaa["kp_estimated"] = authoritative_kp_estimated

    if noaa.get("solar_wind_speed_km_s") is None:
        fallback = _latest_chart_value(charts, "solar_wind_speed_km_s")
        if fallback is not None:
            noaa["solar_wind_speed_km_s"] = fallback
    if noaa.get("bz_nt") is None:
        fallback = _latest_chart_value(charts, "bz_nt")
        if fallback is not None:
            noaa["bz_nt"] = fallback
    noaa["observed_kp_at"] = _latest_chart_time(charts, "kp_observed")
    noaa["estimated_kp_at"] = _latest_chart_time(charts, "kp_estimated")

    if not noaa.get("observed_at"):
        for chart_key in ("kp_estimated", "kp_observed", "solar_wind_speed_km_s", "bz_nt"):
            fallback_time = _latest_chart_time(charts, chart_key)
            if fallback_time:
                noaa["observed_at"] = fallback_time
                break
    return payload


def _event_snapshot(entry: dict[str, Any]) -> dict[str, Any]:
    evaluation = _entry_evaluation(entry)
    noaa = _entry_noaa(entry)
    return {
        "generated_at": entry.get("generated_at"),
        "level": evaluation.get("level"),
        "risk_percent": _safe_float(evaluation.get("risk_percent") if evaluation.get("risk_percent") is not None else evaluation.get("score")),
        "kp": _safe_float(noaa.get("kp")),
        "kp_estimated": _safe_float(noaa.get("kp_estimated")),
        "solar_wind_speed_km_s": _safe_float(noaa.get("solar_wind_speed_km_s")),
        "bz_nt": _safe_float(noaa.get("bz_nt")),
        "proton_density_p_cm3": _safe_float(noaa.get("proton_density_p_cm3")),
    }


def _history_entry_payload(entry: dict[str, Any]) -> dict[str, Any]:
    evaluation = _entry_evaluation(entry)
    noaa = _entry_noaa(entry)
    kp_lstm = _entry_kp_lstm(entry)
    return {
        "generated_at": entry.get("generated_at"),
        "level": evaluation.get("level"),
        "score": evaluation.get("score"),
        "risk_percent": evaluation.get("risk_percent"),
        "kp": noaa.get("kp"),
        "kp_estimated": noaa.get("kp_estimated"),
        "kp_lstm_predicted_kp": kp_lstm.get("predicted_kp"),
        "kp_lstm_target_time": kp_lstm.get("target_time"),
        "kp_lstm_confidence_percent": kp_lstm.get("confidence_percent"),
        "kp_lstm_training_samples": kp_lstm.get("training_samples"),
        "kp_lstm_live_training_samples": kp_lstm.get("live_training_samples"),
        "kp_lstm_archive_training_samples": kp_lstm.get("archive_training_samples"),
        "kp_lstm_train_rmse": kp_lstm.get("train_rmse"),
        "solar_wind_speed_km_s": noaa.get("solar_wind_speed_km_s"),
        "proton_density_p_cm3": noaa.get("proton_density_p_cm3"),
        "bz_nt": noaa.get("bz_nt"),
        "bt_nt": noaa.get("bt_nt"),
    }


def _similarity_percent(current: dict[str, Any], candidate: dict[str, Any]) -> int:
    weighted_distance = 0.0
    total_weight = 0.0
    metrics = (
        ("risk_percent", 100.0, 0.30),
        ("kp", 9.0, 0.22),
        ("kp_estimated", 9.0, 0.08),
        ("solar_wind_speed_km_s", 500.0, 0.20),
        ("bz_nt", 20.0, 0.15),
        ("proton_density_p_cm3", 40.0, 0.05),
    )
    for key, scale, weight in metrics:
        current_value = current.get(key)
        candidate_value = candidate.get(key)
        if current_value is None or candidate_value is None:
            continue
        weighted_distance += min(abs(float(current_value) - float(candidate_value)) / scale, 1.0) * weight
        total_weight += weight

    if total_weight <= 0:
        similarity = 0
    else:
        similarity = int(round((1.0 - min(1.0, weighted_distance / total_weight)) * 100))

    if current.get("level") and current.get("level") == candidate.get("level"):
        similarity += 6
    current_risk = current.get("risk_percent")
    candidate_risk = candidate.get("risk_percent")
    if current_risk is not None and candidate_risk is not None and abs(float(current_risk) - float(candidate_risk)) <= 8.0:
        similarity += 4
    return max(0, min(100, similarity))


def build_similar_events(
    latest: dict[str, Any] | None,
    history: list[dict[str, Any]],
    limit: int = 3,
) -> list[dict[str, Any]]:
    if not latest:
        return []

    current = _event_snapshot(latest)
    current_time = _parse_timestamp(current.get("generated_at"))
    candidates: list[dict[str, Any]] = []
    for item in history:
        if not isinstance(item, dict):
            continue
        generated_at = item.get("generated_at")
        if generated_at and generated_at == latest.get("generated_at"):
            continue
        snapshot = _event_snapshot(item)
        if not any(snapshot.get(key) is not None for key in ("risk_percent", "kp", "solar_wind_speed_km_s", "bz_nt")):
            continue
        similarity = _similarity_percent(current, snapshot)
        snapshot["similarity_percent"] = similarity
        candidates.append(snapshot)

    candidates.sort(
        key=lambda item: (
            int(item.get("similarity_percent", 0)),
            str(item.get("generated_at") or ""),
        ),
        reverse=True,
    )

    selected: list[dict[str, Any]] = []
    for candidate in candidates:
        candidate_time = _parse_timestamp(candidate.get("generated_at"))
        too_close = False
        for existing in selected:
            existing_time = _parse_timestamp(existing.get("generated_at"))
            if not candidate_time or not existing_time:
                continue
            if abs((candidate_time - existing_time).total_seconds()) < 3600:
                too_close = True
                break
        if too_close:
            continue

        delta_hours: int | None = None
        if current_time and candidate_time:
            delta_hours = int(round(abs((current_time - candidate_time).total_seconds()) / 3600.0))

        selected.append(
            {
                "generated_at": candidate.get("generated_at"),
                "level": candidate.get("level"),
                "risk_percent": candidate.get("risk_percent"),
                "similarity_percent": candidate.get("similarity_percent"),
                "kp": candidate.get("kp"),
                "kp_estimated": candidate.get("kp_estimated"),
                "solar_wind_speed_km_s": candidate.get("solar_wind_speed_km_s"),
                "bz_nt": candidate.get("bz_nt"),
                "delta_hours": delta_hours,
            }
        )
        if len(selected) >= limit:
            break

    return selected


def infer_cme_window(
    latest: dict[str, Any] | None,
    charts: dict[str, Any],
) -> dict[str, Any]:
    if not latest:
        return {
            "status": "quiet",
            "title": "Belirgin pencere yok",
            "summary": "Canlı veri geldikçe CME etki penceresi burada oluşacak.",
            "window_start": None,
            "window_end": None,
            "confidence_percent": 0,
            "drivers": [],
            "inference": "Bu alan, yakın-Dünya NOAA ölçümlerinden türetilmiş bir çıkarımdır.",
        }

    noaa = _entry_noaa(latest)
    now = (
        _parse_timestamp(noaa.get("observed_at"))
        or _parse_timestamp(latest.get("generated_at"))
        or utc_now()
    )
    speed_points = _chart_series(charts, "solar_wind_speed_km_s")
    bz_points = _chart_series(charts, "bz_nt")
    kp_points = _chart_series(charts, "kp_estimated")

    latest_speed = _safe_float(noaa.get("solar_wind_speed_km_s"))
    latest_bz = _safe_float(noaa.get("bz_nt"))
    latest_kp_estimated = _safe_float(noaa.get("kp_estimated"))
    speed_6h_ago = _latest_point_before(speed_points, now - timedelta(hours=6))
    speed_jump_6h = (
        float(latest_speed) - float(speed_6h_ago[1])
        if latest_speed is not None and speed_6h_ago is not None
        else None
    )
    max_speed_24h = max(_recent_values(speed_points, now - timedelta(hours=24)), default=latest_speed or 0.0)
    min_bz_6h = min(_recent_values(bz_points, now - timedelta(hours=6)), default=latest_bz or 0.0)
    max_kp_24h = max(_recent_values(kp_points, now - timedelta(hours=24)), default=latest_kp_estimated or 0.0)

    signal_score = 0
    drivers: list[str] = []
    if latest_speed is not None:
        if latest_speed >= 550:
            signal_score += 24
            drivers.append("hızlı güneş rüzgârı")
        elif latest_speed >= 480:
            signal_score += 12
    if speed_jump_6h is not None:
        if speed_jump_6h >= 120:
            signal_score += 22
            drivers.append("son 6 saatte hız sıçraması")
        elif speed_jump_6h >= 70:
            signal_score += 10
    if min_bz_6h <= -10:
        signal_score += 22
        drivers.append("güçlü negatif Bz")
    elif min_bz_6h <= -5:
        signal_score += 12
    if max_kp_24h >= 5:
        signal_score += 18
        drivers.append("artan Kp")
    elif max_kp_24h >= 4:
        signal_score += 10
    if latest_kp_estimated is not None and latest_kp_estimated >= 4:
        signal_score += 10

    if signal_score >= 55:
        status = "active"
        title = "Etki penceresi açık olabilir"
        summary = "Yakın-Dünya ölçümleri, CME şoku veya hızlı akışın şu anda Dünya çevresine ulaşmış olabileceğini düşündürüyor."
        window_start = now - timedelta(hours=1)
        window_end = now + timedelta(hours=14)
        confidence = min(92, 62 + signal_score // 2)
    elif signal_score >= 35:
        status = "watch"
        title = "Yakın etki olasılığı"
        summary = "Son hız, Bz ve Kp eğilimleri önümüzdeki saatlerde belirginleşebilecek bir CME etki penceresine işaret ediyor."
        window_start = now + timedelta(hours=3)
        window_end = now + timedelta(hours=18)
        confidence = min(84, 48 + signal_score // 2)
    elif signal_score >= 18:
        status = "monitor"
        title = "İzleme penceresi"
        summary = "Net bir şoku doğrulayan imza yok, ancak yakın dönem sinyalleri önümüzdeki 6-24 saat için artmış dikkat gerektiriyor."
        window_start = now + timedelta(hours=6)
        window_end = now + timedelta(hours=24)
        confidence = min(70, 38 + signal_score // 2)
    else:
        status = "quiet"
        title = "Belirgin pencere yok"
        summary = "Şu anda yakın-Dünya verilerinde belirgin bir CME varış imzası görünmüyor. Rutin takip yeterli."
        window_start = None
        window_end = None
        confidence = max(32, signal_score + 28)

    return {
        "status": status,
        "title": title,
        "summary": summary,
        "window_start": _isoformat_z(window_start) if window_start else None,
        "window_end": _isoformat_z(window_end) if window_end else None,
        "confidence_percent": int(confidence),
        "drivers": drivers[:3],
        "inference": "Bu pencere, LASCO veya SDO görüntülerinden doğrudan tespit değildir; yakın-Dünya NOAA hız, Bz ve Kp sinyallerinden üretilmiş operasyonel bir çıkarımdır.",
    }


def build_operational_insights(
    latest: dict[str, Any] | None,
    history: list[dict[str, Any]],
    charts: dict[str, Any],
) -> dict[str, Any]:
    return {
        "similar_events": build_similar_events(latest, history),
        "cme_window": infer_cme_window(latest, charts),
    }


def build_panel_payload(
    payload: dict[str, Any] | None,
    history: list[dict[str, Any]],
    charts: dict[str, Any] | None = None,
    insight_history: list[dict[str, Any]] | None = None,
    solar: dict[str, Any] | None = None,
    access: dict[str, Any] | None = None,
    notifications: dict[str, Any] | None = None,
) -> dict[str, Any]:
    chart_payload = charts or empty_charts_payload()
    solar_payload = solar or {}
    latest = copy.deepcopy(payload) if payload else None
    access_payload = copy.deepcopy(access) if access else load_access_state()
    if latest:
        latest["web_images"] = web_image_map(latest)
        latest["web_nasa_images"] = web_nasa_image_cards(latest)
        latest = enrich_latest_payload_with_charts(latest, chart_payload)
    raw_history = insight_history if insight_history is not None else history
    return {
        "latest": latest,
        "history": [
            _history_entry_payload(item)
            for item in history
            if isinstance(item, dict)
        ],
        "charts": chart_payload,
        "insights": build_operational_insights(latest, raw_history, chart_payload),
        "solar": solar_payload,
        "access": access_payload,
        "notifications": copy.deepcopy(notifications) if notifications else None,
    }


def _format_turkey_timestamp(value: Any) -> str:
    timestamp = _parse_timestamp(value)
    if timestamp is None:
        text = str(value or "").strip()
        return text or "-"
    local_time = timestamp.astimezone(TURKEY_TZ)
    return f"{local_time.strftime('%d.%m.%Y %H:%M')} TSİ"


class NotificationManager:
    def __init__(
        self,
        settings_path: Path = NOTIFICATION_SETTINGS_PATH,
        state_path: Path = NOTIFICATION_STATE_PATH,
    ) -> None:
        self.settings_path = settings_path
        self.state_path = state_path
        self._lock = threading.Lock()

    def payload(self) -> dict[str, Any]:
        settings = load_notification_settings(self.settings_path)
        public_settings = dict(settings)
        public_settings["pushbullet_token"] = ""
        return {
            "settings": public_settings,
            "state": load_notification_state(self.state_path),
            "provider": "pushbullet",
            "instructions": {
                "phone_app": "Telefon bildirimleri bu panelde Pushbullet üzerinden gönderilir.",
                "topic_note": "Bildirim alabilmek için yerel panelde Pushbullet access token tanımlanmalıdır.",
                "admin_note": "Pushbullet token yalnızca yerel yönetici ekranında saklanır ve otomatik özetler bu kanal üzerinden iletilir.",
            },
        }

    def update_settings(self, updates: dict[str, Any]) -> dict[str, Any]:
        with self._lock:
            current = load_notification_settings(self.settings_path)
            merged = {**current, **(updates or {})}
            merged["pushbullet_token"] = ""
            settings = save_notification_settings(merged, self.settings_path)
            if (
                str(current.get("provider") or "auto") != str(settings.get("provider") or "auto")
                or str(current.get("pushbullet_token") or "") != str(settings.get("pushbullet_token") or "")
            ):
                state = load_notification_state(self.state_path)
                state["last_sent_at"] = None
                state["last_error"] = None
                save_notification_state(state, self.state_path)
        payload = self.payload()
        payload["settings"] = settings
        return payload

    @staticmethod
    def _level_rank(level: str | None) -> int:
        order = {
            "normal": 0,
            "watch": 1,
            "warning": 2,
            "severe": 3,
        }
        return order.get(str(level or "normal").lower(), 0)

    @staticmethod
    def _priority_from_level(level: str | None) -> str:
        mapping = {
            "normal": "2",
            "watch": "3",
            "warning": "4",
            "severe": "5",
        }
        return mapping.get(str(level or "normal").lower(), "3")

    @staticmethod
    def _best_click_url(access: dict[str, Any] | None) -> str | None:
        if not isinstance(access, dict):
            return None
        public_url = str(access.get("public_url") or "").strip()
        local_url = str(access.get("local_url") or "").strip()
        return public_url or local_url or None

    @staticmethod
    def _topic_url(settings: dict[str, Any]) -> str:
        server_url = str(settings.get("server_url") or "https://ntfy.sh").strip().rstrip("/")
        topic = str(settings.get("topic") or "").strip().strip("/")
        if not topic:
            raise ValueError("Telefon bildirimi için önce bir ntfy konu adı gir.")
        return f"{server_url}/{topic}"

    @staticmethod
    def _pushbullet_token(settings: dict[str, Any]) -> str:
        return str(settings.get("pushbullet_token") or "").strip()

    def _publish_ntfy(
        self,
        settings: dict[str, Any],
        title: str,
        message: str,
        priority: str = "3",
        tags: list[str] | None = None,
        click_url: str | None = None,
    ) -> None:
        topic_url = self._topic_url(settings)
        headers = {
            "User-Agent": "SpaceWeatherPanel/1.0",
            "Title": title,
            "Priority": priority,
        }
        if tags:
            headers["Tags"] = ",".join(tags)
        if click_url:
            headers["Click"] = click_url
        request = Request(
            topic_url,
            data=message.encode("utf-8"),
            headers=headers,
            method="POST",
        )
        try:
            with urlopen(request, timeout=12):
                return
        except Exception as exc:  # noqa: BLE001
            logging.warning("ntfy direct POST basarisiz, PowerShell fallback deneniyor: %s", exc)
            self._publish_ntfy_powershell(
                topic_url=topic_url,
                title=title,
                message=message,
                priority=priority,
                tags=tags or [],
                click_url=click_url,
            )

    @staticmethod
    def _publish_ntfy_powershell(
        *,
        topic_url: str,
        title: str,
        message: str,
        priority: str,
        tags: list[str],
        click_url: str | None,
    ) -> None:
        def _ps_escape(value: str) -> str:
            return str(value).replace("'", "''")

        temp_path: Path | None = None
        try:
            with tempfile.NamedTemporaryFile("wb", delete=False, suffix=".txt") as handle:
                handle.write(message.encode("utf-8"))
                temp_path = Path(handle.name)

            header_entries = [
                f"'User-Agent'='SpaceWeatherPanel/1.0'",
                f"'Title'='{_ps_escape(title)}'",
                f"'Priority'='{_ps_escape(priority)}'",
            ]
            if tags:
                header_entries.append(f"'Tags'='{_ps_escape(','.join(tags))}'")
            if click_url:
                header_entries.append(f"'Click'='{_ps_escape(click_url)}'")

            command = (
                f"$headers = @{{{'; '.join(header_entries)}}}; "
                f"Invoke-WebRequest -UseBasicParsing -Method Post "
                f"-Uri '{_ps_escape(topic_url)}' "
                f"-Headers $headers "
                f"-ContentType 'text/plain; charset=utf-8' "
                f"-InFile '{_ps_escape(str(temp_path))}' | Out-Null"
            )
            subprocess.run(
                ["powershell", "-NoProfile", "-Command", command],
                check=True,
                capture_output=True,
                text=True,
                timeout=20,
            )
        finally:
            if temp_path is not None:
                try:
                    if temp_path.exists():
                        temp_path.unlink()
                except Exception:  # noqa: BLE001
                    logging.debug("Gecici ntfy dosyasi silinemedi: %s", temp_path)

    @staticmethod
    def _publish_pushbullet_powershell(
        *,
        token: str,
        title: str,
        body: str,
        priority: str,
    ) -> None:
        def _ps_escape(value: str) -> str:
            return str(value).replace("'", "''")

        temp_path: Path | None = None
        try:
            payload = {
                "type": "note",
                "title": title,
                "body": body,
            }
            with tempfile.NamedTemporaryFile("w", delete=False, suffix=".json", encoding="utf-8") as handle:
                json.dump(payload, handle, ensure_ascii=False)
                temp_path = Path(handle.name)

            command = (
                "$headers = @{"
                f"'User-Agent'='SpaceWeatherPanel/1.0'; "
                f"'Access-Token'='{_ps_escape(token)}'; "
                "'Content-Type'='application/json; charset=utf-8'; "
                f"'X-Notification-Priority'='{_ps_escape(priority)}'"
                "}; "
                "try { "
                f"$response = Invoke-WebRequest -UseBasicParsing -Method Post -Uri 'https://api.pushbullet.com/v2/pushes' -Headers $headers -InFile '{_ps_escape(str(temp_path))}' -TimeoutSec 20; "
                "if ($response.StatusCode -lt 200 -or $response.StatusCode -ge 300) { throw ('Pushbullet HTTP ' + [string]$response.StatusCode) } "
                "} catch { "
                "if ($_.Exception.Response) { "
                "try { "
                "$stream = $_.Exception.Response.GetResponseStream(); "
                "if ($stream) { "
                "$reader = New-Object System.IO.StreamReader($stream); "
                "$bodyText = $reader.ReadToEnd(); "
                "$reader.Close(); "
                "if ($bodyText) { throw $bodyText } "
                "} "
                "} catch { throw $_ } "
                "} "
                "throw $_ "
                "}"
            )
            completed = subprocess.run(
                ["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", command],
                check=False,
                capture_output=True,
                text=True,
                timeout=25,
            )
            if completed.returncode != 0:
                stderr = (completed.stderr or completed.stdout or "").strip()
                raise RuntimeError(stderr or "Pushbullet PowerShell istegi basarisiz oldu.")
        finally:
            if temp_path is not None:
                try:
                    if temp_path.exists():
                        temp_path.unlink()
                except Exception:  # noqa: BLE001
                    logging.debug("Gecici Pushbullet dosyasi silinemedi: %s", temp_path)

    def _publish_pushbullet(
        self,
        settings: dict[str, Any],
        title: str,
        message: str,
        priority: str = "3",
        tags: list[str] | None = None,
        click_url: str | None = None,
    ) -> None:
        token = self._pushbullet_token(settings)
        if not token:
            raise ValueError("Pushbullet access token girilmedi.")

        body = message
        if click_url:
            body = f"{message}\n\nPanel: {click_url}"
        if tags:
            body = f"{body}\nEtiketler: {', '.join(tags)}"

        request = Request(
            "https://api.pushbullet.com/v2/pushes",
            data=json.dumps(
                {
                    "type": "note",
                    "title": title,
                    "body": body,
                }
            ).encode("utf-8"),
            headers={
                "User-Agent": "SpaceWeatherPanel/1.0",
                "Access-Token": token,
                "Content-Type": "application/json; charset=utf-8",
                "X-Notification-Priority": priority,
            },
            method="POST",
        )
        try:
            with urlopen(request, timeout=15) as response:
                response.read()
                return
        except HTTPError as exc:
            response_text = ""
            try:
                response_text = exc.read().decode("utf-8", errors="ignore").strip()
            except Exception:  # noqa: BLE001
                response_text = ""
            status_code = getattr(exc, "code", None)
            if response_text:
                raise RuntimeError(f"Pushbullet HTTP {status_code}: {response_text}") from exc
            raise RuntimeError(f"Pushbullet HTTP {status_code}: bildirim reddedildi.") from exc
        except Exception as exc:  # noqa: BLE001
            logging.warning("Pushbullet direct POST basarisiz, PowerShell fallback denenecek: %s", exc)
            try:
                self._publish_pushbullet_powershell(
                    token=token,
                    title=title,
                    body=body,
                    priority=priority,
                )
                return
            except Exception as fallback_exc:  # noqa: BLE001
                if isinstance(exc, URLError):
                    raise RuntimeError(f"Pushbullet bildirimi gonderilemedi: {fallback_exc}") from fallback_exc
                raise RuntimeError(f"Pushbullet bildirimi gonderilemedi: {fallback_exc}") from fallback_exc

    def _publish_notification(
        self,
        settings: dict[str, Any],
        title: str,
        message: str,
        priority: str = "3",
        tags: list[str] | None = None,
        click_url: str | None = None,
    ) -> None:
        if not self._pushbullet_token(settings):
            raise RuntimeError("Pushbullet access token gerekli.")
        self._publish_pushbullet(
            settings,
            title=title,
            message=message,
            priority=priority,
            tags=tags,
            click_url=click_url,
        )

    def _store_state(
        self,
        *,
        level: str | None,
        risk_percent: float | None,
        kp_value: float | None,
        title: str,
        message: str,
        error_message: str | None = None,
        mark_sent: bool = True,
    ) -> dict[str, Any]:
        previous = load_notification_state(self.state_path)
        state = {
            "last_sent_at": _isoformat_z(utc_now()) if mark_sent else previous.get("last_sent_at"),
            "last_level": level if mark_sent else previous.get("last_level"),
            "last_risk_percent": risk_percent if mark_sent else previous.get("last_risk_percent"),
            "last_kp": kp_value if mark_sent else previous.get("last_kp"),
            "last_seen_at": _isoformat_z(utc_now()),
            "last_seen_level": level,
            "last_seen_risk_percent": risk_percent,
            "last_seen_kp": kp_value,
            "last_title": title,
            "last_message": message,
            "last_error": error_message,
        }
        return save_notification_state(state, self.state_path)

    def _store_seen_state(
        self,
        state: dict[str, Any],
        *,
        level: str | None,
        risk_percent: float | None,
        kp_value: float | None,
    ) -> dict[str, Any]:
        next_state = {
            **default_notification_state(),
            **(state or {}),
            "last_seen_at": _isoformat_z(utc_now()),
            "last_seen_level": level,
            "last_seen_risk_percent": risk_percent,
            "last_seen_kp": kp_value,
        }
        return save_notification_state(next_state, self.state_path)

    def _build_event_message(
        self,
        payload: dict[str, Any],
        access: dict[str, Any] | None,
        mode: str = "alert",
    ) -> tuple[str, str, str, list[str], str | None]:
        evaluation = _entry_evaluation(payload)
        noaa = _entry_noaa(payload)
        level = str(evaluation.get("level") or "normal")
        risk_percent = _safe_float(evaluation.get("risk_percent") if evaluation.get("risk_percent") is not None else evaluation.get("score"))
        kp_value = _safe_float(noaa.get("kp"))
        kp_estimated = _safe_float(noaa.get("kp_estimated"))
        wind_speed = _safe_float(noaa.get("solar_wind_speed_km_s"))
        bz_nt = _safe_float(noaa.get("bz_nt"))
        generated_at = payload.get("generated_at") or noaa.get("observed_at")
        generated_at_text = _format_turkey_timestamp(generated_at)
        normalized_mode = str(mode or "alert").lower()
        manual = normalized_mode == "manual"
        periodic = normalized_mode == "periodic"
        title_prefix = "Manuel Özet" if manual else "Düzenli Durum Özeti" if periodic else "Uzay Havası Uyarısı"
        title = f"{title_prefix} | {str(level).upper()}"
        body_lines = [
            f"Seviye: {level}",
            f"Risk: %{risk_percent:.0f}" if risk_percent is not None else "Risk: -",
            f"Kp: {kp_value:.2f}" if kp_value is not None else "Kp: -",
            f"Kp Tahmini: {kp_estimated:.2f}" if kp_estimated is not None else "Kp Tahmini: -",
            f"Güneş rüzgârı: {wind_speed:.0f} km/s" if wind_speed is not None else "Güneş rüzgârı: -",
            f"IMF Bz: {bz_nt:+.1f} nT" if bz_nt is not None else "IMF Bz: -",
            f"Zaman (TSİ): {generated_at_text}",
        ]
        if periodic:
            body_lines.append("Not: Bu bildirim düzenli durum özeti olarak gönderildi.")
        elif not manual:
            body_lines.append("Eylem: Paneli açıp sistemleri kontrol et.")
        message = "\n".join(body_lines)
        tags = ["satellite", "summary" if periodic else "warning", str(level).lower()]
        priority = "2" if periodic and str(level).lower() == "normal" else self._priority_from_level(level)
        return title, message, priority, tags, self._best_click_url(access)

    def send_test(self, access: dict[str, Any] | None = None) -> dict[str, Any]:
        settings = load_notification_settings(self.settings_path)
        title = "Telefon Test Bildirimi"
        message = "Pushbullet bildirim hattı hazır. Bu test bildirimi panelden gönderildi."
        self._publish_notification(
            settings,
            title=title,
            message=message,
            priority="3",
            tags=["satellite", "test"],
            click_url=self._best_click_url(access),
        )
        state = self._store_state(level="normal", risk_percent=None, kp_value=None, title=title, message=message)
        return {"ok": True, "message": "Test bildirimi telefona gönderildi.", "state": state}

    def send_current(self, payload: dict[str, Any], access: dict[str, Any] | None = None) -> dict[str, Any]:
        if not payload:
            raise ValueError("Gönderilecek güncel veri bulunamadı.")
        title, message, priority, tags, click_url = self._build_event_message(payload, access, mode="manual")
        settings = load_notification_settings(self.settings_path)
        self._publish_notification(settings, title=title, message=message, priority=priority, tags=tags, click_url=click_url)
        evaluation = _entry_evaluation(payload)
        noaa = _entry_noaa(payload)
        state = self._store_state(
            level=evaluation.get("level"),
            risk_percent=_safe_float(evaluation.get("risk_percent") if evaluation.get("risk_percent") is not None else evaluation.get("score")),
            kp_value=_safe_float(noaa.get("kp")),
            title=title,
            message=message,
        )
        return {"ok": True, "message": "Güncel durum bildirimi telefona gönderildi.", "state": state}

    def send_pushbullet_event(self, pushbullet_token: str, event_payload: dict[str, Any] | None = None) -> dict[str, Any]:
        token = str(pushbullet_token or "").strip()
        if not token:
            raise ValueError("Pushbullet access token gerekli.")

        payload = event_payload if isinstance(event_payload, dict) else {}
        title = str(payload.get("title") or "Uzay HavasÄ± Bildirimi").strip()
        message = str(payload.get("message") or "").strip()
        if not message:
            raise ValueError("Bildirim metni bos olamaz.")

        priority = str(payload.get("priority") or "3").strip()
        if priority not in {"1", "2", "3", "4", "5"}:
            priority = "3"

        tags = []
        raw_tags = payload.get("tags")
        if isinstance(raw_tags, list):
            for item in raw_tags[:8]:
                text = str(item or "").strip()
                if text:
                    tags.append(text)

        click_url = str(payload.get("click_url") or payload.get("clickUrl") or "").strip() or None
        settings = {
            "provider": "pushbullet",
            "pushbullet_token": token,
        }
        self._publish_notification(
            settings,
            title=title,
            message=message,
            priority=priority,
            tags=tags,
            click_url=click_url,
        )
        return {"ok": True, "message": "Pushbullet bildirimi gÃ¶nderildi."}

    def maybe_send_auto(self, payload: dict[str, Any], access: dict[str, Any] | None = None) -> dict[str, Any] | None:
        settings = load_notification_settings(self.settings_path)
        if not settings.get("enabled") or not self._pushbullet_token(settings):
            return None

        evaluation = _entry_evaluation(payload)
        current_level = str(evaluation.get("level") or "normal").lower()
        risk_percent = _safe_float(evaluation.get("risk_percent") if evaluation.get("risk_percent") is not None else evaluation.get("score"))
        noaa = _entry_noaa(payload)
        kp_value = _safe_float(noaa.get("kp"))
        state = load_notification_state(self.state_path)
        last_sent_at = _parse_timestamp(state.get("last_sent_at"))
        last_seen_level = str(state.get("last_seen_level") or state.get("last_level") or "normal").lower()
        last_seen_risk = _safe_float(state.get("last_seen_risk_percent"))
        if last_seen_risk is None:
            last_seen_risk = _safe_float(state.get("last_risk_percent"))
        last_seen_kp = _safe_float(state.get("last_seen_kp"))
        if last_seen_kp is None:
            last_seen_kp = _safe_float(state.get("last_kp"))
        min_level = str(settings.get("min_level") or "watch").lower()
        cooldown_minutes = int(settings.get("cooldown_minutes") or 60)
        cooldown_active = False
        if last_sent_at is not None:
            cooldown_active = (utc_now() - last_sent_at) < timedelta(minutes=cooldown_minutes)

        level_meets_threshold = self._level_rank(current_level) >= self._level_rank(min_level)
        level_increased = self._level_rank(current_level) > self._level_rank(last_seen_level)
        risk_increased = (
            risk_percent is not None
            and last_seen_risk is not None
            and (risk_percent - last_seen_risk) >= 8.0
        )
        kp_increased = (
            kp_value is not None
            and last_seen_kp is not None
            and (kp_value - last_seen_kp) >= 0.7
        )
        self._store_seen_state(
            state,
            level=current_level,
            risk_percent=risk_percent,
            kp_value=kp_value,
        )
        periodic_due = last_sent_at is None or not cooldown_active
        immediate_trigger = level_increased or risk_increased or kp_increased or (level_meets_threshold and last_sent_at is None)
        if not immediate_trigger and not periodic_due:
            return None
        if cooldown_active and not (level_increased or risk_increased or kp_increased):
            return None

        event_mode = "alert" if immediate_trigger else "periodic"
        title, message, priority, tags, click_url = self._build_event_message(payload, access, mode=event_mode)
        try:
            self._publish_notification(settings, title=title, message=message, priority=priority, tags=tags, click_url=click_url)
            saved_state = self._store_state(
                level=current_level,
                risk_percent=risk_percent,
                kp_value=kp_value,
                title=title,
                message=message,
            )
            return {"ok": True, "state": saved_state}
        except Exception as exc:  # noqa: BLE001
            logging.exception("Telefon bildirimi gönderilemedi")
            self._store_state(
                level=current_level,
                risk_percent=risk_percent,
                kp_value=kp_value,
                title=title,
                message=message,
                error_message=str(exc),
                mark_sent=False,
            )
            return {"ok": False, "error": str(exc)}


class PanelApp:
    def __init__(self, config_path: Path) -> None:
        self.config_path = config_path
        self.config = load_json(config_path)
        self.core = SpaceWeatherEarlyWarningApp(self.config, base_dir=config_path.parent)
        self.output_dir = self.core.output_dir
        self.notifications = NotificationManager()
        self._refresh_lock = threading.Lock()
        self._chart_lock = threading.Lock()
        self._solar_lock = threading.Lock()
        self._chart_cache: dict[str, Any] | None = None
        self._chart_cache_at = 0.0
        self._solar_cache: dict[str, Any] | None = None
        self._solar_cache_at = 0.0
        self._kp_daily_lock = threading.Lock()
        self._kp_daily_forecaster: KpDailyCycleForecaster | None = None
        self._solar_wind_query_lock = threading.Lock()
        self._solar_wind_forecaster: SolarWindSpeedForecaster | None = None
        self._imf_bz_query_lock = threading.Lock()
        self._imf_bz_forecaster: ImfBzForecaster | None = None
        self._background_stop = threading.Event()
        self._background_thread = threading.Thread(
            target=self._background_refresh_loop,
            name="SpaceWeatherPanelBackground",
            daemon=True,
        )
        self._background_thread.start()

    def latest_payload(self) -> dict[str, Any] | None:
        return load_latest_alert(self.output_dir)

    def history_payload(self, limit: int = DEFAULT_DASHBOARD_HISTORY_LIMIT) -> list[dict[str, Any]]:
        return load_history(self.output_dir, limit=limit)

    def chart_history_limit(self, window_days: int = CHART_WINDOW_DAYS) -> int:
        interval_seconds = max(1, int(self.config.get("poll_interval_seconds", 300)))
        samples_per_day = max(24, (86400 + interval_seconds - 1) // interval_seconds)
        return max(DEFAULT_DASHBOARD_HISTORY_LIMIT, (samples_per_day * window_days) + 24)

    def latest_requires_refresh(self, latest: dict[str, Any] | None = None) -> bool:
        current = latest if latest is not None else self.latest_payload()
        if current is None:
            return True
        evaluation = _entry_evaluation(current)
        noaa = _entry_noaa(current)
        return (
            noaa.get("kp_estimated") is None
            or evaluation.get("risk_percent") is None
            or evaluation.get("confidence_percent") is None
            or not evaluation.get("sector_impacts")
            or not current.get("nasa_live_images")
        )

    def charts_payload(self, force_refresh: bool = False) -> dict[str, Any]:
        now = time.monotonic()
        if (
            not force_refresh
            and self._chart_cache is not None
            and (now - self._chart_cache_at) < CHART_CACHE_SECONDS
        ):
            return self._chart_cache

        with self._chart_lock:
            now = time.monotonic()
            if (
                not force_refresh
                and self._chart_cache is not None
                and (now - self._chart_cache_at) < CHART_CACHE_SECONDS
            ):
                return self._chart_cache

            charts = fetch_noaa_chart_payload(self.core.noaa)
            self._chart_cache = charts
            self._chart_cache_at = time.monotonic()
            return charts

    def safe_charts_payload(self, force_refresh: bool = False) -> dict[str, Any]:
        history_charts = build_history_chart_payload(
            self.history_payload(limit=self.chart_history_limit()),
            window_days=CHART_WINDOW_DAYS,
        )
        archive_kp_charts = empty_charts_payload(window_days=CHART_WINDOW_DAYS)
        try:
            archive_kp_charts = build_archive_daily_kp_chart_payload(
                self._get_kp_daily_forecaster(),
                window_days=CHART_WINDOW_DAYS,
            )
        except Exception:  # noqa: BLE001
            logging.exception("Archive daily Kp chart payload failed")
        try:
            charts = merge_chart_payloads(
                history_charts,
                self.charts_payload(force_refresh=force_refresh),
                archive_kp_charts,
            )
            if chart_payload_has_points(charts):
                return charts
            logging.warning("Chart payload bos geldi; yerel gecmis fallback kullaniliyor")
        except Exception:  # noqa: BLE001
            logging.exception("Chart data fetch failed")
        return merge_chart_payloads(history_charts, archive_kp_charts)

    def solar_payload(
        self,
        force_refresh: bool = False,
        noaa_snapshot: dict[str, Any] | None = None,
        charts: dict[str, Any] | None = None,
        insights: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        now = time.monotonic()
        if (
            not force_refresh
            and self._solar_cache is not None
            and (now - self._solar_cache_at) < SOLAR_FOCUS_CACHE_SECONDS
        ):
            return self._solar_cache

        with self._solar_lock:
            now = time.monotonic()
            if (
                not force_refresh
                and self._solar_cache is not None
                and (now - self._solar_cache_at) < SOLAR_FOCUS_CACHE_SECONDS
            ):
                return self._solar_cache
            try:
                solar = fetch_solar_focus_payload(self.core.noaa)
                solar = _apply_solar_fallbacks(
                    solar,
                    noaa=noaa_snapshot,
                    charts=charts,
                    insights=insights,
                )
            except Exception:  # noqa: BLE001
                logging.exception("Solar focus fetch failed")
                solar = _apply_solar_fallbacks(
                    {"errors": {"solar_focus": "Solar veri alinmadi"}},
                    noaa=noaa_snapshot,
                    charts=charts,
                    insights=insights,
                )
            self._solar_cache = solar
            self._solar_cache_at = time.monotonic()
            return solar

    def access_payload(self) -> dict[str, Any]:
        return load_access_state()

    def notification_payload(self) -> dict[str, Any]:
        return self.notifications.payload()

    def update_notification_settings(self, updates: dict[str, Any]) -> dict[str, Any]:
        return self.notifications.update_settings(updates)

    def send_test_notification(self) -> dict[str, Any]:
        return self.notifications.send_test(self.access_payload())

    def send_current_notification(self) -> dict[str, Any]:
        latest = self.latest_payload()
        if latest is None:
            raise ValueError("Önce veri oluşması için panelin en az bir kez yenilenmesi gerekiyor.")
        return self.notifications.send_current(latest, self.access_payload())

    def solar_api_payload(self, force_refresh: bool = False) -> dict[str, Any]:
        latest = self.latest_payload()
        insight_history = self.history_payload(limit=DEFAULT_DASHBOARD_HISTORY_LIMIT)
        charts = self.safe_charts_payload(force_refresh=force_refresh)
        insights = build_operational_insights(latest, insight_history, charts)
        return self.solar_payload(
            force_refresh=force_refresh,
            noaa_snapshot=latest,
            charts=charts,
            insights=insights,
        )

    def _get_kp_daily_forecaster(self) -> KpDailyCycleForecaster:
        if self._kp_daily_forecaster is not None:
            return self._kp_daily_forecaster
        with self._kp_daily_lock:
            if self._kp_daily_forecaster is None:
                self._kp_daily_forecaster = KpDailyCycleForecaster(
                    data_file=BASE_DIR / "Kp_ap_Ap_SN_F107_since_1932.txt",
                )
            return self._kp_daily_forecaster

    def kp_daily_query_payload(self, target_date: str) -> dict[str, Any]:
        if not target_date or not str(target_date).strip():
            raise ValueError("Lutfen YYYY-AA-GG biciminde bir tarih girin.")

        forecaster = self._get_kp_daily_forecaster()
        result = forecaster.query(target_date).to_dict()
        result["source_file"] = (
            Path(result.get("source_file") or "").name
            or "Kp_ap_Ap_SN_F107_since_1932.txt"
        )
        return {
            "query_date": result.get("query_date"),
            "available_from": forecaster.dataset_first_day.isoformat(),
            "available_to": forecaster.dataset_last_day.isoformat(),
            "result": result,
        }

    def _get_solar_wind_forecaster(self) -> SolarWindSpeedForecaster:
        if self._solar_wind_forecaster is not None:
            return self._solar_wind_forecaster
        with self._solar_wind_query_lock:
            if self._solar_wind_forecaster is None:
                self._solar_wind_forecaster = SolarWindSpeedForecaster(data_file=RTSW_DATA_PATH)
            return self._solar_wind_forecaster

    def solar_wind_query_payload(self, target_date: str) -> dict[str, Any]:
        if not target_date or not str(target_date).strip():
            raise ValueError("Lütfen YYYY-AA-GG biçiminde bir tarih girin.")

        forecaster = self._get_solar_wind_forecaster()
        result = forecaster.query(target_date).to_dict()
        result["source_file"] = Path(result.get("source_file") or "").name or RTSW_DATA_PATH.name
        return {
            "query_date": result.get("query_date"),
            "available_from": forecaster.dataset_first_day.isoformat(),
            "available_to": forecaster.dataset_last_day.isoformat(),
            "result": result,
        }

    def _get_imf_bz_forecaster(self) -> ImfBzForecaster:
        if self._imf_bz_forecaster is not None:
            return self._imf_bz_forecaster
        with self._imf_bz_query_lock:
            if self._imf_bz_forecaster is None:
                self._imf_bz_forecaster = ImfBzForecaster(data_file=RTSW_DATA_PATH)
            return self._imf_bz_forecaster

    def imf_bz_query_payload(self, target_date: str) -> dict[str, Any]:
        if not target_date or not str(target_date).strip():
            raise ValueError("Lütfen YYYY-AA-GG biçiminde bir tarih girin.")

        forecaster = self._get_imf_bz_forecaster()
        result = forecaster.query(target_date).to_dict()
        result["source_file"] = Path(result.get("source_file") or "").name or RTSW_DATA_PATH.name
        return {
            "query_date": result.get("query_date"),
            "available_from": forecaster.dataset_first_day.isoformat(),
            "available_to": forecaster.dataset_last_day.isoformat(),
            "result": result,
        }

    def _background_refresh_loop(self) -> None:
        interval_seconds = max(60, int(self.config.get("poll_interval_seconds", 300)))
        initial_delay = min(20, interval_seconds)
        if self._background_stop.wait(initial_delay):
            return
        while not self._background_stop.is_set():
            try:
                self.refresh(download_images=False)
                logging.info("Arka plan yenilemesi tamamlandi; telefon bildirim akisi kontrol edildi.")
            except Exception:  # noqa: BLE001
                logging.exception("Arka plan yenilemesi basarisiz")
            if self._background_stop.wait(interval_seconds):
                return

    def shutdown(self) -> None:
        self._background_stop.set()
        if self._background_thread.is_alive():
            self._background_thread.join(timeout=2.0)

    def dashboard_payload(self, limit: int = DEFAULT_DASHBOARD_HISTORY_LIMIT) -> dict[str, Any]:
        latest = self.latest_payload()
        history = self.history_payload(limit=limit)
        insight_history = self.history_payload(limit=max(limit, DEFAULT_DASHBOARD_HISTORY_LIMIT))
        charts = self.safe_charts_payload()
        insights = build_operational_insights(latest, insight_history, charts)
        solar = self.solar_payload(
            noaa_snapshot=latest,
            charts=charts,
            insights=insights,
        )
        return build_panel_payload(
            latest,
            history,
            charts,
            insight_history=insight_history,
            solar=solar,
            access=self.access_payload(),
            notifications=self.notification_payload(),
        )

    def refresh(self, download_images: bool) -> dict[str, Any]:
        with self._refresh_lock:
            payload = self.core.run_once(download_images=download_images)
        history = self.history_payload()
        insight_history = self.history_payload(limit=max(240, len(history)))
        charts = self.safe_charts_payload(force_refresh=True)
        insights = build_operational_insights(payload, insight_history, charts)
        solar = self.solar_payload(
            force_refresh=True,
            noaa_snapshot=payload,
            charts=charts,
            insights=insights,
        )
        access_payload = self.access_payload()
        self.notifications.maybe_send_auto(payload, access_payload)
        return build_panel_payload(
            payload,
            history,
            charts,
            insight_history=insight_history,
            solar=solar,
            access=access_payload,
            notifications=self.notification_payload(),
        )


class PanelRequestHandler(BaseHTTPRequestHandler):
    server_version = "SpaceWeatherPanel/1.0"

    @property
    def app(self) -> PanelApp:
        return self.server.app  # type: ignore[attr-defined]

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/":
            self._serve_file(STATIC_DIR / "index.html", "text/html; charset=utf-8")
            return
        if path == "/static/panel.css":
            self._serve_file(STATIC_DIR / "panel.css", "text/css; charset=utf-8")
            return
        if path == "/static/panel.js":
            self._serve_file(STATIC_DIR / "panel.js", "application/javascript; charset=utf-8")
            return
        if path == "/api/status":
            query = parse_qs(parsed.query)
            limit = self._safe_int(
                query.get("limit", [str(DEFAULT_DASHBOARD_HISTORY_LIMIT)])[0],
                DEFAULT_DASHBOARD_HISTORY_LIMIT,
            )
            refresh_if_empty = query.get("refresh_if_empty", ["0"])[0] == "1"
            download_images = query.get("download_images", ["1"])[0] != "0"
            latest = self.app.latest_payload()
            if refresh_if_empty and self.app.latest_requires_refresh(latest):
                try:
                    self._send_json(self.app.refresh(download_images=download_images))
                except Exception as exc:  # noqa: BLE001
                    logging.exception("Panel bootstrap refresh failed")
                    self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
                return
            self._send_json(self.app.dashboard_payload(limit=limit))
            return
        if path == "/api/notifications":
            self._send_json(self.app.notification_payload())
            return
        if path == "/api/solar":
            query = parse_qs(parsed.query)
            force_refresh = query.get("refresh", ["0"])[0] == "1"
            try:
                self._send_json(self.app.solar_api_payload(force_refresh=force_refresh))
            except Exception as exc:  # noqa: BLE001
                logging.exception("Solar API failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
            return
        if path == "/api/kp-daily":
            query = parse_qs(parsed.query)
            target_date = query.get("date", [""])[0]
            try:
                self._send_json(self.app.kp_daily_query_payload(target_date))
            except ValueError as exc:
                self._send_json({"error": str(exc)}, status=HTTPStatus.BAD_REQUEST)
            except Exception as exc:  # noqa: BLE001
                logging.exception("Kp daily query failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
            return
        if path == "/api/solar-wind-query":
            query = parse_qs(parsed.query)
            target_date = query.get("date", [""])[0]
            try:
                self._send_json(self.app.solar_wind_query_payload(target_date))
            except ValueError as exc:
                self._send_json({"error": str(exc)}, status=HTTPStatus.BAD_REQUEST)
            except Exception as exc:  # noqa: BLE001
                logging.exception("Solar wind query failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
            return
        if path == "/api/imf-bz-query":
            query = parse_qs(parsed.query)
            target_date = query.get("date", [""])[0]
            try:
                self._send_json(self.app.imf_bz_query_payload(target_date))
            except ValueError as exc:
                self._send_json({"error": str(exc)}, status=HTTPStatus.BAD_REQUEST)
            except Exception as exc:  # noqa: BLE001
                logging.exception("IMF Bz query failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
            return
        if path.startswith("/media/"):
            filename = media_filename_from_path(path)
            media_path = self.app.output_dir / "images" / filename
            if media_path.exists():
                self._serve_file(media_path, self._content_type(media_path))
            else:
                self._send_json({"error": "Media bulunamadi."}, status=HTTPStatus.NOT_FOUND)
            return

        self._send_json({"error": "Bulunamadi."}, status=HTTPStatus.NOT_FOUND)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        length = self._safe_int(self.headers.get("Content-Length", "0"), 0)
        body = self.rfile.read(length) if length else b"{}"
        try:
            request_payload = json.loads(body.decode("utf-8")) if body else {}
        except json.JSONDecodeError:
            request_payload = {}

        if parsed.path == "/api/notifications/settings":
            try:
                notifications = self.app.update_notification_settings(request_payload if isinstance(request_payload, dict) else {})
            except Exception as exc:  # noqa: BLE001
                logging.exception("Notification settings update failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
                return
            self._send_json({"ok": True, "notifications": notifications})
            return

        if parsed.path == "/api/notifications/test":
            try:
                result = self.app.send_test_notification()
            except Exception as exc:  # noqa: BLE001
                logging.exception("Notification test failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
                return
            self._send_json({"ok": True, "result": result, "notifications": self.app.notification_payload()})
            return

        if parsed.path == "/api/notifications/pushbullet/send":
            try:
                request_data = request_payload if isinstance(request_payload, dict) else {}
                result = self.app.notifications.send_pushbullet_event(
                    str(request_data.get("pushbullet_token") or ""),
                    request_data.get("event") if isinstance(request_data.get("event"), dict) else {},
                )
            except Exception as exc:  # noqa: BLE001
                logging.exception("Browser pushbullet notification failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
                return
            self._send_json({"ok": True, "result": result})
            return

        if parsed.path == "/api/notifications/send-current":
            try:
                result = self.app.send_current_notification()
            except Exception as exc:  # noqa: BLE001
                logging.exception("Manual current notification failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
                return
            self._send_json({"ok": True, "result": result, "notifications": self.app.notification_payload()})
            return

        if parsed.path != "/api/refresh":
            self._send_json({"error": "Bulunamadi."}, status=HTTPStatus.NOT_FOUND)
            return

        download_images = bool(request_payload.get("download_images", True))
        try:
            payload = self.app.refresh(download_images=download_images)
        except Exception as exc:  # noqa: BLE001
            logging.exception("Panel refresh failed")
            self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
            return

        self._send_json(payload)

    def log_message(self, format: str, *args: Any) -> None:
        logging.info("%s - %s", self.address_string(), format % args)

    def _serve_file(self, path: Path, content_type: str) -> None:
        if not path.exists():
            self.send_error(HTTPStatus.NOT_FOUND)
            return

        data = path.read_bytes()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.end_headers()
        self.wfile.write(data)

    def _send_json(self, payload: dict[str, Any], status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.end_headers()
        self.wfile.write(body)

    @staticmethod
    def _safe_int(value: str, default: int) -> int:
        try:
            return int(value)
        except (TypeError, ValueError):
            return default

    @staticmethod
    def _content_type(path: Path) -> str:
        suffix = path.suffix.lower()
        if suffix in (".jpg", ".jpeg"):
            return "image/jpeg"
        if suffix == ".png":
            return "image/png"
        return "application/octet-stream"


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Uzay havası web paneli")
    parser.add_argument("--config", default=str(BASE_DIR / "config.json"))
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8080)
    parser.add_argument("--log-level", default="INFO")
    return parser.parse_args(argv)


def run_server(host: str, port: int, config_path: str | Path, log_level: str = "INFO") -> None:
    configure_logging(log_level)
    resolved_config = resolve_config_path(config_path)
    app = PanelApp(resolved_config)

    server = ThreadingHTTPServer((host, port), PanelRequestHandler)
    server.app = app  # type: ignore[attr-defined]

    logging.info("Web panel hazır: http://%s:%s", host, port)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        logging.info("Web panel kapatildi.")
    finally:
        app.shutdown()
        server.server_close()


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    run_server(args.host, args.port, args.config, log_level=args.log_level)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
