from __future__ import annotations

from datetime import date, datetime
from pathlib import Path
from typing import Any

from rtsw_cycle_query import RtswFiveDayForecaster


def speed_level(speed_km_s: float) -> str:
    if speed_km_s < 350:
        return "Düşük"
    if speed_km_s < 450:
        return "Normal"
    if speed_km_s < 550:
        return "Yükselmiş"
    return "Yüksek"


def speed_summary(speed_km_s: float) -> str:
    if speed_km_s < 350:
        return "Nispeten yavaş güneş rüzgârı koşulları görülüyor."
    if speed_km_s < 450:
        return "Tipik / orta seviye güneş rüzgârı hızı bekleniyor."
    if speed_km_s < 550:
        return "Yükselmiş güneş rüzgârı hızları görülebilir."
    return "Belirgin şekilde hızlı güneş rüzgârı koşulları öne çıkıyor."


def speed_confidence(low: float, high: float) -> tuple[str, int]:
    width = max(0.0, high - low)
    if width <= 80:
        return "Yüksek", 84
    if width <= 150:
        return "Orta", 68
    return "Düşük", 52


def phase_description(phase_percent: float) -> str:
    if phase_percent < 20:
        return "Cycle 25'in erken evresi"
    if phase_percent < 40:
        return "Cycle 25'in yükseliş evresi"
    if phase_percent < 60:
        return "Cycle 25'in orta evresi"
    if phase_percent < 80:
        return "Cycle 25'in geç evresi"
    return "Cycle 25'in son evresi"


class SolarWindSpeedForecaster(RtswFiveDayForecaster):
    def __init__(self, data_file: str | Path | None = None) -> None:
        super().__init__(
            metric_key="solar_wind_speed",
            display_name="Güneş Rüzgâr Hızı",
            unit="km/s",
            value_label="5 günlük temsilî hız",
            data_file=data_file,
            median_index=24,
            minimum_index=25,
            maximum_index=26,
            level_for_value=speed_level,
            summary_for_value=speed_summary,
            confidence_for_range=speed_confidence,
            phase_label_for_percent=phase_description,
            forecast_training_note=(
                "Tahmin, veri dosyası 1998'de başladığı için yalnızca Cycle 23 ve Cycle 24 içindeki benzer faz ve mevsim kayıtlarına dayanır."
            ),
        )


def forecast_solar_wind_by_date(
    target: date | datetime | str,
    data_file: str | Path | None = None,
) -> dict[str, Any]:
    return SolarWindSpeedForecaster(data_file=data_file).query(target).to_dict()
