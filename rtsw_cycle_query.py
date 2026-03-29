from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime, timedelta
import math
from pathlib import Path
from typing import Any, Callable


RTSW_DATA_FILENAME = "rtsw_plot_data_1998-01-01T00_00_00.txt"
CYCLE_STARTS = {
    21: date(1976, 3, 1),
    22: date(1986, 9, 1),
    23: date(1996, 8, 1),
    24: date(2008, 12, 1),
    25: date(2019, 12, 1),
}
TRAIN_CYCLES = (23, 24)
SOURCE_LABELS = {
    0: "ACE",
    1: "DSCOVR",
    2: "ACE + DSCOVR",
}


def mean(values: list[float]) -> float | None:
    if not values:
        return None
    return sum(values) / len(values)


def weighted_mean(values: list[float], weights: list[float]) -> float | None:
    if not values or not weights:
        return None
    total_weight = sum(weights)
    if total_weight <= 0:
        return mean(values)
    return sum(value * weight for value, weight in zip(values, weights)) / total_weight


def percentile(values: list[float], percentile_value: float) -> float | None:
    if not values:
        return None

    ordered = sorted(values)
    if len(ordered) == 1:
        return ordered[0]

    position = (len(ordered) - 1) * percentile_value / 100.0
    lower_index = int(math.floor(position))
    upper_index = int(math.ceil(position))
    if lower_index == upper_index:
        return ordered[lower_index]

    ratio = position - lower_index
    return ordered[lower_index] * (1.0 - ratio) + ordered[upper_index] * ratio


def parse_date_input(value: date | datetime | str) -> date:
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    return datetime.strptime(str(value).strip(), "%Y-%m-%d").date()


def day_of_year(value: date) -> int:
    return value.timetuple().tm_yday


def circular_day_diff(left: int, right: int) -> int:
    delta = abs(int(left) - int(right))
    return min(delta, 366 - delta)


def triangular_weight(diff: float, window: float) -> float:
    if window <= 0 or diff > window:
        return 0.0
    return 1.0 - (diff / window)


def build_cycle_end_dates() -> tuple[dict[int, date], int]:
    cycle_ends = {
        21: CYCLE_STARTS[22],
        22: CYCLE_STARTS[23],
        23: CYCLE_STARTS[24],
        24: CYCLE_STARTS[25],
    }
    durations = [(cycle_ends[cycle] - CYCLE_STARTS[cycle]).days for cycle in (21, 22, 23, 24)]
    average_duration = int(round(sum(durations) / len(durations)))
    cycle_ends[25] = CYCLE_STARTS[25] + timedelta(days=average_duration)
    return cycle_ends, average_duration


def get_cycle_for_date(target_day: date, cycle_ends: dict[int, date]) -> int | None:
    for cycle in (21, 22, 23, 24):
        if CYCLE_STARTS[cycle] <= target_day < cycle_ends[cycle]:
            return cycle
    if CYCLE_STARTS[25] <= target_day < cycle_ends[25]:
        return 25
    return None


def cycle_phase(target_day: date, start_day: date, end_day: date) -> float | None:
    total_days = (end_day - start_day).days
    if total_days <= 0:
        return None

    elapsed_days = (target_day - start_day).days
    if elapsed_days <= 0:
        return 0.0
    if elapsed_days >= total_days:
        return 1.0
    return elapsed_days / float(total_days)


@dataclass
class RtswFiveDayRecord:
    day: date
    source: int
    source_name: str
    cycle: int | None
    phase: float | None
    day_of_year: int
    representative_value: float
    expected_low: float
    expected_high: float

    def to_dict(self) -> dict[str, Any]:
        return {
            "date": self.day.isoformat(),
            "source": self.source,
            "source_name": self.source_name,
            "cycle": self.cycle,
            "cycle_phase": None if self.phase is None else round(self.phase, 6),
            "representative_value": round(self.representative_value, 2),
            "expected_low": round(self.expected_low, 2),
            "expected_high": round(self.expected_high, 2),
            "resolution_days": 5,
        }


@dataclass
class RtswAnalogCycleResult:
    cycle: int
    analog_anchor_date: str
    weighted_value: float
    expected_low: float
    expected_high: float
    phase_day_offset: int
    seasonal_offset_days: int
    sample_count: int

    def to_dict(self) -> dict[str, Any]:
        return {
            "cycle": self.cycle,
            "analog_anchor_date": self.analog_anchor_date,
            "weighted_value": round(self.weighted_value, 2),
            "expected_low": round(self.expected_low, 2),
            "expected_high": round(self.expected_high, 2),
            "phase_day_offset": self.phase_day_offset,
            "seasonal_offset_days": self.seasonal_offset_days,
            "sample_count": self.sample_count,
        }


