from datetime import datetime, timedelta, timezone
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from space_weather_web_panel import (
    NotificationManager,
    _format_turkey_timestamp,
    build_archive_daily_kp_chart_payload,
    build_panel_payload,
    build_history_chart_payload,
    empty_charts_payload,
    fetch_noaa_chart_payload,
    load_history,
    media_filename_from_path,
    parse_daily_geomagnetic_kp_series,
    web_image_map,
    web_nasa_image_cards,
)
from space_weather_early_warning import NoaaSwpcClient
from kp_lstm_forecaster import KpDailyCycleForecaster


class WebPanelTests(unittest.TestCase):
    def test_notification_timestamps_are_formatted_in_turkey_time(self) -> None:
        formatted = _format_turkey_timestamp("2026-03-29T00:30:00Z")
        self.assertEqual(formatted, "29.03.2026 03:30 TSİ")

        manager = NotificationManager()
        title, message, priority, tags, _click_url = manager._build_event_message(
            {
                "generated_at": "2026-03-29T00:30:00Z",
                "evaluation": {
                    "level": "watch",
                    "risk_percent": 42,
                    "noaa": {
                        "kp": 4.33,
                        "kp_estimated": 4.67,
                        "solar_wind_speed_km_s": 525.0,
                        "bz_nt": -8.4,
                    },
                },
            },
            {"local_url": "http://127.0.0.1:8095"},
            mode="alert",
        )

        self.assertIn("Zaman (TSİ): 29.03.2026 03:30 TSİ", message)
        self.assertEqual(priority, "3")
        self.assertIn("warning", tags)

    def test_fetch_noaa_chart_payload_uses_ace_archive_series(self) -> None:
        now = datetime.now(tz=timezone.utc).replace(microsecond=0)
        old_time = (now - timedelta(days=10)).isoformat().replace("+00:00", "Z")
        recent_time = (now - timedelta(hours=1)).isoformat().replace("+00:00", "Z")

        class FakeHttp:
            def get_json(self, url: str):
                if url == NoaaSwpcClient.OBSERVED_KP_URL:
                    return [{"time_tag": recent_time, "Kp": 3.33}]
                if url == NoaaSwpcClient.KP_URL:
                    return [{"time_tag": recent_time, "estimated_kp": 3.67}]
                raise AssertionError(f"unexpected get_json url: {url}")

            def get_text(self, url: str):
                if "daily-geomagnetic-indices.txt" in url:
                    return "2026 03 20 0 0 0 0 0 0 0 0"
                raise AssertionError(f"unexpected get_text url: {url}")

        class FakeNoaa(NoaaSwpcClient):
            def __init__(self):
                super().__init__(FakeHttp())

            def _fetch_first_available(self, urls):  # noqa: ANN001
                first = urls[0]
                if "plasma-7-day.json" in first:
                    return []
                if "mag-7-day.json" in first:
                    return []
                if "ace_swepam_1h.json" in first:
                    return [{"time_tag": old_time, "speed": 520.0, "dens": 9.4}]
                if "ace_mag_1h.json" in first:
                    return [{"time_tag": old_time, "bz": -6.2, "bt": 7.8}]
                raise AssertionError(f"unexpected fetch list: {urls}")

        charts = fetch_noaa_chart_payload(FakeNoaa(), window_days=27)

        speed_points = charts["solar_wind_speed_km_s"]["points"]
        density_points = charts["proton_density_p_cm3"]["points"]
        bz_points = charts["bz_nt"]["points"]
        bt_points = charts["bt_nt"]["points"]

        self.assertTrue(speed_points)
        self.assertTrue(density_points)
        self.assertTrue(bz_points)
        self.assertTrue(bt_points)
        self.assertAlmostEqual(speed_points[-1]["value"], 520.0)
        self.assertAlmostEqual(density_points[-1]["value"], 9.4)
        self.assertAlmostEqual(bz_points[-1]["value"], -6.2)
        self.assertAlmostEqual(bt_points[-1]["value"], 7.8)
        oldest_speed = datetime.fromisoformat(speed_points[0]["time"].replace("Z", "+00:00"))
        self.assertLessEqual(oldest_speed, now - timedelta(days=9))

    def test_web_image_map_rewrites_to_media_route(self) -> None:
        payload = {
            "images": {
                "sdo_193": r"C:\tmp\output\images\sdo_193.jpg",
                "sdo_171": r"C:\tmp\output\images\sdo_171.jpg",
            }
        }

        mapped = web_image_map(payload)

        self.assertEqual(mapped["sdo_193"], "/media/sdo_193.jpg")
        self.assertEqual(mapped["sdo_171"], "/media/sdo_171.jpg")

    def test_media_filename_from_path_strips_prefix_compatibly(self) -> None:
        filename = media_filename_from_path("/media/subdir/sdo_193.jpg")

        self.assertEqual(filename, "sdo_193.jpg")

    def test_load_history_reads_last_entries(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            output_dir = Path(temp_dir)
            alerts_dir = output_dir / "alerts"
            alerts_dir.mkdir(parents=True, exist_ok=True)
            history_path = alerts_dir / "history.jsonl"
            history_path.write_text(
                "\n".join(
                    [
                        '{"generated_at":"2026-03-26T17:00:00Z","evaluation":{"score":1}}',
                        '{"generated_at":"2026-03-26T17:05:00Z","evaluation":{"score":2}}',
                        '{"generated_at":"2026-03-26T17:10:00Z","evaluation":{"score":3}}',
                    ]
                ),
                encoding="utf-8",
            )

            history = load_history(output_dir, limit=2)

            self.assertEqual(len(history), 2)
            self.assertEqual(history[0]["evaluation"]["score"], 2)
            self.assertEqual(history[1]["evaluation"]["score"], 3)

    def test_load_history_skips_non_mapping_entries(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            output_dir = Path(temp_dir)
            alerts_dir = output_dir / "alerts"
            alerts_dir.mkdir(parents=True, exist_ok=True)
            history_path = alerts_dir / "history.jsonl"
            history_path.write_text(
                "\n".join(
                    [
                        '{"generated_at":"2026-03-26T17:00:00Z","evaluation":{"score":1}}',
                        'null',
                        '[]',
                        '{"generated_at":"2026-03-26T17:10:00Z","evaluation":{"score":3}}',
                    ]
                ),
                encoding="utf-8",
            )

            history = load_history(output_dir, limit=10)

            self.assertEqual(len(history), 2)
            self.assertEqual(history[0]["evaluation"]["score"], 1)
            self.assertEqual(history[1]["evaluation"]["score"], 3)

    def test_build_panel_payload_adds_web_images(self) -> None:
        latest = {
            "nasa_live_images": [
                {
                    "name": "sdo_hmi_magnetogram",
                    "title": "SDO HMI Magnetogram",
                    "provider": "SDO/HMI",
                    "image_url": "https://soho.nascom.nasa.gov/data/realtime/hmi_mag/512/latest.jpg",
                    "detail_url": "https://soho.nascom.nasa.gov/data/LATEST/latest-hmiMag.html",
                }
            ],
            "images": {
                "sdo_hmi_magnetogram": r"C:\tmp\output\images\sdo_hmi_magnetogram.jpg",
            },
            "evaluation": {
                "level": "normal",
                "score": 0,
                "noaa": {
                    "kp": 2.0,
                    "solar_wind_speed_km_s": 410.0,
                    "bz_nt": -1.0,
                },
            },
        }

        panel = build_panel_payload(latest, [])

        self.assertEqual(
            panel["latest"]["web_images"]["sdo_hmi_magnetogram"],
            "/media/sdo_hmi_magnetogram.jpg",
        )
        self.assertEqual(
            panel["latest"]["web_nasa_images"][0]["image_url"],
            "/media/sdo_hmi_magnetogram.jpg",
        )
        self.assertTrue(panel["latest"]["web_nasa_images"][0]["cached"])

    def test_web_nasa_image_cards_fall_back_to_remote_urls(self) -> None:
        payload = {
            "nasa_live_images": [
                {
                    "name": "soho_lasco_c2",
                    "title": "SOHO LASCO C2",
                    "provider": "SOHO/LASCO",
                    "image_url": "https://soho.nascom.nasa.gov/data/realtime/c2/512/latest.jpg",
                    "detail_url": "https://soho.nascom.nasa.gov/data/realtime/c2/512/",
                    "source_page": "https://soho.nascom.nasa.gov/data/realtime-images.html",
                }
            ],
            "images": {},
        }

        cards = web_nasa_image_cards(payload)

        self.assertEqual(len(cards), 1)
        self.assertEqual(
            cards[0]["image_url"],
            "https://soho.nascom.nasa.gov/data/realtime/c2/512/latest.jpg",
        )
        self.assertFalse(cards[0]["cached"])

    def test_build_panel_payload_exposes_metric_history_fields(self) -> None:
        history = [
            {
                "generated_at": "2026-03-26T17:00:00Z",
                "evaluation": {
                    "level": "normal",
                    "score": 1,
                    "risk_percent": 28,
                    "noaa": {
                        "kp": 3.33,
                        "kp_estimated": 1.0,
                        "solar_wind_speed_km_s": 455.2,
                        "bz_nt": -1.25,
                        "kp_lstm_forecast": {
                            "predicted_kp": 3.94,
                            "target_time": "2026-03-26T20:00:00Z",
                            "confidence_percent": 84,
                            "training_samples": 28,
                            "live_training_samples": 16,
                            "archive_training_samples": 12,
                            "train_rmse": 0.318,
                        },
                    },
                },
            }
        ]

        panel = build_panel_payload(None, history)

        self.assertEqual(panel["history"][0]["kp"], 3.33)
        self.assertEqual(panel["history"][0]["kp_estimated"], 1.0)
        self.assertEqual(panel["history"][0]["risk_percent"], 28)
        self.assertEqual(panel["history"][0]["solar_wind_speed_km_s"], 455.2)
        self.assertEqual(panel["history"][0]["kp_lstm_predicted_kp"], 3.94)
        self.assertEqual(panel["history"][0]["kp_lstm_training_samples"], 28)
        self.assertEqual(panel["history"][0]["kp_lstm_live_training_samples"], 16)
        self.assertEqual(panel["history"][0]["kp_lstm_archive_training_samples"], 12)
        self.assertAlmostEqual(panel["history"][0]["kp_lstm_train_rmse"], 0.318)

    def test_build_history_chart_payload_uses_recent_history_points(self) -> None:
        history = [
            {
                "generated_at": "2026-03-26T09:00:00Z",
                "evaluation": {
                    "noaa": {
                        "observed_at": "2026-03-26T08:57:00Z",
                        "kp": 2.33,
                        "kp_estimated": 2.0,
                        "solar_wind_speed_km_s": 430.0,
                        "bz_nt": -2.5,
                    }
                },
            },
            {
                "generated_at": "2026-03-27T09:00:00Z",
                "evaluation": {
                    "noaa": {
                        "observed_at": "2026-03-27T08:57:00Z",
                        "kp": 4.67,
                        "kp_estimated": 4.33,
                        "solar_wind_speed_km_s": 575.0,
                        "proton_density_p_cm3": 11.5,
                        "bz_nt": -9.5,
                        "bt_nt": 8.2,
                        "kp_lstm_forecast": {
                            "predicted_kp": 4.91,
                            "target_time": "2026-03-27T12:00:00Z",
                            "confidence_percent": 82,
                        },
                    }
                },
            },
        ]

        charts = build_history_chart_payload(
            history,
            window_days=2,
            window_end=datetime(2026, 3, 27, 12, 0, tzinfo=timezone.utc),
        )

        self.assertEqual(len(charts["kp_observed"]["points"]), 2)
        self.assertEqual(charts["kp_observed"]["points"][-1]["value"], 4.67)
        self.assertEqual(len(charts["solar_wind_speed_km_s"]["points"]), 2)
        self.assertEqual(charts["proton_density_p_cm3"]["points"][-1]["value"], 11.5)
        self.assertEqual(charts["bt_nt"]["points"][-1]["value"], 8.2)
        self.assertEqual(charts["kp_lstm_predicted_kp"]["points"][-1]["value"], 4.91)
        self.assertEqual(charts["kp_lstm_confidence_percent"]["points"][-1]["value"], 82.0)
        self.assertGreater(charts["bz_nt"]["coverage_days"], 0)

    def test_build_history_chart_payload_handles_null_lstm_payload(self) -> None:
        history = [
            {
                "generated_at": "2026-03-27T09:00:00Z",
                "evaluation": {
                    "noaa": {
                        "observed_at": "2026-03-27T08:57:00Z",
                        "kp": 2.0,
                        "kp_estimated": 2.33,
                        "solar_wind_speed_km_s": 455.0,
                        "bz_nt": -4.2,
                        "kp_lstm_forecast": None,
                    }
                },
            }
        ]

        charts = build_history_chart_payload(
            history,
            window_days=2,
            window_end=datetime(2026, 3, 27, 12, 0, tzinfo=timezone.utc),
        )

        self.assertEqual(charts["kp_observed"]["points"][-1]["value"], 2.0)
        self.assertEqual(charts["kp_estimated"]["points"][-1]["value"], 2.33)
        self.assertEqual(charts["kp_lstm_predicted_kp"]["points"], [])

    def test_build_archive_daily_kp_chart_payload_uses_kp_archive_file(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            data_file = Path(temp_dir) / "Kp_ap_Ap_SN_F107_since_1932.txt"
            data_file.write_text(
                "\n".join(
                    [
                        "# sample",
                        "2026 03 25     0     0.5 1352 10  1.000  1.333  1.667  2.000  1.667  1.333  1.000  0.667    4    5    6    7    6    5    4    3     6  22     -1.0     -1.0 2",
                        "2026 03 26     1     1.5 1352 11  2.333  2.667  3.000  3.333  3.000  2.667  2.333  2.000   10   12   15   18   15   12   10    9    14  24     -1.0     -1.0 2",
                        "2026 03 27     2     2.5 1352 12  4.000  4.333  4.667  5.000  4.667  4.333  4.000  3.667   27   32   39   48   39   32   27   22    33  41     -1.0     -1.0 2",
                    ]
                ),
                encoding="utf-8",
            )

            forecaster = KpDailyCycleForecaster(data_file=data_file)
            charts = build_archive_daily_kp_chart_payload(
                forecaster,
                window_days=5,
                window_end=datetime(2026, 3, 28, 12, 0, tzinfo=timezone.utc),
            )

        archive_points = charts["kp_daily_archive_actual"]["points"]
        self.assertEqual(len(archive_points), 3)
        self.assertEqual(archive_points[0]["time"], "2026-03-25T12:00:00Z")
        self.assertEqual(archive_points[-1]["value"], 5.0)

    def test_build_panel_payload_handles_null_lstm_payload(self) -> None:
        history = [
            {
                "generated_at": "2026-03-26T17:00:00Z",
                "evaluation": {
                    "level": "normal",
                    "score": 1,
                    "risk_percent": 28,
                    "noaa": {
                        "kp": 3.33,
                        "kp_estimated": 1.0,
                        "solar_wind_speed_km_s": 455.2,
                        "bz_nt": -1.25,
                        "kp_lstm_forecast": None,
                    },
                },
            }
        ]

        panel = build_panel_payload(None, history)

        self.assertEqual(panel["history"][0]["kp"], 3.33)
        self.assertIsNone(panel["history"][0]["kp_lstm_predicted_kp"])
        self.assertIsNone(panel["history"][0]["kp_lstm_train_rmse"])

    def test_build_panel_payload_includes_access_links(self) -> None:
        panel = build_panel_payload(
            None,
            [],
            access={
                "mode": "public_tunnel",
                "local_url": "http://127.0.0.1:8080",
                "public_url": "https://uzay-havasi.trycloudflare.com",
                "message": "DÄ±ÅŸ aÄŸ paylaÅŸÄ±mÄ± hazÄ±r.",
                "updated_at": "2026-03-27T14:00:00Z",
                "tunnel_pid": 4321,
            },
        )

        self.assertEqual(panel["access"]["mode"], "public_tunnel")
        self.assertEqual(panel["access"]["public_url"], "https://uzay-havasi.trycloudflare.com")
        self.assertEqual(panel["access"]["local_url"], "http://127.0.0.1:8080")

    def test_build_panel_payload_uses_authoritative_chart_kp_values(self) -> None:
        latest = {
            "generated_at": "2026-03-27T13:15:00Z",
            "evaluation": {
                "level": "normal",
                "score": 0,
                "risk_percent": 18,
                "confidence_percent": 82,
                "confidence_label": "yuksek",
                "sector_impacts": [
                    {
                        "id": "gnss",
                        "title": "GPS / GNSS",
                        "risk_percent": 24,
                        "level": "normal",
                        "summary": "Standart navigasyon icin belirgin bozulma beklenmez.",
                        "drivers": ["Kp yukselisi"],
                    }
                ],
                "noaa": {
                    "kp": 1.0,
                    "kp_estimated": 0.0,
                },
            },
        }
        charts = empty_charts_payload()
        charts["kp_observed"]["points"] = [
            {"time": "2026-03-26T15:00:00Z", "value": 3.33}
        ]
        charts["kp_estimated"]["points"] = [
            {"time": "2026-03-26T18:57:00Z", "value": 1.33}
        ]

        panel = build_panel_payload(latest, [], charts)

        self.assertEqual(panel["latest"]["evaluation"]["noaa"]["kp"], 3.33)
        self.assertEqual(panel["latest"]["evaluation"]["noaa"]["kp_estimated"], 1.33)
        self.assertEqual(panel["latest"]["evaluation"]["noaa"]["observed_kp_at"], "2026-03-26T15:00:00Z")
        self.assertEqual(panel["latest"]["evaluation"]["confidence_percent"], 82)
        self.assertEqual(panel["latest"]["evaluation"]["sector_impacts"][0]["id"], "gnss")

    def test_build_panel_payload_adds_operational_insights(self) -> None:
        latest = {
            "generated_at": "2026-03-27T13:15:00Z",
            "evaluation": {
                "level": "watch",
                "score": 3,
                "risk_percent": 42,
                "confidence_percent": 76,
                "confidence_label": "orta",
                "sector_impacts": [],
                "noaa": {
                    "kp": 4.67,
                    "kp_estimated": 4.33,
                    "solar_wind_speed_km_s": 575.0,
                    "proton_density_p_cm3": 8.0,
                    "bz_nt": -9.5,
                },
            },
        }
        history = [
            {
                "generated_at": "2026-03-26T10:15:00Z",
                "evaluation": {
                    "level": "watch",
                    "risk_percent": 40,
                    "noaa": {
                        "kp": 4.33,
                        "kp_estimated": 4.0,
                        "solar_wind_speed_km_s": 560.0,
                        "proton_density_p_cm3": 7.0,
                        "bz_nt": -8.2,
                    },
                },
            },
            {
                "generated_at": "2026-03-24T05:15:00Z",
                "evaluation": {
                    "level": "normal",
                    "risk_percent": 20,
                    "noaa": {
                        "kp": 2.33,
                        "kp_estimated": 2.0,
                        "solar_wind_speed_km_s": 430.0,
                        "proton_density_p_cm3": 2.0,
                        "bz_nt": -2.5,
                    },
                },
            },
        ]
        charts = empty_charts_payload()
        charts["solar_wind_speed_km_s"]["points"] = [
            {"time": "2026-03-27T07:15:00Z", "value": 430.0},
            {"time": "2026-03-27T13:15:00Z", "value": 575.0},
        ]
        charts["bz_nt"]["points"] = [
            {"time": "2026-03-27T08:15:00Z", "value": -10.5},
            {"time": "2026-03-27T13:15:00Z", "value": -8.4},
        ]
        charts["kp_estimated"]["points"] = [
            {"time": "2026-03-27T09:00:00Z", "value": 4.33},
            {"time": "2026-03-27T12:00:00Z", "value": 4.67},
        ]

        panel = build_panel_payload(latest, history, charts, insight_history=history)

        self.assertIn("insights", panel)
        self.assertEqual(panel["insights"]["similar_events"][0]["generated_at"], "2026-03-26T10:15:00Z")
        self.assertGreaterEqual(panel["insights"]["similar_events"][0]["similarity_percent"], 70)
        self.assertIn(panel["insights"]["cme_window"]["status"], {"watch", "active"})
        self.assertIsNotNone(panel["insights"]["cme_window"]["window_start"])

    def test_turkey_province_panel_is_present_while_insight_panel_stays_removed(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        index_html = (project_root / "web" / "index.html").read_text(encoding="utf-8")
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")

        self.assertIn('id="turkeyRiskMapPanel"', index_html)
        self.assertIn('id="turkeyRiskUpdated"', index_html)
        self.assertIn('id="turkeyRiskContent"', index_html)
        self.assertIn("Türkiye İl Bazlı Risk Paneli", index_html)
        self.assertNotIn('id="insightPanel"', index_html)
        self.assertNotIn("Benzer olaylar ve yaklaÅŸan pencere", index_html)
        self.assertIn("renderTurkeyProvincePanel", panel_js)
        self.assertIn("function renderCmeWindow(insights) {", panel_js)
        self.assertIn("function renderSimilarEvents(insights) {", panel_js)
        self.assertEqual(panel_js.count("const metricImpactCards = ["), 2)

    def test_optional_turkey_and_insight_renderers_have_null_guards(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")

        self.assertIn("if (!elements.turkeyRiskContent || !elements.turkeyRiskUpdated)", panel_js)
        self.assertIn("if (!elements.cmeWindowBadge || !elements.cmeWindowSummary || !elements.cmeWindowRange || !elements.cmeWindowDrivers || !elements.cmeWindowInference)", panel_js)
        self.assertIn("if (!elements.similarEventsList)", panel_js)

    def test_live_status_panel_is_optional_in_frontend(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")
        panel_css = (project_root / "web" / "panel.css").read_text(encoding="utf-8")

        self.assertIn("if (!elements.statusLine)", panel_js)
        self.assertIn("if (!elements.accessMode || !elements.accessPublicUrl || !elements.accessHint || !elements.accessLocalUrl)", panel_js)
        self.assertIn("elements.imagesToggle?.checked", panel_js)
        self.assertIn("grid-template-columns: minmax(0, 1fr);", panel_css)

    def test_notification_last_sent_card_is_hidden_in_frontend(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")
        panel_css = (project_root / "web" / "panel.css").read_text(encoding="utf-8")

        self.assertIn('notify-last-box" hidden', panel_js)
        self.assertIn(".notify-last-box {\n  display: none !important;\n}", panel_css)

    def test_notification_panel_uses_server_side_background_flow(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")

        auto_slice = panel_js.rsplit("async function maybeSendAutoNotification(latest, access, notifications) {", 1)[1].split("function renderNotificationPanel(notifications, latest, access) {", 1)[0]
        render_slice = panel_js.rsplit("function renderNotificationPanel(notifications, latest, access) {", 1)[1].split("function renderSatellitePanel(context) {", 1)[0]

        self.assertIn("arka planda sunucu tarafından yürütülür", auto_slice)
        self.assertNotIn("await sendNotificationDirect(autoMode", auto_slice)
        self.assertIn('postJsonWithTimeout("/api/notifications/settings", savedSettings)', render_slice)
        self.assertIn('postNotificationBridge("/api/notifications/settings", savedSettings)', render_slice)
        self.assertIn("sayfa kapalı olsa da", render_slice)
        self.assertIn("yerel panel tarafından yürütülecek", render_slice)

    def test_notification_fallback_uses_turkey_time_label(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")

        build_slice = panel_js.rsplit("function buildNotificationEvent(latest, access, mode = \"alert\") {", 1)[1]
        self.assertIn('timeZone: "Europe/Istanbul"', build_slice)
        self.assertIn("Zaman (TSİ): ${generatedAtLabel}", build_slice)

    def test_notification_live_summary_moves_to_right_column_layout(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")
        panel_css = (project_root / "web" / "panel.css").read_text(encoding="utf-8")

        render_slice = panel_js.rsplit("function renderNotificationPanel(notifications, latest, access) {", 1)[1].split("function renderSatellitePanel(context) {", 1)[0]
        self.assertIn('<article class="notify-card notify-live-card">', render_slice)
        self.assertIn('<div class="notify-main-stack">', render_slice)
        self.assertIn('<div class="notify-side-stack">', render_slice)
        self.assertLess(
            render_slice.index('<div class="notify-main-stack">'),
            render_slice.index('<div class="notify-side-stack">'),
        )
        self.assertLess(
            render_slice.index('<article class="notify-card notify-live-card">'),
            render_slice.index('<article class="notify-card notify-steps-card">'),
        )
        self.assertIn(".notify-live-card .notify-metric-grid {", panel_css)
        self.assertIn("grid-template-columns: minmax(0, 1.04fr) minmax(340px, 0.96fr);", panel_css)

    def test_summary_cards_include_explainer_copy_and_compact_metric_styles(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        index_html = (project_root / "web" / "index.html").read_text(encoding="utf-8")
        panel_css = (project_root / "web" / "panel.css").read_text(encoding="utf-8")

        self.assertIn("summary-card-explainer", index_html)
        self.assertIn('class="signal-card level-card signal-risk"', index_html)
        self.assertIn('class="signal-card signal-kp"', index_html)
        self.assertIn('class="signal-card signal-wind"', index_html)
        self.assertIn(".summary-unit-pill {", panel_css)
        self.assertIn(".summary-grid .score-value,", panel_css)
        self.assertIn("font-variant-numeric: tabular-nums lining-nums;", panel_css)

    def test_risk_background_panel_is_removed_from_static_layout(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        index_html = (project_root / "web" / "index.html").read_text(encoding="utf-8")
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")

        self.assertNotIn('href="#riskPanel"', index_html)
        self.assertNotIn('id="riskPanel"', index_html)
        self.assertNotIn("Riskin Arka PlanÄ±", index_html)
        self.assertIn("if (!elements.reasonsList)", panel_js)

    def test_parse_daily_geomagnetic_kp_series_skips_negative_placeholders(self) -> None:
        text = "\n".join(
            [
                "2026 03 25    12  3 3 4 3 2 1 2 1    21  2 3 6 4 3 2 3 1    17   3.00  3.33  5.33  3.67  1.67  1.33  2.67  1.00",
                "2026 03 26    -1  1 1 2 2 2 3-1-1    -1  2 2 4 5 4 5-1-1    10   2.67  1.67  2.67  2.33  2.33  3.33 -1.00 -1.00",
            ]
        )

        series = parse_daily_geomagnetic_kp_series(text)

        self.assertEqual(len(series), 14)
        self.assertEqual(series[0][0].isoformat(), "2026-03-25T03:00:00+00:00")
        self.assertEqual(series[0][1], 3.0)
        self.assertEqual(series[-1][0].isoformat(), "2026-03-26T18:00:00+00:00")
        self.assertEqual(series[-1][1], 3.33)

    def test_kp_query_copy_hides_1932_and_cycle_analog_phrasing(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        index_html = (project_root / "web" / "index.html").read_text(encoding="utf-8")
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")

        self.assertIn('id="kpQueryPanel"', index_html)
        self.assertIn('id="kpQueryDateHint"', index_html)
        self.assertIn('data-kp-query-date="1935-06-15"', index_html)
        self.assertIn('data-kp-query-date="2027-03-28"', index_html)
        self.assertNotIn("1932'den veri dosyas", index_html)
        self.assertNotIn("Gelecek Cycle 25", index_html)
        self.assertNotIn("Cycle 25 Tahmini", panel_js)
        self.assertIn("mevcut \\u00f6ng\\u00f6r\\u00fc sonucu", panel_js)

    def test_solar_wind_query_copy_hides_1998_and_cycle_analog_phrasing(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        index_html = (project_root / "web" / "index.html").read_text(encoding="utf-8")
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")
        solar_slice = index_html.split('<article id="solarWindQueryPanel"', 1)[1].split('<article id="imfBzQueryPanel"', 1)[0]

        self.assertNotIn("1998'den veri dosyas", solar_slice)
        self.assertNotIn("Cycle 23-24", solar_slice)
        self.assertIn('data-solar-wind-query-date="1998-01-05"', solar_slice)
        self.assertIn('data-solar-wind-query-date="2027-03-28"', solar_slice)
        self.assertIn('hideCyclePhrasing: true', panel_js)
        self.assertIn('hideAnalogSection: true', panel_js)

    def test_kp_query_renderer_no_longer_references_missing_config_or_duplicate_slot_name(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")
        kp_slice = panel_js.split("function renderKpQueryResult(payload) {", 1)[1].split("const LOCAL_PANEL_QUERY_PORTS", 1)[0]

        self.assertNotIn("Boolean(config.hideCyclePhrasing)", kp_slice)
        self.assertNotIn("Boolean(config.hideAnalogSection)", kp_slice)
        self.assertEqual(kp_slice.count("const actualCycleSlot ="), 1)

    def test_imf_bz_query_copy_hides_1998_and_cycle_analog_phrasing(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        index_html = (project_root / "web" / "index.html").read_text(encoding="utf-8")
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")
        imf_slice = index_html.split('<article id="imfBzQueryPanel"', 1)[1].split('<article id="satellitePanel"', 1)[0]
        imf_config = panel_js.split("imfBz: {", 1)[1].split("\n  },", 1)[0]
        archive_slice = panel_js.split("function renderArchiveQueryResult(config, payload) {", 1)[1].split("async function fetchArchiveQuery", 1)[0]

        self.assertNotIn("1998'den veri dosyas", imf_slice)
        self.assertNotIn("Cycle 23-24", imf_slice)
        self.assertNotIn("Cycle 25", imf_slice)
        self.assertIn('data-imf-bz-query-date="1998-02-15"', imf_slice)
        self.assertIn('data-imf-bz-query-date="2027-03-28"', imf_slice)
        self.assertIn("hideCyclePhrasing: true", imf_config)
        self.assertIn("hideAnalogSection: true", imf_config)
        self.assertIn("hideAvailableRange: true", imf_config)
        self.assertIn('availabilitySummary:', imf_config)
        self.assertIn('sourceNote:', imf_config)
        self.assertNotIn("Cycle 23-24", imf_config)
        self.assertNotIn("Cycle 25", imf_config)
        self.assertIn("const actualCycleSlot = hideCyclePhrasing", archive_slice)

    def test_satellite_panel_hides_manual_override_controls(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")
        satellite_slice = panel_js.split("function renderSatellitePanel(context) {", 1)[1].split("function renderCmeWindow", 1)[0]

        self.assertNotIn("satellite-controls-group-override", satellite_slice)
        self.assertNotIn("data-satellite-override", satellite_slice)
        self.assertNotIn("data-satellite-override-kp", satellite_slice)
        self.assertNotIn("data-satellite-override-xray", satellite_slice)

    def test_satellite_panel_has_targeted_asri_text_repair(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")

        self.assertIn("const SATELLITE_UI_TEXT_REPLACEMENTS = [", panel_js)
        self.assertIn("ASRI Muhendislik Motoru", panel_js)
        self.assertIn("Baskın sürücü", panel_js)
        self.assertIn("repairElementText(elements.satellitePanelContent, SATELLITE_UI_TEXT_REPLACEMENTS);", panel_js)
        self.assertIn("repairElementText(elements.satelliteUpdated, SATELLITE_UI_TEXT_REPLACEMENTS);", panel_js)


    def test_satellite_panel_removes_breakdown_card_after_render(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")

        self.assertIn('elements.satellitePanelContent.querySelector(".satellite-breakdown-list")?.closest(".chart-card")?.remove();', panel_js)

    def test_satellite_panel_hides_actions_and_raw_data_sections(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")
        satellite_slice = panel_js.split("function renderSatellitePanel(context) {", 1)[1].split("function renderCmeWindow", 1)[0]

        self.assertNotIn("satellite-actions-shell", satellite_slice)
        self.assertNotIn("satellite-actions-card", satellite_slice)
        self.assertNotIn("satellite-raw-details", satellite_slice)
        self.assertNotIn("Ham canl", satellite_slice)

    def test_satellite_discipline_card_uses_centered_dark_theme_layout(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_css = (project_root / "web" / "panel.css").read_text(encoding="utf-8")

        self.assertIn(".satellite-chart-grid > .chart-card:last-child {", panel_css)
        self.assertIn("grid-column: 1 / -1;", panel_css)
        self.assertIn("width: min(100%, 960px);", panel_css)
        self.assertIn(".satellite-chart-grid > .chart-card:last-child .satellite-discipline-grid {", panel_css)
        self.assertIn("grid-template-columns: repeat(3, minmax(0, 1fr));", panel_css)

    def test_simulation_point_panel_uses_dark_theme_styles(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_css = (project_root / "web" / "panel.css").read_text(encoding="utf-8")

        self.assertIn(".simulation-point-panel {", panel_css)
        self.assertIn("linear-gradient(180deg, rgba(10, 21, 31, 0.96), rgba(16, 29, 42, 0.95));", panel_css)
        self.assertIn(".simulation-point-metric strong {", panel_css)
        self.assertIn("color: #f4f7fb;", panel_css)
        self.assertIn(".simulation-point-bar-track {", panel_css)
        self.assertIn("background: rgba(126, 160, 185, 0.18);", panel_css)

    def test_simulation_point_details_show_place_name_and_open_coordinates(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")

        self.assertIn("function simulationResolvePlaceName(lat, lon) {", panel_js)
        self.assertIn('return `Enlem ${formatNumber(Math.abs(lat), 1)}\\u00b0 ${latSuffix} | Boylam ${formatNumber(Math.abs(lon), 1)}\\u00b0 ${lonSuffix}`;', panel_js)
        self.assertIn("const placeLabel = simulationResolvePlaceName(local.lat, local.lon);", panel_js)
        self.assertIn("elements.simulationPointTitle.textContent = placeLabel;", panel_js)
        self.assertIn("elements.simulationPointLatLon.textContent = simulationCoordinateLabel(local.lat, local.lon);", panel_js)

    def test_kp_comparison_chart_is_reduced_to_two_lines(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        panel_js = (project_root / "web" / "panel.js").read_text(encoding="utf-8")

        series_slice = panel_js.rsplit("function comparisonSeriesFromHistory(history, charts = null) {", 1)[1].split("function renderKpComparisonChart(history, charts = null) {", 1)[0]
        comparison_slice = panel_js.rsplit("function renderKpComparisonChart(history, charts = null) {", 1)[1].split("function renderImages", 1)[0]
        self.assertIn("function buildLinearPath(points) {", panel_js)
        self.assertIn("function comparisonSeriesFromHistory(history, charts = null) {", panel_js)
        self.assertIn("const todayStart = new Date();", series_slice)
        self.assertIn("todayStart.setHours(0, 0, 0, 0);", series_slice)
        self.assertIn("if (!actual.length) {", series_slice)
        self.assertIn("const actualPath = buildLinearPath(actualPoints);", comparison_slice)
        self.assertIn("const forecastPath = buildLinearPath(forecastPoints);", comparison_slice)
        self.assertIn("const start = todayStart instanceof Date ? todayStart : (allPoints[0]?.date || new Date());", comparison_slice)
        self.assertIn("const now = new Date();", comparison_slice)
        self.assertNotIn("forecastBand", comparison_slice)
        self.assertNotIn("matchStems", comparison_slice)
        self.assertNotIn("comparison-chip-window", comparison_slice)
        self.assertIn('stroke="#0f5f69"', comparison_slice)
        self.assertIn('stroke="#c9851a"', comparison_slice)
        self.assertIn("const latestActualMarker = latestActual ?", comparison_slice)
        self.assertIn("const latestForecastMarker = latestForecast ?", comparison_slice)
        self.assertIn("Bugün 00:00'dan beri gerçek", comparison_slice)
        self.assertIn("renderKpComparisonChart(history, charts);", panel_js)

    def test_solar_panel_heading_uses_space_weather_copy(self) -> None:
        project_root = Path(__file__).resolve().parents[1]
        index_html = (project_root / "web" / "index.html").read_text(encoding="utf-8")

        self.assertIn("Uzay Havası Parametreleri", index_html)
        self.assertNotIn("<h2>Güneş Kaynaklı Parametreler</h2>", index_html)


if __name__ == "__main__":
    unittest.main()


