# Web Panel

Panel sunucusunu baslatmak icin:

```bash
python space_weather_web_panel.py --config config.json --host 127.0.0.1 --port 8080
```

Windows'ta tek tik ile acmak icin:

```text
UzayHavasiPaneli.bat
```

Derlenmis Windows programi:

```text
UzayHavasiPaneli.exe
```

Tarayicida acin:

```text
http://127.0.0.1:8080
```

Not:

- `web/index.html` dosyasini cift tiklayip dogrudan acmayin.
- Panel, veri cekmek icin `space_weather_web_panel.py` tarafindaki HTTP sunucusuna baglanir.
- Son kullanici icin dogru giris noktasi `UzayHavasiPaneli.bat` dosyasidir.
- En pratik kullanim icin `UzayHavasiPaneli.exe` dosyasini cift tiklayin.

Panel ozellikleri:

- Son uyarinin seviye ve skor ozeti
- NOAA olcum kartlari
- INTERMAGNET istasyon kartlari
- Gecmis skor cizgisi
- NASA gorselleri galerisi
- Dakikada bir otomatik veri yenileme

## Sabit link

Farkli aglardan degismeyen tek bir adres kullanmak icin `config.json` icindeki
`sharing.named_tunnel` alanini doldurun:

- `enabled`: `true`
- `hostname`: kullanmak istediginiz alan adi ya da alt alan adi
- `tunnel_name` veya `tunnel_id`: Cloudflare named tunnel bilgisi
- `credentials_file`: Cloudflare tunnel kimlik dosyasi
- `protocol`: aginizda UDP kisitliysa `http2` olarak birakin

Launcher bu bilgiler varsa sabit alan adi tünelini once dener. Ayarlar eksikse
mevcut yerel/LAN davranisi bozulmadan devam eder.
