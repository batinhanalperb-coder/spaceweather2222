from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from kp_lstm_forecaster import KpDailyCycleForecaster, _risk_level_from_kp


class KpDailyCycleQueryTests(unittest.TestCase):
    def test_risk_level_labels_are_turkish(self) -> None:
        self.assertEqual(_risk_level_from_kp(3.5), "Düşük / sakin")
        self.assertEqual(_risk_level_from_kp(4.2), "Yükselmiş / aktif")
        self.assertEqual(_risk_level_from_kp(5.4), "G1 küçük fırtına")

    def test_future_query_notes_are_turkish(self) -> None:
        forecaster = KpDailyCycleForecaster()

        result = forecaster.query("2026-03-29")

        self.assertEqual(result.risk_level, "Yükselmiş / aktif")
        self.assertTrue(result.notes)
        self.assertTrue(result.notes[0].startswith("Gelecek tarih"))
        self.assertIn("Cycle 21-24", result.notes[1])


if __name__ == "__main__":
    unittest.main()
