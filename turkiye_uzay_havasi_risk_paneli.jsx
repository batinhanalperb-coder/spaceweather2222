import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  Database,
  Gauge,
  Globe,
  Info,
  Layers3,
  MapPinned,
  Navigation,
  Radio,
  Satellite,
  Shield,
  Sprout,
  Waves,
  Wind,
  Zap,
} from "lucide-react";

/**
 * TÜRKİYE UZAY HAVASI RİSK PANELİ — GELİŞTİRİLMİŞ HARİTA + VERİ AÇIKLAMALARI
 * -------------------------------------------------------------------------
 * Bu sürümde:
 * - Haritanın arkasına ayrı bir 2D Türkiye vektör katmanı eklendi
 * - Renk sistemi daha akışkan ve daha zengin gradyan yapısına geçirildi
 * - "Bu veriler ne anlama geliyor?" bölümü eklendi
 * - "Veri kaynakları" bölümü eklendi
 * - Risk haritası daha açıklayıcı ve ürünleşmeye uygun hale getirildi
 *
 * Not:
 * - Aşağıdaki veriler örnek/mock veridir.
 * - Gerçek sistemde NOAA SWPC, GloTEC, D-RAP, Planetary K ve yerel manyetometre akışlarıyla beslenebilir.
 */

const mockGlobal = {
  updatedAt: "2026-03-28T10:35:00Z",
  kpNow: 6.3,
  kpForecast3h: 6.8,
  bz: -11.4,
  solarWindSpeed: 612,
  protonFlux: 18,
  density: 12.9,
  confidence: 0.84,
  noaaScales: {
    geomagnetic: "G2-G3",
    radioBlackout: "R1",
    radiation: "S1",
  },
  gnssDrivers: {
    tecBase: 46,
    tecGradient: 24,
    scintillation: 0.39,
  },
  hfDrivers: {
    drapAbsorption: 3.4,
    daylightFactor: 0.71,
  },
  geomagDrivers: {
    localMagDelta: 56,
    stormPersistence: 0.62,
  },
};

const sourceCards = [
  {
    name: "NOAA SWPC — Planetary K Index",
    role: "Jeomanyetik etkinliğin küresel şiddeti",
    endpoint: "/products/noaa-planetary-k-index.json",
    color: "from-cyan-400/20 to-sky-400/10",
  },
  {
    name: "NOAA SWPC — D-RAP",
    role: "HF radyo sönümü ve gündüz tarafı haberleşme etkisi",
    endpoint: "/products/drap-global-absorption.json",
    color: "from-violet-400/20 to-fuchsia-400/10",
  },
  {
    name: "NOAA SWPC — GloTEC / TEC",
    role: "GNSS doğruluğunu etkileyen iyonosferik toplam elektron içeriği",
    endpoint: "/products/glotec/",
    color: "from-emerald-400/20 to-lime-400/10",
  },
  {
    name: "SWPC Real-time Solar Wind",
    role: "Bz, hız, yoğunluk ve akış yönlendirici verileri",
    endpoint: "/products/solar-wind/",
    color: "from-orange-400/20 to-amber-400/10",
  },
  {
    name: "Yerel Manyetometre / İstasyon Katmanı",
    role: "Türkiye yakınındaki manyetik oynaklığın yerel katkısı",
    endpoint: "custom/local-magnetometer-feed",
    color: "from-rose-400/20 to-red-400/10",
  },
];

const metricExplainers = [
  {
    key: "kp",
    title: "Kp",
    short: "Küresel jeomanyetik fırtına seviyesi",
    detail:
      "Kp yükseldikçe manyetik alan oynaklığı artar. Güç altyapısı, bazı uydular ve hassas elektronik sistemler için risk büyüyebilir.",
  },
  {
    key: "bz",
    title: "IMF Bz",
    short: "Güneş rüzgârı manyetik alanının Dünya ile bağlanma eğilimi",
    detail:
      "Bz negatif olduğunda manyetik bağlanma kolaylaşır ve jeomanyetik etkiler güçlenebilir. Özellikle fırtına derinliği için önemlidir.",
  },
  {
    key: "tec",
    title: "TEC / İyonosfer",
    short: "GNSS sinyal gecikmesini etkileyen iyonosfer yükü",
    detail:
      "TEC ve TEC gradyanı arttığında GPS/GNSS tabanlı konumlama daha fazla sapabilir. Tarım, havacılık ve savunmada kritik olabilir.",
  },
  {
    key: "drap",
    title: "D-RAP / HF",
    short: "HF radyo dalgalarında emilim ve sönüm",
    detail:
      "D-RAP değeri yükseldikçe özellikle gündüz tarafında HF haberleşme kalitesi düşebilir. Uzun menzilli RF iletişim etkilenebilir.",
  },
  {
    key: "confidence",
    title: "Tahmin Güveni",
    short: "Model + gözlem uyumundan türetilen genel güven göstergesi",
    detail:
      "Bu değer yüksekse sistemin verdiği anlık risk skorunun gözlem ve tahmin verileriyle daha uyumlu olduğu anlaşılır.",
  },
];

