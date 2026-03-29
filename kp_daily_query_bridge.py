from __future__ import annotations

import argparse
import json
import logging
import sys
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "Kp_ap_Ap_SN_F107_since_1932.txt"
sys.path.insert(0, str(BASE_DIR))

from kp_lstm_forecaster import KpDailyCycleForecaster


class KpQueryBridgeServer(ThreadingHTTPServer):
    def __init__(self, server_address: tuple[str, int], forecaster: KpDailyCycleForecaster) -> None:
        super().__init__(server_address, KpQueryBridgeHandler)
        self.forecaster = forecaster


class KpQueryBridgeHandler(BaseHTTPRequestHandler):
    server_version = "KpQueryBridge/1.0"

    @property
    def forecaster(self) -> KpDailyCycleForecaster:
        return self.server.forecaster  # type: ignore[attr-defined]

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/healthz":
            self._send_json({"ok": True})
            return

        if parsed.path != "/api/kp-daily":
            self._send_json({"error": "Bulunamadi."}, status=HTTPStatus.NOT_FOUND)
            return

        query = parse_qs(parsed.query)
        target_date = query.get("date", [""])[0]
        if not target_date.strip():
            self._send_json({"error": "Lutfen YYYY-AA-GG biciminde bir tarih girin."}, status=HTTPStatus.BAD_REQUEST)
            return

        try:
            result = self.forecaster.query(target_date).to_dict()
        except ValueError as exc:
            self._send_json({"error": str(exc)}, status=HTTPStatus.BAD_REQUEST)
            return
        except Exception as exc:  # noqa: BLE001
            logging.exception("Kp query bridge failed")
            self._send_json({"error": str(exc)}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
            return

        result["source_file"] = Path(result.get("source_file") or "").name or DATA_FILE.name
        payload = {
            "query_date": result.get("query_date"),
            "available_from": self.forecaster.dataset_first_day.isoformat(),
            "available_to": self.forecaster.dataset_last_day.isoformat(),
            "result": result,
        }
        self._send_json(payload)

    def log_message(self, format: str, *args: Any) -> None:
        logging.info("%s - %s", self.address_string(), format % args)

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
    parser = argparse.ArgumentParser(description="Local bridge server for Kp daily date queries.")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8092)
    args = parser.parse_args()

    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    forecaster = KpDailyCycleForecaster(data_file=DATA_FILE)
    server = KpQueryBridgeServer((args.host, args.port), forecaster)
    logging.info("Kp query bridge listening on http://%s:%s", args.host, args.port)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        logging.info("Kp query bridge stopping")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
