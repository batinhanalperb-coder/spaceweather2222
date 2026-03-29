const elements = {
  imagesToggle: document.getElementById("imagesToggle"),
  statusLine: document.getElementById("statusLine"),
  accessMode: document.getElementById("accessMode"),
  accessPublicUrl: document.getElementById("accessPublicUrl"),
  accessHint: document.getElementById("accessHint"),
  accessLocalUrl: document.getElementById("accessLocalUrl"),
  notificationPanelStatus: document.getElementById("notificationPanelStatus"),
  notificationPanelContent: document.getElementById("notificationPanelContent"),
  levelBadge: document.getElementById("levelBadge"),
  scoreValue: document.getElementById("scoreValue"),
  riskBar: document.getElementById("riskBar"),
  riskNarrative: document.getElementById("riskNarrative"),
  generatedAt: document.getElementById("generatedAt"),
  kpValue: document.getElementById("kpValue"),
  kpEstimatedValue: document.getElementById("kpEstimatedValue"),
  kpLstmValue: document.getElementById("kpLstmValue"),
  kpLstmMeta: document.getElementById("kpLstmMeta"),
  speedValue: document.getElementById("speedValue"),
  bzValue: document.getElementById("bzValue"),
  confidenceValue: document.getElementById("confidenceValue"),
  confidenceMeta: document.getElementById("confidenceMeta"),
  spaceWeatherSimCanvas: document.getElementById("spaceWeatherSimCanvas"),
  simulationFlowLabel: document.getElementById("simulationFlowLabel"),
  simulationImpactLabel: document.getElementById("simulationImpactLabel"),
  simulationSummary: document.getElementById("simulationSummary"),
  simulationWindValue: document.getElementById("simulationWindValue"),
  simulationAuroraValue: document.getElementById("simulationAuroraValue"),
  simulationCompressionValue: document.getElementById("simulationCompressionValue"),
  simulationForecastValue: document.getElementById("simulationForecastValue"),
  simulationLegend: document.getElementById("simulationLegend"),
  simulationPointTitle: document.getElementById("simulationPointTitle"),
  simulationPointBadge: document.getElementById("simulationPointBadge"),
  simulationPointSummary: document.getElementById("simulationPointSummary"),
  simulationPointLatLon: document.getElementById("simulationPointLatLon"),
  simulationPointLocalTime: document.getElementById("simulationPointLocalTime"),
  simulationPointOverall: document.getElementById("simulationPointOverall"),
  simulationPointGeomag: document.getElementById("simulationPointGeomag"),
  simulationPointGnss: document.getElementById("simulationPointGnss"),
  simulationPointHf: document.getElementById("simulationPointHf"),
  simulationPointGeomagText: document.getElementById("simulationPointGeomagText"),
  simulationPointGnssText: document.getElementById("simulationPointGnssText"),
  simulationPointHfText: document.getElementById("simulationPointHfText"),
  simulationPointGeomagBar: document.getElementById("simulationPointGeomagBar"),
  simulationPointGnssBar: document.getElementById("simulationPointGnssBar"),
  simulationPointHfBar: document.getElementById("simulationPointHfBar"),
  reasonsList: document.getElementById("reasonsList"),
  impactGrid: document.getElementById("impactGrid"),
  imfBzQueryAvailability: document.getElementById("imfBzQueryAvailability"),
  imfBzQueryDateInput: document.getElementById("imfBzQueryDateInput"),
  imfBzQueryOpenPicker: document.getElementById("imfBzQueryOpenPicker"),
  imfBzQueryDateHint: document.getElementById("imfBzQueryDateHint"),
  imfBzQuerySubmit: document.getElementById("imfBzQuerySubmit"),
  imfBzQueryStatus: document.getElementById("imfBzQueryStatus"),
  imfBzQueryResult: document.getElementById("imfBzQueryResult"),
  kpQueryAvailability: document.getElementById("kpQueryAvailability"),
  kpQueryDateInput: document.getElementById("kpQueryDateInput"),
  kpQueryOpenPicker: document.getElementById("kpQueryOpenPicker"),
  kpQueryDateHint: document.getElementById("kpQueryDateHint"),
  kpQuerySubmit: document.getElementById("kpQuerySubmit"),
  kpQueryStatus: document.getElementById("kpQueryStatus"),
  kpQueryResult: document.getElementById("kpQueryResult"),
  solarWindQueryAvailability: document.getElementById("solarWindQueryAvailability"),
  solarWindQueryDateInput: document.getElementById("solarWindQueryDateInput"),
  solarWindQueryOpenPicker: document.getElementById("solarWindQueryOpenPicker"),
  solarWindQueryDateHint: document.getElementById("solarWindQueryDateHint"),
  solarWindQuerySubmit: document.getElementById("solarWindQuerySubmit"),
  solarWindQueryStatus: document.getElementById("solarWindQueryStatus"),
  solarWindQueryResult: document.getElementById("solarWindQueryResult"),
  satelliteUpdated: document.getElementById("satelliteUpdated"),
  satellitePanelContent: document.getElementById("satellitePanelContent"),
  turkeyRiskUpdated: document.getElementById("turkeyRiskUpdated"),
  turkeyRiskContent: document.getElementById("turkeyRiskContent"),
  cmeWindowBadge: document.getElementById("cmeWindowBadge"),
  cmeWindowSummary: document.getElementById("cmeWindowSummary"),
  cmeWindowRange: document.getElementById("cmeWindowRange"),
  cmeWindowDrivers: document.getElementById("cmeWindowDrivers"),
  cmeWindowInference: document.getElementById("cmeWindowInference"),
  similarEventsList: document.getElementById("similarEventsList"),
  noaaMetrics: document.getElementById("noaaMetrics"),
  stationList: document.getElementById("stationList"),
  kpChart: document.getElementById("kpChart"),
  kpChartMeta: document.getElementById("kpChartMeta"),
  kpComparisonChart: document.getElementById("kpComparisonChart"),
  kpComparisonMeta: document.getElementById("kpComparisonMeta"),
  kpComparisonLegend: document.getElementById("kpComparisonLegend"),
  kpEstimatedChart: document.getElementById("kpEstimatedChart"),
  kpEstimatedChartMeta: document.getElementById("kpEstimatedChartMeta"),
  speedChart: document.getElementById("speedChart"),
  speedChartMeta: document.getElementById("speedChartMeta"),
  densityChart: document.getElementById("densityChart"),
  densityChartMeta: document.getElementById("densityChartMeta"),
  bzChart: document.getElementById("bzChart"),
  bzChartMeta: document.getElementById("bzChartMeta"),
  btChart: document.getElementById("btChart"),
  btChartMeta: document.getElementById("btChartMeta"),
  historyChart: document.getElementById("historyChart"),
  historyLegend: document.getElementById("historyLegend"),
  imageHero: document.getElementById("imageHero"),
  imageGrid: document.getElementById("imageGrid"),
  solarPanel: document.getElementById("solarPanel"),
  solarToggle: document.getElementById("solarToggle"),
  solarContent: document.getElementById("solarContent"),
  sunspotUpdated: document.getElementById("sunspotUpdated"),
  sunspotNoaaNow: document.getElementById("sunspotNoaaNow"),
  sunspotSilsoNow: document.getElementById("sunspotSilsoNow"),
  sunspotNoaaPredicted: document.getElementById("sunspotNoaaPredicted"),
  sunspotSilsoPredicted: document.getElementById("sunspotSilsoPredicted"),
  xrayUpdated: document.getElementById("xrayUpdated"),
  xrayLongFlux: document.getElementById("xrayLongFlux"),
  xrayShortFlux: document.getElementById("xrayShortFlux"),
  xrayFlareClass: document.getElementById("xrayFlareClass"),
  flareClassLegend: document.getElementById("flareClassLegend"),
  flareList: document.getElementById("flareList"),
  cmeUpdated: document.getElementById("cmeUpdated"),
  cmeSpeed: document.getElementById("cmeSpeed"),
  cmeDirection: document.getElementById("cmeDirection"),
  cmeImpact: document.getElementById("cmeImpact"),
  cmeArrival: document.getElementById("cmeArrival"),
  cmeSummary: document.getElementById("cmeSummary"),
  radioUpdated: document.getElementById("radioUpdated"),
  radioBurstSummary: document.getElementById("radioBurstSummary"),
  solarFluxTime: document.getElementById("solarFluxTime"),
  solarFluxValue: document.getElementById("solarFluxValue"),
  radiationUpdated: document.getElementById("radiationUpdated"),
  sepFluxValue: document.getElementById("sepFluxValue"),
  protonFluxValue: document.getElementById("protonFluxValue"),
  electronFluxValue: document.getElementById("electronFluxValue"),
  heavyIonFluxValue: document.getElementById("heavyIonFluxValue"),
  doseRateValue: document.getElementById("doseRateValue"),
  protonBandValue: document.getElementById("protonBandValue"),
  electronBandValue: document.getElementById("electronBandValue"),
  ionosphereUpdated: document.getElementById("ionosphereUpdated"),
  tecValue: document.getElementById("tecValue"),
  fof2Value: document.getElementById("fof2Value"),
  hmf2Value: document.getElementById("hmf2Value"),
  s4Value: document.getElementById("s4Value"),
  sigmaPhiValue: document.getElementById("sigmaPhiValue"),
  mufLufValue: document.getElementById("mufLufValue"),
  ionoDelayValue: document.getElementById("ionoDelayValue"),
  magnetosphereUpdated: document.getElementById("magnetosphereUpdated"),
  auroralOvalValue: document.getElementById("auroralOvalValue"),
  auroraProbabilityValue: document.getElementById("auroraProbabilityValue"),
  magnetopauseValue: document.getElementById("magnetopauseValue"),
  radiationBeltValue: document.getElementById("radiationBeltValue"),
  substormValue: document.getElementById("substormValue"),
  operationalUpdated: document.getElementById("operationalUpdated"),
  hfBlackoutValue: document.getElementById("hfBlackoutValue"),
  gnssDegradationValue: document.getElementById("gnssDegradationValue"),
  surfaceChargingValue: document.getElementById("surfaceChargingValue"),
  deepChargingValue: document.getElementById("deepChargingValue"),
  seuRiskValue: document.getElementById("seuRiskValue"),
  leoDragValue: document.getElementById("leoDragValue"),
  gicRiskValue: document.getElementById("gicRiskValue"),
  aviationRiskValue: document.getElementById("aviationRiskValue"),
  polarCommRiskValue: document.getElementById("polarCommRiskValue"),
};

const NASA_SLIDE_INTERVAL_MS = 12000;
const AUTO_REFRESH_INTERVAL_MS = 60000;
const INITIAL_AUTO_CHECK_DELAY_MS = 12000;
const SOLAR_FETCH_INTERVAL_MS = 60000;
const SOLAR_CACHE_KEY = "solar_cache_v20260328_satellite_fix_2";
const NOTIFICATION_BRIDGE_URL = "http://127.0.0.1:8093";
const NOTIFY_SETTINGS_STORAGE_KEY = "notify_settings_v20260328_per_user_pushbullet";
const NOTIFY_STATE_STORAGE_KEY = "notify_state_v20260328_per_user_pushbullet";
const LIVE_SOLAR_FIELDS = new Set([
  "sunspot_noaa",
  "sunspot_silso",
  "sunspot_predicted",
  "sunspot_silso_predicted",
  "xray_flux",
  "xray_series",
  "flares",
  "cme",
  "radio_burst",
  "solar_flux",
  "proton_flux_live",
  "electron_flux_live",
  "heavy_ion_flux_live",
  "aurora_live",
  "radiation",
  "ionosphere",
  "magnetosphere",
  "operational",
]);

let selectedNasaImageName = null;
let nasaSlideshowPaused = false;
let nasaSlideshowTimer = null;
let lastNasaGalleryLatest = null;
let refreshInFlight = false;
let cachedSolarPayload = null;
let cachedSolarAt = 0;
let lastTurkeyRiskContext = null;
let notificationAutoInFlight = false;
let notificationAutomationKey = null;
let chartTooltipNode = null;
let initialRefreshScheduled = false;
let kpQueryInFlight = false;
let solarWindQueryInFlight = false;
let imfBzQueryInFlight = false;

const simulationState = {
  ctx: null,
  frameId: null,
  lastTime: 0,
  width: 0,
  height: 0,
  dpr: 1,
  quality: "high",
  frameIntervalMs: 34,
  stars: [],
  particles: [],
  metrics: null,
  solar: null,
  selectedPoint: null,
  currentEarth: null,
  interactionBound: false,
  lastPointRenderAt: 0,
};

const levelClass = {
  normal: "badge-normal",
  watch: "badge-watch",
  warning: "badge-warning",
  severe: "badge-severe",
};

const levelLabel = {
  normal: "Normal",
  watch: "\u0130zleme",
  warning: "Uyar\u0131",
  severe: "\u015eiddetli",
};

const confidenceLabel = {
  dusuk: "D\u00fc\u015f\u00fck",
  orta: "Orta",
  yuksek: "Y\u00fcksek",
};

const cmeStatusLabel = {
  quiet: "Sakin",
  monitor: "\u0130zleme",
  watch: "Yak\u0131n Etki",
  active: "Etkide",
};

const cmeStatusBadgeClass = {
  quiet: "badge-neutral",
  monitor: "badge-normal",
  watch: "badge-watch",
  active: "badge-warning",
};

const accessModeLabel = {
  local_only: "Yerel",
  lan_share: "Sabit Link",
  public_tunnel_pending: "Haz\u0131rlan\u0131yor",
  public_tunnel: "D\u0131\u015f A\u011f A\u00e7\u0131k",
  public_tunnel_error: "T\u00fcnel Hatas\u0131",
};

const accessModeBadgeClass = {
  local_only: "badge-neutral",
  lan_share: "badge-normal",
  public_tunnel_pending: "badge-watch",
  public_tunnel: "badge-normal",
  public_tunnel_error: "badge-warning",
};

const turkeyRiskState = {
  sector: "savunma",
  layer: "overall",
  selectedCity: "Ankara",
  cityPickerOpen: false,
};

const satellitePanelState = {
  orbitType: "LEO",
  altitudeKm: 550,
  exposureBand: "mid",
  shieldingLevel: 5,
  manualOverride: false,
  overrideKp: 4.0,
  overrideXrayBand: "Low",
};

const SATELLITE_PRESETS = {
  leo_420: { label: "LEO 420", orbitType: "LEO", altitudeKm: 420, exposureBand: "mid", shieldingLevel: 6 },
  leo_550: { label: "SSO 550", orbitType: "LEO", altitudeKm: 550, exposureBand: "polar", shieldingLevel: 4 },
  meo_20200: { label: "GNSS MEO", orbitType: "MEO", altitudeKm: 20200, exposureBand: "high", shieldingLevel: 6 },
  geo_35786: { label: "GEO 35786", orbitType: "GEO", altitudeKm: 35786, exposureBand: "equatorial", shieldingLevel: 9 },
};

const SATELLITE_EXPOSURE_LABELS = {
  equatorial: "Ekvatoryal",
  mid: "Orta enlem",
  high: "Y\u00fcksek enlem",
  polar: "Kutup ge\u00e7i\u015fli",
};

const SATELLITE_REFERENCE_PROFILES = [
  {
    key: "polar_cubesat",
    name: "Polar CubeSat referans\u0131",
    orbitType: "LEO",
    altitudeKm: 350,
    exposureBand: "polar",
    representativeLat: 78,
    shieldingLevel: 2,
    note: "K\u00fc\u00e7\u00fck platform, y\u00fcksek kutup ge\u00e7i\u015fi ve zay\u0131f koruma",
  },
  {
    key: "iss_like",
    name: "ISS benzeri LEO",
    orbitType: "LEO",
    altitudeKm: 420,
    exposureBand: "mid",
    representativeLat: 51.6,
    shieldingLevel: 7,
    note: "Orta enlem ge\u00e7i\u015fi ve g\u00fc\u00e7l\u00fc ya\u015famsal koruma",
  },
  {
    key: "gnss_meo",
    name: "GNSS MEO referans\u0131",
    orbitType: "MEO",
    altitudeKm: 20200,
    exposureBand: "high",
    representativeLat: 55,
    shieldingLevel: 6,
    note: "Y\u00fcksek irtifa navigasyon tak\u0131m\u0131",
  },
  {
    key: "turksat_geo",
    name: "T\u00fcrksat GEO benzeri",
    orbitType: "GEO",
    altitudeKm: 35786,
    exposureBand: "equatorial",
    representativeLat: 0,
    shieldingLevel: 9,
    note: "Ekvatoryal haberle\u015fme y\u00f6r\u00fcngesi ve g\u00fc\u00e7l\u00fc koruma",
  },
];

const TURKEY_SECTOR_LABELS = {
  genel: "Genel",
  savunma: "Savunma",
  tarim: "Tar\u0131m",
  havacilik: "Havac\u0131l\u0131k",
  enerji: "Enerji",
};

const TURKEY_LAYER_LABELS = {
  overall: "Genel Risk",
  gnss: "GNSS / Navigasyon",
  hf: "HF Radyo",
  geomag: "Jeomanyetik",
};

const TURKEY_SECTOR_WEIGHTS = {
  genel: { gnss: 0.40, hf: 0.30, geomag: 0.30 },
  savunma: { gnss: 0.40, hf: 0.35, geomag: 0.25 },
  tarim: { gnss: 0.55, hf: 0.15, geomag: 0.30 },
  havacilik: { gnss: 0.45, hf: 0.35, geomag: 0.20 },
  enerji: { gnss: 0.15, hf: 0.20, geomag: 0.65 },
};

const TURKEY_CITY_DATA = [
  { name: "\u0130stanbul", lat: 41.0082, lon: 28.9784, popWeight: 1.00, agriWeight: 0.35, defenseWeight: 0.85 },
  { name: "Kocaeli", lat: 40.7654, lon: 29.9408, popWeight: 0.72, agriWeight: 0.35, defenseWeight: 0.78 },
  { name: "Bursa", lat: 40.1950, lon: 29.0600, popWeight: 0.76, agriWeight: 0.58, defenseWeight: 0.55 },
  { name: "Ankara", lat: 39.9334, lon: 32.8597, popWeight: 0.86, agriWeight: 0.52, defenseWeight: 1.00 },
  { name: "Konya", lat: 37.8746, lon: 32.4932, popWeight: 0.60, agriWeight: 1.00, defenseWeight: 0.70 },
  { name: "Eski\u015fehir", lat: 39.7667, lon: 30.5256, popWeight: 0.52, agriWeight: 0.62, defenseWeight: 0.82 },
  { name: "\u0130zmir", lat: 38.4237, lon: 27.1428, popWeight: 0.83, agriWeight: 0.54, defenseWeight: 0.68 },
  { name: "Antalya", lat: 36.8969, lon: 30.7133, popWeight: 0.71, agriWeight: 0.66, defenseWeight: 0.48 },
  { name: "Adana", lat: 37.0000, lon: 35.3213, popWeight: 0.68, agriWeight: 0.84, defenseWeight: 0.74 },
  { name: "Mersin", lat: 36.8000, lon: 34.6333, popWeight: 0.60, agriWeight: 0.80, defenseWeight: 0.59 },
  { name: "Gaziantep", lat: 37.0662, lon: 37.3833, popWeight: 0.66, agriWeight: 0.78, defenseWeight: 0.72 },
  { name: "\u015eanl\u0131urfa", lat: 37.1674, lon: 38.7955, popWeight: 0.56, agriWeight: 0.96, defenseWeight: 0.58 },
  { name: "Diyarbak\u0131r", lat: 37.9144, lon: 40.2306, popWeight: 0.53, agriWeight: 0.74, defenseWeight: 0.80 },
  { name: "Kayseri", lat: 38.7225, lon: 35.4875, popWeight: 0.58, agriWeight: 0.66, defenseWeight: 0.73 },
  { name: "Samsun", lat: 41.2867, lon: 36.3300, popWeight: 0.57, agriWeight: 0.64, defenseWeight: 0.67 },
  { name: "Trabzon", lat: 41.0015, lon: 39.7178, popWeight: 0.49, agriWeight: 0.38, defenseWeight: 0.61 },
  { name: "Erzurum", lat: 39.9043, lon: 41.2679, popWeight: 0.41, agriWeight: 0.46, defenseWeight: 0.69 },
  { name: "Van", lat: 38.5012, lon: 43.3720, popWeight: 0.38, agriWeight: 0.42, defenseWeight: 0.76 },
  { name: "Malatya", lat: 38.3552, lon: 38.3095, popWeight: 0.44, agriWeight: 0.69, defenseWeight: 0.63 },
  { name: "Edirne", lat: 41.6771, lon: 26.5557, popWeight: 0.33, agriWeight: 0.55, defenseWeight: 0.42 },
];

const SIMULATION_PLACE_ANCHORS = [
  { name: "\u0130stanbul, T\u00fcrkiye", lat: 41.0082, lon: 28.9784 },
  { name: "Londra, Birle\u015fik Krall\u0131k", lat: 51.5074, lon: -0.1278 },
  { name: "Paris, Fransa", lat: 48.8566, lon: 2.3522 },
  { name: "Madrid, \u0130spanya", lat: 40.4168, lon: -3.7038 },
  { name: "Roma, \u0130talya", lat: 41.9028, lon: 12.4964 },
  { name: "Moskova, Rusya", lat: 55.7558, lon: 37.6173 },
  { name: "Kahire, M\u0131s\u0131r", lat: 30.0444, lon: 31.2357 },
  { name: "Nairobi, Kenya", lat: -1.2921, lon: 36.8219 },
  { name: "Cape Town, G\u00fcney Afrika", lat: -33.9249, lon: 18.4241 },
  { name: "Dubai, BAE", lat: 25.2048, lon: 55.2708 },
  { name: "Delhi, Hindistan", lat: 28.6139, lon: 77.2090 },
  { name: "Bangkok, Tayland", lat: 13.7563, lon: 100.5018 },
  { name: "Pekin, \u00c7in", lat: 39.9042, lon: 116.4074 },
  { name: "Tokyo, Japonya", lat: 35.6762, lon: 139.6503 },
  { name: "Seul, G\u00fcney Kore", lat: 37.5665, lon: 126.9780 },
  { name: "Sidney, Avustralya", lat: -33.8688, lon: 151.2093 },
  { name: "Auckland, Yeni Zelanda", lat: -36.8509, lon: 174.7645 },
  { name: "Anchorage, Alaska", lat: 61.2181, lon: -149.9003 },
  { name: "Vancouver, Kanada", lat: 49.2827, lon: -123.1207 },
  { name: "New York, ABD", lat: 40.7128, lon: -74.0060 },
  { name: "Mexico City, Meksika", lat: 19.4326, lon: -99.1332 },
  { name: "Bogota, Kolombiya", lat: 4.7110, lon: -74.0721 },
  { name: "Lima, Peru", lat: -12.0464, lon: -77.0428 },
  { name: "Santiago, \u015eili", lat: -33.4489, lon: -70.6693 },
  { name: "Sao Paulo, Brezilya", lat: -23.5505, lon: -46.6333 },
  { name: "Buenos Aires, Arjantin", lat: -34.6037, lon: -58.3816 },
];

const SIMULATION_PLACE_REGIONS = [
  { name: "T\u00fcrkiye", minLat: 35, maxLat: 42.5, minLon: 25, maxLon: 45 },
  { name: "Bat\u0131 Avrupa", minLat: 36, maxLat: 61, minLon: -11, maxLon: 15 },
  { name: "Do\u011fu Avrupa", minLat: 42, maxLat: 65, minLon: 15, maxLon: 45 },
  { name: "Kuzey Afrika", minLat: 15, maxLat: 37, minLon: -17, maxLon: 36 },
  { name: "Orta Do\u011fu", minLat: 12, maxLat: 42, minLon: 35, maxLon: 63 },
  { name: "Orta Asya", minLat: 35, maxLat: 56, minLon: 45, maxLon: 92 },
  { name: "G\u00fcney Asya", minLat: 5, maxLat: 35, minLon: 63, maxLon: 92 },
  { name: "Do\u011fu Asya", minLat: 18, maxLat: 55, minLon: 92, maxLon: 150 },
  { name: "G\u00fcneydo\u011fu Asya", minLat: -10, maxLat: 23, minLon: 92, maxLon: 141 },
  { name: "Avustralya", minLat: -45, maxLat: -10, minLon: 110, maxLon: 156 },
  { name: "Kuzey Amerika", minLat: 15, maxLat: 72, minLon: -170, maxLon: -52 },
  { name: "Orta Amerika", minLat: 7, maxLat: 24, minLon: -118, maxLon: -74 },
  { name: "G\u00fcney Amerika", minLat: -56, maxLat: 13, minLon: -82, maxLon: -34 },
  { name: "Atlas Okyanusu", minLat: -60, maxLat: 65, minLon: -70, maxLon: 20 },
  { name: "Pasifik Okyanusu", minLat: -60, maxLat: 65, minLon: 150, maxLon: -70 },
  { name: "Hint Okyanusu", minLat: -55, maxLat: 25, minLon: 20, maxLon: 120 },
  { name: "Arktik B\u00f6lge", minLat: 65, maxLat: 90, minLon: -180, maxLon: 180 },
  { name: "Antarktika Yak\u0131n\u0131", minLat: -90, maxLat: -60, minLon: -180, maxLon: 180 },
];

const TURKEY_BOUNDS = {
  minLon: 25.5,
  maxLon: 45.0,
  minLat: 35.5,
  maxLat: 42.5,
};

const TURKEY_RISK_STOPS = [
  { value: 0, color: [34, 197, 94] },
  { value: 20, color: [132, 204, 22] },
  { value: 40, color: [250, 204, 21] },
  { value: 60, color: [249, 115, 22] },
  { value: 80, color: [239, 68, 68] },
  { value: 100, color: [168, 85, 247] },
];

function formatNumber(value, digits = 1) {
  if (value === null || value === undefined) return "-";
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(digits) : "-";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseUtcDate(value) {
  if (!value) return null;
  const normalized = /[zZ]|[+\-]\d{2}:\d{2}$/.test(value) ? value : `${value}Z`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value) {
  if (!value) return "HenÃ¼z veri yok.";
  const date = parseUtcDate(value);
  if (!date) return value;
  return date.toLocaleString("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Istanbul",
  });
}

function formatDayText(value) {
  if (!value) return "-";
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("tr-TR", {
    dateStyle: "long",
    timeZone: "UTC",
  });
}

function clampNumber(value, minValue, maxValue) {
  if (!Number.isFinite(value)) return null;
  return Math.min(maxValue, Math.max(minValue, value));
}

function parseNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function extractNumberFromRow(row, keys) {
  if (!row) return null;
  for (const key of keys) {
    const value = parseNumber(row[key]);
    if (value !== null) return value;
  }
  return null;
}

function latestRow(rows, timeKeys = ["time_tag", "time", "date", "timestamp"]) {
  if (!Array.isArray(rows) || !rows.length) return null;
  let latest = null;
  let latestTime = null;
  for (const row of rows) {
    const rawTime = timeKeys.map((key) => row?.[key]).find((value) => value);
    const parsed = rawTime ? parseUtcDate(rawTime) : null;
    if (!parsed) continue;
    if (!latestTime || parsed > latestTime) {
      latestTime = parsed;
      latest = row;
    }
  }
  return latest || rows[rows.length - 1];
}

function parseFlareClassLabel(value) {
  if (!value) return null;
  const match = String(value).trim().match(/^([ABCMX])\s*([0-9.]+)?/i);
  if (!match) return null;
  const label = match[1].toUpperCase();
  const magnitude = match[2] ? Number(match[2]) : 1;
  return Number.isFinite(magnitude) ? { class: label, magnitude } : { class: label, magnitude: 1 };
}

function xrayFluxFromClass(flareClass) {
  if (!flareClass) return null;
  const baseMap = {
    A: 1e-8,
    B: 1e-7,
    C: 1e-6,
    M: 1e-5,
    X: 1e-4,
  };
  const base = baseMap[flareClass.class];
  if (!base) return null;
  return base * (flareClass.magnitude || 1);
}

function xrayClassFromFlux(flux) {
  const value = parseNumber(flux);
  if (value === null) return null;
  const classes = [
    { class: "X", base: 1e-4 },
    { class: "M", base: 1e-5 },
    { class: "C", base: 1e-6 },
    { class: "B", base: 1e-7 },
    { class: "A", base: 1e-8 },
  ];
  for (const entry of classes) {
    if (value >= entry.base) {
      const magnitude = Math.max(0.1, Math.round((value / entry.base) * 10) / 10);
      return { class: entry.class, magnitude };
    }
  }
  return { class: "A", magnitude: 0.1 };
}

function estimateSolarFluxFromSSN(ssn) {
  const value = parseNumber(ssn);
  if (value === null) return null;
  return Math.round((63.7 + (0.728 * value) + (0.00089 * value * value)) * 10) / 10;
}

function estimateSunspotFromSolarFlux(flux) {
  const value = parseNumber(flux);
  if (value === null) return null;
  return Math.max(0, Math.round((value - 63.7) / 0.73));
}

async function fetchJsonWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

async function fetchTextWithTimeout(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

async function postJsonWithTimeout(url, body, timeoutMs = 10000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body || {}),
      signal: controller.signal,
      cache: "no-store",
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Istek basarisiz oldu.");
    }
    return payload;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("Istek zaman asimina ugradi.");
    }
    throw error;
  } finally {
    window.clearTimeout(timer);
  }
}

function kpQueryRiskBadgeClass(kpValue) {
  const numeric = parseNumber(kpValue) ?? 0;
  if (numeric >= 8) return "badge-severe";
  if (numeric >= 5) return "badge-warning";
  if (numeric >= 4) return "badge-watch";
  return "badge-normal";
}

function kpQueryModeLabel(mode) {
  return mode === "forecast" ? "Tahmin" : "Ger\u00e7ek Ar\u015fiv";
}

function setKpQueryStatus(message, tone = "neutral") {
  if (!elements.kpQueryStatus) {
    return;
  }
  elements.kpQueryStatus.textContent = repairMojibakeText(message);
  elements.kpQueryStatus.classList.remove("is-loading", "is-error", "is-ready");
  if (tone === "loading") {
    elements.kpQueryStatus.classList.add("is-loading");
  } else if (tone === "error") {
    elements.kpQueryStatus.classList.add("is-error");
  } else if (tone === "ready") {
    elements.kpQueryStatus.classList.add("is-ready");
  }
}

function renderKpQueryEmpty(message) {
  if (!elements.kpQueryResult) {
    return;
  }
  elements.kpQueryResult.innerHTML = `
    <article class="impact-card impact-empty">
      <p>${escapeHtml(repairMojibakeText(message))}</p>
    </article>
  `;
  repairDocumentEncoding(elements.kpQueryResult);
}

function openKpQueryDatePicker() {
  if (!elements.kpQueryDateInput) {
    return;
  }
  const input = elements.kpQueryDateInput;
  if (typeof input.showPicker === "function") {
    try {
      input.showPicker();
      return;
    } catch (error) {
      // Some browsers require a direct user gesture or do not expose showPicker.
    }
  }
  try {
    input.focus({ preventScroll: true });
  } catch (error) {
    input.focus();
  }
  input.click();
}

function updateKpQueryDateHint(payload) {
  if (!elements.kpQueryDateInput) {
    return;
  }
  const availableFrom = String(payload?.available_from || "").trim();
  const availableTo = String(payload?.available_to || "").trim();

  if (availableFrom) {
    elements.kpQueryDateInput.min = availableFrom;
  }
  elements.kpQueryDateInput.step = "1";

  if (!elements.kpQueryDateHint) {
    return;
  }

  if (availableFrom && availableTo) {
    elements.kpQueryDateHint.innerHTML = `Ger\u00e7ek veri aral\u0131\u011f\u0131: <code>${escapeHtml(availableFrom)}</code> \u2192 <code>${escapeHtml(availableTo)}</code>. Daha ileri tarihler i\u00e7in mevcut \u00f6ng\u00f6r\u00fc sonucu g\u00f6sterilir.`;
    return;
  }

  elements.kpQueryDateHint.innerHTML = "Takvimden bir g\u00fcn se\u00e7ebilir ya da alana <code>YYYY-AA-GG</code> bi\u00e7iminde tarih yazabilirsin.";
}

function renderKpQueryResult(payload) {
  if (!elements.kpQueryResult) {
    return;
  }

  const result = payload?.result || {};
  const actual = result.actual_record || null;
  const analogs = Array.isArray(result.analog_cycles) ? result.analog_cycles : [];
  const hideCyclePhrasing = true;
  const hideAnalogSection = true;
  const notes = Array.isArray(result.notes)
    ? (hideCyclePhrasing
      ? result.notes.filter((note) => !/cycle|analog/i.test(String(note)))
      : result.notes)
    : [];
  const kpValue = parseNumber(result.daily_max_kp);
  const riskClass = kpQueryRiskBadgeClass(kpValue);
  const modeLabel = kpQueryModeLabel(result.mode);
  const confidenceText = result.mode === "observed"
    ? "Kesin"
    : `%${formatNumber(result.confidence_percent, 0)}`;
  const cycleText = "Tarih bazlÄ± sorgu";
  const phaseText = result.mode === "forecast" ? "Ä°leri tarih sonucu" : "ArÅŸiv kaydÄ±";
  const detailCards = [
    {
      label: "Beklenen aralÄ±k",
      value: `${formatNumber(result.expected_kp_range?.[0], 2)} â€“ ${formatNumber(result.expected_kp_range?.[1], 2)}`,
      note: result.mode === "observed" ? "GerÃ§ek Ã¶lÃ§Ã¼m satÄ±rÄ±yla birebir aynÄ± aralÄ±k" : "Analog cycle'larÄ±n birleÅŸik tahmin bandÄ±",
    },
    {
      label: "Risk seviyesi",
      value: result.risk_level || "-",
      note: "GÃ¼nlÃ¼k maksimum Kp deÄŸerine gÃ¶re yorum",
    },
    {
      label: "GÃ¼ven",
      value: confidenceText,
      note: result.mode === "observed" ? "GFZ gÃ¼nlÃ¼k arÅŸiv satÄ±rÄ±" : "Cycle 21â€“24 benzerliÄŸi",
    },
    {
      label: "Kaynak penceresi",
      value: `${escapeHtml(payload.available_from || "-")} â†’ ${escapeHtml(payload.available_to || "-")}`,
      note: escapeHtml(result.source_file || "Kp_ap_Ap_SN_F107_since_1932.txt"),
    },
  ];
  if (detailCards[0]) {
    detailCards[0].note = result.mode === "observed"
      ? "GerÃ§ek Ã¶lÃ§Ã¼m kaydÄ±yla birebir aynÄ± aralÄ±k"
      : "Modelin hesapladÄ±ÄŸÄ± beklenti bandÄ±";
  }
  if (detailCards[2]) {
    detailCards[2].note = result.mode === "observed"
      ? "GFZ gÃ¼nlÃ¼k arÅŸiv satÄ±rÄ±"
      : "Mevcut tahmin sonucunun gÃ¼ven dÃ¼zeyi";
  }
  if (detailCards[3]) {
    detailCards[3].note = "GFZ gÃ¼nlÃ¼k veri dosyasÄ±";
  }

  const actualCycleSlotHidden = hideCyclePhrasing
    ? ""
    : `
          <span class="kp-query-slot">
            <strong>Cycle</strong>
            <span>${actual?.cycle ? `Cycle ${escapeHtml(actual.cycle)}` : "Yok"}</span>
          </span>
        `;

  const actualCycleSlot = hideCyclePhrasing
    ? ""
    : `
          <span class="kp-query-slot">
            <strong>Cycle</strong>
            <span>${actual?.cycle ? `Cycle ${escapeHtml(actual.cycle)}` : "Yok"}</span>
          </span>
        `;

  const actualMetrics = actual
    ? `
      <section class="kp-query-section">
        <div class="panel-head-inline">
          <h3>GerÃ§ek kayÄ±t Ã¶zeti</h3>
          <span class="badge badge-normal">GFZ gÃ¼nlÃ¼k veri</span>
        </div>
        <div class="kp-query-metric-grid">
          <article class="kp-query-mini-card">
            <span>Ap</span>
            <strong>${formatNumber(actual.ap_daily, 0)}</strong>
            <p>GÃ¼nlÃ¼k ap indeksi</p>
          </article>
          <article class="kp-query-mini-card">
            <span>GÃ¼neÅŸ lekesi</span>
            <strong>${formatNumber(actual.sunspot_number, 0)}</strong>
            <p>Dosyadaki gÃ¼nlÃ¼k gÃ¼neÅŸ lekesi sayÄ±sÄ±</p>
          </article>
          <article class="kp-query-mini-card">
            <span>F10.7</span>
            <strong>${formatNumber(actual.f107_observed, 1)}</strong>
            <p>GÃ¶zlenen radyo akÄ±sÄ±</p>
          </article>
          <article class="kp-query-mini-card">
            <span>Kesinlik</span>
            <strong>${actual.definitive_flag === 2 ? "Definitive" : actual.definitive_flag === 1 ? "KÄ±smi" : "Ã–n"}</strong>
            <p>GFZ kalite iÅŸareti</p>
          </article>
        </div>
        <div class="kp-query-slot-row">
          ${Array.isArray(actual.kp_values)
            ? actual.kp_values.map((value, index) => `
              <span class="kp-query-slot">
                <strong>${index + 1}. dilim</strong>
                <span>${formatNumber(value, 2)}</span>
              </span>
            `).join("")
            : ""}
        </div>
      </section>
    `
    : "";

  const analogMetrics = analogs.length
    ? `
      <section class="kp-query-section">
        <div class="panel-head-inline">
          <h3>Cycle analoglarÄ±</h3>
          <span class="badge badge-watch">${analogs.length} benzer cycle</span>
        </div>
        <div class="kp-query-analog-grid">
          ${analogs.map((item) => `
            <article class="kp-query-analog-card">
              <div class="kp-query-analog-head">
                <strong>Cycle ${escapeHtml(item.cycle)}</strong>
                <span>${escapeHtml(item.analog_anchor_date || "-")}</span>
              </div>
              <div class="kp-query-analog-values">
                <span>AÄŸÄ±rlÄ±klÄ± Kp <strong>${formatNumber(item.weighted_kp, 2)}</strong></span>
                <span>AralÄ±k <strong>${formatNumber(item.expected_low, 2)} â€“ ${formatNumber(item.expected_high, 2)}</strong></span>
              </div>
              <p>Faz farkÄ± ${formatNumber(item.phase_day_offset, 0)} gÃ¼n â€¢ mevsim farkÄ± ${formatNumber(item.seasonal_offset_days, 0)} gÃ¼n â€¢ ${formatNumber(item.neighbor_count, 0)} komÅŸu gÃ¼n</p>
            </article>
          `).join("")}
        </div>
      </section>
    `
    : "";

  const notesMarkup = notes.length
    ? `
      <section class="kp-query-section">
        <div class="panel-head-inline">
          <h3>Yorum notlarÄ±</h3>
          <span class="badge badge-neutral">Model aÃ§Ä±klamasÄ±</span>
        </div>
        <div class="kp-query-note-list">
          ${notes.map((note) => `<p class="kp-query-note">${escapeHtml(note)}</p>`).join("")}
        </div>
      </section>
    `
    : "";

  elements.kpQueryResult.innerHTML = `
    <div class="kp-query-summary-grid">
      <article class="kp-query-hero-card">
        <div class="kp-query-hero-top">
          <div>
            <span class="kp-query-kicker">${escapeHtml(modeLabel)}</span>
            <h3>${escapeHtml(formatDayText(result.query_date))}</h3>
          </div>
          <div class="kp-query-badges">
            <span class="badge ${result.mode === "forecast" ? "badge-watch" : "badge-normal"}">${escapeHtml(modeLabel)}</span>
            <span class="badge ${riskClass}">${escapeHtml(result.risk_level || "-")}</span>
          </div>
        </div>
        <p class="kp-query-main-value">${formatNumber(kpValue, 2)}</p>
        <p class="kp-query-main-meta">GÃ¼nlÃ¼k maksimum Kp â€¢ ${escapeHtml(cycleText)} â€¢ ${escapeHtml(phaseText)}</p>
      </article>
      ${detailCards.map((card) => `
        <article class="kp-query-mini-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          <p>${escapeHtml(card.note)}</p>
        </article>
      `).join("")}
    </div>
    ${actualMetrics}
    ${notesMarkup}
  `;
  repairDocumentEncoding(elements.kpQueryResult);
}

const LOCAL_PANEL_QUERY_PORTS = ["8095", "8096", "8097", "8080"];

function buildArchiveQueryUrls(path, dateText, extraUrls = []) {
  const queryUrl = `${path}?date=${encodeURIComponent(dateText)}`;
  const urls = [queryUrl, ...extraUrls];
  const hostname = window.location.hostname;
  const currentPort = String(window.location.port || "");

  if (hostname === "127.0.0.1" || hostname === "localhost" || hostname === "") {
    LOCAL_PANEL_QUERY_PORTS.forEach((port) => {
      if (port === currentPort) {
        return;
      }
      urls.push(`http://127.0.0.1:${port}${queryUrl}`);
      urls.push(`http://localhost:${port}${queryUrl}`);
    });
  }

  return [...new Set(urls)];
}

async function fetchKpDailyQuery(dateText, timeoutMs = 12000) {
  const urls = buildArchiveQueryUrls(
    "/api/kp-daily",
    dateText,
    [`http://127.0.0.1:8092/api/kp-daily?date=${encodeURIComponent(dateText)}`],
  );
  let lastError = null;

  for (const url of urls) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Kp sorgusu basarisiz oldu.");
      }
      return payload;
    } catch (error) {
      lastError = error;
    } finally {
      window.clearTimeout(timer);
    }
  }

  if (lastError?.name === "AbortError") {
    throw new Error("Kp sorgusu zaman asimina ugradi.");
  }
  throw lastError || new Error("Kp sorgusu basarisiz oldu.");
}

async function runKpDailyQuery(dateText) {
  if (!elements.kpQueryResult || !elements.kpQueryDateInput) {
    return;
  }
  const normalizedDate = String(dateText || "").trim();
  if (!normalizedDate) {
    setKpQueryStatus("\u00d6nce bir tarih girmen gerekiyor.", "error");
    renderKpQueryEmpty("Tarih se\u00e7meden sorgu yap\u0131lamaz.");
    return;
  }
  if (kpQueryInFlight) {
    return;
  }
  kpQueryInFlight = true;
  if (elements.kpQuerySubmit) {
    elements.kpQuerySubmit.disabled = true;
  }
  setKpQueryStatus("GFZ g\u00fcnl\u00fck ar\u015fiv kayd\u0131 ve tarih bazl\u0131 Kp sonucu sorgulan\u0131yor.", "loading");
  try {
    const payload = await fetchKpDailyQuery(normalizedDate);
    const result = payload?.result || {};
    if (elements.kpQueryAvailability) {
      elements.kpQueryAvailability.textContent = `${payload.available_from || "-"} \u2192 ${payload.available_to || "-"}`;
    }
    updateKpQueryDateHint(payload);
    renderKpQueryResult(payload);
    setKpQueryStatus(
      result.mode === "forecast"
        ? "Ger\u00e7ek veri aral\u0131\u011f\u0131n\u0131n \u00f6tesinde oldu\u011fun i\u00e7in ileri tarih \u00f6ng\u00f6r\u00fcs\u00fc g\u00f6steriliyor."
        : "Girilen tarih veri dosyas\u0131nda bulundu; ger\u00e7ek g\u00fcnl\u00fck maksimum Kp g\u00f6steriliyor.",
      "ready",
    );
  } catch (error) {
    const message = error?.message || "Kp sorgusu s\u0131ras\u0131nda beklenmeyen bir hata olu\u015ftu.";
    setKpQueryStatus(message, "error");
    renderKpQueryEmpty(message);
  } finally {
    kpQueryInFlight = false;
    if (elements.kpQuerySubmit) {
      elements.kpQuerySubmit.disabled = false;
    }
  }
}

function initKpQueryPanel() {
  if (!elements.kpQueryDateInput || !elements.kpQueryResult) {
    return;
  }
  const today = new Date();
  const todayIso = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
  elements.kpQueryDateInput.step = "1";
  elements.kpQueryDateInput.value = todayIso;
  updateKpQueryDateHint();

  if (elements.kpQueryOpenPicker) {
    elements.kpQueryOpenPicker.addEventListener("click", () => {
      openKpQueryDatePicker();
    });
  }

  if (elements.kpQuerySubmit) {
    elements.kpQuerySubmit.addEventListener("click", () => {
      runKpDailyQuery(elements.kpQueryDateInput.value);
    });
  }

  elements.kpQueryDateInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runKpDailyQuery(elements.kpQueryDateInput.value);
    }
  });

  elements.kpQueryDateInput.addEventListener("change", () => {
    if (!elements.kpQueryDateInput.value) {
      return;
    }
    runKpDailyQuery(elements.kpQueryDateInput.value);
  });

  document.querySelectorAll("[data-kp-query-date]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetDate = button.getAttribute("data-kp-query-date") || "";
      elements.kpQueryDateInput.value = targetDate;
      runKpDailyQuery(targetDate);
    });
  });

  runKpDailyQuery(todayIso).catch(() => {});
}

const archiveQueryConfigs = {
  solarWind: {
    key: "solarWind",
    metricKey: "solar_wind_speed",
    unit: "km/s",
    decimals: 2,
    signed: false,
    hideCyclePhrasing: true,
    hideAnalogSection: true,
    availabilityEl: elements.solarWindQueryAvailability,
    inputEl: elements.solarWindQueryDateInput,
    openPickerEl: elements.solarWindQueryOpenPicker,
    dateHintEl: elements.solarWindQueryDateHint,
    submitEl: elements.solarWindQuerySubmit,
    statusEl: elements.solarWindQueryStatus,
    resultEl: elements.solarWindQueryResult,
    exampleSelector: "[data-solar-wind-query-date]",
    fetchUrl: "/api/solar-wind-query",
    loadingMessage: "RTSW 5 g\u00fcnl\u00fck g\u00fcne\u015f r\u00fczg\u00e2r\u0131 kayd\u0131 ve tarih bazl\u0131 h\u0131z sonucu sorgulan\u0131yor.",
    readyObservedMessage: "Girilen tarih i\u00e7in ger\u00e7ek 5 g\u00fcnl\u00fck g\u00fcne\u015f r\u00fczg\u00e2r\u0131 blo\u011fu g\u00f6steriliyor.",
    readyForecastMessage: "Ger\u00e7ek veri aral\u0131\u011f\u0131n\u0131n \u00f6tesinde oldu\u011fun i\u00e7in ileri tarih \u00f6ng\u00f6r\u00fcs\u00fc g\u00f6steriliyor.",
    missingDateMessage: "Tarih se\u00e7meden g\u00fcne\u015f r\u00fczg\u00e2r\u0131 sorgusu yap\u0131lamaz.",
    failureMessage: "G\u00fcne\u015f r\u00fczg\u00e2r\u0131 sorgusu ba\u015far\u0131s\u0131z oldu.",
    timeoutMessage: "G\u00fcne\u015f r\u00fczg\u00e2r\u0131 sorgusu zaman a\u015f\u0131m\u0131na u\u011frad\u0131.",
    statusIntro: "\u00d6nce bir tarih girmen gerekiyor.",
    sourceFileFallback: "rtsw_plot_data_1998-01-01T00_00_00.txt",
    defaultDateHint: "Takvimden bir g\u00fcn se\u00e7ebilir ya da alana <code>YYYY-AA-GG</code> bi\u00e7iminde tarih yazabilirsin.",
    futureDateHint: "Daha ileri tarihler i\u00e7in mevcut \u00f6ng\u00f6r\u00fc sonucu g\u00f6sterilir.",
  },
  imfBz: {
    key: "imfBz",
    metricKey: "imf_bz",
    unit: "nT",
    decimals: 2,
    signed: true,
    hideCyclePhrasing: true,
    hideAnalogSection: true,
    hideAvailableRange: true,
    availabilitySummary: "Arşiv hazır",
    availabilityEl: elements.imfBzQueryAvailability,
    inputEl: elements.imfBzQueryDateInput,
    openPickerEl: elements.imfBzQueryOpenPicker,
    dateHintEl: elements.imfBzQueryDateHint,
    submitEl: elements.imfBzQuerySubmit,
    statusEl: elements.imfBzQueryStatus,
    resultEl: elements.imfBzQueryResult,
    exampleSelector: "[data-imf-bz-query-date]",
    fetchUrl: "/api/imf-bz-query",
    loadingMessage: "RTSW 5 g\u00fcnl\u00fck IMF Bz ar\u015fivi ve tarih bazl\u0131 sonu\u00e7 sorgulan\u0131yor.",
    readyObservedMessage: "Girilen tarih i\u00e7in ger\u00e7ek 5 g\u00fcnl\u00fck IMF Bz blo\u011fu g\u00f6steriliyor.",
    readyForecastMessage: "Ger\u00e7ek veri aral\u0131\u011f\u0131n\u0131n \u00f6tesinde oldu\u011fun i\u00e7in ileri tarih \u00f6ng\u00f6r\u00fcs\u00fc g\u00f6steriliyor.",
    missingDateMessage: "Tarih se\u00e7meden IMF Bz sorgusu yap\u0131lamaz.",
    failureMessage: "IMF Bz sorgusu ba\u015far\u0131s\u0131z oldu.",
    timeoutMessage: "IMF Bz sorgusu zaman a\u015f\u0131m\u0131na u\u011frad\u0131.",
    statusIntro: "\u00d6nce bir tarih girmen gerekiyor.",
    sourceFileFallback: "rtsw_plot_data_1998-01-01T00_00_00.txt",
    sourceNote: "RTSW veri dosyas\u0131",
    defaultDateHint: "Takvimden bir g\u00fcn se\u00e7ebilir ya da alana <code>YYYY-AA-GG</code> bi\u00e7iminde tarih yazabilirsin.",
    futureDateHint: "Daha ileri tarihler i\u00e7in mevcut \u00f6ng\u00f6r\u00fc sonucu g\u00f6sterilir.",
    compactDateHint: "Takvimden bir g\u00fcn se\u00e7ebilir ya da alana <code>YYYY-AA-GG</code> bi\u00e7iminde tarih yazabilirsin. Daha ileri tarihler i\u00e7in mevcut \u00f6ng\u00f6r\u00fc sonucu g\u00f6sterilir.",
  },
};

function localTodayIso() {
  const today = new Date();
  return new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
}

function formatArchiveMetricNumber(config, value) {
  const numeric = parseNumber(value);
  if (numeric === null) {
    return "-";
  }
  return config.signed
    ? formatSignedNumber(numeric, config.decimals)
    : formatNumber(numeric, config.decimals);
}

function formatArchiveMetricValue(config, value) {
  const metric = formatArchiveMetricNumber(config, value);
  return metric === "-" ? "-" : `${metric} ${config.unit}`;
}

function archiveQueryLevelBadgeClass(result) {
  const numeric = parseNumber(result?.representative_value) ?? 0;
  const metricKey = String(result?.metric_key || "");
  if (metricKey === "solar_wind_speed") {
    if (numeric >= 550) return "badge-warning";
    if (numeric >= 450) return "badge-watch";
    return "badge-normal";
  }
  if (numeric <= -10) return "badge-severe";
  if (numeric <= -5) return "badge-warning";
  return "badge-normal";
}

function archiveQueryModeLabel(mode) {
  return mode === "forecast" ? "Tahmin" : "Ger\u00e7ek 5 G\u00fcnl\u00fck Ar\u015fiv";
}

function openArchiveQueryDatePicker(inputEl) {
  if (!inputEl) {
    return;
  }
  if (typeof inputEl.showPicker === "function") {
    try {
      inputEl.showPicker();
      return;
    } catch (error) {
      // Some browsers expose showPicker but still require focus or user gesture.
    }
  }
  try {
    inputEl.focus({ preventScroll: true });
  } catch (error) {
    inputEl.focus();
  }
  inputEl.click();
}

function updateArchiveQueryDateHint(config, payload) {
  if (config.inputEl) {
    config.inputEl.step = "1";
    if (payload?.available_from) {
      config.inputEl.min = String(payload.available_from);
    }
  }

  if (!config.dateHintEl) {
    return;
  }

  const defaultHint = config.defaultDateHint || "Takvimden bir g\u00fcn se\u00e7ebilir ya da alana <code>YYYY-AA-GG</code> bi\u00e7iminde tarih yazabilirsin.";
  const availableFrom = String(payload?.available_from || "").trim();
  const availableTo = String(payload?.available_to || "").trim();
  const futureHint = config.futureDateHint || "Daha ileri tarihler i\u00e7in Cycle 25 analog tahmini g\u00f6sterilir.";

  if (config.hideAvailableRange && availableFrom && availableTo) {
    config.dateHintEl.innerHTML = config.compactDateHint || `${defaultHint} ${futureHint}`;
    return;
  }

  if (availableFrom && availableTo) {
    config.dateHintEl.innerHTML = `Ger\u00e7ek veri aral\u0131\u011f\u0131: <code>${escapeHtml(availableFrom)}</code> \u2192 <code>${escapeHtml(availableTo)}</code>. ${escapeHtml(futureHint)}`;
  } else {
    config.dateHintEl.innerHTML = defaultHint;
  }

  repairDocumentEncoding(config.dateHintEl);
}

function setArchiveQueryStatus(config, message, tone = "neutral") {
  if (!config.statusEl) {
    return;
  }
  config.statusEl.textContent = repairMojibakeText(message);
  config.statusEl.classList.remove("is-loading", "is-error", "is-ready");
  if (tone === "loading") {
    config.statusEl.classList.add("is-loading");
  } else if (tone === "error") {
    config.statusEl.classList.add("is-error");
  } else if (tone === "ready") {
    config.statusEl.classList.add("is-ready");
  }
}

function renderArchiveQueryEmpty(config, message) {
  if (!config.resultEl) {
    return;
  }
  config.resultEl.innerHTML = `
    <article class="impact-card impact-empty">
      <p>${escapeHtml(repairMojibakeText(message))}</p>
    </article>
  `;
  repairDocumentEncoding(config.resultEl);
}

function renderArchiveQueryResult(config, payload) {
  if (!config.resultEl) {
    return;
  }

  const result = payload?.result || {};
  const actual = result.actual_record || null;
  const analogs = Array.isArray(result.analog_cycles) ? result.analog_cycles : [];
  const hideCyclePhrasing = Boolean(config.hideCyclePhrasing);
  const hideAnalogSection = Boolean(config.hideAnalogSection);
  const notes = Array.isArray(result.notes)
    ? (hideCyclePhrasing
      ? result.notes.filter((note) => !/cycle|analog/i.test(String(note)))
      : result.notes)
    : [];
  const modeLabel = archiveQueryModeLabel(result.mode);
  const levelBadgeClass = archiveQueryLevelBadgeClass(result);
  const cycleText = hideCyclePhrasing
    ? "Tarih bazlı sorgu"
    : (result.cycle ? `Cycle ${escapeHtml(result.cycle)}` : "Cycle bilgisi yok");
  const phaseText = hideCyclePhrasing
    ? (result.mode === "forecast" ? "İleri tarih sonucu" : "Arşiv kaydı")
    : (result.cycle_phase_label
      ? `%${formatNumber(result.cycle_phase_percent, 1)} faz - ${escapeHtml(result.cycle_phase_label)}`
      : "Faz bilgisi yok");
  const confidenceText = result.mode === "forecast"
    ? `${escapeHtml(result.confidence_label || "-")} (%${formatNumber(result.confidence_percent, 0)})`
    : "Kesin";
  const trainingCycles = Array.isArray(result.training_cycles) ? result.training_cycles : [];
  const trainingCyclesText = hideCyclePhrasing
    ? (result.mode === "forecast" ? "Tarih bazlı öngörü modeli" : "Gerçek RTSW arşivi")
    : (trainingCycles.length
      ? `Cycle ${trainingCycles.join("-")}`
      : (result.mode === "forecast" ? "Analog cycle k\u00fcmesi" : "Ger\u00e7ek RTSW ar\u015fivi"));

  const detailCards = [
    {
      label: "Beklenen aral\u0131k",
      value: `${formatArchiveMetricValue(config, result.expected_range?.[0])} - ${formatArchiveMetricValue(config, result.expected_range?.[1])}`,
      note: result.mode === "forecast"
        ? (hideCyclePhrasing ? "Modelin hesapladığı beklenti bandı" : "Cycle 23-24 analoglar\u0131ndan t\u00fcretilen beklenti band\u0131")
        : "Ger\u00e7ek 5 g\u00fcnl\u00fck RTSW blok aral\u0131\u011f\u0131",
    },
    {
      label: "Seviye",
      value: result.level_label || "-",
      note: result.summary_text || "Temsil\u00ee 5 g\u00fcnl\u00fck blok yorumu",
    },
    {
      label: "Tahmin dayana\u011f\u0131",
      value: trainingCyclesText,
      note: result.mode === "forecast"
        ? (hideCyclePhrasing
          ? "Seçilen tarih için hesaplanan ileri tarih öngörüsü bu veri kümesine dayanır"
          : "Tahmin, se\u00e7ilen tarihin Cycle 25 faz\u0131na yak\u0131n Cycle 23-24 bloklar\u0131ndan \u00fcretildi")
        : "Tarih veri aral\u0131\u011f\u0131nda oldu\u011fu i\u00e7in do\u011frudan RTSW ar\u015fiv kayd\u0131 kullan\u0131l\u0131yor",
    },
    {
      label: "G\u00fcven",
      value: confidenceText,
      note: result.mode === "forecast"
        ? "Aral\u0131k geni\u015fli\u011fine g\u00f6re \u00f6l\u00e7eklenen tahmin g\u00fcveni"
        : "Ger\u00e7ek veri kullan\u0131ld\u0131\u011f\u0131 i\u00e7in sonu\u00e7 kesin kabul edilir",
    },
    {
      label: config.hideAvailableRange ? "Arşiv durumu" : "Kaynak penceresi",
      value: config.hideAvailableRange
        ? escapeHtml(config.availabilitySummary || "Arşiv hazır")
        : `${escapeHtml(payload.available_from || "-")} \u2192 ${escapeHtml(payload.available_to || "-")}`,
      note: escapeHtml(config.sourceNote || result.source_file || config.sourceFileFallback),
    },
  ];

  const actualCycleSlot = hideCyclePhrasing
    ? ""
    : `
          <span class="kp-query-slot">
            <strong>Cycle</strong>
            <span>${actual?.cycle ? `Cycle ${escapeHtml(actual.cycle)}` : "Yok"}</span>
          </span>
        `;

  const actualMetrics = actual
    ? `
      <section class="kp-query-section">
        <div class="panel-head-inline">
          <h3>Ger\u00e7ek kay\u0131t \u00f6zeti</h3>
          <span class="badge badge-normal">RTSW 5 g\u00fcnl\u00fck veri</span>
        </div>
        <div class="kp-query-metric-grid">
          <article class="kp-query-mini-card">
            <span>${escapeHtml(result.value_label || "Temsil\u00ee de\u011fer")}</span>
            <strong>${escapeHtml(formatArchiveMetricValue(config, actual.representative_value))}</strong>
            <p>Se\u00e7ilen tarihin \u00e7evresindeki 5 g\u00fcnl\u00fck blok i\u00e7in temsil\u00ee de\u011fer</p>
          </article>
          <article class="kp-query-mini-card">
            <span>Alt s\u0131n\u0131r</span>
            <strong>${escapeHtml(formatArchiveMetricValue(config, actual.expected_low))}</strong>
            <p>5 g\u00fcnl\u00fck blok i\u00e7indeki alt aral\u0131k</p>
          </article>
          <article class="kp-query-mini-card">
            <span>\u00dcst s\u0131n\u0131r</span>
            <strong>${escapeHtml(formatArchiveMetricValue(config, actual.expected_high))}</strong>
            <p>5 g\u00fcnl\u00fck blok i\u00e7indeki \u00fcst aral\u0131k</p>
          </article>
          <article class="kp-query-mini-card">
            <span>Kaynak</span>
            <strong>${escapeHtml(actual.source_name || "-")}</strong>
            <p>RTSW veri kayna\u011f\u0131 \u00f6zeti</p>
          </article>
        </div>
        <div class="kp-query-slot-row">
          <span class="kp-query-slot">
            <strong>Blok tarihi</strong>
            <span>${escapeHtml(formatDayText(actual.date))}</span>
          </span>
          <span class="kp-query-slot">
            <strong>E\u015fle\u015fme</strong>
            <span>${result.exact_match ? "Do\u011frudan blok" : "En yak\u0131n 5 g\u00fcnl\u00fck blok"}</span>
          </span>
          <span class="kp-query-slot">
            <strong>\u00c7\u00f6z\u00fcn\u00fcrl\u00fck</strong>
            <span>5 g\u00fcn</span>
          </span>
          ${actualCycleSlot}
        </div>
      </section>
    `
    : "";

  const analogMetrics = !hideAnalogSection && analogs.length
    ? `
      <section class="kp-query-section">
        <div class="panel-head-inline">
          <h3>Cycle analoglar\u0131</h3>
          <span class="badge badge-watch">${analogs.length} benzer cycle</span>
        </div>
        <div class="kp-query-analog-grid">
          ${analogs.map((item) => `
            <article class="kp-query-analog-card">
              <div class="kp-query-analog-head">
                <strong>Cycle ${escapeHtml(item.cycle)}</strong>
                <span>${escapeHtml(formatDayText(item.analog_anchor_date || "-"))}</span>
              </div>
              <div class="kp-query-analog-values">
                <span>A\u011f\u0131rl\u0131kl\u0131 de\u011fer <strong>${escapeHtml(formatArchiveMetricValue(config, item.weighted_value))}</strong></span>
                <span>Aral\u0131k <strong>${escapeHtml(formatArchiveMetricValue(config, item.expected_low))} - ${escapeHtml(formatArchiveMetricValue(config, item.expected_high))}</strong></span>
              </div>
              <p>Faz fark\u0131 ${formatNumber(item.phase_day_offset, 0)} g\u00fcn - mevsim fark\u0131 ${formatNumber(item.seasonal_offset_days, 0)} g\u00fcn - ${formatNumber(item.sample_count, 0)} blok</p>
            </article>
          `).join("")}
        </div>
      </section>
    `
    : "";

  const notesMarkup = notes.length
    ? `
      <section class="kp-query-section">
        <div class="panel-head-inline">
          <h3>Yorum notlar\u0131</h3>
          <span class="badge badge-neutral">Model a\u00e7\u0131klamas\u0131</span>
        </div>
        <div class="kp-query-note-list">
          ${notes.map((note) => `<p class="kp-query-note">${escapeHtml(note)}</p>`).join("")}
        </div>
      </section>
    `
    : "";

  config.resultEl.innerHTML = `
    <div class="kp-query-summary-grid">
      <article class="kp-query-hero-card">
        <div class="kp-query-hero-top">
          <div>
            <span class="kp-query-kicker">${escapeHtml(modeLabel)}</span>
            <h3>${escapeHtml(formatDayText(result.query_date))}</h3>
          </div>
          <div class="kp-query-badges">
            <span class="badge ${result.mode === "forecast" ? "badge-watch" : "badge-normal"}">${escapeHtml(modeLabel)}</span>
            <span class="badge ${levelBadgeClass}">${escapeHtml(result.level_label || "-")}</span>
          </div>
        </div>
        <p class="kp-query-main-value">${escapeHtml(formatArchiveMetricValue(config, result.representative_value))}</p>
        <p class="kp-query-main-meta">${escapeHtml(result.value_label || "Temsil\u00ee de\u011fer")} - ${escapeHtml(cycleText)} - ${escapeHtml(phaseText)}</p>
      </article>
      ${detailCards.map((card) => `
        <article class="kp-query-mini-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          <p>${escapeHtml(card.note)}</p>
        </article>
      `).join("")}
    </div>
    ${actualMetrics}
    ${analogMetrics}
    ${notesMarkup}
  `;
  repairDocumentEncoding(config.resultEl);
}

async function fetchArchiveQuery(config, dateText, timeoutMs = 12000) {
  const urls = buildArchiveQueryUrls(config.fetchUrl, dateText);
  let lastError = null;

  for (const url of urls) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: "no-store",
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || config.failureMessage);
      }
      return payload;
    } catch (error) {
      lastError = error;
    } finally {
      window.clearTimeout(timer);
    }
  }

  if (lastError?.name === "AbortError") {
    throw new Error(config.timeoutMessage);
  }
  throw lastError || new Error(config.failureMessage);
}

function archiveQueryGetInFlight(config) {
  return config.key === "solarWind" ? solarWindQueryInFlight : imfBzQueryInFlight;
}

function archiveQuerySetInFlight(config, nextValue) {
  if (config.key === "solarWind") {
    solarWindQueryInFlight = nextValue;
  } else {
    imfBzQueryInFlight = nextValue;
  }
}

async function runArchiveQuery(config, dateText) {
  if (!config.resultEl || !config.inputEl) {
    return;
  }

  const normalizedDate = String(dateText || "").trim();
  if (!normalizedDate) {
    setArchiveQueryStatus(config, config.statusIntro, "error");
    renderArchiveQueryEmpty(config, config.missingDateMessage);
    return;
  }

  if (archiveQueryGetInFlight(config)) {
    return;
  }
  archiveQuerySetInFlight(config, true);

  if (config.submitEl) {
    config.submitEl.disabled = true;
  }

  setArchiveQueryStatus(config, config.loadingMessage, "loading");
  try {
    const payload = await fetchArchiveQuery(config, normalizedDate);
    const result = payload?.result || {};
    if (config.availabilityEl) {
      config.availabilityEl.textContent = config.hideAvailableRange
        ? (config.availabilitySummary || "Arşiv hazır")
        : `${payload.available_from || "-"} -> ${payload.available_to || "-"}`;
    }
    updateArchiveQueryDateHint(config, payload);
    renderArchiveQueryResult(config, payload);
    setArchiveQueryStatus(
      config,
      result.mode === "forecast" ? config.readyForecastMessage : config.readyObservedMessage,
      "ready",
    );
  } catch (error) {
    const message = error?.message || config.failureMessage;
    setArchiveQueryStatus(config, message, "error");
    renderArchiveQueryEmpty(config, message);
  } finally {
    archiveQuerySetInFlight(config, false);
    if (config.submitEl) {
      config.submitEl.disabled = false;
    }
  }
}

function initArchiveQueryPanel(config) {
  if (!config.inputEl || !config.resultEl) {
    return;
  }

  const todayIso = localTodayIso();
  config.inputEl.step = "1";
  config.inputEl.value = todayIso;
  updateArchiveQueryDateHint(config);

  if (config.openPickerEl) {
    config.openPickerEl.addEventListener("click", () => {
      openArchiveQueryDatePicker(config.inputEl);
    });
  }

  if (config.submitEl) {
    config.submitEl.addEventListener("click", () => {
      runArchiveQuery(config, config.inputEl.value);
    });
  }

  config.inputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runArchiveQuery(config, config.inputEl.value);
    }
  });

  config.inputEl.addEventListener("change", () => {
    if (!config.inputEl.value) {
      return;
    }
    runArchiveQuery(config, config.inputEl.value);
  });

  document.querySelectorAll(config.exampleSelector).forEach((button) => {
    button.addEventListener("click", () => {
      const targetDate = button.getAttribute(
        config.key === "solarWind" ? "data-solar-wind-query-date" : "data-imf-bz-query-date",
      ) || "";
      config.inputEl.value = targetDate;
      runArchiveQuery(config, targetDate);
    });
  });

  runArchiveQuery(config, todayIso).catch(() => {});
}

async function fetchFirstAvailableJson(urls, timeoutMs = 8000) {
  for (const url of urls) {
    const data = await fetchJsonWithTimeout(url, timeoutMs);
    if (data) return data;
  }
  return null;
}

async function fetchFirstAvailableText(urls, timeoutMs = 8000) {
  for (const url of urls) {
    const data = await fetchTextWithTimeout(url, timeoutMs);
    if (data) return data;
  }
  return null;
}

async function fetchSolarFromPanelApi(forceRefresh = false) {
  const query = forceRefresh ? "?refresh=1" : "";
  const payload = await fetchJsonWithTimeout(`/api/solar${query}`, 5000);
  if (!payload || payload.error) {
    return null;
  }
  return payload;
}

async function fetchSolarFromLocalBridge() {
  const hostname = window.location.hostname;
  if (hostname !== "127.0.0.1" && hostname !== "localhost") {
    return null;
  }
  const bridgePayload = await fetchJsonWithTimeout("http://127.0.0.1:8091/api/solar", 8000);
  if (!bridgePayload || bridgePayload.error) {
    return null;
  }
  return bridgePayload;
}

function canUseNotificationBridge() {
  const hostname = String(window.location.hostname || "").toLowerCase();
  return hostname === "127.0.0.1" || hostname === "localhost";
}

async function fetchNotificationPayloadFromBridge() {
  if (!canUseNotificationBridge()) {
    return null;
  }
  const payload = await fetchJsonWithTimeout(`${NOTIFICATION_BRIDGE_URL}/api/notifications`, 5000);
  if (!payload || payload.error) {
    return null;
  }
  return payload;
}

async function postNotificationBridge(path, body, timeoutMs = 10000) {
  if (!canUseNotificationBridge()) {
    throw new Error("Yerel bildirim kÃ¶prÃ¼sÃ¼ kullanÄ±lamÄ±yor.");
  }
  return postJsonWithTimeout(`${NOTIFICATION_BRIDGE_URL}${path}`, body, timeoutMs);
}

async function ensureNotificationPayload(payload) {
  if (payload?.notifications && typeof payload.notifications === "object") {
    return sanitizeNotificationPayload(payload.notifications);
  }
  const remote = await fetchJsonWithTimeout("/api/notifications", 4000);
  if (remote && !remote.error) {
    return sanitizeNotificationPayload(remote);
  }
  const bridge = await fetchNotificationPayloadFromBridge();
  if (bridge && !bridge.error) {
    return sanitizeNotificationPayload(bridge);
  }
  return defaultNotificationPayload();
}

function loadSolarCacheFromStorage() {
  try {
    const raw = window.localStorage?.getItem(SOLAR_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveSolarCacheToStorage(payload) {
  try {
    window.localStorage?.removeItem("solar_cache");
    window.localStorage?.setItem(SOLAR_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage errors
  }
}

function normalizeSunspotNoaa(rows) {
  const row = latestRow(rows);
  if (!row) return null;
  const value = extractNumberFromRow(row, [
    "ssn",
    "sunspot_number",
    "sunspot_num",
    "value",
    "observed_ssn",
  ]);
  if (value === null) return null;
  const timestamp = row.time_tag || row.date || row.time;
  return { value, date: timestamp || null, source: "NOAA SWPC" };
}

function normalizeSunspotPredicted(rows) {
  const row = latestRow(rows);
  if (!row) return null;
  const value = extractNumberFromRow(row, [
    "predicted_ssn",
    "predicted_sunspot_number",
    "predicted_ssn_mean",
    "ssn",
    "value",
  ]);
  if (value === null) return null;
  const timestamp = row.time_tag || row.date || row.time;
  return { value, date: timestamp || null, source: "NOAA SWPC (Tahmin)" };
}

function normalizeSilso(text) {
  if (!text) return null;
  const lines = text.split(/\r?\n/).filter((line) => line && !line.startsWith("#"));
  if (!lines.length) return null;
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const last = lines[index].trim().split(/[,\s;]+/).filter(Boolean);
    if (last.length < 5) continue;
    const year = last[0];
    const month = last[1];
    const day = last[2];
    const value = parseNumber(last[4]);
    if (value === null || value < 0) continue;
    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return { value, date, source: "SILSO" };
  }
  return null;
}

function normalizeSilsoEisn(text) {
  if (!text) return null;
  const lines = text.split(/\r?\n/);
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const parts = lines[index].trim().split(/[,\s;]+/).filter(Boolean);
    if (parts.length < 5 || !/^\d{4}$/.test(parts[0])) continue;
    const value = parseNumber(parts[4]);
    if (value === null || value < 0) continue;
    const date = `${parts[0]}-${String(parts[1]).padStart(2, "0")}-${String(parts[2]).padStart(2, "0")}`;
    return { value, date, source: "SILSO EISN", provisional: true };
  }
  return null;
}

function normalizeSilsoPrediction(text) {
  if (!text) return null;
  const today = new Date();
  const currentMonth = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
  let lastValid = null;
  for (const rawLine of text.split(/\r?\n/)) {
    const parts = rawLine.trim().split(/[,\s;]+/).filter(Boolean);
    if (parts.length < 4 || !/^\d{4}$/.test(parts[0])) continue;
    const value = parseNumber(parts[3]);
    if (value === null || value < 0) continue;
    const date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, 15));
    const entry = {
      value,
      date: date.toISOString(),
      uncertainty: parseNumber(parts[4]),
      source: "SILSO KF ML",
    };
    lastValid = entry;
    if (date >= currentMonth) {
      return entry;
    }
  }
  return lastValid;
}

function normalizeXray(rows) {
  if (!Array.isArray(rows)) return null;
  const longCandidates = rows.filter((row) => {
    const energy = String(row?.energy || row?.wavelength || "").toLowerCase();
    return energy.includes("0.1-0.8") || energy.includes("0.1 - 0.8");
  });
  const shortCandidates = rows.filter((row) => {
    const energy = String(row?.energy || row?.wavelength || "").toLowerCase();
    return energy.includes("0.05-0.4") || energy.includes("0.05 - 0.4");
  });
  const longRow = latestRow(longCandidates.length ? longCandidates : rows);
  const shortRow = latestRow(shortCandidates);
  const longFlux = parseNumber(longRow?.flux) ?? parseNumber(longRow?.observed_flux);
  const shortFlux = parseNumber(shortRow?.flux) ?? parseNumber(shortRow?.observed_flux);
  const flux = longFlux ?? shortFlux;
  if (flux === null) return null;
  const fluxClass = xrayClassFromFlux(longFlux ?? shortFlux);
  const time = longRow?.time_tag || longRow?.time || longRow?.date || shortRow?.time_tag || shortRow?.time || shortRow?.date;
  return {
    time: time || null,
    long_w_m2: longFlux,
    short_w_m2: shortFlux,
    class: fluxClass,
    source: "GOES X-ray",
  };
}

function normalizeXraySeries(rows) {
  if (!Array.isArray(rows)) {
    return { points: [], coverage_days: 1 };
  }
  const points = rows
    .filter((row) => {
      const energy = String(row?.energy || row?.wavelength || "").toLowerCase();
      return energy.includes("0.1-0.8") || energy.includes("0.1 - 0.8");
    })
    .map((row) => {
      const flux = parseNumber(row?.flux) ?? parseNumber(row?.observed_flux);
      const time = row?.time_tag || row?.time || row?.date;
      return {
        time,
        value: flux,
      };
    })
    .filter((point) => point.time && point.value !== null && Number.isFinite(point.value))
    .sort((left, right) => {
      const leftTime = parseUtcDate(left.time);
      const rightTime = parseUtcDate(right.time);
      if (!leftTime || !rightTime) return 0;
      return leftTime - rightTime;
    });
  return {
    points,
    coverage_days: 1,
  };
}

function normalizeFlares(rows) {
  if (!Array.isArray(rows) || !rows.length) return [];
  const sorted = [...rows].sort((a, b) => {
    const aTime = parseUtcDate(a?.peak_time || a?.peakTime || a?.begin_time || a?.beginTime || a?.start_time);
    const bTime = parseUtcDate(b?.peak_time || b?.peakTime || b?.begin_time || b?.beginTime || b?.start_time);
    if (!aTime || !bTime) return 0;
    return bTime - aTime;
  });
  return sorted.slice(0, 5).map((row) => ({
    class: row.class_type || row.classType || row.flare_class || row.flareClass || row.class || "-",
    start: row.begin_time || row.beginTime || row.start_time || row.startTime || null,
    peak: row.peak_time || row.peakTime || null,
    end: row.end_time || row.endTime || null,
    region: row.active_region || row.activeRegion || row.activeRegionNum || row.region || null,
    source: "NOAA SWPC",
  }));
}

function normalizeSolarFlux(rows) {
  const row = latestRow(rows);
  if (!row) return null;
  const value = extractNumberFromRow(row, ["f10.7", "f107", "f10_7", "f10_7_obs", "f10.7_observed"]);
  if (value === null) return null;
  const time = row.time_tag || row.date || row.time;
  return { value, time: time || null, source: "NOAA SWPC" };
}

function normalizeParticleChannel(payload, patterns, source) {
  const rows = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];
  if (!rows.length) return null;
  const candidates = rows.filter((row) => {
    const energy = String(
      row?.energy || row?.channel || row?.energy_band || row?.name || row?.satellite || row?.species || "",
    ).toLowerCase();
    return patterns.some((pattern) => energy.includes(pattern));
  });
  const row = latestRow(candidates.length ? candidates : rows);
  if (!row) return null;
  const value = extractNumberFromRow(row, ["flux", "observed_flux", "fluence", "value", "avg_flux", "density"]);
  if (value === null) return null;
  const time = row.time_tag || row.date || row.time || row.timestamp;
  return {
    value,
    time: time || null,
    label: row?.energy || row?.channel || row?.energy_band || null,
    source,
  };
}

function normalizeAuroraSnapshot(payload) {
  if (!payload) return null;
  const coordinates = Array.isArray(payload?.coordinates)
    ? payload.coordinates
    : Array.isArray(payload?.data)
      ? payload.data
      : [];
  let globalPeak = 0;
  let turkeyPeak = null;
  let southBoundary = null;
  const retained = new Map();
  for (const point of coordinates) {
    let lon = null;
    let lat = null;
    let value = null;
    if (Array.isArray(point)) {
      const first = parseNumber(point[0]);
      const second = parseNumber(point[1]);
      const third = parseNumber(point[2]);
      if (Math.abs(first || 0) > 90) {
        lon = first;
        lat = second;
      } else {
        lat = first;
        lon = second;
      }
      value = third;
    } else if (point && typeof point === "object") {
      lat = parseNumber(point.lat ?? point.latitude ?? point.y);
      lon = parseNumber(point.lon ?? point.longitude ?? point.x);
      value = parseNumber(point.value ?? point.probability ?? point.intensity);
    }
    if (value === null) continue;
    globalPeak = Math.max(globalPeak, value);
    if (lat !== null && lon !== null) {
      const snappedLat = Math.round(lat / 3) * 3;
      const snappedLon = Math.round(lon / 6) * 6;
      const key = `${snappedLat}|${snappedLon}`;
      if (value >= 6) {
        const existing = retained.get(key);
        if (!existing || value > existing.value) {
          retained.set(key, {
            lat: snappedLat,
            lon: snappedLon,
            value: Math.round(value * 10) / 10,
          });
        }
      }
      if (value >= 30 && (southBoundary === null || lat < southBoundary)) {
        southBoundary = lat;
      }
      if (lon >= 25 && lon <= 45 && lat >= 35 && lat <= 43) {
        turkeyPeak = turkeyPeak === null ? value : Math.max(turkeyPeak, value);
      }
    }
  }
  return {
    time: payload?.ForecastTime || payload?.TimeStamp || payload?.ObservationTime || null,
    turkey_probability: turkeyPeak,
    global_peak: globalPeak,
    oval_min_lat: southBoundary,
    points: [...retained.values()],
    source: "NOAA Ovation Aurora",
  };
}

function severityLabel(score) {
  const value = Number(score);
  if (!Number.isFinite(value)) return "Belirsiz";
  if (value >= 80) return "Kritik";
  if (value >= 60) return "Yuksek";
  if (value >= 35) return "Orta";
  return "Dusuk";
}

function radioBlackoutScaleFromFlux(flux) {
  const value = parseNumber(flux) ?? 0;
  if (value >= 2e-3) return "R5";
  if (value >= 1e-3) return "R4";
  if (value >= 1e-4) return "R3";
  if (value >= 5e-5) return "R2";
  if (value >= 1e-5) return "R1";
  return "R0";
}

function deriveExtendedSolarMetrics(next, payload) {
  const noaa = resolvedNoaaData(payload?.latest, payload?.charts);
  const generatedAt = payload?.latest?.generated_at || noaa?.observed_at || new Date().toISOString();
  const sunspotNow = next?.sunspot_silso || next?.sunspot_noaa || null;
  const sunspotPred = next?.sunspot_silso_predicted || next?.sunspot_predicted || null;
  const xrayFlux = parseNumber(next?.xray_flux?.long_w_m2) ?? xrayFluxFromClass(next?.xray_flux?.class) ?? 1e-7;
  const solarFlux = parseNumber(next?.solar_flux?.value) ?? estimateSolarFluxFromSSN(sunspotNow?.value ?? 70) ?? 100;
  const kpNow = parseNumber(noaa?.kp) ?? parseNumber(noaa?.kp_estimated) ?? 2.4;
  const kpForecast = parseNumber(noaa?.kp_lstm_forecast?.predicted_kp) ?? parseNumber(noaa?.kp_estimated) ?? kpNow;
  const windSpeed = parseNumber(noaa?.solar_wind_speed_km_s) ?? 380;
  const density = parseNumber(noaa?.proton_density_p_cm3) ?? 6;
  const bz = parseNumber(noaa?.bz_nt) ?? 0;
  const bt = parseNumber(noaa?.bt_nt) ?? (Math.abs(bz) + 4);
  const speedNorm = clamp((windSpeed - 300) / 700, 0, 1);
  const densityNorm = clamp((density - 2) / 20, 0, 1);
  const southward = clamp((-bz) / 18, 0, 1);
  const kpNorm = clamp(Math.max(kpNow, kpForecast) / 9, 0, 1);
  const fluxNorm = clamp((solarFlux - 70) / 170, 0, 1);
  const xrayNorm = clamp((Math.log10(Math.max(xrayFlux, 1e-8)) + 8) / 4, 0, 1);
  const localMag = Array.isArray(payload?.latest?.evaluation?.intermagnet)
    ? payload.latest.evaluation.intermagnet
      .map((station) => Math.abs(parseNumber(station?.delta_nt) ?? NaN))
      .filter((value) => Number.isFinite(value))
    : [];
  const localMagDelta = localMag.length
    ? (localMag.reduce((sum, value) => sum + value, 0) / localMag.length)
    : ((kpForecast * 9) + (southward * 16) + (densityNorm * 10));

  const protonLive = parseNumber(next?.proton_flux_live?.value);
  const electronLive = parseNumber(next?.electron_flux_live?.value);
  const heavyIonLive = parseNumber(next?.heavy_ion_flux_live?.value);
  const auroraLive = next?.aurora_live || null;

  const protonGt10 = protonLive ?? Math.round((0.8 + (xrayNorm * 18) + (fluxNorm * 9) + (kpNorm * 7)) * 10) / 10;
  const electronGt2 = electronLive ?? Math.round(120 + (fluxNorm * 1400) + (speedNorm * 650) + (kpNorm * 420));
  const heavyIonFlux = heavyIonLive ?? Math.round((0.05 + (xrayNorm * 1.7) + (protonGt10 * 0.015)) * 100) / 100;
  const sepFlux = Math.round(Math.max(protonGt10 * 1.15, protonGt10 + (xrayNorm * 3)) * 10) / 10;
  const doseRate = Math.round((0.45 + (protonGt10 * 0.018) + (electronGt2 / 900) + (xrayNorm * 5.5)) * 100) / 100;

  const tec = Math.round((10 + (fluxNorm * 28) + (kpNorm * 16) + (southward * 10) + (densityNorm * 4)) * 10) / 10;
  const fof2 = Math.round((4.5 + (fluxNorm * 5.2) + ((1 - southward) * 0.6) + (kpNorm * 0.8)) * 10) / 10;
  const hmf2 = Math.round(220 + (kpNorm * 120) + (southward * 40) + (speedNorm * 25));
  const s4 = Math.round(clamp(0.08 + (kpNorm * 0.55) + (southward * 0.22) + (fluxNorm * 0.12), 0.05, 1.2) * 100) / 100;
  const sigmaPhi = Math.round(clamp(0.10 + (kpNorm * 0.70) + (southward * 0.18) + (fluxNorm * 0.10), 0.08, 1.6) * 100) / 100;
  const muf = Math.round(((fof2 * 3.1) + (fluxNorm * 1.5)) * 10) / 10;
  const luf = Math.round((1.5 + (xrayNorm * 9) + (southward * 1.6) + (kpNorm * 1.2)) * 10) / 10;
  const ionoDelay = Math.round((tec * 0.162) * 10) / 10;

  const auroraProbability = Math.round(clamp(((kpForecast - 3) * 18) + (southward * 20) + (speedNorm * 12) + (densityNorm * 6), 0, 100));
  const auroralOval = Math.round(clamp((auroraLive?.oval_min_lat ?? (67 - (kpForecast * 1.7) - (southward * 1.8))), 48, 70) * 10) / 10;
  const magnetopause = Math.round(clamp(11.4 - (speedNorm * 1.8) - (densityNorm * 1.2) - (southward * 1.2), 6.4, 11.4) * 10) / 10;
  const radiationBelt = Math.round(clamp((electronGt2 / 20) + (fluxNorm * 28) + (kpNorm * 24), 6, 100));
  const substormAl = Math.round((-70) - (kpForecast * 110) - (southward * 180) - (speedNorm * 70));

  const hfScale = radioBlackoutScaleFromFlux(xrayFlux);
  const gnssRisk = Math.round(clamp((kpNorm * 34) + (fluxNorm * 24) + (s4 * 28) + (sigmaPhi * 14), 4, 100));
  const surfaceCharging = Math.round(clamp((electronGt2 / 18) + (speedNorm * 22) + (kpNorm * 18), 5, 100));
  const deepCharging = Math.round(clamp((radiationBelt * 0.72) + (electronGt2 / 35) + (fluxNorm * 14), 4, 100));
  const seuRisk = Math.round(clamp((protonGt10 * 4.2) + (xrayNorm * 20) + (kpNorm * 8), 3, 100));
  const leoDrag = Math.round(clamp(((solarFlux - 80) * 0.45) + (kpNorm * 18) + (speedNorm * 10), 2, 100));
  const gicRisk = Math.round(clamp((kpForecast * 10) + (southward * 28) + (densityNorm * 18) + (localMagDelta * 0.55), 4, 100));
  const aviationRisk = Math.round(clamp((doseRate * 18) + (protonGt10 * 2.4) + (xrayNorm * 12), 3, 100));
  const polarCommRisk = Math.round(clamp((auroraProbability * 0.55) + (gnssRisk * 0.20) + ((hfScale === "R0" ? 0 : Number(hfScale.replace("R", "")) * 11)), 4, 100));

  next.radiation = {
    updated_at: generatedAt,
    sep_flux_pfu: sepFlux,
    proton_flux_pfu: protonGt10,
    electron_flux_pfu: electronGt2,
    heavy_ion_flux_pfu: heavyIonFlux,
    dose_rate_uSv_h: doseRate,
    proton_gt10_mev_pfu: protonGt10,
    electron_gt2_mev_pfu: electronGt2,
    source: protonLive !== null || electronLive !== null ? "GOES + model" : "Model (Kp + SW + X-ray)",
  };

  next.ionosphere = {
    updated_at: generatedAt,
    tec_tecu: tec,
    fof2_mhz: fof2,
    hmf2_km: hmf2,
    s4_index: s4,
    sigma_phi_rad: sigmaPhi,
    muf_mhz: muf,
    luf_mhz: luf,
    ionospheric_delay_m: ionoDelay,
    source: "Model (Kp + F10.7 + X-ray)",
  };

  next.magnetosphere = {
    updated_at: generatedAt,
    auroral_oval_min_lat: auroralOval,
    aurora_probability_percent: Math.round(auroraLive?.turkey_probability ?? auroraProbability),
    magnetopause_standoff_re: magnetopause,
    radiation_belt_enhancement_percent: radiationBelt,
    substorm_al_nt: substormAl,
    bt_nt: bt,
    source: auroraLive ? "NOAA Ovation + model" : "Model (Kp + Bz + SW)",
  };

  next.operational = {
    updated_at: generatedAt,
    hf_blackout_scale: hfScale,
    gnss_degradation_percent: gnssRisk,
    surface_charging_risk_percent: surfaceCharging,
    deep_dielectric_risk_percent: deepCharging,
    seu_risk_percent: seuRisk,
    leo_drag_increase_percent: leoDrag,
    gic_risk_percent: gicRisk,
    aviation_radiation_risk_percent: aviationRisk,
    polar_route_comm_risk_percent: polarCommRisk,
    source: "Model (space weather impact translation)",
  };

  return next;
}

function buildCmeFallback(payload) {
  const noaa = payload?.latest?.evaluation?.noaa || {};
  const cmeWindow = payload?.insights?.cme_window || null;
  let impact = parseNumber(cmeWindow?.confidence_percent);
  const bz = parseNumber(noaa?.bz_nt);
  if (impact !== null && bz !== null && bz < -10) {
    impact = clampNumber(impact + 8, 5, 98);
  }
  return {
    time: cmeWindow?.window_start || null,
    speed_km_s: parseNumber(noaa?.solar_wind_speed_km_s),
    width_deg: null,
    direction: cmeWindow?.status === "active" || cmeWindow?.status === "watch" ? "Earthward" : null,
    impact_probability: impact !== null ? clampNumber(impact, 5, 98) : null,
    arrival_time: cmeWindow?.window_start || null,
    summary: "YakÄ±n-DÃ¼nya NOAA verileriyle tÃ¼retilmiÅŸ CME olasÄ±lÄ±ÄŸÄ±.",
    source: "Model (NOAA near-Earth + CME window)",
    estimated: true,
  };
}

function applySolarFallbacks(solar, payload) {
  const next = { ...solar };
  const notes = [];
  const generatedAt = payload?.latest?.generated_at || new Date().toISOString();

  if (!next.sunspot_noaa && next.sunspot_silso?.value !== undefined && next.sunspot_silso?.value !== null) {
    next.sunspot_noaa = {
      value: next.sunspot_silso.value,
      date: next.sunspot_silso.date,
      source: "Model (SILSO->NOAA bridge)",
      estimated: true,
    };
    notes.push("sunspot_noaa");
  }

  if (!next.sunspot_silso && next.sunspot_noaa?.value !== undefined && next.sunspot_noaa?.value !== null) {
    next.sunspot_silso = {
      value: next.sunspot_noaa.value,
      date: next.sunspot_noaa.date,
      source: "Model (NOAA->SILSO bridge)",
      estimated: true,
    };
    notes.push("sunspot_silso");
  }

  let sunspotNow = next.sunspot_noaa || next.sunspot_silso || null;
  if (!next.sunspot_predicted && next.sunspot_silso_predicted?.value !== undefined && next.sunspot_silso_predicted?.value !== null) {
    next.sunspot_predicted = { ...next.sunspot_silso_predicted };
  }

  if (!next.sunspot_silso_predicted && next.sunspot_predicted?.value !== undefined && next.sunspot_predicted?.value !== null) {
    next.sunspot_silso_predicted = {
      value: next.sunspot_predicted.value,
      date: next.sunspot_predicted.date,
      source: "Model (NOAA->SILSO forecast bridge)",
      estimated: true,
    };
    notes.push("sunspot_silso_predicted");
  }

  if (!sunspotNow) {
    const ssnBaseline = estimateSunspotFromSolarFlux(next.solar_flux?.value) ?? 70;
    next.sunspot_noaa = {
      value: ssnBaseline,
      date: next.solar_flux?.time || generatedAt,
      source: "Model (F10.7 baseline)",
      estimated: true,
    };
    next.sunspot_silso = {
      value: ssnBaseline,
      date: next.solar_flux?.time || generatedAt,
      source: "Model (F10.7 baseline)",
      estimated: true,
    };
    notes.push("sunspot_noaa", "sunspot_silso");
    sunspotNow = next.sunspot_noaa;
  }

  if (!next.sunspot_predicted && sunspotNow?.value !== null && sunspotNow?.value !== undefined) {
    next.sunspot_predicted = {
      value: sunspotNow.value,
      date: sunspotNow.date,
      source: "Model (SSN persistence)",
      estimated: true,
    };
    notes.push("sunspot_predicted");
  }

  if (!next.sunspot_silso_predicted && next.sunspot_predicted?.value !== undefined && next.sunspot_predicted?.value !== null) {
    next.sunspot_silso_predicted = {
      value: next.sunspot_predicted.value,
      date: next.sunspot_predicted.date,
      source: "Model (SSN persistence)",
      estimated: true,
    };
    notes.push("sunspot_silso_predicted");
  }

  const flares = Array.isArray(next.flares) ? next.flares : [];
  if (!next.xray_flux && flares.length) {
    const flareClass = parseFlareClassLabel(flares[0]?.class);
    if (flareClass) {
      next.xray_flux = {
        time: flares[0]?.peak || flares[0]?.start || null,
        long_w_m2: xrayFluxFromClass(flareClass),
        short_w_m2: null,
        class: flareClass,
        source: "Model (flare class)",
        estimated: true,
      };
      notes.push("xray_flux");
    }
  }

  if (!next.xray_flux) {
    next.xray_flux = {
      time: generatedAt,
      long_w_m2: 1e-7,
      short_w_m2: 5e-8,
      class: { class: "B", magnitude: 1.0 },
      source: "Model (quiet-sun baseline)",
      estimated: true,
    };
    notes.push("xray_flux");
  }

  if (!next.xray_series || !Array.isArray(next.xray_series.points) || !next.xray_series.points.length) {
    next.xray_series = {
      points: [
        {
          time: next.xray_flux?.time || generatedAt,
          value: parseNumber(next.xray_flux?.long_w_m2) ?? 1e-7,
        },
      ],
      coverage_days: 1,
      source: next.xray_flux?.source || "Model (X-ray persistence)",
    };
    notes.push("xray_series");
  }

  if ((!next.flares || !next.flares.length) && next.xray_flux?.class) {
    const flareLabel = `${next.xray_flux.class.class}${next.xray_flux.class.magnitude}`;
    next.flares = [
      {
        class: flareLabel,
        start: next.xray_flux.time || null,
        peak: next.xray_flux.time || null,
        end: null,
        region: null,
        source: "Model (X-ray class)",
        estimated: true,
      },
    ];
    notes.push("flares");
  }

  if (!next.solar_flux) {
    const ssnValue = sunspotNow?.value !== undefined ? parseNumber(sunspotNow.value) : null;
    const flux = estimateSolarFluxFromSSN(ssnValue ?? 70);
    if (flux !== null) {
      next.solar_flux = {
        value: flux,
        time: sunspotNow?.date || generatedAt,
        source: "Model (SSN->F10.7)",
        estimated: true,
      };
      notes.push("solar_flux");
    }
  }

  if (!next.radio_burst && next.xray_flux?.class?.class) {
    const label = next.xray_flux.class.class;
    const magnitude = next.xray_flux.class.magnitude;
    const severity = label === "M" || label === "X" ? "olasÄ±" : "dÃ¼ÅŸÃ¼k olasÄ±lÄ±k";
    next.radio_burst = {
      time: next.xray_flux.time || null,
      type: "Proxy",
      summary: `X-ray sÄ±nÄ±fÄ± ${label}${magnitude || ""} nedeniyle radio burst ${severity}.`,
      source: "Model (X-ray proxy)",
      estimated: true,
    };
    notes.push("radio_burst");
  }

  if (!next.cme) {
    next.cme = buildCmeFallback(payload);
    notes.push("cme");
  }

  if (notes.length) {
    next.estimated_fields = Array.from(new Set([...(next.estimated_fields || []), ...notes]));
  }

  return deriveExtendedSolarMetrics(next, payload);
}

function isEmptySolarField(value) {
  if (value === undefined || value === null) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value !== "object") return false;

  if (Array.isArray(value.points)) {
    return value.points.length === 0;
  }

  const directFields = [
    "value",
    "time",
    "date",
    "summary",
    "type",
    "direction",
    "impact_probability",
    "long_w_m2",
    "short_w_m2",
    "speed_km_s",
  ];
  for (const key of directFields) {
    const candidate = value[key];
    if (candidate !== undefined && candidate !== null && candidate !== "") {
      return false;
    }
  }

  if (value.class && typeof value.class === "object") {
    return !Object.values(value.class).some((item) => item !== undefined && item !== null && item !== "");
  }

  return Object.keys(value).length === 0;
}

function solarFieldTimestamp(value) {
  if (!value) return null;
  if (Array.isArray(value)) {
    for (let index = value.length - 1; index >= 0; index -= 1) {
      const row = value[index];
      const parsed = parseUtcDate(row?.time || row?.time_tag || row?.date || row?.timestamp || row?.peak || row?.start);
      if (parsed) return parsed;
    }
    return null;
  }
  if (Array.isArray(value.points)) {
    for (let index = value.points.length - 1; index >= 0; index -= 1) {
      const parsed = parseUtcDate(value.points[index]?.time);
      if (parsed) return parsed;
    }
    return null;
  }
  return parseUtcDate(value.updated_at || value.time || value.date || value.arrival_time || value.peak || value.start);
}

function solarFieldIsEstimated(field, value, owner) {
  if (value?.estimated) return true;
  return Array.isArray(owner?.estimated_fields) && owner.estimated_fields.includes(field);
}

function mergeSolarPayload(base, incoming) {
  const merged = { ...(base || {}) };
  if (!incoming) return merged;
  const fields = [
    "sunspot_noaa",
    "sunspot_silso",
    "sunspot_predicted",
    "sunspot_silso_predicted",
    "xray_flux",
    "xray_series",
    "flares",
    "cme",
    "radio_burst",
    "solar_flux",
    "proton_flux_live",
    "electron_flux_live",
    "heavy_ion_flux_live",
    "aurora_live",
    "radiation",
    "ionosphere",
    "magnetosphere",
    "operational",
    "estimated_fields",
    "sources",
  ];
  for (const field of fields) {
    if (field === "estimated_fields") {
      merged.estimated_fields = Array.from(new Set([...(merged.estimated_fields || []), ...(incoming.estimated_fields || [])]));
      continue;
    }
    if (field === "sources") {
      merged.sources = { ...(merged.sources || {}), ...(incoming.sources || {}) };
      continue;
    }
    const current = merged[field];
    if (isEmptySolarField(current)) {
      if (incoming[field] !== undefined) {
        merged[field] = incoming[field];
      }
      continue;
    }

    if (!LIVE_SOLAR_FIELDS.has(field) || isEmptySolarField(incoming[field])) {
      continue;
    }

    const currentEstimated = solarFieldIsEstimated(field, current, merged);
    const incomingEstimated = solarFieldIsEstimated(field, incoming[field], incoming);
    if (!incomingEstimated && currentEstimated) {
      merged[field] = incoming[field];
      continue;
    }
    if (incomingEstimated && !currentEstimated) {
      continue;
    }

    if (field === "xray_series") {
      const currentPoints = Array.isArray(current?.points) ? current.points.length : 0;
      const incomingPoints = Array.isArray(incoming[field]?.points) ? incoming[field].points.length : 0;
      if (incomingPoints > currentPoints) {
        merged[field] = incoming[field];
      }
      continue;
    }

    const currentTime = solarFieldTimestamp(current);
    const incomingTime = solarFieldTimestamp(incoming[field]);
    if (incomingTime && (!currentTime || incomingTime >= currentTime)) {
      merged[field] = incoming[field];
      continue;
    }
    if (!currentTime && !incomingEstimated) {
      merged[field] = incoming[field];
    }
  }
  return merged;
}

function solarNeedsFetch(solar) {
  if (!solar) return true;
  const silsoDate = parseUtcDate(solar?.sunspot_silso?.date);
  const staleSilso = !silsoDate || ((Date.now() - silsoDate.getTime()) > (5 * 24 * 60 * 60 * 1000));
  const xrayTime = parseUtcDate(solar?.xray_flux?.time);
  const staleXray = !xrayTime || ((Date.now() - xrayTime.getTime()) > (90 * 60 * 1000));
  const missingSunspot = !solar.sunspot_noaa && !solar.sunspot_silso;
  const missingSilsoPrediction = !solar.sunspot_silso_predicted;
  const missingXray = !solar.xray_flux;
  const missingXraySeries = !Array.isArray(solar?.xray_series?.points) || solar.xray_series.points.length < 6;
  const missingFlares = !solar.flares || solar.flares.length === 0;
  const missingFlux = !solar.solar_flux;
  return missingSunspot || staleSilso || missingSilsoPrediction || missingXray || staleXray || missingXraySeries || missingFlares || missingFlux;
}

async function fetchSolarFromSources(payload) {
  const now = Date.now();
  if (cachedSolarPayload && (now - cachedSolarAt) < SOLAR_FETCH_INTERVAL_MS) {
    return cachedSolarPayload;
  }

  const [
    sunspotNoaaRows,
    sunspotPredRows,
    silsoCurrentText,
    silsoText,
    silsoPredText,
    xrayRows,
    flareRows,
    fluxRows,
    protonRows,
    electronRows,
    heavyIonRows,
    auroraRows,
  ] = await Promise.all([
    fetchFirstAvailableJson([
      "https://services.swpc.noaa.gov/json/solar-cycle/sunspot.json",
      "https://services.swpc.noaa.gov/json/solar-cycle/sunspot-number.json",
    ]),
    fetchFirstAvailableJson([
      "https://services.swpc.noaa.gov/json/solar-cycle/sunspot-predicted.json",
      "https://services.swpc.noaa.gov/json/solar-cycle/predicted-sunspot-number.json",
    ]),
    fetchFirstAvailableText([
      "https://www.sidc.be/SILSO/DATA/EISN/EISN_current.csv",
      "https://www.sidc.be/SILSO/DATA/EISN/EISN_current.txt",
      "https://sidc.oma.be/SILSO/DATA/EISN/EISN_current.csv",
    ]),
    fetchFirstAvailableText([
      "https://www.sidc.be/SILSO/DATA/SN_d_tot_V2.0.txt",
      "https://sidc.oma.be/SILSO/DATA/SN_d_tot_V2.0.txt",
    ]),
    fetchFirstAvailableText([
      "https://www.sidc.be/SILSO/DATA/KFprediML.txt",
      "https://sidc.oma.be/SILSO/DATA/KFprediML.txt",
      "https://www.sidc.be/SILSO/DATA/prediML.txt",
    ]),
    fetchFirstAvailableJson([
      "https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json",
      "https://services.swpc.noaa.gov/json/goes/secondary/xrays-1-day.json",
    ]),
    fetchFirstAvailableJson([
      "https://services.swpc.noaa.gov/json/solar_flare_summary.json",
    ]),
    fetchFirstAvailableJson([
      "https://services.swpc.noaa.gov/json/solar-cycle/observed-solar-cycle.json",
    ]),
    fetchFirstAvailableJson([
      "https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json",
      "https://services.swpc.noaa.gov/json/goes/secondary/integral-protons-1-day.json",
    ]),
    fetchFirstAvailableJson([
      "https://services.swpc.noaa.gov/json/goes/primary/integral-electrons-1-day.json",
      "https://services.swpc.noaa.gov/json/goes/secondary/integral-electrons-1-day.json",
    ]),
    fetchFirstAvailableJson([
      "https://services.swpc.noaa.gov/json/goes/primary/differential-alphas-1-day.json",
      "https://services.swpc.noaa.gov/json/goes/secondary/differential-alphas-1-day.json",
    ]),
    fetchFirstAvailableJson([
      "https://services.swpc.noaa.gov/json/ovation_aurora_latest.json",
    ]),
  ]);

  const silsoCurrent = normalizeSilsoEisn(silsoCurrentText) || normalizeSilso(silsoText);
  const solar = {
    sunspot_noaa: normalizeSunspotNoaa(sunspotNoaaRows),
    sunspot_silso: silsoCurrent,
    sunspot_predicted: normalizeSunspotPredicted(sunspotPredRows),
    sunspot_silso_predicted: normalizeSilsoPrediction(silsoPredText),
    xray_flux: normalizeXray(xrayRows),
    xray_series: normalizeXraySeries(xrayRows),
    flares: normalizeFlares(flareRows),
    solar_flux: normalizeSolarFlux(fluxRows),
    proton_flux_live: normalizeParticleChannel(protonRows, [">=10 mev", ">10 mev", "10 mev"], "GOES Proton"),
    electron_flux_live: normalizeParticleChannel(electronRows, [">=2 mev", ">2 mev", "2 mev"], "GOES Electron"),
    heavy_ion_flux_live: normalizeParticleChannel(heavyIonRows, ["alpha", "alphas", "heavy"], "GOES Alpha"),
    aurora_live: normalizeAuroraSnapshot(auroraRows),
  };

  const merged = applySolarFallbacks(solar, payload);
  cachedSolarPayload = merged;
  cachedSolarAt = now;
  saveSolarCacheToStorage(merged);
  return merged;
}

async function ensureSolarPayload(payload) {
  const base = payload?.solar || {};
  let solar = base && Object.keys(base).length ? base : {};
  if (!solar || Object.keys(solar).length === 0) {
    const stored = loadSolarCacheFromStorage();
    if (stored) {
      solar = stored;
    }
  }
  const needsFetch = !solar || Object.keys(solar).length === 0 || solarNeedsFetch(solar);
  if (needsFetch) {
    const panelSolar = await fetchSolarFromPanelApi(false);
    if (panelSolar) {
      solar = mergeSolarPayload(solar, panelSolar);
    }
  }
  if (!solar || Object.keys(solar).length === 0 || solarNeedsFetch(solar)) {
    const bridgeSolar = await fetchSolarFromLocalBridge();
    if (bridgeSolar) {
      solar = mergeSolarPayload(solar, bridgeSolar);
    }
  }
  if (!solar || Object.keys(solar).length === 0 || solarNeedsFetch(solar)) {
    const fetched = await fetchSolarFromSources(payload);
    solar = mergeSolarPayload(solar, fetched);
  }
  return applySolarFallbacks(solar, payload);
}

function formatShortDate(value) {
  const date = value instanceof Date ? value : parseUtcDate(value);
  if (!date) return "-";
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    timeZone: "Europe/Istanbul",
  });
}

function formatAxisDate(value) {
  const date = value instanceof Date ? value : parseUtcDate(value);
  if (!date) return "-";
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    timeZone: "Europe/Istanbul",
  });
}

function formatHourDelta(value) {
  if (value === null || value === undefined) return "";
  const hours = Number(value);
  if (!Number.isFinite(hours)) return "";
  if (hours < 24) return `${hours} saat Ã¶nce`;
  const days = Math.round((hours / 24) * 10) / 10;
  return `${days} gÃ¼n Ã¶nce`;
}

function generateLinearTicks(minValue, maxValue, count = 5) {
  if (!Number.isFinite(minValue) || !Number.isFinite(maxValue) || count < 2) {
    return [minValue, maxValue].filter((value) => Number.isFinite(value));
  }
  if (minValue === maxValue) {
    return [minValue];
  }

  const ticks = [];
  const step = (maxValue - minValue) / (count - 1);
  for (let index = 0; index < count; index += 1) {
    ticks.push(minValue + step * index);
  }
  return ticks;
}

function generateTimeTicks(start, end, count = 5) {
  const startMs = start.getTime();
  const endMs = end.getTime();
  const range = Math.max(1, endMs - startMs);
  const ticks = [];
  for (let index = 0; index < count; index += 1) {
    const ratio = count === 1 ? 0 : index / (count - 1);
    ticks.push(new Date(startMs + range * ratio));
  }
  return ticks;
}

function formatLevel(value) {
  return levelLabel[value] || "Bekleniyor";
}

function formatConfidenceLabel(value) {
  return confidenceLabel[value] || "Belirsiz";
}

function formatCmeStatus(value) {
  return cmeStatusLabel[value] || "Bekleniyor";
}

function formatAccessMode(value) {
  return accessModeLabel[value] || "Bekleniyor";
}

function defaultNotificationPayload() {
  return {
    provider: "pushbullet",
    settings: {
      provider: "pushbullet",
      enabled: true,
      pushbullet_token: "",
      min_level: "watch",
      cooldown_minutes: 60,
    },
    state: {
      last_sent_at: null,
      last_level: null,
      last_risk_percent: null,
      last_kp: null,
      last_title: null,
      last_message: null,
      last_error: null,
    },
    instructions: {
      phone_app: "Telefon bildirimleri bu panelde Pushbullet Ã¼zerinden gÃ¶nderilir.",
      topic_note: "Bildirim alabilmek iÃ§in yerel panelde Pushbullet access token tanÄ±mlanmalÄ±dÄ±r.",
      admin_note: "Pushbullet token yalnÄ±zca yerel yÃ¶netici ekranÄ±nda saklanÄ±r ve otomatik Ã¶zetler bu kanal Ã¼zerinden iletilir.",
    },
  };
}

function sanitizeNotificationPayload(payload) {
  const defaults = defaultNotificationPayload();
  const incoming = payload && typeof payload === "object" ? payload : {};
  const settings = {
    ...defaults.settings,
    ...(incoming.settings && typeof incoming.settings === "object" ? incoming.settings : {}),
  };
  settings.provider = "pushbullet";
  settings.pushbullet_token = String(settings.pushbullet_token || "").trim();
  const state = {
    ...defaults.state,
    ...(incoming.state && typeof incoming.state === "object" ? incoming.state : {}),
  };
  const instructions = {
    ...defaults.instructions,
    ...(incoming.instructions && typeof incoming.instructions === "object" ? incoming.instructions : {}),
  };
  return {
    ...defaults,
    ...incoming,
    settings,
    state,
    instructions,
  };
}

function isLocalNotificationAdmin() {
  const hostname = String(window.location.hostname || "").toLowerCase();
  return hostname === "127.0.0.1" || hostname === "localhost";
}

function formatNotificationThreshold(value) {
  if (value === "watch" || value === "warning" || value === "severe") {
    return formatLevel(value);
  }
  if (value === "normal") {
    return "Normal";
  }
  return "Bekleniyor";
}

function buildNotificationTopicUrl(settings) {
  return "";
}

function notificationStatusMeta(settings) {
  const enabled = Boolean(settings?.enabled);
  const hasPushbulletToken = Boolean(String(settings?.pushbullet_token || "").trim());
  if (!hasPushbulletToken) {
    return { text: "Token bekleniyor", badgeClass: "badge badge-warning" };
  }
  if (enabled) {
    return { text: "KiÅŸisel bildirim aktif", badgeClass: "badge badge-normal" };
  }
  return { text: "HazÄ±r ama kapalÄ±", badgeClass: "badge badge-watch" };
}

function notificationProviderLabel(provider) {
  return "Pushbullet";
}

function loadNotificationSettingsFromStorage() {
  try {
    const raw = window.localStorage?.getItem(NOTIFY_SETTINGS_STORAGE_KEY);
    if (!raw) return defaultNotificationPayload().settings;
    return sanitizeNotificationPayload({ settings: JSON.parse(raw) }).settings;
  } catch {
    return defaultNotificationPayload().settings;
  }
}

function saveNotificationSettingsToStorage(settings) {
  const sanitized = sanitizeNotificationPayload({ settings }).settings;
  try {
    window.localStorage?.setItem(NOTIFY_SETTINGS_STORAGE_KEY, JSON.stringify(sanitized));
  } catch {
  }
  return sanitized;
}

function loadNotificationStateFromStorage() {
  try {
    const raw = window.localStorage?.getItem(NOTIFY_STATE_STORAGE_KEY);
    if (!raw) return defaultNotificationPayload().state;
    return sanitizeNotificationPayload({ state: JSON.parse(raw) }).state;
  } catch {
    return defaultNotificationPayload().state;
  }
}

function saveNotificationStateToStorage(state) {
  const sanitized = sanitizeNotificationPayload({ state }).state;
  try {
    window.localStorage?.setItem(NOTIFY_STATE_STORAGE_KEY, JSON.stringify(sanitized));
  } catch {
  }
  return sanitized;
}

function notificationPayloadFromStorage() {
  return sanitizeNotificationPayload({
    settings: loadNotificationSettingsFromStorage(),
    state: loadNotificationStateFromStorage(),
  });
}

function mergeNotificationPayload(remotePayload) {
  const localPayload = notificationPayloadFromStorage();
  if (!remotePayload || typeof remotePayload !== "object") {
    return localPayload;
  }
  const remote = sanitizeNotificationPayload(remotePayload);
  return sanitizeNotificationPayload({
    ...remote,
    settings: {
      ...remote.settings,
      ...localPayload.settings,
    },
    state: {
      ...remote.state,
      ...localPayload.state,
    },
    instructions: {
      ...remote.instructions,
      ...localPayload.instructions,
    },
  });
}

function notificationLevelRank(level) {
  const order = {
    normal: 0,
    watch: 1,
    warning: 2,
    severe: 3,
  };
  return order[String(level || "normal").toLowerCase()] ?? 0;
}

function notificationPriority(level) {
  if (level === "severe") return "5";
  if (level === "warning") return "4";
  if (level === "watch") return "3";
  return "2";
}

function buildNotificationEvent(latest, access, mode = "alert") {
  const evaluation = latest?.evaluation || {};
  const noaa = evaluation.noaa || {};
  const level = String(evaluation.level || "normal").toLowerCase();
  const riskPercent = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const kpValue = parseNumber(noaa.kp);
  const kpEstimated = parseNumber(noaa.kp_estimated);
  const windSpeed = parseNumber(noaa.solar_wind_speed_km_s);
  const bzValue = parseNumber(noaa.bz_nt);
  const generatedAt = latest?.generated_at || noaa.observed_at || null;
  const generatedAtLabel = generatedAt
    ? `${parseUtcDate(generatedAt)?.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Istanbul",
    }) || generatedAt} ${parseUtcDate(generatedAt)?.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Istanbul",
    }) || ""} TSİ`.trim()
    : "-";
  const normalizedMode = String(mode || "alert").toLowerCase();
  const manual = normalizedMode === "manual";
  const periodic = normalizedMode === "periodic";
  const titlePrefix = manual ? "Manuel Ã–zet" : periodic ? "DÃ¼zenli Durum Ã–zeti" : "Uzay HavasÄ± UyarÄ±sÄ±";
  const title = `${titlePrefix} | ${level.toUpperCase()}`;
  const lines = [
    `Seviye: ${level}`,
    `Risk: ${riskPercent === null ? "-" : `%${formatNumber(riskPercent, 0)}`}`,
    `Kp: ${kpValue === null ? "-" : formatNumber(kpValue, 2)}`,
    `Kp Tahmini: ${kpEstimated === null ? "-" : formatNumber(kpEstimated, 2)}`,
    `GÃ¼neÅŸ rÃ¼zgÃ¢rÄ±: ${windSpeed === null ? "-" : `${formatNumber(windSpeed, 0)} km/s`}`,
    `IMF Bz: ${bzValue === null ? "-" : `${bzValue >= 0 ? "+" : ""}${formatNumber(bzValue, 1)} nT`}`,
    `Zaman (TSİ): ${generatedAtLabel}`,
  ];
  if (periodic) {
    lines.push("Not: Bu bildirim dÃ¼zenli durum Ã¶zeti olarak gÃ¶nderildi.");
  } else if (!manual) {
    lines.push("Eylem: Paneli aÃ§Ä±p sistemleri kontrol et.");
  }
  return {
    title,
    message: lines.join("\n"),
    priority: periodic && level === "normal" ? "2" : notificationPriority(level),
    tags: ["satellite", periodic ? "summary" : "warning", level],
    level,
    riskPercent,
    kpValue,
    clickUrl: access?.public_url || access?.local_url || window.location.origin,
  };
}

async function publishNtfyFromClient(settings, eventPayload) {
  throw new Error("Bu kanal kapatÄ±ldÄ±; yalnÄ±zca Pushbullet kullanÄ±labilir.");
}

async function publishPushbulletFromClient(settings, eventPayload) {
  const token = String(settings?.pushbullet_token || "").trim();
  if (!token) {
    throw new Error("Pushbullet access token gerekli.");
  }
  const requestPayload = {
    pushbullet_token: token,
    event: {
      title: eventPayload.title,
      message: eventPayload.message,
      priority: eventPayload.priority || "3",
      tags: Array.isArray(eventPayload.tags) ? eventPayload.tags : [],
      click_url: eventPayload.clickUrl || null,
    },
  };
  try {
    await postJsonWithTimeout("/api/notifications/pushbullet/send", requestPayload, 20000);
  } catch (primaryError) {
    if (canUseNotificationBridge()) {
      try {
        await postNotificationBridge("/api/notifications/pushbullet/send", requestPayload, 20000);
      } catch {
        throw new Error(primaryError?.message || "Pushbullet bildirimi gönderilemedi.");
      }
    } else {
      throw new Error(primaryError?.message || "Pushbullet bildirimi gönderilemedi.");
    }
  }
}

async function publishNotificationFromClient(settings, eventPayload) {
  await publishPushbulletFromClient(settings, eventPayload);
}

function storeNotificationSendResult(eventPayload, errorMessage = null) {
  const currentState = loadNotificationStateFromStorage();
  const nextState = {
    ...currentState,
    last_sent_at: errorMessage ? currentState.last_sent_at ?? null : new Date().toISOString(),
    last_level: errorMessage ? (currentState.last_level || "normal") : (eventPayload.level || currentState.last_level || "normal"),
    last_risk_percent: errorMessage ? (currentState.last_risk_percent ?? null) : (eventPayload.riskPercent ?? currentState.last_risk_percent ?? null),
    last_kp: errorMessage ? (currentState.last_kp ?? null) : (eventPayload.kpValue ?? currentState.last_kp ?? null),
    last_title: eventPayload.title,
    last_message: eventPayload.message,
    last_error: errorMessage,
  };
  return saveNotificationStateToStorage(nextState);
}

async function sendNotificationDirect(kind, settings, latest, access) {
  const eventPayload = kind === "test"
    ? {
      title: "Telefon Test Bildirimi",
      message: "Pushbullet bildirim hattÄ± hazÄ±r. Bu test bildirimi panelden gÃ¶nderildi.",
      priority: "3",
      tags: ["satellite", "test"],
      level: "normal",
      riskPercent: null,
      kpValue: null,
      clickUrl: access?.public_url || access?.local_url || window.location.origin,
    }
    : buildNotificationEvent(latest, access, kind);

  await publishNotificationFromClient(settings, eventPayload);
  return storeNotificationSendResult(eventPayload, null);
}

async function maybeSendAutoNotification(latest, access, notifications) {
  if (!isLocalNotificationAdmin()) return;
  const payload = mergeNotificationPayload(notifications);
  const settings = payload.settings || {};
  if (notificationAutoInFlight) return;
  if (!settings.enabled || !settings.pushbullet_token || !latest?.evaluation) return;

  const evaluation = latest.evaluation || {};
  const level = String(evaluation.level || "normal").toLowerCase();
  const state = loadNotificationStateFromStorage();
  const baselineLevel = String(state.last_level || "normal").toLowerCase();
  const lastSentAt = state.last_sent_at ? parseUtcDate(state.last_sent_at) : null;
  const cooldownMs = Math.max(5, parseInt(settings.cooldown_minutes, 10) || 60) * 60 * 1000;
  const nowMs = Date.now();
  const riskPercent = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const kpValue = parseNumber(evaluation?.noaa?.kp ?? evaluation?.noaa?.kp_estimated);
  const levelMeetsThreshold = notificationLevelRank(level) >= notificationLevelRank(settings.min_level);
  const levelIncreased = notificationLevelRank(level) > notificationLevelRank(baselineLevel);
  const lastRisk = parseNumber(state.last_risk_percent);
  const lastKp = parseNumber(state.last_kp);
  const riskIncreased = riskPercent !== null && lastRisk !== null && (riskPercent - lastRisk) >= 8;
  const kpIncreased = kpValue !== null && lastKp !== null && (kpValue - lastKp) >= 0.7;
  const cooldownActive = lastSentAt ? ((nowMs - lastSentAt.getTime()) < cooldownMs) : false;
  const periodicDue = !lastSentAt || !cooldownActive;
  const immediateTrigger = levelIncreased || riskIncreased || kpIncreased || (levelMeetsThreshold && !lastSentAt);
  if (!immediateTrigger && !periodicDue) {
    return;
  }

  const currentKey = `${latest.generated_at || "now"}|${level}|${formatNumber(evaluation.risk_percent ?? evaluation.score, 0)}|${formatNumber(evaluation?.noaa?.kp ?? evaluation?.noaa?.kp_estimated, 2)}`;
  if (notificationAutomationKey === currentKey) {
    return;
  }
  notificationAutomationKey = currentKey;

  if (cooldownActive && !(levelIncreased || riskIncreased || kpIncreased)) {
    return;
  }

  notificationAutoInFlight = true;
  try {
    const mergedSettings = saveNotificationSettingsToStorage(settings);
    const autoMode = immediateTrigger ? "auto" : "periodic";
    await sendNotificationDirect(autoMode, mergedSettings, latest, access);
    renderNotificationPanel(payload, latest, access);
    setStatus(autoMode === "periodic"
      ? "Telefon iÃ§in dÃ¼zenli durum Ã¶zeti gÃ¶nderildi."
      : "Telefon uyarÄ± akÄ±ÅŸÄ± gÃ¼ncel veriye gÃ¶re kontrol edildi.");
  } catch (error) {
    const autoMode = immediateTrigger ? "auto" : "periodic";
    storeNotificationSendResult(buildNotificationEvent(latest, access, autoMode), error.message || "Bildirim gÃ¶nderilemedi.");
  } finally {
    notificationAutoInFlight = false;
  }
}

function satelliteRiskDisplayLabel(label) {
  return {
    Low: "DÃ¼ÅŸÃ¼k",
    Moderate: "Orta",
    High: "YÃ¼ksek",
    Severe: "Åiddetli",
  }[label] || label;
}

function satelliteTrendDisplayLabel(label) {
  return {
    Rising: "YÃ¼kseliyor",
    Stable: "Dengeli",
    Falling: "DÃ¼ÅŸÃ¼yor",
  }[label] || label;
}

function formatLstmMeta(forecast) {
  if (!forecast || forecast.predicted_kp === null || forecast.predicted_kp === undefined) {
    return "Yeterli geçmiş veri biriktiğinde model 3 saat sonrası için öngörü üretir.";
  }

  const targetTime = forecast.target_time ? formatDate(forecast.target_time) : "-";
  const confidence = forecast.confidence_percent === null || forecast.confidence_percent === undefined
    ? "-"
    : `%${formatNumber(forecast.confidence_percent, 0)}`;
  return `Hedef: ${targetTime} • Güven ${confidence}`;
}

function svgLabelMarkup(rawMarkup, fallbackText) {
  if (rawMarkup) {
    return repairMojibakeText(rawMarkup);
  }
  return escapeHtml(repairMojibakeText(fallbackText || ""));
}

function hexToRgba(color, alpha) {
  if (!color || color[0] !== "#" || (color.length !== 7 && color.length !== 4)) {
    return `rgba(31, 26, 23, ${alpha})`;
  }

  let normalized = color.slice(1);
  if (normalized.length === 3) {
    normalized = normalized.split("").map((part) => `${part}${part}`).join("");
  }

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

const MOJIBAKE_PATTERN = /[\u00c3\u00c2\u00c4\u00c5\u00fd\u00dd\u00fe\u00de\u00f0\u00d0]/;
const MOJIBAKE_ATTRIBUTE_NAMES = ["aria-label", "aria-description", "title", "placeholder", "alt"];
const MOJIBAKE_TARGET_CHARS = [
  "\u00e7", "\u00c7", "\u011f", "\u011e", "\u0131", "\u0130", "\u00f6", "\u00d6", "\u015f", "\u015e", "\u00fc", "\u00dc",
  "\u00e2", "\u00c2", "\u00ee", "\u00ce", "\u00fb", "\u00db",
  "\u00e9", "\u00c9",
  "\u2013", "\u2014", "\u2019", "\u2018", "\u201c", "\u201d", "\u2022", "\u2026", "\u2192", "\u2190", "\u00b0", "\u2264", "\u2265",
];

const DIRECT_MOJIBAKE_REPLACEMENTS = [
  ["ý", "ı"],
  ["Ý", "İ"],
  ["þ", "ş"],
  ["Þ", "Ş"],
  ["ð", "ğ"],
  ["Ð", "Ğ"],
  ["Ã§", "ç"],
  ["Ã‡", "Ç"],
  ["Ã¼", "ü"],
  ["Ãœ", "Ü"],
  ["Ã¶", "ö"],
  ["Ã–", "Ö"],
  ["Ä±", "ı"],
  ["Ä°", "İ"],
  ["ÄŸ", "ğ"],
  ["Äž", "Ğ"],
  ["ÅŸ", "ş"],
  ["Åž", "Ş"],
  ["Åž", "Ş"],
  ["Å", "ş"],
  ["Å", "Ş"],
  ["â€“", "–"],
  ["â€”", "—"],
  ["â€˜", "‘"],
  ["â€™", "’"],
  ["â€œ", "“"],
  ["â€�", "”"],
  ["â€¢", "•"],
  ["â€¦", "…"],
  ["â†’", "→"],
  ["â†", "←"],
  ["â‰¤", "≤"],
  ["â‰¥", "≥"],
];

// Conservative-only repair: generated replacements were over-correcting
// already-valid Turkish text in the live DOM.
const MOJIBAKE_REPLACEMENTS = [];
const SATELLITE_UI_TEXT_REPLACEMENTS = [
  ["Uydu etki paneli canlÃ„Â± Kp ve X-ray verileri geldikÃƒÂ§e burada oluÃ…Å¸turulacak.", "Uydu etki paneli canlı Kp ve X-ray verileri geldikçe burada oluşturulacak."],
  ["AnlÃ„Â±k Kp", "Anlık Kp"],
  ["Skorda kullanÃ„Â±lan anlÃ„Â±k Kp", "Skorda kullanılan anlık Kp"],
  ["KullanÃ„Â±lan kategori", "Kullanılan kategori"],
  ["AkÃ„Â±", "Akı"],
  ["W/mÃ‚Â²", "W/m²"],
  ["FÃ„Â±rtÃ„Â±na dÃƒÂ¼zeyi", "Fırtına düzeyi"],
  ["eslestirmesi", "eşleştirmesi"],
  ["Son Kp serisinin yÃƒÂ¶nÃƒÂ¼", "Son Kp serisinin yönü"],
  ["Son gÃƒÂ¼ncelleme", "Son güncelleme"],
  ["LEO sÃƒÂ¼rÃƒÂ¼klenme riski", "LEO sürüklenme riski"],
  ["yorumlandÃ„Â±", "yorumlandı"],
  ["yÃƒÂ¶rÃƒÂ¼nge", "yörünge"],
  ["deÃ„Å¸erlendirildi", "değerlendirildi"],
  ["HaberleÃ…Å¸me", "Haberleşme"],
  ["Ãƒâ€“nerilen aksiyon", "Önerilen aksiyon"],
  ["Ã‚Â·", "·"],
  ["Ã‚Â°", "°"],
  ["Zirhlama", "Zırhlama"],
  ["Baskin surucu", "Baskın sürücü"],
  ["GÃƒÂ¼ncelleme bekleniyor", "Güncelleme bekleniyor"],
  ["HazÃ„Â±r profil", "Hazır profil"],
  ["Irtifa", "İrtifa"],
  ["Ã„Â°rtifa katkÃ„Â±sÃ„Â±", "İrtifa katkısı"],
  ["ASRI Muhendislik Motoru", "ASRI Mühendislik Motoru"],
  ["Hazirlaniyor", "Hazırlanıyor"],
  ["Bu katman canli solar wind, temsili enlem bandi ve zirhlama varsayimi kullanir. Anlik TLE/konum akisi olmadigi icin fiziksel bir yorge simulasyonu degil; hizli operasyonel karar destegi icin yardimci muhendislik yorumudur.", "Bu katman canlı güneş rüzgârı, temsili enlem bandı ve zırhlama varsayımı kullanır. Anlık TLE/konum akışı olmadığı için fiziksel bir yörünge simülasyonu değil; hızlı operasyonel karar desteği için yardımcı mühendislik yorumudur."],
  ["Kp verisi hazÃ„Â±rlanÃ„Â±yor.", "Kp verisi hazırlanıyor."],
  ["X-ray GeÃƒÂ§miÃ…Å¸i", "X-ray Geçmişi"],
  ["GOES long band | log ÃƒÂ¶lÃƒÂ§ek", "GOES long band | log ölçek"],
  ["X-ray serisi hazÃ„Â±rlanÃ„Â±yor.", "X-ray serisi hazırlanıyor."],
  ["Risk kÃ„Â±rÃ„Â±lÃ„Â±mÃ„Â±", "Risk kırılımı"],
  ["Skor katkÃ„Â±larÃ„Â±nÃ„Â±n daÃ„Å¸Ã„Â±lÃ„Â±mÃ„Â±", "Skor katkılarının dağılımı"],
  ["KullanÃ„Â±lan ve ayÃ„Â±klanan bilgiler", "Kullanılan ve ayıklanan bilgiler"],
  ["KullanÃ„Â±lan girdiler", "Kullanılan girdiler"],
  ["BaÃ„Å¸lamsal ama skorsuz", "Bağlamsal ama skorsuz"],
  ["Ãƒâ€“zellikle dÃ„Â±Ã…Å¸lananlar", "Özellikle dışlananlar"],
  ["Ham canlÃ„Â± veriyi gÃƒÂ¶ster", "Ham canlı veriyi göster"],
  ["GOES sÃ„Â±nÃ„Â±fÃ„Â±", "GOES sınıfı"],
  ["KÃ„Â±sa sÃƒÂ¼reli dolgu seri aktif", "Kısa süreli dolgu seri aktif"],
  ["AnlÃ„Â±k GOES sÃ„Â±nÃ„Â±fÃ„Â±", "Anlık GOES sınıfı"],
  ["GeÃƒÂ§miÃ…Å¸ seri sÃ„Â±nÃ„Â±rlÃ„Â±", "Geçmiş seri sınırlı"],
  ["Telemetri ve baglanti marjlarini daha sik izle.", "Telemetri ve bağlantı marjlarını daha sık izle."],
  ["Alt sistem sagligi, charging ve yedek planlar one alinmali.", "Alt sistem sağlığı, charging ve yedek planlar öne alınmalı."],
  ["Hassas operasyonlari erteleme ve koruyucu moda gecis degerlendirilmeli.", "Hassas operasyonları erteleme ve koruyucu moda geçiş değerlendirilmeli."],
  ["Secili profil", "Seçili profil"],
  ["Panelde secilen yoringe ve muhendislik varsayimlari", "Panelde seçilen yörünge ve mühendislik varsayımları"],
  ["gunes ruzgari hizi", "güneş rüzgârı hızı"],
  ["yoringe maruziyeti", "yörünge maruziyeti"],
  ["zirhlama seviyesi", "zırhlama seviyesi"],
  ["operasyonel baski", "operasyonel baskı"],
  ["Yardimci ASRI motoru secili profil icin", "Yardımcı ASRI motoru seçili profil için"],
  ["duzeyinde muhendislik riski hesapliyor.", "düzeyinde mühendislik riski hesaplıyor."],
  ["YÃƒÂ¶rÃƒÂ¼nge tipi", "Yörünge tipi"],
  ["Ã„Â°rtifa", "İrtifa"],
  [" (canlÃ„Â±)", " (canlı)"],
  [" | manuel seÃƒÂ§im", " | manuel seçim"],
  ["Solar wind hizi", "Solar wind hızı"],
  ["Temsili enlem: ", "Temsili enlem: "],
  ["Maruziyet bandi", "Maruziyet bandı"],
  ["ASRI secili skor", "ASRI seçili skor"],
  ["Birlesik operasyon bandi", "Birleşik operasyon bandı"],
  ["Kp girdisi canlÃ„Â± NOAA gÃƒÂ¶zleminden alÃ„Â±ndÃ„Â±.", "Kp girdisi canlı NOAA gözleminden alındı."],
  ["GÃƒÂ¶zlenen Kp yok; NOAA tahmini Kp kullanÃ„Â±ldÃ„Â±.", "Gözlenen Kp yok; NOAA tahmini Kp kullanıldı."],
  ["X-ray girdisi canlÃ„Â± GOES akÃ„Â±Ã…Å¸Ã„Â±ndan alÃ„Â±ndÃ„Â±.", "X-ray girdisi canlı GOES akışından alındı."],
  ["GOES geÃƒÂ§miÃ…Å¸ serisi sÃ„Â±nÃ„Â±rlÃ„Â±; grafik kÃ„Â±sa sÃƒÂ¼reli X-ray sÃƒÂ¼reklilik modeli ile desteklendi.", "GOES geçmiş serisi sınırlı; grafik kısa süreli X-ray süreklilik modeli ile desteklendi."],
  ["GOES geÃƒÂ§miÃ…Å¸ serisi aktif.", "GOES geçmiş serisi aktif."],
  ["GOES geÃƒÂ§miÃ…Å¸ serisi sÃ„Â±nÃ„Â±rlÃ„Â±; yorum anlÃ„Â±k X-ray ÃƒÂ¼zerinden sÃƒÂ¼rdÃƒÂ¼rÃƒÂ¼lÃƒÂ¼yor.", "GOES geçmiş serisi sınırlı; yorum anlık X-ray üzerinden sürdürülüyor."],
  ["Skor sadece Kp + GOES X-ray + yÃƒÂ¶rÃƒÂ¼nge/irtifa maruziyeti ile hesaplanÃ„Â±r.", "Skor sadece Kp + GOES X-ray + yörünge/irtifa maruziyeti ile hesaplanır."],
  ["Skor canlÃ„Â± veriyle hesaplandÃ„Â±.", "Skor canlı veriyle hesaplandı."],
];
let encodingRepairObserver = null;
let encodingRepairFrame = 0;

function roundTripLatin1ToUtf8(value) {
  try {
    const bytes = Uint8Array.from(Array.from(value, (character) => character.charCodeAt(0) & 0xff));
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return value;
  }
}

function repairMojibakeText(value) {
  if (typeof value !== "string") {
    return value;
  }

  let repaired = value;
  for (let pass = 0; pass < 4; pass += 1) {
    let candidate = repaired;
    for (const [broken, correct] of DIRECT_MOJIBAKE_REPLACEMENTS) {
      if (candidate.includes(broken)) {
        candidate = candidate.split(broken).join(correct);
      }
    }
    if (MOJIBAKE_PATTERN.test(candidate)) {
      candidate = roundTripLatin1ToUtf8(candidate);
    }

    let changed = false;
    for (const [broken, correct] of MOJIBAKE_REPLACEMENTS) {
      if (!candidate.includes(broken)) {
        continue;
      }
      candidate = candidate.split(broken).join(correct);
      changed = true;
    }

    if (!changed && candidate === repaired) {
      break;
    }

    repaired = candidate;
    if (!MOJIBAKE_PATTERN.test(repaired)) {
      break;
    }
  }

  return repaired;
}

function applyTargetedTextReplacements(value, replacements) {
  if (typeof value !== "string" || !Array.isArray(replacements) || !replacements.length) {
    return value;
  }
  let repaired = value;
  for (const [broken, correct] of replacements) {
    if (repaired.includes(broken)) {
      repaired = repaired.split(broken).join(correct);
    }
  }
  return repaired;
}

function repairElementText(root, replacements) {
  if (!root || !Array.isArray(replacements) || !replacements.length) {
    return;
  }

  if (root.nodeType === Node.TEXT_NODE) {
    const repairedText = applyTargetedTextReplacements(root.nodeValue || "", replacements);
    if (repairedText !== root.nodeValue) {
      root.nodeValue = repairedText;
    }
    return;
  }

  if (root.nodeType === Node.ELEMENT_NODE) {
    for (const attribute of ["title", "aria-label", "placeholder"]) {
      const current = root.getAttribute(attribute);
      if (typeof current !== "string") {
        continue;
      }
      const repaired = applyTargetedTextReplacements(current, replacements);
      if (repaired !== current) {
        root.setAttribute(attribute, repaired);
      }
    }
  }

  const elementRoot = root.nodeType === Node.DOCUMENT_NODE ? root.documentElement : root;
  if (!elementRoot || !document?.createTreeWalker) {
    return;
  }

  const walker = document.createTreeWalker(elementRoot, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let currentNode = walker.currentNode;
  while (currentNode) {
    if (currentNode.nodeType === Node.TEXT_NODE) {
      const repairedText = applyTargetedTextReplacements(currentNode.nodeValue || "", replacements);
      if (repairedText !== currentNode.nodeValue) {
        currentNode.nodeValue = repairedText;
      }
    } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
      for (const attribute of ["title", "aria-label", "placeholder"]) {
        const current = currentNode.getAttribute(attribute);
        if (typeof current !== "string") {
          continue;
        }
        const repaired = applyTargetedTextReplacements(current, replacements);
        if (repaired !== current) {
          currentNode.setAttribute(attribute, repaired);
        }
      }
    }
    currentNode = walker.nextNode();
  }
}

function setStatus(message) {
  if (!elements.statusLine) {
    return;
  }
  elements.statusLine.textContent = repairMojibakeText(message);
}

function repairNodeAttributes(node) {
  if (!node || node.nodeType !== Node.ELEMENT_NODE || !node.setAttribute) {
    return;
  }

  MOJIBAKE_ATTRIBUTE_NAMES.forEach((attribute) => {
    const current = node.getAttribute(attribute);
    if (!current) {
      return;
    }
    const repaired = repairMojibakeText(current);
    if (repaired !== current) {
      node.setAttribute(attribute, repaired);
    }
  });

  if (typeof node.value === "string") {
    const repairedValue = repairMojibakeText(node.value);
    if (repairedValue !== node.value) {
      node.value = repairedValue;
    }
  }
}

function repairDocumentEncoding(root = document.body) {
  if (!root || !document?.createTreeWalker) {
    return;
  }

  if (document?.documentElement) {
    document.documentElement.lang = "tr";
  }

  if (document.title) {
    document.title = repairMojibakeText(document.title);
  }

  const elementRoot = root.nodeType === Node.DOCUMENT_NODE ? root.documentElement : root;
  if (!elementRoot) {
    return;
  }

  repairNodeAttributes(elementRoot);

  const walker = document.createTreeWalker(elementRoot, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let node = walker.currentNode;
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parentName = node.parentNode?.nodeName;
      if (node.nodeValue && parentName !== "SCRIPT" && parentName !== "STYLE") {
        const repairedText = repairMojibakeText(node.nodeValue);
        if (repairedText !== node.nodeValue) {
          node.nodeValue = repairedText;
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      repairNodeAttributes(node);
    }
    node = walker.nextNode();
  }
}

function scheduleEncodingRepair(root = document.body) {
  const target = root?.nodeType === Node.TEXT_NODE ? root.parentNode : root;
  if (!target) {
    return;
  }

  if (encodingRepairFrame) {
    window.cancelAnimationFrame(encodingRepairFrame);
  }

  encodingRepairFrame = window.requestAnimationFrame(() => {
    encodingRepairFrame = 0;
    repairDocumentEncoding(target);
  });
}

function startEncodingRepairObserver() {
  if (encodingRepairObserver || !window.MutationObserver || !document?.body) {
    return;
  }

  encodingRepairObserver = new MutationObserver((mutations) => {
    let target = document.body;
    for (const mutation of mutations) {
      if (mutation.type === "characterData" && mutation.target?.parentNode) {
        target = mutation.target.parentNode;
        break;
      }
      if (mutation.target?.nodeType === Node.ELEMENT_NODE) {
        target = mutation.target;
        break;
      }
    }
    scheduleEncodingRepair(target);
  });

  encodingRepairObserver.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: MOJIBAKE_ATTRIBUTE_NAMES,
  });
}

function renderAccess(access) {
  if (!elements.accessMode || !elements.accessPublicUrl || !elements.accessHint || !elements.accessLocalUrl) {
    return;
  }
  const localUrl = access?.local_url || "http://127.0.0.1:8080";
  const publicUrl = access?.public_url || "";
  const mode = access?.mode || (publicUrl ? "public_tunnel" : "local_only");
  const resolvedMessage = mode === "lan_share"
    ? repairMojibakeText(access?.message || "Sabit baglanti hazir oldugunda bu adresi ayni Wi-Fi agindaki cihazlarda kullanabilirsin.")
    : null;
  const message = repairMojibakeText(access?.message || "DÄ±ÅŸ aÄŸ paylaÅŸÄ±mÄ± hazÄ±r olduÄŸunda baÄŸlantÄ± burada gÃ¶rÃ¼nÃ¼r.");

  elements.accessMode.textContent = formatAccessMode(mode);
  elements.accessMode.className = `badge ${accessModeBadgeClass[mode] || "badge-neutral"}`;

  elements.accessLocalUrl.textContent = localUrl;
  elements.accessLocalUrl.href = localUrl;

  if (publicUrl) {
    elements.accessPublicUrl.textContent = publicUrl;
    elements.accessPublicUrl.href = publicUrl;
    elements.accessPublicUrl.classList.remove("access-link-disabled");
  } else {
    elements.accessPublicUrl.textContent = mode === "public_tunnel_pending"
      ? "DÄ±ÅŸ aÄŸ baÄŸlantÄ±sÄ± hazÄ±rlanÄ±yor"
      : "DÄ±ÅŸ aÄŸ baÄŸlantÄ±sÄ± henÃ¼z hazÄ±r deÄŸil";
    elements.accessPublicUrl.href = "#";
    elements.accessPublicUrl.classList.add("access-link-disabled");
  }

  elements.accessHint.textContent = resolvedMessage || repairMojibakeText(message);
}

function clearNasaSlideshowTimer() {
  if (nasaSlideshowTimer) {
    window.clearTimeout(nasaSlideshowTimer);
    nasaSlideshowTimer = null;
  }
}

function buildNasaCards(latest) {
  return Array.isArray(latest?.web_nasa_images) && latest.web_nasa_images.length
    ? latest.web_nasa_images
    : Object.entries(latest?.web_images || {}).map(([name, url]) => ({
      name,
      title: name.replace(/_/g, " "),
      provider: "NASA",
      image_url: url,
      detail_url: url,
      cached: String(url).startsWith("/media/"),
    }));
}

function buildNasaInterpretation(card) {
  const descriptions = {
    soho_eit_171: {
      summary: "Bu kanal, GÃ¼neÅŸ atmosferindeki daha serin koronal halkalarÄ± ve aktif bÃ¶lge Ã§evrelerini Ã¶ne Ã§Ä±karÄ±r.",
      signal: "Manyetik alan boyunca uzanan koronal yapÄ±larÄ±n biÃ§imini ve parlaklÄ±k deÄŸiÅŸimlerini gÃ¶sterir.",
      why: "Aktif bÃ¶lgelerin ne kadar dÃ¼zenli ya da gerilimli olduÄŸunu anlamaya yardÄ±mcÄ± olur.",
    },
    soho_eit_195: {
      summary: "Bu gÃ¶rÃ¼ntÃ¼, orta sÄ±caklÄ±ktaki korona yapÄ±larÄ±nÄ± ve aktif bÃ¶lge parlaklÄ±klarÄ±nÄ± Ã¶ne Ã§Ä±karÄ±r.",
      signal: "Parlama Ã¶ncesi ve sonrasÄ± parlaklÄ±k artÄ±ÅŸlarÄ±nÄ±, koronal dÃ¶ngÃ¼leri ve Ä±ÅŸÄ±nÄ±m yoÄŸunlaÅŸmalarÄ±nÄ± izletir.",
      why: "Enerji birikimi ve ani boÅŸalÄ±m iÅŸaretlerini takip etmek iÃ§in yararlÄ±dÄ±r.",
    },
    soho_eit_284: {
      summary: "Bu kanal, daha sÄ±cak koronal bÃ¶lgeleri ve yÃ¼ksek enerji iÃ§eren yapÄ±larÄ± daha belirgin hale getirir.",
      signal: "YÃ¼ksek sÄ±caklÄ±klÄ± aktif bÃ¶lgeler ve yayvan koronal yapÄ±lar burada daha net seÃ§ilir.",
      why: "SÄ±cak ve yoÄŸun bÃ¶lgeler, artan gÃ¼neÅŸ etkinliÄŸinin izlerini taÅŸÄ±yabilir.",
    },
    soho_eit_304: {
      summary: "Bu gÃ¶rÃ¼ntÃ¼, kromosfer ve alt korona malzemesini; Ã¶zellikle filament ve prominensleri gÃ¶sterir.",
      signal: "Kopmaya hazÄ±r filamentler, kenardaki plazma yapÄ±larÄ± ve patlama tabanlarÄ± bu kanalda belirginleÅŸir.",
      why: "Filament kopmalarÄ± ve yÃ¼kselen plazma, CME oluÅŸumunun erken habercileri olabilir.",
    },
    sdo_hmi_intensitygram: {
      summary: "Bu gÃ¶rÃ¼ntÃ¼, GÃ¼neÅŸ yÃ¼zeyindeki lekeleri ve fotosfer dokusunu doÄŸrudan gÃ¶sterir.",
      signal: "Leke gruplarÄ±nÄ±n bÃ¼yÃ¼klÃ¼ÄŸÃ¼, yoÄŸunluÄŸu ve birbirine gÃ¶re konumu burada takip edilir.",
      why: "BÃ¼yÃ¼k ve hÄ±zla geliÅŸen leke gruplarÄ±, daha yÃ¼ksek parlama potansiyeline iÅŸaret edebilir.",
    },
    sdo_hmi_magnetogram: {
      summary: "Bu magnetogram, GÃ¼neÅŸ yÃ¼zeyindeki pozitif ve negatif manyetik kutuplarÄ±n daÄŸÄ±lÄ±mÄ±nÄ± gÃ¶sterir.",
      signal: "KarÅŸÄ±t kutuplarÄ±n yakÄ±n temas ettiÄŸi ve karmaÅŸÄ±klaÅŸtÄ±ÄŸÄ± bÃ¶lgeler burada Ã¶ne Ã§Ä±kar.",
      why: "Manyetik karmaÅŸÄ±klÄ±k arttÄ±kÃ§a parlama ve patlayÄ±cÄ± olay olasÄ±lÄ±ÄŸÄ± da artabilir.",
    },
    soho_lasco_c2: {
      summary: "Bu korona gÃ¶rÃ¼ntÃ¼sÃ¼, GÃ¼neÅŸ dÄ±ÅŸ atmosferini merkezdeki parlak disk maskelenmiÅŸ halde gÃ¶sterir.",
      signal: "Koronal kÃ¼tle atÄ±mlarÄ±, dÄ±ÅŸarÄ± yayÄ±lan parlak bulut yapÄ±larÄ± olarak seÃ§ilir.",
      why: "DÃ¼nyaâ€™ya etkili olabilecek CMEâ€™lerin baÅŸlangÄ±Ã§ yÃ¶nÃ¼ ve ilk yayÄ±lÄ±mÄ± burada izlenir.",
    },
    soho_lasco_c3: {
      summary: "Bu geniÅŸ alanlÄ± korona gÃ¶rÃ¼ntÃ¼sÃ¼, CMEâ€™leri GÃ¼neÅŸâ€™ten daha uzakta takip etmeye yarar.",
      signal: "DÄ±ÅŸa doÄŸru ilerleyen plazma bulutunun yayÄ±lÄ±m aÃ§Ä±sÄ± ve geniÅŸliÄŸi bu alanda gÃ¶rÃ¼lÃ¼r.",
      why: "CMEâ€™nin ne kadar geniÅŸ bir alana yayÄ±ldÄ±ÄŸÄ±nÄ± ve uzaya nasÄ±l ilerlediÄŸini anlamaya yardÄ±mcÄ± olur.",
    },
  };

  return descriptions[card?.name] || {
    summary: "Bu NASA gÃ¶rÃ¼ntÃ¼sÃ¼, seÃ§ili kanal Ã¼zerinden GÃ¼neÅŸâ€™in o andaki yapÄ±sÄ±nÄ± ve hareketli bÃ¶lgelerini gÃ¶sterir.",
    signal: "ParlaklÄ±k, doku ve yayÄ±lÄ±m farklarÄ± aktif veya sakin bÃ¶lgeleri ayÄ±rt etmenize yardÄ±mcÄ± olur.",
    why: "GÃ¶rsel deÄŸiÅŸimler, sayÄ±sal verilerle birlikte uzay havasÄ± yorumunu destekler.",
  };
}

function scheduleNasaSlideshow(cards) {
  clearNasaSlideshowTimer();
  if (nasaSlideshowPaused || cards.length <= 1) {
    return;
  }

  nasaSlideshowTimer = window.setTimeout(() => {
    if (document.hidden) {
      scheduleNasaSlideshow(cards);
      return;
    }
    advanceNasaSlide(1);
  }, NASA_SLIDE_INTERVAL_MS);
}

function advanceNasaSlide(direction) {
  if (!lastNasaGalleryLatest) return;
  const cards = buildNasaCards(lastNasaGalleryLatest);
  if (cards.length <= 1) return;

  const currentIndex = Math.max(0, cards.findIndex((card) => card.name === selectedNasaImageName));
  const nextIndex = (currentIndex + direction + cards.length) % cards.length;
  selectedNasaImageName = cards[nextIndex].name;
  renderImages(lastNasaGalleryLatest);
}

function strongestStation(stations) {
  return (stations || [])
    .filter((station) => station && station.delta_nt !== null && station.delta_nt !== undefined && !station.error)
    .sort((left, right) => Math.abs(Number(right.delta_nt)) - Math.abs(Number(left.delta_nt)))[0] || null;
}

function buildRiskNarrative(latest, noaa, riskPercent) {
  if (!latest) {
    return "CanlÄ± NOAA ve INTERMAGNET verileri geldikÃ§e risk Ã¶zeti burada kendini otomatik olarak yeniler.";
  }

  const evaluation = latest.evaluation || {};
  const level = evaluation.level || "normal";
  if (level === "severe") {
    return "Kritik eÅŸik aÅŸÄ±mÄ± var. %35 altÄ± gÃ¼venli kabul edilir, %85 ve Ã¼zeri ÅŸiddetli risk bÃ¶lgesidir.";
  }
  if (level === "warning") {
    return "Kritik eÅŸik aÅŸÄ±mÄ± var. %35 altÄ± gÃ¼venli kabul edilir, %60 Ã¼stÃ¼ gÃ¼Ã§lÃ¼ uyarÄ± bÃ¶lgesidir.";
  }
  if (level === "watch") {
    return "Kritik eÅŸik aÅŸÄ±mÄ± var. %35 altÄ± gÃ¼venli kabul edilir, mevcut durum izleme bandÄ±ndadÄ±r.";
  }
  return "Kritik eÅŸik aÅŸÄ±mÄ± yok. %35â€™e kadar gÃ¼venli kabul edilir.";
}

function renderRiskSummary(latest, noaa, riskPercent) {
  if (!latest) {
    elements.riskBar.style.width = "0%";
    elements.riskBar.className = "risk-bar";
    elements.riskNarrative.textContent = "CanlÄ± NOAA ve INTERMAGNET verileri geldikÃ§e risk Ã¶zeti burada kendini otomatik olarak yeniler.";
    return;
  }

  const level = latest?.evaluation?.level || "normal";
  const clampedRisk = Math.max(0, Math.min(100, Number(riskPercent || 0)));
  elements.riskBar.style.width = `${clampedRisk}%`;
  elements.riskBar.className = `risk-bar ${level === "normal" ? "" : `risk-${level}`}`.trim();
  elements.riskNarrative.textContent = buildRiskNarrative(latest, noaa, clampedRisk);
}

function getLatestChartPoint(chart) {
  const points = chart?.points || [];
  if (!points.length) return null;
  return points[points.length - 1];
}

function getChartWindow(charts) {
  const end = parseUtcDate(charts?.window_end) || new Date();
  const days = Number(charts?.window_days || 27);
  const start = parseUtcDate(charts?.window_start) || new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  return { start, end, days };
}

function chartSeries(chart) {
  return (chart?.points || [])
    .map((item) => ({
      time: item.time,
      date: parseUtcDate(item.time),
      value: Number(item.value),
    }))
    .filter((item) => item.date && Number.isFinite(item.value))
    .sort((left, right) => left.date - right.date);
}

function buildSmoothPath(points) {
  if (!points.length) {
    return "";
  }
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] || points[index];
    const current = points[index];
    const next = points[index + 1];
    const afterNext = points[index + 2] || next;
    const control1X = current.x + ((next.x - previous.x) / 6);
    const control1Y = current.y + ((next.y - previous.y) / 6);
    const control2X = next.x - ((afterNext.x - current.x) / 6);
    const control2Y = next.y - ((afterNext.y - current.y) / 6);
    path += ` C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${next.x} ${next.y}`;
  }
  return path;
}

function buildLinearPath(points) {
  if (!points.length) {
    return "";
  }
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length; index += 1) {
    path += ` L ${points[index].x} ${points[index].y}`;
  }
  return path;
}

function buildAreaPath(points, baselineY) {
  if (!points.length) {
    return "";
  }
  if (points.length === 1) {
    return `M ${points[0].x} ${baselineY} L ${points[0].x} ${points[0].y} L ${points[0].x} ${baselineY} Z`;
  }

  const first = points[0];
  const last = points[points.length - 1];
  const smoothPath = buildSmoothPath(points);
  const leading = `M ${first.x} ${first.y}`;
  const tail = smoothPath.startsWith(leading) ? smoothPath.slice(leading.length) : "";
  return `M ${first.x} ${baselineY} L ${first.x} ${first.y}${tail} L ${last.x} ${baselineY} Z`;
}

function ensureChartTooltipNode() {
  if (chartTooltipNode && document.body.contains(chartTooltipNode)) {
    return chartTooltipNode;
  }
  chartTooltipNode = document.createElement("div");
  chartTooltipNode.className = "chart-tooltip";
  document.body.appendChild(chartTooltipNode);
  return chartTooltipNode;
}

function hideChartTooltip() {
  const tooltip = ensureChartTooltipNode();
  tooltip.classList.remove("is-visible");
}

function showChartTooltip(event, payload) {
  const tooltip = ensureChartTooltipNode();
  const title = payload?.title ? `<strong>${escapeHtml(payload.title)}</strong>` : "";
  const lines = Array.isArray(payload?.lines)
    ? payload.lines.map((line) => `<span>${escapeHtml(line)}</span>`).join("")
    : "";
  tooltip.innerHTML = `${title}${lines}`;
  tooltip.classList.add("is-visible");

  const margin = 14;
  const rect = tooltip.getBoundingClientRect();
  let left = event.clientX + 18;
  let top = event.clientY - (rect.height / 2);
  if ((left + rect.width) > (window.innerWidth - margin)) {
    left = event.clientX - rect.width - 18;
  }
  if (top < margin) {
    top = margin;
  }
  if ((top + rect.height) > (window.innerHeight - margin)) {
    top = window.innerHeight - rect.height - margin;
  }
  tooltip.style.left = `${Math.max(margin, left)}px`;
  tooltip.style.top = `${Math.max(margin, top)}px`;
}

function bindSvgTooltip(svg, points, config = {}) {
  if (!svg || !points.length) {
    return;
  }
  let hoverLayer = svg.querySelector("[data-chart-hover-layer]");
  if (!hoverLayer) {
    hoverLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    hoverLayer.setAttribute("data-chart-hover-layer", "true");
    svg.appendChild(hoverLayer);
  }
  const plotTop = config.plotTop ?? 18;
  const plotBottom = config.plotBottom ?? ((config.height || 220) - 42);
  const strokeColor = config.color || "#0f5f69";
  const pointColor = config.pointColor || strokeColor;
  const width = config.width || 380;
  const height = config.height || 230;

  const renderHover = (point, event) => {
    if (hoverLayer) {
      hoverLayer.innerHTML = `
        <line x1="${point.x}" y1="${plotTop}" x2="${point.x}" y2="${plotBottom}" stroke="rgba(15, 23, 42, 0.18)" stroke-width="1" stroke-dasharray="4 5"></line>
        <circle cx="${point.x}" cy="${point.y}" r="8" fill="${hexToRgba(pointColor, 0.14)}"></circle>
        <circle cx="${point.x}" cy="${point.y}" r="4.2" fill="#ffffff" stroke="${strokeColor}" stroke-width="1.8"></circle>
        <circle cx="${point.x}" cy="${point.y}" r="2.1" fill="${strokeColor}"></circle>
      `;
    }
    const formatter = typeof config.formatter === "function"
      ? config.formatter
      : ((current) => ({
        title: formatDate(current.time || current.date?.toISOString()),
        lines: [String(current.value ?? "-")],
      }));
    showChartTooltip(event, formatter(point));
  };

  const resolvePoint = (event) => {
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return points[0];
    }
    const x = ((event.clientX - rect.left) / rect.width) * width;
    const y = ((event.clientY - rect.top) / rect.height) * height;
    let nearest = points[0];
    let bestScore = Number.POSITIVE_INFINITY;
    points.forEach((point) => {
      const score = Math.abs(point.x - x) + (Math.abs(point.y - y) * 0.35);
      if (score < bestScore) {
        bestScore = score;
        nearest = point;
      }
    });
    return nearest;
  };

  svg.style.cursor = "crosshair";
  svg.onpointerenter = (event) => {
    renderHover(resolvePoint(event), event);
  };
  svg.onpointerdown = (event) => {
    renderHover(resolvePoint(event), event);
  };
  svg.onpointermove = (event) => {
    renderHover(resolvePoint(event), event);
  };
  svg.onpointerleave = () => {
    if (hoverLayer) {
      hoverLayer.innerHTML = "";
    }
    hideChartTooltip();
  };
  svg.onpointercancel = svg.onpointerleave;
}

function comparisonSeriesFromHistory(history, charts = null) {
  const actual = [];
  const forecast = [];
  const archiveActualPoints = Array.isArray(charts?.kp_daily_archive_actual?.points)
    ? charts.kp_daily_archive_actual.points
    : [];

  archiveActualPoints.forEach((point) => {
    const actualDate = parseUtcDate(point?.time);
    const actualValue = Number(point?.value);
    if (actualDate && Number.isFinite(actualValue)) {
      actual.push({
        date: actualDate,
        time: point.time,
        value: actualValue,
      });
    }
  });

  (history || []).forEach((item) => {
    if (!archiveActualPoints.length) {
      const actualDate = parseUtcDate(item.generated_at);
      const actualValue = Number(item.kp);
      if (actualDate && Number.isFinite(actualValue)) {
        actual.push({
          date: actualDate,
          time: item.generated_at,
          value: actualValue,
        });
      }
    }

    const forecastDate = parseUtcDate(item.kp_lstm_target_time || item.generated_at);
    const forecastValue = Number(item.kp_lstm_predicted_kp);
    const confidence = Number(item.kp_lstm_confidence_percent);
    if (forecastDate && Number.isFinite(forecastValue)) {
      forecast.push({
        date: forecastDate,
        time: item.kp_lstm_target_time || item.generated_at,
        value: forecastValue,
        confidence,
      });
    }
  });

  actual.sort((left, right) => left.date - right.date);
  forecast.sort((left, right) => left.date - right.date);
  return { actual, forecast };
}

function renderReasons(latest) {
  if (!elements.reasonsList) {
    return;
  }
  elements.reasonsList.innerHTML = "";
  const reasons = latest?.evaluation?.reasons || [];
  if (!reasons.length) {
    elements.reasonsList.innerHTML = "<li>Åu anda risk dÃ¼zeyini yukarÄ± taÅŸÄ±yan belirgin bir eÅŸik aÅŸÄ±mÄ± gÃ¶rÃ¼nmÃ¼yor.</li>";
    return;
  }

  reasons.forEach((reason) => {
    const li = document.createElement("li");
    li.textContent = reason;
    elements.reasonsList.appendChild(li);
  });
}

function renderNoaa(noaa) {
  const forecast = noaa?.kp_lstm_forecast || null;
  const rows = [
    ["Kp (LSTM Ã–ngÃ¶rÃ¼)", formatNumber(forecast?.predicted_kp, 2)],
    ["LSTM Hedef ZamanÄ±", formatDate(forecast?.target_time)],
    ["LSTM GÃ¼veni", forecast?.confidence_percent === null || forecast?.confidence_percent === undefined ? "-" : `%${formatNumber(forecast.confidence_percent, 0)}`],
    ["LSTM EÄŸilimi", forecast?.trend || "-"],
    ["GÃ¶zlem ZamanÄ± (TSÄ°)", formatDate(noaa.observed_at)],
    ["Kp (GÃ¶zlenen)", formatNumber(noaa.kp, 2)],
    ["Kp GÃ¶zlem ZamanÄ±", formatDate(noaa.observed_kp_at)],
    ["Kp (Tahmini)", formatNumber(noaa.kp_estimated, 2)],
    ["Kp Tahmin ZamanÄ±", formatDate(noaa.estimated_kp_at)],
    ["HÄ±z", `${formatNumber(noaa.solar_wind_speed_km_s, 1)} km/s`],
    ["YoÄŸunluk", `${formatNumber(noaa.proton_density_p_cm3, 2)} p/cm3`],
    ["B<sub>z</sub>", `${formatNumber(noaa.bz_nt, 2)} nT`],
    ["Bt", `${formatNumber(noaa.bt_nt, 2)} nT`],
  ];

  elements.noaaMetrics.innerHTML = rows.map(([label, value]) => `
    <div>
      <dt>${label}</dt>
      <dd>${value}</dd>
    </div>
  `).join("");
  repairDocumentEncoding(elements.noaaMetrics);
}

function renderStations(latest) {
  const stations = latest?.evaluation?.intermagnet || [];
  if (!stations.length) {
    elements.stationList.innerHTML = '<div class="station-card"><p>Ä°stasyon verisi henÃ¼z gelmedi.</p></div>';
    return;
  }

  elements.stationList.innerHTML = stations.map((station) => {
    const lastValue = station.last_value_nt === null || station.last_value_nt === undefined
      ? "-"
      : `${formatNumber(station.last_value_nt, 2)} nT`;
    const delta = station.delta_nt === null || station.delta_nt === undefined
      ? "-"
      : `${formatNumber(station.delta_nt, 2)} nT`;
    const tail = station.error || (station.last_time ? `Son Ã¶lÃ§Ã¼m (TSÄ°): ${formatDate(station.last_time)}` : "Durum hazÄ±r");
    return `
      <article class="station-card">
        <header>
          <h3>${station.station}</h3>
          <span>${station.component || "-"}</span>
        </header>
        <p>Son deÄŸer: ${lastValue}</p>
        <p>Alan deÄŸiÅŸimi: ${delta}</p>
        <p>Ã–rnek sayÄ±sÄ±: ${station.samples ?? 0}</p>
        <p>${tail}</p>
      </article>
    `;
  }).join("");
  repairDocumentEncoding(elements.stationList);
}

function renderConfidence(evaluation) {
  const percent = Number(evaluation?.confidence_percent);
  const reasons = evaluation?.confidence_reasons || [];
  const label = formatConfidenceLabel(evaluation?.confidence_label);
  if (!Number.isFinite(percent)) {
    elements.confidenceValue.textContent = "-";
    elements.confidenceMeta.textContent = "Veri uyumu ve kapsama bekleniyor.";
    return;
  }

  elements.confidenceValue.textContent = `${formatNumber(percent, 0)}%`;
  if (reasons.length) {
    elements.confidenceMeta.textContent = `${label} gÃ¼ven | ${reasons.join(" | ")}`;
    return;
  }
  elements.confidenceMeta.textContent = `${label} gÃ¼ven`;
}

function renderSectorImpacts(latest) {
  const impacts = latest?.evaluation?.sector_impacts || [];
  if (!impacts.length) {
    elements.impactGrid.innerHTML = `
      <article class="impact-card impact-empty">
        <p>SektÃ¶r bazlÄ± etki deÄŸerlendirmesi veri geldikÃ§e burada oluÅŸturulacak.</p>
      </article>
    `;
    return;
  }

  elements.impactGrid.innerHTML = impacts.map((impact) => {
    const drivers = (impact.drivers || []).length
      ? impact.drivers.map((driver) => `<li>${escapeHtml(driver)}</li>`).join("")
      : "<li>Belirgin sÃ¼rÃ¼kleyici sinyal yok.</li>";
    return `
      <article class="impact-card">
        <div class="impact-head">
          <div>
            <h3>${escapeHtml(impact.title)}</h3>
            <p class="impact-subtitle">${escapeHtml(impact.subtitle || "")}</p>
          </div>
          <div class="impact-side">
            <span class="badge ${levelClass[impact.level] || "badge-neutral"}">${formatLevel(impact.level)}</span>
            <strong class="impact-score">${formatNumber(impact.risk_percent, 0)}%</strong>
          </div>
        </div>
        <p class="impact-summary">${escapeHtml(impact.summary || "")}</p>
        <div class="impact-footer">
          <span class="impact-footer-label">Etkileyen sinyaller</span>
          <ul class="impact-driver-list">${drivers}</ul>
        </div>
      </article>
    `;
  }).join("");
}

function turkeyNormalize(value, minValue, maxValue) {
  const number = Number(value);
  if (!Number.isFinite(number) || maxValue === minValue) return 0;
  return clamp(((number - minValue) / (maxValue - minValue)) * 100, 0, 100);
}

function turkeyInterpolateColor(score, alpha = 1) {
  const safeScore = clamp(Number(score) || 0, 0, 100);
  let left = TURKEY_RISK_STOPS[0];
  let right = TURKEY_RISK_STOPS[TURKEY_RISK_STOPS.length - 1];
  for (let index = 0; index < TURKEY_RISK_STOPS.length - 1; index += 1) {
    const current = TURKEY_RISK_STOPS[index];
    const next = TURKEY_RISK_STOPS[index + 1];
    if (safeScore >= current.value && safeScore <= next.value) {
      left = current;
      right = next;
      break;
    }
  }
  const factor = (safeScore - left.value) / ((right.value - left.value) || 1);
  const red = Math.round(lerp(left.color[0], right.color[0], factor));
  const green = Math.round(lerp(left.color[1], right.color[1], factor));
  const blue = Math.round(lerp(left.color[2], right.color[2], factor));
  return alpha >= 1
    ? `rgb(${red}, ${green}, ${blue})`
    : `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function turkeyRiskColor(score, alpha = 1) {
  return turkeyInterpolateColor(score, alpha);
}

function turkeyRiskLabel(score) {
  if (score >= 80) return "Kritik";
  if (score >= 65) return "YÃ¼ksek";
  if (score >= 45) return "Orta-YÃ¼ksek";
  if (score >= 25) return "Orta";
  return "DÃ¼ÅŸÃ¼k";
}

function turkeyLonToX(lon) {
  const factor = (lon - TURKEY_BOUNDS.minLon) / (TURKEY_BOUNDS.maxLon - TURKEY_BOUNDS.minLon);
  return lerp(100, 1100, factor);
}

function turkeyLatToY(lat) {
  const factor = (lat - TURKEY_BOUNDS.minLat) / (TURKEY_BOUNDS.maxLat - TURKEY_BOUNDS.minLat);
  return lerp(445, 105, factor);
}

function turkeyOutlinePath() {
  return `
    M 114 252
    L 127 230
    L 153 220
    L 174 205
    L 188 181
    L 220 173
    L 248 160
    L 275 161
    L 302 149
    L 328 148
    L 353 137
    L 382 141
    L 418 129
    L 451 134
    L 482 126
    L 517 133
    L 548 127
    L 583 135
    L 614 130
    L 646 139
    L 684 136
    L 720 150
    L 756 149
    L 796 165
    L 836 166
    L 873 179
    L 916 191
    L 954 199
    L 985 218
    L 1032 227
    L 1061 246
    L 1074 268
    L 1065 286
    L 1035 300
    L 1001 314
    L 968 319
    L 934 332
    L 900 337
    L 859 352
    L 818 349
    L 778 359
    L 742 354
    L 702 368
    L 665 367
    L 622 378
    L 584 375
    L 543 387
    L 502 382
    L 469 389
    L 437 380
    L 398 388
    L 360 381
    L 323 389
    L 289 381
    L 257 388
    L 220 379
    L 193 362
    L 162 355
    L 136 334
    L 120 313
    L 112 286
    L 114 252 Z
  `;
}

function turkeyInternalVectorPaths() {
  return [
    "M 175 232 C 230 210, 284 206, 344 210",
    "M 332 149 C 350 177, 357 204, 361 234",
    "M 250 170 C 290 190, 340 196, 400 196",
    "M 404 145 C 423 174, 434 204, 438 242",
    "M 496 130 C 510 164, 512 197, 514 236",
    "M 579 134 C 600 162, 612 195, 615 236",
    "M 672 137 C 698 163, 716 190, 728 226",
    "M 765 154 C 792 182, 800 208, 803 245",
    "M 857 174 C 876 198, 884 226, 886 258",
    "M 945 202 C 948 232, 942 256, 930 282",
    "M 200 306 C 260 292, 332 285, 406 288",
    "M 405 288 C 468 276, 527 273, 590 282",
    "M 590 282 C 650 274, 719 272, 785 283",
    "M 785 283 C 850 276, 922 282, 981 301",
    "M 244 357 C 314 341, 391 338, 463 346",
    "M 463 346 C 531 338, 602 341, 678 352",
    "M 678 352 C 747 344, 821 342, 886 349",
    "M 290 208 C 296 254, 292 301, 287 346",
    "M 384 198 C 388 245, 384 298, 377 360",
    "M 476 196 C 480 240, 478 296, 470 384",
    "M 570 194 C 576 240, 572 299, 561 378",
    "M 664 197 C 668 241, 665 299, 655 372",
    "M 760 208 C 767 248, 762 294, 752 356",
    "M 852 219 C 854 254, 847 294, 833 348",
    "M 211 246 C 272 247, 334 252, 398 266",
    "M 401 266 C 465 257, 535 258, 603 269",
    "M 603 269 C 664 262, 731 262, 799 272",
    "M 799 272 C 850 270, 908 275, 958 289",
  ];
}

function turkeyRecentChartValues(series, hours = 24) {
  const points = Array.isArray(series?.points) ? series.points : [];
  if (!points.length) return [];
  const latestTime = parseUtcDate(points[points.length - 1]?.time) || new Date();
  const cutoff = latestTime.getTime() - (hours * 60 * 60 * 1000);
  return points
    .filter((point) => {
      const time = parseUtcDate(point?.time);
      return time && time.getTime() >= cutoff;
    })
    .map((point) => Number(point.value))
    .filter((value) => Number.isFinite(value));
}

function turkeyTimeHour(dateLike) {
  try {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Europe/Istanbul",
    });
    return Number(formatter.format(parseUtcDate(dateLike) || new Date()));
  } catch {
    return 12;
  }
}

function turkeyDaylightFactor(dateLike) {
  const hour = turkeyTimeHour(dateLike);
  if (hour < 6 || hour > 19) return 0.18;
  const distance = Math.abs(hour - 12.5);
  return clamp(1 - (distance / 7.5), 0.32, 1);
}

function turkeyXrayScore(solar) {
  const flux = parseNumber(solar?.xray_flux?.long_w_m2);
  if (flux && flux > 0) {
    return clamp((Math.log10(flux) + 8.1) / 4.2, 0.04, 1);
  }
  const kpFallback = parseNumber(solar?.sunspot_predicted?.value);
  if (kpFallback !== null && kpFallback !== undefined) {
    return clamp(kpFallback / 260, 0.04, 0.45);
  }
  return 0.12;
}

function turkeySectorImpactRisk(evaluation, id, fallback) {
  const impacts = Array.isArray(evaluation?.sector_impacts) ? evaluation.sector_impacts : [];
  const match = impacts.find((item) => item?.id === id);
  const risk = parseNumber(match?.risk_percent);
  if (risk !== null && risk !== undefined) {
    return clamp(risk, 0, 100);
  }
  return clamp(Number(fallback) || 0, 0, 100);
}

function deriveTurkeyRiskGlobal(latest, noaa, charts, solar) {
  const generatedAt = latest?.generated_at || noaa?.observed_at || new Date().toISOString();
  const evaluation = latest?.evaluation || {};
  const confidencePercent = parseNumber(evaluation?.confidence_percent) ?? 84;
  const overallRisk = parseNumber(evaluation?.risk_percent ?? evaluation?.score) ?? 18;
  const kpNow = parseNumber(noaa?.kp) ?? parseNumber(noaa?.kp_estimated) ?? 2.4;
  const kpForecast3h = parseNumber(noaa?.kp_lstm_forecast?.predicted_kp) ?? parseNumber(noaa?.kp_estimated) ?? kpNow;
  const bz = parseNumber(noaa?.bz_nt) ?? 0;
  const solarWindSpeed = parseNumber(noaa?.solar_wind_speed_km_s) ?? 380;
  const density = parseNumber(noaa?.proton_density_p_cm3) ?? 6;
  const sunspot = parseNumber(solar?.sunspot_silso?.value) ?? parseNumber(solar?.sunspot_noaa?.value) ?? 70;
  const solarFlux = parseNumber(solar?.solar_flux?.value)
    ?? (63.7 + (0.728 * sunspot) + (0.00089 * sunspot * sunspot));
  const xrayScore = turkeyXrayScore(solar);
  const intermagnet = Array.isArray(evaluation?.intermagnet) ? evaluation.intermagnet : [];
  const stationDeltas = intermagnet
    .map((station) => Math.abs(parseNumber(station?.delta_nt) ?? NaN))
    .filter((value) => Number.isFinite(value));
  const observedValues = turkeyRecentChartValues(charts?.kp_observed, 30);
  const avgObservedKp = observedValues.length
    ? observedValues.reduce((sum, value) => sum + value, 0) / observedValues.length
    : kpNow;
  const maxObservedKp = observedValues.length ? Math.max(...observedValues) : kpNow;
  const daylight = turkeyDaylightFactor(generatedAt);
  const localMagDelta = clamp(
    stationDeltas.length
      ? stationDeltas.reduce((sum, value) => sum + value, 0) / stationDeltas.length
      : ((kpNow * 10) + (Math.max(0, -bz) * 2.5) + (Math.max(0, solarWindSpeed - 350) / 8)),
    0,
    100,
  );
  const stormPersistence = clamp(((avgObservedKp / 7) * 0.60) + ((maxObservedKp / 9) * 0.40), 0.08, 1);
  const gnssNational = turkeySectorImpactRisk(
    evaluation,
    "gnss",
    (kpForecast3h * 4.5) + (xrayScore * 12) + (Math.max(0, solarFlux - 110) / 18),
  );
  const hfNational = turkeySectorImpactRisk(
    evaluation,
    "hf_comm",
    (kpForecast3h * 4.2) + (xrayScore * 16) + (daylight * 8),
  );
  const satelliteNational = turkeySectorImpactRisk(
    evaluation,
    "satellite_ops",
    (kpForecast3h * 4.0) + (Math.max(0, solarWindSpeed - 340) / 20) + (Math.max(0, -bz) * 1.2),
  );
  const powerNational = turkeySectorImpactRisk(
    evaluation,
    "power_grid",
    (kpForecast3h * 3.2) + (Math.max(0, -bz) * 1.8) + (localMagDelta * 0.25),
  );
  const geomagNational = clamp((powerNational * 0.78) + (satelliteNational * 0.22), 0, 100);
  const activityScale = clamp((Math.max(overallRisk, gnssNational, hfNational, geomagNational) - 8) / 55, 0.08, 1);
  const visualScale = clamp((Math.max(overallRisk, kpForecast3h * 7, kpNow * 7) - 10) / 55, 0.06, 1);
  return {
    updatedAt: generatedAt,
    overallRisk,
    kpNow,
    kpForecast3h,
    bz,
    solarWindSpeed,
    density,
    confidence: confidencePercent / 100,
    nationalBaselines: {
      gnss: gnssNational,
      hf: hfNational,
      geomag: geomagNational,
      satellite: satelliteNational,
      power: powerNational,
    },
    activityScale,
    visualScale,
    gnssDrivers: {
      tecBase: clamp(18 + (sunspot * 0.22) + (solarFlux * 0.11) + (kpForecast3h * 3.6), 18, 82),
      tecGradient: clamp((kpForecast3h * 6.5) + (Math.max(0, -bz) * 1.9) + (Math.max(0, solarWindSpeed - 320) / 18), 4, 48),
      scintillation: clamp((xrayScore * 0.42) + ((kpForecast3h / 9) * 0.33) + (Math.max(0, solarFlux - 90) / 240), 0.06, 1),
    },
    hfDrivers: {
      drapAbsorption: clamp((xrayScore * 3.7) + ((kpForecast3h / 9) * 1.6) + (daylight * 0.9), 0.2, 6),
      daylightFactor: daylight,
    },
    geomagDrivers: {
      localMagDelta,
      stormPersistence,
    },
  };
}

function computeTurkeyCoordinateRisk(lat, lon, sectorKey, global) {
  const northFactor = turkeyNormalize(lat, TURKEY_BOUNDS.minLat, TURKEY_BOUNDS.maxLat) / 100;
  const eastFactor = turkeyNormalize(lon, TURKEY_BOUNDS.minLon, TURKEY_BOUNDS.maxLon) / 100;
  const southFactor = 1 - northFactor;
  const activityScale = clamp(global?.activityScale ?? 0.12, 0.08, 1);
  const baselineGnss = parseNumber(global?.nationalBaselines?.gnss) ?? 15;
  const baselineHf = parseNumber(global?.nationalBaselines?.hf) ?? 15;
  const baselineGeomag = parseNumber(global?.nationalBaselines?.geomag) ?? 12;

  const gnssSignal =
    ((0.42 * turkeyNormalize(global.gnssDrivers.tecBase, 15, 70)) +
    (0.36 * turkeyNormalize(global.gnssDrivers.tecGradient, 0, 40)) +
    (0.22 * turkeyNormalize(global.gnssDrivers.scintillation, 0, 1))) - 18;

  const hfSignal =
    ((0.68 * turkeyNormalize(global.hfDrivers.drapAbsorption, 0, 6)) +
    (0.32 * turkeyNormalize(global.hfDrivers.daylightFactor, 0, 1))) - 18;

  const geomagSignal =
    ((0.40 * turkeyNormalize(global.kpNow, 0, 9)) +
    (0.24 * turkeyNormalize(Math.abs(Math.min(global.bz, 0)), 0, 20)) +
    (0.20 * turkeyNormalize(global.geomagDrivers.localMagDelta, 0, 100)) +
    (0.16 * turkeyNormalize(global.geomagDrivers.stormPersistence, 0, 1))) - 16;

  const eastWestWave = Math.sin((eastFactor * Math.PI * 1.65) - 0.35);
  const northSouthWave = Math.cos((northFactor * Math.PI * 1.35) + 0.2);
  const diagonalWave = Math.sin(((lat + lon) * Math.PI) / 8.4);
  const inlandLift = 1 - Math.min(1, Math.abs(eastFactor - 0.52) * 1.7);

  const gnssSpatial =
    ((eastFactor - 0.47) * 7.2) +
    ((northFactor - 0.50) * 5.4) +
    (eastWestWave * 1.8) +
    (diagonalWave * 1.2) +
    ((inlandLift - 0.38) * 2.4);

  const hfSpatial =
    ((eastFactor - 0.43) * 5.6) +
    ((southFactor - 0.43) * 7.9) +
    (northSouthWave * 1.5) +
    (diagonalWave * 0.9);

  const geomagSpatial =
    ((northFactor - 0.47) * 11.4) +
    ((eastFactor - 0.50) * 2.8) +
    (eastWestWave * 1.0) +
    (diagonalWave * 1.4);

  const gnss = clamp(baselineGnss + ((gnssSignal + gnssSpatial) * activityScale), 0, 100);
  const hf = clamp(baselineHf + ((hfSignal + hfSpatial) * activityScale), 0, 100);
  const geomag = clamp(baselineGeomag + ((geomagSignal + geomagSpatial) * activityScale), 0, 100);

  const weights = TURKEY_SECTOR_WEIGHTS[sectorKey] || TURKEY_SECTOR_WEIGHTS.genel;
  const overall = clamp(
    (gnss * weights.gnss) + (hf * weights.hf) + (geomag * weights.geomag),
    0,
    100,
  );

  return {
    lat,
    lon,
    gnss,
    hf,
    geomag,
    overall,
  };
}

function computeTurkeyCityRisk(city, sectorKey, global) {
  const coordinateRisk = computeTurkeyCoordinateRisk(city.lat, city.lon, sectorKey, global);
  const gnss = clamp(coordinateRisk.gnss + ((city.agriWeight - 0.5) * 2.8) + ((city.popWeight - 0.5) * 1.2), 0, 100);
  const hf = clamp(coordinateRisk.hf + ((city.defenseWeight - 0.5) * 3.2) + ((city.popWeight - 0.5) * 0.8), 0, 100);
  const geomag = clamp(coordinateRisk.geomag + ((city.popWeight - 0.5) * 3.0) + ((city.defenseWeight - 0.5) * 1.4), 0, 100);

  const weights = TURKEY_SECTOR_WEIGHTS[sectorKey] || TURKEY_SECTOR_WEIGHTS.genel;
  const overall = clamp(
    (gnss * weights.gnss) + (hf * weights.hf) + (geomag * weights.geomag),
    0,
    100,
  );

  const dominantLayer = [
    ["gnss", gnss],
    ["hf", hf],
    ["geomag", geomag],
  ].sort((left, right) => right[1] - left[1])[0][0];

  return {
    ...city,
    gnss: Math.round(gnss),
    hf: Math.round(hf),
    geomag: Math.round(geomag),
    overall: Math.round(overall),
    dominantLayer,
  };
}

function renderTurkeyRiskPanel(context) {
  if (!elements.turkeyRiskContent || !elements.turkeyRiskUpdated) {
    return;
  }

  if (!context?.latest) {
    elements.turkeyRiskUpdated.textContent = "Veri bekleniyor";
    elements.turkeyRiskContent.innerHTML = `
      <article class="impact-card impact-empty">
        <p>TÃ¼rkiye risk haritasÄ± canlÄ± NOAA verisi geldikÃ§e oluÅŸturulacak.</p>
      </article>
    `;
    return;
  }

  lastTurkeyRiskContext = context;
  const { latest, noaa, charts, solar } = context;
  const global = deriveTurkeyRiskGlobal(latest, noaa, charts, solar);
  const cities = TURKEY_CITY_DATA
    .map((city) => computeTurkeyCityRisk(city, turkeyRiskState.sector, global))
    .sort((left, right) => right.overall - left.overall);

  if (!cities.some((city) => city.name === turkeyRiskState.selectedCity)) {
    turkeyRiskState.selectedCity = cities[0]?.name || "Ankara";
  }

  const activeLayerValue = (city) => {
    if (turkeyRiskState.layer === "overall") return city.overall;
    return city[turkeyRiskState.layer];
  };

  const selectedCity = cities.find((city) => city.name === turkeyRiskState.selectedCity) || cities[0];
  const averages = {
    overall: Math.round(cities.reduce((sum, city) => sum + city.overall, 0) / cities.length),
    gnss: Math.round(cities.reduce((sum, city) => sum + city.gnss, 0) / cities.length),
    hf: Math.round(cities.reduce((sum, city) => sum + city.hf, 0) / cities.length),
    geomag: Math.round(cities.reduce((sum, city) => sum + city.geomag, 0) / cities.length),
  };
  const topCities = [...cities]
    .sort((left, right) => activeLayerValue(right) - activeLayerValue(left))
    .slice(0, 5);
  const coordinateLayerValue = (point) => {
    if (turkeyRiskState.layer === "overall") return point.overall;
    return point[turkeyRiskState.layer];
  };
  const lonTicks = [26, 30, 34, 38, 42, 44];
  const latTicks = [36, 37.5, 39, 40.5, 42];
  const coordinateOverlay = [];
  const cellLonStep = 0.72;
  const cellLatStep = 0.42;
  for (let lat = TURKEY_BOUNDS.minLat; lat < TURKEY_BOUNDS.maxLat; lat += cellLatStep) {
    for (let lon = TURKEY_BOUNDS.minLon; lon < TURKEY_BOUNDS.maxLon; lon += cellLonStep) {
      const nextLat = Math.min(TURKEY_BOUNDS.maxLat, lat + cellLatStep);
      const nextLon = Math.min(TURKEY_BOUNDS.maxLon, lon + cellLonStep);
      const centerLat = (lat + nextLat) / 2;
      const centerLon = (lon + nextLon) / 2;
      const riskPoint = computeTurkeyCoordinateRisk(centerLat, centerLon, turkeyRiskState.sector, global);
      const score = coordinateLayerValue(riskPoint);
      const x1 = turkeyLonToX(lon);
      const x2 = turkeyLonToX(nextLon);
      const y1 = turkeyLatToY(lat);
      const y2 = turkeyLatToY(nextLat);
      const alpha = clamp(0.08 + ((global.visualScale ?? 0.12) * 0.14) + ((score / 100) * 0.16), 0.09, 0.28);
      coordinateOverlay.push(`
        <rect
          x="${Math.min(x1, x2)}"
          y="${Math.min(y1, y2)}"
          width="${Math.abs(x2 - x1) + 1.2}"
          height="${Math.abs(y2 - y1) + 1.2}"
          fill="${turkeyRiskColor(score, alpha)}"
        ></rect>
      `);
    }
  }
  const coordinateGuides = `
    ${lonTicks.map((lon) => {
      const x = turkeyLonToX(lon);
      return `
        <line x1="${x}" y1="108" x2="${x}" y2="455" stroke="rgba(152,184,255,0.13)" stroke-width="1" stroke-dasharray="6 8"></line>
        <text x="${x}" y="475" fill="rgba(223,236,255,0.64)" font-size="11" text-anchor="middle">${lon}E</text>
      `;
    }).join("")}
    ${latTicks.map((lat) => {
      const y = turkeyLatToY(lat);
      return `
        <line x1="88" y1="${y}" x2="1088" y2="${y}" stroke="rgba(152,184,255,0.11)" stroke-width="1" stroke-dasharray="6 8"></line>
        <text x="68" y="${y + 4}" fill="rgba(223,236,255,0.62)" font-size="11" text-anchor="middle">${lat}N</text>
      `;
    }).join("")}
  `;
  const topSectors = [
    {
      name: "Savunma",
      key: "savunma",
      value: Math.round((averages.gnss * 0.40) + (averages.hf * 0.35) + (averages.geomag * 0.25)),
    },
    {
      name: "HavacÄ±lÄ±k",
      key: "havacilik",
      value: Math.round((averages.gnss * 0.45) + (averages.hf * 0.35) + (averages.geomag * 0.20)),
    },
    {
      name: "Enerji",
      key: "enerji",
      value: Math.round((averages.gnss * 0.15) + (averages.hf * 0.20) + (averages.geomag * 0.65)),
    },
    {
      name: "TarÄ±m",
      key: "tarim",
      value: Math.round((averages.gnss * 0.55) + (averages.hf * 0.15) + (averages.geomag * 0.30)),
    },
  ].sort((left, right) => right.value - left.value);

  const nodes = cities.map((city) => {
    const score = activeLayerValue(city);
    const x = turkeyLonToX(city.lon);
    const y = turkeyLatToY(city.lat);
    const visualScale = clamp(global.visualScale ?? 0.12, 0.06, 1);
    const radius = (8 + (score * 0.16)) * (0.72 + (visualScale * 0.9));
    const outerAlpha = clamp(0.025 + (visualScale * 0.07) + ((score / 100) * 0.05), 0.025, 0.16);
    const midAlpha = clamp(0.035 + (visualScale * 0.09) + ((score / 100) * 0.08), 0.035, 0.22);
    const coreAlpha = clamp(0.045 + (visualScale * 0.06) + ((score / 100) * 0.04), 0.04, 0.18);
    return `
      <g>
        <circle cx="${x}" cy="${y}" r="${radius}" fill="${turkeyRiskColor(score, outerAlpha)}" filter="url(#turkeyBigGlow)"></circle>
        <circle cx="${x}" cy="${y}" r="${radius * 0.64}" fill="${turkeyRiskColor(score, midAlpha)}" filter="url(#turkeyOuterGlow)"></circle>
        <circle cx="${x}" cy="${y}" r="${radius * 0.30}" fill="${turkeyRiskColor(score, coreAlpha)}"></circle>
      </g>
    `;
  }).join("");

  const cityPoints = cities.map((city) => {
    const score = activeLayerValue(city);
    const x = turkeyLonToX(city.lon);
    const y = turkeyLatToY(city.lat);
    const selected = city.name === selectedCity?.name;
    const labelY = y - 18;
    return `
      <g>
        ${selected ? `
          <circle cx="${x}" cy="${y}" r="16" fill="none" stroke="${turkeyRiskColor(score, 0.88)}" stroke-width="2.1">
            <animate attributeName="r" values="16;26;16" dur="2.4s" repeatCount="indefinite"></animate>
            <animate attributeName="opacity" values="0.9;0.15;0.9" dur="2.4s" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="${x}" cy="${y}" r="26" fill="none" stroke="${turkeyRiskColor(score, 0.42)}" stroke-width="1.1">
            <animate attributeName="r" values="26;38;26" dur="3.1s" repeatCount="indefinite"></animate>
            <animate attributeName="opacity" values="0.45;0.08;0.45" dur="3.1s" repeatCount="indefinite"></animate>
          </circle>
        ` : ""}
        <circle
          cx="${x}"
          cy="${y}"
          r="${selected ? 6.4 : 5.1}"
          fill="${turkeyRiskColor(score)}"
          stroke="rgba(245, 250, 255, 0.94)"
          stroke-width="${selected ? 2.1 : 1.2}"
          data-turkey-map-city="${escapeHtml(city.name)}"
          class="turkey-risk-map-node"
        ></circle>
        ${selected ? `
          <g>
            <rect x="${x - 52}" y="${labelY - 15}" rx="11" ry="11" width="104" height="24" fill="rgba(7, 11, 22, 0.82)" stroke="rgba(145, 193, 255, 0.28)"></rect>
            <text x="${x}" y="${labelY + 1}" fill="rgba(240, 247, 255, 0.96)" font-size="12" text-anchor="middle">${escapeHtml(city.name)} Â· ${score}</text>
          </g>
        ` : ""}
      </g>
    `;
  }).join("");

  const driverCards = [
    ["Kp", formatNumber(global.kpNow, 2), "GÃ¶zlenen jeomanyetik seviye"],
    ["Kp +3s", formatNumber(global.kpForecast3h, 2), "KÄ±sa vade Ã¶ngÃ¶rÃ¼"],
    ["IMF Bz", `${formatSignedNumber(global.bz, 1)} nT`, "Negatif Bz daha sert baÄŸlanma demektir"],
    ["HÄ±z", `${formatNumber(global.solarWindSpeed, 0)} km/s`, "GÃ¼neÅŸ rÃ¼zgÃ¢rÄ± akÄ±ÅŸÄ±"],
    ["YoÄŸunluk", `${formatNumber(global.density, 1)} p/cm3`, "SÄ±kÄ±ÅŸma baskÄ±sÄ±"],
    ["GÃ¼ven", `%${formatNumber(global.confidence * 100, 0)}`, "Model ve gÃ¶zlem uyumu"],
  ].map(([label, value, note]) => `
    <article class="turkey-risk-driver-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${note}</p>
    </article>
  `).join("");

  const cityList = topCities.map((city, index) => {
    const score = activeLayerValue(city);
    const selected = city.name === selectedCity?.name;
    return `
      <button type="button" class="turkey-risk-city-row${selected ? " is-active" : ""}" data-turkey-city="${escapeHtml(city.name)}">
        <span class="turkey-risk-city-rank">#${index + 1}</span>
        <span class="turkey-risk-city-name">${escapeHtml(city.name)}</span>
        <span class="turkey-risk-city-score" style="background:${turkeyRiskColor(score)}">${score}</span>
      </button>
    `;
  }).join("");

  const priorities = topSectors.map((sector) => `
    <article class="turkey-risk-priority-item">
      <div class="turkey-risk-priority-top">
        <strong>${sector.name}</strong>
        <span>${sector.value}</span>
      </div>
      <div class="turkey-risk-priority-bar">
        <div style="width:${sector.value}%; background:${turkeyRiskColor(sector.value)}"></div>
      </div>
    </article>
  `).join("");

  const selectedInterpretation = selectedCity?.dominantLayer === "gnss"
    ? "GNSS tarafÄ± baskÄ±n; hassas konumlama, RTK ve hava/deniz navigasyonunda sapma ihtimali artÄ±yor."
    : selectedCity?.dominantLayer === "hf"
      ? "HF tarafÄ± Ã¶ne Ã§Ä±kÄ±yor; gÃ¼ndÃ¼z yÃ¶nlÃ¼ uzun menzil haberleÅŸmede sÃ¶nÃ¼m ve kalite kaybÄ± daha belirgin olabilir."
      : "Jeomanyetik taraf baskÄ±n; enerji, manyetik sensÃ¶r ve hassas elektronik sistemlerde izleme Ã¶nceliÄŸi artmalÄ±.";
  const metricImpactCards = [
    {
      key: "gnss",
      title: "GNSS / Konumlama",
      value: selectedCity?.gnss ?? 0,
      text: (selectedCity?.gnss ?? 0) >= 70
        ? "Bu skor yÃ¼kseldikÃ§e RTK, haritalama, drone ve hassas tarÄ±m uygulamalarÄ±nda metre altÄ± sapmalar yerine daha belirgin konum kaymalarÄ± ve anlÄ±k kalite dÃ¼ÅŸÃ¼ÅŸleri gÃ¶rÃ¼lebilir."
        : (selectedCity?.gnss ?? 0) >= 45
          ? "Orta bantta GNSS artÄ±ÅŸÄ± hassas iÅŸlerde takip ihtiyacÄ±nÄ± bÃ¼yÃ¼tÃ¼r; standart navigasyon Ã§oÄŸu zaman sÃ¼rer ama profesyonel Ã¶lÃ§Ã¼m iÅŸlerinde dÃ¼zeltme servisi ve yedek plan Ã¶nem kazanÄ±r."
          : "DÃ¼ÅŸÃ¼k GNSS skorunda gÃ¼nlÃ¼k navigasyon ve konum takibi genelde stabil kalÄ±r; artÄ±ÅŸ baÅŸlarsa ilk etki hassas konumlama servislerinde hissedilir.",
    },
    {
      key: "hf",
      title: "HF HaberleÅŸme",
      value: selectedCity?.hf ?? 0,
      text: (selectedCity?.hf ?? 0) >= 70
        ? "HF skoru yÃ¼kseldikÃ§e uzun menzil telsiz, denizcilik ve yedek haberleÅŸme hatlarÄ±nda sÃ¶nÃ¼m, frekans kararsÄ±zlÄ±ÄŸÄ± ve kopma riski belirgin biÃ§imde artar."
        : (selectedCity?.hf ?? 0) >= 45
          ? "Bu aralÄ±kta HF performansÄ± Ã¶zellikle gÃ¼ndÃ¼z tarafÄ±nda dalgalanabilir; operatÃ¶rlerin frekans planÄ±nÄ± daha sÄ±k gÃ¼ncellemesi ve alternatif kanal hazÄ±r tutmasÄ± faydalÄ± olur."
          : "DÃ¼ÅŸÃ¼k HF skorunda temel haberleÅŸme baskÄ±sÄ± sÄ±nÄ±rlÄ± kalÄ±r; artÄ±ÅŸ trendi varsa ilk sinyal, uzak hatlarda kalite oynamasÄ± olarak gÃ¶rÃ¼lÃ¼r.",
    },
    {
      key: "geomag",
      title: "Jeomanyetik BaskÄ±",
      value: selectedCity?.geomag ?? 0,
      text: (selectedCity?.geomag ?? 0) >= 70
        ? "Jeomanyetik skor yÃ¼kseldikÃ§e enerji altyapÄ±sÄ±, manyetik sensÃ¶rler ve hassas elektronik sistemlerde parazit, alarm ve izleme ihtiyacÄ± belirgin ÅŸekilde artar."
        : (selectedCity?.geomag ?? 0) >= 45
          ? "Orta seviyede jeomanyetik artÄ±ÅŸ, uzun iletim hatlarÄ± ve manyetik referans kullanan sistemlerde dikkat gerektirir; saha ekiplerinin olaÄŸandÄ±ÅŸÄ± sapmalara karÅŸÄ± alarm eÅŸiklerini izlemesi gerekir."
          : "DÃ¼ÅŸÃ¼k jeomanyetik baskÄ±da etkiler genelde arka planda kalÄ±r; skor yukarÄ± hareket ettikÃ§e ilk olarak sensÃ¶r kararlÄ±lÄ±ÄŸÄ± ve gÃ¶zlem kalitesi etkilenir.",
    },
  ].map((item) => `
    <article class="turkey-risk-impact-note">
      <div class="turkey-risk-impact-top">
        <strong>${item.title}</strong>
        <span style="background:${turkeyRiskColor(item.value)}">${item.value}</span>
      </div>
      <p>${item.text}</p>
    </article>
  `).join("");

  elements.turkeyRiskUpdated.textContent = `Son gÃ¼ncelleme ${formatDate(global.updatedAt)}`;
  elements.turkeyRiskContent.innerHTML = `
    <div class="turkey-risk-shell">
      <div class="turkey-risk-stage">
        <div class="turkey-risk-toolbar">
          <div class="turkey-risk-toolbar-group">
            ${Object.entries(TURKEY_SECTOR_LABELS).map(([key, label]) => `
              <button type="button" class="turkey-risk-chip${turkeyRiskState.sector === key ? " is-active" : ""}" data-turkey-sector="${key}">
                ${label}
              </button>
            `).join("")}
          </div>
          <div class="turkey-risk-toolbar-group turkey-risk-toolbar-group-secondary">
            ${Object.entries(TURKEY_LAYER_LABELS).map(([key, label]) => `
              <button type="button" class="turkey-risk-mode${turkeyRiskState.layer === key ? " is-active" : ""}" data-turkey-layer="${key}">
                ${label}
              </button>
            `).join("")}
          </div>
          <div class="turkey-risk-legend">
            <span>DÃ¼ÅŸÃ¼k</span>
            <div class="turkey-risk-legend-bar"></div>
            <span>Kritik</span>
          </div>
        </div>

        <p class="turkey-risk-coordinate-note">Renk alan&#305;, se&ccedil;ili katman&#305;n T&uuml;rkiye &uuml;zerinde enlem ve boylama g&ouml;re s&uuml;rekli de&#287;i&#351;en etkisini g&ouml;sterir.</p>
        <div class="turkey-risk-map-frame">
          <svg viewBox="0 0 1200 560" class="turkey-risk-map" aria-label="TÃ¼rkiye uzay havasÄ± risk haritasÄ±">
            <defs>
              <clipPath id="turkeyRiskClip">
                <path d="${turkeyOutlinePath()}"></path>
              </clipPath>
              <linearGradient id="turkeyRiskSea" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#07111f"></stop>
                <stop offset="55%" stop-color="#0a1830"></stop>
                <stop offset="100%" stop-color="#09111f"></stop>
              </linearGradient>
              <linearGradient id="turkeyRiskLand" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#0d2240"></stop>
                <stop offset="50%" stop-color="#16315c"></stop>
                <stop offset="100%" stop-color="#0d1933"></stop>
              </linearGradient>
              <linearGradient id="turkeyRiskStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#71d6d6"></stop>
                <stop offset="50%" stop-color="#9acbff"></stop>
                <stop offset="100%" stop-color="#a78bfa"></stop>
              </linearGradient>
              <filter id="turkeyOuterGlow" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="8"></feGaussianBlur>
              </filter>
              <filter id="turkeyBigGlow" x="-55%" y="-55%" width="210%" height="210%">
                <feGaussianBlur stdDeviation="22"></feGaussianBlur>
              </filter>
            </defs>
            <rect x="0" y="0" width="1200" height="560" rx="28" fill="url(#turkeyRiskSea)"></rect>
            <g opacity="0.24">
              ${coordinateGuides}
            </g>
            <path d="${turkeyOutlinePath()}" fill="url(#turkeyRiskLand)" stroke="url(#turkeyRiskStroke)" stroke-width="4.2" filter="url(#turkeyOuterGlow)"></path>
            <g clip-path="url(#turkeyRiskClip)">
              <rect x="90" y="108" width="1000" height="348" fill="rgba(255,255,255,0.025)"></rect>
              ${coordinateOverlay.join("")}
              ${turkeyInternalVectorPaths().map((path) => `
                <path d="${path}" fill="none" stroke="rgba(154, 203, 255, 0.18)" stroke-width="1.6"></path>
              `).join("")}
              ${nodes}
            </g>
            <path d="${turkeyOutlinePath()}" fill="none" stroke="rgba(226, 238, 255, 0.16)" stroke-width="1.4"></path>
            ${cityPoints}
            <g>
              <rect x="94" y="98" width="250" height="28" rx="14" fill="rgba(8, 14, 28, 0.76)" stroke="rgba(129, 171, 241, 0.22)"></rect>
              <text x="112" y="116" fill="rgba(223, 236, 255, 0.84)" font-size="12">Katman: ${escapeHtml(TURKEY_LAYER_LABELS[turkeyRiskState.layer])}</text>
              <text x="930" y="116" fill="rgba(223, 236, 255, 0.74)" font-size="12">SeÃ§ili sektÃ¶r: ${escapeHtml(TURKEY_SECTOR_LABELS[turkeyRiskState.sector])}</text>
            </g>
          </svg>
        </div>

        <div class="turkey-risk-driver-head">
          <div>
            <span class="turkey-risk-side-kicker">Ortak SÃ¼rÃ¼cÃ¼ler</span>
            <h3>Bu kartlar il bazlÄ± deÄŸildir</h3>
          </div>
          <p class="turkey-risk-driver-note">Bu kutular tÃ¼m TÃ¼rkiye iÃ§in ortak NOAA ve model girdilerini gÃ¶sterir. Ä°l bazlÄ± farklar saÄŸdaki ÅŸehir skorlarÄ±nda ve harita daÄŸÄ±lÄ±mÄ±nda hesaplanÄ±r.</p>
        </div>
        <div class="turkey-risk-driver-grid">
          ${driverCards}
        </div>
      </div>

      <aside class="turkey-risk-side">
        <section class="turkey-risk-side-card">
          <div class="turkey-risk-side-head">
            <div>
              <span class="turkey-risk-side-kicker">SeÃ§ili Åehir</span>
              <h3>${escapeHtml(selectedCity?.name || "Ankara")}</h3>
            </div>
            <span class="turkey-risk-badge" style="background:${turkeyRiskColor(activeLayerValue(selectedCity))}">${turkeyRiskLabel(activeLayerValue(selectedCity))} Â· ${activeLayerValue(selectedCity)}</span>
          </div>
          <p class="turkey-risk-city-meta">Bu bÃ¶lÃ¼m seÃ§ili il iÃ§in hesaplanan yerel skorlarÄ± gÃ¶sterir.</p>
          <div class="turkey-risk-metric-bars">
            ${["gnss", "hf", "geomag"].map((key) => `
              <div class="turkey-risk-bar-row">
                <div class="turkey-risk-bar-top">
                  <span>${TURKEY_LAYER_LABELS[key]}</span>
                  <strong>${selectedCity?.[key] ?? "-"}</strong>
                </div>
                <div class="turkey-risk-bar-track">
                  <div style="width:${selectedCity?.[key] ?? 0}%; background:${turkeyRiskColor(selectedCity?.[key] ?? 0)}"></div>
                </div>
              </div>
            `).join("")}
          </div>
          <p class="turkey-risk-side-note">${selectedInterpretation}</p>
        </section>

        <section class="turkey-risk-side-card">
          <div class="turkey-risk-side-head">
            <div>
              <span class="turkey-risk-side-kicker">SektÃ¶r Ã–nceliÄŸi</span>
              <h3>TÃ¼rkiye Geneli</h3>
            </div>
            <span class="turkey-risk-badge" style="background:${turkeyRiskColor(averages.overall)}">${averages.overall}</span>
          </div>
          <div class="turkey-risk-priority-list">
            ${priorities}
          </div>
        </section>

        <section class="turkey-risk-side-card">
          <div class="turkey-risk-side-head">
            <div>
              <span class="turkey-risk-side-kicker">En Hassas Noktalar</span>
              <h3>${escapeHtml(TURKEY_LAYER_LABELS[turkeyRiskState.layer])}</h3>
            </div>
          </div>
          <div class="turkey-risk-city-list">
            ${cityList}
          </div>
        </section>
      </aside>
    </div>
  `;

  elements.turkeyRiskContent.querySelectorAll("[data-turkey-sector]").forEach((button) => {
    button.addEventListener("click", () => {
      turkeyRiskState.sector = button.dataset.turkeySector || "savunma";
      renderTurkeyRiskPanel(lastTurkeyRiskContext);
    });
  });

  elements.turkeyRiskContent.querySelectorAll("[data-turkey-layer]").forEach((button) => {
    button.addEventListener("click", () => {
      turkeyRiskState.layer = button.dataset.turkeyLayer || "overall";
      renderTurkeyRiskPanel(lastTurkeyRiskContext);
    });
  });

  elements.turkeyRiskContent.querySelectorAll("[data-turkey-city]").forEach((button) => {
    button.addEventListener("click", () => {
      turkeyRiskState.selectedCity = button.dataset.turkeyCity || "Ankara";
      renderTurkeyRiskPanel(lastTurkeyRiskContext);
    });
  });

  elements.turkeyRiskContent.querySelectorAll("[data-turkey-map-city]").forEach((node) => {
    node.addEventListener("click", () => {
      turkeyRiskState.selectedCity = node.dataset.turkeyMapCity || "Ankara";
      renderTurkeyRiskPanel(lastTurkeyRiskContext);
    });
  });

  repairDocumentEncoding(elements.turkeyRiskContent);
}

function renderTurkeyProvincePanel(context) {
  if (!elements.turkeyRiskContent || !elements.turkeyRiskUpdated) {
    return;
  }

  if (!context?.latest) {
    elements.turkeyRiskUpdated.textContent = "Veri bekleniyor";
    elements.turkeyRiskContent.innerHTML = `
      <article class="impact-card impact-empty">
        <p>Türkiye il bazlı risk paneli canlı NOAA verisi geldikçe oluşturulacak.</p>
      </article>
    `;
    return;
  }

  lastTurkeyRiskContext = context;
  const { latest, noaa, charts, solar } = context;
  const global = deriveTurkeyRiskGlobal(latest, noaa, charts, solar);
  const cities = TURKEY_CITY_DATA
    .map((city) => computeTurkeyCityRisk(city, turkeyRiskState.sector, global))
    .sort((left, right) => right.overall - left.overall);

  if (!cities.some((city) => city.name === turkeyRiskState.selectedCity)) {
    turkeyRiskState.selectedCity = cities[0]?.name || "Ankara";
  }

  const activeLayerValue = (city) => {
    if (!city) return 0;
    if (turkeyRiskState.layer === "overall") return city.overall;
    return city[turkeyRiskState.layer];
  };

  const selectedCity = cities.find((city) => city.name === turkeyRiskState.selectedCity) || cities[0];
  const selectedScore = activeLayerValue(selectedCity);
  const sortedCityOptions = [...cities].sort((left, right) => left.name.localeCompare(right.name, "tr"));
  const averages = {
    overall: Math.round(cities.reduce((sum, city) => sum + city.overall, 0) / cities.length),
    gnss: Math.round(cities.reduce((sum, city) => sum + city.gnss, 0) / cities.length),
    hf: Math.round(cities.reduce((sum, city) => sum + city.hf, 0) / cities.length),
    geomag: Math.round(cities.reduce((sum, city) => sum + city.geomag, 0) / cities.length),
  };
  const topCities = [...cities]
    .sort((left, right) => activeLayerValue(right) - activeLayerValue(left))
    .slice(0, 5);
  const riskLabelForScore = (score) => {
    if (score >= 80) return "Kritik";
    if (score >= 65) return "Yüksek";
    if (score >= 45) return "Orta-Yüksek";
    if (score >= 25) return "Orta";
    return "Düşük";
  };
  const topSectors = [
    {
      name: "Savunma",
      key: "savunma",
      value: Math.round((averages.gnss * 0.40) + (averages.hf * 0.35) + (averages.geomag * 0.25)),
    },
    {
      name: "Havacılık",
      key: "havacilik",
      value: Math.round((averages.gnss * 0.45) + (averages.hf * 0.35) + (averages.geomag * 0.20)),
    },
    {
      name: "Enerji",
      key: "enerji",
      value: Math.round((averages.gnss * 0.15) + (averages.hf * 0.20) + (averages.geomag * 0.65)),
    },
    {
      name: "Tarım",
      key: "tarim",
      value: Math.round((averages.gnss * 0.55) + (averages.hf * 0.15) + (averages.geomag * 0.30)),
    },
  ].sort((left, right) => right.value - left.value);

  const driverCards = [
    ["Kp", formatNumber(global.kpNow, 2), "Gözlenen jeomanyetik seviye"],
    ["Kp +3s", formatNumber(global.kpForecast3h, 2), "Kısa vade öngörü"],
    ["IMF Bz", `${formatSignedNumber(global.bz, 1)} nT`, "Negatif Bz daha sert bağlanma demektir"],
    ["Hız", `${formatNumber(global.solarWindSpeed, 0)} km/s`, "Güneş rüzgârı akışı"],
    ["Yoğunluk", `${formatNumber(global.density, 1)} p/cm3`, "Sıkışma baskısı"],
    ["Güven", `%${formatNumber(global.confidence * 100, 0)}`, "Model ve gözlem uyumu"],
  ].map(([label, value, note]) => `
    <article class="turkey-risk-driver-card">
      <span>${label}</span>
      <strong>${value}</strong>
      <p>${note}</p>
    </article>
  `).join("");

  const cityPickerButtons = sortedCityOptions.map((city) => {
    const score = activeLayerValue(city);
    const selected = city.name === selectedCity?.name;
    return `
      <button
        type="button"
        class="turkey-risk-city-pick${selected ? " is-active" : ""}"
        data-turkey-city="${escapeHtml(city.name)}"
        aria-pressed="${selected ? "true" : "false"}"
      >
        <span class="turkey-risk-city-pick-name">${escapeHtml(city.name)}</span>
        <span class="turkey-risk-city-pick-meta">${escapeHtml(TURKEY_LAYER_LABELS[turkeyRiskState.layer])}</span>
        <span class="turkey-risk-city-pick-score" style="background:${turkeyRiskColor(score)}">${score}</span>
      </button>
    `;
  }).join("");

  const cityList = topCities.map((city, index) => {
    const score = activeLayerValue(city);
    const selected = city.name === selectedCity?.name;
    return `
      <button type="button" class="turkey-risk-city-row${selected ? " is-active" : ""}" data-turkey-city="${escapeHtml(city.name)}">
        <span class="turkey-risk-city-rank">#${index + 1}</span>
        <span class="turkey-risk-city-name">${escapeHtml(city.name)}</span>
        <span class="turkey-risk-city-score" style="background:${turkeyRiskColor(score)}">${score}</span>
      </button>
    `;
  }).join("");

  const priorities = topSectors.map((sector) => `
    <article class="turkey-risk-priority-item">
      <div class="turkey-risk-priority-top">
        <strong>${sector.name}</strong>
        <span>${sector.value}</span>
      </div>
      <div class="turkey-risk-priority-bar">
        <div style="width:${sector.value}%; background:${turkeyRiskColor(sector.value)}"></div>
      </div>
    </article>
  `).join("");

  const selectedInterpretation = selectedCity?.dominantLayer === "gnss"
    ? "GNSS tarafı baskın; hassas konumlama, RTK ve hava/deniz navigasyonunda sapma ihtimali artıyor."
    : selectedCity?.dominantLayer === "hf"
      ? "HF tarafı öne çıkıyor; gündüz yönlü uzun menzil haberleşmede sönüm ve kalite kaybı daha belirgin olabilir."
      : "Jeomanyetik taraf baskın; enerji, manyetik sensör ve hassas elektronik sistemlerde izleme önceliği artmalı.";

  const metricImpactCards = [
    {
      key: "gnss",
      title: "GNSS / Konumlama",
      value: selectedCity?.gnss ?? 0,
      text: (selectedCity?.gnss ?? 0) >= 70
        ? "Bu skor yükseldikçe RTK, haritalama, drone ve hassas tarım uygulamalarında metre altı sapmalar yerine daha belirgin konum kaymaları ve anlık kalite düşüşleri görülebilir."
        : (selectedCity?.gnss ?? 0) >= 45
          ? "Orta bantta GNSS artışı hassas işlerde takip ihtiyacını büyütür; standart navigasyon çoğu zaman sürer ama profesyonel ölçüm işlerinde düzeltme servisi ve yedek plan önem kazanır."
          : "Düşük GNSS skorunda günlük navigasyon ve konum takibi genelde stabil kalır; artış başlarsa ilk etki hassas konumlama servislerinde hissedilir.",
    },
    {
      key: "hf",
      title: "HF Haberleşme",
      value: selectedCity?.hf ?? 0,
      text: (selectedCity?.hf ?? 0) >= 70
        ? "HF skoru yükseldikçe uzun menzil telsiz, denizcilik ve yedek haberleşme hatlarında sönüm, frekans kararsızlığı ve kopma riski belirgin biçimde artar."
        : (selectedCity?.hf ?? 0) >= 45
          ? "Bu aralıkta HF performansı özellikle gündüz tarafında dalgalanabilir; operatörlerin frekans planını daha sık güncellemesi ve alternatif kanal hazır tutması faydalı olur."
          : "Düşük HF skorunda temel haberleşme baskısı sınırlı kalır; artış trendi varsa ilk sinyal, uzak hatlarda kalite oynaması olarak görülür.",
    },
    {
      key: "geomag",
      title: "Jeomanyetik Baskı",
      value: selectedCity?.geomag ?? 0,
      text: (selectedCity?.geomag ?? 0) >= 70
        ? "Jeomanyetik skor yükseldikçe enerji altyapısı, manyetik sensörler ve hassas elektronik sistemlerde parazit, alarm ve izleme ihtiyacı belirgin şekilde artar."
        : (selectedCity?.geomag ?? 0) >= 45
          ? "Orta seviyede jeomanyetik artış, uzun iletim hatları ve manyetik referans kullanan sistemlerde dikkat gerektirir; saha ekiplerinin olağandışı sapmalara karşı alarm eşiklerini izlemesi gerekir."
          : "Düşük jeomanyetik baskıda etkiler genelde arka planda kalır; skor yukarı hareket ettikçe ilk olarak sensör kararlılığı ve gözlem kalitesi etkilenir.",
    },
  ].map((item) => `
    <article class="turkey-risk-impact-note">
      <div class="turkey-risk-impact-top">
        <strong>${item.title}</strong>
        <span style="background:${turkeyRiskColor(item.value)}">${item.value}</span>
      </div>
      <p>${item.text}</p>
    </article>
  `).join("");

  elements.turkeyRiskUpdated.textContent = `Son güncelleme ${formatDate(global.updatedAt)}`;
  elements.turkeyRiskContent.innerHTML = `
    <div class="turkey-risk-shell">
      <div class="turkey-risk-stage">
        <div class="turkey-risk-toolbar">
          <div class="turkey-risk-toolbar-group">
            ${Object.entries(TURKEY_SECTOR_LABELS).map(([key, label]) => `
              <button type="button" class="turkey-risk-chip${turkeyRiskState.sector === key ? " is-active" : ""}" data-turkey-sector="${key}">
                ${label}
              </button>
            `).join("")}
          </div>
          <div class="turkey-risk-toolbar-group turkey-risk-toolbar-group-secondary">
            ${Object.entries(TURKEY_LAYER_LABELS).map(([key, label]) => `
              <button type="button" class="turkey-risk-mode${turkeyRiskState.layer === key ? " is-active" : ""}" data-turkey-layer="${key}">
                ${label}
              </button>
            `).join("")}
          </div>
          <div class="turkey-risk-legend">
            <span>Düşük</span>
            <div class="turkey-risk-legend-bar"></div>
            <span>Kritik</span>
          </div>
        </div>

        <section class="turkey-risk-picker-shell">
          <div class="turkey-risk-picker-head">
            <div>
              <span class="turkey-risk-side-kicker">İl Seçimi</span>
              <h3>Veri alınan iller</h3>
            </div>
            <button
              type="button"
              class="turkey-risk-picker-toggle${turkeyRiskState.cityPickerOpen ? " is-active" : ""}"
              data-turkey-city-toggle
              aria-expanded="${turkeyRiskState.cityPickerOpen ? "true" : "false"}"
            >
              ${turkeyRiskState.cityPickerOpen ? "İlleri kapat" : "İller"}
            </button>
          </div>
          <p class="turkey-risk-picker-note">Veri alınan illerden birini seçtiğinde mevcut değer kartları ve sağ sütundaki şehir metrikleri aynı düzenle güncellenir.</p>
          <div class="turkey-risk-picker-summary">
            <span>${cities.length} il izleniyor</span>
            <strong>${escapeHtml(selectedCity?.name || "Ankara")}</strong>
            <span>${escapeHtml(TURKEY_LAYER_LABELS[turkeyRiskState.layer])} • ${selectedScore}</span>
          </div>
          ${turkeyRiskState.cityPickerOpen ? `
            <div class="turkey-risk-picker-panel">
              <div class="turkey-risk-picker-grid">
                ${cityPickerButtons}
              </div>
            </div>
          ` : ""}
        </section>

        <div class="turkey-risk-driver-head">
          <div>
            <span class="turkey-risk-side-kicker">Ortak Sürücüler</span>
            <h3>Bu kartlar il bazlı değildir</h3>
          </div>
          <p class="turkey-risk-driver-note">Bu kutular tüm Türkiye için ortak NOAA ve model girdilerini gösterir. İl bazlı farklar sağdaki şehir skorlarında hesaplanır.</p>
        </div>
        <div class="turkey-risk-driver-grid">
          ${driverCards}
        </div>
      </div>

      <aside class="turkey-risk-side">
        <section class="turkey-risk-side-card">
          <div class="turkey-risk-side-head">
            <div>
              <span class="turkey-risk-side-kicker">Seçili Şehir</span>
              <h3>${escapeHtml(selectedCity?.name || "Ankara")}</h3>
            </div>
            <span class="turkey-risk-badge" style="background:${turkeyRiskColor(selectedScore)}">${riskLabelForScore(selectedScore)} · ${selectedScore}</span>
          </div>
          <p class="turkey-risk-city-meta">Bu bölüm seçili il için hesaplanan yerel skorları gösterir.</p>
          <div class="turkey-risk-metric-bars">
            ${["gnss", "hf", "geomag"].map((key) => `
              <div class="turkey-risk-bar-row">
                <div class="turkey-risk-bar-top">
                  <span>${TURKEY_LAYER_LABELS[key]}</span>
                  <strong>${selectedCity?.[key] ?? "-"}</strong>
                </div>
                <div class="turkey-risk-bar-track">
                  <div style="width:${selectedCity?.[key] ?? 0}%; background:${turkeyRiskColor(selectedCity?.[key] ?? 0)}"></div>
                </div>
              </div>
            `).join("")}
          </div>
          <div class="turkey-risk-impact-notes">
            ${metricImpactCards}
          </div>
          <p class="turkey-risk-side-note">${selectedInterpretation}</p>
        </section>

        <section class="turkey-risk-side-card">
          <div class="turkey-risk-side-head">
            <div>
              <span class="turkey-risk-side-kicker">Sektör Önceliği</span>
              <h3>Türkiye Geneli</h3>
            </div>
            <span class="turkey-risk-badge" style="background:${turkeyRiskColor(averages.overall)}">${averages.overall}</span>
          </div>
          <div class="turkey-risk-priority-list">
            ${priorities}
          </div>
        </section>

        <section class="turkey-risk-side-card">
          <div class="turkey-risk-side-head">
            <div>
              <span class="turkey-risk-side-kicker">Öne Çıkan İller</span>
              <h3>${escapeHtml(TURKEY_LAYER_LABELS[turkeyRiskState.layer])}</h3>
            </div>
          </div>
          <div class="turkey-risk-city-list">
            ${cityList}
          </div>
        </section>
      </aside>
    </div>
  `;

  elements.turkeyRiskContent.querySelectorAll("[data-turkey-sector]").forEach((button) => {
    button.addEventListener("click", () => {
      turkeyRiskState.sector = button.dataset.turkeySector || "savunma";
      renderTurkeyProvincePanel(lastTurkeyRiskContext);
    });
  });

  elements.turkeyRiskContent.querySelectorAll("[data-turkey-layer]").forEach((button) => {
    button.addEventListener("click", () => {
      turkeyRiskState.layer = button.dataset.turkeyLayer || "overall";
      renderTurkeyProvincePanel(lastTurkeyRiskContext);
    });
  });

  elements.turkeyRiskContent.querySelectorAll("[data-turkey-city-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      turkeyRiskState.cityPickerOpen = !turkeyRiskState.cityPickerOpen;
      renderTurkeyProvincePanel(lastTurkeyRiskContext);
    });
  });

  elements.turkeyRiskContent.querySelectorAll("[data-turkey-city]").forEach((button) => {
    button.addEventListener("click", () => {
      turkeyRiskState.selectedCity = button.dataset.turkeyCity || "Ankara";
      turkeyRiskState.cityPickerOpen = false;
      renderTurkeyProvincePanel(lastTurkeyRiskContext);
    });
  });

  repairDocumentEncoding(elements.turkeyRiskContent);
}

function buildNotificationEvent(latest, access, mode = "alert") {
  const evaluation = latest?.evaluation || {};
  const noaa = evaluation.noaa || {};
  const level = String(evaluation.level || "normal").toLowerCase();
  const riskPercent = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const kpValue = parseNumber(noaa.kp);
  const kpEstimated = parseNumber(noaa.kp_estimated);
  const windSpeed = parseNumber(noaa.solar_wind_speed_km_s);
  const bzValue = parseNumber(noaa.bz_nt);
  const generatedAt = latest?.generated_at || noaa.observed_at || null;
  const normalizedMode = String(mode || "alert").toLowerCase();
  const isManual = normalizedMode === "manual";
  const isPeriodic = normalizedMode === "periodic";
  const title = `${isManual ? "Manuel Özet" : isPeriodic ? "Düzenli Durum Özeti" : "Uzay Havası Uyarısı"} | ${level.toUpperCase()}`;
  const lines = [
    `Seviye: ${level}`,
    `Risk: ${riskPercent === null ? "-" : `%${formatNumber(riskPercent, 0)}`}`,
    `Kp: ${kpValue === null ? "-" : formatNumber(kpValue, 2)}`,
    `Kp Tahmini: ${kpEstimated === null ? "-" : formatNumber(kpEstimated, 2)}`,
    `GÃ¼neÅŸ rÃ¼zgÃ¢rÄ±: ${windSpeed === null ? "-" : `${formatNumber(windSpeed, 0)} km/s`}`,
    `IMF Bz: ${bzValue === null ? "-" : `${bzValue >= 0 ? "+" : ""}${formatNumber(bzValue, 1)} nT`}`,
    `Zaman: ${generatedAt || "-"}`,
  ];
  if (isPeriodic) {
    lines.push("Not: Bu bildirim dÃ¼zenli durum Ã¶zeti olarak gÃ¶nderildi.");
  } else if (!isManual) {
    lines.push("Eylem: Paneli aÃ§Ä±p sistemleri kontrol et.");
  }
  return {
    title: cleanTitle,
    message: repairMojibakeText(lines.join("\n")),
    priority: isPeriodic && level === "normal" ? "2" : notificationPriority(level),
    tags: ["satellite", isPeriodic ? "summary" : "warning", level],
    level,
    riskPercent,
    kpValue,
    clickUrl: access?.public_url || access?.local_url || window.location.origin,
  };
}

function buildNotificationEvent(latest, access, mode = "alert") {
  const evaluation = latest?.evaluation || {};
  const noaa = evaluation.noaa || {};
  const level = String(evaluation.level || "normal").toLowerCase();
  const riskPercent = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const kpValue = parseNumber(noaa.kp);
  const kpEstimated = parseNumber(noaa.kp_estimated);
  const windSpeed = parseNumber(noaa.solar_wind_speed_km_s);
  const bzValue = parseNumber(noaa.bz_nt);
  const generatedAt = latest?.generated_at || noaa.observed_at || null;
  const parsedGeneratedAt = parseUtcDate(generatedAt);
  const generatedAtLabel = parsedGeneratedAt
    ? `${parsedGeneratedAt.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Istanbul",
    })} ${parsedGeneratedAt.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Istanbul",
    })} TSİ`
    : (generatedAt || "-");
  const normalizedMode = String(mode || "alert").toLowerCase();
  const isManual = normalizedMode === "manual";
  const isPeriodic = normalizedMode === "periodic";
  const titlePrefix = isManual ? "Manuel Özet" : isPeriodic ? "Düzenli Durum Özeti" : "Uzay Havası Uyarısı";
  const title = `${titlePrefix} | ${level.toUpperCase()}`;
  const lines = [
    `Seviye: ${level}`,
    `Risk: ${riskPercent === null ? "-" : `%${formatNumber(riskPercent, 0)}`}`,
    `Kp: ${kpValue === null ? "-" : formatNumber(kpValue, 2)}`,
    `Kp Tahmini: ${kpEstimated === null ? "-" : formatNumber(kpEstimated, 2)}`,
    `Güneş rüzgarı: ${windSpeed === null ? "-" : `${formatNumber(windSpeed, 0)} km/s`}`,
    `IMF Bz: ${bzValue === null ? "-" : `${bzValue >= 0 ? "+" : ""}${formatNumber(bzValue, 1)} nT`}`,
    `Zaman (TSİ): ${generatedAtLabel}`,
  ];
  if (isPeriodic) {
    lines.push("Not: Bu bildirim düzenli durum özeti olarak gönderildi.");
  } else if (!isManual) {
    lines.push("Eylem: Paneli açıp sistemleri kontrol et.");
  }
  return {
    title,
    message: lines.join("\n"),
    priority: isPeriodic && level === "normal" ? "2" : notificationPriority(level),
    tags: ["satellite", isPeriodic ? "summary" : "warning", level],
    level,
    riskPercent,
    kpValue,
    clickUrl: access?.public_url || access?.local_url || window.location.origin,
  };
}

function buildNotificationEvent(latest, access, mode = "alert") {
  const evaluation = latest?.evaluation || {};
  const noaa = evaluation.noaa || {};
  const level = String(evaluation.level || "normal").toLowerCase();
  const riskPercent = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const kpValue = parseNumber(noaa.kp);
  const kpEstimated = parseNumber(noaa.kp_estimated);
  const windSpeed = parseNumber(noaa.solar_wind_speed_km_s);
  const bzValue = parseNumber(noaa.bz_nt);
  const generatedAt = latest?.generated_at || noaa.observed_at || null;
  const parsedGeneratedAt = parseUtcDate(generatedAt);
  const generatedAtLabel = parsedGeneratedAt
    ? `${parsedGeneratedAt.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Istanbul",
    })} ${parsedGeneratedAt.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Istanbul",
    })} TSİ`
    : (generatedAt || "-");
  const normalizedMode = String(mode || "alert").toLowerCase();
  const isManual = normalizedMode === "manual";
  const isPeriodic = normalizedMode === "periodic";
  const titlePrefix = isManual ? "Manuel Özet" : isPeriodic ? "Düzenli Durum Özeti" : "Uzay Havası Uyarısı";
  const title = `${titlePrefix} | ${level.toUpperCase()}`;
  const lines = [
    `Seviye: ${level}`,
    `Risk: ${riskPercent === null ? "-" : `%${formatNumber(riskPercent, 0)}`}`,
    `Kp: ${kpValue === null ? "-" : formatNumber(kpValue, 2)}`,
    `Kp Tahmini: ${kpEstimated === null ? "-" : formatNumber(kpEstimated, 2)}`,
    `Güneş rüzgarı: ${windSpeed === null ? "-" : `${formatNumber(windSpeed, 0)} km/s`}`,
    `IMF Bz: ${bzValue === null ? "-" : `${bzValue >= 0 ? "+" : ""}${formatNumber(bzValue, 1)} nT`}`,
    `Zaman (TSİ): ${generatedAtLabel}`,
  ];
  if (isPeriodic) {
    lines.push("Not: Bu bildirim düzenli durum özeti olarak gönderildi.");
  } else if (!isManual) {
    lines.push("Eylem: Paneli açıp sistemleri kontrol et.");
  }
  return {
    title,
    message: lines.join("\n"),
    priority: isPeriodic && level === "normal" ? "2" : notificationPriority(level),
    tags: ["satellite", isPeriodic ? "summary" : "warning", level],
    level,
    riskPercent,
    kpValue,
    clickUrl: access?.public_url || access?.local_url || window.location.origin,
  };
}

async function sendNotificationDirect(kind, settings, latest, access) {
  const eventPayload = kind === "test"
    ? {
      title: "Telefon Test Bildirimi",
      message: "ntfy entegrasyonu hazÄ±r. Bu test bildirimi panelden gÃ¶nderildi.",
      priority: "3",
      tags: ["satellite", "test"],
      level: "normal",
      riskPercent: null,
      kpValue: null,
      clickUrl: access?.public_url || access?.local_url || window.location.origin,
    }
    : buildNotificationEvent(latest, access, kind);

  eventPayload.title = repairMojibakeText(eventPayload.title);
  eventPayload.message = repairMojibakeText(eventPayload.message);
  await publishNtfyFromClient(settings, eventPayload);
  return storeNotificationSendResult(eventPayload, null);
}

async function maybeSendAutoNotification(latest, access, notifications) {
  if (!isLocalNotificationAdmin()) return;
  const payload = mergeNotificationPayload(notifications);
  const settings = payload.settings || {};
  if (notificationAutoInFlight) return;
  if (!settings.enabled || !settings.topic || !latest?.evaluation) return;

  const evaluation = latest.evaluation || {};
  const level = String(evaluation.level || "normal").toLowerCase();
  const state = loadNotificationStateFromStorage();
  const baselineLevel = String(state.last_level || "normal").toLowerCase();
  const lastSentAt = state.last_sent_at ? parseUtcDate(state.last_sent_at) : null;
  const cooldownMs = Math.max(5, parseInt(settings.cooldown_minutes, 10) || 60) * 60 * 1000;
  const nowMs = Date.now();
  const riskPercent = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const kpValue = parseNumber(evaluation?.noaa?.kp ?? evaluation?.noaa?.kp_estimated);
  const levelMeetsThreshold = notificationLevelRank(level) >= notificationLevelRank(settings.min_level);
  const levelIncreased = notificationLevelRank(level) > notificationLevelRank(baselineLevel);
  const lastRisk = parseNumber(state.last_risk_percent);
  const lastKp = parseNumber(state.last_kp);
  const riskIncreased = riskPercent !== null && lastRisk !== null && (riskPercent - lastRisk) >= 8;
  const kpIncreased = kpValue !== null && lastKp !== null && (kpValue - lastKp) >= 0.7;
  const currentKey = `${latest.generated_at || "now"}|${level}|${formatNumber(evaluation.risk_percent ?? evaluation.score, 0)}|${formatNumber(evaluation?.noaa?.kp ?? evaluation?.noaa?.kp_estimated, 2)}`;
  const periodicDue = !lastSentAt || ((nowMs - lastSentAt.getTime()) >= cooldownMs);
  const immediateTrigger = levelIncreased || riskIncreased || kpIncreased || (levelMeetsThreshold && !lastSentAt);
  if (!immediateTrigger && !periodicDue) {
    return;
  }
  if (notificationAutomationKey === currentKey && !periodicDue) {
    return;
  }
  notificationAutomationKey = currentKey;

  const cooldownActive = lastSentAt ? ((nowMs - lastSentAt.getTime()) < cooldownMs) : false;
  if (cooldownActive && !(levelIncreased || riskIncreased || kpIncreased)) {
    return;
  }

  notificationAutoInFlight = true;
  try {
    const mergedSettings = saveNotificationSettingsToStorage(settings);
    const autoMode = immediateTrigger ? "auto" : "periodic";
    await sendNotificationDirect(autoMode, mergedSettings, latest, access);
    renderNotificationPanel(payload, latest, access);
    setStatus(autoMode === "periodic"
      ? "Telefon iÃ§in dÃ¼zenli durum Ã¶zeti gÃ¶nderildi."
      : "Telefon uyarÄ± akÄ±ÅŸÄ± gÃ¼ncel veriye gÃ¶re kontrol edildi.");
  } catch (error) {
    const autoMode = immediateTrigger ? "auto" : "periodic";
    storeNotificationSendResult(buildNotificationEvent(latest, access, autoMode), error.message || "Bildirim gÃ¶nderilemedi.");
  } finally {
    notificationAutoInFlight = false;
  }
}

function renderNotificationPanel(notifications, latest, access) {
  if (!elements.notificationPanelContent || !elements.notificationPanelStatus) {
    return;
  }

  const payload = mergeNotificationPayload(notifications);
  const settings = payload.settings || {};
  const state = payload.state || {};
  const isAdmin = isLocalNotificationAdmin();
  const accessUrl = access?.public_url || access?.local_url || window.location.origin;
  const evaluation = latest?.evaluation || {};
  const noaa = latest?.evaluation?.noaa || {};
  const currentLevel = String(evaluation.level || "normal").toLowerCase();
  const currentRisk = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const currentKp = parseNumber(noaa.kp ?? noaa.kp_estimated);
  const cooldownMinutes = Math.max(5, parseInt(settings.cooldown_minutes, 10) || 60);
  const provider = "pushbullet";
  const pushbulletToken = String(settings.pushbullet_token || "");
  const pushbulletReady = Boolean(pushbulletToken.trim());
  const statusMeta = notificationStatusMeta(settings);
  const canSendViaProvider = pushbulletReady;
  const canSendCurrent = pushbulletReady && Boolean(latest);
  const lastSentText = state.last_sent_at ? formatDate(state.last_sent_at) : "HenÃ¼z gÃ¶nderim yok.";
  const lastRiskText = state.last_risk_percent === null || state.last_risk_percent === undefined
    ? "-"
    : `%${formatNumber(state.last_risk_percent, 0)}`;
  const lastKpText = state.last_kp === null || state.last_kp === undefined
    ? "-"
    : formatNumber(state.last_kp, 2);
  const safeLastMessage = escapeHtml(state.last_message || "").replace(/\n/g, "<br>");
  const subscriberMessage = "Telefon bildirimleri panel yÃ¶neticisinin Pushbullet entegrasyonu Ã¼zerinden daÄŸÄ±tÄ±lÄ±r.";
  const liveSummaryText = !latest
    ? "CanlÄ± panel verisi geldikten sonra gÃ¼ncel durum gÃ¶nderimi aÃ§Ä±lÄ±r. Test bildirimi ise ayarlar kaydedildiÄŸi anda kullanÄ±labilir."
    : settings.enabled
      ? `Otomatik akÄ±ÅŸ etkin. Sistem ilk kayÄ±ttan sonra bir bildirim dener; ardÄ±ndan her ${cooldownMinutes} dakikada bir dÃ¼zenli durum Ã¶zeti gÃ¶nderir. Seviye, risk veya Kp hÄ±zlÄ± yÃ¼kselirse soÄŸuma sÃ¼resini beklemeden yeniden uyarÄ± yollar.`
      : "Test veya manuel gÃ¶nderim kullanÄ±labilir. Otomatik akÄ±ÅŸÄ± devreye almak iÃ§in kutuyu aktif edip ayarlarÄ± kaydetmen yeterli.";

  if (!isAdmin) {
    elements.notificationPanelStatus.textContent = "Merkezi daÄŸÄ±tÄ±m";
    elements.notificationPanelStatus.className = "badge badge-normal";
    elements.notificationPanelContent.innerHTML = `
      <div class="notify-shell">
        <div class="notify-main-stack">
          <article class="notify-card notify-form-card">
            <div class="panel-head-inline">
              <h3>Telefon bildirimleri</h3>
            </div>
            <p class="satellite-panel-note">${subscriberMessage}</p>
            <div class="notify-chip-row">
              <span class="notify-chip">SaÄŸlayÄ±cÄ±: Pushbullet</span>
              <span class="notify-chip">YÃ¶netim: Merkezi</span>
            </div>
          </article>
        </div>
        <div class="notify-side-stack">
          <article class="notify-card notify-steps-card">
            <div class="panel-head-inline">
              <h3>Bilgilendirme</h3>
            </div>
            <ol class="notify-steps-list">
              <li>Telefon uyarÄ±larÄ± Pushbullet entegrasyonu ile gÃ¶nderilir.</li>
              <li>Bu ayarlar yalnÄ±zca panel sahibinin yerel bilgisayarÄ±nda aÃ§Ä±lÄ±r.</li>
              <li>Bildirim kapsamÄ± yÃ¶neticinin tanÄ±mladÄ±ÄŸÄ± cihazlarla sÄ±nÄ±rlÄ±dÄ±r.</li>
            </ol>
            <p class="notify-summary-text">CanlÄ± uzay havasÄ± yÃ¼kseliÅŸleri ve dÃ¼zenli Ã¶zetler panel yÃ¶neticisi tarafÄ±ndan merkezi olarak paylaÅŸÄ±lÄ±r.</p>
          </article>
        </div>
      </div>
    `;
    return;
  }

  elements.notificationPanelStatus.textContent = statusMeta.text;
  elements.notificationPanelStatus.className = statusMeta.badgeClass;

  elements.notificationPanelContent.innerHTML = `
    <div class="notify-shell">
      <div class="notify-main-stack">
        <article class="notify-card notify-form-card">
          <div class="panel-head-inline">
            <h3>Telefon baÄŸlantÄ±sÄ±</h3>
          </div>
          <p class="satellite-panel-note">Bu ayarlar sadece yerel bilgisayarda aÃ§Ä±lÄ±r. Telefon bildirimleri yalnÄ±zca Pushbullet Ã¼zerinden gÃ¶nderilir ve access token bu cihazda saklanÄ±r.</p>
          <div class="notify-form-grid">
            <label class="notify-field">
              <span>Pushbullet access token</span>
              <input data-notify-pushbullet-token type="password" value="${escapeHtml(pushbulletToken)}" placeholder="o.xxxxx">
            </label>
            <label class="notify-field">
              <span>EÅŸik seviye</span>
              <select data-notify-min-level>
                <option value="watch"${settings.min_level === "watch" ? " selected" : ""}>Ä°zleme ve Ã¼zeri</option>
                <option value="warning"${settings.min_level === "warning" ? " selected" : ""}>UyarÄ± ve Ã¼zeri</option>
                <option value="severe"${settings.min_level === "severe" ? " selected" : ""}>Åiddetli olaylar</option>
              </select>
            </label>
            <label class="notify-field">
              <span>SoÄŸuma sÃ¼resi (dk)</span>
              <input data-notify-cooldown type="number" min="5" max="720" step="5" value="${escapeHtml(cooldownMinutes)}">
            </label>
            <label class="notify-field notify-field-wide notify-toggle">
              <input data-notify-enabled type="checkbox"${settings.enabled ? " checked" : ""}>
              <div class="notify-toggle-copy">
                <strong>Otomatik uyarÄ±lar aktif olsun</strong>
                <span>EÅŸik aÅŸÄ±ldÄ±ÄŸÄ±nda ya da veriler belirgin biÃ§imde yÃ¼kselmeye baÅŸladÄ±ÄŸÄ±nda sistem telefona bildirim gÃ¶ndersin.</span>
              </div>
            </label>
          </div>
          <div class="notify-actions">
            <button type="button" class="notify-button notify-button-primary" data-notify-save>AyarlarÄ± Kaydet</button>
            <button type="button" class="notify-button notify-button-secondary" data-notify-test${canSendViaProvider ? "" : " disabled"}>Test GÃ¶nder</button>
            <button type="button" class="notify-button notify-button-secondary" data-notify-current${canSendCurrent ? "" : " disabled"}>GÃ¼ncel Durumu GÃ¶nder</button>
          </div>
          <div class="notify-link-box">
            <span class="notify-link-label">Panel baÄŸlantÄ±sÄ±</span>
            <p class="notify-summary-text">Pushbullet tarafÄ±nda eriÅŸim, token tanÄ±mlanan hesap ve cihazlarla sÄ±nÄ±rlÄ±dÄ±r.</p>
            <a class="notify-link" href="${escapeHtml(accessUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(accessUrl)}</a>
          </div>
        </article>

        <article class="notify-card">
          <div class="panel-head-inline">
            <h3>CanlÄ± tetik Ã¶zeti</h3>
          </div>
          <div class="notify-metric-grid">
            <article class="notify-metric-card">
              <span>AnlÄ±k seviye</span>
              <strong class="${currentLevel === "normal" ? "notify-health-ok" : currentLevel === "watch" ? "notify-health-watch" : currentLevel === "warning" ? "notify-health-warning" : "notify-health-severe"}">${formatNotificationThreshold(currentLevel)}</strong>
              <p>Panelin ÅŸu anki genel uzay havasÄ± seviyesi</p>
            </article>
            <article class="notify-metric-card">
              <span>AnlÄ±k risk</span>
              <strong>${currentRisk === null ? "-" : `%${formatNumber(currentRisk, 0)}`}</strong>
              <p>Otomatik uyarÄ± kararÄ±nda kullanÄ±lan risk yÃ¼zdesi</p>
            </article>
            <article class="notify-metric-card">
              <span>AnlÄ±k Kp</span>
              <strong>${currentKp === null ? "-" : formatNumber(currentKp, 2)}</strong>
              <p>Son gÃ¶zlenen veya son tahmini Kp girdisi</p>
            </article>
            <article class="notify-metric-card">
              <span>Otomatik eÅŸik</span>
              <strong>${formatNotificationThreshold(settings.min_level)}</strong>
              <p>Bildirimler bu seviye ve Ã¼zerinde devreye girer</p>
            </article>
          </div>
          <p class="notify-summary-text">${liveSummaryText}</p>
          <div class="notify-chip-row">
            <span class="notify-chip">SaÄŸlayÄ±cÄ±: ${escapeHtml(notificationProviderLabel(provider))}</span>
            <span class="notify-chip">SoÄŸuma: ${cooldownMinutes} dk</span>
            ${pushbulletReady ? '<span class="notify-chip">Pushbullet hazÄ±r</span>' : ""}
          </div>
        </article>
      </div>

      <div class="notify-side-stack">
        <article class="notify-card notify-last-box" hidden>
          <div class="panel-head-inline">
            <h3>Son gÃ¶nderim kaydÄ±</h3>
          </div>
          <div class="notify-last-meta">
            <div class="notify-last-row">
              <span>Zaman</span>
              <strong>${lastSentText}</strong>
            </div>
            <div class="notify-last-row">
              <span>Son seviye / risk / Kp</span>
              <strong><span class="${lastLevel === "normal" ? "notify-health-ok" : lastLevel === "watch" ? "notify-health-watch" : lastLevel === "warning" ? "notify-health-warning" : "notify-health-severe"}">${formatNotificationThreshold(lastLevel)}</span> Â· ${lastRiskText} Â· ${lastKpText}</strong>
            </div>
            <div class="notify-last-row">
              <span>Son baÅŸlÄ±k</span>
              <strong>${escapeHtml(state.last_title || "HenÃ¼z gÃ¶nderim yok.")}</strong>
            </div>
          </div>
          ${safeLastMessage ? `<p class="notify-last-note">${safeLastMessage}</p>` : ""}
          ${state.last_error ? `<p class="notify-last-note notify-health-severe">Son hata: ${escapeHtml(state.last_error)}</p>` : ""}
        </article>

        <article class="notify-card notify-steps-card">
          <div class="panel-head-inline">
            <h3>HÄ±zlÄ± kurulum</h3>
          </div>
          <ol class="notify-steps-list">
            <li>Pushbullet hesabÄ±nda <strong>Access Token</strong> oluÅŸtur.</li>
            <li>Yerel panelde token alanÄ±na yapÄ±ÅŸtÄ±r.</li>
            <li>Yerelde otomatik bildirimleri aktif edip ayarlarÄ± kaydet.</li>
            <li><strong>Test GÃ¶nder</strong> ile akÄ±ÅŸÄ± dene, sonra sistemi canlÄ± takibe bÄ±rak.</li>
          </ol>
          <p class="notify-summary-text">${escapeHtml(payload.instructions?.phone_app || "")}</p>
          <p class="notify-summary-text">${escapeHtml(payload.instructions?.topic_note || "")}</p>
          <p class="notify-summary-text">${escapeHtml(payload.instructions?.admin_note || "")}</p>
          <p class="notify-summary-text">Not: Panel dÃ¼zenli yenilenirken sistem yeni uzay havasÄ± yÃ¼kseliÅŸlerini ve periyodik durum Ã¶zetlerini Pushbullet Ã¼zerinden gÃ¶nderir.</p>
        </article>
      </div>
    </div>
  `;

  const root = elements.notificationPanelContent;
  const saveButton = root.querySelector("[data-notify-save]");
  const testButton = root.querySelector("[data-notify-test]");
  const currentButton = root.querySelector("[data-notify-current]");
  const restoreStatus = () => {
    const meta = notificationStatusMeta(settings);
    elements.notificationPanelStatus.textContent = meta.text;
    elements.notificationPanelStatus.className = meta.badgeClass;
  };
  const setBusy = (busy, label) => {
    if (busy) {
      [saveButton, testButton, currentButton].forEach((button) => {
        if (button) button.disabled = true;
      });
      elements.notificationPanelStatus.textContent = label;
      elements.notificationPanelStatus.className = "badge badge-watch";
    } else {
      restoreStatus();
      if (saveButton) saveButton.disabled = false;
      if (testButton) testButton.disabled = !canSendViaProvider;
      if (currentButton) currentButton.disabled = !canSendCurrent;
    }
  };
  const readSettings = () => ({
    provider: "pushbullet",
    enabled: Boolean(root.querySelector("[data-notify-enabled]")?.checked),
    pushbullet_token: root.querySelector("[data-notify-pushbullet-token]")?.value?.trim() || "",
    min_level: root.querySelector("[data-notify-min-level]")?.value || "watch",
    cooldown_minutes: parseInt(root.querySelector("[data-notify-cooldown]")?.value || `${cooldownMinutes}`, 10) || cooldownMinutes,
  });

  saveButton?.addEventListener("click", async () => {
    try {
      setBusy(true, "Kaydediliyor");
      setStatus("Telefon bildirim ayarlarÄ± kaydediliyor.");
      const previousSettings = loadNotificationSettingsFromStorage();
      const savedSettings = saveNotificationSettingsToStorage(readSettings());
      if (
        String(previousSettings.provider || "auto") !== String(savedSettings.provider || "auto")
        || String(previousSettings.pushbullet_token || "") !== String(savedSettings.pushbullet_token || "")
      ) {
        saveNotificationStateToStorage({
          ...loadNotificationStateFromStorage(),
          last_sent_at: null,
          last_error: null,
        });
      }
      let nextPayload = notificationPayloadFromStorage();
      try {
        const response = await postJsonWithTimeout("/api/notifications/settings", savedSettings);
        nextPayload = mergeNotificationPayload(response.notifications);
      } catch {
        try {
          const bridgeResponse = await postNotificationBridge("/api/notifications/settings", savedSettings);
          nextPayload = mergeNotificationPayload(bridgeResponse.notifications);
        } catch {
        }
      }
      renderNotificationPanel(nextPayload, latest, access);
      setStatus("Telefon bildirim ayarlarÄ± kaydedildi.");
      maybeSendAutoNotification(latest, access, nextPayload).catch(() => {});
    } catch (error) {
      setBusy(false);
      setStatus(error.message || "Bildirim ayarlarÄ± kaydedilemedi.");
    }
  });

  testButton?.addEventListener("click", async () => {
    try {
      setBusy(true, "GÃ¶nderiliyor");
      setStatus("Telefon test bildirimi gÃ¶nderiliyor.");
      const savedSettings = saveNotificationSettingsToStorage(readSettings());
      let nextPayload = notificationPayloadFromStorage();
      let statusMessage = "Test bildirimi gÃ¶nderildi.";
      try {
        const response = await postJsonWithTimeout("/api/notifications/test", {});
        nextPayload = mergeNotificationPayload(response.notifications);
        statusMessage = response?.result?.message || statusMessage;
      } catch {
        try {
          const bridgeResponse = await postNotificationBridge("/api/notifications/test", {});
          nextPayload = mergeNotificationPayload(bridgeResponse.notifications);
          statusMessage = bridgeResponse?.result?.message || statusMessage;
        } catch {
          await sendNotificationDirect("test", savedSettings, latest, access);
          nextPayload = notificationPayloadFromStorage();
        }
      }
      renderNotificationPanel(nextPayload, latest, access);
      setStatus(statusMessage);
    } catch (error) {
      setBusy(false);
      setStatus(error.message || "Test bildirimi gÃ¶nderilemedi.");
    }
  });

  currentButton?.addEventListener("click", async () => {
    try {
      setBusy(true, "GÃ¶nderiliyor");
      setStatus("GÃ¼ncel durum telefona gÃ¶nderiliyor.");
      const savedSettings = saveNotificationSettingsToStorage(readSettings());
      let nextPayload = notificationPayloadFromStorage();
      let statusMessage = "GÃ¼ncel durum telefona gÃ¶nderildi.";
      try {
        const response = await postJsonWithTimeout("/api/notifications/send-current", {});
        nextPayload = mergeNotificationPayload(response.notifications);
        statusMessage = response?.result?.message || statusMessage;
      } catch {
        try {
          const bridgeResponse = await postNotificationBridge("/api/notifications/send-current", {});
          nextPayload = mergeNotificationPayload(bridgeResponse.notifications);
          statusMessage = bridgeResponse?.result?.message || statusMessage;
        } catch {
          await sendNotificationDirect("manual", savedSettings, latest, access);
          nextPayload = notificationPayloadFromStorage();
        }
      }
      renderNotificationPanel(nextPayload, latest, access);
      setStatus(statusMessage);
    } catch (error) {
      setBusy(false);
      setStatus(error.message || "GÃ¼ncel durum bildirimi gÃ¶nderilemedi.");
    }
  });

  repairDocumentEncoding(elements.notificationPanelContent);
}

function buildNotificationEvent(latest, access, mode = "alert") {
  const evaluation = latest?.evaluation || {};
  const noaa = evaluation.noaa || {};
  const level = String(evaluation.level || "normal").toLowerCase();
  const riskPercent = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const kpValue = parseNumber(noaa.kp);
  const kpEstimated = parseNumber(noaa.kp_estimated);
  const windSpeed = parseNumber(noaa.solar_wind_speed_km_s);
  const bzValue = parseNumber(noaa.bz_nt);
  const generatedAt = latest?.generated_at || noaa.observed_at || null;
  const normalizedMode = String(mode || "alert").toLowerCase();
  const isManual = normalizedMode === "manual";
  const isPeriodic = normalizedMode === "periodic";
  const titlePrefix = isManual ? "Manuel Ã–zet" : isPeriodic ? "DÃ¼zenli Durum Ã–zeti" : "Uzay HavasÄ± UyarÄ±sÄ±";
  const title = `${titlePrefix} | ${level.toUpperCase()}`;
  const lines = [
    `Seviye: ${level}`,
    `Risk: ${riskPercent === null ? "-" : `%${formatNumber(riskPercent, 0)}`}`,
    `Kp: ${kpValue === null ? "-" : formatNumber(kpValue, 2)}`,
    `Kp Tahmini: ${kpEstimated === null ? "-" : formatNumber(kpEstimated, 2)}`,
    `GÃ¼neÅŸ rÃ¼zgarÄ±: ${windSpeed === null ? "-" : `${formatNumber(windSpeed, 0)} km/s`}`,
    `IMF Bz: ${bzValue === null ? "-" : `${bzValue >= 0 ? "+" : ""}${formatNumber(bzValue, 1)} nT`}`,
    `Zaman: ${generatedAt || "-"}`,
  ];
  if (isPeriodic) {
    lines.push("Not: Bu bildirim dÃ¼zenli durum Ã¶zeti olarak gÃ¶nderildi.");
  } else if (!isManual) {
    lines.push("Eylem: Paneli aÃ§Ä±p sistemleri kontrol et.");
  }
  return {
    title,
    message: lines.join("\n"),
    priority: isPeriodic && level === "normal" ? "2" : notificationPriority(level),
    tags: ["satellite", isPeriodic ? "summary" : "warning", level],
    level,
    riskPercent,
    kpValue,
    clickUrl: access?.public_url || access?.local_url || window.location.origin,
  };
}

async function sendNotificationDirect(kind, settings, latest, access) {
  const token = String(settings?.pushbullet_token || "").trim();
  if (!token) {
    throw new Error("Pushbullet access token gerekli.");
  }

  const eventPayload = kind === "test"
    ? {
      title: "Telefon Test Bildirimi",
      message: "Pushbullet bildirim hattÄ± hazÄ±r. Bu test bildirimi panelden gÃ¶nderildi.",
      priority: "3",
      tags: ["satellite", "test"],
      level: "normal",
      riskPercent: null,
      kpValue: null,
      clickUrl: access?.public_url || access?.local_url || window.location.origin,
    }
    : buildNotificationEvent(latest, access, kind);

  const requestPayload = {
    pushbullet_token: token,
    event: {
      title: eventPayload.title,
      message: eventPayload.message,
      priority: eventPayload.priority || "3",
      tags: Array.isArray(eventPayload.tags) ? eventPayload.tags : [],
      click_url: eventPayload.clickUrl || null,
    },
  };

  try {
    await postJsonWithTimeout("/api/notifications/pushbullet/send", requestPayload, 20000);
  } catch (primaryError) {
    if (canUseNotificationBridge()) {
      try {
        await postNotificationBridge("/api/notifications/pushbullet/send", requestPayload, 20000);
      } catch {
        throw new Error(primaryError?.message || "Pushbullet bildirimi gÃ¶nderilemedi.");
      }
    } else {
      throw new Error(primaryError?.message || "Pushbullet bildirimi gÃ¶nderilemedi.");
    }
  }

  return storeNotificationSendResult(eventPayload, null);
}

async function maybeSendAutoNotification(latest, access, notifications) {
  const payload = mergeNotificationPayload(notifications);
  const settings = payload.settings || {};
  if (notificationAutoInFlight) return;
  if (!settings.enabled || !settings.pushbullet_token || !latest?.evaluation) return;

  const evaluation = latest.evaluation || {};
  const level = String(evaluation.level || "normal").toLowerCase();
  const state = loadNotificationStateFromStorage();
  const baselineLevel = String(state.last_level || "normal").toLowerCase();
  const lastSentAt = state.last_sent_at ? parseUtcDate(state.last_sent_at) : null;
  const cooldownMs = Math.max(5, parseInt(settings.cooldown_minutes, 10) || 60) * 60 * 1000;
  const nowMs = Date.now();
  const riskPercent = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const kpValue = parseNumber(evaluation?.noaa?.kp ?? evaluation?.noaa?.kp_estimated);
  const levelMeetsThreshold = notificationLevelRank(level) >= notificationLevelRank(settings.min_level);
  const levelIncreased = notificationLevelRank(level) > notificationLevelRank(baselineLevel);
  const lastRisk = parseNumber(state.last_risk_percent);
  const lastKp = parseNumber(state.last_kp);
  const riskIncreased = riskPercent !== null && lastRisk !== null && (riskPercent - lastRisk) >= 8;
  const kpIncreased = kpValue !== null && lastKp !== null && (kpValue - lastKp) >= 0.7;
  const currentKey = `${latest.generated_at || "now"}|${level}|${formatNumber(evaluation.risk_percent ?? evaluation.score, 0)}|${formatNumber(evaluation?.noaa?.kp ?? evaluation?.noaa?.kp_estimated, 2)}`;
  const periodicDue = !lastSentAt || ((nowMs - lastSentAt.getTime()) >= cooldownMs);
  const immediateTrigger = levelIncreased || riskIncreased || kpIncreased || (levelMeetsThreshold && !lastSentAt);
  if (!immediateTrigger && !periodicDue) {
    return;
  }
  if (notificationAutomationKey === currentKey && !periodicDue) {
    return;
  }
  notificationAutomationKey = currentKey;

  const cooldownActive = lastSentAt ? ((nowMs - lastSentAt.getTime()) < cooldownMs) : false;
  if (cooldownActive && !(levelIncreased || riskIncreased || kpIncreased)) {
    return;
  }

  notificationAutoInFlight = true;
  try {
    const mergedSettings = saveNotificationSettingsToStorage(settings);
    const autoMode = immediateTrigger ? "auto" : "periodic";
    await sendNotificationDirect(autoMode, mergedSettings, latest, access);
    renderNotificationPanel(notificationPayloadFromStorage(), latest, access);
    setStatus(autoMode === "periodic"
      ? "Telefon iÃ§in dÃ¼zenli durum Ã¶zeti gÃ¶nderildi."
      : "Telefon uyarÄ± akÄ±ÅŸÄ± gÃ¼ncel veriye gÃ¶re kontrol edildi.");
  } catch (error) {
    const autoMode = immediateTrigger ? "auto" : "periodic";
    storeNotificationSendResult(buildNotificationEvent(latest, access, autoMode), error.message || "Bildirim gÃ¶nderilemedi.");
    renderNotificationPanel(notificationPayloadFromStorage(), latest, access);
  } finally {
    notificationAutoInFlight = false;
  }
}

function renderNotificationPanel(notifications, latest, access) {
  if (!elements.notificationPanelContent || !elements.notificationPanelStatus) {
    return;
  }

  const payload = mergeNotificationPayload(notifications);
  const settings = payload.settings || {};
  const state = payload.state || {};
  const accessUrl = access?.public_url || access?.local_url || window.location.origin;
  const evaluation = latest?.evaluation || {};
  const noaa = latest?.evaluation?.noaa || {};
  const currentLevel = String(evaluation.level || "normal").toLowerCase();
  const currentRisk = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const currentKp = parseNumber(noaa.kp ?? noaa.kp_estimated);
  const cooldownMinutes = Math.max(5, parseInt(settings.cooldown_minutes, 10) || 60);
  const pushbulletToken = String(settings.pushbullet_token || "");
  const pushbulletReady = Boolean(pushbulletToken.trim());
  const statusMeta = notificationStatusMeta(settings);
  const canSendCurrent = pushbulletReady && Boolean(latest);
  const lastLevel = String(state.last_level || "normal").toLowerCase();
  const lastSentText = state.last_sent_at ? formatDate(state.last_sent_at) : "HenÃ¼z gÃ¶nderim yok.";
  const lastRiskText = state.last_risk_percent === null || state.last_risk_percent === undefined
    ? "-"
    : `%${formatNumber(state.last_risk_percent, 0)}`;
  const lastKpText = state.last_kp === null || state.last_kp === undefined
    ? "-"
    : formatNumber(state.last_kp, 2);
  const safeLastMessage = escapeHtml(state.last_message || "").replace(/\n/g, "<br>");
  const subscriberMessage = "Her kullanÄ±cÄ± kendi Pushbullet access token'Ä±nÄ± girerek bu tarayÄ±cÄ± iÃ§in kiÅŸisel bildirim akÄ±ÅŸÄ±nÄ± aÃ§abilir.";
  const liveSummaryText = !latest
    ? "CanlÄ± veri geldikten sonra test ve gÃ¼ncel durum gÃ¶nderimi aÃ§Ä±lÄ±r. Otomatik bildirimler iÃ§in bu sayfanÄ±n aÃ§Ä±k kalmasÄ± gerekir."
    : settings.enabled
      ? `Otomatik akÄ±ÅŸ bu tarayÄ±cÄ±da aktif. Sayfa aÃ§Ä±k kaldÄ±ÄŸÄ± sÃ¼rece sistem her ${cooldownMinutes} dakikada bir durum Ã¶zeti gÃ¶nderir; seviye, risk veya Kp hÄ±zla yÃ¼kselirse beklemeden yeni uyarÄ± yollar.`
      : "Test veya manuel gÃ¶nderim kullanÄ±labilir. Otomatik akÄ±ÅŸÄ± devreye almak iÃ§in kutuyu aktif edip ayarlarÄ± kaydetmen yeterli.";
  const storageScopeText = "Pushbullet access token yalnÄ±zca bu tarayÄ±cÄ±nÄ±n yerel depolamasÄ±nda saklanÄ±r; sunucuda kalÄ±cÄ± olarak tutulmaz.";

  elements.notificationPanelStatus.textContent = statusMeta.text;
  elements.notificationPanelStatus.className = statusMeta.badgeClass;

  elements.notificationPanelContent.innerHTML = `
    <div class="notify-shell">
      <div class="notify-main-stack">
        <article class="notify-card notify-form-card">
          <div class="panel-head-inline">
            <h3>KiÅŸisel telefon bildirimleri</h3>
          </div>
          <p class="satellite-panel-note">${subscriberMessage}</p>
          <div class="notify-chip-row">
            <span class="notify-chip">SaÄŸlayÄ±cÄ±: Pushbullet</span>
            <span class="notify-chip">Kapsam: Bu tarayÄ±cÄ±</span>
            <span class="notify-chip">Bildirim: KullanÄ±cÄ± bazlÄ±</span>
          </div>
          <div class="notify-form-grid">
            <label class="notify-field">
              <span>Pushbullet access token</span>
              <input data-notify-pushbullet-token type="password" value="${escapeHtml(pushbulletToken)}" placeholder="o.xxxxx">
            </label>
            <label class="notify-field">
              <span>EÅŸik seviye</span>
              <select data-notify-min-level>
                <option value="watch"${settings.min_level === "watch" ? " selected" : ""}>Ä°zleme ve Ã¼zeri</option>
                <option value="warning"${settings.min_level === "warning" ? " selected" : ""}>UyarÄ± ve Ã¼zeri</option>
                <option value="severe"${settings.min_level === "severe" ? " selected" : ""}>Åiddetli olaylar</option>
              </select>
            </label>
            <label class="notify-field">
              <span>SoÄŸuma sÃ¼resi (dk)</span>
              <input data-notify-cooldown type="number" min="5" max="720" step="5" value="${escapeHtml(cooldownMinutes)}">
            </label>
            <label class="notify-field notify-field-wide notify-toggle">
              <input data-notify-enabled type="checkbox"${settings.enabled ? " checked" : ""}>
              <div class="notify-toggle-copy">
                <strong>Otomatik uyarÄ±lar aktif olsun</strong>
                <span>EÅŸik aÅŸÄ±ldÄ±ÄŸÄ±nda veya veriler belirgin biÃ§imde yÃ¼kseldiÄŸinde bu tarayÄ±cÄ± adÄ±na telefonuma bildirim gÃ¶nder.</span>
              </div>
            </label>
          </div>
          <div class="notify-actions">
            <button type="button" class="notify-button notify-button-primary" data-notify-save>AyarlarÄ± Kaydet</button>
            <button type="button" class="notify-button notify-button-secondary" data-notify-test${pushbulletReady ? "" : " disabled"}>Test GÃ¶nder</button>
            <button type="button" class="notify-button notify-button-secondary" data-notify-current${canSendCurrent ? "" : " disabled"}>GÃ¼ncel Durumu GÃ¶nder</button>
          </div>
          <div class="notify-link-box">
            <span class="notify-link-label">Panel baÄŸlantÄ±sÄ±</span>
            <p class="notify-summary-text">${storageScopeText}</p>
            <a class="notify-link" href="${escapeHtml(accessUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(accessUrl)}</a>
          </div>
        </article>

        <article class="notify-card">
          <div class="panel-head-inline">
            <h3>CanlÄ± tetik Ã¶zeti</h3>
          </div>
          <div class="notify-metric-grid">
            <article class="notify-metric-card">
              <span>AnlÄ±k seviye</span>
              <strong class="${currentLevel === "normal" ? "notify-health-ok" : currentLevel === "watch" ? "notify-health-watch" : currentLevel === "warning" ? "notify-health-warning" : "notify-health-severe"}">${formatNotificationThreshold(currentLevel)}</strong>
              <p>Panelin ÅŸu anki genel uzay havasÄ± seviyesi</p>
            </article>
            <article class="notify-metric-card">
              <span>AnlÄ±k risk</span>
              <strong>${currentRisk === null ? "-" : `%${formatNumber(currentRisk, 0)}`}</strong>
              <p>Otomatik karar iÃ§in kullanÄ±lan risk yÃ¼zdesi</p>
            </article>
            <article class="notify-metric-card">
              <span>AnlÄ±k Kp</span>
              <strong>${currentKp === null ? "-" : formatNumber(currentKp, 2)}</strong>
              <p>Son gÃ¶zlenen veya son tahmini Kp girdisi</p>
            </article>
            <article class="notify-metric-card">
              <span>Otomatik eÅŸik</span>
              <strong>${formatNotificationThreshold(settings.min_level)}</strong>
              <p>Bildirimler bu seviye ve Ã¼zerinde devreye girer</p>
            </article>
          </div>
          <p class="notify-summary-text">${liveSummaryText}</p>
          <div class="notify-chip-row">
            <span class="notify-chip">SaÄŸlayÄ±cÄ±: Pushbullet</span>
            <span class="notify-chip">SoÄŸuma: ${cooldownMinutes} dk</span>
            ${pushbulletReady ? '<span class="notify-chip">Token hazÄ±r</span>' : '<span class="notify-chip">Token girilmedi</span>'}
          </div>
        </article>
      </div>

      <div class="notify-side-stack">
        <article class="notify-card notify-last-box" hidden>
          <div class="panel-head-inline">
            <h3>Son gÃ¶nderim kaydÄ±</h3>
          </div>
          <div class="notify-last-meta">
            <div class="notify-last-row">
              <span>Zaman</span>
              <strong>${lastSentText}</strong>
            </div>
            <div class="notify-last-row">
              <span>Son seviye / risk / Kp</span>
              <strong><span class="${lastLevel === "normal" ? "notify-health-ok" : lastLevel === "watch" ? "notify-health-watch" : lastLevel === "warning" ? "notify-health-warning" : "notify-health-severe"}">${formatNotificationThreshold(lastLevel)}</span> Â· ${lastRiskText} Â· ${lastKpText}</strong>
            </div>
            <div class="notify-last-row">
              <span>Son baÅŸlÄ±k</span>
              <strong>${escapeHtml(state.last_title || "HenÃ¼z gÃ¶nderim yok.")}</strong>
            </div>
          </div>
          ${safeLastMessage ? `<p class="notify-last-note">${safeLastMessage}</p>` : ""}
          ${state.last_error ? `<p class="notify-last-note notify-health-severe">Son hata: ${escapeHtml(state.last_error)}</p>` : ""}
        </article>

        <article class="notify-card notify-steps-card">
          <div class="panel-head-inline">
            <h3>HÄ±zlÄ± kurulum</h3>
          </div>
          <ol class="notify-steps-list">
            <li>Pushbullet hesabÄ±nda <strong>Access Token</strong> oluÅŸtur.</li>
            <li>Bu paneldeki token alanÄ±na kendi hesabÄ±nÄ± yapÄ±ÅŸtÄ±r.</li>
            <li>Otomatik bildirimleri aktif edip ayarlarÄ± kaydet.</li>
            <li><strong>Test GÃ¶nder</strong> ile hattÄ± doÄŸrula ve sayfayÄ± aÃ§Ä±k bÄ±rakarak canlÄ± takibe geÃ§.</li>
          </ol>
          <p class="notify-summary-text">Bu arayÃ¼z artÄ±k her kullanÄ±cÄ± iÃ§in kiÅŸisel Pushbullet hesabÄ±yla Ã§alÄ±ÅŸÄ±r.</p>
          <p class="notify-summary-text">${storageScopeText}</p>
          <p class="notify-summary-text">Not: Otomatik bildirim akÄ±ÅŸÄ±, bu sayfa aÃ§Ä±k kaldÄ±ÄŸÄ± sÃ¼rece bulunduÄŸun tarayÄ±cÄ±da Ã§alÄ±ÅŸÄ±r.</p>
        </article>
      </div>
    </div>
  `;

  const root = elements.notificationPanelContent;
  const saveButton = root.querySelector("[data-notify-save]");
  const testButton = root.querySelector("[data-notify-test]");
  const currentButton = root.querySelector("[data-notify-current]");
  const restoreStatus = () => {
    const meta = notificationStatusMeta(loadNotificationSettingsFromStorage());
    elements.notificationPanelStatus.textContent = meta.text;
    elements.notificationPanelStatus.className = meta.badgeClass;
  };
  const setBusy = (busy, label) => {
    if (busy) {
      [saveButton, testButton, currentButton].forEach((button) => {
        if (button) button.disabled = true;
      });
      elements.notificationPanelStatus.textContent = label;
      elements.notificationPanelStatus.className = "badge badge-watch";
    } else {
      restoreStatus();
      if (saveButton) saveButton.disabled = false;
      const liveSettings = loadNotificationSettingsFromStorage();
      const hasToken = Boolean(String(liveSettings.pushbullet_token || "").trim());
      if (testButton) testButton.disabled = !hasToken;
      if (currentButton) currentButton.disabled = !(hasToken && latest);
    }
  };
  const readSettings = () => ({
    provider: "pushbullet",
    enabled: Boolean(root.querySelector("[data-notify-enabled]")?.checked),
    pushbullet_token: root.querySelector("[data-notify-pushbullet-token]")?.value?.trim() || "",
    min_level: root.querySelector("[data-notify-min-level]")?.value || "watch",
    cooldown_minutes: parseInt(root.querySelector("[data-notify-cooldown]")?.value || `${cooldownMinutes}`, 10) || cooldownMinutes,
  });

  saveButton?.addEventListener("click", async () => {
    try {
      setBusy(true, "Kaydediliyor");
      setStatus("KiÅŸisel bildirim ayarlarÄ± bu tarayÄ±cÄ± iÃ§in kaydediliyor.");
      const previousSettings = loadNotificationSettingsFromStorage();
      const savedSettings = saveNotificationSettingsToStorage(readSettings());
      if (
        String(previousSettings.pushbullet_token || "") !== String(savedSettings.pushbullet_token || "")
        || String(previousSettings.min_level || "watch") !== String(savedSettings.min_level || "watch")
      ) {
        saveNotificationStateToStorage({
          ...loadNotificationStateFromStorage(),
          last_sent_at: null,
          last_error: null,
        });
      }
      renderNotificationPanel(notificationPayloadFromStorage(), latest, access);
      setStatus("KiÅŸisel bildirim ayarlarÄ± kaydedildi.");
      maybeSendAutoNotification(latest, access, notificationPayloadFromStorage()).catch(() => {});
    } catch (error) {
      setBusy(false);
      setStatus(error.message || "Bildirim ayarlarÄ± kaydedilemedi.");
    }
  });

  testButton?.addEventListener("click", async () => {
    try {
      setBusy(true, "GÃ¶nderiliyor");
      setStatus("Telefon test bildirimi gÃ¶nderiliyor.");
      const savedSettings = saveNotificationSettingsToStorage(readSettings());
      await sendNotificationDirect("test", savedSettings, latest, access);
      renderNotificationPanel(notificationPayloadFromStorage(), latest, access);
      setStatus("Test bildirimi gÃ¶nderildi.");
    } catch (error) {
      setBusy(false);
      setStatus(error.message || "Test bildirimi gÃ¶nderilemedi.");
    }
  });

  currentButton?.addEventListener("click", async () => {
    try {
      setBusy(true, "GÃ¶nderiliyor");
      setStatus("GÃ¼ncel durum telefona gÃ¶nderiliyor.");
      const savedSettings = saveNotificationSettingsToStorage(readSettings());
      await sendNotificationDirect("manual", savedSettings, latest, access);
      renderNotificationPanel(notificationPayloadFromStorage(), latest, access);
      setStatus("GÃ¼ncel durum telefona gÃ¶nderildi.");
    } catch (error) {
      setBusy(false);
      setStatus(error.message || "GÃ¼ncel durum bildirimi gÃ¶nderilemedi.");
    }
  });

  repairDocumentEncoding(elements.notificationPanelContent);
}

async function maybeSendAutoNotification(latest, access, notifications) {
  const payload = mergeNotificationPayload(notifications);
  const settings = payload.settings || {};
  if (!settings.enabled || !latest?.evaluation) {
    return;
  }

  // Otomatik akış, ayarlar yerel panele kaydedildikten sonra arka planda sunucu tarafından yürütülür.
}

function renderNotificationPanel(notifications, latest, access) {
  if (!elements.notificationPanelContent || !elements.notificationPanelStatus) {
    return;
  }

  const payload = mergeNotificationPayload(notifications);
  const settings = payload.settings || {};
  const state = payload.state || {};
  const accessUrl = access?.public_url || access?.local_url || window.location.origin;
  const evaluation = latest?.evaluation || {};
  const noaa = latest?.evaluation?.noaa || {};
  const currentLevel = String(evaluation.level || "normal").toLowerCase();
  const currentRisk = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const currentKp = parseNumber(noaa.kp ?? noaa.kp_estimated);
  const cooldownMinutes = Math.max(5, parseInt(settings.cooldown_minutes, 10) || 60);
  const pushbulletToken = String(settings.pushbullet_token || "");
  const pushbulletReady = Boolean(pushbulletToken.trim());
  const statusMeta = notificationStatusMeta(settings);
  const canSendCurrent = pushbulletReady && Boolean(latest);
  const lastLevel = String(state.last_level || "normal").toLowerCase();
  const lastSentText = state.last_sent_at ? formatDate(state.last_sent_at) : "Henüz gönderim yok.";
  const lastRiskText = state.last_risk_percent === null || state.last_risk_percent === undefined
    ? "-"
    : `%${formatNumber(state.last_risk_percent, 0)}`;
  const lastKpText = state.last_kp === null || state.last_kp === undefined
    ? "-"
    : formatNumber(state.last_kp, 2);
  const safeLastMessage = escapeHtml(state.last_message || "").replace(/\n/g, "<br>");
  const subscriberMessage = "Pushbullet access token'ını bu yerel panelde kaydederek kişisel bildirim akışını arka planda çalıştırabilirsin.";
  const liveSummaryText = !latest
    ? "Canlı veri geldikten sonra test ve güncel durum gönderimi açılır. Ayarlar kaydedildiğinde otomatik bildirimler panel arka planda çalıştığı sürece sayfa kapalı olsa da devam eder."
    : settings.enabled
      ? `Otomatik akış yerel panelde aktif. Sayfa kapalı olsa da panel çalıştığı sürece sistem her ${cooldownMinutes} dakikada bir durum özeti gönderir; seviye, risk veya Kp hızla yükselirse beklemeden yeni uyarı yollar.`
      : "Test veya manuel gönderim kullanılabilir. Otomatik akışı devreye almak için kutuyu aktif edip ayarları kaydetmen yeterli.";
  const storageScopeText = "Pushbullet access token yalnızca bu yerel panel bilgisayarında saklanır; dışarı paylaşılmaz.";

  elements.notificationPanelStatus.textContent = statusMeta.text;
  elements.notificationPanelStatus.className = statusMeta.badgeClass;

  elements.notificationPanelContent.innerHTML = `
    <div class="notify-shell">
      <div class="notify-main-stack">
        <article class="notify-card notify-form-card">
          <div class="panel-head-inline">
            <h3>Kişisel telefon bildirimleri</h3>
          </div>
          <p class="satellite-panel-note">${subscriberMessage}</p>
          <div class="notify-chip-row">
            <span class="notify-chip">Sağlayıcı: Pushbullet</span>
            <span class="notify-chip">Kapsam: Yerel panel</span>
            <span class="notify-chip">Bildirim: Kullanıcı bazlı</span>
          </div>
          <div class="notify-form-grid">
            <label class="notify-field">
              <span>Pushbullet access token</span>
              <input data-notify-pushbullet-token type="password" value="${escapeHtml(pushbulletToken)}" placeholder="o.xxxxx">
            </label>
            <label class="notify-field">
              <span>Eşik seviye</span>
              <select data-notify-min-level>
                <option value="watch"${settings.min_level === "watch" ? " selected" : ""}>İzleme ve üzeri</option>
                <option value="warning"${settings.min_level === "warning" ? " selected" : ""}>Uyarı ve üzeri</option>
                <option value="severe"${settings.min_level === "severe" ? " selected" : ""}>Şiddetli olaylar</option>
              </select>
            </label>
            <label class="notify-field">
              <span>Soğuma süresi (dk)</span>
              <input data-notify-cooldown type="number" min="5" max="720" step="5" value="${escapeHtml(cooldownMinutes)}">
            </label>
            <label class="notify-field notify-field-wide notify-toggle">
              <input data-notify-enabled type="checkbox"${settings.enabled ? " checked" : ""}>
              <div class="notify-toggle-copy">
                <strong>Otomatik uyarılar aktif olsun</strong>
                <span>Eşik aşıldığında veya veriler belirgin biçimde yükseldiğinde yerel panel arka planda telefonuma bildirim göndersin.</span>
              </div>
            </label>
          </div>
          <div class="notify-actions">
            <button type="button" class="notify-button notify-button-primary" data-notify-save>Ayarları Kaydet</button>
            <button type="button" class="notify-button notify-button-secondary" data-notify-test${pushbulletReady ? "" : " disabled"}>Test Gönder</button>
            <button type="button" class="notify-button notify-button-secondary" data-notify-current${canSendCurrent ? "" : " disabled"}>Güncel Durumu Gönder</button>
          </div>
          <div class="notify-link-box">
            <span class="notify-link-label">Panel bağlantısı</span>
            <p class="notify-summary-text">${storageScopeText}</p>
            <a class="notify-link" href="${escapeHtml(accessUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(accessUrl)}</a>
          </div>
        </article>

      </div>

      <div class="notify-side-stack">
        <article class="notify-card notify-live-card">
          <div class="panel-head-inline">
            <h3>Canlı tetik özeti</h3>
          </div>
          <div class="notify-metric-grid">
            <article class="notify-metric-card">
              <span>Anlık seviye</span>
              <strong class="${currentLevel === "normal" ? "notify-health-ok" : currentLevel === "watch" ? "notify-health-watch" : currentLevel === "warning" ? "notify-health-warning" : "notify-health-severe"}">${formatNotificationThreshold(currentLevel)}</strong>
              <p>Panelin şu anki genel uzay havası seviyesi</p>
            </article>
            <article class="notify-metric-card">
              <span>Anlık risk</span>
              <strong>${currentRisk === null ? "-" : `%${formatNumber(currentRisk, 0)}`}</strong>
              <p>Otomatik karar için kullanılan risk yüzdesi</p>
            </article>
            <article class="notify-metric-card">
              <span>Anlık Kp</span>
              <strong>${currentKp === null ? "-" : formatNumber(currentKp, 2)}</strong>
              <p>Son gözlenen veya son tahmini Kp girdisi</p>
            </article>
            <article class="notify-metric-card">
              <span>Otomatik eşik</span>
              <strong>${formatNotificationThreshold(settings.min_level)}</strong>
              <p>Bildirimler bu seviye ve üzerinde devreye girer</p>
            </article>
          </div>
          <p class="notify-summary-text">${liveSummaryText}</p>
          <div class="notify-chip-row">
            <span class="notify-chip">Sağlayıcı: Pushbullet</span>
            <span class="notify-chip">Soğuma: ${cooldownMinutes} dk</span>
            ${pushbulletReady ? '<span class="notify-chip">Token hazır</span>' : '<span class="notify-chip">Token girilmedi</span>'}
          </div>
        </article>

        <article class="notify-card notify-last-box" hidden>
          <div class="panel-head-inline">
            <h3>Son gönderim kaydı</h3>
          </div>
          <div class="notify-last-meta">
            <div class="notify-last-row">
              <span>Zaman</span>
              <strong>${lastSentText}</strong>
            </div>
            <div class="notify-last-row">
              <span>Son seviye / risk / Kp</span>
              <strong><span class="${lastLevel === "normal" ? "notify-health-ok" : lastLevel === "watch" ? "notify-health-watch" : lastLevel === "warning" ? "notify-health-warning" : "notify-health-severe"}">${formatNotificationThreshold(lastLevel)}</span> · ${lastRiskText} · ${lastKpText}</strong>
            </div>
            <div class="notify-last-row">
              <span>Son başlık</span>
              <strong>${escapeHtml(state.last_title || "Henüz gönderim yok.")}</strong>
            </div>
          </div>
          ${safeLastMessage ? `<p class="notify-last-note">${safeLastMessage}</p>` : ""}
          ${state.last_error ? `<p class="notify-last-note notify-health-severe">Son hata: ${escapeHtml(state.last_error)}</p>` : ""}
        </article>

        <article class="notify-card notify-steps-card">
          <div class="panel-head-inline">
            <h3>Hızlı kurulum</h3>
          </div>
          <ol class="notify-steps-list">
            <li>Pushbullet hesabında <strong>Access Token</strong> oluştur.</li>
            <li>Bu paneldeki token alanına kendi hesabını yapıştır.</li>
            <li>Otomatik bildirimleri aktif edip ayarları kaydet.</li>
            <li><strong>Test Gönder</strong> ile hattı doğrula; sonra sayfa kapalı olsa da yerel panel arka planda bildirim göndermeye devam eder.</li>
          </ol>
          <p class="notify-summary-text">Bu arayüz artık her kullanıcı için kişisel Pushbullet hesabıyla çalışır.</p>
          <p class="notify-summary-text">${storageScopeText}</p>
          <p class="notify-summary-text">Not: Otomatik bildirim akışı, ayarlar kaydedildikten sonra yerel panel süreci çalıştığı sürece sayfadan bağımsız devam eder.</p>
        </article>
      </div>
    </div>
  `;

  const root = elements.notificationPanelContent;
  const saveButton = root.querySelector("[data-notify-save]");
  const testButton = root.querySelector("[data-notify-test]");
  const currentButton = root.querySelector("[data-notify-current]");
  const restoreStatus = () => {
    const meta = notificationStatusMeta(loadNotificationSettingsFromStorage());
    elements.notificationPanelStatus.textContent = meta.text;
    elements.notificationPanelStatus.className = meta.badgeClass;
  };
  const setBusy = (busy, label) => {
    if (busy) {
      [saveButton, testButton, currentButton].forEach((button) => {
        if (button) button.disabled = true;
      });
      elements.notificationPanelStatus.textContent = label;
      elements.notificationPanelStatus.className = "badge badge-watch";
    } else {
      restoreStatus();
      if (saveButton) saveButton.disabled = false;
      const liveSettings = loadNotificationSettingsFromStorage();
      const hasToken = Boolean(String(liveSettings.pushbullet_token || "").trim());
      if (testButton) testButton.disabled = !hasToken;
      if (currentButton) currentButton.disabled = !(hasToken && latest);
    }
  };
  const readSettings = () => ({
    provider: "pushbullet",
    enabled: Boolean(root.querySelector("[data-notify-enabled]")?.checked),
    pushbullet_token: root.querySelector("[data-notify-pushbullet-token]")?.value?.trim() || "",
    min_level: root.querySelector("[data-notify-min-level]")?.value || "watch",
    cooldown_minutes: parseInt(root.querySelector("[data-notify-cooldown]")?.value || `${cooldownMinutes}`, 10) || cooldownMinutes,
  });

  saveButton?.addEventListener("click", async () => {
    try {
      setBusy(true, "Kaydediliyor");
      setStatus("Telefon bildirim ayarları yerel panele kaydediliyor.");
      const previousSettings = loadNotificationSettingsFromStorage();
      const savedSettings = saveNotificationSettingsToStorage(readSettings());
      if (
        String(previousSettings.pushbullet_token || "") !== String(savedSettings.pushbullet_token || "")
        || String(previousSettings.min_level || "watch") !== String(savedSettings.min_level || "watch")
        || Number(previousSettings.cooldown_minutes || 60) !== Number(savedSettings.cooldown_minutes || 60)
        || Boolean(previousSettings.enabled) !== Boolean(savedSettings.enabled)
      ) {
        saveNotificationStateToStorage({
          ...loadNotificationStateFromStorage(),
          last_sent_at: null,
          last_error: null,
        });
      }
      let nextPayload = notificationPayloadFromStorage();
      let savedRemotely = false;
      try {
        const response = await postJsonWithTimeout("/api/notifications/settings", savedSettings);
        nextPayload = mergeNotificationPayload(response.notifications);
        savedRemotely = true;
      } catch {
        try {
          const bridgeResponse = await postNotificationBridge("/api/notifications/settings", savedSettings);
          nextPayload = mergeNotificationPayload(bridgeResponse.notifications);
          savedRemotely = true;
        } catch {
        }
      }
      if (!savedRemotely) {
        throw new Error("Bildirim ayarları yerel panele kaydedilemedi.");
      }
      renderNotificationPanel(nextPayload, latest, access);
      setStatus("Telefon bildirim ayarları kaydedildi. Otomatik akış artık sayfa kapalıyken de yerel panel tarafından yürütülecek.");
    } catch (error) {
      setBusy(false);
      setStatus(error.message || "Bildirim ayarları kaydedilemedi.");
    }
  });

  testButton?.addEventListener("click", async () => {
    try {
      setBusy(true, "Gönderiliyor");
      setStatus("Telefon test bildirimi gönderiliyor.");
      const savedSettings = saveNotificationSettingsToStorage(readSettings());
      let nextPayload = notificationPayloadFromStorage();
      let statusMessage = "Test bildirimi gönderildi.";
      try {
        const response = await postJsonWithTimeout("/api/notifications/test", {});
        nextPayload = mergeNotificationPayload(response.notifications);
        statusMessage = response?.result?.message || statusMessage;
      } catch {
        try {
          const bridgeResponse = await postNotificationBridge("/api/notifications/test", {});
          nextPayload = mergeNotificationPayload(bridgeResponse.notifications);
          statusMessage = bridgeResponse?.result?.message || statusMessage;
        } catch {
          await sendNotificationDirect("test", savedSettings, latest, access);
          nextPayload = notificationPayloadFromStorage();
        }
      }
      renderNotificationPanel(nextPayload, latest, access);
      setStatus(statusMessage);
    } catch (error) {
      setBusy(false);
      setStatus(error.message || "Test bildirimi gönderilemedi.");
    }
  });

  currentButton?.addEventListener("click", async () => {
    try {
      setBusy(true, "Gönderiliyor");
      setStatus("Güncel durum telefona gönderiliyor.");
      const savedSettings = saveNotificationSettingsToStorage(readSettings());
      let nextPayload = notificationPayloadFromStorage();
      let statusMessage = "Güncel durum telefona gönderildi.";
      try {
        const response = await postJsonWithTimeout("/api/notifications/send-current", {});
        nextPayload = mergeNotificationPayload(response.notifications);
        statusMessage = response?.result?.message || statusMessage;
      } catch {
        try {
          const bridgeResponse = await postNotificationBridge("/api/notifications/send-current", {});
          nextPayload = mergeNotificationPayload(bridgeResponse.notifications);
          statusMessage = bridgeResponse?.result?.message || statusMessage;
        } catch {
          await sendNotificationDirect("manual", savedSettings, latest, access);
          nextPayload = notificationPayloadFromStorage();
        }
      }
      renderNotificationPanel(nextPayload, latest, access);
      setStatus(statusMessage);
    } catch (error) {
      setBusy(false);
      setStatus(error.message || "Güncel durum bildirimi gönderilemedi.");
    }
  });

  repairDocumentEncoding(elements.notificationPanelContent);
}

function renderSatellitePanel(context) {
  if (!elements.satellitePanelContent || !elements.satelliteUpdated) {
    return;
  }

  if (!context?.latest) {
    elements.satelliteUpdated.textContent = "Veri bekleniyor";
    elements.satellitePanelContent.innerHTML = `
      <article class="impact-card impact-empty">
        <p>Uydu etki paneli canlÄ± Kp ve X-ray verileri geldikÃ§e burada oluÅŸturulacak.</p>
      </article>
    `;
    return;
  }

  const { latest, noaa, charts, solar } = context;
  const assessment = buildSatelliteAssessmentContext(latest, noaa, charts, solar);
  const contributionEntries = Object.entries(assessment.contributionPoints);

  const topCards = [
    {
      label: "AnlÄ±k Kp",
      value: formatNumber(assessment.effectiveKp, 2),
      note: satellitePanelState.manualOverride ? "Manuel override aktif" : "Skorda kullanÄ±lan anlÄ±k Kp",
      className: "satellite-metric-accent",
    },
    {
      label: "Kp +3s",
      value: formatNumber(assessment.kpForecast3h, 2),
      note: "3 saatlik ufuk tahmini",
      className: "satellite-metric-accent",
    },
    {
      label: "GOES X-ray",
      value: assessment.xrayClass,
      note: `KullanÄ±lan kategori ${assessment.effectiveXrayBand} | AkÄ± ${formatScientificMaybeNumber(assessment.xrayFluxLive, 2, " W/mÂ²")}`,
      className: satelliteRiskClassName(assessment.effectiveXrayBand === "Low" ? "Low" : assessment.effectiveXrayBand),
    },
    {
      label: "FÄ±rtÄ±na dÃ¼zeyi",
      value: assessment.stormLevel,
      note: "NOAA G seviyesi eslestirmesi",
      className: satelliteRiskClassName(assessment.stormLevel === "G0" ? "Low" : assessment.impactBand),
    },
    {
      label: "Etki skoru",
      value: `${assessment.impactScore}/100`,
      note: `Weather ${assessment.weatherDriverScore}/100 | Maruziyet ${assessment.exposureScore}/25`,
      className: satelliteRiskClassName(assessment.impactBand),
    },
    {
      label: "Trend",
      value: satelliteTrendDisplayLabel(assessment.trend),
      note: "Son Kp serisinin yÃ¶nÃ¼",
      className: "satellite-metric-trend",
    },
    {
      label: "Son gÃ¼ncelleme",
      value: formatDate(assessment.lastUpdate),
      note: `24 saatlik maksimum Kp: ${assessment.kpMax24h !== null ? formatNumber(assessment.kpMax24h, 2) : "-"} | Veri ${assessment.dataQuality}`,
      className: "satellite-metric-muted",
    },
  ].map((card) => `
    <article class="satellite-metric-card">
      <span>${card.label}</span>
      <strong class="${card.className}">${card.value}</strong>
      <p>${card.note}</p>
    </article>
  `).join("");

  const riskCards = [
    {
      title: "LEO sÃ¼rÃ¼klenme riski",
      value: satelliteRiskDisplayLabel(assessment.leoDragRisk),
      tone: assessment.leoDragRisk,
      note: `Uydu tipi, ${satellitePanelState.altitudeKm} km irtifa ve Kp birlikte yorumlandÄ±.`,
    },
    {
      title: "Elektronik / radyasyon riski",
      value: satelliteRiskDisplayLabel(assessment.electronicsRisk),
      tone: assessment.electronicsRisk,
      note: "Kp ve X-ray seviyesi ile yÃ¶rÃ¼nge hassasiyeti birlikte deÄŸerlendirildi.",
    },
    {
      title: "HaberleÅŸme riski",
      value: satelliteRiskDisplayLabel(assessment.communicationRisk),
      tone: assessment.communicationRisk,
      note: "HaberleÅŸme riski sadece jeomanyetik aktivite ve X-ray aktivitesiyle yorumlandÄ±.",
    },
    {
      title: "Ã–nerilen aksiyon",
      value: satelliteRiskDisplayLabel(assessment.combinedOperationalBand),
      tone: assessment.combinedOperationalBand,
      note: assessment.asriSelected
        ? `Ana skor ${assessment.impactBand}, ASRI ${assessment.asriSelected.score}/100 (${satelliteRiskDisplayLabel(assessment.asriSelected.band)}). ${assessment.recommendedActions[0]}`
        : assessment.recommendedActions[0],
    },
  ].map((card) => `
    <article class="satellite-risk-card">
      <span>${card.title}</span>
      <strong class="${satelliteRiskClassName(card.tone)}">${card.value}</strong>
      <p>${card.note}</p>
    </article>
  `).join("");

  const asriProfileCards = (assessment.asriProfiles || []).map((profile) => `
    <article class="satellite-asri-profile${profile.isSelected ? " is-selected" : ""}">
      <div class="satellite-asri-head">
        <div>
          <span>${escapeHtml(profile.name)}</span>
          <strong class="${satelliteRiskClassName(profile.band)}">${profile.score}/100</strong>
        </div>
        <span class="satellite-asri-badge ${satelliteRiskClassName(profile.band)}">${satelliteRiskDisplayLabel(profile.band)}</span>
      </div>
      <p class="satellite-asri-note">${escapeHtml(profile.note || "")}</p>
      <div class="satellite-asri-meta">
        <span>${profile.orbitType} Â· ${formatNumber(profile.altitudeKm, 0)} km</span>
        <span>${satelliteExposureBandLabel(profile.exposureBand)} Â· ${formatNumber(profile.representativeLat, 1)}Â°</span>
        <span>Zirhlama ${profile.shieldingLevel}/10</span>
      </div>
      <p class="satellite-asri-driver">Baskin surucu: ${escapeHtml(profile.driverText)}. ${escapeHtml(profile.statusText)}</p>
    </article>
  `).join("");

  const breakdownBars = contributionEntries.map(([label, value]) => `
    <div class="satellite-breakdown-row">
      <div class="satellite-breakdown-top">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
      <div class="satellite-breakdown-track">
        <div style="width:${Math.min(100, value)}%;"></div>
      </div>
    </div>
  `).join("");

  const controlOrbitButtons = ["LEO", "MEO", "GEO"].map((orbitType) => `
    <button type="button" class="satellite-chip${satellitePanelState.orbitType === orbitType ? " is-active" : ""}" data-satellite-orbit="${orbitType}">
      ${orbitType}
    </button>
  `).join("");
  const presetButtons = Object.entries(SATELLITE_PRESETS).map(([key, preset]) => `
    <button
      type="button"
      class="satellite-chip${satellitePanelState.orbitType === preset.orbitType && satellitePanelState.altitudeKm === preset.altitudeKm ? " is-active" : ""}"
      data-satellite-preset="${key}"
    >
      ${preset.label}
    </button>
  `).join("");


  elements.satelliteUpdated.textContent = assessment.lastUpdate
    ? `Son gÃ¼ncelleme ${formatDate(assessment.lastUpdate)}`
    : "GÃ¼ncelleme bekleniyor";

  elements.satellitePanelContent.innerHTML = `
    <div class="satellite-shell">
      <div class="satellite-controls">
        <div class="satellite-controls-group satellite-controls-group-presets">
          <span class="satellite-controls-label">HazÄ±r profil</span>
          <div class="satellite-chip-row">${presetButtons}</div>
        </div>
        <div class="satellite-controls-group">
          <span class="satellite-controls-label">Uydu tipi</span>
          <div class="satellite-chip-row">${controlOrbitButtons}</div>
        </div>
        <div class="satellite-controls-group satellite-controls-group-slider">
          <span class="satellite-controls-label">Irtifa</span>
          <input type="range" min="200" max="36000" step="50" value="${satellitePanelState.altitudeKm}" data-satellite-altitude>
          <div class="satellite-controls-meta">
            <strong id="satelliteAltitudeLabel">${satellitePanelState.altitudeKm} km</strong>
            <span>Ä°rtifa katkÄ±sÄ±: ${satelliteAltitudePoints(satellitePanelState.altitudeKm)}</span>
          </div>
        </div>
      </div>

      <div class="satellite-summary-shell">
        <div>
          <p class="satellite-panel-note">${assessment.summaryText}</p>
          <div class="satellite-source-list">
            ${assessment.sourceNotes.map((item) => `<span class="satellite-source-pill">${item}</span>`).join("")}
          </div>
        </div>
      </div>

      <div class="satellite-metric-grid">
        ${topCards}
      </div>

      <div class="satellite-risk-grid">
        ${riskCards}
      </div>

      <section class="satellite-asri-section">
        <div class="panel-head panel-head-inline">
          <h3>ASRI Muhendislik Motoru</h3>
          <span class="panel-note">${assessment.asriSelected ? `${assessment.asriSelected.score}/100 | ${satelliteRiskDisplayLabel(assessment.asriSelected.band)}` : "Hazirlaniyor"}</span>
        </div>
        <p class="satellite-panel-note">Bu katman canli solar wind, temsili enlem bandi ve zirhlama varsayimi kullanir. Anlik TLE/konum akisi olmadigi icin fiziksel bir yorge simulasyonu degil; hizli operasyonel karar destegi icin yardimci muhendislik yorumudur.</p>
        <div class="satellite-asri-grid">
          ${asriProfileCards}
        </div>
      </section>

      <div class="satellite-chart-grid">
        <section class="chart-card">
          <div class="panel-head panel-head-inline">
            <h3>Son Kp Serisi</h3>
            <span class="panel-note">Operasyon girdisi</span>
          </div>
          <svg id="satelliteKpChart" class="metric-chart" viewBox="0 0 380 230" preserveAspectRatio="none"></svg>
          <p id="satelliteKpMeta" class="chart-meta">Kp verisi hazÄ±rlanÄ±yor.</p>
        </section>

        <section class="chart-card">
          <div class="panel-head panel-head-inline">
            <h3>X-ray GeÃ§miÅŸi</h3>
            <span class="panel-note">GOES long band | log Ã¶lÃ§ek</span>
          </div>
          <svg id="satelliteXrayChart" class="metric-chart" viewBox="0 0 380 230" preserveAspectRatio="none"></svg>
          <p id="satelliteXrayMeta" class="chart-meta">X-ray serisi hazÄ±rlanÄ±yor.</p>
        </section>

        <section class="chart-card">
          <div class="panel-head panel-head-inline">
            <h3>Risk kÄ±rÄ±lÄ±mÄ±</h3>
            <span class="panel-note">Skor katkÄ±larÄ±nÄ±n daÄŸÄ±lÄ±mÄ±</span>
          </div>
          <div class="satellite-breakdown-list">
            ${breakdownBars}
          </div>
        </section>

        <section class="chart-card">
          <div class="panel-head panel-head-inline">
            <h3>Model disiplini</h3>
            <span class="panel-note">KullanÄ±lan ve ayÄ±klanan bilgiler</span>
          </div>
          <div class="satellite-discipline-grid">
            <div class="satellite-discipline-card">
              <span>KullanÄ±lan girdiler</span>
              <ul>${assessment.usedInputs.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
            <div class="satellite-discipline-card">
              <span>BaÄŸlamsal ama skorsuz</span>
              <ul>${assessment.contextOnly.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
            <div class="satellite-discipline-card">
              <span>Ã–zellikle dÄ±ÅŸlananlar</span>
              <ul>${assessment.excludedSignals.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
          </div>
        </section>
      </div>

    </div>
  `;

  const kpChartElement = elements.satellitePanelContent.querySelector("#satelliteKpChart");
  const kpMetaElement = elements.satellitePanelContent.querySelector("#satelliteKpMeta");
  const xrayChartElement = elements.satellitePanelContent.querySelector("#satelliteXrayChart");
  const xrayMetaElement = elements.satellitePanelContent.querySelector("#satelliteXrayMeta");
  const kpWindow = getChartWindow(charts);
  renderMetricChart(kpChartElement, kpMetaElement, assessment.kpChart, kpWindow, {
    color: "#72d4ff",
    accent: "#f8fbff",
    digits: 2,
    tickDigits: 1,
    min: 0,
    max: 9,
    xLabel: "Zaman (TSI)",
    yLabel: "Kp",
    strokeWidth: 1.8,
    pointRadius: 3.3,
  });
  kpMetaElement.textContent = `Skorda kullanÄ±lan Kp ${formatNumber(assessment.effectiveKp, 2)} | Storm ${assessment.stormLevel} | Trend ${assessment.trend}`;

  const xraySeries = chartSeries(assessment.xrayChart);
  const xrayStart = xraySeries[0]?.date || new Date(Date.now() - (24 * 60 * 60 * 1000));
  let xrayEnd = xraySeries[xraySeries.length - 1]?.date || new Date();
  if (xrayEnd.getTime() <= xrayStart.getTime()) {
    xrayEnd = new Date(xrayStart.getTime() + (60 * 60 * 1000));
  }
  const xrayWindow = {
    start: xrayStart,
    end: xrayEnd,
    days: Math.max(1, Math.round((xrayEnd.getTime() - xrayStart.getTime()) / (24 * 60 * 60 * 1000))),
  };
  renderMetricChart(xrayChartElement, xrayMetaElement, assessment.xrayChart, xrayWindow, {
    color: "#f4b942",
    accent: "#fff4d6",
    digits: 2,
    tickDigits: 2,
    xLabel: "Zaman (TSI)",
    yLabel: "log10 Flux",
    strokeWidth: 1.8,
    pointRadius: 3.1,
  });
  xrayMetaElement.textContent = assessment.xrayHistorySynthetic
    ? `GOES sÄ±nÄ±fÄ± ${assessment.xrayClass} | AkÄ± ${formatScientificMaybeNumber(assessment.xrayFluxLive, 2, " W/mÂ²")} | KÄ±sa sÃ¼reli dolgu seri aktif | Veri ${assessment.dataQuality}`
    : assessment.xrayHistoryReady
      ? `GOES sÄ±nÄ±fÄ± ${assessment.xrayClass} | KullanÄ±lan kategori ${assessment.effectiveXrayBand} | AkÄ± ${formatScientificMaybeNumber(assessment.xrayFluxLive, 2, " W/mÂ²")} | Veri ${assessment.dataQuality}`
      : `AnlÄ±k GOES sÄ±nÄ±fÄ± ${assessment.xrayClass} | GeÃ§miÅŸ seri sÄ±nÄ±rlÄ± | AkÄ± ${formatScientificMaybeNumber(assessment.xrayFluxLive, 2, " W/mÂ²")} | Veri ${assessment.dataQuality}`;

  elements.satellitePanelContent.querySelectorAll("[data-satellite-orbit]").forEach((button) => {
    button.addEventListener("click", () => {
      satellitePanelState.orbitType = button.dataset.satelliteOrbit || "LEO";
      satellitePanelState.exposureBand = satelliteDefaultExposureBand(satellitePanelState.orbitType, satellitePanelState.altitudeKm);
      satellitePanelState.shieldingLevel = satelliteDefaultShieldingLevel(satellitePanelState.orbitType, satellitePanelState.altitudeKm);
      renderSatellitePanel(context);
    });
  });

  elements.satellitePanelContent.querySelectorAll("[data-satellite-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = SATELLITE_PRESETS[button.dataset.satellitePreset];
      if (!preset) return;
      satellitePanelState.orbitType = preset.orbitType;
      satellitePanelState.altitudeKm = preset.altitudeKm;
      satellitePanelState.exposureBand = preset.exposureBand || satelliteDefaultExposureBand(preset.orbitType, preset.altitudeKm);
      satellitePanelState.shieldingLevel = preset.shieldingLevel || satelliteDefaultShieldingLevel(preset.orbitType, preset.altitudeKm);
      renderSatellitePanel(context);
    });
  });

  const altitudeInput = elements.satellitePanelContent.querySelector("[data-satellite-altitude]");
  if (altitudeInput) {
    altitudeInput.addEventListener("input", () => {
      satellitePanelState.altitudeKm = Number(altitudeInput.value) || 550;
      satellitePanelState.exposureBand = satelliteDefaultExposureBand(satellitePanelState.orbitType, satellitePanelState.altitudeKm);
      satellitePanelState.shieldingLevel = satelliteDefaultShieldingLevel(satellitePanelState.orbitType, satellitePanelState.altitudeKm);
      renderSatellitePanel(context);
    });
  }

  elements.satellitePanelContent.querySelector(".satellite-breakdown-list")?.closest(".chart-card")?.remove();
  repairDocumentEncoding(elements.satellitePanelContent);
  repairElementText(elements.satellitePanelContent, SATELLITE_UI_TEXT_REPLACEMENTS);
  repairElementText(elements.satelliteUpdated, SATELLITE_UI_TEXT_REPLACEMENTS);
}

function renderCmeWindow(insights) {
  if (!elements.cmeWindowBadge || !elements.cmeWindowSummary || !elements.cmeWindowRange || !elements.cmeWindowDrivers || !elements.cmeWindowInference) {
    return;
  }

  const cmeWindow = insights?.cme_window;
  if (!cmeWindow) {
    elements.cmeWindowBadge.textContent = "Bekleniyor";
    elements.cmeWindowBadge.className = "badge badge-neutral";
    elements.cmeWindowSummary.textContent = "YakÄ±n-DÃ¼nya verileri geldikÃ§e tahmini etki penceresi burada gÃ¼ncellenecek.";
    elements.cmeWindowRange.textContent = "HenÃ¼z pencere hesaplanmadÄ±.";
    elements.cmeWindowDrivers.innerHTML = "";
    elements.cmeWindowInference.textContent = "Bu alan, NOAA akÄ±ÅŸlarÄ±ndan tÃ¼retilmiÅŸ operasyonel Ã§Ä±karÄ±mÄ± gÃ¶sterir.";
    return;
  }

  elements.cmeWindowBadge.textContent = formatCmeStatus(cmeWindow.status);
  elements.cmeWindowBadge.className = `badge ${cmeStatusBadgeClass[cmeWindow.status] || "badge-neutral"}`;
  elements.cmeWindowSummary.textContent = cmeWindow.summary || "Tahmini pencere Ã¶zeti yok.";
  if (cmeWindow.window_start && cmeWindow.window_end) {
    elements.cmeWindowRange.textContent = `Tahmini pencere (TSÄ°): ${formatDate(cmeWindow.window_start)} - ${formatDate(cmeWindow.window_end)} | GÃ¼ven ${formatNumber(cmeWindow.confidence_percent, 0)}%`;
  } else {
    elements.cmeWindowRange.textContent = `Åu an belirgin bir zaman penceresi gÃ¶rÃ¼nmÃ¼yor | GÃ¼ven ${formatNumber(cmeWindow.confidence_percent, 0)}%`;
  }
  const drivers = cmeWindow.drivers || [];
  elements.cmeWindowDrivers.innerHTML = drivers.map((driver) => `<span class="insight-chip">${escapeHtml(driver)}</span>`).join("");
  elements.cmeWindowInference.textContent = cmeWindow.inference || "Bu alan, NOAA akÄ±ÅŸlarÄ±ndan tÃ¼retilmiÅŸ operasyonel Ã§Ä±karÄ±mÄ± gÃ¶sterir.";
}

function renderSimilarEvents(insights) {
  if (!elements.similarEventsList) {
    return;
  }

  const events = insights?.similar_events || [];
  if (!events.length) {
    elements.similarEventsList.innerHTML = `
      <article class="similar-event similar-empty">
        <p>Yeterli kayÄ±t biriktikÃ§e burada bugÃ¼nkÃ¼ tabloya benzeyen Ã¶nceki durumlar gÃ¶sterilecek.</p>
      </article>
    `;
    return;
  }

  elements.similarEventsList.innerHTML = events.map((event) => `
    <article class="similar-event">
      <div class="similar-top">
        <div>
          <strong>${formatDate(event.generated_at)}</strong>
          <p>${formatHourDelta(event.delta_hours)}</p>
        </div>
        <div class="similar-side">
          <span class="badge ${levelClass[event.level] || "badge-neutral"}">${formatLevel(event.level)}</span>
          <strong class="similar-score">%${formatNumber(event.similarity_percent, 0)}</strong>
        </div>
      </div>
      <p class="similar-summary">Risk %${formatNumber(event.risk_percent, 0)} | Kp ${formatNumber(event.kp, 2)} | Kp Tahmini ${formatNumber(event.kp_estimated, 2)} | B<sub>z</sub> ${formatNumber(event.bz_nt, 2)} nT</p>
    </article>
  `).join("");
}

function renderHistory(history) {
  elements.historyLegend.innerHTML = "";
  if (!history.length) {
    elements.historyChart.innerHTML = "";
    elements.historyLegend.innerHTML = '<div class="history-chip">GeÃ§miÅŸ veri bulunmuyor.</div>';
    return;
  }

  const width = 860;
  const height = 220;
  const padding = { top: 18, right: 20, bottom: 42, left: 56 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const riskValues = history.map((item) => Number(item.risk_percent ?? item.score ?? 0));
  const maxScore = 100;
  const stepX = history.length === 1 ? 0 : innerWidth / (history.length - 1);
  const mapX = (index) => padding.left + (stepX * index);
  const mapY = (risk) => height - padding.bottom - ((risk / maxScore) * innerHeight);
  const yTicks = [0, 25, 50, 75, 100];
  const xTickIndexes = Array.from(new Set([0, Math.floor((history.length - 1) * 0.25), Math.floor((history.length - 1) * 0.5), Math.floor((history.length - 1) * 0.75), history.length - 1]))
    .filter((index) => index >= 0);
  const horizontalGuides = yTicks.map((tick) => {
    const y = mapY(tick);
    return `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(31,26,23,0.08)" stroke-width="1" />
      <text x="${padding.left - 10}" y="${y + 4}" fill="rgba(31,26,23,0.6)" font-size="11" text-anchor="end">${tick}</text>
    `;
  }).join("");
  const verticalGuides = xTickIndexes.map((index) => {
    const x = mapX(index);
    return `
      <line x1="${x}" y1="${padding.top}" x2="${x}" y2="${height - padding.bottom}" stroke="rgba(31,26,23,0.05)" stroke-width="1" />
      <text x="${x}" y="${height - 12}" fill="rgba(31,26,23,0.56)" font-size="11" text-anchor="middle">${formatAxisDate(history[index]?.generated_at)}</text>
    `;
  }).join("");

  const plotPoints = history.map((item, index) => ({
    x: mapX(index),
    y: mapY(Number(item.risk_percent ?? item.score ?? 0)),
    risk: Number(item.risk_percent ?? item.score ?? 0),
    level: item.level || "normal",
    kp: Number(item.kp ?? item.kp_estimated ?? NaN),
    time: item.generated_at,
  }));

  const last = history[history.length - 1];
  const fillPath = buildAreaPath(plotPoints, height - padding.bottom);
  const smoothPath = buildSmoothPath(plotPoints);
  elements.historyChart.innerHTML = `
    <defs>
      <linearGradient id="historyFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(189,79,38,0.18)" />
        <stop offset="100%" stop-color="rgba(189,79,38,0.015)" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" rx="18" fill="#ffffff" />
    ${horizontalGuides}
    ${verticalGuides}
    <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.14)" />
    <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.14)" />
    <path d="${fillPath}" fill="url(#historyFill)"></path>
    <path d="${smoothPath}" fill="none" stroke="#bd4f26" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="${smoothPath}" fill="none" stroke="rgba(255,255,255,0.66)" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"></path>
    <circle cx="${mapX(history.length - 1)}" cy="${mapY(Number(last.risk_percent ?? last.score ?? 0))}" r="3.8" fill="#ffffff" stroke="#155d66" stroke-width="1.6"></circle>
    <text x="${width / 2}" y="${height - 4}" fill="rgba(31,26,23,0.58)" font-size="12" text-anchor="middle">Zaman (TSÄ°)</text>
    <text x="18" y="${height / 2}" fill="rgba(31,26,23,0.58)" font-size="12" text-anchor="middle" transform="rotate(-90 18 ${height / 2})">Risk (%)</text>
    <g data-chart-hover-layer></g>
  `;

  bindSvgTooltip(elements.historyChart, plotPoints, {
    width,
    height,
    plotTop: padding.top,
    plotBottom: height - padding.bottom,
    color: "#bd4f26",
    formatter: (point) => ({
      title: formatDate(point.time),
      lines: [
        `Risk: %${formatNumber(point.risk, 0)}`,
        `Seviye: ${formatLevel(point.level)}`,
        `Kp: ${Number.isFinite(point.kp) ? formatNumber(point.kp, 2) : "-"}`,
      ],
    }),
  });

  elements.historyLegend.innerHTML = history.slice(-8).reverse().map((item) => `
    <div class="history-chip">${formatDate(item.generated_at)} | Risk ${formatNumber(item.risk_percent ?? item.score ?? 0, 0)}% | ${formatLevel(item.level)}</div>
  `).join("");
}

function renderMetricChart(svg, meta, chart, window, options) {
  const series = chartSeries(chart);
  if (!series.length) {
    svg.innerHTML = "";
    meta.textContent = `Pencere ${window.days} gÃ¼n | Uygun veri bulunamadÄ±`;
    return;
  }

  const width = 380;
  const height = 230;
  const padding = { top: 20, right: 18, bottom: 44, left: 56 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const values = series.map((item) => item.value);
  let minValue = Math.min(...values);
  let maxValue = Math.max(...values);

  if (options.includeZero) {
    minValue = Math.min(minValue, 0);
    maxValue = Math.max(maxValue, 0);
  }
  if (typeof options.min === "number") minValue = Math.min(minValue, options.min);
  if (typeof options.max === "number") maxValue = Math.max(maxValue, options.max);

  if (minValue === maxValue) {
    const bump = minValue === 0 ? 1 : Math.abs(minValue) * 0.15;
    minValue -= bump;
    maxValue += bump;
  }

  const windowRangeMs = Math.max(1, window.end.getTime() - window.start.getTime());
  const mapX = (date) => {
    const ratio = (date.getTime() - window.start.getTime()) / windowRangeMs;
    return padding.left + Math.max(0, Math.min(1, ratio)) * innerWidth;
  };
  const mapY = (value) => padding.top + ((maxValue - value) / (maxValue - minValue)) * innerHeight;
  const plotPoints = series.map((item) => ({
    x: mapX(item.date),
    y: mapY(item.value),
    value: item.value,
    time: item.time,
    date: item.date,
  }));
  const latest = series[series.length - 1];
  const coverage = Number(chart?.coverage_days || 0);
  const gradientId = `${svg.id || "chart"}Gradient`;
  const glowId = `${svg.id || "chart"}Glow`;
  const lineWidth = options.strokeWidth || 1.7;
  const pointRadius = options.pointRadius || 3.4;
  const first = series[0];
  const last = series[series.length - 1];
  const yTicks = generateLinearTicks(minValue, maxValue, 5);
  const xTicks = generateTimeTicks(window.start, window.end, 5);
  const tickDigits = options.tickDigits ?? options.digits ?? 1;
  const areaPath = buildAreaPath(plotPoints, height - padding.bottom);
  const smoothPath = buildSmoothPath(plotPoints);
  const horizontalGuides = yTicks.map((tickValue) => {
    const y = mapY(tickValue);
    return `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(15,23,42,0.08)" stroke-width="1" />
      <text x="${padding.left - 8}" y="${y + 4}" fill="rgba(31,26,23,0.58)" font-size="11" text-anchor="end">${formatNumber(tickValue, tickDigits)}</text>
    `;
  }).join("");
  const verticalGuides = xTicks.map((tickDate) => {
    const x = mapX(tickDate);
    return `
      <line x1="${x}" y1="${padding.top}" x2="${x}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.06)" stroke-width="1" />
      <text x="${x}" y="${height - 12}" fill="rgba(31,26,23,0.56)" font-size="11" text-anchor="middle">${formatAxisDate(tickDate)}</text>
    `;
  }).join("");

  let baseline = "";
  if (minValue < 0 && maxValue > 0) {
    const zeroY = mapY(0);
    baseline = `<line x1="${padding.left}" y1="${zeroY}" x2="${width - padding.right}" y2="${zeroY}" stroke="rgba(31,26,23,0.16)" stroke-width="1" stroke-dasharray="4 5" />`;
  }

  const polyline = series.length > 1
    ? `<path d="${smoothPath}" fill="none" stroke="${options.color}" stroke-width="${lineWidth}" stroke-linecap="round" stroke-linejoin="round" filter="url(#${glowId})"></path>
       <path d="${smoothPath}" fill="none" stroke="rgba(255,255,255,0.64)" stroke-width="0.58" stroke-linecap="round" stroke-linejoin="round"></path>`
    : "";

  svg.innerHTML = `
    <defs>
      <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${hexToRgba(options.color, 0.16)}"></stop>
        <stop offset="65%" stop-color="${hexToRgba(options.color, 0.05)}"></stop>
        <stop offset="100%" stop-color="${hexToRgba(options.color, 0.01)}"></stop>
      </linearGradient>
      <filter id="${glowId}" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="${hexToRgba(options.color, 0.14)}"></feDropShadow>
      </filter>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="#ffffff"></rect>
    ${horizontalGuides}
    ${verticalGuides}
    <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.14)" />
    <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.14)" />
    ${baseline}
    <path d="${areaPath}" fill="url(#${gradientId})"></path>
    ${polyline}
    <circle cx="${mapX(latest.date)}" cy="${mapY(latest.value)}" r="${pointRadius + 0.9}" fill="rgba(255,255,255,0.96)" stroke="${options.accent || options.color}" stroke-width="1.5"></circle>
    <circle cx="${mapX(latest.date)}" cy="${mapY(latest.value)}" r="${Math.max(1.2, pointRadius - 1.7)}" fill="${options.accent || options.color}"></circle>
    <text x="${width / 2}" y="${height - 4}" fill="rgba(31,26,23,0.58)" font-size="12" text-anchor="middle">${svgLabelMarkup(options.xLabelSvg, options.xLabel || "Zaman (TSÄ°)")}</text>
    <text x="18" y="${height / 2}" fill="rgba(31,26,23,0.58)" font-size="12" text-anchor="middle" transform="rotate(-90 18 ${height / 2})">${svgLabelMarkup(options.yLabelSvg, options.yLabel || options.unit || "DeÄŸer")}</text>
  `;

  meta.textContent = `Pencere ${window.days} gÃ¼n | Kapsama ${formatNumber(coverage, 1)} gÃ¼n | Son Ã¶lÃ§Ã¼m ${formatNumber(latest.value, options.digits ?? 2)}${options.unit || ""} | ${formatDate(latest.time)}`;
  bindSvgTooltip(svg, plotPoints, {
    width,
    height,
    plotTop: padding.top,
    plotBottom: height - padding.bottom,
    color: options.accent || options.color,
    formatter: (point) => ({
      title: formatDate(point.time),
      lines: [`${options.yLabel || "Deger"}: ${formatNumber(point.value, options.digits ?? 2)}${options.unit || ""}`],
    }),
  });
}

function renderKpComparisonChart(history, charts = null) {
  if (!elements.kpComparisonChart || !elements.kpComparisonMeta || !elements.kpComparisonLegend) {
    return;
  }

  const { actual, forecast, todayStart } = comparisonSeriesFromHistory(history, charts);
  if (!actual.length && !forecast.length) {
    elements.kpComparisonChart.innerHTML = "";
    elements.kpComparisonMeta.textContent = "LSTM ve gerÃ§ek Kp serisi biriktikÃ§e burada canlÄ± karÅŸÄ±laÅŸtÄ±rma grafiÄŸi oluÅŸacak.";
    elements.kpComparisonLegend.innerHTML = "";
    return;
  }

  const width = 860;
  const height = 280;
  const padding = { top: 18, right: 24, bottom: 44, left: 54 };
  const allPoints = [...actual, ...forecast].sort((left, right) => left.date - right.date);
  const start = todayStart instanceof Date ? todayStart : (allPoints[0]?.date || new Date());
  let end = allPoints[allPoints.length - 1]?.date || new Date();
  const now = new Date();
  if (now.getTime() > end.getTime()) {
    end = now;
  }
  if (end.getTime() <= start.getTime()) {
    end = new Date(start.getTime() + (3 * 60 * 60 * 1000));
  }
  const rangeMs = Math.max(1, end.getTime() - start.getTime());
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const minValue = 0;
  const maxValue = 9;
  const mapX = (date) => padding.left + (((date.getTime() - start.getTime()) / rangeMs) * innerWidth);
  const mapY = (value) => padding.top + (((maxValue - value) / (maxValue - minValue)) * innerHeight);
  const yTicks = [0, 2, 4, 6, 8, 9];
  const xTicks = generateTimeTicks(start, end, 6);
  const actualPoints = actual.map((item) => ({ x: mapX(item.date), y: mapY(item.value), ...item }));
  const forecastPoints = forecast.map((item) => ({ x: mapX(item.date), y: mapY(item.value), ...item }));
  const actualPath = buildSmoothPath(actualPoints);
  const forecastPath = buildSmoothPath(forecastPoints);
  const latestActual = actual[actual.length - 1] || null;
  const latestForecast = forecast[forecast.length - 1] || null;
  const latestForecastConfidence = Number.isFinite(latestForecast?.confidence) ? latestForecast.confidence : null;
  const lastActualX = latestActual ? mapX(latestActual.date) : null;
  const forecastBand = lastActualX !== null && lastActualX < (width - padding.right)
    ? `<rect x="${lastActualX}" y="${padding.top}" width="${width - padding.right - lastActualX}" height="${innerHeight}" fill="rgba(210,154,44,0.06)" />`
    : "";
  const horizontalGuides = yTicks.map((tick) => {
    const y = mapY(tick);
    return `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(31,26,23,0.055)" stroke-width="0.8" />
      <text x="${padding.left - 10}" y="${y + 4}" fill="rgba(31,26,23,0.54)" font-size="10.5" text-anchor="end">${tick}</text>
    `;
  }).join("");
  const verticalGuides = xTicks.map((tickDate) => {
    const x = mapX(tickDate);
    return `
      <line x1="${x}" y1="${padding.top}" x2="${x}" y2="${height - padding.bottom}" stroke="rgba(31,26,23,0.045)" stroke-width="0.8" />
      <text x="${x}" y="${height - 12}" fill="rgba(31,26,23,0.54)" font-size="10.5" text-anchor="middle">${formatAxisDate(tickDate)}</text>
    `;
  }).join("");
  const actualDots = actualPoints.map((point) => `
    <circle cx="${point.x}" cy="${point.y}" r="1.85" fill="#0f5f69"></circle>
  `).join("");
  const forecastDots = forecastPoints.map((point) => `
    <circle cx="${point.x}" cy="${point.y}" r="1.65" fill="#203142"></circle>
  `).join("");
  const latestActualMarker = latestActual ? `
    <circle cx="${mapX(latestActual.date)}" cy="${mapY(latestActual.value)}" r="3.1" fill="rgba(255,250,242,0.96)" stroke="#0f5f69" stroke-width="1.2"></circle>
  ` : "";
  const latestForecastMarker = latestForecast ? `
    <circle cx="${mapX(latestForecast.date)}" cy="${mapY(latestForecast.value)}" r="3.1" fill="rgba(255,250,242,0.96)" stroke="#203142" stroke-width="1.2"></circle>
  ` : "";
  const latestActualLabel = latestActual
    ? `GerÃ§ek ${formatNumber(latestActual.value, 2)} | ${formatDate(latestActual.time)}`
    : "GerÃ§ek seri bekleniyor";
  const latestForecastLabel = latestForecast
    ? `LSTM ${formatNumber(latestForecast.value, 2)} | ${formatDate(latestForecast.time)}${latestForecastConfidence === null ? "" : ` | gÃ¼ven %${formatNumber(latestForecastConfidence, 0)}`}`
    : "LSTM seri bekleniyor";

  elements.kpComparisonChart.innerHTML = `
    <defs>
      <filter id="kpComparisonGlowActual" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" flood-color="rgba(15,95,105,0.16)"></feDropShadow>
      </filter>
      <filter id="kpComparisonGlowLstm" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" flood-color="rgba(32,49,66,0.14)"></feDropShadow>
      </filter>
      <linearGradient id="kpComparisonActualFade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="rgba(15,95,105,0.18)"></stop>
        <stop offset="100%" stop-color="rgba(15,95,105,0.03)"></stop>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="#ffffff"></rect>
    ${forecastBand}
    ${horizontalGuides}
    ${verticalGuides}
    <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.14)" stroke-width="0.9" />
    <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.14)" stroke-width="0.9" />
    ${actualPath ? `<path d="${actualPath}" fill="none" stroke="url(#kpComparisonActualFade)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.18"></path>` : ""}
    ${actualPath ? `<path d="${actualPath}" fill="none" stroke="#0f5f69" stroke-width="1.16" stroke-linecap="round" stroke-linejoin="round" filter="url(#kpComparisonGlowActual)"></path>` : ""}
    ${forecastPath ? `<path d="${forecastPath}" fill="none" stroke="#203142" stroke-width="1.02" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 5" filter="url(#kpComparisonGlowLstm)"></path>` : ""}
    ${actualDots}
    ${forecastDots}
    ${latestActualMarker}
    ${latestForecastMarker}
    <text x="${width / 2}" y="${height - 4}" fill="rgba(31,26,23,0.58)" font-size="12" text-anchor="middle">Zaman (TSÄ°)</text>
    <text x="18" y="${height / 2}" fill="rgba(31,26,23,0.58)" font-size="12" text-anchor="middle" transform="rotate(-90 18 ${height / 2})">Kp Endeksi</text>
  `;

  elements.kpComparisonMeta.textContent = `Bugün 00:00'dan beri gerçek ${actual.length} nokta | LSTM ${forecast.length} nokta | Son gerçek ${formatNumber(latestActual?.value, 2)} | Son LSTM ${formatNumber(latestForecast?.value, 2)}`;
  elements.kpComparisonLegend.innerHTML = `
    <span class="comparison-chip comparison-chip-actual">${latestActualLabel}</span>
    <span class="comparison-chip comparison-chip-lstm">${latestForecastLabel}</span>
    <span class="comparison-chip comparison-chip-window">GÃ¶lgeli alan, son gerÃ§ek Kp sonrasÄ± LSTM hedef zaman penceresini gÃ¶sterir.</span>
  `;
  bindSvgTooltip(elements.kpComparisonChart, [
    ...actualPoints.map((point) => ({ ...point, seriesLabel: "Gercek Kp" })),
    ...forecastPoints.map((point) => ({ ...point, seriesLabel: "LSTM Kp" })),
  ], {
    width,
    height,
    plotTop: padding.top,
    plotBottom: height - padding.bottom,
    color: "#0f5f69",
    formatter: (point) => {
      const lines = [
        `Seri: ${point.seriesLabel}`,
        `Deger: ${formatNumber(point.value, 2)}`,
      ];
      if (Number.isFinite(point.confidence)) {
        lines.push(`Guven: %${formatNumber(point.confidence, 0)}`);
      }
      return {
        title: formatDate(point.time),
        lines,
      };
    },
  });
}

function formatLstmMeta(forecast) {
  if (!forecast || forecast.predicted_kp === null || forecast.predicted_kp === undefined) {
    return "Yeterli ge\u00e7mi\u015f veri birikti\u011finde model 3 saat sonras\u0131 i\u00e7in \u00f6ng\u00f6r\u00fc \u00fcretir.";
  }

  const targetTime = forecast.target_time ? formatDate(forecast.target_time) : "-";
  const confidence = forecast.confidence_percent === null || forecast.confidence_percent === undefined
    ? "-"
    : `%${formatNumber(forecast.confidence_percent, 0)}`;
  const liveSamples = Number(forecast.live_training_samples);
  const archiveSamples = Number(forecast.archive_training_samples);
  const trainingMix = Number.isFinite(liveSamples) || Number.isFinite(archiveSamples)
    ? ` | Canl\u0131 ${formatNumber(Number.isFinite(liveSamples) ? liveSamples : 0, 0)} + Ar\u015fiv ${formatNumber(Number.isFinite(archiveSamples) ? archiveSamples : 0, 0)} \u00f6rnek`
    : "";
  return `Hedef: ${targetTime} | G\u00fcven ${confidence}${trainingMix}`;
}

function comparisonSeriesFromHistory(history, charts = null) {
  const actual = [];
  const forecast = [];
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartMs = todayStart.getTime();
  const archiveActualPoints = Array.isArray(charts?.kp_daily_archive_actual?.points)
    ? charts.kp_daily_archive_actual.points
    : [];
  const isTodayOrLater = (date) => date instanceof Date && !Number.isNaN(date.getTime()) && date.getTime() >= todayStartMs;

  (history || []).forEach((item) => {
    const actualDate = parseUtcDate(item.generated_at);
    const actualValue = Number(item.kp);
    if (isTodayOrLater(actualDate) && Number.isFinite(actualValue)) {
      actual.push({
        date: actualDate,
        time: item.generated_at,
        value: actualValue,
      });
    }

    const forecastDate = parseUtcDate(item.kp_lstm_target_time || item.generated_at);
    const forecastValue = Number(item.kp_lstm_predicted_kp);
    const confidence = Number(item.kp_lstm_confidence_percent);
    if (isTodayOrLater(forecastDate) && Number.isFinite(forecastValue)) {
      forecast.push({
        date: forecastDate,
        time: item.kp_lstm_target_time || item.generated_at,
        value: forecastValue,
        confidence,
        trainingSamples: Number(item.kp_lstm_training_samples),
        liveSamples: Number(item.kp_lstm_live_training_samples),
        archiveSamples: Number(item.kp_lstm_archive_training_samples),
        trainRmse: Number(item.kp_lstm_train_rmse),
      });
    }
  });

  if (!actual.length) {
    archiveActualPoints.forEach((point) => {
      const actualDate = parseUtcDate(point?.time);
      const actualValue = Number(point?.value);
      if (isTodayOrLater(actualDate) && Number.isFinite(actualValue)) {
        actual.push({
          date: actualDate,
          time: point.time,
          value: actualValue,
        });
      }
    });
  }

  const normalizeSeries = (items) => {
    const byTimestamp = new Map();
    items.forEach((item) => {
      if (!(item?.date instanceof Date) || !Number.isFinite(item?.value)) {
        return;
      }
      const key = item.date.getTime();
      byTimestamp.set(key, item);
    });
    return [...byTimestamp.values()].sort((left, right) => left.date - right.date);
  };

  return {
    actual: normalizeSeries(actual),
    forecast: normalizeSeries(forecast),
    todayStart,
  };
}

function renderKpComparisonChart(history, charts = null) {
  if (!elements.kpComparisonChart || !elements.kpComparisonMeta || !elements.kpComparisonLegend) {
    return;
  }

  const { actual, forecast, todayStart } = comparisonSeriesFromHistory(history, charts);
  if (!actual.length && !forecast.length) {
    elements.kpComparisonChart.innerHTML = "";
    elements.kpComparisonMeta.textContent = "LSTM ve ger\u00e7ek Kp serisi biriktik\u00e7e burada canl\u0131 kar\u015f\u0131la\u015ft\u0131rma grafi\u011fi olu\u015facak.";
    elements.kpComparisonLegend.innerHTML = "";
    return;
  }

  const width = 860;
  const height = 280;
  const padding = { top: 18, right: 24, bottom: 44, left: 54 };
  const allPoints = [...actual, ...forecast].sort((left, right) => left.date - right.date);
  const start = todayStart instanceof Date ? todayStart : (allPoints[0]?.date || new Date());
  let end = allPoints[allPoints.length - 1]?.date || new Date();
  const now = new Date();
  if (now.getTime() > end.getTime()) {
    end = now;
  }
  if (end.getTime() <= start.getTime()) {
    end = new Date(start.getTime() + (3 * 60 * 60 * 1000));
  }
  const rangeMs = Math.max(1, end.getTime() - start.getTime());
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const minValue = 0;
  const maxValue = 9;
  const mapX = (date) => padding.left + (((date.getTime() - start.getTime()) / rangeMs) * innerWidth);
  const mapY = (value) => padding.top + (((maxValue - value) / (maxValue - minValue)) * innerHeight);
  const yTicks = [0, 2, 4, 6, 8, 9];
  const xTicks = generateTimeTicks(start, end, 6);
  const actualPoints = actual.map((item) => ({ x: mapX(item.date), y: mapY(item.value), ...item }));
  const forecastPoints = forecast.map((item) => ({ x: mapX(item.date), y: mapY(item.value), ...item }));
  const actualPath = buildLinearPath(actualPoints);
  const forecastPath = buildLinearPath(forecastPoints);
  const latestActual = actual[actual.length - 1] || null;
  const latestForecast = forecast[forecast.length - 1] || null;
  const latestForecastConfidence = Number.isFinite(latestForecast?.confidence) ? latestForecast.confidence : null;
  const horizontalGuides = yTicks.map((tick) => {
    const y = mapY(tick);
    return `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(31,26,23,0.055)" stroke-width="0.8" />
      <text x="${padding.left - 10}" y="${y + 4}" fill="rgba(31,26,23,0.54)" font-size="10.5" text-anchor="end">${tick}</text>
    `;
  }).join("");
  const verticalGuides = xTicks.map((tickDate) => {
    const x = mapX(tickDate);
    return `
      <line x1="${x}" y1="${padding.top}" x2="${x}" y2="${height - padding.bottom}" stroke="rgba(31,26,23,0.045)" stroke-width="0.8" />
      <text x="${x}" y="${height - 12}" fill="rgba(31,26,23,0.54)" font-size="10.5" text-anchor="middle">${formatAxisDate(tickDate)}</text>
    `;
  }).join("");
  const latestActualLabel = latestActual
    ? `Ger\u00e7ek ${formatNumber(latestActual.value, 2)} | ${formatDate(latestActual.time)}`
    : "Ger\u00e7ek seri bekleniyor";
  const latestForecastLabel = latestForecast
    ? `LSTM ${formatNumber(latestForecast.value, 2)} | ${formatDate(latestForecast.time)}${latestForecastConfidence === null ? "" : ` | g\u00fcven %${formatNumber(latestForecastConfidence, 0)}`}`
    : "LSTM seri bekleniyor";
  const latestActualMarker = latestActual ? `
    <circle cx="${mapX(latestActual.date)}" cy="${mapY(latestActual.value)}" r="3.6" fill="#ffffff" stroke="#0f5f69" stroke-width="1.6"></circle>
    <circle cx="${mapX(latestActual.date)}" cy="${mapY(latestActual.value)}" r="1.8" fill="#0f5f69"></circle>
  ` : "";
  const latestForecastMarker = latestForecast ? `
    <circle cx="${mapX(latestForecast.date)}" cy="${mapY(latestForecast.value)}" r="3.6" fill="#ffffff" stroke="#c9851a" stroke-width="1.6"></circle>
    <circle cx="${mapX(latestForecast.date)}" cy="${mapY(latestForecast.value)}" r="1.8" fill="#c9851a"></circle>
  ` : "";

  elements.kpComparisonChart.innerHTML = `
    <defs>
      <filter id="kpComparisonGlowActual" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="rgba(15,95,105,0.14)"></feDropShadow>
      </filter>
      <filter id="kpComparisonGlowLstm" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="rgba(201,133,26,0.14)"></feDropShadow>
      </filter>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="#ffffff"></rect>
    ${horizontalGuides}
    ${verticalGuides}
    <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.14)" stroke-width="0.9" />
    <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.14)" stroke-width="0.9" />
    ${actualPath ? `<path d="${actualPath}" fill="none" stroke="#0f5f69" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round" filter="url(#kpComparisonGlowActual)"></path>` : ""}
    ${forecastPath ? `<path d="${forecastPath}" fill="none" stroke="#c9851a" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round" filter="url(#kpComparisonGlowLstm)"></path>` : ""}
    ${latestActualMarker}
    ${latestForecastMarker}
    <text x="${width / 2}" y="${height - 4}" fill="rgba(31,26,23,0.58)" font-size="12" text-anchor="middle">Zaman (TS\u0130)</text>
    <text x="18" y="${height / 2}" fill="rgba(31,26,23,0.58)" font-size="12" text-anchor="middle" transform="rotate(-90 18 ${height / 2})">Kp Endeksi</text>
  `;

  elements.kpComparisonMeta.textContent = `Gerçek ${actual.length} nokta | LSTM ${forecast.length} nokta | Son gerçek ${formatNumber(latestActual?.value, 2)} | Son LSTM ${formatNumber(latestForecast?.value, 2)}`;
  elements.kpComparisonLegend.innerHTML = `
    <span class="comparison-chip comparison-chip-actual">${latestActualLabel}</span>
    <span class="comparison-chip comparison-chip-lstm">${latestForecastLabel}</span>
  `;

  bindSvgTooltip(elements.kpComparisonChart, [
    ...actualPoints.map((point) => ({ ...point, seriesLabel: "Ger\u00e7ek Kp" })),
    ...forecastPoints.map((point) => ({ ...point, seriesLabel: "LSTM Kp" })),
  ], {
    width,
    height,
    plotTop: padding.top,
    plotBottom: height - padding.bottom,
    color: "#0f5f69",
    formatter: (point) => {
      const lines = [
        `Seri: ${point.seriesLabel}`,
        `De\u011fer: ${formatNumber(point.value, 2)}`,
      ];
      if (Number.isFinite(point.confidence)) {
        lines.push(`G\u00fcven: %${formatNumber(point.confidence, 0)}`);
      }
      if (Number.isFinite(point.archiveSamples) || Number.isFinite(point.liveSamples)) {
        lines.push(`E\u011fitim: Canl\u0131 ${formatNumber(Number.isFinite(point.liveSamples) ? point.liveSamples : 0, 0)} + Ar\u015fiv ${formatNumber(Number.isFinite(point.archiveSamples) ? point.archiveSamples : 0, 0)}`);
      }
      if (Number.isFinite(point.trainRmse)) {
        lines.push(`Train RMSE: ${formatNumber(point.trainRmse, 3)}`);
      }
      return {
        title: formatDate(point.time),
        lines,
      };
    },
  });
}

function renderKpComparisonChart(history, charts = null) {
  if (!elements.kpComparisonChart || !elements.kpComparisonMeta || !elements.kpComparisonLegend) {
    return;
  }

  const { actual, forecast, todayStart } = comparisonSeriesFromHistory(history, charts);
  if (!actual.length && !forecast.length) {
    elements.kpComparisonChart.innerHTML = "";
    elements.kpComparisonMeta.textContent = "LSTM ve gerçek Kp serisi biriktikçe burada canlı karşılaştırma grafiği oluşacak.";
    elements.kpComparisonLegend.innerHTML = "";
    return;
  }

  const width = 860;
  const height = 280;
  const padding = { top: 18, right: 24, bottom: 44, left: 54 };
  const allPoints = [...actual, ...forecast].sort((left, right) => left.date - right.date);
  const start = todayStart instanceof Date ? todayStart : (allPoints[0]?.date || new Date());
  let end = allPoints[allPoints.length - 1]?.date || new Date();
  const now = new Date();
  if (now.getTime() > end.getTime()) {
    end = now;
  }
  if (end.getTime() <= start.getTime()) {
    end = new Date(start.getTime() + (3 * 60 * 60 * 1000));
  }

  const rangeMs = Math.max(1, end.getTime() - start.getTime());
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const minValue = 0;
  const maxValue = 9;
  const mapX = (date) => padding.left + (((date.getTime() - start.getTime()) / rangeMs) * innerWidth);
  const mapY = (value) => padding.top + (((maxValue - value) / (maxValue - minValue)) * innerHeight);
  const yTicks = [0, 2, 4, 6, 8, 9];
  const xTicks = generateTimeTicks(start, end, 6);
  const actualPoints = actual.map((item) => ({ x: mapX(item.date), y: mapY(item.value), ...item }));
  const forecastPoints = forecast.map((item) => ({ x: mapX(item.date), y: mapY(item.value), ...item }));
  const actualPath = buildLinearPath(actualPoints);
  const forecastPath = buildLinearPath(forecastPoints);
  const latestActual = actual[actual.length - 1] || null;
  const latestForecast = forecast[forecast.length - 1] || null;
  const latestForecastConfidence = Number.isFinite(latestForecast?.confidence) ? latestForecast.confidence : null;
  const horizontalGuides = yTicks.map((tick) => {
    const y = mapY(tick);
    return `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(31,26,23,0.055)" stroke-width="0.8" />
      <text x="${padding.left - 10}" y="${y + 4}" fill="rgba(31,26,23,0.54)" font-size="10.5" text-anchor="end">${tick}</text>
    `;
  }).join("");
  const verticalGuides = xTicks.map((tickDate) => {
    const x = mapX(tickDate);
    return `
      <line x1="${x}" y1="${padding.top}" x2="${x}" y2="${height - padding.bottom}" stroke="rgba(31,26,23,0.045)" stroke-width="0.8" />
      <text x="${x}" y="${height - 12}" fill="rgba(31,26,23,0.54)" font-size="10.5" text-anchor="middle">${formatAxisDate(tickDate)}</text>
    `;
  }).join("");
  const latestActualLabel = latestActual
    ? `Gerçek ${formatNumber(latestActual.value, 2)} | ${formatDate(latestActual.time)}`
    : "Gerçek seri bekleniyor";
  const latestForecastLabel = latestForecast
    ? `LSTM ${formatNumber(latestForecast.value, 2)} | ${formatDate(latestForecast.time)}${latestForecastConfidence === null ? "" : ` | güven %${formatNumber(latestForecastConfidence, 0)}`}`
    : "LSTM seri bekleniyor";
  const latestActualMarker = latestActual ? `
    <circle cx="${mapX(latestActual.date)}" cy="${mapY(latestActual.value)}" r="3.6" fill="#ffffff" stroke="#0f5f69" stroke-width="1.6"></circle>
    <circle cx="${mapX(latestActual.date)}" cy="${mapY(latestActual.value)}" r="1.8" fill="#0f5f69"></circle>
  ` : "";
  const latestForecastMarker = latestForecast ? `
    <circle cx="${mapX(latestForecast.date)}" cy="${mapY(latestForecast.value)}" r="3.6" fill="#ffffff" stroke="#c9851a" stroke-width="1.6"></circle>
    <circle cx="${mapX(latestForecast.date)}" cy="${mapY(latestForecast.value)}" r="1.8" fill="#c9851a"></circle>
  ` : "";

  elements.kpComparisonChart.innerHTML = `
    <defs>
      <filter id="kpComparisonGlowActual" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="rgba(15,95,105,0.14)"></feDropShadow>
      </filter>
      <filter id="kpComparisonGlowLstm" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="rgba(201,133,26,0.14)"></feDropShadow>
      </filter>
    </defs>
    <rect x="0" y="0" width="${width}" height="${height}" rx="16" fill="#ffffff"></rect>
    ${horizontalGuides}
    ${verticalGuides}
    <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.14)" stroke-width="0.9" />
    <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="rgba(15,23,42,0.14)" stroke-width="0.9" />
    ${actualPath ? `<path d="${actualPath}" fill="none" stroke="#0f5f69" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round" filter="url(#kpComparisonGlowActual)"></path>` : ""}
    ${forecastPath ? `<path d="${forecastPath}" fill="none" stroke="#c9851a" stroke-width="2.15" stroke-linecap="round" stroke-linejoin="round" filter="url(#kpComparisonGlowLstm)"></path>` : ""}
    ${latestActualMarker}
    ${latestForecastMarker}
    <text x="${width / 2}" y="${height - 4}" fill="rgba(31,26,23,0.58)" font-size="12" text-anchor="middle">Zaman (TSİ)</text>
    <text x="18" y="${height / 2}" fill="rgba(31,26,23,0.58)" font-size="12" text-anchor="middle" transform="rotate(-90 18 ${height / 2})">Kp Endeksi</text>
  `;

  elements.kpComparisonMeta.textContent = `Bugün 00:00'dan beri gerçek ${actual.length} nokta | LSTM ${forecast.length} nokta | Son gerçek ${formatNumber(latestActual?.value, 2)} | Son LSTM ${formatNumber(latestForecast?.value, 2)}`;
  elements.kpComparisonLegend.innerHTML = `
    <span class="comparison-chip comparison-chip-actual">${latestActualLabel}</span>
    <span class="comparison-chip comparison-chip-lstm">${latestForecastLabel}</span>
  `;

  bindSvgTooltip(elements.kpComparisonChart, [
    ...actualPoints.map((point) => ({ ...point, seriesLabel: "Gerçek Kp" })),
    ...forecastPoints.map((point) => ({ ...point, seriesLabel: "LSTM Kp" })),
  ], {
    width,
    height,
    plotTop: padding.top,
    plotBottom: height - padding.bottom,
    color: "#0f5f69",
    formatter: (point) => {
      const lines = [
        `Seri: ${point.seriesLabel}`,
        `Değer: ${formatNumber(point.value, 2)}`,
      ];
      if (Number.isFinite(point.confidence)) {
        lines.push(`Güven: %${formatNumber(point.confidence, 0)}`);
      }
      if (Number.isFinite(point.archiveSamples) || Number.isFinite(point.liveSamples)) {
        lines.push(`Eğitim: Canlı ${formatNumber(Number.isFinite(point.liveSamples) ? point.liveSamples : 0, 0)} + Arşiv ${formatNumber(Number.isFinite(point.archiveSamples) ? point.archiveSamples : 0, 0)}`);
      }
      if (Number.isFinite(point.trainRmse)) {
        lines.push(`Train RMSE: ${formatNumber(point.trainRmse, 3)}`);
      }
      return {
        title: formatDate(point.time),
        lines,
      };
    },
  });
}

function renderImages(latest) {
  lastNasaGalleryLatest = latest;
  const cards = buildNasaCards(latest);

  if (!cards.length) {
    const errorText = latest?.image_error
      ? `<p class="image-empty-detail">${escapeHtml(latest.image_error)}</p>`
      : "";
    clearNasaSlideshowTimer();
    elements.imageHero.innerHTML = "";
      elements.imageGrid.innerHTML = `<div class="station-card image-empty"><p>NASA gÃ¶rÃ¼ntÃ¼leri henÃ¼z hazÄ±r deÄŸil. Pano yeni veriyi otomatik olarak yeniden deneyecek.</p>${errorText}</div>`;
    return;
  }

  const selectedCard = cards.find((card) => card.name === selectedNasaImageName) || cards[0];
  selectedNasaImageName = selectedCard.name;
  const heroTitle = escapeHtml(selectedCard.title || selectedCard.name || "NASA");
  const heroProvider = escapeHtml(selectedCard.provider || "NASA");
  const heroImageUrl = escapeHtml(selectedCard.image_url || "");
  const heroDetailUrl = escapeHtml(selectedCard.detail_url || selectedCard.remote_url || selectedCard.image_url || "#");
  const heroBadgeClass = selectedCard.cached ? "image-pill image-pill-cached" : "image-pill image-pill-live";
  const heroBadgeLabel = selectedCard.cached ? "Yerel Ã¶nbellek" : "CanlÄ± NASA";
  const interpretation = buildNasaInterpretation(selectedCard);
  const toggleLabel = nasaSlideshowPaused ? "SlaytÄ± BaÅŸlat" : "SlaytÄ± Durdur";
  elements.imageHero.innerHTML = `
    <div class="image-hero-frame">
      <a class="image-hero-link" href="${heroDetailUrl}" target="_blank" rel="noreferrer noopener">
        <img src="${heroImageUrl}" alt="${heroTitle}" class="image-hero-media" referrerpolicy="no-referrer">
      </a>
    </div>
    <div class="image-hero-copy">
      <div class="image-meta-row">
        <div>
          <p class="image-hero-kicker">${heroProvider}</p>
          <h3>${heroTitle}</h3>
        </div>
        <span class="${heroBadgeClass}">${heroBadgeLabel}</span>
      </div>
      <p class="image-hero-text">${escapeHtml(interpretation.summary)}</p>
      <div class="image-hero-notes">
        <article class="image-note">
          <span>Ne gÃ¶sterir?</span>
          <p>${escapeHtml(interpretation.signal)}</p>
        </article>
        <article class="image-note">
          <span>Neden Ã¶nemli?</span>
          <p>${escapeHtml(interpretation.why)}</p>
        </article>
      </div>
      <div class="image-hero-actions">
        <button type="button" class="image-control" data-image-action="prev">Ã–nceki</button>
        <button type="button" class="image-control" data-image-action="toggle">${toggleLabel}</button>
        <button type="button" class="image-control" data-image-action="next">Sonraki</button>
        <a class="image-source image-source-primary" href="${heroDetailUrl}" target="_blank" rel="noreferrer noopener">Tam boy aÃ§</a>
      </div>
    </div>
  `;

  elements.imageGrid.innerHTML = cards.map((card) => {
    const title = escapeHtml(card.title || card.name || "NASA");
    const provider = escapeHtml(card.provider || "NASA");
    const imageUrl = escapeHtml(card.image_url || "");
    const detailUrl = escapeHtml(card.detail_url || card.remote_url || card.image_url || "#");
    const badgeClass = card.cached ? "image-pill image-pill-cached" : "image-pill image-pill-live";
    const badgeLabel = card.cached ? "Yerel Ã¶nbellek" : "CanlÄ± NASA";
    const activeClass = card.name === selectedNasaImageName ? " is-active" : "";
    return `
      <figure class="image-card${activeClass}" data-image-name="${escapeHtml(card.name || "")}">
        <button type="button" class="image-button" data-image-name="${escapeHtml(card.name || "")}" aria-label="${title} gÃ¶rÃ¼ntÃ¼sÃ¼nÃ¼ bÃ¼yÃ¼k aÃ§">
          <div class="image-shell">
            <img src="${imageUrl}" alt="${title}" loading="lazy" referrerpolicy="no-referrer">
          </div>
        </button>
        <figcaption>
          <div class="image-meta-row">
            <strong>${title}</strong>
            <span class="${badgeClass}">${badgeLabel}</span>
          </div>
          <div class="image-subline">
            <span class="image-provider">${provider}</span>
            <a class="image-source" href="${detailUrl}" target="_blank" rel="noreferrer noopener">KaynaÄŸÄ± aÃ§</a>
          </div>
        </figcaption>
      </figure>
    `;
  }).join("");

  elements.imageGrid.querySelectorAll(".image-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedNasaImageName = button.dataset.imageName || null;
      nasaSlideshowPaused = true;
      renderImages(latest);
    });
  });

  elements.imageHero.querySelectorAll(".image-control").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.imageAction;
      if (action === "prev") {
        nasaSlideshowPaused = true;
        advanceNasaSlide(-1);
        return;
      }
      if (action === "next") {
        nasaSlideshowPaused = true;
        advanceNasaSlide(1);
        return;
      }
      if (action === "toggle") {
        nasaSlideshowPaused = !nasaSlideshowPaused;
        renderImages(latest);
      }
    });
  });

  scheduleNasaSlideshow(cards);
  repairDocumentEncoding(elements.imageHero);
  repairDocumentEncoding(elements.imageGrid);
}

function formatMaybeNumber(value, digits = 2, suffix = "") {
  if (value === null || value === undefined) return "-";
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return `${number.toFixed(digits)}${suffix}`;
}

function formatScientificMaybeNumber(value, digits = 2, suffix = "") {
  if (value === null || value === undefined) return "-";
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  if (Math.abs(number) >= 1e-4 || number === 0) {
    return `${number.toFixed(8)}${suffix}`;
  }
  return `${number.toExponential(digits)}${suffix}`;
}

function formatMaybePercent(value, digits = 0) {
  if (value === null || value === undefined) return "-";
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return `%${number.toFixed(digits)}`;
}

function formatSolarMeta(updatedAt, source) {
  if (!updatedAt && !source) return "GÃ¼ncelleme yok";
  const prefix = updatedAt ? `Son gÃ¼ncelleme: ${formatDate(updatedAt)}` : "Son gÃ¼ncelleme: bilinmiyor";
  return source ? `${prefix} - ${source}` : prefix;
}

function setElementText(element, value) {
  if (element) {
    element.textContent = value ?? "-";
  }
}

function renderSolarPanel(solar) {
  if (
    !elements.solarPanel
    || !elements.sunspotNoaaNow
    || !elements.sunspotSilsoNow
    || !elements.sunspotNoaaPredicted
    || !elements.sunspotSilsoPredicted
    || !elements.xrayLongFlux
    || !elements.xrayShortFlux
    || !elements.xrayFlareClass
    || !elements.flareList
    || !elements.cmeSpeed
    || !elements.cmeDirection
    || !elements.cmeImpact
    || !elements.cmeArrival
    || !elements.cmeSummary
    || !elements.radioBurstSummary
    || !elements.solarFluxValue
    || !elements.radiationUpdated
    || !elements.sepFluxValue
    || !elements.protonFluxValue
    || !elements.electronFluxValue
    || !elements.heavyIonFluxValue
    || !elements.doseRateValue
    || !elements.protonBandValue
    || !elements.electronBandValue
    || !elements.ionosphereUpdated
    || !elements.tecValue
    || !elements.fof2Value
    || !elements.hmf2Value
    || !elements.s4Value
    || !elements.sigmaPhiValue
    || !elements.mufLufValue
    || !elements.ionoDelayValue
    || !elements.magnetosphereUpdated
    || !elements.auroralOvalValue
    || !elements.auroraProbabilityValue
    || !elements.magnetopauseValue
    || !elements.radiationBeltValue
    || !elements.substormValue
    || !elements.operationalUpdated
    || !elements.hfBlackoutValue
    || !elements.gnssDegradationValue
    || !elements.surfaceChargingValue
    || !elements.deepChargingValue
    || !elements.seuRiskValue
    || !elements.leoDragValue
    || !elements.gicRiskValue
    || !elements.aviationRiskValue
    || !elements.polarCommRiskValue
  ) {
    return;
  }

  const sunspotNoaa = solar?.sunspot_noaa || null;
  const sunspotSilso = solar?.sunspot_silso || null;
  const sunspotPred = solar?.sunspot_predicted || null;
  const sunspotSilsoPred = solar?.sunspot_silso_predicted || null;
  const xray = solar?.xray_flux || null;
  const flares = solar?.flares || [];
  const cme = solar?.cme || null;
  const radio = solar?.radio_burst || null;
  const flux = solar?.solar_flux || null;
  const radiation = solar?.radiation || null;
  const ionosphere = solar?.ionosphere || null;
  const magnetosphere = solar?.magnetosphere || null;
  const operational = solar?.operational || null;

  elements.sunspotNoaaNow.textContent = sunspotNoaa?.value !== undefined && sunspotNoaa?.value !== null
    ? formatMaybeNumber(sunspotNoaa.value, 0)
    : "-";
  elements.sunspotSilsoNow.textContent = sunspotSilso?.value !== undefined && sunspotSilso?.value !== null
    ? formatMaybeNumber(sunspotSilso.value, 0)
    : "-";
  elements.sunspotNoaaPredicted.textContent = sunspotPred?.value !== undefined && sunspotPred?.value !== null
    ? formatMaybeNumber(sunspotPred.value, 0)
    : "-";
  elements.sunspotSilsoPredicted.textContent = sunspotSilsoPred?.value !== undefined && sunspotSilsoPred?.value !== null
    ? formatMaybeNumber(sunspotSilsoPred.value, 0)
    : "-";
  const sunspotDate = sunspotSilso?.date || sunspotNoaa?.date || sunspotSilsoPred?.date || sunspotPred?.date;
  const sunspotSource = sunspotSilso?.source || sunspotNoaa?.source || sunspotSilsoPred?.source || sunspotPred?.source;
  elements.sunspotUpdated.textContent = sunspotDate
    ? `Son gÃ¼ncelleme: ${formatDate(sunspotDate)}${sunspotSource ? ` â€¢ ${sunspotSource}` : ""}`
    : "GÃ¼ncelleme yok";

  const xrayLongValue = parseNumber(xray?.long_w_m2)
    ?? parseNumber(xray?.short_w_m2)
    ?? xrayFluxFromClass(xray?.class)
    ?? null;
  const xrayShortValue = parseNumber(xray?.short_w_m2)
    ?? (xrayLongValue !== null ? Math.max(xrayLongValue * 0.42, 1e-8) : null);
  elements.xrayLongFlux.textContent = xrayLongValue !== null
    ? formatMaybeNumber(xrayLongValue, 8, " W/mÂ²")
    : "-";
  elements.xrayShortFlux.textContent = xrayShortValue !== null
    ? formatMaybeNumber(xrayShortValue, 8, " W/mÂ²")
    : "-";
  elements.xrayFlareClass.textContent = xray?.class
    ? `${xray.class.class}${formatMaybeNumber(xray.class.magnitude, 2)}`
    : "-";
  elements.xrayUpdated.textContent = xray?.time ? `Son gÃ¼ncelleme: ${formatDate(xray.time)}` : "GÃ¼ncelleme yok";

  if (elements.flareClassLegend) {
    const legend = [
      { label: "A", range: "<1e-7", note: "Ã‡ok zayÄ±f" },
      { label: "B", range: "1e-7â€“1e-6", note: "ZayÄ±f" },
      { label: "C", range: "1e-6â€“1e-5", note: "Orta" },
      { label: "M", range: "1e-5â€“1e-4", note: "GÃ¼Ã§lÃ¼" },
      { label: "X", range: "â‰¥1e-4", note: "Ã‡ok gÃ¼Ã§lÃ¼" },
    ];
    elements.flareClassLegend.innerHTML = legend.map((item) => `
      <div class="solar-legend-item">
        <strong>${item.label} SÄ±nÄ±fÄ±</strong>
        <span>${item.range} W/mÂ² â€¢ ${item.note}</span>
      </div>
    `).join("");
  }

  if (elements.flareList) {
    if (!flares.length) {
      elements.flareList.textContent = "GÃ¼ncel flare kaydÄ± bulunamadÄ±.";
    } else {
      elements.flareList.innerHTML = flares.slice(0, 6).map((flare) => `
        <div class="solar-legend-item">
          <strong>${escapeHtml(flare.class || "-")}</strong>
          <span>${flare.peak ? formatDate(flare.peak) : "Zaman yok"}${flare.region ? ` â€¢ AR ${escapeHtml(flare.region)}` : ""}</span>
        </div>
      `).join("");
    }
  }

  elements.cmeSpeed.textContent = cme?.speed_km_s ? formatMaybeNumber(cme.speed_km_s, 0, " km/s") : "-";
  elements.cmeDirection.textContent = cme?.direction
    ? `${cme.direction}${cme?.width_deg ? ` â€¢ ${formatMaybeNumber(cme.width_deg, 0)}Â°` : ""}`
    : cme?.width_deg
      ? `${formatMaybeNumber(cme.width_deg, 0)}Â°`
      : "-";
  elements.cmeImpact.textContent = cme?.impact_probability !== null && cme?.impact_probability !== undefined
    ? formatMaybePercent(cme.impact_probability, 0)
    : "-";
  elements.cmeArrival.textContent = cme?.arrival_time ? formatDate(cme.arrival_time) : "-";
  elements.cmeSummary.textContent = cme?.summary || "CME Ã¶zeti bulunamadÄ±.";
  elements.cmeUpdated.textContent = cme?.time ? `Son gÃ¼ncelleme: ${formatDate(cme.time)}` : "GÃ¼ncelleme yok";

  elements.radioUpdated.textContent = radio?.time ? `Son gÃ¼ncelleme: ${formatDate(radio.time)}` : "GÃ¼ncelleme yok";
  elements.radioBurstSummary.textContent = radio?.summary
    ? `${radio.type ? `${radio.type} â€¢ ` : ""}${radio.summary}`
    : "Radio burst kaydÄ± bulunamadÄ±.";

  elements.solarFluxValue.textContent = flux?.value !== null && flux?.value !== undefined
    ? formatMaybeNumber(flux.value, 1)
    : "-";
  elements.solarFluxTime.textContent = flux?.time ? `Son gÃ¼ncelleme: ${formatDate(flux.time)}` : "GÃ¼ncelleme yok";
  elements.radiationUpdated.textContent = formatSolarMeta(radiation?.updated_at, radiation?.source);
  setElementText(elements.sepFluxValue, formatMaybeNumber(radiation?.sep_flux_pfu, 1, " pfu"));
  setElementText(elements.protonFluxValue, formatMaybeNumber(radiation?.proton_flux_pfu, 1, " pfu"));
  setElementText(elements.electronFluxValue, formatMaybeNumber(radiation?.electron_flux_pfu, 0, " pfu"));
  setElementText(elements.heavyIonFluxValue, formatMaybeNumber(radiation?.heavy_ion_flux_pfu, 2, " pfu"));
  setElementText(elements.doseRateValue, formatMaybeNumber(radiation?.dose_rate_uSv_h, 2, " uSv/h"));
  setElementText(elements.protonBandValue, formatMaybeNumber(radiation?.proton_gt10_mev_pfu, 1, " pfu"));
  setElementText(elements.electronBandValue, formatMaybeNumber(radiation?.electron_gt2_mev_pfu, 0, " pfu"));

  elements.ionosphereUpdated.textContent = formatSolarMeta(ionosphere?.updated_at, ionosphere?.source);
  setElementText(elements.tecValue, formatMaybeNumber(ionosphere?.tec_tecu, 1, " TECU"));
  setElementText(elements.fof2Value, formatMaybeNumber(ionosphere?.fof2_mhz, 1, " MHz"));
  setElementText(elements.hmf2Value, formatMaybeNumber(ionosphere?.hmf2_km, 0, " km"));
  setElementText(elements.s4Value, formatMaybeNumber(ionosphere?.s4_index, 2));
  setElementText(elements.sigmaPhiValue, formatMaybeNumber(ionosphere?.sigma_phi_rad, 2, " rad"));
  setElementText(
    elements.mufLufValue,
    ionosphere
      ? `${formatMaybeNumber(ionosphere?.muf_mhz, 1)} / ${formatMaybeNumber(ionosphere?.luf_mhz, 1)} MHz`
      : "-",
  );
  setElementText(elements.ionoDelayValue, formatMaybeNumber(ionosphere?.ionospheric_delay_m, 1, " m"));

  elements.magnetosphereUpdated.textContent = formatSolarMeta(magnetosphere?.updated_at, magnetosphere?.source);
  setElementText(elements.auroralOvalValue, formatMaybeNumber(magnetosphere?.auroral_oval_min_lat, 1, "Â°N"));
  setElementText(elements.auroraProbabilityValue, formatMaybePercent(magnetosphere?.aurora_probability_percent, 0));
  setElementText(elements.magnetopauseValue, formatMaybeNumber(magnetosphere?.magnetopause_standoff_re, 1, " Re"));
  setElementText(elements.radiationBeltValue, formatMaybePercent(magnetosphere?.radiation_belt_enhancement_percent, 0));
  setElementText(elements.substormValue, formatMaybeNumber(magnetosphere?.substorm_al_nt, 0, " nT"));

  elements.operationalUpdated.textContent = formatSolarMeta(operational?.updated_at, operational?.source);
  setElementText(elements.hfBlackoutValue, operational?.hf_blackout_scale || "-");
  setElementText(elements.gnssDegradationValue, formatMaybePercent(operational?.gnss_degradation_percent, 0));
  setElementText(elements.surfaceChargingValue, formatMaybePercent(operational?.surface_charging_risk_percent, 0));
  setElementText(elements.deepChargingValue, formatMaybePercent(operational?.deep_dielectric_risk_percent, 0));
  setElementText(elements.seuRiskValue, formatMaybePercent(operational?.seu_risk_percent, 0));
  setElementText(elements.leoDragValue, formatMaybePercent(operational?.leo_drag_increase_percent, 0));
  setElementText(elements.gicRiskValue, formatMaybePercent(operational?.gic_risk_percent, 0));
  setElementText(elements.aviationRiskValue, formatMaybePercent(operational?.aviation_radiation_risk_percent, 0));
  setElementText(elements.polarCommRiskValue, formatMaybePercent(operational?.polar_route_comm_risk_percent, 0));
}

function resolvedNoaaData(latest, charts) {
  const noaa = latest?.evaluation?.noaa || {};
  const kpObservedPoint = getLatestChartPoint(charts?.kp_observed);
  const kpEstimatedPoint = getLatestChartPoint(charts?.kp_estimated);
  const speedPoint = getLatestChartPoint(charts?.solar_wind_speed_km_s);
  const densityPoint = getLatestChartPoint(charts?.proton_density_p_cm3);
  const bzPoint = getLatestChartPoint(charts?.bz_nt);
  const btPoint = getLatestChartPoint(charts?.bt_nt);
  return {
    ...noaa,
    observed_at: noaa.observed_at || kpEstimatedPoint?.time || kpObservedPoint?.time || speedPoint?.time || densityPoint?.time || bzPoint?.time || btPoint?.time,
    observed_kp_at: noaa.observed_kp_at || kpObservedPoint?.time,
    estimated_kp_at: noaa.estimated_kp_at || kpEstimatedPoint?.time,
    kp: kpObservedPoint?.value ?? noaa.kp,
    kp_estimated: kpEstimatedPoint?.value ?? noaa.kp_estimated,
    solar_wind_speed_km_s: noaa.solar_wind_speed_km_s ?? speedPoint?.value,
    proton_density_p_cm3: noaa.proton_density_p_cm3 ?? densityPoint?.value,
    bz_nt: noaa.bz_nt ?? bzPoint?.value,
    bt_nt: noaa.bt_nt ?? btPoint?.value,
  };
}

function formatSignedNumber(value, digits = 1) {
  if (value === null || value === undefined) return "-";
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";
  return `${number >= 0 ? "+" : ""}${number.toFixed(digits)}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start, end, amount) {
  return start + ((end - start) * amount);
}

function satelliteStormLevelFromKp(kpValue) {
  const kp = parseNumber(kpValue) ?? 0;
  if (kp < 5) return "G0";
  if (kp < 6) return "G1";
  if (kp < 7) return "G2";
  if (kp < 8) return "G3";
  if (kp < 9) return "G4";
  return "G5";
}

function satelliteGeomagneticPointsFromKp(kpValue) {
  const kp = parseNumber(kpValue) ?? 0;
  if (kp < 5) return 10;
  if (kp < 6) return 30;
  if (kp < 7) return 50;
  if (kp < 8) return 70;
  return 85;
}

function satelliteXrayBandFromFlux(flux) {
  const value = parseNumber(flux);
  if (value === null || value <= 0) return "Low";
  if (value < 1e-5) return "Low";
  if (value < 1e-4) return "Moderate";
  return "High";
}

function satelliteXrayBandPoints(band) {
  if (band === "Moderate") return 10;
  if (band === "High") return 20;
  return 0;
}

function satelliteWeatherDriverScore(kpValue, xrayBand) {
  return Math.min(100, satelliteGeomagneticPointsFromKp(kpValue) + satelliteXrayBandPoints(xrayBand));
}

function satelliteOrbitPoints(orbitType) {
  return { LEO: 15, MEO: 8, GEO: 10 }[orbitType] ?? 0;
}

function satelliteDefaultExposureBand(orbitType, altitudeKm) {
  if (orbitType === "GEO") return "equatorial";
  if (orbitType === "MEO") return "high";
  if ((Number(altitudeKm) || 0) >= 520) return "polar";
  return "mid";
}

function satelliteDefaultShieldingLevel(orbitType, altitudeKm) {
  if (orbitType === "GEO") return 9;
  if (orbitType === "MEO") return 6;
  if ((Number(altitudeKm) || 0) <= 420) return 6;
  if ((Number(altitudeKm) || 0) <= 650) return 5;
  return 4;
}

function satelliteAltitudePoints(altitudeKm) {
  const altitude = Number(altitudeKm) || 0;
  if (altitude >= 200 && altitude <= 400) return 15;
  if (altitude >= 401 && altitude <= 600) return 10;
  if (altitude >= 601 && altitude <= 1000) return 5;
  return 0;
}

function satelliteExposureBandLabel(band) {
  return SATELLITE_EXPOSURE_LABELS[band] || band;
}

function satelliteRepresentativeLatitude(exposureBand, orbitType) {
  if (exposureBand === "equatorial") return orbitType === "GEO" ? 0 : 15;
  if (exposureBand === "polar") return orbitType === "GEO" ? 12 : 78;
  if (exposureBand === "high") return 55;
  return orbitType === "GEO" ? 0 : 51.6;
}

function satelliteImpactBand(score) {
  if (score <= 29) return "Low";
  if (score <= 59) return "Moderate";
  if (score <= 79) return "High";
  return "Severe";
}

function satelliteRiskBandRank(label) {
  return { Low: 0, Moderate: 1, High: 2, Severe: 3 }[label] ?? 0;
}

function satelliteHigherRiskBand(left, right) {
  return satelliteRiskBandRank(left) >= satelliteRiskBandRank(right) ? left : right;
}

function satelliteImpactScoreFromComponents(geomagneticPoints, xrayPoints, orbitPointsValue, altitudePointsValue) {
  const weatherScore = Math.min(100, geomagneticPoints + xrayPoints);
  return clamp(Math.round((weatherScore * 0.75) + orbitPointsValue + altitudePointsValue - 10), 0, 100);
}

function satelliteRiskClassName(label) {
  return `satellite-risk-${String(label || "").toLowerCase()}`;
}

function satelliteTrendFromChart(chart) {
  const series = chartSeries(chart);
  if (series.length < 4) return "Stable";
  const recent = series.slice(-4).map((item) => item.value);
  const baseline = (recent[0] + recent[1] + recent[2]) / 3;
  const delta = recent[3] - baseline;
  if (delta > 0.6) return "Rising";
  if (delta < -0.6) return "Falling";
  return "Stable";
}

function satelliteMaxKpLast24h(chart) {
  const series = chartSeries(chart);
  if (!series.length) return null;
  const end = series[series.length - 1].date;
  const cutoff = new Date(end.getTime() - (24 * 60 * 60 * 1000));
  const recent = series.filter((item) => item.date >= cutoff);
  const values = recent.length ? recent.map((item) => item.value) : [series[series.length - 1].value];
  return Math.max(...values);
}

function satelliteCompressChart(chart, maxPoints = 180) {
  const points = Array.isArray(chart?.points) ? chart.points : [];
  if (!points.length || points.length <= maxPoints) {
    return chart;
  }
  const step = Math.ceil(points.length / maxPoints);
  const sampled = [];
  for (let index = 0; index < points.length; index += step) {
    sampled.push(points[index]);
  }
  const lastPoint = points[points.length - 1];
  if (sampled[sampled.length - 1] !== lastPoint) {
    sampled.push(lastPoint);
  }
  return {
    ...(chart || {}),
    points: sampled,
  };
}

function satelliteDataQualityLabel(context) {
  if (satellitePanelState.manualOverride) return "Manuel";
  const estimatedFields = Array.isArray(context?.solar?.estimated_fields) ? context.solar.estimated_fields : [];
  const xrayEstimated = estimatedFields.includes("xray_flux") || context?.solar?.xray_flux?.estimated;
  const kpObserved = parseNumber(context?.noaa?.kp) !== null;
  if (kpObserved && !xrayEstimated) return "CanlÄ±";
  if (kpObserved || parseNumber(context?.noaa?.kp_estimated) !== null) return "Karma";
  return "Model";
}

function satelliteAsriScore(profile, environment) {
  const orbitType = profile?.orbitType || "LEO";
  const altitudeKm = Number(profile?.altitudeKm) || 0;
  const representativeLat = Math.abs(Number(profile?.representativeLat) || 0);
  const shieldingLevel = clamp(Number(profile?.shieldingLevel) || 5, 1, 10);
  const solarWindSpeed = parseNumber(environment?.solarWindSpeed) ?? 400;
  const kpValue = parseNumber(environment?.kpValue) ?? 0;
  const xrayBand = environment?.xrayBand || "Low";

  const speedNorm = clamp((solarWindSpeed - 320) / 480, 0, 1.4);
  const kpNorm = clamp(kpValue / 9, 0, 1);
  const xrayNorm = { Low: 0.08, Moderate: 0.38, High: 0.72 }[xrayBand] ?? 0.08;
  const latitudeNorm = clamp(representativeLat / 82, 0, 1);
  const dragComponent = orbitType === "LEO"
    ? altitudeKm < 450
      ? clamp(0.22 + (kpNorm * 0.58), 0.22, 0.85)
      : altitudeKm < 1000
        ? clamp(0.08 + (kpNorm * 0.22), 0.08, 0.38)
        : 0.02
    : 0.02;
  const orbitExposure = { LEO: 0.18, MEO: 0.34, GEO: 0.42 }[orbitType] ?? 0.22;
  const shieldingProtection = clamp((shieldingLevel - 1) / 9, 0.08, 1);

  const score = clamp(Math.round(
    14
    + (speedNorm * 16)
    + (kpNorm * 24)
    + (xrayNorm * 14)
    + (latitudeNorm * 18)
    + (dragComponent * 20)
    + (orbitExposure * 16)
    - (shieldingProtection * 18)
  ), 0, 100);

  return {
    score,
    band: satelliteImpactBand(score),
    components: {
      speed: Math.round(speedNorm * 16),
      kp: Math.round(kpNorm * 24),
      xray: Math.round(xrayNorm * 14),
      latitude: Math.round(latitudeNorm * 18),
      drag: Math.round(dragComponent * 20),
      orbit: Math.round(orbitExposure * 16),
      shielding: -Math.round(shieldingProtection * 18),
    },
  };
}

function satelliteAsriStatusNote(band) {
  if (band === "Low") return "Nominal operasyon penceresi korunabilir.";
  if (band === "Moderate") return "Telemetri ve baglanti marjlarini daha sik izle.";
  if (band === "High") return "Alt sistem sagligi, charging ve yedek planlar one alinmali.";
  return "Hassas operasyonlari erteleme ve koruyucu moda gecis degerlendirilmeli.";
}

function satelliteBuildAsriProfiles(environment) {
  const selectedProfile = {
    key: "selected_profile",
    name: "Secili profil",
    orbitType: satellitePanelState.orbitType,
    altitudeKm: satellitePanelState.altitudeKm,
    exposureBand: satellitePanelState.exposureBand,
    representativeLat: satelliteRepresentativeLatitude(satellitePanelState.exposureBand, satellitePanelState.orbitType),
    shieldingLevel: satellitePanelState.shieldingLevel,
    note: "Panelde secilen yoringe ve muhendislik varsayimlari",
    isSelected: true,
  };

  return [selectedProfile, ...SATELLITE_REFERENCE_PROFILES].map((profile) => {
    const evaluation = satelliteAsriScore(profile, environment);
    const dominantComponent = Object.entries(evaluation.components)
      .sort((left, right) => Math.abs(right[1]) - Math.abs(left[1]))[0]?.[0] || "kp";
    const driverText = {
      speed: "gunes ruzgari hizi",
      kp: "jeomanyetik seviye",
      xray: "X-ray aktivitesi",
      latitude: "enlem maruziyeti",
      drag: "LEO drag etkisi",
      orbit: "yoringe maruziyeti",
      shielding: "zirhlama seviyesi",
    }[dominantComponent] || "operasyonel baski";

    return {
      ...profile,
      score: evaluation.score,
      band: evaluation.band,
      statusText: satelliteAsriStatusNote(evaluation.band),
      driverText,
      components: evaluation.components,
    };
  });
}

function satelliteSummaryText(impactBandLabel, orbitType, altitudeKm, kpValue, xrayBand) {
  if (impactBandLabel === "Low") {
    return `${orbitType} profili iÃ§in ${altitudeKm} km irtifada anlÄ±k uzay havasÄ± baskÄ±sÄ± dÃ¼ÅŸÃ¼k. Kp ${formatNumber(kpValue, 2)} ve X-ray ${xrayBand} seviyesinde olduÄŸu iÃ§in nominal operasyonlar korunabilir.`;
  }
  if (impactBandLabel === "Moderate") {
    return `${orbitType} profili iÃ§in izleme sÄ±klÄ±ÄŸÄ±nÄ± artÄ±rmak uygun. Jeomanyetik seviye ve X-ray durumu operasyon marjlarÄ±nÄ± zorlamaya baÅŸlayabilir.`;
  }
  if (impactBandLabel === "High") {
    return `${orbitType} profili hassas bir pencereye girmiÅŸ durumda. Alt sistem saÄŸlÄ±ÄŸÄ±, baÄŸlantÄ± marjlarÄ± ve yÃ¶rÃ¼nge etkileri daha sÄ±k gÃ¶zlenmeli.`;
  }
  return `${orbitType} profili iÃ§in ciddi bir operasyonel dikkat gerekiyor. MÃ¼mkÃ¼nse hassas gÃ¶rev adÄ±mlarÄ± ertelenmeli ve korumacÄ± operasyon modu dÃ¼ÅŸÃ¼nÃ¼lmeli.`;
}

function satelliteAssessLeoDrag(orbitType, altitudeKm, kpValue) {
  const kp = parseNumber(kpValue) ?? 0;
  if (orbitType !== "LEO" || altitudeKm > 1000) return "Low";
  if (kp < 5) return "Low";
  if (kp < 7) return "Moderate";
  return "High";
}

function satelliteAssessElectronicsRisk(orbitType, kpValue, xrayBand) {
  const kp = parseNumber(kpValue) ?? 0;
  let score = 0;
  if (kp >= 5) score += 1;
  if (kp >= 7) score += 1;
  if (xrayBand === "Moderate") score += 1;
  if (xrayBand === "High") score += 2;
  if (orbitType === "MEO") score += 1;
  if (orbitType === "GEO") score += 2;
  if (score <= 1) return "Low";
  if (score <= 3) return "Moderate";
  return "High";
}

function satelliteAssessCommunicationRisk(kpValue, xrayBand) {
  const kp = parseNumber(kpValue) ?? 0;
  let score = 0;
  if (kp >= 5) score += 1;
  if (kp >= 7) score += 1;
  if (xrayBand === "Moderate") score += 1;
  if (xrayBand === "High") score += 2;
  if (score <= 1) return "Low";
  if (score <= 3) return "Moderate";
  return "High";
}

function satelliteRecommendedActions(scoreBand, leoDragRisk, electronicsRisk, communicationRisk) {
  let actions;
  if (scoreBand === "Low") {
    actions = ["Nominal operasyon dÃ¼zeni korunabilir."];
  } else if (scoreBand === "Moderate") {
    actions = ["Ä°zleme sÄ±klÄ±ÄŸÄ±nÄ± artÄ±r ve telemetri marjlarÄ±nÄ± kontrol et."];
  } else if (scoreBand === "High") {
    actions = ["Alt sistem durumunu yakÄ±ndan izle ve hassas operasyonlarÄ± dikkatle planla."];
  } else {
    actions = ["MÃ¼mkÃ¼nse hassas operasyonlarÄ± ertele ve korumacÄ± operasyon moduna geÃ§."];
  }
  if (leoDragRisk !== "Low") {
    actions.push("LEO drag riski yÃ¼kseliyor; sÃ¼rÃ¼klenme ve yÃ¶rÃ¼nge bakÄ±m ihtimalini kontrol et.");
  }
  if (electronicsRisk === "High") {
    actions.push("Elektronik risk yÃ¼ksek; charging, upset ve saÄŸlÄ±k telemetrilerine Ã¶ncelik ver.");
  }
  if (communicationRisk !== "Low") {
    actions.push("HaberleÅŸme marjlarÄ±nÄ± ve yedek baÄŸlantÄ± planlarÄ±nÄ± doÄŸrula.");
  }
  return actions;
}

function satelliteXrayChartPayload(solar) {
  const chart = solar?.xray_series;
  const points = Array.isArray(chart?.points)
    ? chart.points
      .map((point) => {
        const value = parseNumber(point?.value);
        return {
          time: point?.time,
          value: value !== null && value > 0 ? Math.log10(value) : null,
        };
      })
      .filter((point) => point.time && point.value !== null && Number.isFinite(point.value))
    : [];

  let synthetic = false;
  if (points.length < 6) {
    const fallbackFlux = parseNumber(solar?.xray_flux?.long_w_m2) ?? 1e-7;
    const fallbackTime = parseUtcDate(solar?.xray_flux?.time || new Date().toISOString()) || new Date();
    const baselineFlux = Math.max(1e-8, fallbackFlux * 0.32);
    const flareBoost = Array.isArray(solar?.flares) && solar.flares.length ? 1.18 : 1.0;
    const generatedPoints = [];
    for (let step = 0; step < 12; step += 1) {
      const ratio = step / 11;
      const hoursBack = (11 - step) * 2;
      const timestamp = new Date(fallbackTime.getTime() - (hoursBack * 60 * 60 * 1000));
      const flux = baselineFlux + ((fallbackFlux * flareBoost - baselineFlux) * Math.pow(ratio, 1.28));
      generatedPoints.push({
        time: timestamp.toISOString(),
        value: Math.log10(Math.max(flux, 1e-8)),
      });
    }
    if (points.length) {
      points.splice(0, points.length, ...generatedPoints.slice(0, -1), points[points.length - 1]);
    } else {
      points.push(...generatedPoints);
    }
    synthetic = true;
  }

  return {
    points,
    coverage_days: Number(chart?.coverage_days || 1),
    synthetic,
  };
}

function buildSatelliteAssessmentContext(latest, noaa, charts, solar) {
  const kpChart = charts?.kp_observed?.points?.length ? charts.kp_observed : charts?.kp_estimated;
  const trend = satelliteTrendFromChart(kpChart);
  const kpCurrentLive = parseNumber(noaa?.kp) ?? parseNumber(noaa?.kp_estimated) ?? 0;
  const kpForecast3h = parseNumber(noaa?.kp_lstm_forecast?.predicted_kp) ?? parseNumber(noaa?.kp_estimated) ?? kpCurrentLive;
  const latestXrayPoint = Array.isArray(solar?.xray_series?.points)
    ? [...solar.xray_series.points]
      .reverse()
      .find((point) => point?.time && parseNumber(point?.value) !== null)
    : null;
  const xrayFluxLive = parseNumber(solar?.xray_flux?.long_w_m2)
    ?? parseNumber(solar?.xray_flux?.short_w_m2)
    ?? parseNumber(latestXrayPoint?.value)
    ?? 1e-7;
  const xrayClass = solar?.xray_flux?.class
    ? `${solar.xray_flux.class.class}${formatMaybeNumber(solar.xray_flux.class.magnitude, 2)}`
    : (() => {
      const parsed = xrayClassFromFlux(xrayFluxLive);
      return parsed ? `${parsed.class}${formatMaybeNumber(parsed.magnitude, 2)}` : "B1.00";
    })();
  const effectiveKp = satellitePanelState.manualOverride ? Number(satellitePanelState.overrideKp) : kpCurrentLive;
  const effectiveXrayBand = satellitePanelState.manualOverride
    ? satellitePanelState.overrideXrayBand
    : satelliteXrayBandFromFlux(xrayFluxLive);
  const solarWindSpeed = parseNumber(noaa?.solar_wind_speed_km_s) ?? 400;
  const geomagneticPoints = satelliteGeomagneticPointsFromKp(effectiveKp);
  const xrayPoints = satelliteXrayBandPoints(effectiveXrayBand);
  const orbitPoints = satelliteOrbitPoints(satellitePanelState.orbitType);
  const altitudePoints = satelliteAltitudePoints(satellitePanelState.altitudeKm);
  const weatherDriverScore = satelliteWeatherDriverScore(effectiveKp, effectiveXrayBand);
  const exposureScore = orbitPoints + altitudePoints;
  const impactScore = satelliteImpactScoreFromComponents(geomagneticPoints, xrayPoints, orbitPoints, altitudePoints);
  const impactBand = satelliteImpactBand(impactScore);
  const leoDragRisk = satelliteAssessLeoDrag(satellitePanelState.orbitType, satellitePanelState.altitudeKm, effectiveKp);
  const electronicsRisk = satelliteAssessElectronicsRisk(satellitePanelState.orbitType, effectiveKp, effectiveXrayBand);
  const communicationRisk = satelliteAssessCommunicationRisk(effectiveKp, effectiveXrayBand);
  const lastUpdate = solar?.xray_flux?.time || latestXrayPoint?.time || noaa?.observed_at || latest?.generated_at || null;
  const kpMax24h = satelliteMaxKpLast24h(kpChart);
  const xrayEstimated = solar?.xray_flux?.estimated || (Array.isArray(solar?.estimated_fields) && solar.estimated_fields.includes("xray_flux"));
  const dataQuality = satelliteDataQualityLabel({ noaa, solar });
  const xrayChart = satelliteCompressChart(satelliteXrayChartPayload(solar), 180);
  const xrayHistoryReady = Array.isArray(xrayChart?.points) && xrayChart.points.length >= 6;
  const xrayHistorySynthetic = Boolean(xrayChart?.synthetic);
  const asriProfiles = satelliteBuildAsriProfiles({
    solarWindSpeed,
    kpValue: effectiveKp,
    xrayBand: effectiveXrayBand,
  });
  const asriSelected = asriProfiles.find((item) => item.isSelected) || asriProfiles[0];
  const combinedOperationalBand = satelliteHigherRiskBand(impactBand, asriSelected?.band || "Low");
  const excludedSignals = [
    noaa?.solar_wind_speed_km_s !== null && noaa?.solar_wind_speed_km_s !== undefined
      ? `Solar wind hÄ±zÄ± ${formatNumber(noaa.solar_wind_speed_km_s, 1)} km/s`
      : null,
    noaa?.bz_nt !== null && noaa?.bz_nt !== undefined
      ? `IMF Bz ${formatSignedNumber(noaa.bz_nt, 1)} nT`
      : null,
    noaa?.proton_density_p_cm3 !== null && noaa?.proton_density_p_cm3 !== undefined
      ? `Proton yoÄŸunluÄŸu ${formatNumber(noaa.proton_density_p_cm3, 1)} p/cm3`
      : null,
    solar?.solar_flux?.value !== null && solar?.solar_flux?.value !== undefined
      ? `Solar flux ${formatNumber(solar.solar_flux.value, 1)}`
      : null,
    Array.isArray(solar?.flares) && solar.flares.length
      ? `Flare listesi (${solar.flares[0]?.class || solar.flares.length} dahil) alÄ±ndÄ± ama skorda kullanÄ±lmadÄ±`
      : null,
    solar?.cme?.summary
      ? "CME Ã¶zeti izleniyor ancak bu uydu skoruna henÃ¼z dahil deÄŸil"
      : null,
  ].filter(Boolean).filter((item) => !String(item).startsWith("Solar wind"));

  return {
    kpChart: satelliteCompressChart(kpChart, 80),
    xrayChart,
    trend,
    kpCurrentLive,
    kpForecast3h,
    effectiveKp,
    xrayFluxLive,
    xrayClass,
    effectiveXrayBand,
    stormLevel: satelliteStormLevelFromKp(effectiveKp),
    weatherDriverScore,
    exposureScore,
    dataQuality,
    solarWindSpeed,
    impactScore,
    impactBand,
    combinedOperationalBand,
    leoDragRisk,
    electronicsRisk,
    communicationRisk,
    asriSelected,
    asriProfiles,
    recommendedActions: satelliteRecommendedActions(combinedOperationalBand, leoDragRisk, electronicsRisk, communicationRisk),
    lastUpdate,
    kpMax24h,
    xrayHistoryReady,
    xrayHistorySynthetic,
    summaryText: `${satelliteSummaryText(
      combinedOperationalBand,
      satellitePanelState.orbitType,
      satellitePanelState.altitudeKm,
      effectiveKp,
      effectiveXrayBand,
    )} Yardimci ASRI motoru secili profil icin ${asriSelected ? `${asriSelected.score}/100` : "-"} duzeyinde muhendislik riski hesapliyor.`,
    contributionPoints: {
      "Geomagnetic (Kp)": geomagneticPoints,
      "X-ray": xrayPoints,
      "YÃ¶rÃ¼nge tipi": orbitPoints,
      "Ä°rtifa": altitudePoints,
    },
    usedInputs: [
      `Kp: ${formatNumber(effectiveKp, 2)}${satellitePanelState.manualOverride ? " (manuel)" : " (canlÄ±)"}`,
      `X-ray kategorisi: ${effectiveXrayBand} (${xrayClass})${satellitePanelState.manualOverride ? " | manuel seÃ§im" : ""}`,
      `Uydu tipi: ${satellitePanelState.orbitType}`,
      `Ä°rtifa: ${satellitePanelState.altitudeKm} km`,
      `Veri kalitesi: ${dataQuality}`,
    ],
    asriUsedInputs: [
      `Solar wind hizi: ${formatNumber(solarWindSpeed, 0)} km/s`,
      `Temsili enlem: ${formatNumber(asriSelected?.representativeLat, 1)}Â°`,
      `Maruziyet bandi: ${satelliteExposureBandLabel(satellitePanelState.exposureBand)}`,
      `Zirhlama seviyesi: ${satellitePanelState.shieldingLevel}/10`,
      `ASRI secili skor: ${asriSelected ? `${asriSelected.score}/100` : "-"}`,
    ],
    contextOnly: [
      `24 saatlik maksimum Kp: ${kpMax24h !== null ? formatNumber(kpMax24h, 2) : "-"}`,
      `Kp +3 saat: ${formatNumber(kpForecast3h, 2)}`,
      `Trend: ${trend}`,
      `Son gÃ¼ncelleme: ${formatDate(lastUpdate)}`,
      `Weather driver skoru: ${weatherDriverScore}/100`,
      `Maruziyet skoru: ${exposureScore}/25`,
      `Birlesik operasyon bandi: ${combinedOperationalBand}`,
    ],
    sourceNotes: [
      parseNumber(noaa?.kp) !== null ? "Kp girdisi canlÄ± NOAA gÃ¶zleminden alÄ±ndÄ±." : "GÃ¶zlenen Kp yok; NOAA tahmini Kp kullanÄ±ldÄ±.",
      xrayEstimated ? "X-ray girdisi model fallback ile dolduruldu." : "X-ray girdisi canlÄ± GOES akÄ±ÅŸÄ±ndan alÄ±ndÄ±.",
      xrayHistorySynthetic
        ? "GOES geÃ§miÅŸ serisi sÄ±nÄ±rlÄ±; grafik kÄ±sa sÃ¼reli X-ray sÃ¼reklilik modeli ile desteklendi."
        : xrayHistoryReady
          ? "GOES geÃ§miÅŸ serisi aktif."
          : "GOES geÃ§miÅŸ serisi sÄ±nÄ±rlÄ±; yorum anlÄ±k X-ray Ã¼zerinden sÃ¼rdÃ¼rÃ¼lÃ¼yor.",
      "Skor sadece Kp + GOES X-ray + yÃ¶rÃ¼nge/irtifa maruziyeti ile hesaplanÄ±r.",
      satellitePanelState.manualOverride ? "Manuel override aÃ§Ä±k; skorda kullanÄ±lan Kp/X-ray kullanÄ±cÄ± seÃ§imidir." : "Skor canlÄ± veriyle hesaplandÄ±.",
    ],
    excludedSignals,
  };
}

function describeBand(value, quietLabel, midLabel, strongLabel, peakLabel) {
  if (value < 0.26) return quietLabel;
  if (value < 0.52) return midLabel;
  if (value < 0.78) return strongLabel;
  return peakLabel;
}

function buildSimulationMetrics(noaa, evaluation, solar = {}) {
  const observedKp = Number(noaa?.kp);
  const estimatedKp = Number(noaa?.kp_estimated);
  const forecastKp = Number(noaa?.kp_lstm_forecast?.predicted_kp);
  const windSpeed = Number(noaa?.solar_wind_speed_km_s);
  const bzValue = Number(noaa?.bz_nt);
  const riskPercent = Number(evaluation?.risk_percent ?? evaluation?.score);
  const xrayFlux = parseNumber(solar?.xray_flux?.long_w_m2)
    ?? parseNumber(solar?.xray_flux?.short_w_m2)
    ?? 1e-7;
  const kpObserved = Number.isFinite(observedKp) ? observedKp : 1.4;
  const kpEstimated = Number.isFinite(estimatedKp) ? estimatedKp : kpObserved;
  const kpForecast = Number.isFinite(forecastKp) ? forecastKp : kpEstimated;
  const speed = Number.isFinite(windSpeed) ? windSpeed : 360;
  const bz = Number.isFinite(bzValue) ? bzValue : 1.5;
  const risk = Number.isFinite(riskPercent) ? riskPercent : 14;
  const kpBlend = clamp((Math.max(kpObserved, kpEstimated, kpForecast) - 1) / 7.5, 0, 1);
  const speedNorm = clamp((speed - 300) / 620, 0, 1);
  const southward = clamp((-bz) / 18, 0, 1);
  const northward = clamp(bz / 18, 0, 1);
  const compression = clamp((speedNorm * 0.5) + (southward * 0.32) + ((risk / 100) * 0.24), 0.08, 1);
  const aurora = clamp((kpBlend * 0.52) + (southward * 0.3) + (speedNorm * 0.18), 0.06, 1);
  const flow = clamp((speedNorm * 0.62) + (kpBlend * 0.22) + (Math.min(1, Math.abs(bz) / 18) * 0.16), 0.08, 1);
  const shield = clamp(1.08 - (compression * 0.72) + (northward * 0.16), 0.22, 1.08);
  const storminess = clamp((kpBlend * 0.48) + (southward * 0.26) + (speedNorm * 0.16) + ((risk / 100) * 0.18), 0.08, 1);
  const xrayNorm = clamp((Math.log10(Math.max(xrayFlux, 1e-8)) + 8) / 4, 0, 1);
  return {
    kpObserved,
    kpEstimated,
    kpForecast,
    windSpeed: speed,
    bzValue: bz,
    riskPercent: risk,
    xrayFlux,
    xrayNorm,
    xrayBand: satelliteXrayBandFromFlux(xrayFlux),
    compression,
    aurora,
    flow,
    shield,
    storminess,
    southward,
    northward,
    auroraPoints: Array.isArray(solar?.aurora_live?.points) ? solar.aurora_live.points : [],
    level: evaluation?.level || "normal",
  };
}

function buildSimulationSummary(metrics) {
  const flowLabel = describeBand(metrics.flow, "sakin", "dÃ¼zenli", "gÃ¼Ã§lÃ¼", "fÄ±rtÄ±nalÄ±");
  const auroraLabel = describeBand(metrics.aurora, "zayÄ±f", "artan", "parlak", "Ã§ok parlak");
  const bzNarrative = metrics.bzValue < -2
    ? "Bz gÃ¼neye dÃ¶nÃ¼k olduÄŸu iÃ§in enerji aktarÄ±mÄ± hÄ±zlanÄ±yor."
    : metrics.bzValue > 2
      ? "Bz kuzeye dÃ¶nÃ¼k; manyetosfer bir miktar daha direnÃ§li."
      : "Bz nÃ¶tr banda yakÄ±n; etkiyi en Ã§ok hÄ±z ve Kp belirliyor.";
  return `CanlÄ± sahne ÅŸu anda ${flowLabel} solar akÄ±ÅŸÄ± DÃ¼nya'nÄ±n manyetik kalkanÄ±yla eÅŸleÅŸtiriyor. ${bzNarrative} Aurora ${auroraLabel} seviyede, manyetik basÄ±nÃ§ ise %${formatNumber(metrics.compression * 100, 0)} civarÄ±nda modelleniyor.`;
}

function buildSimulationLegend(metrics) {
  const flowLabel = describeBand(metrics.flow, "sakin", "akÄ±cÄ±", "gÃ¼Ã§lÃ¼", "yoÄŸun");
  const shieldLabel = describeBand(metrics.compression, "geniÅŸ", "toparlanÄ±yor", "sÄ±kÄ±ÅŸmÄ±ÅŸ", "sert baskÄ± altÄ±nda");
  const auroraLabel = describeBand(metrics.aurora, "soluk", "uyanmakta", "belirgin", "zirvede");
  return [
    `<span class="simulation-chip simulation-chip-flow">Solar akÄ±ÅŸ ${flowLabel}</span>`,
    `<span class="simulation-chip simulation-chip-field">Bz ${metrics.bzValue < 0 ? "gÃ¼neye" : "kuzeye"} ${formatSignedNumber(metrics.bzValue, 1)} nT</span>`,
    `<span class="simulation-chip simulation-chip-aurora">Aurora ${auroraLabel}</span>`,
    `<span class="simulation-chip simulation-chip-risk">Manyetosfer ${shieldLabel}</span>`,
  ].join("");
}

function normalizeLongitudeDegrees(value) {
  let normalized = Number(value) || 0;
  while (normalized > 180) normalized -= 360;
  while (normalized < -180) normalized += 360;
  return normalized;
}

function wrappedLongitudeDifference(left, right) {
  return normalizeLongitudeDegrees((Number(left) || 0) - (Number(right) || 0));
}

function simulationSubsolarLongitude(rotation) {
  return normalizeLongitudeDegrees((-(rotation * 180 / Math.PI)) - 90);
}

function simulationLocalHour(longitude, subsolarLongitude) {
  return (((wrappedLongitudeDifference(longitude, subsolarLongitude) / 15) + 12) % 24 + 24) % 24;
}

function simulationRiskPalette(local) {
  const dominant = local?.dominant || "overall";
  const overall = clamp(Number(local?.overall) || 0, 0, 100);
  if (overall >= 78) {
    return {
      core: `rgba(255, 115, 92, ${0.22 + ((overall - 78) / 180)})`,
      glow: `rgba(255, 166, 120, ${0.1 + ((overall - 78) / 260)})`,
      solid: "#f97360",
    };
  }
  if (dominant === "geomag") {
    return {
      core: `rgba(84, 236, 186, ${0.12 + (overall / 480)})`,
      glow: `rgba(66, 190, 255, ${0.08 + (overall / 620)})`,
      solid: "#4de0c2",
    };
  }
  if (dominant === "hf") {
    return {
      core: `rgba(255, 198, 92, ${0.12 + (overall / 500)})`,
      glow: `rgba(255, 146, 74, ${0.07 + (overall / 700)})`,
      solid: "#f8b24d",
    };
  }
  return {
    core: `rgba(129, 151, 255, ${0.12 + (overall / 500)})`,
    glow: `rgba(84, 196, 255, ${0.08 + (overall / 680)})`,
    solid: "#7e96ff",
  };
}

function simulationDominantField(geomag, gnss, hf) {
  return [
    ["geomag", geomag],
    ["gnss", gnss],
    ["hf", hf],
  ].sort((left, right) => right[1] - left[1])[0][0];
}

function sampleAuroraProbability(auroraPoints, lat, lon, metrics, nightFactor) {
  const points = Array.isArray(auroraPoints) ? auroraPoints : [];
  let weighted = 0;
  let totalWeight = 0;
  let peak = 0;
  for (const point of points) {
    const dLat = Math.abs((point?.lat ?? 0) - lat);
    if (dLat > 18) continue;
    const dLon = Math.abs(wrappedLongitudeDifference(point?.lon ?? 0, lon));
    if (dLon > 28) continue;
    const weight = 1 / (1 + (dLat * 0.22) + (dLon * 0.14));
    weighted += (Number(point?.value) || 0) * weight;
    totalWeight += weight;
    peak = Math.max(peak, Number(point?.value) || 0);
  }
  const sampled = totalWeight > 0 ? Math.max(weighted / totalWeight, peak * 0.68) : 0;
  const polarModel = (metrics.aurora * 100) * clamp((Math.abs(lat) - 46) / 28, 0, 1) * (0.48 + (nightFactor * 0.52));
  return clamp(Math.max(sampled, polarModel), 0, 100);
}

function buildSimulationLocalField(latitude, longitude, metrics, rotation) {
  const lat = clamp(Number(latitude) || 0, -89.5, 89.5);
  const lon = normalizeLongitudeDegrees(longitude);
  const subsolarLongitude = simulationSubsolarLongitude(rotation);
  const localHour = simulationLocalHour(lon, subsolarLongitude);
  const dayFactor = clamp(Math.cos(wrappedLongitudeDifference(lon, subsolarLongitude) * (Math.PI / 180)), 0, 1);
  const nightFactor = 1 - dayFactor;
  const duskFactor = clamp(1 - (Math.abs(localHour - 19) / 5.5), 0, 1);
  const absLat = Math.abs(lat);
  const polarFactor = clamp((absLat - 46) / 28, 0, 1);
  const subauroralFactor = clamp((absLat - 28) / 28, 0, 1);
  const equatorialFactor = Math.exp(-Math.pow((absLat - 15) / 12, 2));
  const auroraLocal = sampleAuroraProbability(metrics?.auroraPoints, lat, lon, metrics, nightFactor);
  const geomag = clamp(
    (metrics.kpForecast * 6.2)
    + (metrics.southward * 24)
    + (metrics.compression * 16)
    + (polarFactor * 28)
    + (auroraLocal * 0.42)
    + (nightFactor * 6),
    2,
    100,
  );
  const gnss = clamp(
    (metrics.kpForecast * 4.2)
    + (metrics.compression * 14)
    + (metrics.xrayNorm * 24 * dayFactor)
    + (equatorialFactor * (18 + (metrics.storminess * 26)))
    + (duskFactor * 15)
    + (polarFactor * 8),
    2,
    100,
  );
  const hf = clamp(
    (metrics.kpForecast * 3.8)
    + (metrics.xrayNorm * 38 * dayFactor)
    + (subauroralFactor * 12)
    + (polarFactor * 10)
    + (auroraLocal * 0.2)
    + (nightFactor * 4),
    2,
    100,
  );
  const overall = clamp((geomag * 0.36) + (gnss * 0.34) + (hf * 0.30), 0, 100);
  const dominant = simulationDominantField(geomag, gnss, hf);
  return {
    lat,
    lon,
    localHour,
    dayFactor,
    nightFactor,
    auroraLocal,
    geomag,
    gnss,
    hf,
    overall,
    dominant,
    severity: severityLabel(overall),
  };
}

function simulationCoordinateLabel(lat, lon) {
  const latSuffix = lat >= 0 ? "K" : "G";
  const lonSuffix = lon >= 0 ? "D" : "B";
  return `Enlem ${formatNumber(Math.abs(lat), 1)}\u00b0 ${latSuffix} | Boylam ${formatNumber(Math.abs(lon), 1)}\u00b0 ${lonSuffix}`;
}

function simulationDistanceKm(latA, lonA, latB, lonB) {
  const toRadians = (value) => value * (Math.PI / 180);
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(latB - latA);
  const deltaLon = toRadians(lonB - lonA);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(latA)) * Math.cos(toRadians(latB)) * Math.sin(deltaLon / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function simulationRegionContains(region, lat, lon) {
  return lat >= region.minLat && lat <= region.maxLat && lon >= region.minLon && lon <= region.maxLon;
}

function simulationResolvePlaceName(lat, lon) {
  let closestAnchor = null;
  let closestDistance = Infinity;

  SIMULATION_PLACE_ANCHORS.forEach((anchor) => {
    const distance = simulationDistanceKm(lat, lon, anchor.lat, anchor.lon);
    if (distance < closestDistance) {
      closestAnchor = anchor;
      closestDistance = distance;
    }
  });

  if (closestAnchor && closestDistance <= 420) {
    return closestAnchor.name;
  }

  const matchingRegion = SIMULATION_PLACE_REGIONS.find((region) => simulationRegionContains(region, lat, lon));
  if (matchingRegion) {
    if (closestAnchor && closestDistance <= 900) {
      return `${closestAnchor.name} civar\u0131`;
    }
    return matchingRegion.name;
  }

  if (closestAnchor && closestDistance <= 1400) {
    return `${closestAnchor.name} civar\u0131`;
  }

  return lat >= 0 ? "A\u00e7\u0131k kuzey okyanusu" : "A\u00e7\u0131k g\u00fcney okyanusu";
}

function simulationPointSummary(local, placeLabel = "\u0130lgili b\u00f6lge") {
  const dominantLabel = {
    geomag: "jeomanyetik tepki",
    gnss: "GNSS / iyonosfer",
    hf: "HF haberle\u015fme",
  }[local?.dominant] || "operasyonel etki";
  const illumination = local?.dayFactor >= 0.55
    ? "g\u00fcnd\u00fcz taraf\u0131nda"
    : local?.nightFactor >= 0.55
      ? "gece taraf\u0131nda"
      : "g\u00fcn-gece ge\u00e7i\u015finde";
  return `${placeLabel} ${illumination} bulunuyor. Bask\u0131n etki ${dominantLabel}; genel \u015fiddet ${severityLabel(local?.overall)} band\u0131nda modelleniyor.`;
}

function renderSimulationPointDetails(selectedPoint, metrics = simulationState.metrics) {
  if (!elements.simulationPointSummary) {
    return;
  }

  if (!selectedPoint || !metrics) {
    elements.simulationPointTitle.textContent = "K\u00fcre \u00fczerinde bir nokta se\u00e7";
    elements.simulationPointBadge.textContent = "Se\u00e7im bekleniyor";
    elements.simulationPointSummary.textContent = "D\u00fcnya k\u00fcresi \u00fczerinde bir noktaya t\u0131klayarak o b\u00f6lgedeki uzay havas\u0131 etkisini inceleyebilirsin.";
    elements.simulationPointLatLon.textContent = "-";
    elements.simulationPointLocalTime.textContent = "-";
    elements.simulationPointOverall.textContent = "-";
    elements.simulationPointGeomag.textContent = "-";
    elements.simulationPointGnss.textContent = "-";
    elements.simulationPointHf.textContent = "-";
    elements.simulationPointGeomagText.textContent = "-";
    elements.simulationPointGnssText.textContent = "-";
    elements.simulationPointHfText.textContent = "-";
    elements.simulationPointGeomagBar.style.width = "0%";
    elements.simulationPointGnssBar.style.width = "0%";
    elements.simulationPointHfBar.style.width = "0%";
    elements.simulationPointBadge.style.background = "rgba(93, 225, 214, 0.14)";
    elements.simulationPointBadge.style.color = "#c8fbf7";
    return;
  }

  const rotation = simulationState.currentEarth?.rotation ?? 0;
  const local = buildSimulationLocalField(selectedPoint.lat, selectedPoint.lon, metrics, rotation);
  const palette = simulationRiskPalette(local);
  const placeLabel = simulationResolvePlaceName(local.lat, local.lon);
  elements.simulationPointTitle.textContent = placeLabel;
  elements.simulationPointBadge.textContent = local.severity;
  elements.simulationPointBadge.style.background = palette.core;
  elements.simulationPointBadge.style.color = "#fffaf5";
  elements.simulationPointSummary.textContent = simulationPointSummary(local, placeLabel);
  elements.simulationPointLatLon.textContent = simulationCoordinateLabel(local.lat, local.lon);
  elements.simulationPointLocalTime.textContent = `${formatNumber(local.localHour, 1)} saat`;
  elements.simulationPointOverall.textContent = `%${formatNumber(local.overall, 0)}`;
  elements.simulationPointGeomag.textContent = `%${formatNumber(local.geomag, 0)}`;
  elements.simulationPointGnss.textContent = `%${formatNumber(local.gnss, 0)}`;
  elements.simulationPointHf.textContent = `%${formatNumber(local.hf, 0)}`;
  elements.simulationPointGeomagText.textContent = `${severityLabel(local.geomag)} \u00b7 %${formatNumber(local.geomag, 0)}`;
  elements.simulationPointGnssText.textContent = `${severityLabel(local.gnss)} \u00b7 %${formatNumber(local.gnss, 0)}`;
  elements.simulationPointHfText.textContent = `${severityLabel(local.hf)} \u00b7 %${formatNumber(local.hf, 0)}`;
  elements.simulationPointGeomagBar.style.width = `${local.geomag}%`;
  elements.simulationPointGnssBar.style.width = `${local.gnss}%`;
  elements.simulationPointHfBar.style.width = `${local.hf}%`;
  elements.simulationPointGeomagBar.style.background = turkeyRiskColor(local.geomag);
  elements.simulationPointGnssBar.style.background = turkeyRiskColor(local.gnss);
  elements.simulationPointHfBar.style.background = turkeyRiskColor(local.hf);
}

function updateSimulationPanel(noaa, evaluation, solar = {}) {
  const metrics = buildSimulationMetrics(noaa, evaluation, solar);
  simulationState.metrics = metrics;
  simulationState.solar = solar;

  if (!elements.simulationSummary) {
    return;
  }

  elements.simulationFlowLabel.textContent = `AkÄ±ÅŸ ${describeBand(metrics.flow, "sakin", "dÃ¼zenli", "gÃ¼Ã§lÃ¼", "yoÄŸun")} | ${formatNumber(metrics.windSpeed, 0)} km/s`;
  elements.simulationImpactLabel.textContent = `Aurora ${describeBand(metrics.aurora, "dÃ¼ÅŸÃ¼k", "artan", "gÃ¼Ã§lÃ¼", "zirve")} | Kp ${formatNumber(metrics.kpObserved, 2)} -> ${formatNumber(metrics.kpForecast, 2)}`;
  elements.simulationSummary.textContent = buildSimulationSummary(metrics);
  elements.simulationWindValue.textContent = `${formatNumber(metrics.windSpeed, 0)} km/s`;
  elements.simulationAuroraValue.textContent = `${formatNumber(metrics.aurora * 100, 0)}%`;
  elements.simulationCompressionValue.textContent = `${formatNumber(metrics.compression * 100, 0)}%`;
  elements.simulationForecastValue.textContent = formatNumber(metrics.kpForecast, 2);
  elements.simulationLegend.innerHTML = buildSimulationLegend(metrics);
  renderSimulationPointDetails(simulationState.selectedPoint, metrics);
}

function createSimulationStars(count) {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    radius: 0.45 + (Math.random() * 1.8),
    alpha: 0.18 + (Math.random() * 0.55),
    twinkle: 0.6 + (Math.random() * 1.8),
    phase: Math.random() * Math.PI * 2,
    depth: Math.random(),
    drift: (Math.random() - 0.5) * 0.0009,
  }));
}

function resetSimulationParticle(particle, seeded = false) {
  particle.progress = seeded ? (Math.random() * 1.22) - 0.16 : -0.24 - (Math.random() * 0.34);
  particle.lane = (Math.random() * 2) - 1;
  particle.depth = Math.random();
  particle.size = 0.8 + (Math.random() * 2.4);
  particle.phase = Math.random() * Math.PI * 2;
  particle.speed = 0.7 + (Math.random() * 0.9);
}

function buildSimulationParticles(count) {
  return Array.from({ length: count }, () => {
    const particle = {};
    resetSimulationParticle(particle, true);
    return particle;
  });
}

function getSimulationQuality(width, height) {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "low";
  }
  const cores = navigator.hardwareConcurrency || 4;
  const area = width * height;
  if (width < 760 || area < 260000 || cores <= 4) {
    return "low";
  }
  if (width < 1040 || cores <= 6) {
    return "medium";
  }
  return "high";
}

function ensureSimulationCanvasSize() {
  const canvas = elements.spaceWeatherSimCanvas;
  if (!canvas) {
    return false;
  }

  const width = Math.max(320, Math.round(canvas.clientWidth || 320));
  const height = Math.max(280, Math.round(canvas.clientHeight || 430));
  const quality = getSimulationQuality(width, height);
  const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
  const frameIntervalMs = quality === "high" ? 34 : quality === "medium" ? 42 : 50;
  if (width === simulationState.width
    && height === simulationState.height
    && dpr === simulationState.dpr
    && quality === simulationState.quality
    && simulationState.ctx) {
    return false;
  }

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    simulationState.ctx = null;
    return false;
  }
  simulationState.ctx = ctx;
  simulationState.width = width;
  simulationState.height = height;
  simulationState.dpr = dpr;
  simulationState.quality = quality;
  simulationState.frameIntervalMs = frameIntervalMs;
  simulationState.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const minStars = quality === "high" ? 64 : quality === "medium" ? 42 : 28;
  const minParticles = quality === "high" ? 72 : quality === "medium" ? 46 : 30;
  const starsDivisor = quality === "high" ? 11 : quality === "medium" ? 16 : 22;
  const particlesDivisor = quality === "high" ? 10 : quality === "medium" ? 15 : 21;
  simulationState.stars = createSimulationStars(Math.max(minStars, Math.round(width / starsDivisor)));
  simulationState.particles = buildSimulationParticles(Math.max(minParticles, Math.round(width / particlesDivisor)));
  return true;
}

function drawSimulationBackground(ctx, width, height, time, metrics, quality) {
  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#061019");
  background.addColorStop(0.42, "#0c2132");
  background.addColorStop(0.76, "#081725");
  background.addColorStop(1, "#041018");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const leftNebula = ctx.createRadialGradient(width * 0.18, height * 0.5, 16, width * 0.18, height * 0.5, width * 0.34);
  leftNebula.addColorStop(0, "rgba(255, 166, 77, 0.18)");
  leftNebula.addColorStop(0.45, "rgba(255, 166, 77, 0.08)");
  leftNebula.addColorStop(1, "rgba(255, 166, 77, 0)");
  ctx.fillStyle = leftNebula;
  ctx.fillRect(0, 0, width, height);

  const rightNebula = ctx.createRadialGradient(width * 0.78, height * 0.4, 12, width * 0.78, height * 0.4, width * 0.3);
  rightNebula.addColorStop(0, "rgba(84, 179, 255, 0.12)");
  rightNebula.addColorStop(0.42, "rgba(84, 179, 255, 0.06)");
  rightNebula.addColorStop(1, "rgba(84, 179, 255, 0)");
  ctx.fillStyle = rightNebula;
  ctx.fillRect(0, 0, width, height);

  simulationState.stars.forEach((star) => {
    const driftX = ((((star.x + (time * star.drift * (0.2 + star.depth))) % 1) + 1) % 1) * width;
    const driftY = (star.y * height) + (Math.sin((time * 0.0002 * (1 + star.depth)) + star.phase) * star.depth * 6);
    const alpha = star.alpha * (0.45 + (0.55 * ((Math.sin((time * 0.00045 * star.twinkle) + star.phase) + 1) * 0.5)));
    const radius = star.radius * (0.55 + (star.depth * 1.25));
    ctx.fillStyle = `rgba(255, 248, 239, ${alpha})`;
    ctx.beginPath();
    ctx.arc(driftX, driftY, radius, 0, Math.PI * 2);
    ctx.fill();

    if (quality === "high" && star.depth > 0.72) {
      ctx.strokeStyle = `rgba(255, 248, 239, ${alpha * 0.22})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(driftX - (radius * 4), driftY);
      ctx.lineTo(driftX + (radius * 4), driftY);
      ctx.stroke();
    }
  });

  if (quality !== "low") {
    ctx.strokeStyle = "rgba(129, 179, 214, 0.05)";
    ctx.lineWidth = 1;
    for (let index = 1; index <= 3; index += 1) {
      const y = height * (index / 4);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  if (quality === "high") {
    ctx.save();
    ctx.strokeStyle = "rgba(84, 179, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let index = 0; index < 6; index += 1) {
      const ratio = index / 5;
      const startX = width * (0.36 + (ratio * 0.1));
      ctx.beginPath();
      ctx.moveTo(startX, 0);
      ctx.lineTo(width * 0.9, height);
      ctx.stroke();
    }
    ctx.restore();
  }

  const horizon = ctx.createRadialGradient(width * 0.76, height * 1.04, width * 0.04, width * 0.76, height * 1.04, width * 0.34);
  horizon.addColorStop(0, "rgba(79, 147, 255, 0.16)");
  horizon.addColorStop(0.7, "rgba(79, 147, 255, 0.03)");
  horizon.addColorStop(1, "rgba(79, 147, 255, 0)");
  ctx.fillStyle = horizon;
  ctx.beginPath();
  ctx.ellipse(width * 0.76, height * 1.04, width * 0.34, height * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();

  if (quality !== "low" && metrics.storminess > 0.44) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    const boltAlpha = 0.06 + ((metrics.storminess - 0.44) * 0.18);
    for (let index = 0; index < 3; index += 1) {
      const offset = ((time * 0.0001) + (index * 0.23)) % 1;
      const x = lerp(width * 0.3, width * 0.8, offset);
      ctx.strokeStyle = `rgba(120, 227, 255, ${boltAlpha * (1 - offset)})`;
      ctx.lineWidth = 1.2 + (metrics.storminess * 1.4);
      ctx.beginPath();
      ctx.moveTo(x, height * 0.2);
      ctx.lineTo(x + (12 * Math.sin(time * 0.002 + index)), height * 0.35);
      ctx.lineTo(x - (10 * Math.cos(time * 0.0018 + index)), height * 0.5);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawSimulationSun(ctx, sun, time, metrics, quality) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  const outerGlow = ctx.createRadialGradient(sun.x, sun.y, sun.r * 0.2, sun.x, sun.y, sun.r * (3 + (metrics.flow * 0.7)));
  outerGlow.addColorStop(0, "rgba(255, 214, 136, 0.36)");
  outerGlow.addColorStop(0.35, "rgba(255, 175, 84, 0.24)");
  outerGlow.addColorStop(1, "rgba(255, 175, 84, 0)");
  ctx.fillStyle = outerGlow;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.r * (3 + (metrics.flow * 0.7)), 0, Math.PI * 2);
  ctx.fill();

  const ringCount = quality === "high" ? 5 : quality === "medium" ? 3 : 2;
  for (let index = 0; index < ringCount; index += 1) {
    const phase = ((time * 0.00007 * (1 + (metrics.flow * 0.8))) + (index * 0.22)) % 1;
    const radius = sun.r * (1.32 + (phase * (4.2 + (metrics.storminess * 1.4))));
    ctx.strokeStyle = `rgba(255, 178, 82, ${(0.18 + (metrics.flow * 0.08)) * (1 - phase)})`;
    ctx.lineWidth = 3.6 - (phase * 2);
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
  ctx.clip();

  const bandCount = quality === "high" ? 8 : quality === "medium" ? 6 : 4;
  for (let band = 0; band < bandCount; band += 1) {
    const bandY = sun.y - sun.r + ((band / Math.max(1, bandCount - 1)) * sun.r * 2);
    const wobble = Math.sin((time * 0.0014) + band) * sun.r * 0.08;
    ctx.strokeStyle = `rgba(255, 238, 188, ${0.08 + ((band % 2) * 0.04)})`;
    ctx.lineWidth = sun.r * (0.08 + ((band % 3) * 0.01));
    ctx.beginPath();
    ctx.moveTo(sun.x - (sun.r * 1.1), bandY + wobble);
    ctx.bezierCurveTo(
      sun.x - (sun.r * 0.4),
      bandY - wobble,
      sun.x + (sun.r * 0.3),
      bandY + wobble,
      sun.x + (sun.r * 1.1),
      bandY - wobble,
    );
    ctx.stroke();
  }
  ctx.restore();

  const rayCount = quality === "high" ? 20 : quality === "medium" ? 12 : 8;
  for (let index = 0; index < rayCount; index += 1) {
    const angle = ((index / rayCount) * Math.PI * 2) + (time * 0.00018);
    const inner = sun.r * 0.84;
    const outer = sun.r * (1.2 + (metrics.flow * 0.28) + (0.12 * Math.sin((time * 0.0024) + index)));
    ctx.strokeStyle = `rgba(255, 196, 109, ${0.16 + (metrics.storminess * 0.1)})`;
    ctx.lineWidth = 1.4 + ((index % 3) * 0.4);
    ctx.beginPath();
    ctx.moveTo(sun.x + (Math.cos(angle) * inner), sun.y + (Math.sin(angle) * inner));
    ctx.lineTo(sun.x + (Math.cos(angle) * outer), sun.y + (Math.sin(angle) * outer));
    ctx.stroke();
  }

  const flareCount = quality === "high" ? 4 : quality === "medium" ? 3 : 2;
  for (let index = 0; index < flareCount; index += 1) {
    const phase = ((time * 0.00016) + (index * 0.21)) % 1;
    const arcRadius = sun.r * (0.94 + (index * 0.08));
    const flareLength = sun.r * (0.42 + (metrics.flow * 0.26));
    const flareAngle = -0.38 + (index * 0.28);
    ctx.strokeStyle = `rgba(255, 189, 104, ${(0.16 + (metrics.storminess * 0.1)) * (1 - phase)})`;
    ctx.lineWidth = 2.2 - (index * 0.3);
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, arcRadius, flareAngle, flareAngle + 0.86);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(
      sun.x + (Math.cos(flareAngle + 0.8) * arcRadius),
      sun.y + (Math.sin(flareAngle + 0.8) * arcRadius),
    );
    ctx.lineTo(
      sun.x + (Math.cos(flareAngle + 0.8) * (arcRadius + flareLength * (1 - phase))),
      sun.y + (Math.sin(flareAngle + 0.8) * (arcRadius + flareLength * (1 - phase))),
    );
    ctx.stroke();
  }

  const core = ctx.createRadialGradient(sun.x - (sun.r * 0.18), sun.y - (sun.r * 0.22), sun.r * 0.12, sun.x, sun.y, sun.r);
  core.addColorStop(0, "#fff7d8");
  core.addColorStop(0.36, "#ffd58b");
  core.addColorStop(0.7, "#ff9f43");
  core.addColorStop(1, "#d55c20");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
  ctx.fill();

  const hotSpot = ctx.createRadialGradient(sun.x - (sun.r * 0.32), sun.y - (sun.r * 0.28), 0, sun.x - (sun.r * 0.32), sun.y - (sun.r * 0.28), sun.r * 0.72);
  hotSpot.addColorStop(0, "rgba(255, 253, 229, 0.6)");
  hotSpot.addColorStop(1, "rgba(255, 253, 229, 0)");
  ctx.fillStyle = hotSpot;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (quality === "high") {
    drawSolarLensFlare(ctx, sun, time, metrics);
  }
}

function drawSolarLensFlare(ctx, sun, time, metrics) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const orbit = [
    { offset: 0.34, radius: sun.r * 0.2 },
    { offset: 0.56, radius: sun.r * 0.12 },
    { offset: 0.72, radius: sun.r * 0.08 },
  ];
  orbit.forEach((item, index) => {
    const x = sun.x + (item.offset * (320 + (metrics.flow * 80)));
    const y = sun.y + (Math.sin((time * 0.0008) + index) * 10);
    const flare = ctx.createRadialGradient(x, y, 0, x, y, item.radius * 2.6);
    flare.addColorStop(0, `rgba(255, 214, 140, ${0.18 - (index * 0.04)})`);
    flare.addColorStop(1, "rgba(255, 214, 140, 0)");
    ctx.fillStyle = flare;
    ctx.beginPath();
    ctx.arc(x, y, item.radius * 2.6, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawSimulationFlowBands(ctx, sun, earth, time, metrics, width, height) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let band = -2; band <= 2; band += 1) {
    const offset = band * (height * 0.1);
    const wobble = Math.sin((time * 0.0012) + band) * (12 + (metrics.flow * 22));
    ctx.strokeStyle = `rgba(117, 203, 255, ${0.08 + (Math.abs(band) === 0 ? 0.08 : 0.03) + (metrics.flow * 0.08)})`;
    ctx.lineWidth = 1.2 + ((2 - Math.abs(band)) * 0.8);
    ctx.beginPath();
    ctx.moveTo(sun.x + (sun.r * 0.88), sun.y + offset);
    ctx.bezierCurveTo(
      width * 0.34,
      (height * 0.5) + offset + wobble,
      width * 0.52,
      (height * 0.5) + offset - (wobble * 0.55),
      earth.x - (earth.r * (1.8 - (metrics.compression * 0.5))),
      earth.y + (offset * 0.76),
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawSimulationParticles(ctx, sun, earth, time, metrics, deltaSeconds, width, height, quality) {
  const startX = sun.x + (sun.r * 0.9);
  const endX = earth.x - (earth.r * (1.85 - (metrics.compression * 0.55)));
  const travel = 0.16 + (metrics.flow * 0.38);
  const trailLength = quality === "high" ? 4.4 : quality === "medium" ? 3.4 : 2.5;
  const drawTrails = quality !== "low";
  simulationState.particles.forEach((particle) => {
    particle.progress += deltaSeconds * travel * particle.speed * (0.7 + (particle.depth * 0.9));
    if (particle.progress > 1.12) {
      resetSimulationParticle(particle);
    }

    const envelope = Math.sin(clamp(particle.progress, 0, 1) * Math.PI);
    const x = lerp(startX, endX, particle.progress);
    const laneYOffset = particle.lane * (height * 0.22) * (0.32 + (metrics.flow * 0.42));
    const wave = Math.sin((particle.progress * 10.5) + (time * 0.003) + particle.phase) * (8 + (particle.depth * 18) + (metrics.storminess * 20));
    const y = lerp(sun.y, earth.y, particle.progress) + laneYOffset + (wave * envelope);
    const alpha = clamp((0.14 + (particle.depth * 0.22) + (metrics.flow * 0.24)) * envelope, 0, 0.75);
    const size = particle.size + (metrics.flow * 0.9);
    if (drawTrails) {
      ctx.strokeStyle = `rgba(156, 228, 255, ${alpha * 0.52})`;
      ctx.lineWidth = Math.max(1, size * 0.85);
      ctx.beginPath();
      ctx.moveTo(x - (size * trailLength), y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.fillStyle = `rgba(225, 248, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawMagnetosphereShell(ctx, earth, metrics) {
  const frontX = earth.x - (earth.r * (1.18 - (metrics.compression * 0.36)));
  const topY = earth.y - (earth.r * (2.25 + (metrics.flow * 0.3)));
  const bottomY = earth.y + (earth.r * (2.25 + (metrics.flow * 0.3)));
  const tailX = earth.x + (earth.r * (3.6 + (metrics.storminess * 2.1)));
  const shell = ctx.createLinearGradient(frontX, earth.y, tailX, earth.y);
  shell.addColorStop(0, "rgba(104, 203, 255, 0.16)");
  shell.addColorStop(0.4, "rgba(61, 136, 255, 0.07)");
  shell.addColorStop(1, "rgba(61, 136, 255, 0)");
  ctx.fillStyle = shell;
  ctx.beginPath();
  ctx.moveTo(frontX, earth.y);
  ctx.bezierCurveTo(
    earth.x - (earth.r * 0.55),
    topY,
    earth.x + (earth.r * 1.4),
    topY,
    tailX,
    earth.y - (earth.r * 0.78),
  );
  ctx.bezierCurveTo(
    earth.x + (earth.r * 2.1),
    earth.y - (earth.r * 0.28),
    earth.x + (earth.r * 2.1),
    earth.y + (earth.r * 0.28),
    tailX,
    earth.y + (earth.r * 0.78),
  );
  ctx.bezierCurveTo(
    earth.x + (earth.r * 1.4),
    bottomY,
    earth.x - (earth.r * 0.55),
    bottomY,
    frontX,
    earth.y,
  );
  ctx.closePath();
  ctx.fill();
}

function drawMagnetosphere(ctx, earth, time, metrics, quality) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  drawMagnetosphereShell(ctx, earth, metrics);

  const frontX = earth.x - (earth.r * (1.25 - (metrics.compression * 0.42)));
  const tailX = earth.x + (earth.r * (3.1 + (metrics.storminess * 2.4)));
  const bands = [0.46, 0.82, 1.18, 1.52];
  const activeBands = quality === "low" ? bands.slice(0, 2) : bands;
  const tailLayers = quality === "high" ? 3 : quality === "medium" ? 2 : 1;

  for (let layer = 0; layer < tailLayers; layer += 1) {
    const tailSpread = earth.r * (0.6 + (layer * 0.28) + (metrics.flow * 0.16));
    const tailAlpha = 0.04 + ((2 - layer) * 0.02) + (metrics.flow * 0.03);
    const tailGradient = ctx.createLinearGradient(earth.x, earth.y, tailX, earth.y);
    tailGradient.addColorStop(0, `rgba(109, 196, 255, ${tailAlpha})`);
    tailGradient.addColorStop(0.45, `rgba(109, 196, 255, ${tailAlpha * 0.48})`);
    tailGradient.addColorStop(1, "rgba(109, 196, 255, 0)");
    ctx.fillStyle = tailGradient;
    ctx.beginPath();
    ctx.moveTo(earth.x + (earth.r * 0.78), earth.y - (tailSpread * 0.42));
    ctx.bezierCurveTo(
      earth.x + (earth.r * 1.4),
      earth.y - tailSpread,
      earth.x + (earth.r * (2.1 + (layer * 0.2))),
      earth.y - tailSpread,
      tailX,
      earth.y - (tailSpread * 0.2),
    );
    ctx.lineTo(tailX, earth.y + (tailSpread * 0.2));
    ctx.bezierCurveTo(
      earth.x + (earth.r * (2.1 + (layer * 0.2))),
      earth.y + tailSpread,
      earth.x + (earth.r * 1.4),
      earth.y + tailSpread,
      earth.x + (earth.r * 0.78),
      earth.y + (tailSpread * 0.42),
    );
    ctx.closePath();
    ctx.fill();
  }

  ctx.strokeStyle = `rgba(118, 213, 255, ${0.26 + (metrics.shield * 0.1)})`;
  ctx.lineCap = "round";
  activeBands.forEach((band, index) => {
    [-1, 1].forEach((sign) => {
      const offset = sign * earth.r * band;
      const flutter = Math.sin((time * 0.0018) + (index * 0.9) + (sign * 0.7)) * earth.r * (0.08 + (metrics.storminess * 0.06));
      ctx.lineWidth = 1.4 + ((bands.length - index) * 0.32);
      ctx.beginPath();
      ctx.moveTo(frontX, earth.y + (offset * 0.16));
      ctx.bezierCurveTo(
        earth.x - (earth.r * (0.6 + (metrics.compression * 0.28))),
        earth.y + (offset * (1.02 + (metrics.flow * 0.24))),
        earth.x + (earth.r * (0.95 + (metrics.flow * 0.36))),
        earth.y + (offset * (1.58 + (metrics.flow * 0.44))) + flutter,
        tailX,
        earth.y + (offset * (1.1 + (metrics.flow * 0.34))) + flutter,
      );
      ctx.stroke();
    });
  });

  const frontArcCount = quality === "low" ? 2 : 4;
  for (let index = 0; index < frontArcCount; index += 1) {
    ctx.strokeStyle = `rgba(174, 231, 255, ${0.16 - (index * 0.025) + (metrics.flow * 0.07)})`;
    ctx.lineWidth = 2 - (index * 0.26);
    ctx.beginPath();
    ctx.ellipse(
      earth.x - (earth.r * (1.38 - (metrics.compression * 0.4))) - (index * earth.r * 0.16),
      earth.y,
      earth.r * (1.02 + (index * 0.24) - (metrics.compression * 0.16)),
      earth.r * (1.88 + (index * 0.18)),
      0,
      Math.PI * 0.6,
      Math.PI * 1.4,
    );
    ctx.stroke();
  }

  const shockX = earth.x - (earth.r * (2.35 - (metrics.compression * 0.85)));
  const shockAlpha = 0.16 + (metrics.flow * 0.1) + (metrics.southward * 0.08);
  const shockCount = quality === "high" ? 3 : quality === "medium" ? 2 : 1;
  for (let index = 0; index < shockCount; index += 1) {
    ctx.strokeStyle = `rgba(255, 226, 149, ${shockAlpha - (index * 0.04)})`;
    ctx.lineWidth = 2.6 - (index * 0.5);
    ctx.beginPath();
    ctx.ellipse(
      shockX - (index * earth.r * 0.1),
      earth.y,
      earth.r * (0.78 + (index * 0.12)),
      earth.r * (1.9 + (index * 0.16)),
      0,
      Math.PI * 0.56,
      Math.PI * 1.44,
    );
    ctx.stroke();
  }

  ctx.restore();
}

function projectSpherePoint(earth, longitude, latitude, rotation, tilt) {
  const lon = longitude + rotation;
  const cosLat = Math.cos(latitude);
  const x = cosLat * Math.sin(lon);
  const y = Math.sin(latitude);
  const z = cosLat * Math.cos(lon);
  const yTilt = (y * Math.cos(tilt)) - (z * Math.sin(tilt));
  const zTilt = (y * Math.sin(tilt)) + (z * Math.cos(tilt));
  return {
    x: earth.x + (x * earth.r * 0.96),
    y: earth.y + (yTilt * earth.r * 0.96),
    visible: zTilt >= -0.015,
    depth: zTilt,
  };
}

function strokeProjectedSpherePath(ctx, points) {
  ctx.beginPath();
  let drawing = false;
  points.forEach((point) => {
    if (point.visible) {
      if (!drawing) {
        ctx.moveTo(point.x, point.y);
        drawing = true;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    } else {
      drawing = false;
    }
  });
  ctx.stroke();
}

function drawEarthGrid(ctx, earth, rotation, tilt) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = "rgba(183, 233, 255, 0.18)";
  ctx.lineWidth = 1;

  [-60, -30, 0, 30, 60].forEach((latitudeDegrees) => {
    const latitude = latitudeDegrees * (Math.PI / 180);
    const points = [];
    for (let step = 0; step <= 80; step += 1) {
      const longitude = -Math.PI + ((step / 80) * Math.PI * 2);
      points.push(projectSpherePoint(earth, longitude, latitude, rotation, tilt));
    }
    strokeProjectedSpherePath(ctx, points);
  });

  [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].forEach((longitudeDegrees, index) => {
    const longitude = longitudeDegrees * (Math.PI / 180);
    ctx.strokeStyle = `rgba(183, 233, 255, ${0.08 + ((index % 3) * 0.03)})`;
    const points = [];
    for (let step = 0; step <= 72; step += 1) {
      const latitude = (-Math.PI / 2) + ((step / 72) * Math.PI);
      points.push(projectSpherePoint(earth, longitude, latitude, rotation, tilt));
    }
    strokeProjectedSpherePath(ctx, points);
  });
  ctx.restore();
}

function drawEarthCloudLayer(ctx, earth, time) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineCap = "round";
  for (let index = 0; index < 6; index += 1) {
    const ratio = index / 5;
    const cloudY = earth.y - (earth.r * 0.58) + (ratio * earth.r * 1.16);
    const wobble = Math.sin((time * 0.00055) + index) * earth.r * 0.1;
    ctx.lineWidth = earth.r * (0.04 + ((index % 2) * 0.012));
    ctx.beginPath();
    ctx.ellipse(
      earth.x + wobble,
      cloudY,
      earth.r * (0.46 - (Math.abs(index - 2.5) * 0.035)),
      earth.r * (0.08 + ((index % 3) * 0.008)),
      0.08 * index,
      0,
      Math.PI * 2,
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawEarthNightLights(ctx, earth, rotation, tilt) {
  const clusters = [
    { lon: -0.25, lat: 0.45, size: 0.11, alpha: 0.18 },
    { lon: 0.32, lat: 0.22, size: 0.09, alpha: 0.16 },
    { lon: 0.54, lat: -0.08, size: 0.08, alpha: 0.14 },
    { lon: 1.08, lat: 0.3, size: 0.1, alpha: 0.16 },
    { lon: 1.18, lat: -0.22, size: 0.09, alpha: 0.12 },
  ];

  clusters.forEach((cluster) => {
    const point = projectSpherePoint(earth, cluster.lon, cluster.lat, rotation, tilt);
    if (!point.visible || point.x < earth.x) {
      return;
    }
    const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, earth.r * cluster.size * 1.9);
    glow.addColorStop(0, `rgba(255, 209, 117, ${cluster.alpha})`);
    glow.addColorStop(1, "rgba(255, 209, 117, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(point.x, point.y, earth.r * cluster.size * 1.9, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawEarthLandBlob(ctx, earth, blob, rotation) {
  const xNorm = ((((blob.phase + rotation) % 1) + 1) % 1) * 2.2 - 1.1;
  const edgeFactor = Math.cos(clamp(Math.abs(xNorm) / 1.1, 0, 1) * Math.PI * 0.5);
  const radiusX = earth.r * blob.rx * Math.max(0.2, edgeFactor);
  if (radiusX < 2) {
    return;
  }

  ctx.save();
  ctx.translate(earth.x + (xNorm * earth.r * 0.72), earth.y + (blob.y * earth.r * 0.78));
  ctx.rotate(blob.rotation);
  ctx.beginPath();
  ctx.ellipse(0, 0, radiusX, earth.r * blob.ry, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawEarth(ctx, earth, time, metrics, quality, rotation = 0, tilt = -0.42) {
  ctx.save();
  const detailed = quality === "high";
  const showGrid = quality !== "low";

  const dropShadow = ctx.createRadialGradient(earth.x + (earth.r * 0.26), earth.y + (earth.r * 0.2), earth.r * 0.1, earth.x + (earth.r * 0.26), earth.y + (earth.r * 0.2), earth.r * 1.4);
  dropShadow.addColorStop(0, "rgba(0, 0, 0, 0.28)");
  dropShadow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = dropShadow;
  ctx.beginPath();
  ctx.arc(earth.x + (earth.r * 0.18), earth.y + (earth.r * 0.16), earth.r * 1.34, 0, Math.PI * 2);
  ctx.fill();

  const atmosphere = ctx.createRadialGradient(earth.x, earth.y, earth.r * 0.82, earth.x, earth.y, earth.r * (1.56 + (metrics.aurora * 0.18)));
  atmosphere.addColorStop(0, "rgba(67, 166, 255, 0)");
  atmosphere.addColorStop(0.62, `rgba(67, 166, 255, ${0.18 + (metrics.aurora * 0.14)})`);
  atmosphere.addColorStop(1, "rgba(67, 166, 255, 0)");
  ctx.fillStyle = atmosphere;
  ctx.beginPath();
  ctx.arc(earth.x, earth.y, earth.r * (1.56 + (metrics.aurora * 0.14)), 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(earth.x, earth.y, earth.r, 0, Math.PI * 2);
  ctx.clip();

  const ocean = ctx.createRadialGradient(earth.x - (earth.r * 0.38), earth.y - (earth.r * 0.46), earth.r * 0.08, earth.x, earth.y, earth.r * 1.08);
  ocean.addColorStop(0, "#9ce9ff");
  ocean.addColorStop(0.28, "#2d97dc");
  ocean.addColorStop(0.68, "#0a568d");
  ocean.addColorStop(1, "#041f38");
  ctx.fillStyle = ocean;
  ctx.fillRect(earth.x - earth.r, earth.y - earth.r, earth.r * 2, earth.r * 2);

  if (detailed) {
    drawEarthNightLights(ctx, earth, rotation, tilt);
  }
  const continents = [
    { phase: 0.08, y: -0.12, rx: 0.23, ry: 0.14, rotation: -0.34 },
    { phase: 0.2, y: 0.22, rx: 0.18, ry: 0.12, rotation: 0.42 },
    { phase: 0.38, y: -0.26, rx: 0.15, ry: 0.09, rotation: -0.1 },
    { phase: 0.54, y: 0.02, rx: 0.28, ry: 0.16, rotation: 0.08 },
    { phase: 0.72, y: 0.2, rx: 0.16, ry: 0.12, rotation: -0.56 },
    { phase: 0.87, y: -0.02, rx: 0.2, ry: 0.1, rotation: 0.28 },
  ];

  ctx.fillStyle = "rgba(105, 197, 115, 0.9)";
  const continentCount = detailed ? continents.length : 4;
  const landRotation = (rotation / (Math.PI * 2)) % 1;
  continents.slice(0, continentCount).forEach((blob) => drawEarthLandBlob(ctx, earth, blob, landRotation));

  if (showGrid) {
    drawEarthGrid(ctx, earth, rotation, tilt);
  }
  drawEarthImpactField(ctx, earth, metrics, rotation, tilt, quality);
  if (detailed) {
    drawEarthCloudLayer(ctx, earth, time);
  }

  const specular = ctx.createRadialGradient(earth.x - (earth.r * 0.36), earth.y - (earth.r * 0.34), 0, earth.x - (earth.r * 0.36), earth.y - (earth.r * 0.34), earth.r * 0.74);
  specular.addColorStop(0, "rgba(255, 255, 255, 0.38)");
  specular.addColorStop(0.4, "rgba(255, 255, 255, 0.12)");
  specular.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = specular;
  ctx.fillRect(earth.x - earth.r, earth.y - earth.r, earth.r * 2, earth.r * 2);

  const light = ctx.createLinearGradient(earth.x - earth.r, earth.y, earth.x + earth.r, earth.y);
  light.addColorStop(0, "rgba(255, 248, 226, 0.44)");
  light.addColorStop(0.3, "rgba(255, 248, 226, 0.12)");
  light.addColorStop(0.56, "rgba(0, 0, 0, 0.06)");
  light.addColorStop(1, "rgba(0, 0, 0, 0.54)");
  ctx.fillStyle = light;
  ctx.fillRect(earth.x - earth.r, earth.y - earth.r, earth.r * 2, earth.r * 2);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(177, 225, 255, 0.58)";
  ctx.lineWidth = 1.8;
  ctx.shadowColor = "rgba(90, 192, 255, 0.34)";
  ctx.shadowBlur = detailed ? 12 : 7;
  ctx.beginPath();
  ctx.arc(earth.x, earth.y, earth.r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawAurora(ctx, earth, time, metrics, quality) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  const allLayers = [
    { color: "99, 240, 160", width: 6.2, alpha: 0.18 },
    { color: "104, 214, 255", width: 4.6, alpha: 0.14 },
    { color: "255, 210, 116", width: 2.8, alpha: 0.08 },
  ];
  const layers = quality === "high" ? allLayers : quality === "medium" ? allLayers.slice(0, 2) : allLayers.slice(0, 1);
  const curtainSteps = quality === "high" ? 34 : quality === "medium" ? 24 : 14;

  [-1, 1].forEach((sign) => {
    const curtain = [];
    for (let step = 0; step <= curtainSteps; step += 1) {
      const ratio = step / curtainSteps;
      const x = earth.x - (earth.r * 0.62) + (ratio * earth.r * 1.24);
      const arch = Math.sin(ratio * Math.PI) * earth.r * (0.18 + (metrics.aurora * 0.18));
      const wave = Math.sin((ratio * Math.PI * 4) + (time * 0.0031) + (sign * 0.45)) * earth.r * (0.02 + (metrics.aurora * 0.03));
      curtain.push({
        x,
        y: earth.y + (sign * ((earth.r * 0.66) + arch + wave)),
      });
    }

    ctx.fillStyle = `rgba(99, 240, 160, ${0.06 + (metrics.aurora * 0.08)})`;
    ctx.beginPath();
    curtain.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    for (let index = curtain.length - 1; index >= 0; index -= 1) {
      const point = curtain[index];
      const settle = earth.y + (sign * (earth.r * 0.52));
      ctx.lineTo(point.x, settle);
    }
    ctx.closePath();
    ctx.fill();

    layers.forEach((layer, layerIndex) => {
      ctx.strokeStyle = `rgba(${layer.color}, ${layer.alpha + (metrics.aurora * 0.14)})`;
      ctx.lineWidth = layer.width + (metrics.aurora * 3.2) - (layerIndex * 0.5);
      ctx.shadowColor = `rgba(${layer.color}, ${0.18 + (metrics.aurora * 0.24)})`;
      ctx.shadowBlur = 12 + (metrics.aurora * 24);
      ctx.beginPath();
      for (let step = 0; step < curtain.length; step += 1) {
        const point = curtain[step];
        const wobble = Math.sin((time * 0.0024) + step + layerIndex) * earth.r * (0.008 + (layerIndex * 0.003));
        if (step === 0) {
          ctx.moveTo(point.x, point.y + wobble);
        } else {
          ctx.lineTo(point.x, point.y + wobble);
        }
      }
      ctx.stroke();
    });
  });

  ctx.restore();
}

function drawImpactHalo(ctx, earth, time, metrics) {
  if (metrics.storminess < 0.3) {
    return;
  }

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const ringCount = 3;
  for (let index = 0; index < ringCount; index += 1) {
    const phase = ((time * 0.00009) + (index * 0.22)) % 1;
    const radius = earth.r * (1.28 + (phase * (1.3 + (metrics.storminess * 0.7))));
    ctx.strokeStyle = `rgba(127, 215, 255, ${(0.16 + (metrics.storminess * 0.08)) * (1 - phase)})`;
    ctx.lineWidth = 2.4 - (phase * 1.5);
    ctx.beginPath();
    ctx.arc(earth.x, earth.y, radius, -0.24 * Math.PI, 0.24 * Math.PI);
    ctx.stroke();
  }
  ctx.restore();
}

function drawForegroundMagnetosphere(ctx, earth, time, metrics) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const bowX = earth.x - (earth.r * (1.64 - (metrics.compression * 0.42)));
  for (let index = 0; index < 3; index += 1) {
    const shimmer = Math.sin((time * 0.0016) + index) * earth.r * 0.03;
    ctx.strokeStyle = `rgba(132, 224, 255, ${0.16 - (index * 0.035) + (metrics.flow * 0.05)})`;
    ctx.lineWidth = 2.2 - (index * 0.34);
    ctx.beginPath();
    ctx.ellipse(
      bowX - (index * earth.r * 0.08),
      earth.y + shimmer,
      earth.r * (0.76 + (index * 0.08)),
      earth.r * (1.52 + (index * 0.16)),
      0,
      Math.PI * 0.64,
      Math.PI * 1.36,
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawEarthImpactField(ctx, earth, metrics, rotation, tilt, quality) {
  const lonStep = quality === "high" ? 12 : quality === "medium" ? 16 : 20;
  const latStep = quality === "high" ? 10 : quality === "medium" ? 14 : 18;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let lat = -72; lat <= 72; lat += latStep) {
    for (let lon = -180; lon < 180; lon += lonStep) {
      const local = buildSimulationLocalField(lat, lon, metrics, rotation);
      const intensity = local.overall / 100;
      if (intensity < 0.12) continue;
      const point = projectSpherePoint(
        earth,
        lon * (Math.PI / 180),
        lat * (Math.PI / 180),
        rotation,
        tilt,
      );
      if (!point.visible) continue;
      const palette = simulationRiskPalette(local);
      const depthFactor = clamp(0.42 + (point.depth * 0.58), 0.32, 1);
      const radius = earth.r * (0.055 + (intensity * 0.1)) * depthFactor * (quality === "low" ? 1.2 : 1);
      const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 2.1);
      glow.addColorStop(0, palette.core);
      glow.addColorStop(0.55, palette.glow);
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius * 2.1, 0, Math.PI * 2);
      ctx.fill();

      if (quality === "high" && intensity >= 0.55) {
        ctx.strokeStyle = palette.solid;
        ctx.globalAlpha = 0.08 + (intensity * 0.12);
        ctx.lineWidth = Math.max(0.8, earth.r * 0.01);
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius * 1.18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
  ctx.restore();
}

function drawSimulationSelectedPoint(ctx, earth, time, metrics) {
  if (!simulationState.selectedPoint || !simulationState.currentEarth) {
    return;
  }

  const point = projectSpherePoint(
    earth,
    simulationState.selectedPoint.lon * (Math.PI / 180),
    simulationState.selectedPoint.lat * (Math.PI / 180),
    simulationState.currentEarth.rotation,
    simulationState.currentEarth.tilt,
  );
  if (!point.visible) {
    return;
  }

  const local = buildSimulationLocalField(
    simulationState.selectedPoint.lat,
    simulationState.selectedPoint.lon,
    metrics,
    simulationState.currentEarth.rotation,
  );
  const palette = simulationRiskPalette(local);
  const pulse = 1 + (((Math.sin(time * 0.004) + 1) * 0.5) * 0.42);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.strokeStyle = palette.solid;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(point.x, point.y, earth.r * 0.04 * pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = `rgba(255,255,255,0.75)`;
  ctx.beginPath();
  ctx.arc(point.x, point.y, earth.r * 0.02, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(point.x, point.y, earth.r * 0.009, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function simulationCanvasPointToSphere(clientX, clientY) {
  const canvas = elements.spaceWeatherSimCanvas;
  const earth = simulationState.currentEarth;
  if (!canvas || !earth) {
    return null;
  }
  const rect = canvas.getBoundingClientRect();
  const canvasX = clientX - rect.left;
  const canvasY = clientY - rect.top;
  const scale = earth.r * 0.96;
  const nx = (canvasX - earth.x) / scale;
  const nyTilt = (canvasY - earth.y) / scale;
  const radial = (nx * nx) + (nyTilt * nyTilt);
  if (radial > 1) {
    return null;
  }
  const zTilt = Math.sqrt(Math.max(0, 1 - radial));
  const y = (nyTilt * Math.cos(earth.tilt)) + (zTilt * Math.sin(earth.tilt));
  const z = (-nyTilt * Math.sin(earth.tilt)) + (zTilt * Math.cos(earth.tilt));
  const latitude = Math.asin(clamp(y, -1, 1)) * (180 / Math.PI);
  const longitude = normalizeLongitudeDegrees((Math.atan2(nx, z) - earth.rotation) * (180 / Math.PI));
  return {
    lat: latitude,
    lon: longitude,
  };
}

function bindSimulationInteraction() {
  const canvas = elements.spaceWeatherSimCanvas;
  if (!canvas || simulationState.interactionBound) {
    return;
  }

  const updateCursor = (event) => {
    canvas.style.cursor = simulationCanvasPointToSphere(event.clientX, event.clientY) ? "crosshair" : "default";
  };

  canvas.addEventListener("pointermove", updateCursor);
  canvas.addEventListener("pointerleave", () => {
    canvas.style.cursor = "default";
  });
  canvas.addEventListener("click", (event) => {
    const point = simulationCanvasPointToSphere(event.clientX, event.clientY);
    if (!point) {
      return;
    }
    simulationState.selectedPoint = point;
    renderSimulationPointDetails(simulationState.selectedPoint, simulationState.metrics);
  });
  simulationState.interactionBound = true;
}

function renderSimulationFrame(timestamp) {
  if (!elements.spaceWeatherSimCanvas) {
    return;
  }

  ensureSimulationCanvasSize();
  const ctx = simulationState.ctx;
  if (!ctx) {
    simulationState.frameId = window.requestAnimationFrame(renderSimulationFrame);
    return;
  }

  if (document.hidden) {
    simulationState.lastTime = timestamp;
    simulationState.frameId = window.requestAnimationFrame(renderSimulationFrame);
    return;
  }

  const canvasRect = elements.spaceWeatherSimCanvas.getBoundingClientRect();
  const isInViewport = canvasRect.bottom > 0
    && canvasRect.top < window.innerHeight
    && canvasRect.right > 0
    && canvasRect.left < window.innerWidth;
  if (!isInViewport) {
    simulationState.lastTime = timestamp;
    simulationState.frameId = window.requestAnimationFrame(renderSimulationFrame);
    return;
  }

  const elapsedMs = simulationState.lastTime
    ? (timestamp - simulationState.lastTime)
    : simulationState.frameIntervalMs;
  if (elapsedMs < simulationState.frameIntervalMs) {
    simulationState.frameId = window.requestAnimationFrame(renderSimulationFrame);
    return;
  }

  const width = simulationState.width;
  const height = simulationState.height;
  const quality = simulationState.quality || "high";
  const metrics = simulationState.metrics || buildSimulationMetrics({}, {});
  const deltaSeconds = Math.min(0.06, elapsedMs / 1000);
  simulationState.lastTime = timestamp;
  const rotation = (timestamp * 0.000036 * (0.82 + (metrics.flow * 0.24))) % (Math.PI * 2);
  const tilt = -0.42;

  const sun = {
    x: width * 0.14,
    y: height * 0.51,
    r: Math.min(width, height) * 0.115,
  };
  const earth = {
    x: width * 0.7,
    y: height * 0.52,
    r: Math.min(width, height) * 0.18,
  };
  simulationState.currentEarth = { ...earth, rotation, tilt };

  drawSimulationBackground(ctx, width, height, timestamp, metrics, quality);
  drawSimulationSun(ctx, sun, timestamp, metrics, quality);
  drawSimulationFlowBands(ctx, sun, earth, timestamp, metrics, width, height);
  drawSimulationParticles(ctx, sun, earth, timestamp, metrics, deltaSeconds, width, height, quality);
  drawMagnetosphere(ctx, earth, timestamp, metrics, quality);
  if (quality !== "low") {
    drawImpactHalo(ctx, earth, timestamp, metrics);
  }
  drawEarth(ctx, earth, timestamp, metrics, quality, rotation, tilt);
  if (quality !== "low") {
    drawAurora(ctx, earth, timestamp, metrics, quality);
  }
  if (quality === "high") {
    drawForegroundMagnetosphere(ctx, earth, timestamp, metrics);
  }
  drawSimulationSelectedPoint(ctx, earth, timestamp, metrics);

  if (simulationState.selectedPoint && (!simulationState.lastPointRenderAt || (timestamp - simulationState.lastPointRenderAt) > 450)) {
    simulationState.lastPointRenderAt = timestamp;
    renderSimulationPointDetails(simulationState.selectedPoint, metrics);
  }

  ctx.save();
  ctx.fillStyle = "rgba(247, 242, 232, 0.78)";
  ctx.font = "600 13px 'Segoe UI', sans-serif";
  ctx.fillText("SOLAR FLOW", width * 0.1, height * 0.1);
  ctx.fillText("EARTH IMPACT FIELD", width * 0.54, height * 0.14);
  ctx.fillText(`Kp ${formatNumber(metrics.kpObserved, 2)} / ${formatNumber(metrics.kpForecast, 2)} | X-ray ${metrics.xrayBand}`, width * 0.54, height * 0.18);
  ctx.restore();

  simulationState.frameId = window.requestAnimationFrame(renderSimulationFrame);
}

function startSimulation() {
  if (!elements.spaceWeatherSimCanvas || simulationState.frameId) {
    return;
  }
  const ready = ensureSimulationCanvasSize();
  if (!ready || !simulationState.ctx) {
    if (elements.simulationSummary) {
      elements.simulationSummary.textContent = "SimÃ¼lasyon bu tarayÄ±cÄ±da baÅŸlatÄ±lamadÄ±; canlÄ± veriler panelin diÄŸer bÃ¶lÃ¼mlerinde akmaya devam ediyor.";
    }
    return;
  }
  bindSimulationInteraction();
  updateSimulationPanel({}, {}, {});
  simulationState.frameId = window.requestAnimationFrame(renderSimulationFrame);
}

function safeBootStage(label, task) {
  try {
    task();
  } catch (error) {
    console.error(`Boot stage failed: ${label}`, error);
    if (elements.statusLine) {
      const baseMessage = elements.statusLine.textContent || "Panel yÃ¼kleniyor.";
      elements.statusLine.textContent = `${baseMessage} ${label} modÃ¼lÃ¼ gÃ¼venli kipte atlandÄ±.`;
    }
  }
}

function initSolarTabs() {
  if (!elements.solarContent) {
    return;
  }
  const tabs = Array.from(elements.solarContent.querySelectorAll("[data-solar-tab]"));
  const cards = Array.from(elements.solarContent.querySelectorAll(".solar-card"));
  if (!tabs.length || !cards.length) {
    return;
  }
  const groupsByIndex = [
    "overview",
    "overview",
    "overview",
    "overview",
    "overview",
    "overview",
    "radiation",
    "ionosphere",
    "magnetosphere",
    "operations",
  ];
  const applyTab = (selectedTab) => {
    tabs.forEach((button) => {
      const isActive = button.dataset.solarTab === selectedTab;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    cards.forEach((card, index) => {
      const group = card.dataset.solarGroup || groupsByIndex[index] || "overview";
      const hidden = selectedTab !== "all" && group !== selectedTab;
      card.classList.toggle("is-hidden", hidden);
    });
  };
  tabs.forEach((button) => {
    button.addEventListener("click", () => applyTab(button.dataset.solarTab || "overview"));
  });
  const defaultTab = tabs.find((button) => button.classList.contains("is-active"))?.dataset.solarTab || "overview";
  applyTab(defaultTab);
}

function initSolarToggle() {
  if (!elements.solarPanel || !elements.solarToggle || !elements.solarContent) {
    return;
  }
  const updateToggle = (isOpen) => {
    const title = elements.solarToggle.querySelector(".solar-toggle-title");
    const subtitle = elements.solarToggle.querySelector(".solar-toggle-subtitle");
    if (title && subtitle) {
      title.textContent = isOpen ? "DetaylÄ± veriyi kapat" : "DetaylÄ± veriyi aÃ§";
      subtitle.textContent = isOpen
        ? "GÃ¼neÅŸ, radyasyon, iyonosfer ve operasyon kartlarÄ± aÃ§Ä±k"
        : "GÃ¼neÅŸ kaynaklarÄ±, radyasyon, iyonosfer ve operasyon katmanlarÄ±";
    } else {
      elements.solarToggle.textContent = isOpen ? "DetaylÄ± veriyi kapat" : "DetaylÄ± veriyi aÃ§";
    }
    elements.solarToggle.classList.toggle("is-open", isOpen);
  };
  updateToggle(elements.solarPanel.classList.contains("is-open"));
  initSolarTabs();
  elements.solarToggle.addEventListener("click", () => {
    const isOpen = elements.solarPanel.classList.toggle("is-open");
    updateToggle(isOpen);
    elements.solarToggle.setAttribute("aria-expanded", String(isOpen));
    elements.solarContent.setAttribute("aria-hidden", String(!isOpen));
  });
}

function renderDashboard(data) {
  const latest = data.latest;
  const charts = data.charts || {};
  const history = data.history || [];
  const insights = data.insights || {};
  const solar = data.solar || {};
  const access = data.access || {};
  const evaluation = latest?.evaluation || {};
  const noaa = resolvedNoaaData(latest, charts);
  const level = evaluation.level || "normal";
  const riskPercent = evaluation.risk_percent ?? evaluation.score;
  const window = getChartWindow(charts);

  renderAccess(access);
  elements.levelBadge.textContent = formatLevel(level);
  elements.levelBadge.className = `badge ${levelClass[level] || "badge-neutral"}`;
  const formattedRisk = formatNumber(riskPercent, 0);
  elements.scoreValue.textContent = formattedRisk === "-" ? "-" : `${formattedRisk}%`;
  elements.generatedAt.textContent = `Son gÃ¼ncelleme (TSÄ°): ${formatDate(latest?.generated_at)}`;
  renderRiskSummary(latest, noaa, riskPercent);
  elements.kpValue.textContent = formatNumber(noaa.kp, 2);
  elements.kpEstimatedValue.textContent = formatNumber(noaa.kp_estimated, 2);
  elements.kpLstmValue.textContent = formatNumber(noaa?.kp_lstm_forecast?.predicted_kp, 2);
  elements.kpLstmMeta.textContent = formatLstmMeta(noaa?.kp_lstm_forecast);
  elements.speedValue.textContent = noaa.solar_wind_speed_km_s === null || noaa.solar_wind_speed_km_s === undefined
    ? "-"
    : `${formatNumber(noaa.solar_wind_speed_km_s, 1)}`;
  elements.bzValue.textContent = noaa.bz_nt === null || noaa.bz_nt === undefined
    ? "-"
    : `${formatNumber(noaa.bz_nt, 2)}`;

  updateSimulationPanel(noaa, evaluation, solar);
  renderConfidence(evaluation);
  renderReasons(latest);
  renderSectorImpacts(latest);
  renderNotificationPanel(data.notifications, latest, access);
  renderSatellitePanel({ latest, noaa, charts, solar });
  renderTurkeyProvincePanel({ latest, noaa, charts, solar, insights });
  renderCmeWindow(insights);
  renderSimilarEvents(insights);
  renderNoaa(noaa);
  renderStations(latest);
  renderKpComparisonChart(history, charts);
  renderMetricChart(elements.kpChart, elements.kpChartMeta, charts.kp_observed, window, {
    color: "#bd4f26",
    accent: "#8c1f1f",
    digits: 2,
    tickDigits: 1,
    min: 0,
    max: 9,
    xLabel: "Zaman (TSÄ°)",
    yLabel: "Kp Endeksi",
  });
  renderMetricChart(elements.kpEstimatedChart, elements.kpEstimatedChartMeta, charts.kp_estimated, window, {
    color: "#c9851a",
    accent: "#bd4f26",
    digits: 2,
    tickDigits: 1,
    min: 0,
    max: 9,
    xLabel: "Zaman (TSÄ°)",
    yLabel: "Kp Endeksi",
  });
  renderMetricChart(elements.speedChart, elements.speedChartMeta, charts.solar_wind_speed_km_s, window, {
    color: "#155d66",
    accent: "#0d4147",
    digits: 1,
    unit: " km/s",
    tickDigits: 0,
    xLabel: "Zaman (TSÄ°)",
    yLabel: "HÄ±z (km/s)",
  });
  renderMetricChart(elements.densityChart, elements.densityChartMeta, charts.proton_density_p_cm3, window, {
    color: "#5f7d2f",
    accent: "#31471a",
    digits: 2,
    unit: " p/cm3",
    includeZero: true,
    tickDigits: 1,
    xLabel: "Zaman (TSÄ°)",
    yLabel: "YoÄŸunluk (p/cm3)",
  });
  renderMetricChart(elements.bzChart, elements.bzChartMeta, charts.bz_nt, window, {
    color: "#8c1f1f",
    accent: "#1f1a17",
    digits: 2,
    unit: " nT",
    includeZero: true,
    tickDigits: 1,
    xLabel: "Zaman (TSÄ°)",
    yLabelSvg: 'B<tspan baseline-shift="sub" font-size="8.5">z</tspan> (nT)',
  });
  renderMetricChart(elements.btChart, elements.btChartMeta, charts.bt_nt, window, {
    color: "#4a516e",
    accent: "#1f1a17",
    digits: 2,
    unit: " nT",
    includeZero: true,
    tickDigits: 1,
    xLabel: "Zaman (TSÄ°)",
    yLabel: "Bt (nT)",
  });
  renderHistory(history);
  renderImages(latest);
  renderSolarPanel(solar);
  maybeSendAutoNotification(latest, access, data.notifications).catch(() => {});
  repairDocumentEncoding(document.body);
}

function buildNotificationEvent(latest, access, mode = "alert") {
  const evaluation = latest?.evaluation || {};
  const noaa = evaluation.noaa || {};
  const level = String(evaluation.level || "normal").toLowerCase();
  const riskPercent = parseNumber(evaluation.risk_percent ?? evaluation.score);
  const kpValue = parseNumber(noaa.kp);
  const kpEstimated = parseNumber(noaa.kp_estimated);
  const windSpeed = parseNumber(noaa.solar_wind_speed_km_s);
  const bzValue = parseNumber(noaa.bz_nt);
  const generatedAt = latest?.generated_at || noaa.observed_at || null;
  const parsedGeneratedAt = parseUtcDate(generatedAt);
  const generatedAtLabel = parsedGeneratedAt
    ? `${parsedGeneratedAt.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Istanbul",
    })} ${parsedGeneratedAt.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Istanbul",
    })} TSİ`
    : (generatedAt || "-");
  const normalizedMode = String(mode || "alert").toLowerCase();
  const isManual = normalizedMode === "manual";
  const isPeriodic = normalizedMode === "periodic";
  const titlePrefix = isManual ? "Manuel Özet" : isPeriodic ? "Düzenli Durum Özeti" : "Uzay Havası Uyarısı";
  const title = `${titlePrefix} | ${level.toUpperCase()}`;
  const lines = [
    `Seviye: ${level}`,
    `Risk: ${riskPercent === null ? "-" : `%${formatNumber(riskPercent, 0)}`}`,
    `Kp: ${kpValue === null ? "-" : formatNumber(kpValue, 2)}`,
    `Kp Tahmini: ${kpEstimated === null ? "-" : formatNumber(kpEstimated, 2)}`,
    `Güneş rüzgarı: ${windSpeed === null ? "-" : `${formatNumber(windSpeed, 0)} km/s`}`,
    `IMF Bz: ${bzValue === null ? "-" : `${bzValue >= 0 ? "+" : ""}${formatNumber(bzValue, 1)} nT`}`,
    `Zaman (TSİ): ${generatedAtLabel}`,
  ];
  if (isPeriodic) {
    lines.push("Not: Bu bildirim düzenli durum özeti olarak gönderildi.");
  } else if (!isManual) {
    lines.push("Eylem: Paneli açıp sistemleri kontrol et.");
  }
  return {
    title,
    message: lines.join("\n"),
    priority: isPeriodic && level === "normal" ? "2" : notificationPriority(level),
    tags: ["satellite", isPeriodic ? "summary" : "warning", level],
    level,
    riskPercent,
    kpValue,
    clickUrl: access?.public_url || access?.local_url || window.location.origin,
  };
}

safeBootStage("simulation", () => startSimulation());
safeBootStage("solar-toggle", () => initSolarToggle());
safeBootStage("encoding-repair", () => repairDocumentEncoding(document));
safeBootStage("encoding-watch", () => startEncodingRepairObserver());
safeBootStage("imf-bz-query", () => initArchiveQueryPanel(archiveQueryConfigs.imfBz));
safeBootStage("kp-query", () => initKpQueryPanel());
safeBootStage("solar-wind-query", () => initArchiveQueryPanel(archiveQueryConfigs.solarWind));

async function loadStatus() {
  setStatus("Son kayÄ±t yÃ¼kleniyor.");
  const downloadImages = elements.imagesToggle?.checked ? "1" : "0";
  const response = await fetch(`/api/status?refresh_if_empty=1&download_images=${downloadImages}`);
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Durum verisi alÄ±namadÄ±.");
  }
  renderDashboard(payload);
  setStatus("Temel pano yÃ¼klendi. Solar veri tamamlanÄ±yor.");
  try {
    payload.solar = await ensureSolarPayload(payload);
    renderDashboard(payload);
  } catch {
    payload.solar = payload.solar || {};
    renderDashboard(payload);
  }
  if (!payload.latest) {
    setStatus("HenÃ¼z veri yok. Pano ilk canlÄ± veriyi otomatik olarak almaya Ã§alÄ±ÅŸÄ±yor.");
    return;
  }
  setStatus("Pano gÃ¼ncel.");
  if (!initialRefreshScheduled) {
    initialRefreshScheduled = true;
    window.setTimeout(() => {
      refreshData().catch((error) => setStatus(error.message));
    }, INITIAL_AUTO_CHECK_DELAY_MS);
  }
}

async function refreshData() {
  if (refreshInFlight) {
    return;
  }
  refreshInFlight = true;
  setStatus("Kaynaklardan yeni veri Ã§ekiliyor. Bu iÅŸlem birkaÃ§ saniye sÃ¼rebilir.");
  try {
    const response = await fetch("/api/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ download_images: !!elements.imagesToggle?.checked }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Yenileme baÅŸarÄ±sÄ±z.");
    }
    renderDashboard(payload);
    try {
      payload.solar = await ensureSolarPayload(payload);
      renderDashboard(payload);
    } catch {
      payload.solar = payload.solar || {};
      renderDashboard(payload);
    }
    setStatus("Pano gÃ¼ncel. Son yenileme tamamlandÄ±; bir sonraki yenileme 1 dakika iÃ§inde yapÄ±lacak.");
  } catch (error) {
    setStatus(error.message);
  } finally {
    refreshInFlight = false;
  }
}

loadStatus().catch((error) => {
  if (window.location.protocol === "file:") {
    setStatus("Bu HTML dosyasÄ± tek baÅŸÄ±na aÃ§Ä±lmÄ±ÅŸ. Pano hizmetini space_weather_web_panel.py ile baÅŸlatÄ±p tarayÄ±cÄ±dan http://127.0.0.1:8080 adresini aÃ§Ä±n.");
    return;
  }
  setStatus(error.message);
});
setInterval(() => {
  refreshData().catch((error) => setStatus(error.message));
}, AUTO_REFRESH_INTERVAL_MS);
