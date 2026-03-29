from __future__ import annotations

import argparse
import json
import math
import random
from dataclasses import dataclass, asdict
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Any


UTC = timezone.utc
FEATURE_NAMES = (
    "kp",
    "kp_estimated",
    "solar_wind_speed_km_s",
    "proton_density_p_cm3",
    "bz_nt",
    "bt_nt",
)
FEATURE_DEFAULTS = {
    "kp": 2.0,
    "kp_estimated": 2.0,
    "solar_wind_speed_km_s": 420.0,
    "proton_density_p_cm3": 5.0,
    "bz_nt": 0.0,
    "bt_nt": 5.0,
}


def _safe_float(value: Any) -> float | None:
    try:
        if value in (None, "", "null"):
            return None
        return float(value)
    except (TypeError, ValueError):
        return None


def _parse_timestamp(value: Any) -> datetime | None:
    if value in (None, ""):
        return None

    text = str(value).strip()
    if not text:
        return None
    if " " in text and "T" not in text:
        text = text.replace(" ", "T")
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"

    try:
        parsed = datetime.fromisoformat(text)
    except ValueError:
        return None

    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=UTC)
    return parsed.astimezone(UTC)


def _isoformat_z(value: datetime) -> str:
    return value.astimezone(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def _sigmoid(value: float) -> float:
    if value >= 0:
        exp_value = math.exp(-value)
        return 1.0 / (1.0 + exp_value)
    exp_value = math.exp(value)
    return exp_value / (1.0 + exp_value)


def _clamp(value: float, minimum: float, maximum: float) -> float:
    return max(minimum, min(maximum, value))


def _mean(values: list[float]) -> float:
    if not values:
        return 0.0
    return sum(values) / float(len(values))


def _std(values: list[float], mean_value: float) -> float:
    if not values:
        return 1.0
    variance = sum((value - mean_value) ** 2 for value in values) / float(len(values))
    return math.sqrt(max(variance, 1e-9))


def _estimate_solar_flux_from_ssn(ssn: float | None) -> float | None:
    if ssn is None:
        return None
    ssn = max(0.0, float(ssn))
    # Empirical proxy used elsewhere in the panel so archive-derived features stay aligned.
    return 63.7 + (0.728 * ssn) + (0.00089 * ssn * ssn)


@dataclass
class KpLstmForecast:
    predicted_kp: float
    target_time: str
    horizon_minutes: int
    confidence_percent: int
    current_reference_kp: float | None
    delta_from_reference: float | None
    trend: str
    training_samples: int
    training_window_points: int
    train_rmse: float
    live_training_samples: int = 0
    archive_training_samples: int = 0
    source: str = "pure_python_lstm"

    def to_dict(self) -> dict[str, Any]:
        payload = asdict(self)
        payload["predicted_kp"] = round(self.predicted_kp, 2)
        payload["train_rmse"] = round(self.train_rmse, 3)
        if self.current_reference_kp is not None:
            payload["current_reference_kp"] = round(self.current_reference_kp, 2)
        if self.delta_from_reference is not None:
            payload["delta_from_reference"] = round(self.delta_from_reference, 2)
        return payload


class PurePythonLstmRegressor:
    def __init__(
        self,
        input_size: int,
        hidden_size: int,
        learning_rate: float,
        gradient_clip: float,
        seed: int,
    ) -> None:
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.learning_rate = learning_rate
        self.gradient_clip = gradient_clip
        self.random = random.Random(seed)

        self.input_means = [0.0] * input_size
        self.input_stds = [1.0] * input_size
        self.target_mean = 0.0
        self.target_std = 1.0

        self.W_f = self._init_matrix(forget_bias=0.8)
        self.W_i = self._init_matrix()
        self.W_o = self._init_matrix()
        self.W_g = self._init_matrix()
        self.b_f = [0.8] * hidden_size
        self.b_i = [0.0] * hidden_size
        self.b_o = [0.0] * hidden_size
        self.b_g = [0.0] * hidden_size

        scale = 1.0 / math.sqrt(float(hidden_size or 1))
        self.W_y = [self.random.uniform(-scale, scale) for _ in range(hidden_size)]
        self.b_y = 0.0

    def _init_matrix(self, forget_bias: float = 0.0) -> list[list[float]]:
        scale = 1.0 / math.sqrt(float(self.input_size + self.hidden_size or 1))
        matrix: list[list[float]] = []
        for _ in range(self.hidden_size):
            row = [
                self.random.uniform(-scale, scale)
                for _ in range(self.input_size + self.hidden_size)
            ]
            matrix.append(row)
        return matrix

    def _normalize_sequences(self, sequences: list[list[list[float]]], targets: list[float]) -> tuple[list[list[list[float]]], list[float]]:
        flattened = [[] for _ in range(self.input_size)]
        for sequence in sequences:
            for step in sequence:
                for index, value in enumerate(step):
                    flattened[index].append(value)

        self.input_means = [_mean(values) for values in flattened]
        self.input_stds = [max(0.05, _std(values, self.input_means[index])) for index, values in enumerate(flattened)]
        self.target_mean = _mean(targets)
        self.target_std = max(0.1, _std(targets, self.target_mean))

        normalized_sequences = [self.normalize_sequence(sequence) for sequence in sequences]
        normalized_targets = [(target - self.target_mean) / self.target_std for target in targets]
        return normalized_sequences, normalized_targets

    def normalize_sequence(self, sequence: list[list[float]]) -> list[list[float]]:
        normalized: list[list[float]] = []
        for step in sequence:
            normalized.append(
                [
                    (value - self.input_means[index]) / self.input_stds[index]
                    for index, value in enumerate(step)
                ]
            )
        return normalized

    def _forward(self, sequence: list[list[float]]) -> tuple[float, list[dict[str, Any]], list[float]]:
        h_prev = [0.0] * self.hidden_size
        c_prev = [0.0] * self.hidden_size
        caches: list[dict[str, Any]] = []

        for step in sequence:
            concat = step + h_prev
            z_f = [self.b_f[index] + sum(weight * concat[col] for col, weight in enumerate(self.W_f[index])) for index in range(self.hidden_size)]
            z_i = [self.b_i[index] + sum(weight * concat[col] for col, weight in enumerate(self.W_i[index])) for index in range(self.hidden_size)]
            z_o = [self.b_o[index] + sum(weight * concat[col] for col, weight in enumerate(self.W_o[index])) for index in range(self.hidden_size)]
            z_g = [self.b_g[index] + sum(weight * concat[col] for col, weight in enumerate(self.W_g[index])) for index in range(self.hidden_size)]

            f_gate = [_sigmoid(value) for value in z_f]
            i_gate = [_sigmoid(value) for value in z_i]
            o_gate = [_sigmoid(value) for value in z_o]
            g_gate = [math.tanh(value) for value in z_g]

            c_state = [
                (f_gate[index] * c_prev[index]) + (i_gate[index] * g_gate[index])
                for index in range(self.hidden_size)
            ]
            tanh_c = [math.tanh(value) for value in c_state]
            h_state = [o_gate[index] * tanh_c[index] for index in range(self.hidden_size)]

            caches.append(
                {
                    "concat": concat,
                    "f": f_gate,
                    "i": i_gate,
                    "o": o_gate,
                    "g": g_gate,
                    "c_prev": c_prev,
                    "c": c_state,
                    "tanh_c": tanh_c,
                    "h": h_state,
                }
            )
            h_prev = h_state
            c_prev = c_state

        prediction = self.b_y + sum(weight * value for weight, value in zip(self.W_y, h_prev))
        return prediction, caches, h_prev

    def _clip_matrix(self, matrix: list[list[float]]) -> None:
        for row in matrix:
            for index, value in enumerate(row):
                row[index] = _clamp(value, -self.gradient_clip, self.gradient_clip)

    def _clip_vector(self, values: list[float]) -> None:
        for index, value in enumerate(values):
            values[index] = _clamp(value, -self.gradient_clip, self.gradient_clip)

    def _apply_gradients(
        self,
        grad_W_f: list[list[float]],
        grad_W_i: list[list[float]],
        grad_W_o: list[list[float]],
        grad_W_g: list[list[float]],
        grad_b_f: list[float],
        grad_b_i: list[float],
        grad_b_o: list[float],
        grad_b_g: list[float],
        grad_W_y: list[float],
        grad_b_y: float,
    ) -> None:
        self._clip_matrix(grad_W_f)
        self._clip_matrix(grad_W_i)
        self._clip_matrix(grad_W_o)
        self._clip_matrix(grad_W_g)
        self._clip_vector(grad_b_f)
        self._clip_vector(grad_b_i)
        self._clip_vector(grad_b_o)
        self._clip_vector(grad_b_g)
        self._clip_vector(grad_W_y)
        grad_b_y = _clamp(grad_b_y, -self.gradient_clip, self.gradient_clip)

        for row_index in range(self.hidden_size):
            for col_index in range(self.input_size + self.hidden_size):
                self.W_f[row_index][col_index] -= self.learning_rate * grad_W_f[row_index][col_index]
                self.W_i[row_index][col_index] -= self.learning_rate * grad_W_i[row_index][col_index]
                self.W_o[row_index][col_index] -= self.learning_rate * grad_W_o[row_index][col_index]
                self.W_g[row_index][col_index] -= self.learning_rate * grad_W_g[row_index][col_index]
            self.b_f[row_index] -= self.learning_rate * grad_b_f[row_index]
            self.b_i[row_index] -= self.learning_rate * grad_b_i[row_index]
            self.b_o[row_index] -= self.learning_rate * grad_b_o[row_index]
            self.b_g[row_index] -= self.learning_rate * grad_b_g[row_index]
            self.W_y[row_index] -= self.learning_rate * grad_W_y[row_index]

        self.b_y -= self.learning_rate * grad_b_y

    def fit(self, sequences: list[list[list[float]]], targets: list[float], epochs: int) -> float:
        normalized_sequences, normalized_targets = self._normalize_sequences(sequences, targets)
        order = list(range(len(normalized_sequences)))

        for _ in range(max(1, epochs)):
            self.random.shuffle(order)
            for sample_index in order:
                sequence = normalized_sequences[sample_index]
                target = normalized_targets[sample_index]
                prediction, caches, h_final = self._forward(sequence)
                d_y = prediction - target

                grad_W_f = [[0.0] * (self.input_size + self.hidden_size) for _ in range(self.hidden_size)]
                grad_W_i = [[0.0] * (self.input_size + self.hidden_size) for _ in range(self.hidden_size)]
                grad_W_o = [[0.0] * (self.input_size + self.hidden_size) for _ in range(self.hidden_size)]
                grad_W_g = [[0.0] * (self.input_size + self.hidden_size) for _ in range(self.hidden_size)]
                grad_b_f = [0.0] * self.hidden_size
                grad_b_i = [0.0] * self.hidden_size
                grad_b_o = [0.0] * self.hidden_size
                grad_b_g = [0.0] * self.hidden_size
                grad_W_y = [d_y * value for value in h_final]
                grad_b_y = d_y

                dh_next = [d_y * weight for weight in self.W_y]
                dc_next = [0.0] * self.hidden_size

                for cache in reversed(caches):
                    concat = cache["concat"]
                    f_gate = cache["f"]
                    i_gate = cache["i"]
                    o_gate = cache["o"]
                    g_gate = cache["g"]
                    c_prev = cache["c_prev"]
                    tanh_c = cache["tanh_c"]

                    d_o = [dh_next[index] * tanh_c[index] for index in range(self.hidden_size)]
                    dzo = [d_o[index] * o_gate[index] * (1.0 - o_gate[index]) for index in range(self.hidden_size)]

                    dc_total = [
                        (dh_next[index] * o_gate[index] * (1.0 - tanh_c[index] ** 2)) + dc_next[index]
                        for index in range(self.hidden_size)
                    ]
                    d_f = [dc_total[index] * c_prev[index] for index in range(self.hidden_size)]
                    dzf = [d_f[index] * f_gate[index] * (1.0 - f_gate[index]) for index in range(self.hidden_size)]
                    d_i = [dc_total[index] * g_gate[index] for index in range(self.hidden_size)]
                    dzi = [d_i[index] * i_gate[index] * (1.0 - i_gate[index]) for index in range(self.hidden_size)]
                    d_g = [dc_total[index] * i_gate[index] for index in range(self.hidden_size)]
                    dzg = [d_g[index] * (1.0 - (g_gate[index] ** 2)) for index in range(self.hidden_size)]

                    d_concat = [0.0] * (self.input_size + self.hidden_size)
                    for hidden_index in range(self.hidden_size):
                        for col_index, concat_value in enumerate(concat):
                            grad_W_f[hidden_index][col_index] += dzf[hidden_index] * concat_value
                            grad_W_i[hidden_index][col_index] += dzi[hidden_index] * concat_value
                            grad_W_o[hidden_index][col_index] += dzo[hidden_index] * concat_value
                            grad_W_g[hidden_index][col_index] += dzg[hidden_index] * concat_value

                            d_concat[col_index] += (
                                (self.W_f[hidden_index][col_index] * dzf[hidden_index])
                                + (self.W_i[hidden_index][col_index] * dzi[hidden_index])
                                + (self.W_o[hidden_index][col_index] * dzo[hidden_index])
                                + (self.W_g[hidden_index][col_index] * dzg[hidden_index])
                            )

                        grad_b_f[hidden_index] += dzf[hidden_index]
                        grad_b_i[hidden_index] += dzi[hidden_index]
                        grad_b_o[hidden_index] += dzo[hidden_index]
                        grad_b_g[hidden_index] += dzg[hidden_index]

                    dh_next = d_concat[self.input_size:]
                    dc_next = [dc_total[index] * f_gate[index] for index in range(self.hidden_size)]

                self._apply_gradients(
                    grad_W_f,
                    grad_W_i,
                    grad_W_o,
                    grad_W_g,
                    grad_b_f,
                    grad_b_i,
                    grad_b_o,
                    grad_b_g,
                    grad_W_y,
                    grad_b_y,
                )

        train_predictions = [self.predict(sequence) for sequence in sequences]
        mse = _mean([(prediction - target) ** 2 for prediction, target in zip(train_predictions, targets)])
        return math.sqrt(max(0.0, mse))

    def predict(self, sequence: list[list[float]]) -> float:
        normalized_sequence = self.normalize_sequence(sequence)
        prediction, _, _ = self._forward(normalized_sequence)
        denormalized = (prediction * self.target_std) + self.target_mean
        return _clamp(denormalized, 0.0, 9.0)


class KpLstmForecaster:
    def __init__(self, config: dict[str, Any] | None = None) -> None:
        config = config or {}
        self.enabled = config.get("enabled", True)
        self.lookback_points = max(6, int(config.get("lookback_points", 18)))
        self.forecast_horizon_minutes = max(30, int(config.get("forecast_horizon_minutes", 180)))
        self.training_history_limit = max(self.lookback_points + 6, int(config.get("training_history_limit", 720)))
        self.max_training_samples = max(16, int(config.get("max_training_samples", 160)))
        self.min_training_samples = max(12, int(config.get("min_training_samples", 24)))
        self.hidden_size = max(4, int(config.get("hidden_size", 6)))
        self.epochs = max(4, int(config.get("epochs", 12)))
        self.learning_rate = float(config.get("learning_rate", 0.015))
        self.gradient_clip = float(config.get("gradient_clip", 1.5))
        self.random_seed = int(config.get("random_seed", 42))
        self.archive_enabled = bool(config.get("archive_enabled", True))
        self.archive_training_days = max(90, int(config.get("archive_training_days", 365 * 6)))
        self.archive_sample_ratio = _clamp(float(config.get("archive_sample_ratio", 0.45)), 0.0, 0.8)
        archive_data_file = config.get("archive_data_file")
        self.archive_data_file = (
            Path(archive_data_file)
            if archive_data_file
            else Path(__file__).with_name(GFZ_DAILY_DATA_FILENAME)
        )
        self._archive_records_cache: list[KpDailyRecord] | None = None

    def _extract_point(self, record: dict[str, Any], carry: dict[str, float]) -> dict[str, Any] | None:
        evaluation = record.get("evaluation", {})
        noaa = evaluation.get("noaa", {})
        timestamp = (
            _parse_timestamp(record.get("generated_at"))
            or _parse_timestamp(noaa.get("observed_at"))
            or _parse_timestamp(noaa.get("estimated_kp_at"))
        )
        if timestamp is None:
            return None

        features: list[float] = []
        for name in FEATURE_NAMES:
            raw_value = _safe_float(noaa.get(name))
            if raw_value is None:
                raw_value = carry.get(name, FEATURE_DEFAULTS[name])
            else:
                carry[name] = raw_value
            features.append(raw_value)

        current_kp = _safe_float(noaa.get("kp"))
        if current_kp is not None:
            carry["kp"] = current_kp
            features[0] = current_kp

        kp_estimated = _safe_float(noaa.get("kp_estimated"))
        if kp_estimated is not None:
            carry["kp_estimated"] = kp_estimated
            features[1] = kp_estimated

        return {
            "time": timestamp,
            "features": features,
            "target_kp": current_kp,
            "reference_kp": kp_estimated if kp_estimated is not None else current_kp,
        }

    def _prepare_points(self, history: list[dict[str, Any]], current_record: dict[str, Any]) -> list[dict[str, Any]]:
        carry = dict(FEATURE_DEFAULTS)
        points: list[dict[str, Any]] = []
        for record in history[-self.training_history_limit:]:
            point = self._extract_point(record, carry)
            if point is not None:
                points.append(point)

        current_point = self._extract_point(current_record, carry)
        if current_point is not None:
            points.append(current_point)
        return points

    def _load_archive_records(self) -> list[KpDailyRecord]:
        if self._archive_records_cache is not None:
            return self._archive_records_cache
        if not self.archive_enabled or not self.archive_data_file.exists():
            self._archive_records_cache = []
            return self._archive_records_cache

        try:
            self._archive_records_cache = KpDailyCycleForecaster(data_file=self.archive_data_file).records
        except Exception:
            self._archive_records_cache = []
        return self._archive_records_cache

    def _archive_feature_vector(
        self,
        record: KpDailyRecord,
        slot_kp: float,
        previous_kp: float | None,
    ) -> list[float]:
        ap_daily = float(record.ap_daily) if record.ap_daily is not None else max(6.0, record.daily_mean_kp * 8.0)
        solar_flux = (
            record.f107_adjusted
            if record.f107_adjusted is not None
            else record.f107_observed
        )
        if solar_flux is None:
            ssn_value = float(record.sunspot_number) if record.sunspot_number is not None else max(0.0, record.daily_mean_kp * 12.0)
            solar_flux = _estimate_solar_flux_from_ssn(ssn_value)
        solar_flux = max(70.0, float(solar_flux))
        kp_reference = previous_kp if previous_kp is not None else record.daily_mean_kp
        kp_estimated = _clamp((slot_kp * 0.58) + (kp_reference * 0.27) + (record.daily_mean_kp * 0.15), 0.0, 9.0)
        speed = _clamp(305.0 + (slot_kp * 24.0) + (ap_daily * 1.7) + (max(0.0, solar_flux - 70.0) * 0.34), 280.0, 920.0)
        density = _clamp(2.0 + (slot_kp * 0.45) + (ap_daily * 0.11) + (max(0.0, solar_flux - 70.0) * 0.02), 0.4, 60.0)
        southward_drive = (slot_kp * 1.35) + (ap_daily * 0.06) + (max(0.0, solar_flux - 80.0) * 0.018)
        bz = -_clamp(southward_drive, 0.6, 22.0)
        bt = _clamp(3.4 + (slot_kp * 0.85) + (ap_daily * 0.045) + (max(0.0, solar_flux - 70.0) * 0.018), 2.5, 30.0)
        return [slot_kp, kp_estimated, speed, density, bz, bt]

    def _prepare_archive_points(self, cutoff_time: datetime | None) -> list[dict[str, Any]]:
        if not self.archive_enabled or self.forecast_horizon_minutes < 180:
            return []

        records = self._load_archive_records()
        if not records:
            return []

        archive_end = cutoff_time.astimezone(UTC) if cutoff_time is not None else datetime.now(tz=UTC)
        archive_start_day = archive_end.date() - timedelta(days=self.archive_training_days)
        points: list[dict[str, Any]] = []
        previous_kp: float | None = None

        for record in records:
            if record.day < archive_start_day:
                continue
            if record.day > archive_end.date():
                break

            for slot_index, slot_kp in enumerate(record.kp_values, start=1):
                point_time = datetime(
                    record.day.year,
                    record.day.month,
                    record.day.day,
                    tzinfo=UTC,
                ) + timedelta(hours=slot_index * 3)
                if point_time >= archive_end:
                    break
                points.append(
                    {
                        "time": point_time,
                        "features": self._archive_feature_vector(record, slot_kp, previous_kp),
                        "target_kp": slot_kp,
                        "reference_kp": previous_kp if previous_kp is not None else slot_kp,
                    }
                )
                previous_kp = slot_kp

        return points

    def _build_training_samples(self, points: list[dict[str, Any]]) -> tuple[list[list[list[float]]], list[float]]:
        sequences: list[list[list[float]]] = []
        targets: list[float] = []

        if len(points) <= self.lookback_points:
            return sequences, targets

        future_index = self.lookback_points
        for index in range(self.lookback_points - 1, len(points) - 1):
            forecast_from = points[index]["time"]
            target_after = forecast_from + timedelta(minutes=self.forecast_horizon_minutes)
            search_index = max(index + 1, future_index)
            while search_index < len(points) and points[search_index]["time"] < target_after:
                search_index += 1

            target_value: float | None = None
            while search_index < len(points):
                target_value = points[search_index]["target_kp"]
                if target_value is not None:
                    break
                search_index += 1
            future_index = search_index

            if target_value is None:
                continue

            start_index = index - self.lookback_points + 1
            sequence = [points[step_index]["features"] for step_index in range(start_index, index + 1)]
            sequences.append(sequence)
            targets.append(target_value)

        return sequences, targets

    @staticmethod
    def _take_recent_samples(
        sequences: list[list[list[float]]],
        targets: list[float],
        limit: int,
    ) -> tuple[list[list[list[float]]], list[float]]:
        if limit <= 0 or not sequences:
            return [], []
        if len(sequences) <= limit:
            return sequences, targets
        return sequences[-limit:], targets[-limit:]

    @staticmethod
    def _take_blended_archive_samples(
        sequences: list[list[list[float]]],
        targets: list[float],
        limit: int,
    ) -> tuple[list[list[list[float]]], list[float]]:
        if limit <= 0 or not sequences:
            return [], []
        if len(sequences) <= limit:
            return sequences, targets

        recent_count = min(limit, max(1, int(round(limit * 0.35))))
        older_count = limit - recent_count
        older_span = len(sequences) - recent_count
        indices: list[int] = []
        if older_count > 0 and older_span > 0:
            if older_count == 1:
                indices.append(max(0, older_span - 1))
            else:
                step = max(1.0, (older_span - 1) / float(older_count - 1))
                for item_index in range(older_count):
                    indices.append(int(round(item_index * step)))
        indices.extend(range(max(0, len(sequences) - recent_count), len(sequences)))
        deduped = sorted(set(index for index in indices if 0 <= index < len(sequences)))
        return [sequences[index] for index in deduped], [targets[index] for index in deduped]

    def _merge_training_sets(
        self,
        live_sequences: list[list[list[float]]],
        live_targets: list[float],
        archive_sequences: list[list[list[float]]],
        archive_targets: list[float],
    ) -> tuple[list[list[list[float]]], list[float], int, int]:
        if not archive_sequences:
            selected_live_sequences, selected_live_targets = self._take_recent_samples(
                live_sequences,
                live_targets,
                self.max_training_samples,
            )
            return selected_live_sequences, selected_live_targets, len(selected_live_sequences), 0
        if not live_sequences:
            selected_archive_sequences, selected_archive_targets = self._take_blended_archive_samples(
                archive_sequences,
                archive_targets,
                self.max_training_samples,
            )
            return selected_archive_sequences, selected_archive_targets, 0, len(selected_archive_sequences)

        archive_quota = int(round(self.max_training_samples * self.archive_sample_ratio))
        archive_quota = max(1, min(self.max_training_samples - 1, archive_quota))
        live_quota = self.max_training_samples - archive_quota

        live_quota = min(live_quota, len(live_sequences))
        archive_quota = min(archive_quota, len(archive_sequences))
        spare_capacity = self.max_training_samples - (live_quota + archive_quota)
        if spare_capacity > 0:
            live_remaining = len(live_sequences) - live_quota
            archive_remaining = len(archive_sequences) - archive_quota
            if live_remaining >= archive_remaining and live_remaining > 0:
                live_quota += min(spare_capacity, live_remaining)
            elif archive_remaining > 0:
                archive_quota += min(spare_capacity, archive_remaining)

        selected_live_sequences, selected_live_targets = self._take_recent_samples(
            live_sequences,
            live_targets,
            live_quota,
        )
        selected_archive_sequences, selected_archive_targets = self._take_blended_archive_samples(
            archive_sequences,
            archive_targets,
            archive_quota,
        )
        return (
            [*selected_archive_sequences, *selected_live_sequences],
            [*selected_archive_targets, *selected_live_targets],
            len(selected_live_sequences),
            len(selected_archive_sequences),
        )

    def forecast(
        self,
        history: list[dict[str, Any]],
        current_record: dict[str, Any],
        run_at: datetime,
    ) -> KpLstmForecast | None:
        if not self.enabled:
            return None

        points = self._prepare_points(history, current_record)
        if len(points) < self.lookback_points:
            return None

        training_points = points[:-1]
        live_sequences, live_targets = self._build_training_samples(training_points)
        archive_cutoff = training_points[0]["time"] if training_points else run_at
        archive_points = self._prepare_archive_points(archive_cutoff)
        archive_sequences, archive_targets = self._build_training_samples(archive_points)
        sequences, targets, live_sample_count, archive_sample_count = self._merge_training_sets(
            live_sequences,
            live_targets,
            archive_sequences,
            archive_targets,
        )
        if len(sequences) < self.min_training_samples:
            return None

        model = PurePythonLstmRegressor(
            input_size=len(FEATURE_NAMES),
            hidden_size=self.hidden_size,
            learning_rate=self.learning_rate,
            gradient_clip=self.gradient_clip,
            seed=self.random_seed,
        )
        train_rmse = model.fit(sequences, targets, epochs=self.epochs)

        current_sequence = [point["features"] for point in points[-self.lookback_points:]]
        predicted_kp = model.predict(current_sequence)
        reference_kp = points[-1]["reference_kp"]
        delta = None if reference_kp is None else predicted_kp - reference_kp
        if delta is None or abs(delta) < 0.35:
            trend = "yatay"
        elif delta > 0:
            trend = "yukselis"
        else:
            trend = "dusuk"

        sample_bonus = min(26.0, len(sequences) * 0.4)
        history_bonus = min(20.0, (len(training_points) * 0.08) + (len(archive_points) * 0.012))
        error_penalty = min(45.0, train_rmse * 12.0)
        confidence = int(round(_clamp(42.0 + sample_bonus + history_bonus - error_penalty, 18.0, 94.0)))

        return KpLstmForecast(
            predicted_kp=predicted_kp,
            target_time=_isoformat_z(run_at + timedelta(minutes=self.forecast_horizon_minutes)),
            horizon_minutes=self.forecast_horizon_minutes,
            confidence_percent=confidence,
            current_reference_kp=reference_kp,
            delta_from_reference=delta,
            trend=trend,
            training_samples=len(sequences),
            training_window_points=len(training_points) + len(archive_points),
            train_rmse=train_rmse,
            live_training_samples=live_sample_count,
            archive_training_samples=archive_sample_count,
        )


GFZ_DAILY_DATA_FILENAME = "Kp_ap_Ap_SN_F107_since_1932.txt"
SOLAR_CYCLE_STARTS = {
    21: date(1976, 3, 1),
    22: date(1986, 9, 1),
    23: date(1996, 8, 1),
    24: date(2008, 12, 1),
    25: date(2019, 12, 1),
}
ANALOG_CYCLES = (21, 22, 23, 24)


def _safe_int(value: Any) -> int | None:
    try:
        if value in (None, "", "null"):
            return None
        return int(value)
    except (TypeError, ValueError):
        return None


def _parse_date_input(value: date | datetime | str) -> date:
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    return datetime.strptime(str(value).strip(), "%Y-%m-%d").date()


def _day_of_year(value: date) -> int:
    return value.timetuple().tm_yday


def _circular_day_distance(left: int, right: int) -> int:
    delta = abs(int(left) - int(right))
    return min(delta, 366 - delta)


def _weighted_mean(values: list[float], weights: list[float]) -> float:
    if not values or not weights:
        return 0.0
    total_weight = sum(weights)
    if total_weight <= 0:
        return _mean(values)
    return sum(value * weight for value, weight in zip(values, weights)) / total_weight


def _weighted_std(values: list[float], weights: list[float], mean_value: float) -> float:
    if not values or not weights:
        return 0.0
    total_weight = sum(weights)
    if total_weight <= 0:
        return _std(values, mean_value)
    variance = sum(weight * ((value - mean_value) ** 2) for value, weight in zip(values, weights)) / total_weight
    return math.sqrt(max(variance, 0.0))


def _risk_level_from_kp(kp_value: float) -> str:
    if kp_value >= 9:
        return "G5 aşırı fırtına"
    if kp_value >= 8:
        return "G4 şiddetli fırtına"
    if kp_value >= 7:
        return "G3 güçlü fırtına"
    if kp_value >= 6:
        return "G2 orta fırtına"
    if kp_value >= 5:
        return "G1 küçük fırtına"
    if kp_value >= 4:
        return "Yükselmiş / aktif"
    return "Düşük / sakin"


@dataclass
class KpDailyRecord:
    day: date
    daily_max_kp: float
    daily_mean_kp: float
    kp_values: tuple[float, ...]
    ap_daily: int | None
    sunspot_number: int | None
    f107_observed: float | None
    f107_adjusted: float | None
    definitive_flag: int | None
    cycle: int | None = None
    cycle_day_index: int | None = None
    cycle_length_days: int | None = None
    cycle_phase: float | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "date": self.day.isoformat(),
            "daily_max_kp": round(self.daily_max_kp, 2),
            "daily_mean_kp": round(self.daily_mean_kp, 2),
            "kp_values": [round(value, 3) for value in self.kp_values],
            "ap_daily": self.ap_daily,
            "sunspot_number": self.sunspot_number,
            "f107_observed": None if self.f107_observed is None else round(self.f107_observed, 1),
            "f107_adjusted": None if self.f107_adjusted is None else round(self.f107_adjusted, 1),
            "definitive_flag": self.definitive_flag,
            "cycle": self.cycle,
            "cycle_day_index": self.cycle_day_index,
            "cycle_length_days": self.cycle_length_days,
            "cycle_phase": None if self.cycle_phase is None else round(self.cycle_phase, 6),
        }


