# Uzay Havasi Erken Uyari Sistemi

Bu proje, uc resmi kaynaktan veri cekerek esik bazli bir erken uyari uretir:

- NOAA SWPC: gercek zamanli gunes ruzgari ve Kp indeksleri
- NASA SOHO/SDO: son gunes goruntuleri
- INTERMAGNET: yer tabanli manyetometre verileri
- Yerel gecmisten ogrenen saf Python LSTM modulu: Kp indeksini ileri ufukta tahmin eder

## Kurulum

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy config.example.json config.json
```

Python kurulu degilse Docker ile de calistirabilirsiniz:

```bash
docker build -t space-weather-ews .
docker run --rm -v ${PWD}/output:/app/output space-weather-ews
```

## Calistirma

Tek seferlik degerlendirme:

```bash
python space_weather_early_warning.py run --config config.json
```

Surekli izleme:

```bash
python space_weather_early_warning.py monitor --config config.json
```

Web paneli icin farkli aglarda degismeyen sabit bir link kullanmak isterseniz
`config.json` icindeki `sharing.named_tunnel` alanini doldurabilirsiniz.
Launcher bu ayar varsa Cloudflare named tunnel ile sabit alan adini dener;
ayarlar eksikse yerel/LAN calisma sekli aynen korunur.

Gorsel indirmeyi kapatmak icin:

```bash
python space_weather_early_warning.py run --config config.json --no-images
```

## Ciktilar

- `output/alerts/latest_alert.json`: son degerlendirme
- `output/alerts/history.jsonl`: gecmis uyarilar
- `output/images/`: NASA gorselleri
- Seviye `alerting.min_level` esigini gectiginde istege bagli webhook bildirimi

## Uyari mantigi

Skor asagidaki sinyallerden uretilir:

- NOAA Kp indeksi
- NOAA gunes ruzgari hizi
- NOAA IMF Bz degeri
- NOAA proton yogunlugu
- INTERMAGNET istasyonlarinda son saatlerde gozlenen manyetik alan degisimi
- LSTM tabanli Kp ongorusu (erken bilgi katmani)

Seviye siniflari:

- `normal`
- `watch`
- `warning`
- `severe`

## LSTM Modulu

- `kp_lstm.enabled`: modulu acip kapatir
- `kp_lstm.lookback_points`: modelin geriye bakacagi nokta sayisi
- `kp_lstm.forecast_horizon_minutes`: kac dakika sonrasinin tahmin edilecegi
- `kp_lstm.training_history_limit`: egitimde okunacak maksimum gecmis kaydi
- `kp_lstm.max_training_samples`: egitimde kullanilacak maksimum ornek sayisi
- `kp_lstm.hidden_size`: LSTM gizli durum boyutu
- `kp_lstm.epochs`: her calistirmadaki egitim dongusu
- `kp_lstm.learning_rate`: ogrenme hizi

## Notlar

- NASA gorselleri gorsel dogrulama icindir; uyari skoru sayisal verilerden uretilir.
- INTERMAGNET bazi istasyonlar icin veri gecikmeli olabilir; bu durumda sistem kalan kaynaklarla calismaya devam eder.
- Esikler operasyonel ihtiyaca gore `config.json` icinden ayarlanmalidir.
- Webhook entegrasyonu icin `alerting.webhook_url` alanina kendi alici servis adresinizi girin.
- NOAA SWPC, 31 Mart 2026 civarinda bazi JSON formatlarini ve 30 Nisan 2026 civarinda bazi eski solar-wind uclarini degistiriyor; bu kod hem yeni hem eski NOAA bicimlerini destekleyecek sekilde yazildi.
- LSTM modulu ek bir Python paketi istemez; saf Python olarak repo icinde calisir.

## Kullanilan resmi veri uclari

- NOAA SWPC JSON servisleri: `services.swpc.noaa.gov`
- SDO son goruntuler: `https://sdo.gsfc.nasa.gov/assets/img/latest/`
- SOHO gercek zamanli goruntuler: `https://soho.nascom.nasa.gov/data/realtime-images.html`
- INTERMAGNET HAPI: `https://imag-data.bgs.ac.uk/GIN_V1/hapi`
