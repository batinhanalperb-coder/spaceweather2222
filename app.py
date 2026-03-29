from __future__ import annotations

from dataclasses import dataclass
from html import escape
from typing import Any
import math

import pandas as pd
import plotly.graph_objects as go
import requests
import streamlit as st


NOAA_PLANETARY_KP_URL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"
NOAA_GOES_XRAY_URLS = [
    "https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json",
    "https://services.swpc.noaa.gov/json/goes/secondary/xrays-1-day.json",
]
REQUEST_TIMEOUT_SECONDS = 20
LIVE_CACHE_TTL_SECONDS = 300


@dataclass
class TwentyFourHourSummary:
    """Condensed operational summary derived from the latest 24-hour window."""

    max_kp_24h: float
    avg_kp_24h: float
    storm_intervals_24h: int
    trend_24h: str
    peak_xray_class_24h: str
    summary_text: str
    kp_points_used: int
    data_notice: str | None


@dataclass
class SpaceWeatherSnapshot:
    """Normalized live-or-sample data bundle used by the dashboard."""

    kp_series: pd.DataFrame
    xray_series: pd.DataFrame
    kp_current: float
    kp_max_24h: float
    storm_level: str
    trend: str
    last_update: pd.Timestamp | None
    xray_flux: float | None
    xray_class: str
    xray_risk_band: str
    source_labels: dict[str, str]
    notices: list[str]
    raw_payloads: dict[str, Any]
    excluded_fields: dict[str, list[str]]
    context_only_fields: dict[str, str]
    summary_24h: TwentyFourHourSummary


@dataclass
class SatelliteAssessment:
    """Operational heuristic output for the selected spacecraft profile."""

    orbit_type: str
    altitude_km: int
    impact_score: int
    impact_band: str
    leo_drag_risk: str
    electronics_radiation_risk: str
    communication_risk: str
    recommended_actions: list[str]
    contribution_points: dict[str, int]
    used_inputs: dict[str, str]


def inject_page_style() -> None:
    """Apply a dark scientific dashboard style."""

    st.markdown(
        """
        <style>
        :root {
            --bg: #06111d;
            --panel: rgba(10, 23, 38, 0.88);
            --panel-strong: rgba(13, 28, 46, 0.96);
            --text: #edf6ff;
            --muted: #98b6d4;
            --line: rgba(129, 167, 212, 0.18);
            --low: #36c275;
            --moderate: #f4b942;
            --high: #f97316;
            --severe: #ef4444;
            --accent: #72d4ff;
        }
        [data-testid="stAppViewContainer"] {
            background:
                radial-gradient(circle at 12% 0%, rgba(67, 123, 255, 0.18), transparent 26%),
                radial-gradient(circle at 88% 14%, rgba(59, 191, 255, 0.12), transparent 22%),
                linear-gradient(180deg, #050d18 0%, #071321 100%);
            color: var(--text);
        }
        [data-testid="stSidebar"] {
            background: linear-gradient(180deg, rgba(7, 18, 30, 0.98), rgba(6, 14, 26, 0.98));
            border-right: 1px solid var(--line);
        }
        [data-testid="stSidebar"] * {
            color: var(--text);
        }
        .block-container {
            max-width: 1400px;
            padding-top: 1.6rem;
            padding-bottom: 3rem;
        }
        .hero-panel, .panel-shell, .card-shell {
            background: linear-gradient(180deg, rgba(12, 26, 43, 0.92), rgba(8, 18, 31, 0.94));
            border: 1px solid var(--line);
            border-radius: 22px;
            box-shadow: 0 18px 42px rgba(2, 8, 18, 0.28);
        }
        .hero-panel {
            padding: 1.35rem 1.5rem;
            margin-bottom: 1rem;
        }
        .hero-kicker {
            color: #8bd9ff;
            font-size: 0.78rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 0.45rem;
        }
        .hero-title {
            font-size: 2rem;
            font-weight: 700;
            margin: 0;
            color: #f5fbff;
        }
        .hero-subtitle {
            color: var(--muted);
            margin: 0.65rem 0 0;
            line-height: 1.6;
            font-size: 1rem;
            max-width: 960px;
        }
        .metric-card {
            padding: 1rem 1.1rem;
            border-radius: 18px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, rgba(14, 29, 48, 0.92), rgba(8, 19, 32, 0.96));
            min-height: 132px;
        }
        .metric-label {
            color: var(--muted);
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            margin-bottom: 0.75rem;
        }
        .metric-value {
            font-size: 2rem;
            font-weight: 700;
            color: #f7fbff;
            margin-bottom: 0.35rem;
        }
        .metric-subtitle {
            color: var(--muted);
            font-size: 0.92rem;
            line-height: 1.5;
        }
        .section-title {
            color: #f1f7ff;
            font-size: 1.15rem;
            font-weight: 700;
            margin-bottom: 0.7rem;
        }
        .risk-card {
            padding: 1rem 1.1rem;
            border-radius: 18px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, rgba(13, 28, 45, 0.94), rgba(8, 19, 33, 0.96));
            min-height: 176px;
        }
        .risk-title {
            color: var(--muted);
            font-size: 0.8rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 0.65rem;
        }
        .risk-value {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.55rem;
        }
        .risk-copy {
            color: var(--muted);
            line-height: 1.55;
            font-size: 0.92rem;
        }
        .panel-shell {
            padding: 1rem 1.15rem 1.15rem;
            margin-top: 0.7rem;
        }
        .list-block {
            border-radius: 18px;
            border: 1px solid var(--line);
            background: rgba(9, 22, 37, 0.75);
            padding: 0.95rem 1rem;
            min-height: 100%;
        }
        .list-block h4 {
            margin: 0 0 0.7rem;
            color: #f3f8ff;
            font-size: 0.98rem;
        }
        .list-block ul {
            margin: 0;
            padding-left: 1rem;
            color: var(--muted);
            line-height: 1.65;
        }
        .source-pill {
            display: inline-block;
            padding: 0.35rem 0.7rem;
            margin-right: 0.45rem;
            margin-bottom: 0.45rem;
            border-radius: 999px;
            border: 1px solid rgba(138, 176, 219, 0.22);
            background: rgba(13, 27, 43, 0.8);
            color: #d7ebff;
            font-size: 0.8rem;
        }
        .small-note {
            color: var(--muted);
            line-height: 1.6;
            font-size: 0.94rem;
        }
        .summary-box {
            padding: 1.15rem 1.2rem 1.2rem;
            border-radius: 22px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, rgba(14, 29, 47, 0.94), rgba(8, 18, 31, 0.98));
            box-shadow: 0 18px 42px rgba(2, 8, 18, 0.24);
            margin-top: 0.35rem;
        }
        .summary-box-head {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            align-items: flex-start;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }
        .summary-box-title {
            color: #f4f9ff;
            font-size: 1.14rem;
            font-weight: 700;
            margin: 0;
        }
        .summary-box-subtitle {
            color: var(--muted);
            font-size: 0.92rem;
            margin-top: 0.35rem;
            line-height: 1.5;
        }
        .summary-chip-row {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            justify-content: flex-end;
        }
        .summary-chip {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.42rem 0.8rem;
            border-radius: 999px;
            border: 1px solid rgba(129, 167, 212, 0.22);
            background: rgba(9, 21, 35, 0.8);
            color: #e8f4ff;
            font-size: 0.8rem;
            white-space: nowrap;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0.85rem;
            margin-bottom: 1rem;
        }
        .summary-mini-card {
            border-radius: 18px;
            border: 1px solid var(--line);
            background: linear-gradient(180deg, rgba(16, 31, 50, 0.9), rgba(9, 20, 33, 0.96));
            padding: 0.95rem 1rem;
            min-height: 124px;
        }
        .summary-mini-label {
            color: var(--muted);
            font-size: 0.77rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            margin-bottom: 0.7rem;
        }
        .summary-mini-value {
            font-size: 1.7rem;
            font-weight: 700;
            margin-bottom: 0.32rem;
        }
        .summary-mini-caption {
            color: var(--muted);
            font-size: 0.9rem;
            line-height: 1.5;
        }
        .summary-box-copy {
            color: #d7e8f8;
            line-height: 1.72;
            font-size: 0.96rem;
            margin: 0;
        }
        .summary-box-footnote {
            color: var(--muted);
            line-height: 1.55;
            font-size: 0.86rem;
            margin-top: 0.7rem;
        }
        @media (max-width: 1100px) {
            .summary-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
        @media (max-width: 700px) {
            .summary-grid {
                grid-template-columns: 1fr;
            }
        }
        div[data-testid="stAlert"] {
            border-radius: 16px;
        }
        </style>
        """,
        unsafe_allow_html=True,
    )