@dataclass
class RtswFiveDayQueryResult:
    query_date: str
    mode: str
    metric_key: str
    display_name: str
    unit: str
    value_label: str
    representative_value: float
    level_label: str
    summary_text: str
    expected_low: float
    expected_high: float
    dataset_last_date: str
    source_file: str
    cycle: int | None
    cycle_phase_percent: float | None
    cycle_phase_label: str | None
    confidence_label: str
    confidence_percent: int
    training_cycles: list[int]
    notes: list[str]
    actual_record: RtswFiveDayRecord | None
    exact_match: bool
    analog_cycles: list[RtswAnalogCycleResult]

    def to_dict(self) -> dict[str, Any]:
        return {
            "query_date": self.query_date,
            "mode": self.mode,
            "metric_key": self.metric_key,
            "display_name": self.display_name,
            "unit": self.unit,
            "value_label": self.value_label,
            "representative_value": round(self.representative_value, 2),
            "level_label": self.level_label,
            "summary_text": self.summary_text,
            "expected_range": [round(self.expected_low, 2), round(self.expected_high, 2)],
            "dataset_last_date": self.dataset_last_date,
            "source_file": self.source_file,
            "cycle": self.cycle,
            "cycle_phase_percent": None if self.cycle_phase_percent is None else round(self.cycle_phase_percent, 2),
            "cycle_phase_label": self.cycle_phase_label,
            "confidence_label": self.confidence_label,
            "confidence_percent": self.confidence_percent,
            "training_cycles": self.training_cycles,
            "notes": self.notes,
            "actual_record": None if self.actual_record is None else self.actual_record.to_dict(),
            "exact_match": self.exact_match,
            "analog_cycles": [item.to_dict() for item in self.analog_cycles],
        }


