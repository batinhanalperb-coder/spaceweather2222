from __future__ import annotations

from datetime import date, datetime
from pathlib import Path
from typing import Any

from rtsw_cycle_query import RtswFiveDayForecaster


def bz_level(bz_nt: float) -> str:
    if bz_nt <= -10:
        return "Çok Negatif"
    if bz_nt <= -5:
        return "Negatif"
    if bz_nt < 5:
        return "Nötr / Zayıf"
    return "Pozitif"


def bz_summary(bz_nt: float) -> str:
    if bz_nt <= -10:
        return "Güçlü güney yönlü IMF Bz, jeomanyetik etkileşim açısından en kritik bölgeye işaret ediyor."
    if bz_nt <= -5:
        return "Negatif IMF Bz, manyetosferle bağlanma olasılığının artabileceği dikkat bölgesini gösteriyor."
    if bz_nt < 5:
        return "IMF Bz nötr ya da zayıf bölgede; belirgin yönlü etki sınırlı olabilir."
    return "Pozitif IMF Bz, genelde daha sakin manyetik bağlanma koşullarıyla ilişkilidir."


def bz_confidence(low: float, high: float) -> tuple[str, int]:
    width = max(0.0, high - low)
    if width <= 4:
        return "Yüksek", 84
    if width <= 8:
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


class ImfBzForecaster(RtswFiveDayForecaster):
    def __init__(self, data_file: str | Path | None = None) -> None:
        super().__init__(
            metric_key="imf_bz",
            display_name="IMF Bz",
            unit="nT",
            value_label="5 günlük temsilî IMF Bz",
            data_file=data_file,
            median_index=12,
            minimum_index=13,
            maximum_index=14,
            level_for_value=bz_level,
            summary_for_value=bz_summary,
            confidence_for_range=bz_confidence,
            phase_label_for_percent=phase_description,
            forecast_training_note=(
                "Tahmin, veri dosyası 1998'de başladığı için yalnızca Cycle 23 ve Cycle 24 içindeki benzer faz ve mevsim kayıtlarına dayanır."
            ),
        )


def forecast_imf_bz_by_date(
    target: date | datetime | str,
    data_file: str | Path | None = None,
) -> dict[str, Any]:
    return ImfBzForecaster(data_file=data_file).query(target).to_dict()
