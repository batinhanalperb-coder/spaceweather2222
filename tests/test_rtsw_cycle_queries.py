from __future__ import annotations

from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from IMF_Bz import ImfBzForecaster
from gunes_ruzgarhizi import SolarWindSpeedForecaster


def build_rtsw_fixture() -> str:
    header = """RTSW web plot data - created 2026-03-29 00:00:00
More information is available from SWPC at http://www.swpc.noaa.gov/products/real-time-solar-wind

Start: 1998-01-01T00:00:00
End:   2026-03-20T00:00:00
Source: 0=ACE, 1=DSCOVR, 2=mixed ACE+DSCOVR

Resolution: 5 day
med=50th percentile (median), min=1st percentile, max=99th percentile
Phi mean is the average angle, taking into account the wrapping at 0/360 degrees

Timestamp           Source    Bt-med    Bt-min    Bt-max    Bx-med    Bx-min    Bx-max    By-med    By-min    By-max    Bz-med    Bz-min    Bz-max  Phi-mean   Phi-min   Phi-max Theta-med Theta-min Theta-max  Dens-med  Dens-min  Dens-max Speed-med Speed-min Speed-max  Temp-med  Temp-min  Temp-max
"""

    def row(day: str, source: int, bz_med: float, bz_min: float, bz_max: float, speed_med: float, speed_min: float, speed_max: float) -> str:
        values = [
            day,
            "00:00:00",
            f"{source:d}",
            "6.00",
            "2.00",
            "18.00",
            "0.50",
            "-4.00",
            "5.00",
            "0.30",
            "-5.00",
            "6.00",
            f"{bz_med:.2f}",
            f"{bz_min:.2f}",
            f"{bz_max:.2f}",
            "180.00",
            "10.00",
            "350.00",
            "2.00",
            "-60.00",
            "60.00",
            "4.00",
            "0.50",
            "12.00",
            f"{speed_med:.2f}",
            f"{speed_min:.2f}",
            f"{speed_max:.2f}",
            "50000.00",
            "10000.00",
            "180000.00",
        ]
        return " ".join(values)

    rows = [
        row("2002-03-10", 0, -6.20, -12.00, 2.40, 470.00, 410.00, 540.00),
        row("2002-03-15", 0, -7.50, -13.50, 1.80, 505.00, 430.00, 575.00),
        row("2002-03-20", 0, -5.80, -11.00, 2.10, 490.00, 425.00, 560.00),
        row("2002-03-25", 0, -4.10, -9.50, 3.20, 455.00, 400.00, 520.00),
        row("2015-03-10", 1, -3.20, -8.10, 4.50, 395.00, 340.00, 470.00),
        row("2015-03-15", 1, -4.60, -9.20, 3.70, 420.00, 355.00, 500.00),
        row("2015-03-20", 1, -6.80, -11.60, 2.10, 445.00, 375.00, 535.00),
        row("2015-03-25", 1, -5.10, -10.00, 1.20, 430.00, 360.00, 515.00),
        row("2025-03-15", 2, -2.10, -7.20, 4.10, 410.00, 350.00, 480.00),
        row("2026-03-20", 2, -8.40, -14.00, 0.80, 515.00, 450.00, 600.00),
    ]
    return header + "\n".join(rows) + "\n"


class RtswCycleQueryTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.data_path = Path(self.temp_dir.name) / "rtsw_plot_data_1998-01-01T00_00_00.txt"
        self.data_path.write_text(build_rtsw_fixture(), encoding="utf-8")

    def tearDown(self) -> None:
        self.temp_dir.cleanup()

    def test_solar_wind_returns_exact_observed_block(self) -> None:
        forecaster = SolarWindSpeedForecaster(data_file=self.data_path)

        result = forecaster.query("2026-03-20").to_dict()

        self.assertEqual(result["mode"], "observed")
        self.assertTrue(result["exact_match"])
        self.assertEqual(result["actual_record"]["date"], "2026-03-20")
        self.assertAlmostEqual(result["representative_value"], 515.0)
        self.assertEqual(result["level_label"], "Yükselmiş")

    def test_solar_wind_uses_nearest_historical_block_when_exact_row_missing(self) -> None:
        forecaster = SolarWindSpeedForecaster(data_file=self.data_path)

        result = forecaster.query("2026-03-18").to_dict()

        self.assertEqual(result["mode"], "observed")
        self.assertFalse(result["exact_match"])
        self.assertEqual(result["actual_record"]["date"], "2026-03-20")

    def test_solar_wind_builds_cycle25_forecast_from_cycle23_and_24(self) -> None:
        forecaster = SolarWindSpeedForecaster(data_file=self.data_path)

        result = forecaster.query("2026-03-29").to_dict()

        self.assertEqual(result["mode"], "forecast")
        self.assertEqual(result["training_cycles"], [23, 24])
        self.assertEqual(len(result["analog_cycles"]), 2)
        self.assertGreater(result["representative_value"], 350.0)
        self.assertLess(result["representative_value"], 550.0)

    def test_imf_bz_returns_forecast_and_preserves_negative_scale_labels(self) -> None:
        forecaster = ImfBzForecaster(data_file=self.data_path)

        result = forecaster.query("2026-03-29").to_dict()

        self.assertEqual(result["mode"], "forecast")
        self.assertEqual(result["training_cycles"], [23, 24])
        self.assertEqual(len(result["analog_cycles"]), 2)
        self.assertIn(result["level_label"], {"Negatif", "Çok Negatif", "Nötr / Zayıf", "Pozitif"})
        self.assertEqual(result["unit"], "nT")


if __name__ == "__main__":
    unittest.main()
