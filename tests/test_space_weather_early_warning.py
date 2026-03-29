from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from kp_lstm_forecaster import KpLstmForecast
from space_weather_early_warning import (
    EarlyWarningEngine,
    IntermagnetClient,
    IntermagnetStationSnapshot,
    NasaImageClient,
    NoaaSwpcClient,
    NoaaSnapshot,
    SpaceWeatherEarlyWarningApp,
    default_config,
    unlink_if_exists,
)


class NoaaSwpcClientTests(unittest.TestCase):
    def test_normalize_rows_supports_legacy_header_table(self) -> None:
        payload = [
            ["time_tag", "density", "speed"],
            ["2026-03-26T10:00:00Z", "12.5", "480.0"],
            ["2026-03-26T10:01:00Z", "15.0", "510.0"],
        ]

        rows = NoaaSwpcClient._normalize_rows(payload)

        self.assertEqual(len(rows), 2)
        self.assertEqual(rows[-1]["speed"], "510.0")

    def test_normalize_rows_supports_new_object_array(self) -> None:
        payload = [
            {
                "time_tag": "2026-03-26T10:00:00Z",
                "proton_density": 8.0,
                "proton_speed": 440.0,
                "active": False,
            },
            {
                "time_tag": "2026-03-26T10:01:00Z",
                "proton_density": 18.0,
                "proton_speed": 620.0,
                "active": True,
            },
        ]

        rows = NoaaSwpcClient._normalize_rows(payload)
        latest = NoaaSwpcClient._pick_latest_row(rows)

        self.assertEqual(latest["proton_speed"], 620.0)

    def test_extract_kp_prefers_estimated_kp(self) -> None:
        client = NoaaSwpcClient(http=None)  # type: ignore[arg-type]
        row = {
            "time_tag": "2026-03-26T17:33:00",
            "kp_index": 3,
            "estimated_kp": 3.33,
            "kp": "3P",
        }

        kp = client._extract_kp_value(row)

        self.assertEqual(kp, 3.33)

    def test_extract_kp_ignores_placeholder_zero_without_label(self) -> None:
        client = NoaaSwpcClient(http=None)  # type: ignore[arg-type]
        row = {
            "time_tag": "2026-03-27T09:55:00Z",
            "kp_index": 0.0,
            "estimated_kp": None,
            "kp": "",
        }

        kp = client._extract_kp_value(row)

        self.assertIsNone(kp)

    def test_pick_latest_estimated_kp_row_skips_placeholder_zero(self) -> None:
        client = NoaaSwpcClient(http=None)  # type: ignore[arg-type]
        rows = [
            {
                "time_tag": "2026-03-27T09:54:00Z",
                "kp_index": 2.0,
                "estimated_kp": 1.67,
                "kp": "2-",
                "active": True,
            },
            {
                "time_tag": "2026-03-27T09:59:00Z",
                "kp_index": 0.0,
                "estimated_kp": 0.0,
                "kp": "",
                "active": True,
            },
        ]

        latest = client._pick_latest_estimated_kp_row(rows)

        self.assertEqual(latest["time_tag"], "2026-03-27T09:54:00Z")

    def test_fetch_snapshot_falls_back_to_recent_daily_estimated_kp(self) -> None:
        class StubHttp:
            def get_json(self, url: str):
                if url == NoaaSwpcClient.KP_URL:
                    return [
                        {
                            "time_tag": "2026-03-27T09:59:00Z",
                            "estimated_kp": 0.0,
                            "kp_index": 0.0,
                            "kp": "",
                            "active": True,
                        }
                    ]
                if url == NoaaSwpcClient.OBSERVED_KP_URL:
                    return [{"time_tag": "2026-03-27T06:00:00Z", "Kp": 1.67}]
                if url in NoaaSwpcClient.MAG_URLS:
                    return [{"time_tag": "2026-03-27T09:58:00Z", "bz_gsm": 0.88, "bt": 4.15}]
                if url in NoaaSwpcClient.PLASMA_URLS:
                    return [{"time_tag": "2026-03-27T09:58:00Z", "proton_speed": 403.7, "proton_density": 0.52}]
                raise AssertionError(url)

            def get_text(self, url: str) -> str:
                if url == NoaaSwpcClient.DAILY_GEOMAGNETIC_URL:
                    return "2026 03 27    12  2 2 2 2 1 1 1 1    15   1.00  1.00  1.67  1.00  1.00  1.00  1.00  1.00"
                raise AssertionError(url)

        client = NoaaSwpcClient(http=StubHttp())

        snapshot = client.fetch_snapshot()

        self.assertEqual(snapshot.kp, 1.67)
        self.assertEqual(snapshot.kp_estimated, 1.67)

    def test_normalize_rows_parses_observed_kp_product_table(self) -> None:
        payload = [
            ["time_tag", "Kp", "a_running", "station_count"],
            ["2026-03-26 15:00:00.000", "3.33", "18", "8"],
        ]

        rows = NoaaSwpcClient._normalize_rows(payload)

        self.assertEqual(len(rows), 1)
        self.assertEqual(rows[0]["Kp"], "3.33")