const sectorWeights = {
  genel: { gnss: 0.4, hf: 0.3, geomag: 0.3 },
  savunma: { gnss: 0.4, hf: 0.35, geomag: 0.25 },
  tarim: { gnss: 0.55, hf: 0.15, geomag: 0.3 },
  havacilik: { gnss: 0.45, hf: 0.35, geomag: 0.2 },
  enerji: { gnss: 0.15, hf: 0.2, geomag: 0.65 },
};

const sectorMeta = {
  genel: { label: "Genel", icon: Activity },
  savunma: { label: "Savunma", icon: Shield },
  tarim: { label: "Tarım", icon: Sprout },
  havacilik: { label: "Havacılık", icon: Satellite },
  enerji: { label: "Enerji", icon: Zap },
};

const layerMeta = {
  overall: { label: "Genel Risk", icon: AlertTriangle },
  gnss: { label: "GNSS / Navigasyon", icon: Navigation },
  hf: { label: "HF Radyo", icon: Radio },
  geomag: { label: "Jeomanyetik", icon: Gauge },
};

const cityData = [
  { name: "İstanbul", lat: 41.0082, lon: 28.9784, popWeight: 1.0, agriWeight: 0.35, defenseWeight: 0.85 },
  { name: "Kocaeli", lat: 40.7654, lon: 29.9408, popWeight: 0.72, agriWeight: 0.35, defenseWeight: 0.78 },
  { name: "Bursa", lat: 40.195, lon: 29.06, popWeight: 0.76, agriWeight: 0.58, defenseWeight: 0.55 },
  { name: "Ankara", lat: 39.9334, lon: 32.8597, popWeight: 0.86, agriWeight: 0.52, defenseWeight: 1.0 },
  { name: "Konya", lat: 37.8746, lon: 32.4932, popWeight: 0.6, agriWeight: 1.0, defenseWeight: 0.7 },
  { name: "Eskişehir", lat: 39.7667, lon: 30.5256, popWeight: 0.52, agriWeight: 0.62, defenseWeight: 0.82 },
  { name: "İzmir", lat: 38.4237, lon: 27.1428, popWeight: 0.83, agriWeight: 0.54, defenseWeight: 0.68 },
  { name: "Antalya", lat: 36.8969, lon: 30.7133, popWeight: 0.71, agriWeight: 0.66, defenseWeight: 0.48 },
  { name: "Adana", lat: 37.0, lon: 35.3213, popWeight: 0.68, agriWeight: 0.84, defenseWeight: 0.74 },
  { name: "Mersin", lat: 36.8, lon: 34.6333, popWeight: 0.6, agriWeight: 0.8, defenseWeight: 0.59 },
  { name: "Gaziantep", lat: 37.0662, lon: 37.3833, popWeight: 0.66, agriWeight: 0.78, defenseWeight: 0.72 },
  { name: "Şanlıurfa", lat: 37.1674, lon: 38.7955, popWeight: 0.56, agriWeight: 0.96, defenseWeight: 0.58 },
  { name: "Diyarbakır", lat: 37.9144, lon: 40.2306, popWeight: 0.53, agriWeight: 0.74, defenseWeight: 0.8 },
  { name: "Kayseri", lat: 38.7225, lon: 35.4875, popWeight: 0.58, agriWeight: 0.66, defenseWeight: 0.73 },
  { name: "Samsun", lat: 41.2867, lon: 36.33, popWeight: 0.57, agriWeight: 0.64, defenseWeight: 0.67 },
  { name: "Trabzon", lat: 41.0015, lon: 39.7178, popWeight: 0.49, agriWeight: 0.38, defenseWeight: 0.61 },
  { name: "Erzurum", lat: 39.9043, lon: 41.2679, popWeight: 0.41, agriWeight: 0.46, defenseWeight: 0.69 },
  { name: "Van", lat: 38.5012, lon: 43.372, popWeight: 0.38, agriWeight: 0.42, defenseWeight: 0.76 },
  { name: "Malatya", lat: 38.3552, lon: 38.3095, popWeight: 0.44, agriWeight: 0.69, defenseWeight: 0.63 },
  { name: "Edirne", lat: 41.6771, lon: 26.5557, popWeight: 0.33, agriWeight: 0.55, defenseWeight: 0.42 },
];