@dataclass
class KpCycleSimilarity:
    cycle: int
    analog_anchor_date: str
    weighted_kp: float
    expected_low: float
    expected_high: float
    phase_day_offset: int
    seasonal_offset_days: int
    neighbor_count: int
    neighbor_dates: list[str]

    def to_dict(self) -> dict[str, Any]:
        return {
            "cycle": self.cycle,
            "analog_anchor_date": self.analog_anchor_date,
            "weighted_kp": round(self.weighted_kp, 2),
            "expected_low": round(self.expected_low, 2),
            "expected_high": round(self.expected_high, 2),
            "phase_day_offset": self.phase_day_offset,
            "seasonal_offset_days": self.seasonal_offset_days,
            "neighbor_count": self.neighbor_count,
            "neighbor_dates": self.neighbor_dates,
        }


@dataclass
class KpDailyQueryResult:
    query_date: str
    mode: str
    daily_max_kp: float
    risk_level: str
    expected_kp_low: float
    expected_kp_high: float
    dataset_last_date: str
    source_file: str
    cycle: int | None
    cycle_phase_percent: float | None
    confidence_percent: int
    analog_cycles: list[KpCycleSimilarity]
    notes: list[str]
    actual_record: KpDailyRecord | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "query_date": self.query_date,
            "mode": self.mode,
            "daily_max_kp": round(self.daily_max_kp, 2),
            "risk_level": self.risk_level,
            "expected_kp_range": [
                round(self.expected_kp_low, 2),
                round(self.expected_kp_high, 2),
            ],
            "dataset_last_date": self.dataset_last_date,
            "source_file": self.source_file,
            "cycle": self.cycle,
            "cycle_phase_percent": None if self.cycle_phase_percent is None else round(self.cycle_phase_percent, 2),
            "confidence_percent": self.confidence_percent,
            "analog_cycles": [item.to_dict() for item in self.analog_cycles],
            "notes": self.notes,
            "actual_record": None if self.actual_record is None else self.actual_record.to_dict(),
        }


