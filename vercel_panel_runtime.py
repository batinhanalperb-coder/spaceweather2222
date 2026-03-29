from __future__ import annotations

import copy
import json
import tempfile
import threading
from collections import deque
from datetime import datetime
from pathlib import Path
from typing import Any, Mapping
from urllib.parse import parse_qs, urlencode, urlparse

from space_weather_early_warning import BASE_DIR, default_config, load_json, write_json
from space_weather_web_panel import PanelApp


REWRITE_ROUTE_PARAM = "__route"
VERCEL_TEMP_ROOT = Path(tempfile.gettempdir()) / "space-weather-panel-vercel"
SEED_IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png"}
SEEDED_HISTORY_LIMIT = 2400

_VERCEL_APP: PanelApp | None = None
_VERCEL_APP_LOCK = threading.Lock()


def load_base_config_payload(base_dir: Path = BASE_DIR) -> dict[str, Any]:
    for candidate in (base_dir / "config.json", base_dir / "config.example.json"):
        if not candidate.exists():
            continue
        payload = load_json(candidate)
        if isinstance(payload, dict):
            return payload
    return default_config()


def build_vercel_config_payload(
    base_config: dict[str, Any] | None = None,
    *,
    temp_root: Path = VERCEL_TEMP_ROOT,
) -> dict[str, Any]:
    payload = copy.deepcopy(base_config if isinstance(base_config, dict) else default_config())
    payload["output_dir"] = str((temp_root / "output").resolve())
    payload["download_images"] = False

    sharing = payload.get("sharing")
    if not isinstance(sharing, dict):
        sharing = {}
        payload["sharing"] = sharing
    named_tunnel = sharing.get("named_tunnel")
    if not isinstance(named_tunnel, dict):
        named_tunnel = {}
        sharing["named_tunnel"] = named_tunnel
    named_tunnel["enabled"] = False
    return payload


def _tail_text_lines(path: Path, limit: int) -> list[str]:
    with path.open("r", encoding="utf-8") as handle:
        return list(deque((line.rstrip("\n") for line in handle if line.strip()), maxlen=limit))


def seed_vercel_output(
    *,
    base_dir: Path = BASE_DIR,
    temp_root: Path = VERCEL_TEMP_ROOT,
    history_limit: int = SEEDED_HISTORY_LIMIT,
) -> None:
    seed_marker = temp_root / ".seeded"
    if seed_marker.exists():
        return

    source_output = base_dir / "output"
    source_alerts = source_output / "alerts"
    source_images = source_output / "images"
    dest_output = temp_root / "output"
    dest_alerts = dest_output / "alerts"
    dest_images = dest_output / "images"

    latest_payload: dict[str, Any] | None = None
    latest_source = source_alerts / "latest_alert.json"
    if latest_source.exists():
        dest_alerts.mkdir(parents=True, exist_ok=True)
        latest_text = latest_source.read_text(encoding="utf-8")
        (dest_alerts / "latest_alert.json").write_text(latest_text, encoding="utf-8")
        try:
            parsed = json.loads(latest_text)
            latest_payload = parsed if isinstance(parsed, dict) else None
        except json.JSONDecodeError:
            latest_payload = None

    history_source = source_alerts / "history.jsonl"
    if history_source.exists():
        dest_alerts.mkdir(parents=True, exist_ok=True)
        history_lines = _tail_text_lines(history_source, history_limit)
        if history_lines:
            (dest_alerts / "history.jsonl").write_text("\n".join(history_lines) + "\n", encoding="utf-8")

    referenced_images: set[str] = set()
    if isinstance(latest_payload, dict):
        for raw_path in (latest_payload.get("images") or {}).values():
            suffix = Path(str(raw_path)).suffix.lower()
            if suffix in SEED_IMAGE_SUFFIXES:
                referenced_images.add(Path(str(raw_path)).name)

    if referenced_images and source_images.exists():
        dest_images.mkdir(parents=True, exist_ok=True)
        for image_name in referenced_images:
            source_path = source_images / image_name
            if source_path.exists() and source_path.suffix.lower() in SEED_IMAGE_SUFFIXES:
                target_path = dest_images / image_name
                if not target_path.exists():
                    target_path.write_bytes(source_path.read_bytes())

    seed_marker.parent.mkdir(parents=True, exist_ok=True)
    seed_marker.write_text(datetime.utcnow().isoformat(), encoding="utf-8")


def create_vercel_panel_app(
    *,
    base_dir: Path = BASE_DIR,
    temp_root: Path = VERCEL_TEMP_ROOT,
) -> PanelApp:
    temp_root.mkdir(parents=True, exist_ok=True)
    seed_vercel_output(base_dir=base_dir, temp_root=temp_root)
    config_payload = build_vercel_config_payload(load_base_config_payload(base_dir), temp_root=temp_root)
    config_path = temp_root / "config.vercel.json"
    write_json(config_path, config_payload)
    access_dir = temp_root / "access"
    return PanelApp(
        config_path,
        enable_background=False,
        notification_settings_path=access_dir / "notification_settings.json",
        notification_state_path=access_dir / "notification_state.json",
        dynamic_access_from_request=True,
    )


def get_vercel_panel_app() -> PanelApp:
    global _VERCEL_APP
    if _VERCEL_APP is not None:
        return _VERCEL_APP

    with _VERCEL_APP_LOCK:
        if _VERCEL_APP is None:
            _VERCEL_APP = create_vercel_panel_app()
    return _VERCEL_APP


def restore_rewritten_path(raw_path: str, *, route_param: str = REWRITE_ROUTE_PARAM) -> str:
    parsed = urlparse(raw_path or "/")
    query = parse_qs(parsed.query, keep_blank_values=True)
    routed_values = query.pop(route_param, [])
    if not routed_values:
        return raw_path or "/"

    route_path = str(routed_values[0] or "/").strip() or "/"
    if not route_path.startswith("/"):
        route_path = f"/{route_path}"
    merged_query = urlencode(query, doseq=True)
    return f"{route_path}?{merged_query}" if merged_query else route_path


def _first_header(headers: Mapping[str, Any], *keys: str) -> str:
    for key in keys:
        value = headers.get(key)
        if value:
            return str(value).split(",")[0].strip()
    return ""


def build_request_access_state(headers: Mapping[str, Any]) -> dict[str, Any]:
    host = _first_header(headers, "x-forwarded-host", "host")
    proto = _first_header(headers, "x-forwarded-proto") or "https"
    if not host:
        return {
            "mode": "vercel_public",
            "local_url": None,
            "public_url": None,
            "message": "Panel Vercel uzerinde calisiyor.",
            "updated_at": datetime.utcnow().isoformat() + "Z",
            "tunnel_pid": None,
        }

    public_url = f"{proto}://{host}"
    return {
        "mode": "vercel_public",
        "local_url": public_url,
        "public_url": public_url,
        "message": "Panel Vercel uzerinde bu adresle paylasiliyor.",
        "updated_at": datetime.utcnow().isoformat() + "Z",
        "tunnel_pid": None,
    }