const bounds = {
  minLon: 25.5,
  maxLon: 45.0,
  minLat: 35.5,
  maxLat: 42.5,
};

const RISK_STOPS = [
  { value: 0, color: [34, 197, 94] },
  { value: 20, color: [132, 204, 22] },
  { value: 40, color: [250, 204, 21] },
  { value: 60, color: [249, 115, 22] },
  { value: 80, color: [239, 68, 68] },
  { value: 100, color: [168, 85, 247] },
];

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function normalize(value, min, max) {
  if (max === min) return 0;
  return clamp(((value - min) / (max - min)) * 100, 0, 100);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function interpolateColor(score, alpha = 1) {
  const s = clamp(score, 0, 100);
  let left = RISK_STOPS[0];
  let right = RISK_STOPS[RISK_STOPS.length - 1];

  for (let i = 0; i < RISK_STOPS.length - 1; i++) {
    const a = RISK_STOPS[i];
    const b = RISK_STOPS[i + 1];
    if (s >= a.value && s <= b.value) {
      left = a;
      right = b;
      break;
    }
  }

  const t = (s - left.value) / (right.value - left.value || 1);
  const r = Math.round(lerp(left.color[0], right.color[0], t));
  const g = Math.round(lerp(left.color[1], right.color[1], t));
  const b = Math.round(lerp(left.color[2], right.color[2], t));

  return alpha === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function riskColor(score) {
  return interpolateColor(score, 1);
}

function riskSoftColor(score) {
  return interpolateColor(score, 0.78);
}

function riskGlowColor(score) {
  return interpolateColor(score, 0.22);
}

function riskLabel(score) {
  if (score >= 80) return "Kritik";
  if (score >= 65) return "Yüksek";
  if (score >= 45) return "Orta-Yüksek";
  if (score >= 25) return "Orta";
  return "Düşük";
}

function lonToX(lon) {
  const t = (lon - bounds.minLon) / (bounds.maxLon - bounds.minLon);
  return lerp(100, 1100, t);
}

function latToY(lat) {
  const t = (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat);
  return lerp(445, 105, t);
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
    "M 799 272 C 850 270, 908 275, 958 289"
  ];
}

function computeCityRisk(city, sectorKey, global) {
  const northFactor = normalize(city.lat, bounds.minLat, bounds.maxLat) / 100;
  const eastFactor = normalize(city.lon, bounds.minLon, bounds.maxLon) / 100;

  const gnssBase =
    0.58 * normalize(global.gnssDrivers.tecBase, 15, 70) +
    0.27 * normalize(global.gnssDrivers.tecGradient, 0, 40) +
    0.15 * normalize(global.gnssDrivers.scintillation, 0, 1);

  const hfBase =
    0.7 * normalize(global.hfDrivers.drapAbsorption, 0, 6) +
    0.3 * normalize(global.hfDrivers.daylightFactor, 0, 1);

  const geomagBase =
    0.45 * normalize(global.kpNow, 0, 9) +
    0.2 * normalize(Math.abs(Math.min(global.bz, 0)), 0, 20) +
    0.2 * normalize(global.geomagDrivers.localMagDelta, 0, 100) +
    0.15 * normalize(global.geomagDrivers.stormPersistence, 0, 1);

  let gnss = gnssBase + 10 * eastFactor + 6 * northFactor;
  let hf = hfBase + 8 * (1 - northFactor * 0.4) + 5 * eastFactor;
  let geomag = geomagBase + 12 * northFactor + 3 * eastFactor;

  gnss += city.agriWeight * 6;
  hf += city.defenseWeight * 5;
  geomag += city.popWeight * 4;

  gnss = clamp(gnss, 0, 100);
  hf = clamp(hf, 0, 100);
  geomag = clamp(geomag, 0, 100);

  const weights = sectorWeights[sectorKey];
  const overall = clamp(
    gnss * weights.gnss + hf * weights.hf + geomag * weights.geomag,
    0,
    100
  );

  const dominantLayer = [
    ["gnss", gnss],
    ["hf", hf],
    ["geomag", geomag],
  ].sort((a, b) => b[1] - a[1])[0][0];

  return {
    ...city,
    gnss: Math.round(gnss),
    hf: Math.round(hf),
    geomag: Math.round(geomag),
    overall: Math.round(overall),
    dominantLayer,
  };
}

function StatCard({ title, value, sub, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-white/65">{title}</span>
        <Icon className="h-4 w-4 text-cyan-300" />
      </div>
      <div className="text-2xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-xs text-white/55">{sub}</div>
    </div>
  );
}

function Badge({ score }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-slate-950"
      style={{ backgroundColor: riskColor(score) }}
    >
      {riskLabel(score)} · {score}
    </span>
  );
}