def severity_color(label: str) -> str:
    """Map qualitative severity labels to a consistent dashboard color."""

    colors = {
        "Low": "#36c275",
        "Moderate": "#f4b942",
        "High": "#f97316",
        "Severe": "#ef4444",
        "G0": "#36c275",
        "G1": "#f4b942",
        "G2": "#f59e0b",
        "G3": "#f97316",
        "G4": "#ef4444",
        "G5": "#dc2626",
        "Rising": "#72d4ff",
        "Stable": "#cbd5e1",
        "Falling": "#a7f3d0",
    }
    return colors.get(label, "#72d4ff")


def format_timestamp(value: pd.Timestamp | None) -> str:
    """Render timestamps in a concise UTC format."""

    if value is None or pd.isna(value):
        return "Unavailable"
    ts = pd.Timestamp(value)
    if ts.tzinfo is None:
        ts = ts.tz_localize("UTC")
    else:
        ts = ts.tz_convert("UTC")
    return ts.strftime("%Y-%m-%d %H:%M UTC")


def normalize_json_table(payload: Any) -> pd.DataFrame:
    """Turn NOAA JSON payloads into a DataFrame, supporting table and object formats."""

    if isinstance(payload, list) and payload and isinstance(payload[0], list):
        headers = [str(item).strip() for item in payload[0]]
        rows = payload[1:]
        return pd.DataFrame(rows, columns=headers)
    if isinstance(payload, list) and payload and isinstance(payload[0], dict):
        return pd.DataFrame(payload)
    raise ValueError("Unexpected NOAA payload format.")


def last_rows_payload(payload: Any, limit: int = 8) -> Any:
    """Trim raw payloads before showing them to the user."""

    if isinstance(payload, list) and len(payload) > limit:
        return payload[-limit:]
    return payload


def goes_class_label(flux: float | None) -> str:
    """Convert a GOES X-ray flux value to the standard A/B/C/M/X class notation."""

    if flux is None or flux <= 0:
        return "Unavailable"
    thresholds = [
        ("A", 1e-7),
        ("B", 1e-6),
        ("C", 1e-5),
        ("M", 1e-4),
        ("X", 1e9),
    ]
    previous = 1e-8
    for label, upper in thresholds:
        if flux < upper:
            magnitude = flux / previous
            return f"{label}{magnitude:.2f}"
        previous = upper
    return "Unavailable"


def xray_risk_band(flux: float | None) -> str:
    """Collapse GOES flux into the three-level operational category used in the score."""

    if flux is None or flux <= 0:
        return "Low"
    if flux < 1e-5:
        return "Low"
    if flux < 1e-4:
        return "Moderate"
    return "High"


def storm_level_from_kp(kp_value: float) -> str:
    """Map the planetary Kp index to NOAA storm levels."""

    if kp_value < 5:
        return "G0"
    if kp_value < 6:
        return "G1"
    if kp_value < 7:
        return "G2"
    if kp_value < 8:
        return "G3"
    if kp_value < 9:
        return "G4"
    return "G5"


def geomagnetic_points_from_kp(kp_value: float) -> int:
    """Convert Kp to the heuristic geomagnetic contribution requested by the user."""

    if kp_value < 5:
        return 10
    if kp_value < 6:
        return 30
    if kp_value < 7:
        return 50
    if kp_value < 8:
        return 70
    return 85


def xray_points_from_band(band: str) -> int:
    """Convert the X-ray severity band to score points."""

    return {"Low": 0, "Moderate": 10, "High": 20}.get(band, 0)


def orbit_points(orbit_type: str) -> int:
    """Orbit-specific vulnerability term from the user specification."""

    return {"LEO": 15, "MEO": 8, "GEO": 10}.get(orbit_type, 0)


def altitude_points(altitude_km: int) -> int:
    """Altitude term from the user specification."""

    if 200 <= altitude_km <= 400:
        return 15
    if 401 <= altitude_km <= 600:
        return 10
    if 601 <= altitude_km <= 1000:
        return 5
    return 0


