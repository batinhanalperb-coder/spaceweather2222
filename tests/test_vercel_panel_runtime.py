from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from space_weather_early_warning import default_config, write_json
from space_weather_web_panel import PanelApp, default_access_state
from vercel_panel_runtime import (
    REWRITE_ROUTE_PARAM,
    build_request_access_state,
    build_vercel_config_payload,
    restore_rewritten_path,
    seed_vercel_output,
)


class VercelPanelRuntimeTests(unittest.TestCase):
    def test_build_vercel_config_payload_uses_temp_output(self) -> None:
        payload = build_vercel_config_payload(
            {
                "output_dir": "output",
                "download_images": True,
                "sharing": {"named_tunnel": {"enabled": True}},
            },
            temp_root=Path("/tmp/vercel-panel-test"),
        )

        self.assertEqual(payload["output_dir"], str(Path("/tmp/vercel-panel-test/output").resolve()))
        self.assertFalse(payload["download_images"])
        self.assertFalse(payload["sharing"]["named_tunnel"]["enabled"])

    def test_restore_rewritten_path_preserves_query_values(self) -> None:
        restored = restore_rewritten_path(
            f"/api/panel?{REWRITE_ROUTE_PARAM}=/api/status&limit=15&refresh_if_empty=1"
        )

        self.assertEqual(restored, "/api/status?limit=15&refresh_if_empty=1")

    def test_build_request_access_state_prefers_forwarded_headers(self) -> None:
        payload = build_request_access_state(
            {
                "x-forwarded-proto": "https",
                "x-forwarded-host": "uzay-panel.vercel.app",
                "host": "internal.vercel.app",
            }
        )

        self.assertEqual(payload["mode"], "vercel_public")
        self.assertEqual(payload["public_url"], "https://uzay-panel.vercel.app")

    def test_seed_vercel_output_copies_alerts_and_referenced_images(self) -> None:
        with tempfile.TemporaryDirectory() as base_dir_raw, tempfile.TemporaryDirectory() as temp_root_raw:
            base_dir = Path(base_dir_raw)
            temp_root = Path(temp_root_raw)
            alerts_dir = base_dir / "output" / "alerts"
            images_dir = base_dir / "output" / "images"
            alerts_dir.mkdir(parents=True, exist_ok=True)
            images_dir.mkdir(parents=True, exist_ok=True)

            latest_payload = {
                "generated_at": "2026-03-29T10:00:00Z",
                "images": {"soho_lasco_c2": str(images_dir / "soho_lasco_c2.jpg")},
            }
            (alerts_dir / "latest_alert.json").write_text(
                json.dumps(latest_payload, ensure_ascii=False),
                encoding="utf-8",
            )
            (alerts_dir / "history.jsonl").write_text(
                "\n".join(
                    [
                        '{"generated_at":"2026-03-29T09:00:00Z","evaluation":{"score":1}}',
                        '{"generated_at":"2026-03-29T10:00:00Z","evaluation":{"score":2}}',
                    ]
                )
                + "\n",
                encoding="utf-8",
            )
            (images_dir / "soho_lasco_c2.jpg").write_bytes(b"fake-image")

            seed_vercel_output(base_dir=base_dir, temp_root=temp_root, history_limit=10)

            self.assertTrue((temp_root / "output" / "alerts" / "latest_alert.json").exists())
            self.assertTrue((temp_root / "output" / "alerts" / "history.jsonl").exists())
            self.assertTrue((temp_root / "output" / "images" / "soho_lasco_c2.jpg").exists())

    def test_panel_app_can_use_request_scoped_access_state(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir_raw:
            temp_dir = Path(temp_dir_raw)
            config_path = temp_dir / "config.json"
            payload = default_config()
            payload["output_dir"] = "output"
            write_json(config_path, payload)

            app = PanelApp(
                config_path,
                enable_background=False,
                access_loader=default_access_state,
                dynamic_access_from_request=True,
            )
            try:
                override = {
                    "mode": "vercel_public",
                    "local_url": "https://uzay-panel.vercel.app",
                    "public_url": "https://uzay-panel.vercel.app",
                    "message": "Panel hazir.",
                    "updated_at": "2026-03-29T10:00:00Z",
                    "tunnel_pid": None,
                }
                app.set_request_access_state(override)
                self.assertEqual(app.access_payload()["public_url"], override["public_url"])
                app.clear_request_access_state()
                self.assertEqual(app.access_payload()["mode"], "local_only")
            finally:
                app.shutdown()


if __name__ == "__main__":
    unittest.main()