function GradientLegend() {
  return (
    <div className="flex items-center gap-3 text-[11px] text-white/65">
      <span>Risk</span>
      <div
        className="h-2.5 w-44 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, rgb(34,197,94) 0%, rgb(132,204,22) 20%, rgb(250,204,21) 40%, rgb(249,115,22) 60%, rgb(239,68,68) 80%, rgb(168,85,247) 100%)",
        }}
      />
      <span>Düşük</span>
      <span className="text-white/40">→</span>
      <span>Kritik</span>
    </div>
  );
}

function ExplainCard({ title, short, detail }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-4">
      <div className="mb-1 text-sm font-semibold text-white">{title}</div>
      <div className="mb-2 text-xs text-cyan-200">{short}</div>
      <div className="text-sm leading-6 text-white/70">{detail}</div>
    </div>
  );
}

export default function TurkeySpaceWeatherRiskPanel() {
  const [sector, setSector] = useState("savunma");
  const [layer, setLayer] = useState("overall");
  const [selectedCity, setSelectedCity] = useState("Ankara");

  const global = mockGlobal;

  const cities = useMemo(() => {
    return cityData
      .map((city) => computeCityRisk(city, sector, global))
      .sort((a, b) => b.overall - a.overall);
  }, [sector, global]);

  const summary = useMemo(() => {
    const avg = {
      gnss: Math.round(cities.reduce((s, c) => s + c.gnss, 0) / cities.length),
      hf: Math.round(cities.reduce((s, c) => s + c.hf, 0) / cities.length),
      geomag: Math.round(cities.reduce((s, c) => s + c.geomag, 0) / cities.length),
      overall: Math.round(cities.reduce((s, c) => s + c.overall, 0) / cities.length),
    };

    const dominant = Object.entries(avg)
      .filter(([key]) => key !== "overall")
      .sort((a, b) => b[1] - a[1])[0][0];

    return { avg, dominant };
  }, [cities]);

  const selected = cities.find((c) => c.name === selectedCity) ?? cities[0];

  const activeLayerValue = (city) => {
    if (layer === "overall") return city.overall;
    return city[layer];
  };

  const topSectors = [
    {
      name: "Savunma",
      value: Math.round(summary.avg.gnss * 0.4 + summary.avg.hf * 0.35 + summary.avg.geomag * 0.25),
      icon: Shield,
    },
    {
      name: "Tarım",
      value: Math.round(summary.avg.gnss * 0.55 + summary.avg.hf * 0.15 + summary.avg.geomag * 0.3),
      icon: Sprout,
    },
    {
      name: "Havacılık",
      value: Math.round(summary.avg.gnss * 0.45 + summary.avg.hf * 0.35 + summary.avg.geomag * 0.2),
      icon: Satellite,
    },
    {
      name: "Enerji",
      value: Math.round(summary.avg.gnss * 0.15 + summary.avg.hf * 0.2 + summary.avg.geomag * 0.65),
      icon: Zap,
    },
  ].sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6 md:p-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              <Wind className="h-3.5 w-3.5" />
              Türkiye Uzay Havası Operasyon Paneli
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Türkiye Üzerindeki Anlık Uzay Havası Riski
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65 md:text-base">
              Arkada 2D Türkiye vektörü, önde çok adımlı renk gradyanı ve altta veri açıklamalarıyla
              daha güçlü bir karar-destek görünümü.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70 backdrop-blur">
            Güncelleme: <span className="font-medium text-white">{new Date(global.updatedAt).toLocaleString("tr-TR")}</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard title="Kp (Şimdi)" value={global.kpNow.toFixed(1)} sub={`Tahmin +3s: ${global.kpForecast3h.toFixed(1)}`} icon={Gauge} />
          <StatCard title="IMF Bz" value={`${global.bz.toFixed(1)} nT`} sub="Negatif Bz, jeomanyetik bağlanmayı güçlendirebilir" icon={Activity} />
          <StatCard title="Güneş Rüzgârı" value={`${global.solarWindSpeed} km/s`} sub={`Yoğunluk: ${global.density} p/cm³`} icon={Wind} />
          <StatCard title="NOAA Ölçekleri" value={global.noaaScales.geomagnetic} sub={`${global.noaaScales.radioBlackout} · ${global.noaaScales.radiation}`} icon={AlertTriangle} />
          <StatCard title="Tahmin Güveni" value={`${Math.round(global.confidence * 100)}%`} sub="Model ve gözlem bileşik güveni" icon={ChevronRight} />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.58fr_0.72fr]">
          <div className="rounded-[30px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.025] p-5 shadow-2xl shadow-cyan-950/15">
            <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-[11px] text-cyan-200">
                  <MapPinned className="h-3.5 w-3.5" />
                  Türkiye Risk Haritası
                </div>
                <h2 className="text-xl font-semibold">2D vektör zemin + zengin risk gradyanı</h2>
                <p className="mt-1 text-sm text-white/60">
                  Seçili katman: <span className="text-white">{layerMeta[layer].label}</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.entries(sectorMeta).map(([key, meta]) => {
                  const Icon = meta.icon;
                  const active = sector === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSector(key)}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition ${
                        active
                          ? "bg-cyan-400 text-slate-950"
                          : "border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {meta.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {Object.entries(layerMeta).map(([key, meta]) => {
                  const Icon = meta.icon;
                  const active = layer === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setLayer(key)}
                      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                        active
                          ? "bg-white text-slate-950"
                          : "border border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.07]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {meta.label}
                    </button>
                  );
                })}
              </div>
              <GradientLegend />
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.28fr_0.72fr]">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 p-3">
                <svg viewBox="0 0 1200 560" className="h-full w-full">
                  <defs>
                    <clipPath id="turkey-clip">
                      <path d={turkeyOutlinePath()} />
                    </clipPath>

                    <linearGradient id="oceanGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#07111f" />
                      <stop offset="50%" stopColor="#0b1830" />
                      <stop offset="100%" stopColor="#08101b" />
                    </linearGradient>

                    <linearGradient id="turkeyFill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0a1d36" />
                      <stop offset="50%" stopColor="#132a4e" />
                      <stop offset="100%" stopColor="#0b1830" />
                    </linearGradient>

                    <linearGradient id="outlineGlowStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#67e8f9" />
                      <stop offset="50%" stopColor="#93c5fd" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>

                    <filter id="outerGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="bigGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="22" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <radialGradient id="spotGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                      <stop offset="35%" stopColor="white" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </radialGradient>

                    <pattern id="scanDots" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.08)" />
                    </pattern>

                    <linearGradient id="vectorBackGlow" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(103,232,249,0.24)" />
                      <stop offset="100%" stopColor="rgba(167,139,250,0.20)" />
                    </linearGradient>
                  </defs>

                  <rect x="0" y="0" width="1200" height="560" rx="24" fill="url(#oceanGradient)" />
                  <rect x="0" y="0" width="1200" height="560" rx="24" fill="url(#scanDots)" opacity="0.6" />

                  <g opacity="0.14">
                    <circle cx="170" cy="110" r="120" stroke="rgba(56,189,248,0.20)" strokeWidth="1.5" fill="none" />
                    <circle cx="170" cy="110" r="170" stroke="rgba(56,189,248,0.12)" strokeWidth="1.5" fill="none" />
                    <circle cx="1020" cy="445" r="110" stroke="rgba(167,139,250,0.16)" strokeWidth="1.5" fill="none" />
                    <circle cx="1020" cy="445" r="155" stroke="rgba(167,139,250,0.10)" strokeWidth="1.5" fill="none" />
                  </g>

                  <path d={turkeyOutlinePath()} fill="url(#turkeyFill)" opacity="0.98" />

                  <g clipPath="url(#turkey-clip)" opacity="0.22">
                    {turkeyInternalVectorPaths().map((d, idx) => (
                      <path
                        key={idx}
                        d={d}
                        fill="none"
                        stroke="url(#vectorBackGlow)"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        filter="url(#outerGlow)"
                      />
                    ))}
                  </g>

                  <g clipPath="url(#turkey-clip)" opacity="0.08">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <line
                        key={`bg-v-${i}`}
                        x1={95 + i * 58}
                        y1="108"
                        x2={95 + i * 58}
                        y2="455"
                        stroke="white"
                        strokeWidth="1"
                      />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line
                        key={`bg-h-${i}`}
                        x1="88"
                        y1={118 + i * 44}
                        x2="1088"
                        y2={118 + i * 44}
                        stroke="white"
                        strokeWidth="1"
                      />
                    ))}
                  </g>

                  <path d={turkeyOutlinePath()} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" filter="url(#outerGlow)" />
                  <path d={turkeyOutlinePath()} fill="none" stroke="url(#outlineGlowStroke)" strokeWidth="4.2" filter="url(#outerGlow)" />
                  <path d={turkeyOutlinePath()} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.15" opacity="0.58" />

                  <g clipPath="url(#turkey-clip)">
                    {cities.map((city) => {
                      const score = activeLayerValue(city);
                      const x = lonToX(city.lon);
                      const y = latToY(city.lat);
                      const r = 46 + score * 0.82;
                      return (
                        <g key={`${city.name}-risk-blob`}>
                          <circle cx={x} cy={y} r={r} fill={riskGlowColor(score)} filter="url(#bigGlow)" />
                          <circle cx={x} cy={y} r={r * 0.75} fill={riskSoftColor(score)} opacity={0.26} filter="url(#outerGlow)" />
                          <circle cx={x} cy={y} r={r * 0.44} fill={riskSoftColor(score)} opacity={0.14} />
                          <circle cx={x} cy={y} r={r * 0.24} fill="url(#spotGradient)" opacity={0.28} />
                        </g>
                      );
                    })}

                    <motion.rect
                      x="-240"
                      y="0"
                      width="260"
                      height="560"
                      fill="rgba(56,189,248,0.06)"
                      animate={{ x: [-240, 1260] }}
                      transition={{ repeat: Infinity, duration: 9.5, ease: "linear" }}
                      style={{ mixBlendMode: "screen" }}
                    />
                  </g>

                  <g>
                    {cities.map((city) => {
                      const score = activeLayerValue(city);
                      const x = lonToX(city.lon);
                      const y = latToY(city.lat);
                      const isSelected = selectedCity === city.name;

                      return (
                        <g key={city.name}>
                          {isSelected && (
                            <>
                              <motion.circle
                                cx={x}
                                cy={y}
                                r="18"
                                fill="none"
                                stroke={riskColor(score)}
                                strokeWidth="2.4"
                                opacity="0.8"
                                animate={{ r: [14, 25, 14], opacity: [0.8, 0.18, 0.8] }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                              />
                              <motion.circle
                                cx={x}
                                cy={y}
                                r="30"
                                fill="none"
                                stroke={riskColor(score)}
                                strokeWidth="1.2"
                                opacity="0.45"
                                animate={{ r: [24, 38, 24], opacity: [0.45, 0.08, 0.45] }}
                                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                              />
                            </>
                          )}

                          <motion.circle
                            cx={x}
                            cy={y}
                            r={isSelected ? 8.5 : 6}
                            fill={riskColor(score)}
                            stroke="white"
                            strokeWidth={isSelected ? 2.2 : 1.3}
                            className="cursor-pointer"
                            whileHover={{ scale: 1.15 }}
                            onClick={() => setSelectedCity(city.name)}
                            filter="url(#outerGlow)"
                          />

                          {isSelected && (
                            <g>
                              <rect x={x + 12} y={y - 42} width="156" height="40" rx="12" fill="rgba(15,23,42,0.96)" stroke="rgba(255,255,255,0.18)" />
                              <text x={x + 24} y={y - 18} fill="white" fontSize="13" fontWeight="700">
                                {city.name} · {score}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </g>

                  <g transform="translate(864 24)">
                    <rect width="296" height="154" rx="18" fill="rgba(15,23,42,0.90)" stroke="rgba(255,255,255,0.12)" />
                    <text x="16" y="28" fill="white" fontSize="15" fontWeight="700">Canlı Harita Özeti</text>
                    <text x="16" y="56" fill="rgba(255,255,255,0.72)" fontSize="12">
                      Katman: {layer === "overall" ? layerMeta[summary.dominant].label : layerMeta[layer].label}
                    </text>
                    <text x="16" y="78" fill="rgba(255,255,255,0.72)" fontSize="12">
                      Türkiye ortalaması: {layer === "overall" ? summary.avg.overall : summary.avg[layer]}
                    </text>
                    <text x="16" y="100" fill="rgba(255,255,255,0.72)" fontSize="12">
                      Sektör modu: {sectorMeta[sector].label}
                    </text>
                    <text x="16" y="122" fill="rgba(255,255,255,0.72)" fontSize="12">
                      Baskın şehir odağı: {cities[0]?.name}
                    </text>
                    <text x="16" y="144" fill="rgba(255,255,255,0.72)" fontSize="12">
                      Skor aralığı: 0 → 100
                    </text>
                  </g>

                  <g transform="translate(28 24)">
                    <rect width="246" height="108" rx="18" fill="rgba(15,23,42,0.88)" stroke="rgba(255,255,255,0.12)" />
                    <text x="16" y="28" fill="white" fontSize="14" fontWeight="700">Harita Katmanları</text>
                    <text x="16" y="54" fill="rgba(255,255,255,0.74)" fontSize="12">
                      2D Türkiye vektör zemini
                    </text>
                    <text x="16" y="74" fill="rgba(255,255,255,0.74)" fontSize="12">
                      Çok adımlı renk gradyanı
                    </text>
                    <text x="16" y="94" fill="rgba(255,255,255,0.74)" fontSize="12">
                      Şehir merkezli risk bulutları
                    </text>
                  </g>
                </svg>
              </div>

              <div className="space-y-4">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/60">Seçili şehir</div>
                      <div className="text-xl font-semibold">{selected.name}</div>
                    </div>
                    <Badge score={activeLayerValue(selected)} />
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-white/65">
                        <span>GNSS / Navigasyon</span>
                        <span>{selected.gnss}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div className="h-2 rounded-full" style={{ width: `${selected.gnss}%`, backgroundColor: riskColor(selected.gnss) }} />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-white/65">
                        <span>HF Radyo</span>
                        <span>{selected.hf}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div className="h-2 rounded-full" style={{ width: `${selected.hf}%`, backgroundColor: riskColor(selected.hf) }} />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-white/65">
                        <span>Jeomanyetik</span>
                        <span>{selected.geomag}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div className="h-2 rounded-full" style={{ width: `${selected.geomag}%`, backgroundColor: riskColor(selected.geomag) }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/8 bg-slate-950/40 p-3 text-sm text-white/70">
                    <span className="font-medium text-white">Operasyonel yorum:</span>{" "}
                    {selected.dominantLayer === "gnss" && "GNSS doğruluk kaybı, hassas konumlama ve otomatik yönlendirme sistemlerinde sapma riski öne çıkıyor."}
                    {selected.dominantLayer === "hf" && "HF haberleşmede sönüm artışı ve özellikle gündüz tarafında bağlantı kalitesi kaybı dikkat çekiyor."}
                    {selected.dominantLayer === "geomag" && "Manyetik oynaklık daha baskın; enerji ve hassas elektronik bileşenler için izleme önceliği artmalı."}
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
                    <Waves className="h-4 w-4 text-cyan-300" />
                    Sektör Bazlı Risk Önceliği
                  </div>
                  <div className="space-y-3">
                    {topSectors.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.name} className="rounded-2xl border border-white/8 bg-slate-950/35 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-cyan-300" />
                              <span className="text-sm text-white/80">{item.name}</span>
                            </div>
                            <Badge score={item.value} />
                          </div>
                          <div className="h-2 rounded-full bg-white/10">
                            <div className="h-2 rounded-full" style={{ width: `${item.value}%`, backgroundColor: riskColor(item.value) }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-4 text-lg font-semibold">Riskin Arka Planı</div>
              <div className="space-y-4 text-sm leading-6 text-white/70">
                <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-4">
                  <div className="mb-1 flex items-center gap-2 text-white">
                    <Navigation className="h-4 w-4 text-cyan-300" /> GNSS Sürücüleri
                  </div>
                  TEC: {global.gnssDrivers.tecBase} · Gradyan: {global.gnssDrivers.tecGradient} · Scintillation: {global.gnssDrivers.scintillation}
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-4">
                  <div className="mb-1 flex items-center gap-2 text-white">
                    <Radio className="h-4 w-4 text-cyan-300" /> HF Sürücüleri
                  </div>
                  D-RAP emilim: {global.hfDrivers.drapAbsorption} dB · Gündüz faktörü: {Math.round(global.hfDrivers.daylightFactor * 100)}%
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-4">
                  <div className="mb-1 flex items-center gap-2 text-white">
                    <Gauge className="h-4 w-4 text-cyan-300" /> Jeomanyetik Sürücüler
                  </div>
                  Kp: {global.kpNow} · Yerel manyetik delta: {global.geomagDrivers.localMagDelta} · Kalıcılık: {Math.round(global.geomagDrivers.stormPersistence * 100)}%
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <div className="mb-4 text-lg font-semibold">Operasyonel İçgörüler</div>
              <div className="space-y-3 text-sm leading-6 text-white/72">
                <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-4">
                  <span className="font-medium text-white">Savunma:</span> HF ve GNSS birlikte yükseldiğinde komuta-kontrol, saha navigasyonu ve RF bağlantı sürekliliği daha kırılgan hale gelir.
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-4">
                  <span className="font-medium text-white">Tarım:</span> GNSS ağırlıklı modda otomatik dümenleme, ekim çizgisi hizalaması ve hassas uygulama sistemleri daha çok etkilenir.
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-4">
                  <span className="font-medium text-white">Enerji:</span> Jeomanyetik katman yükseldikçe transformatör yüklenmesi, GIC hassasiyeti ve şebeke izleme önceliği artar.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Info className="h-5 w-5 text-cyan-300" />
              Bu Veriler Ne Anlama Geliyor?
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {metricExplainers.map((item) => (
                <ExplainCard key={item.key} title={item.title} short={item.short} detail={item.detail} />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Database className="h-5 w-5 text-cyan-300" />
              Veri Kaynakları
            </div>
            <div className="space-y-4">
              {sourceCards.map((source) => (
                <div key={source.name} className={`rounded-2xl border border-white/8 bg-gradient-to-r ${source.color} p-4`}>
                  <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-white">
                    <Globe className="h-4 w-4 text-cyan-200" /> {source.name}
                  </div>
                  <div className="mb-2 text-sm text-white/72">{source.role}</div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/55 px-3 py-2 font-mono text-xs text-cyan-100">
                    {source.endpoint}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Şehir Bazlı Risk Dağılımı</h3>
              <p className="mt-1 text-sm text-white/60">Seçili sektör moduna göre hesaplanan anlık skorlar</p>
            </div>
            <Badge score={summary.avg.overall} />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/55">
                  <th className="px-3 py-3 font-medium">Şehir</th>
                  <th className="px-3 py-3 font-medium">Genel</th>
                  <th className="px-3 py-3 font-medium">GNSS</th>
                  <th className="px-3 py-3 font-medium">HF</th>
                  <th className="px-3 py-3 font-medium">Jeomanyetik</th>
                  <th className="px-3 py-3 font-medium">Baskın Katman</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city) => (
                  <tr key={city.name} className="border-b border-white/6 text-white/80 transition hover:bg-white/[0.03]">
                    <td className="px-3 py-3">
                      <button onClick={() => setSelectedCity(city.name)} className="font-medium hover:text-cyan-300">
                        {city.name}
                      </button>
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full px-2 py-1 text-xs font-medium text-slate-950" style={{ backgroundColor: riskColor(city.overall) }}>
                        {city.overall}
                      </span>
                    </td>
                    <td className="px-3 py-3">{city.gnss}</td>
                    <td className="px-3 py-3">{city.hf}</td>
                    <td className="px-3 py-3">{city.geomag}</td>
                    <td className="px-3 py-3">{layerMeta[city.dominantLayer].label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-dashed border-white/12 bg-white/[0.03] p-5 text-sm leading-6 text-white/68">
          <div className="mb-2 flex items-center gap-2 font-medium text-white">
            <Layers3 className="h-4 w-4 text-cyan-300" /> Gerçek veriye bağlamak için
          </div>
          <div>
            Bu bileşendeki <code className="rounded bg-white/10 px-1.5 py-0.5 text-white">mockGlobal</code> ve <code className="rounded bg-white/10 px-1.5 py-0.5 text-white">cityData</code>
            {" "}verilerini backend endpoint’inizden besleyebilirsiniz. Önerilen çıktı şekli:
          </div>
          <pre className="mt-3 overflow-x-auto rounded-2xl border border-white/8 bg-slate-950/60 p-4 text-xs text-cyan-100">
{`GET /api/turkey-risk/current

{
  "updatedAt": "2026-03-28T10:35:00Z",
  "kpNow": 6.3,
  "kpForecast3h": 6.8,
  "bz": -11.4,
  "solarWindSpeed": 612,
  "density": 12.9,
  "confidence": 0.84,
  "noaaScales": { "geomagnetic": "G2-G3", "radioBlackout": "R1", "radiation": "S1" },
  "gnssDrivers": { "tecBase": 46, "tecGradient": 24, "scintillation": 0.39 },
  "hfDrivers": { "drapAbsorption": 3.4, "daylightFactor": 0.71 },
  "geomagDrivers": { "localMagDelta": 56, "stormPersistence": 0.62 }
}`}
          </pre>

          <div className="mt-4 flex items-center gap-2 text-white/70">
            <BookOpen className="h-4 w-4 text-cyan-300" />
            Bu skorlar burada görsel karar desteği için normalize edilmiş örnek bileşik skorlardır. Canlı sistemde kaynak akışına göre yeniden kalibre edilmelidir.
          </div>
        </div>
      </div>
    </div>
  );
}