def impact_band(score: int) -> str:
    """Map the final impact score to a readable risk class."""

    if score <= 29:
        return "Low"
    if score <= 59:
        return "Moderate"
    if score <= 79:
        return "High"
    return "Severe"


def infer_kp_trend(kp_series: pd.DataFrame) -> str:
    """Estimate whether the recent Kp sequence is rising, stable, or falling."""

    if kp_series.empty or len(kp_series) < 4:
        return "Stable"
    recent = kp_series["kp"].tail(4).tolist()
    baseline = sum(recent[:3]) / 3
    delta = recent[-1] - baseline
    if delta > 0.6:
        return "Rising"
    if delta < -0.6:
        return "Falling"
    return "Stable"


def infer_24h_trend(kp_window: pd.DataFrame) -> str:
    """Estimate the 24-hour direction using the latest Kp window."""

    if kp_window.empty or len(kp_window) < 4:
        return "Stable"

    values = kp_window["kp"].astype(float).tail(8).tolist()
    split_index = max(2, len(values) // 2)
    early_window = values[:split_index]
    late_window = values[-split_index:]
    delta = (sum(late_window) / len(late_window)) - (sum(early_window) / len(early_window))

    if delta > 0.5:
        return "Rising"
    if delta < -0.5:
        return "Falling"
    return "Stable"


def build_24h_summary_text(summary: TwentyFourHourSummary) -> str:
    """Generate a concise scientific interpretation for the latest 24-hour window."""

    peak_xray_text = (
        f"The peak GOES X-ray level in the same interval reached {summary.peak_xray_class_24h}."
        if summary.peak_xray_class_24h != "Unavailable"
        else "Peak GOES X-ray classification was unavailable in the same interval."
    )

    if summary.storm_intervals_24h > 0:
        return (
            f"During the last 24 hours, the selected Kp window reached a maximum of {summary.max_kp_24h:.2f} "
            f"with {summary.storm_intervals_24h} storm-threshold interval(s) at Kp >= 5. "
            f"The mean Kp over the same window was {summary.avg_kp_24h:.2f}, and the short-window tendency is "
            f"{summary.trend_24h.lower()}. {peak_xray_text} This pattern supports elevated operational awareness."
        )
    if summary.max_kp_24h >= 4:
        return (
            f"The last 24 hours remained below NOAA storm threshold, but the window still reached Kp {summary.max_kp_24h:.2f} "
            f"with an average of {summary.avg_kp_24h:.2f}. The observed tendency is {summary.trend_24h.lower()}. "
            f"{peak_xray_text} Conditions suggest routine operations with increased monitoring."
        )
    return (
        f"The latest 24-hour Kp window is comparatively quiet, with a maximum of {summary.max_kp_24h:.2f} "
        f"and a mean of {summary.avg_kp_24h:.2f}. The short-window tendency is {summary.trend_24h.lower()}, "
        f"and no storm-threshold interval was detected. {peak_xray_text} The current pattern is consistent with nominal operations."
    )


def get_last_24h_kp_summary(kp_series: pd.DataFrame, xray_series: pd.DataFrame) -> TwentyFourHourSummary:
    """Derive a robust 24-hour summary from the latest Kp and GOES X-ray observations."""

    data_notice: str | None = None

    if kp_series is None or kp_series.empty:
        kp_series = build_sample_kp_series()
        data_notice = "24-hour Kp summary used sample fallback data because no valid Kp series was available."

    if xray_series is None or xray_series.empty:
        xray_series = build_sample_xray_series()
        extra_note = " GOES X-ray summary also used sample fallback data."
        data_notice = f"{data_notice or ''}{extra_note}".strip()

    kp_series = kp_series.sort_values("time").copy()
    xray_series = xray_series.sort_values("time").copy()

    latest_kp_time = kp_series["time"].max()
    kp_cutoff = latest_kp_time - pd.Timedelta(hours=24)
    kp_window = kp_series.loc[kp_series["time"] >= kp_cutoff].tail(8).copy()
    if kp_window.empty:
        kp_window = kp_series.tail(8).copy()
        data_notice = (
            "The last 24-hour Kp window was incomplete, so the summary used the latest available Kp measurements."
            if data_notice is None
            else data_notice
        )
    elif len(kp_window) < 8:
        data_notice = (
            f"Only {len(kp_window)} valid Kp measurements were available in the last 24 hours; the summary uses the available points."
            if data_notice is None
            else data_notice
        )

    latest_xray_time = xray_series["time"].max()
    xray_cutoff = latest_xray_time - pd.Timedelta(hours=24)
    xray_window = xray_series.loc[xray_series["time"] >= xray_cutoff].copy()
    if xray_window.empty:
        xray_window = xray_series.tail(144).copy()
        if data_notice is None:
            data_notice = "The 24-hour GOES X-ray window was incomplete, so the summary used the latest available X-ray samples."

    max_kp_24h = float(kp_window["kp"].max()) if not kp_window.empty else 0.0
    avg_kp_24h = float(kp_window["kp"].mean()) if not kp_window.empty else 0.0
    storm_intervals_24h = int((kp_window["kp"] >= 5).sum()) if not kp_window.empty else 0
    trend_24h = infer_24h_trend(kp_window)

    peak_xray_flux = float(xray_window["flux"].max()) if not xray_window.empty else None
    peak_xray_class_24h = goes_class_label(peak_xray_flux)

    provisional = TwentyFourHourSummary(
        max_kp_24h=max_kp_24h,
        avg_kp_24h=avg_kp_24h,
        storm_intervals_24h=storm_intervals_24h,
        trend_24h=trend_24h,
        peak_xray_class_24h=peak_xray_class_24h,
        summary_text="",
        kp_points_used=int(len(kp_window)),
        data_notice=data_notice,
    )
    provisional.summary_text = build_24h_summary_text(provisional)
    return provisional


def build_sample_kp_series() -> pd.DataFrame:
    """Create deterministic fallback Kp data so the app never collapses offline."""

    end = pd.Timestamp.now(tz="UTC").floor("3h")
    times = pd.date_range(end=end, periods=16, freq="3h")
    values = [1.7, 2.0, 2.4, 2.8, 3.1, 3.4, 4.0, 4.6, 5.2, 4.9, 4.4, 3.9, 3.4, 3.0, 2.7, 2.9]
    return pd.DataFrame({"time": times, "kp": values})


def build_sample_xray_series() -> pd.DataFrame:
    """Create deterministic fallback GOES-like X-ray data."""

    end = pd.Timestamp.now(tz="UTC").floor("10min")
    times = pd.date_range(end=end, periods=144, freq="10min")
    fluxes: list[float] = []
    for index, _ in enumerate(times):
        baseline = 2.4e-7 + (1.3e-7 * (1 + math.sin(index / 7.5)))
        pulse = 0.0
        if 88 <= index <= 98:
            pulse = (index - 87) * 7.5e-7
        if 98 < index <= 106:
            pulse = (107 - index) * 7.5e-7
        fluxes.append(max(1.0e-8, baseline + pulse))
    return pd.DataFrame(
        {
            "time": times,
            "flux": fluxes,
            "energy": "0.1-0.8nm",
            "satellite": "GOES-Sample",
        }
    )


def request_json(url: str) -> Any:
    """Perform a guarded HTTP GET and return decoded JSON."""

    response = requests.get(url, timeout=REQUEST_TIMEOUT_SECONDS)
    response.raise_for_status()
    return response.json()


def parse_kp_dataframe(payload: Any) -> tuple[pd.DataFrame, list[str]]:
    """Normalize NOAA planetary K-index payloads into a compact time series."""

    frame = normalize_json_table(payload)
    time_column = next((col for col in ["time_tag", "time", "observed_time"] if col in frame.columns), None)
    kp_column = next((col for col in ["kp_index", "kp", "planetary_k_index"] if col in frame.columns), None)
    if time_column is None or kp_column is None:
        raise ValueError("Kp payload does not contain expected columns.")

    series = frame[[time_column, kp_column]].copy()
    series.columns = ["time", "kp"]
    series["time"] = pd.to_datetime(series["time"], errors="coerce", utc=True)
    series["kp"] = pd.to_numeric(series["kp"], errors="coerce")
    series = series.dropna(subset=["time", "kp"]).sort_values("time")
    if series.empty:
        raise ValueError("Kp payload produced an empty time series.")
    excluded = [column for column in frame.columns if column not in {time_column, kp_column}]
    return series, excluded


def parse_xray_dataframe(payload: Any) -> tuple[pd.DataFrame, list[str]]:
    """Normalize NOAA GOES X-ray data to the long-band operational series."""

    frame = normalize_json_table(payload)
    time_column = next((col for col in ["time_tag", "time", "observed_time"] if col in frame.columns), None)
    flux_column = next((col for col in ["flux", "observed_flux"] if col in frame.columns), None)
    energy_column = next((col for col in ["energy", "wavelength"] if col in frame.columns), None)
    satellite_column = next((col for col in ["satellite", "satellite_id"] if col in frame.columns), None)
    if time_column is None or flux_column is None:
        raise ValueError("X-ray payload does not contain expected columns.")

    series = frame.copy()
    if energy_column and energy_column in series.columns:
        long_band = series[energy_column].astype(str).str.strip().eq("0.1-0.8nm")
        if long_band.any():
            series = series.loc[long_band].copy()

    keep_columns = [time_column, flux_column]
    if energy_column:
        keep_columns.append(energy_column)
    if satellite_column:
        keep_columns.append(satellite_column)

    series = series[keep_columns].copy()
    rename_map = {time_column: "time", flux_column: "flux"}
    if energy_column:
        rename_map[energy_column] = "energy"
    if satellite_column:
        rename_map[satellite_column] = "satellite"
    series = series.rename(columns=rename_map)
    series["time"] = pd.to_datetime(series["time"], errors="coerce", utc=True)
    series["flux"] = pd.to_numeric(series["flux"], errors="coerce")
    if "energy" not in series.columns:
        series["energy"] = "0.1-0.8nm"
    if "satellite" not in series.columns:
        series["satellite"] = "GOES"
    series = series.dropna(subset=["time", "flux"]).sort_values("time")
    if series.empty:
        raise ValueError("X-ray payload produced an empty time series.")

    excluded = [column for column in frame.columns if column not in set(keep_columns)]
    return series, excluded


@st.cache_data(ttl=LIVE_CACHE_TTL_SECONDS, show_spinner=False)
def fetch_live_kp_data() -> tuple[pd.DataFrame, Any, list[str]]:
    """Fetch and normalize live planetary Kp data from NOAA."""

    payload = request_json(NOAA_PLANETARY_KP_URL)
    series, excluded = parse_kp_dataframe(payload)
    return series, payload, excluded


@st.cache_data(ttl=LIVE_CACHE_TTL_SECONDS, show_spinner=False)
def fetch_live_xray_data() -> tuple[pd.DataFrame, Any, str, list[str]]:
    """Fetch GOES X-ray data from the first NOAA endpoint that responds."""

    last_error: Exception | None = None
    for url in NOAA_GOES_XRAY_URLS:
        try:
            payload = request_json(url)
            series, excluded = parse_xray_dataframe(payload)
            return series, payload, url, excluded
        except Exception as exc:  # noqa: BLE001 - explicit user-facing fallback path
            last_error = exc
    raise RuntimeError(f"GOES X-ray feed unavailable: {last_error}") from last_error


def load_space_weather_snapshot(data_mode: str) -> SpaceWeatherSnapshot:
    """Load either live NOAA data or deterministic sample data with clear provenance."""

    notices: list[str] = []
    raw_payloads: dict[str, Any] = {}
    source_labels = {"kp": "Sample fallback", "xray": "Sample fallback"}
    excluded_fields: dict[str, list[str]] = {"kp": [], "xray": []}

    if data_mode == "Live NOAA":
        try:
            kp_series, kp_payload, kp_excluded = fetch_live_kp_data()
            raw_payloads["kp"] = last_rows_payload(kp_payload)
            source_labels["kp"] = "NOAA SWPC planetary K-index"
            excluded_fields["kp"] = kp_excluded
        except Exception as exc:  # noqa: BLE001 - fallback is part of the product behavior
            notices.append(f"Kp live feed could not be loaded, sample series is being used instead: {exc}")
            kp_series = build_sample_kp_series()
            raw_payloads["kp"] = {"fallback": "sample"}

        try:
            xray_series, xray_payload, xray_url, xray_excluded = fetch_live_xray_data()
            raw_payloads["xray"] = last_rows_payload(xray_payload)
            source_labels["xray"] = f"NOAA GOES X-ray ({xray_url.split('/')[-3]})"
            excluded_fields["xray"] = xray_excluded
        except Exception as exc:  # noqa: BLE001 - fallback is part of the product behavior
            notices.append(f"GOES X-ray live feed could not be loaded, sample series is being used instead: {exc}")
            xray_series = build_sample_xray_series()
            raw_payloads["xray"] = {"fallback": "sample"}
    else:
        kp_series = build_sample_kp_series()
        xray_series = build_sample_xray_series()
        raw_payloads = {"kp": {"mode": "sample"}, "xray": {"mode": "sample"}}
        notices.append("Sample mode is active; the panel is demonstrating the scoring logic with deterministic example data.")

    kp_series = kp_series.sort_values("time").copy()
    xray_series = xray_series.sort_values("time").copy()
    summary_24h = get_last_24h_kp_summary(kp_series, xray_series)

    latest_kp = float(kp_series["kp"].iloc[-1])
    latest_xray_flux = float(xray_series["flux"].iloc[-1]) if not xray_series.empty else None
    last_update_candidates = [kp_series["time"].max()]
    if not xray_series.empty:
        last_update_candidates.append(xray_series["time"].max())
    last_update = max(last_update_candidates) if last_update_candidates else None

    context_only_fields = {
        "24h maximum Kp": f"{summary_24h.max_kp_24h:.2f}",
        "24h average Kp": f"{summary_24h.avg_kp_24h:.2f}",
        "24h storm intervals": str(summary_24h.storm_intervals_24h),
        "24h peak X-ray": summary_24h.peak_xray_class_24h,
        "Kp trend": summary_24h.trend_24h,
        "Last update": format_timestamp(last_update),
    }

    return SpaceWeatherSnapshot(
        kp_series=kp_series,
        xray_series=xray_series,
        kp_current=latest_kp,
        kp_max_24h=summary_24h.max_kp_24h,
        storm_level=storm_level_from_kp(latest_kp),
        trend=summary_24h.trend_24h,
        last_update=last_update,
        xray_flux=latest_xray_flux,
        xray_class=goes_class_label(latest_xray_flux),
        xray_risk_band=xray_risk_band(latest_xray_flux),
        source_labels=source_labels,
        notices=notices,
        raw_payloads=raw_payloads,
        excluded_fields=excluded_fields,
        context_only_fields=context_only_fields,
        summary_24h=summary_24h,
    )


def assess_leo_drag_risk(orbit_type: str, altitude_km: int, kp_value: float) -> str:
    """Estimate orbital drag exposure with emphasis on low-altitude LEO."""

    if orbit_type != "LEO" or altitude_km > 1000:
        return "Low"
    if kp_value < 5:
        return "Low"
    if kp_value < 7:
        return "Moderate"
    return "High"


def assess_electronics_risk(orbit_type: str, kp_value: float, xray_band_label: str) -> str:
    """Estimate subsystem stress on electronics and radiation-sensitive hardware."""

    score = 0
    if kp_value >= 5:
        score += 1
    if kp_value >= 7:
        score += 1
    if xray_band_label == "Moderate":
        score += 1
    elif xray_band_label == "High":
        score += 2
    if orbit_type == "MEO":
        score += 1
    elif orbit_type == "GEO":
        score += 2

    if score <= 1:
        return "Low"
    if score <= 3:
        return "Moderate"
    return "High"


def assess_communication_risk(kp_value: float, xray_band_label: str) -> str:
    """Estimate communication degradation from geomagnetic and solar X-ray conditions."""

    score = 0
    if kp_value >= 5:
        score += 1
    if kp_value >= 7:
        score += 1
    if xray_band_label == "Moderate":
        score += 1
    elif xray_band_label == "High":
        score += 2

    if score <= 1:
        return "Low"
    if score <= 3:
        return "Moderate"
    return "High"


def build_recommended_actions(
    score_band: str,
    leo_drag_risk: str,
    electronics_risk: str,
    communication_risk: str,
) -> list[str]:
    """Generate operational actions from the aggregate and subsystem-specific risks."""

    if score_band == "Low":
        actions = ["Nominal operations can continue under routine monitoring."]
    elif score_band == "Moderate":
        actions = ["Increase monitoring frequency and verify recent telemetry margins."]
    elif score_band == "High":
        actions = ["Monitor subsystem status closely and postpone low-priority sensitive activities."]
    else:
        actions = ["Postpone sensitive operations if possible and switch to a conservative operational posture."]

    if leo_drag_risk in {"Moderate", "High"}:
        actions.append("LEO drag risk is elevated; review orbit maintenance planning and predicted drag losses.")
    if electronics_risk == "High":
        actions.append("Electronics stress is elevated; track subsystem health, charging margins, and upset indicators.")
    if communication_risk in {"Moderate", "High"}:
        actions.append("Communication conditions may degrade; confirm link budgets and fallback communication paths.")
    return actions


def build_assessment(
    snapshot: SpaceWeatherSnapshot,
    orbit_type: str,
    altitude_km: int,
    manual_override_enabled: bool,
    override_kp: float,
    override_xray_band: str,
) -> SatelliteAssessment:
    """Run the requested heuristic risk model and keep the input set explicit."""

    effective_kp = round(float(override_kp), 2) if manual_override_enabled else round(snapshot.kp_current, 2)
    effective_xray_band = override_xray_band if manual_override_enabled else snapshot.xray_risk_band
    effective_xray_label = f"Manual {override_xray_band}" if manual_override_enabled else snapshot.xray_class

    geomagnetic = geomagnetic_points_from_kp(effective_kp)
    xray = xray_points_from_band(effective_xray_band)
    orbit_term = orbit_points(orbit_type)
    altitude_term = altitude_points(altitude_km)
    total_score = min(100, geomagnetic + xray + orbit_term + altitude_term)
    overall_band = impact_band(total_score)

    leo_drag_risk = assess_leo_drag_risk(orbit_type, altitude_km, effective_kp)
    electronics_risk = assess_electronics_risk(orbit_type, effective_kp, effective_xray_band)
    communication_risk = assess_communication_risk(effective_kp, effective_xray_band)

    used_inputs = {
        "Current Kp used in score": f"{effective_kp:.2f}",
        "X-ray category used in score": f"{effective_xray_band} ({effective_xray_label})",
        "Orbit type used in score": orbit_type,
        "Altitude used in score": f"{altitude_km} km",
    }

    return SatelliteAssessment(
        orbit_type=orbit_type,
        altitude_km=altitude_km,
        impact_score=total_score,
        impact_band=overall_band,
        leo_drag_risk=leo_drag_risk,
        electronics_radiation_risk=electronics_risk,
        communication_risk=communication_risk,
        recommended_actions=build_recommended_actions(
            overall_band,
            leo_drag_risk,
            electronics_risk,
            communication_risk,
        ),
        contribution_points={
            "Geomagnetic (Kp)": geomagnetic,
            "X-ray": xray,
            "Orbit type": orbit_term,
            "Altitude": altitude_term,
        },
        used_inputs=used_inputs,
    )


def metric_card(title: str, value: str, subtitle: str, accent: str) -> str:
    """Render a reusable HTML metric card."""

    return f"""
    <div class="metric-card">
        <div class="metric-label">{escape(title)}</div>
        <div class="metric-value" style="color:{accent};">{escape(value)}</div>
        <div class="metric-subtitle">{escape(subtitle)}</div>
    </div>
    """


def risk_card(title: str, value: str, explanation: str) -> str:
    """Render a reusable qualitative risk card."""

    color = severity_color(value)
    return f"""
    <div class="risk-card">
        <div class="risk-title">{escape(title)}</div>
        <div class="risk-value" style="color:{color};">{escape(value)}</div>
        <div class="risk-copy">{escape(explanation)}</div>
    </div>
    """


def xray_band_from_class_label(label: str) -> str:
    """Map a GOES class label back to the dashboard's operational X-ray band."""

    if not label or label == "Unavailable":
        return "Low"
    prefix = str(label).strip().upper()[:1]
    if prefix in {"A", "B", "C"}:
        return "Low"
    if prefix == "M":
        return "Moderate"
    if prefix == "X":
        return "High"
    return "Low"


def build_kp_figure(kp_series: pd.DataFrame) -> go.Figure:
    """Plot recent planetary Kp values."""

    figure = go.Figure()
    figure.add_trace(
        go.Scatter(
            x=kp_series["time"],
            y=kp_series["kp"],
            mode="lines+markers",
            name="Kp",
            line={"color": "#6fd8ff", "width": 2.4},
            marker={"size": 6, "color": "#e8f8ff"},
        )
    )
    figure.add_hline(y=5, line_dash="dash", line_color="rgba(239, 68, 68, 0.55)", annotation_text="Storm threshold")
    figure.update_layout(
        title="Recent Planetary K-index",
        template="plotly_dark",
        height=340,
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(10,20,32,0.88)",
        margin={"l": 40, "r": 20, "t": 54, "b": 40},
        xaxis_title="Time (UTC)",
        yaxis_title="Kp",
    )
    figure.update_yaxes(range=[0, 9])
    return figure


def build_xray_figure(xray_series: pd.DataFrame) -> go.Figure:
    """Plot the recent GOES X-ray long channel on a logarithmic axis."""

    figure = go.Figure()
    figure.add_trace(
        go.Scatter(
            x=xray_series["time"],
            y=xray_series["flux"],
            mode="lines",
            name="0.1-0.8 nm flux",
            line={"color": "#f4b942", "width": 2.2},
        )
    )
    figure.add_hline(y=1e-5, line_dash="dot", line_color="rgba(244, 185, 66, 0.55)", annotation_text="M threshold")
    figure.add_hline(y=1e-4, line_dash="dot", line_color="rgba(239, 68, 68, 0.55)", annotation_text="X threshold")
    figure.update_layout(
        title="Recent GOES X-ray Flux",
        template="plotly_dark",
        height=340,
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(10,20,32,0.88)",
        margin={"l": 40, "r": 20, "t": 54, "b": 40},
        xaxis_title="Time (UTC)",
        yaxis_title="Flux (W/m^2)",
    )
    figure.update_yaxes(type="log")
    return figure


def build_breakdown_figure(assessment: SatelliteAssessment) -> go.Figure:
    """Visualize score contributions so the user can audit the heuristic."""

    labels = list(assessment.contribution_points.keys())
    values = list(assessment.contribution_points.values())
    colors = ["#72d4ff", "#f4b942", "#5ed39d", "#a78bfa"]
    figure = go.Figure(
        go.Bar(
            x=labels,
            y=values,
            marker={"color": colors},
            text=values,
            textposition="outside",
        )
    )
    figure.update_layout(
        title="Impact Score Breakdown",
        template="plotly_dark",
        height=320,
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(10,20,32,0.88)",
        margin={"l": 30, "r": 20, "t": 54, "b": 40},
        yaxis_title="Points",
        showlegend=False,
    )
    figure.update_yaxes(range=[0, max(30, max(values) + 10)])
    return figure


def render_header(snapshot: SpaceWeatherSnapshot, assessment: SatelliteAssessment) -> None:
    """Render title, provenance summary, and current panel context."""

    st.markdown(
        """
        <div class="hero-panel">
            <div class="hero-kicker">NOAA SWPC | GOES | Operational Heuristic</div>
            <h1 class="hero-title">Uydu Etki Paneli</h1>
            <p class="hero-subtitle">
                This panel interprets real-time space weather observations for satellite operations.
                The current release scores only the variables explicitly shown in the model-input section:
                Kp, X-ray activity, orbit class, and altitude.
            </p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    st.caption(
        f"Active profile: {assessment.orbit_type} at {assessment.altitude_km} km | "
        f"Last update: {format_timestamp(snapshot.last_update)} | "
        f"24h max Kp: {snapshot.kp_max_24h:.2f}"
    )

    source_markup = "".join(
        f'<span class="source-pill">{escape(label)}</span>' for label in snapshot.source_labels.values()
    )
    st.markdown(source_markup, unsafe_allow_html=True)


def render_top_metrics(snapshot: SpaceWeatherSnapshot, assessment: SatelliteAssessment) -> None:
    """Render the five required top summary cards."""

    cards = st.columns(5)
    payload = [
        ("Current Kp", f"{snapshot.kp_current:.2f}", "Latest planetary geomagnetic index", "#72d4ff"),
        ("Storm Level", snapshot.storm_level, "NOAA G-scale interpretation", severity_color(snapshot.storm_level)),
        ("Impact Score", f"{assessment.impact_score}/100", "Heuristic satellite operations score", severity_color(assessment.impact_band)),
        ("Trend", snapshot.trend, "Recent Kp tendency", severity_color(snapshot.trend)),
        ("Last Update", format_timestamp(snapshot.last_update), "Most recent NOAA timestamp", "#cbd5e1"),
    ]

    for column, (title, value, subtitle, color) in zip(cards, payload):
        column.markdown(metric_card(title, value, subtitle, color), unsafe_allow_html=True)


def render_24h_summary_box(summary: TwentyFourHourSummary) -> None:
    """Render a compact professional summary for the latest 24-hour Kp window."""

    storm_color = severity_color(storm_level_from_kp(summary.max_kp_24h))
    trend_color = severity_color(summary.trend_24h)
    xray_color = severity_color(xray_band_from_class_label(summary.peak_xray_class_24h))
    status_label = "Storm intervals detected" if summary.storm_intervals_24h > 0 else "Substorm threshold not crossed"

    metrics = [
        (
            "Max Kp (24h)",
            f"{summary.max_kp_24h:.2f}",
            "Peak geomagnetic level in the latest 8-point window",
            storm_color,
        ),
        (
            "Mean Kp (24h)",
            f"{summary.avg_kp_24h:.2f}",
            "Arithmetic mean of the same operational Kp window",
            "#72d4ff",
        ),
        (
            "Storm Intervals",
            str(summary.storm_intervals_24h),
            "Count of intervals with Kp >= 5",
            storm_color if summary.storm_intervals_24h else "#36c275",
        ),
        (
            "Trend (24h)",
            summary.trend_24h,
            f"{summary.kp_points_used}/8 valid Kp samples used in the window",
            trend_color,
        ),
    ]

    metric_markup = "".join(
        f"""
        <div class="summary-mini-card">
            <div class="summary-mini-label">{escape(title)}</div>
            <div class="summary-mini-value" style="color:{color};">{escape(value)}</div>
            <div class="summary-mini-caption">{escape(subtitle)}</div>
        </div>
        """
        for title, value, subtitle, color in metrics
    )

    notice_markup = (
        f'<div class="summary-box-footnote">{escape(summary.data_notice)}</div>'
        if summary.data_notice
        else ""
    )

    st.markdown(
        f"""
        <div class="summary-box">
            <div class="summary-box-head">
                <div>
                    <div class="summary-box-title">24-Hour Summary</div>
                    <div class="summary-box-subtitle">
                        Derived from the latest 8 Kp measurements spanning the most recent 24-hour operational window.
                    </div>
                </div>
                <div class="summary-chip-row">
                    <span class="summary-chip" style="border-color:{storm_color}; color:{storm_color};">
                        Geomagnetic status: {escape(status_label)}
                    </span>
                    <span class="summary-chip" style="border-color:{xray_color}; color:{xray_color};">
                        Peak X-ray: {escape(summary.peak_xray_class_24h)}
                    </span>
                </div>
            </div>
            <div class="summary-grid">
                {metric_markup}
            </div>
            <p class="summary-box-copy">{escape(summary.summary_text)}</p>
            {notice_markup}
        </div>
        """,
        unsafe_allow_html=True,
    )


def render_risk_section(snapshot: SpaceWeatherSnapshot, assessment: SatelliteAssessment) -> None:
    """Render subsystem-oriented operational risks and the recommended action card."""

    st.markdown('<div class="section-title">Operational Risk Assessment</div>', unsafe_allow_html=True)
    columns = st.columns(4)
    cards = [
        (
            "LEO Drag Risk",
            assessment.leo_drag_risk,
            f"Evaluated mainly from orbit class, altitude ({assessment.altitude_km} km), and current Kp.",
        ),
        (
            "Electronics / Radiation Risk",
            assessment.electronics_radiation_risk,
            f"Driven by Kp and X-ray activity, with extra sensitivity for {assessment.orbit_type}.",
        ),
        (
            "Communication Risk",
            assessment.communication_risk,
            "Combines geomagnetic activity and current GOES X-ray category for rapid comms screening.",
        ),
        (
            "Recommended Action",
            assessment.impact_band,
            assessment.recommended_actions[0],
        ),
    ]
    for column, (title, value, text) in zip(columns, cards):
        column.markdown(risk_card(title, value, text), unsafe_allow_html=True)

    with st.container(border=False):
        st.markdown('<div class="panel-shell">', unsafe_allow_html=True)
        st.markdown("**Recommended action set**")
        for action in assessment.recommended_actions:
            st.write(f"- {action}")
        st.markdown("</div>", unsafe_allow_html=True)


def render_charts(snapshot: SpaceWeatherSnapshot, assessment: SatelliteAssessment) -> None:
    """Render the requested charts."""

    left, right = st.columns(2)
    with left:
        st.plotly_chart(build_kp_figure(snapshot.kp_series), use_container_width=True)
    with right:
        st.plotly_chart(build_xray_figure(snapshot.xray_series), use_container_width=True)

    bottom_left, bottom_right = st.columns([1.15, 0.85])
    with bottom_left:
        st.plotly_chart(build_breakdown_figure(assessment), use_container_width=True)
    with bottom_right:
        st.markdown('<div class="panel-shell">', unsafe_allow_html=True)
        st.markdown("**Risk breakdown table**")
        breakdown_table = pd.DataFrame(
            {
                "Component": list(assessment.contribution_points.keys()),
                "Points": list(assessment.contribution_points.values()),
            }
        )
        st.dataframe(breakdown_table, use_container_width=True, hide_index=True)
        st.markdown(
            f'<p class="small-note">Final classification: <strong style="color:{severity_color(assessment.impact_band)};">'
            f"{assessment.impact_band}</strong>. "
            "The score is capped at 100 and should be used as fast operational guidance, not as a physics simulation."
            "</p>",
            unsafe_allow_html=True,
        )
        st.markdown("</div>", unsafe_allow_html=True)


def render_model_scope(snapshot: SpaceWeatherSnapshot, assessment: SatelliteAssessment) -> None:
    """Make the distinction between used and unused inputs explicit."""

    st.markdown('<div class="section-title">Model Input Discipline</div>', unsafe_allow_html=True)
    used_column, context_column, excluded_column = st.columns(3)

    with used_column:
        st.markdown('<div class="list-block"><h4>Used in Interpretation</h4><ul>', unsafe_allow_html=True)
        for key, value in assessment.used_inputs.items():
            st.markdown(f"<li>{escape(key)}: {escape(value)}</li>", unsafe_allow_html=True)
        st.markdown("</ul></div>", unsafe_allow_html=True)

    with context_column:
        st.markdown('<div class="list-block"><h4>Context Only, Not Scored</h4><ul>', unsafe_allow_html=True)
        for key, value in snapshot.context_only_fields.items():
            st.markdown(f"<li>{escape(key)}: {escape(value)}</li>", unsafe_allow_html=True)
        st.markdown("</ul></div>", unsafe_allow_html=True)

    with excluded_column:
        st.markdown('<div class="list-block"><h4>Retrieved But Excluded</h4><ul>', unsafe_allow_html=True)
        excluded_lines: list[str] = []
        for source_name, columns in snapshot.excluded_fields.items():
            if columns:
                excluded_lines.append(f"{source_name.upper()}: {', '.join(columns)}")
        if not excluded_lines:
            excluded_lines.append("No extra raw columns were used in this run.")
        for item in excluded_lines:
            st.markdown(f"<li>{escape(item)}</li>", unsafe_allow_html=True)
        st.markdown("</ul></div>", unsafe_allow_html=True)


def render_scientific_note() -> None:
    """Render the requested academic explanation box."""

    with st.expander("Scientific interpretation notes", expanded=True):
        st.markdown(
            """
            - **Kp index** represents global geomagnetic disturbance and is widely used as a compact operational proxy for storm intensity.
            - **G-level** is NOAA's geomagnetic storm scale. In this panel, `G0` means no storm, while `G1` through `G5` are triggered from `Kp >= 5`.
            - **GOES X-ray activity** matters because elevated solar X-ray output is a fast indicator of radio blackout potential and heightened space-environment stress.
            - **This dashboard is not a full physics simulation.** It is an operational heuristic: a rapid decision-support layer intended to summarize live observations into a readable risk posture.
            - **Current scoring scope is intentionally strict.** Only Kp, X-ray category, orbit type, and altitude are allowed to drive the score in this version; other observed values are kept separate until they are formally added to the model.
            """
        )


def render_raw_data(snapshot: SpaceWeatherSnapshot) -> None:
    """Expose raw inputs without mixing them into the interpretation layer."""

    with st.expander("Show raw live data / fallback payloads", expanded=False):
        st.markdown("**Data provenance**")
        provenance_table = pd.DataFrame(
            {
                "Feed": ["Kp", "GOES X-ray"],
                "Source": [snapshot.source_labels["kp"], snapshot.source_labels["xray"]],
                "Latest update": [format_timestamp(snapshot.kp_series["time"].max()), format_timestamp(snapshot.xray_series["time"].max())],
            }
        )
        st.dataframe(provenance_table, use_container_width=True, hide_index=True)
        st.markdown("**Raw Kp payload (trimmed)**")
        st.json(snapshot.raw_payloads["kp"])
        st.markdown("**Raw X-ray payload (trimmed)**")
        st.json(snapshot.raw_payloads["xray"])


def build_sidebar() -> dict[str, Any]:
    """Collect all user-configurable parameters from the sidebar."""

    st.sidebar.title("Mission Profile")
    data_mode = st.sidebar.radio(
        "Data source",
        options=["Live NOAA", "Sample data"],
        help="Use official NOAA feeds when available, or a deterministic fallback data set.",
    )
    orbit_type = st.sidebar.selectbox("Satellite type", options=["LEO", "MEO", "GEO"], index=0)
    altitude_km = int(
        st.sidebar.slider(
            "Altitude (km)",
            min_value=200,
            max_value=36000,
            value=550,
            step=50,
        )
    )
    manual_override_enabled = st.sidebar.toggle("Enable manual data override", value=False)

    override_kp = 0.0
    override_xray_band = "Low"
    if manual_override_enabled:
        override_kp = float(
            st.sidebar.number_input(
                "Override current Kp",
                min_value=0.0,
                max_value=9.0,
                step=0.1,
                value=4.0,
            )
        )
        override_xray_band = st.sidebar.selectbox(
            "Override X-ray category",
            options=["Low", "Moderate", "High"],
            index=0,
        )

    auto_refresh = st.sidebar.toggle("Auto refresh every 5 minutes", value=False)
    if auto_refresh:
        st.markdown('<meta http-equiv="refresh" content="300">', unsafe_allow_html=True)

    st.sidebar.markdown("---")
    st.sidebar.caption(
        "Current score inputs are intentionally limited to Kp, X-ray category, orbit type, and altitude. "
        "This prevents accidental use of extra variables that are not yet calibrated in the heuristic."
    )

    return {
        "data_mode": data_mode,
        "orbit_type": orbit_type,
        "altitude_km": altitude_km,
        "manual_override_enabled": manual_override_enabled,
        "override_kp": override_kp,
        "override_xray_band": override_xray_band,
    }


def main() -> None:
    """Streamlit entry point."""

    st.set_page_config(
        page_title="Uydu Etki Paneli",
        layout="wide",
        initial_sidebar_state="expanded",
    )
    inject_page_style()

    sidebar = build_sidebar()
    snapshot = load_space_weather_snapshot(sidebar["data_mode"])
    assessment = build_assessment(
        snapshot=snapshot,
        orbit_type=sidebar["orbit_type"],
        altitude_km=sidebar["altitude_km"],
        manual_override_enabled=sidebar["manual_override_enabled"],
        override_kp=sidebar["override_kp"],
        override_xray_band=sidebar["override_xray_band"],
    )

    render_header(snapshot, assessment)

    for notice in snapshot.notices:
        st.warning(notice)
    if sidebar["manual_override_enabled"]:
        st.info(
            "Manual override is active. Risk interpretation uses the override Kp and X-ray category, "
            "while raw NOAA charts remain visible for comparison."
        )

    render_top_metrics(snapshot, assessment)
    st.divider()
    render_24h_summary_box(snapshot.summary_24h)
    st.divider()
    render_risk_section(snapshot, assessment)
    st.divider()
    render_charts(snapshot, assessment)
    st.divider()
    render_model_scope(snapshot, assessment)
    st.divider()
    render_scientific_note()
    render_raw_data(snapshot)

    st.markdown(
        """
        ---
        **Suggested requirements**

        ```text
        streamlit>=1.42
        pandas>=2.2
        requests>=2.32
        plotly>=5.24
        ```

        **Run**

        ```bash
        pip install -r requirements_satellite_panel.txt
        streamlit run app.py
        ```
        """
    )


if __name__ == "__main__":
    main()