class RtswFiveDayForecaster:
    def __init__(
        self,
        *,
        metric_key: str,
        display_name: str,
        unit: str,
        value_label: str,
        data_file: str | Path | None = None,
        median_index: int,
        minimum_index: int,
        maximum_index: int,
        level_for_value: Callable[[float], str],
        summary_for_value: Callable[[float], str],
        confidence_for_range: Callable[[float, float], tuple[str, int]],
        phase_label_for_percent: Callable[[float], str],
        forecast_training_note: str,
    ) -> None:
        self.metric_key = metric_key
        self.display_name = display_name
        self.unit = unit
        self.value_label = value_label
        self.data_path = Path(data_file) if data_file else Path(__file__).with_name(RTSW_DATA_FILENAME)
        self.median_index = median_index
        self.minimum_index = minimum_index
        self.maximum_index = maximum_index
        self.level_for_value = level_for_value
        self.summary_for_value = summary_for_value
        self.confidence_for_range = confidence_for_range
        self.phase_label_for_percent = phase_label_for_percent
        self.forecast_training_note = forecast_training_note

        self.cycle_ends, self.average_cycle_duration_days = build_cycle_end_dates()
        self.records = self._load_records(self.data_path)
        self.records_by_day = {record.day: record for record in self.records}
        self.dataset_first_day = self.records[0].day
        self.dataset_last_day = self.records[-1].day
        self.estimated_cycle25_end = self.cycle_ends[25]

    def _load_records(self, path: Path) -> list[RtswFiveDayRecord]:
        if not path.exists():
            raise FileNotFoundError(f"RTSW data file not found: {path}")

        records: list[RtswFiveDayRecord] = []
        with path.open("r", encoding="utf-8", errors="replace") as handle:
            for raw_line in handle:
                line = raw_line.strip()
                if not line:
                    continue
                if line.startswith(("RTSW", "More", "Start", "End", "Source", "Resolution", "med=", "Phi", "Timestamp")):
                    continue

                parts = line.split()
                if len(parts) <= self.maximum_index:
                    continue

                try:
                    current_dt = datetime.strptime(parts[0] + " " + parts[1], "%Y-%m-%d %H:%M:%S")
                    current_day = current_dt.date()
                    source = int(parts[2])
                    median_value = float(parts[self.median_index])
                    minimum_value = float(parts[self.minimum_index])
                    maximum_value = float(parts[self.maximum_index])
                except (TypeError, ValueError):
                    continue

                if median_value <= -9999 or minimum_value <= -9999 or maximum_value <= -9999:
                    continue

                cycle = get_cycle_for_date(current_day, self.cycle_ends)
                phase = None
                if cycle is not None:
                    phase = cycle_phase(current_day, CYCLE_STARTS[cycle], self.cycle_ends[cycle])

                records.append(
                    RtswFiveDayRecord(
                        day=current_day,
                        source=source,
                        source_name=SOURCE_LABELS.get(source, f"Kaynak {source}"),
                        cycle=cycle,
                        phase=phase,
                        day_of_year=day_of_year(current_day),
                        representative_value=median_value,
                        expected_low=minimum_value,
                        expected_high=maximum_value,
                    )
                )

        if not records:
            raise ValueError(f"No {self.display_name} rows could be parsed from {path}")

        records.sort(key=lambda item: item.day)
        return records

    def _estimate_for_single_cycle(
        self,
        target_phase: float,
        target_day_of_year: int,
        cycle_no: int,
        phase_window: float = 0.06,
        season_window: int = 30,
    ) -> RtswAnalogCycleResult | None:
        candidates: list[tuple[RtswFiveDayRecord, float, int, int]] = []

        def collect(phase_limit: float, season_limit: int | None) -> list[tuple[RtswFiveDayRecord, float, int, int]]:
            collected: list[tuple[RtswFiveDayRecord, float, int, int]] = []
            for record in self.records:
                if record.cycle != cycle_no or record.phase is None:
                    continue

                phase_diff = abs(record.phase - target_phase)
                phase_weight = triangular_weight(phase_diff, phase_limit)
                if phase_weight <= 0:
                    continue

                seasonal_diff = circular_day_diff(record.day_of_year, target_day_of_year)
                if season_limit is None:
                    season_weight = 1.0
                else:
                    season_weight = triangular_weight(seasonal_diff, season_limit)
                total_weight = phase_weight * season_weight
                if total_weight <= 0:
                    continue
                collected.append((record, total_weight, int(round(phase_diff * self.average_cycle_duration_days)), seasonal_diff))
            return collected

        candidates = collect(phase_window, season_window)
        if len(candidates) < 6:
            candidates = collect(phase_window * 1.5, int(round(season_window * 1.5)))
        if len(candidates) < 3:
            candidates = collect(0.08, None)
        if not candidates:
            fallback_candidates: list[tuple[float, RtswFiveDayRecord, int, int]] = []
            for record in self.records:
                if record.cycle != cycle_no or record.phase is None:
                    continue
                phase_diff = abs(record.phase - target_phase)
                seasonal_diff = circular_day_diff(record.day_of_year, target_day_of_year)
                fallback_score = phase_diff + (seasonal_diff / 366.0)
                fallback_candidates.append((fallback_score, record, int(round(phase_diff * self.average_cycle_duration_days)), seasonal_diff))

            fallback_candidates.sort(key=lambda item: (item[0], item[1].day))
            candidates = [
                (record, max(0.05, 1.0 / (0.15 + score)), phase_offset, seasonal_offset)
                for score, record, phase_offset, seasonal_offset in fallback_candidates[:4]
            ]
        if not candidates:
            return None

        values = [item[0].representative_value for item in candidates]
        weights = [item[1] for item in candidates]
        weighted_value = weighted_mean(values, weights)
        if weighted_value is None:
            return None

        low = percentile(values, 25)
        high = percentile(values, 75)
        if low is None or high is None:
            return None

        best_record, _, phase_day_offset, seasonal_offset_days = max(candidates, key=lambda item: item[1])
        return RtswAnalogCycleResult(
            cycle=cycle_no,
            analog_anchor_date=best_record.day.isoformat(),
            weighted_value=weighted_value,
            expected_low=low,
            expected_high=high,
            phase_day_offset=phase_day_offset,
            seasonal_offset_days=seasonal_offset_days,
            sample_count=len(values),
        )

    def _actual_result(self, target_day: date, record: RtswFiveDayRecord, *, exact_match: bool) -> RtswFiveDayQueryResult:
        notes = []
        if exact_match:
            notes.append(
                f"{self.display_name} için sorgulanan tarih veri dosyasında doğrudan bulundu; gerçek 5 günlük RTSW kaydı gösteriliyor."
            )
        else:
            notes.append(
                "RTSW verisi 5 günlük bloklarla tutulduğu için tam gün eşleşmesi bulunamadı; sorgulanan tarihe en yakın blok kullanıldı."
            )
        notes.append(
            f"Gösterilen değer günlük/anlık değil; {target_day.isoformat()} çevresindeki yaklaşık 5 günlük dönemin temsilî {self.value_label.lower()} değeridir."
        )
        notes.append(
            f"Kaynak blok {record.day.isoformat()} tarihli {record.source_name} özetinden alındı."
        )

        cycle_phase_percent = None if record.phase is None else record.phase * 100.0
        return RtswFiveDayQueryResult(
            query_date=target_day.isoformat(),
            mode="observed",
            metric_key=self.metric_key,
            display_name=self.display_name,
            unit=self.unit,
            value_label=self.value_label,
            representative_value=record.representative_value,
            level_label=self.level_for_value(record.representative_value),
            summary_text=self.summary_for_value(record.representative_value),
            expected_low=record.expected_low,
            expected_high=record.expected_high,
            dataset_last_date=self.dataset_last_day.isoformat(),
            source_file=str(self.data_path),
            cycle=record.cycle,
            cycle_phase_percent=cycle_phase_percent,
            cycle_phase_label=None if cycle_phase_percent is None else self.phase_label_for_percent(cycle_phase_percent),
            confidence_label="Kesin",
            confidence_percent=100,
            training_cycles=list(TRAIN_CYCLES),
            notes=notes,
            actual_record=record,
            exact_match=exact_match,
            analog_cycles=[],
        )

    def _forecast_result(self, target_day: date) -> RtswFiveDayQueryResult:
        target_cycle = get_cycle_for_date(target_day, self.cycle_ends)
        if target_cycle != 25:
            raise ValueError(
                f"{target_day.isoformat()} tarihi desteklenen Cycle 25 tahmin penceresinin dışında kalıyor ({self.estimated_cycle25_end.isoformat()})."
            )

        target_phase = cycle_phase(target_day, CYCLE_STARTS[25], self.cycle_ends[25])
        if target_phase is None:
            raise ValueError("Cycle 25 fazı hesaplanamadı.")

        analog_cycles = [
            analog
            for analog in (
                self._estimate_for_single_cycle(target_phase, day_of_year(target_day), cycle_no)
                for cycle_no in TRAIN_CYCLES
            )
            if analog is not None
        ]
        if not analog_cycles:
            raise ValueError("Tahmin için yeterli Cycle 23-24 analog verisi bulunamadı.")

        analog_values = [item.weighted_value for item in analog_cycles]
        representative_value = mean(analog_values)
        if representative_value is None:
            raise ValueError("Tahmini temsilî değer hesaplanamadı.")

        expected_low = mean([item.expected_low for item in analog_cycles])
        expected_high = mean([item.expected_high for item in analog_cycles])
        if expected_low is None or expected_high is None:
            raise ValueError("Tahmini aralık hesaplanamadı.")

        confidence_label, confidence_percent = self.confidence_for_range(expected_low, expected_high)
        phase_percent = target_phase * 100.0
        notes = [
            f"Gelecek tarih, Cycle 25 içindeki fazına göre eşlendi ve bu yüzden gerçek kayıt yerine tahmin gösteriliyor.",
            self.forecast_training_note,
            "Dosya 5 günlük bloklar halinde olduğu için çıktı günlük/anlık değil; seçilen tarihin çevresindeki yaklaşık 5 günlük dönemin temsilî değeridir.",
        ]

        return RtswFiveDayQueryResult(
            query_date=target_day.isoformat(),
            mode="forecast",
            metric_key=self.metric_key,
            display_name=self.display_name,
            unit=self.unit,
            value_label=self.value_label,
            representative_value=representative_value,
            level_label=self.level_for_value(representative_value),
            summary_text=self.summary_for_value(representative_value),
            expected_low=expected_low,
            expected_high=expected_high,
            dataset_last_date=self.dataset_last_day.isoformat(),
            source_file=str(self.data_path),
            cycle=25,
            cycle_phase_percent=phase_percent,
            cycle_phase_label=self.phase_label_for_percent(phase_percent),
            confidence_label=confidence_label,
            confidence_percent=confidence_percent,
            training_cycles=list(TRAIN_CYCLES),
            notes=notes,
            actual_record=None,
            exact_match=False,
            analog_cycles=analog_cycles,
        )

    def nearest_record(self, target_day: date) -> RtswFiveDayRecord | None:
        if not self.records:
            return None
        return min(self.records, key=lambda item: abs((item.day - target_day).days))

    def query(self, target: date | datetime | str) -> RtswFiveDayQueryResult:
        target_day = parse_date_input(target)
        if target_day < self.dataset_first_day:
            raise ValueError(
                f"Veri dosyası {self.dataset_first_day.isoformat()} tarihinden başlıyor."
            )

        if target_day in self.records_by_day:
            return self._actual_result(target_day, self.records_by_day[target_day], exact_match=True)

        if target_day <= self.dataset_last_day:
            record = self.nearest_record(target_day)
            if record is None:
                raise ValueError("Sorgulanan tarih için uygun bir RTSW kaydı bulunamadı.")
            return self._actual_result(target_day, record, exact_match=False)

        return self._forecast_result(target_day)
