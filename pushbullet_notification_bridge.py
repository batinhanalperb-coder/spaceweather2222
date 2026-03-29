from __future__ import annotations

import argparse
import json
import logging
import sys
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

from space_weather_web_panel import (  # noqa: E402
    ACCESS_STATE_PATH,
    BASE_DIR as PANEL_BASE_DIR,
    NotificationManager,
    load_access_state,
    load_latest_alert,
)


class PushbulletBridgeServer(ThreadingHTTPServer):
    def __init__(self, server_address: tuple[str, int], manager: NotificationManager) -> None:
        super().__init__(server_address, PushbulletBridgeHandler)
        self.manager = manager


class PushbulletBridgeHandler(BaseHTTPRequestHandler):
    server_version = "PushbulletBridge/1.0"

    @property
    def manager(self) -> NotificationManager:
        return self.server.manager  # type: ignore[attr-defined]

    def do_OPTIONS(self) -> None:
        self.send_response(HTTPStatus.NO_CONTENT)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self) -> None:
        if self.path == "/healthz":
            self._send_json({"ok": True})
            return
        if self.path == "/api/notifications":
            self._send_json(self.manager.payload())
            return
        self._send_json({"error": "Bulunamadi."}, status=HTTPStatus.NOT_FOUND)

    def do_POST(self) -> None:
        body = self._read_json_body()
        if self.path == "/api/notifications/settings":
            payload = self.manager.update_settings(body if isinstance(body, dict) else {})
            self._send_json({"ok": True, "notifications": payload})
            return

        if self.path == "/api/notifications/test":
            try:
                result = self.manager.send_test(load_access_state(ACCESS_STATE_PATH))
            except Exception as exc:  # noqa: BLE001
                logging.exception("Pushbullet test notification failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
                return
            self._send_json({"ok": True, "result": result, "notifications": self.manager.payload()})
            return

        if self.path == "/api/notifications/pushbullet/send":
            request_data = body if isinstance(body, dict) else {}
            try:
                result = self.manager.send_pushbullet_event(
                    str(request_data.get("pushbullet_token") or ""),
                    request_data.get("event") if isinstance(request_data.get("event"), dict) else {},
                )
            except Exception as exc:  # noqa: BLE001
                logging.exception("Pushbullet browser notification failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
                return
            self._send_json({"ok": True, "result": result})
            return

        if self.path == "/api/notifications/send-current":
            latest = load_latest_alert(PANEL_BASE_DIR / "output")
            if latest is None:
                self._send_json({"error": "Guncel veri bulunamadi."}, status=HTTPStatus.BAD_REQUEST)
                return
            try:
                result = self.manager.send_current(latest, load_access_state(ACCESS_STATE_PATH))
            except Exception as exc:  # noqa: BLE001
                logging.exception("Pushbullet current notification failed")
                self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
                return
            self._send_json({"ok": True, "result": result, "notifications": self.manager.payload()})
            return

        self._send_json({"error": "Bulunamadi."}, status=HTTPStatus.NOT_FOUND)

    def log_message(self, format: str, *args: Any) -> None:
        logging.info("%s - %s", self.address_string(), format % args)

    def _read_json_body(self) -> dict[str, Any] | None:
        length = int(self.headers.get("Content-Length") or "0")
        if length <= 0:
            return {}
        raw = self.rfile.read(length)
        try:
            payload = json.loads(raw.decode("utf-8"))
        except Exception:  # noqa: BLE001
            return None
        return payload if isinstance(payload, dict) else {}

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


def main() -> int:
    parser = argparse.ArgumentParser(description="Local Pushbullet notification bridge.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8093)
    args = parser.parse_args()

    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    manager = NotificationManager()
    server = PushbulletBridgeServer((args.host, args.port), manager)
    logging.info("Pushbullet bridge listening on http://%s:%s", args.host, args.port)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        logging.info("Pushbullet bridge stopping")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
