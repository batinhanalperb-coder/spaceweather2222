from __future__ import annotations

import argparse
import logging
import sys
import time
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

from space_weather_early_warning import (  # noqa: E402
    SpaceWeatherEarlyWarningApp,
    configure_logging,
    load_json,
    resolve_config_path,
)
from space_weather_web_panel import NotificationManager, load_access_state  # noqa: E402


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Uzay havası telefon bildirim işçisi")
    parser.add_argument("--config", default=str(BASE_DIR / "config.json"))
    parser.add_argument("--log-level", default="INFO")
    parser.add_argument("--interval", type=int, default=0, help="0 ise config içindeki poll_interval_seconds kullanılır")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    configure_logging(args.log_level)
    config_path = resolve_config_path(args.config)
    config = load_json(config_path)
    app = SpaceWeatherEarlyWarningApp(config, base_dir=config_path.parent)
    notifications = NotificationManager()
    interval_seconds = max(60, int(args.interval or config.get("poll_interval_seconds", 300)))

    logging.info("Bildirim işçisi başladı. Döngü: %s saniye", interval_seconds)
    while True:
        try:
            payload = app.run_once(download_images=False)
            access_payload = load_access_state()
            result = notifications.maybe_send_auto(payload, access_payload)
            if result and result.get("ok"):
                logging.info("Telefon bildirimi gönderildi.")
            elif result and result.get("error"):
                logging.warning("Telefon bildirimi hatası: %s", result.get("error"))
            else:
                logging.info("Bildirim koşulu oluşmadı; durum izlendi.")
        except Exception:  # noqa: BLE001
            logging.exception("Bildirim işçisi döngüsü başarısız oldu")
        time.sleep(interval_seconds)


if __name__ == "__main__":
    raise SystemExit(main())