class KpDailyCycleForecaster:
    """Daily max Kp lookup with historical truth and Cycle 25 analog forecasting."""

    def __init__(
        self,
        data_file: str | Path | None = None,
        neighbors_per_cycle: int = 9,
        phase_window_days: int = 45,
        seasonal_window_days: int = 35,
    ) -> None:
        self.data_path = Path(data_file) if data_file else Path(__file__).with_name(GFZ_DAILY_DATA_FILENAME)
        self.neighbors_per_cycle = max(3, int(neighbors_per_cycle))
        self.phase_window_days = max(14, int(phase_window_days))
        self.seasonal_window_days = max(14, int(seasonal_window_days))
        self.records = self._load_records(self.data_path)
        self.records_by_day = {record.day: record for record in self.records}
        self.dataset_first_day = self.records[0].day
        self.dataset_last_day = self.records[-1].day
        self.cycle_lengths = self._build_cycle_lengths()
        self.estimated_cycle25_length = int(round(_mean([float(self.cycle_lengths[cycle]) for cycle in ANALOG_CYCLES])))
        self.estimated_cycle25_end = SOLAR_CYCLE_STARTS[25] + timedelta(days=self.estimated_cycle25_length - 1)
        self.records_by_cycle = self._index_records_by_cycle()
        self._annotate_cycles()

    def _load_records(self, path: Path) -> list[KpDailyRecord]:
        if not path.exists():
            raise FileNotFoundError(f"Daily Kp data file not found: {path}")

        records: list[KpDailyRecord] = []
        with path.open("r", encoding="utf-8", errors="replace") as handle:
            for raw_line in handle:
                line = raw_line.strip()
                if not line or line.startswith("#"):
                    continue
                parts = line.split()
                if len(parts) < 28:
                    continue

                year = _safe_int(parts[0])
                month = _safe_int(parts[1])
                day = _safe_int(parts[2])
                if year is None or month is None or day is None:
                    continue

                kp_values = tuple(
                    value
                    for value in (_safe_float(part) for part in parts[7:15])
                    if value is not None and value >= 0
                )
                if not kp_values:
                    continue

                record_day = date(year, month, day)
                daily_max_kp = max(kp_values)
                daily_mean_kp = _mean(list(kp_values))
                ap_daily = _safe_int(parts[23])
                sunspot_number = _safe_int(parts[24])
                if sunspot_number is not None and sunspot_number < 0:
                    sunspot_number = None
                f107_observed = _safe_float(parts[25])
                if f107_observed is not None and f107_observed < 0:
                    f107_observed = None
                f107_adjusted = _safe_float(parts[26])
                if f107_adjusted is not None and f107_adjusted < 0:
                    f107_adjusted = None
                definitive_flag = _safe_int(parts[27])

                records.append(
                    KpDailyRecord(
                        day=record_day,
                        daily_max_kp=daily_max_kp,
                        daily_mean_kp=daily_mean_kp,
                        kp_values=kp_values,
                        ap_daily=ap_daily,
                        sunspot_number=sunspot_number,
                        f107_observed=f107_observed,
                        f107_adjusted=f107_adjusted,
                        definitive_flag=definitive_flag,
                    )
                )

        if not records:
            raise ValueError(f"No daily Kp rows could be parsed from {path}")
        return records

    def _build_cycle_lengths(self) -> dict[int, int]:
        lengths: dict[int, int] = {}
        cycle_ids = sorted(SOLAR_CYCLE_STARTS)
        for index, cycle in enumerate(cycle_ids[:-1]):
            start_day = SOLAR_CYCLE_STARTS[cycle]
            next_start = SOLAR_CYCLE_STARTS[cycle_ids[index + 1]]
            lengths[cycle] = (next_start - start_day).days
        return lengths

    def _cycle_context_for_day(self, day_value: date) -> tuple[int | None, date | None, int | None]:
        ordered = sorted(SOLAR_CYCLE_STARTS.items(), key=lambda item: item[1])
        for index, (cycle, start_day) in enumerate(ordered):
            next_start = ordered[index + 1][1] if index + 1 < len(ordered) else None
            if day_value < start_day:
                continue
            if next_start is None:
                if day_value <= self.estimated_cycle25_end:
                    return cycle, start_day, self.estimated_cycle25_length
                return None, None, None
            if day_value < next_start:
                return cycle, start_day, (next_start - start_day).days
        return None, None, None

    def _index_records_by_cycle(self) -> dict[int, list[KpDailyRecord]]:
        by_cycle: dict[int, list[KpDailyRecord]] = {cycle: [] for cycle in ANALOG_CYCLES + (25,)}
        for record in self.records:
            cycle, _, _ = self._cycle_context_for_day(record.day)
            if cycle in by_cycle:
                by_cycle[cycle].append(record)
        return by_cycle

    def _annotate_cycles(self) -> None:
        for record in self.records:
            cycle, start_day, cycle_length = self._cycle_context_for_day(record.day)
            record.cycle = cycle
            if cycle is None or start_day is None or cycle_length is None:
                continue
            record.cycle_day_index = (record.day - start_day).days
            record.cycle_length_days = cycle_length
            if cycle_length > 1:
                record.cycle_phase = record.cycle_day_index / float(cycle_length - 1)
            else:
                record.cycle_phase = 0.0

    def _actual_result(self, target_day: date, record: KpDailyRecord) -> KpDailyQueryResult:
        note = (
            "Sorgulanan tarih veri dosyasının kapsadığı aralıkta olduğu için gerçek günlük maksimum Kp gösteriliyor."
        )
        if record.definitive_flag == 0:
            note += " Bu satır GFZ dosyasında ön değer olarak işaretlenmiş."
        elif record.definitive_flag == 1:
            note += " Kp değeri kesinleşmiş olsa da güneş lekesi sayısı GFZ dosyasında hâlâ ön durumda."
        else:
            note += " Bu satır GFZ dosyasında kesinleşmiş kayıt olarak yer alıyor."

        return KpDailyQueryResult(
            query_date=target_day.isoformat(),
            mode="observed",
            daily_max_kp=record.daily_max_kp,
            risk_level=_risk_level_from_kp(record.daily_max_kp),
            expected_kp_low=record.daily_max_kp,
            expected_kp_high=record.daily_max_kp,
            dataset_last_date=self.dataset_last_day.isoformat(),
            source_file=str(self.data_path),
            cycle=record.cycle,
            cycle_phase_percent=None if record.cycle_phase is None else record.cycle_phase * 100.0,
            confidence_percent=100,
            analog_cycles=[],
            notes=[note],
            actual_record=record,
        )

    def _build_cycle_similarity(self, cycle: int, target_day: date, target_phase_day: int, target_phase_fraction: float) -> KpCycleSimilarity | None:
        cycle_records = self.records_by_cycle.get(cycle, [])
        if not cycle_records:
            return None

        target_doy = _day_of_year(target_day)
        candidates: list[tuple[float, KpDailyRecord, int, int]] = []
        for record in cycle_records:
            if record.cycle_day_index is None:
                continue
            phase_distance = abs(record.cycle_day_index - target_phase_day)
            seasonal_distance = _circular_day_distance(_day_of_year(record.day), target_doy)
            score = (phase_distance / float(self.phase_window_days)) + (seasonal_distance / float(self.seasonal_window_days))
            candidates.append((score, record, phase_distance, seasonal_distance))

        candidates.sort(key=lambda item: (item[0], item[1].day))
        selected = candidates[: self.neighbors_per_cycle]
        if not selected:
            return None

        values = [item[1].daily_max_kp for item in selected]
        weights = [1.0 / (0.2 + item[0]) for item in selected]
        weighted_kp = _weighted_mean(values, weights)
        weighted_spread = _weighted_std(values, weights, weighted_kp)
        range_margin = max(0.35, weighted_spread * 0.9)
        best_score, best_record, phase_distance, seasonal_distance = selected[0]
        _ = best_score
        return KpCycleSimilarity(
            cycle=cycle,
            analog_anchor_date=best_record.day.isoformat(),
            weighted_kp=weighted_kp,
            expected_low=_clamp(weighted_kp - range_margin, 0.0, 9.0),
            expected_high=_clamp(weighted_kp + range_margin, 0.0, 9.0),
            phase_day_offset=phase_distance,
            seasonal_offset_days=seasonal_distance,
            neighbor_count=len(selected),
            neighbor_dates=[item[1].day.isoformat() for item in selected],
        )

    def _forecast_result(self, target_day: date) -> KpDailyQueryResult:
        cycle, start_day, cycle_length = self._cycle_context_for_day(target_day)
        if cycle != 25 or start_day is None or cycle_length is None:
            raise ValueError(
                f"{target_day.isoformat()} tarihi, {self.estimated_cycle25_end.isoformat()} tarihinde biten desteklenen Cycle 25 tahmin penceresinin dışında kalıyor."
            )

        target_phase_day = (target_day - start_day).days
        target_phase_fraction = 0.0 if cycle_length <= 1 else target_phase_day / float(cycle_length - 1)
        similarities = [
            similarity
            for similarity in (
                self._build_cycle_similarity(cycle_id, target_day, int(round(target_phase_fraction * (self.cycle_lengths[cycle_id] - 1))), target_phase_fraction)
                for cycle_id in ANALOG_CYCLES
            )
            if similarity is not None
        ]
        if not similarities:
            raise ValueError("İstenen gelecek tarih için uygun analog cycle kümeleri oluşturulamadı.")

        cycle_means = [item.weighted_kp for item in similarities]
        predicted_kp = _mean(cycle_means)
        low = min(item.expected_low for item in similarities)
        high = max(item.expected_high for item in similarities)
        spread = _std(cycle_means, predicted_kp)
        confidence = int(round(_clamp(88.0 - (spread * 12.0), 46.0, 84.0)))

        notes = [
            "Gelecek tarih, gerçek veri aralığının ötesinde kaldığı için cevap gözlem yerine analog tahmin olarak gösteriliyor.",
            "Hedef tarih önce Cycle 25 içindeki fazına eşleniyor, ardından Cycle 21-24 içinden benzer faz ve mevsim günleri kullanılıyor.",
            "Her cycle analogu, yıl içindeki benzer mevsim konumu ve benzer cycle fazı taşıyan yakın günlerden seçiliyor.",
        ]

        return KpDailyQueryResult(
            query_date=target_day.isoformat(),
            mode="forecast",
            daily_max_kp=predicted_kp,
            risk_level=_risk_level_from_kp(predicted_kp),
            expected_kp_low=low,
            expected_kp_high=high,
            dataset_last_date=self.dataset_last_day.isoformat(),
            source_file=str(self.data_path),
            cycle=25,
            cycle_phase_percent=target_phase_fraction * 100.0,
            confidence_percent=confidence,
            analog_cycles=similarities,
            notes=notes,
            actual_record=None,
        )

    def query(self, target: date | datetime | str) -> KpDailyQueryResult:
        target_day = _parse_date_input(target)
        if target_day < self.dataset_first_day:
            raise ValueError(
                f"{target_day.isoformat()} tarihi, dosyadaki ilk günden ({self.dataset_first_day.isoformat()}) daha eski."
            )

        actual = self.records_by_day.get(target_day)
        if actual is not None:
            return self._actual_result(target_day, actual)

        if target_day <= self.dataset_last_day:
            raise ValueError(
                f"{target_day.isoformat()} falls inside the historical span but no row was found in the file."
            )

        return self._forecast_result(target_day)