class EarlyWarningEngineTests(unittest.TestCase):
    def test_engine_escalates_on_combined_signals(self) -> None:
        engine = EarlyWarningEngine(
            {
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
            }
        )
        noaa = NoaaSnapshot(
            observed_at="2026-03-26T10:01:00Z",
            solar_wind_speed_km_s=780.0,
            proton_density_p_cm3=40.0,
            bz_nt=-20.0,
            bt_nt=24.0,
            kp=7.33,
        )

        result = engine.evaluate(noaa, [])

        self.assertEqual(result["level"], "severe")
        self.assertGreaterEqual(result["score"], 5)
        self.assertGreaterEqual(result["risk_percent"], 85)

    def test_engine_returns_nonzero_risk_percent_for_moderate_conditions(self) -> None:
        engine = EarlyWarningEngine(
            {
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
            }
        )
        noaa = NoaaSnapshot(
            observed_at="2026-03-26T10:01:00Z",
            solar_wind_speed_km_s=480.0,
            proton_density_p_cm3=8.0,
            bz_nt=-4.0,
            bt_nt=8.0,
            kp=3.33,
            kp_estimated=2.67,
        )

        result = engine.evaluate(noaa, [])

        self.assertEqual(result["level"], "normal")
        self.assertGreater(result["risk_percent"], 0)
        self.assertLess(result["risk_percent"], 35)

    def test_unlink_if_exists_ignores_missing_file(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            path = Path(temp_dir) / "missing.txt"

            unlink_if_exists(path)

            self.assertFalse(path.exists())

    def test_engine_reports_confidence_and_sector_impacts(self) -> None:
        engine = EarlyWarningEngine(
            {
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
            }
        )
        noaa = NoaaSnapshot(
            observed_at="2026-03-27T12:30:00Z",
            solar_wind_speed_km_s=690.0,
            proton_density_p_cm3=22.0,
            bz_nt=-11.5,
            bt_nt=10.0,
            kp=5.33,
            kp_estimated=5.67,
        )
        stations = [
            IntermagnetStationSnapshot(
                station="BOU",
                last_time="2026-03-27T12:28:00Z",
                component="X",
                last_value_nt=18000.0,
                delta_nt=155.0,
                samples=30,
            ),
            IntermagnetStationSnapshot(
                station="FRD",
                last_time="2026-03-27T12:28:00Z",
                component="X",
                last_value_nt=19500.0,
                delta_nt=126.0,
                samples=30,
            ),
        ]

        result = engine.evaluate(noaa, stations)

        self.assertIn(result["confidence_label"], {"orta", "yuksek"})
        self.assertGreaterEqual(result["confidence_percent"], 60)
        self.assertEqual(len(result["sector_impacts"]), 4)
        self.assertEqual(result["sector_impacts"][0]["id"], "gnss")
        self.assertTrue(result["sector_impacts"][0]["drivers"])
        self.assertIn("component_risks", result)
        self.assertIn("ground", result["component_risks"])


class IntermagnetClientTests(unittest.TestCase):
    def test_select_component_supports_field_vector_labels(self) -> None:
        parameters = [
            {"name": "Time", "label": "Date/time"},
            {"name": "Field_Vector", "label": ["X", "Y", "Z"]},
            {"name": "Field_Magnitude", "label": "F"},
        ]

        selected = IntermagnetClient._select_component(parameters)

        self.assertIsNotNone(selected)
        self.assertEqual(selected["parameter_name"], "Field_Vector")
        self.assertEqual(selected["component_label"], "X")
        self.assertEqual(selected["component_index"], 0)


class NasaImageClientTests(unittest.TestCase):
    def test_extract_live_image_urls_maps_soho_realtime_images(self) -> None:
        client = NasaImageClient(http=None, output_dir=Path("."))  # type: ignore[arg-type]
        html = """
        <html><body>
          <img src="/data/realtime/eit_195/512/latest.jpg" alt="">
          <img src="/data/realtime/hmi_mag/512/latest.jpg" alt="">
          <img src="/data/realtime/c3/512/latest.jpg" alt="">
        </body></html>
        """

        resolved = client._extract_live_image_urls(html)

        self.assertEqual(
            resolved["soho_eit_195"],
            "https://soho.nascom.nasa.gov/data/realtime/eit_195/512/latest.jpg",
        )
        self.assertEqual(
            resolved["sdo_hmi_magnetogram"],
            "https://soho.nascom.nasa.gov/data/realtime/hmi_mag/512/latest.jpg",
        )
        self.assertEqual(
            resolved["soho_lasco_c3"],
            "https://soho.nascom.nasa.gov/data/realtime/c3/512/latest.jpg",
        )


class AppIntegrationTests(unittest.TestCase):
    def test_run_once_embeds_lstm_forecast_in_payload(self) -> None:
        with tempfile.TemporaryDirectory() as temp_dir:
            config = default_config()
            base_dir = Path(temp_dir)
            app = SpaceWeatherEarlyWarningApp(config, base_dir=base_dir)

            class StubNoaa:
                def fetch_snapshot(self) -> NoaaSnapshot:
                    return NoaaSnapshot(
                        observed_at="2026-03-27T12:00:00Z",
                        solar_wind_speed_km_s=520.0,
                        proton_density_p_cm3=7.0,
                        bz_nt=-6.5,
                        bt_nt=8.5,
                        kp=3.67,
                        kp_estimated=4.0,
                    )

            class StubIntermagnet:
                def fetch_station_snapshot(self, station: str, start_time, end_time) -> IntermagnetStationSnapshot:  # type: ignore[no-untyped-def]
                    return IntermagnetStationSnapshot(
                        station=station,
                        last_time="2026-03-27T11:58:00Z",
                        component="X",
                        last_value_nt=18500.0,
                        delta_nt=75.0,
                        samples=24,
                    )

            class StubNasa:
                @staticmethod
                def list_live_images():
                    return []

                @staticmethod
                def download_latest_images(items):  # type: ignore[no-untyped-def]
                    return {}

            class StubForecaster:
                @staticmethod
                def forecast(history, current_record, run_at):  # type: ignore[no-untyped-def]
                    return KpLstmForecast(
                        predicted_kp=4.82,
                        target_time="2026-03-27T15:00:00Z",
                        horizon_minutes=180,
                        confidence_percent=74,
                        current_reference_kp=4.0,
                        delta_from_reference=0.82,
                        trend="yukselis",
                        training_samples=48,
                        training_window_points=72,
                        train_rmse=0.58,
                    )

            app.noaa = StubNoaa()
            app.intermagnet = StubIntermagnet()
            app.nasa = StubNasa()
            app.kp_lstm = StubForecaster()

            payload = app.run_once(download_images=False)

            self.assertIn("kp_lstm_forecast", payload["evaluation"]["noaa"])
            self.assertEqual(payload["evaluation"]["noaa"]["kp_lstm_forecast"]["predicted_kp"], 4.82)
            self.assertEqual(payload["evaluation"]["noaa"]["kp_lstm_forecast"]["trend"], "yukselis")


if __name__ == "__main__":
    unittest.main()
