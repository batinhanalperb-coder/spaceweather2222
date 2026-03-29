from __future__ import annotations

import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from space_weather_web_panel import PanelRequestHandler
from vercel_panel_runtime import build_request_access_state, get_vercel_panel_app, restore_rewritten_path


class handler(PanelRequestHandler):
    @property
    def app(self):  # type: ignore[override]
        return get_vercel_panel_app()

    def do_GET(self) -> None:
        self._run_with_vercel_context(super().do_GET)

    def do_POST(self) -> None:
        self._run_with_vercel_context(super().do_POST)

    def _run_with_vercel_context(self, action) -> None:  # noqa: ANN001
        app = self.app
        original_path = self.path
        self.path = restore_rewritten_path(original_path)
        app.set_request_access_state(build_request_access_state(self.headers))
        try:
            action()
        finally:
            app.clear_request_access_state()
            self.path = original_path