def forecast_daily_kp_by_date(
    target: date | datetime | str,
    data_file: str | Path | None = None,
) -> dict[str, Any]:
    """Convenience helper for direct date-based daily max Kp lookup/forecast."""

    forecaster = KpDailyCycleForecaster(data_file=data_file)
    return forecaster.query(target).to_dict()


def _format_human_result(result: KpDailyQueryResult) -> str:
    lines = [
        f"Date: {result.query_date}",
        f"Mode: {result.mode}",
        f"Daily max Kp: {result.daily_max_kp:.2f}",
        f"Risk level: {result.risk_level}",
        f"Expected Kp range: {result.expected_kp_low:.2f} - {result.expected_kp_high:.2f}",
        f"Dataset last date: {result.dataset_last_date}",
    ]
    if result.cycle is not None:
        lines.append(f"Cycle: {result.cycle}")
    if result.cycle_phase_percent is not None:
        lines.append(f"Cycle phase: {result.cycle_phase_percent:.2f}%")
    lines.append(f"Confidence: {result.confidence_percent}%")
    lines.extend(f"Note: {note}" for note in result.notes)
    for similarity in result.analog_cycles:
        lines.append(
            "Analog cycle "
            f"{similarity.cycle}: anchor {similarity.analog_anchor_date}, "
            f"weighted Kp {similarity.weighted_kp:.2f}, range {similarity.expected_low:.2f}-{similarity.expected_high:.2f}, "
            f"phase offset {similarity.phase_day_offset} d, seasonal offset {similarity.seasonal_offset_days} d"
        )
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Query real historical daily max Kp or produce a Cycle 25 analog forecast from the GFZ daily data file."
    )
    parser.add_argument("--date", required=True, help="Target date in YYYY-MM-DD format.")
    parser.add_argument("--data-file", default=None, help="Optional path to Kp_ap_Ap_SN_F107_since_1932.txt")
    parser.add_argument("--json", action="store_true", help="Print the result as JSON.")
    args = parser.parse_args(argv)

    result = KpDailyCycleForecaster(data_file=args.data_file).query(args.date)
    if args.json:
        print(json.dumps(result.to_dict(), ensure_ascii=False, indent=2))
    else:
        print(_format_human_result(result))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
