from datetime import datetime, timedelta, timezone
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from kp_lstm_forecaster import KpLstmForecaster


class KpLstmForecasterTests(unittest.TestCase):
    @staticmethod
    def _record(at: datetime, kp: float, kp_estimated: float, speed: float, density: float, bz: float, bt: float) -> dict:
        return {
            "generated_at": at.isoformat(),
            "evaluation": {
                "noaa": {
                    "observed_at": at.isoformat(),
                    "kp": kp,
                    "kp_estimated": kp_estimated,
                    "solar_wind_speed_km_s": speed,
                    "proton_density_p_cm3": density,
                    "bz_nt": bz,
                    "bt_nt": bt,
                }
            },
        }

    def test_forecast_returns_none_with_insufficient_history(self) -> None:
        forecaster = KpLstmForecaster(
            {
                "lookback_points": 8,
                "forecast_horizon_minutes": 60,
                "min_training_samples": 6,
            }
        )
        base_time = datetime(2026, 3, 27, 0, 0, tzinfo=timezone.utc)
        history = [
            self._record(base_time + timedelta(minutes=index * 30), 2.0, 2.1, 410.0, 5.0, -1.0, 4.0)
            for index in range(6)
        ]
        current_record = self._record(base_time + timedelta(minutes=180), 2.2, 2.3, 415.0, 5.1, -1.2, 4.1)

        forecast = forecaster.forecast(history, current_record, base_time + timedelta(minutes=180))

        self.assertIsNone(forecast)

    def test_forecast_learns_rising_kp_pattern(self) -> None:
        forecaster = KpLstmForecaster(
            {
                "lookback_points": 6,
                "forecast_horizon_minutes": 60,
                "training_history_limit": 64,
                "max_training_samples": 32,
                "min_training_samples": 10,
                "hidden_size": 5,
                "epochs": 18,
                "learning_rate": 0.02,
                "gradient_clip": 1.2,
                "random_seed": 7,
            }
        )
        base_time = datetime(2026, 3, 27, 0, 0, tzinfo=timezone.utc)
        history = []
        for index in range(28):
            kp = 1.2 + (index * 0.11)
            history.append(
                self._record(
                    base_time + timedelta(minutes=index * 30),
                    kp=kp,
                    kp_estimated=kp + 0.18,
                    speed=380.0 + (index * 7.5),
                    density=4.0 + (index * 0.12),
                    bz=-1.5 - (index * 0.18),
                    bt=4.2 + (index * 0.06),
                )
            )

        current_time = base_time + timedelta(minutes=28 * 30)
        current_record = self._record(
            current_time,
            kp=1.2 + (28 * 0.11),
            kp_estimated=1.2 + (28 * 0.11) + 0.18,
            speed=380.0 + (28 * 7.5),
            density=4.0 + (28 * 0.12),
            bz=-1.5 - (28 * 0.18),
            bt=4.2 + (28 * 0.06),
        )

        forecast = forecaster.forecast(history, current_record, current_time)

        self.assertIsNotNone(forecast)
        assert forecast is not None
        self.assertGreater(forecast.predicted_kp, 3.2)
        self.assertLessEqual(forecast.predicted_kp, 9.0)
        self.assertGreaterEqual(forecast.confidence_percent, 20)
        self.assertEqual(forecast.horizon_minutes, 60)
        self.assertTrue(forecast.target_time.endswith("Z"))

    def test_forecast_uses_archive_samples_when_live_history_is_too_short(self) -> None:
        forecaster = KpLstmForecaster(
            {
                "lookback_points": 6,
                "forecast_horizon_minutes": 180,
                "training_history_limit": 32,
                "max_training_samples": 24,
                "min_training_samples": 8,
                "hidden_size": 5,
                "epochs": 10,
                "learning_rate": 0.02,
                "gradient_clip": 1.2,
                "random_seed": 11,
                "archive_enabled": True,
                "archive_training_days": 365,
                "archive_sample_ratio": 0.5,
            }
        )
        base_time = datetime(2026, 3, 27, 0, 0, tzinfo=timezone.utc)
        history = [
            self._record(
                base_time + timedelta(minutes=index * 30),
                kp=2.0 + (index * 0.08),
                kp_estimated=2.1 + (index * 0.08),
                speed=405.0 + (index * 5.0),
                density=4.2 + (index * 0.1),
                bz=-1.0 - (index * 0.2),
                bt=4.5 + (index * 0.05),
            )
            for index in range(6)
        ]
        current_time = base_time + timedelta(minutes=6 * 30)
        current_record = self._record(
            current_time,
            kp=2.48,
            kp_estimated=2.58,
            speed=435.0,
            density=4.8,
            bz=-2.2,
            bt=4.9,
        )

        forecast = forecaster.forecast(history, current_record, current_time)

        self.assertIsNotNone(forecast)
        assert forecast is not None
        self.assertGreater(forecast.archive_training_samples, 0)
        self.assertEqual(forecast.live_training_samples, 0)
        self.assertEqual(
            forecast.training_samples,
            forecast.live_training_samples + forecast.archive_training_samples,
        )
        self.assertGreater(forecast.training_window_points, len(history))
        self.assertLessEqual(forecast.predicted_kp, 9.0)
        self.assertGreaterEqual(forecast.confidence_percent, 18)


if __name__ == "__main__":
    unittest.main()
