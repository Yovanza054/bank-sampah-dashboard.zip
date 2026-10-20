<div align="center">

# ♻️ Dasbor Bank Sampah RW

**Studi kasus Interaksi Manusia dan Komputer (IMK): dasbor interaktif yang membantu pengurus bank sampah memahami data setoran warga dengan cepat.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Tanpa Library](https://img.shields.io/badge/Library-Tidak%20ada-1b5e3b)
![Aksesibel](https://img.shields.io/badge/Aksesibilitas-Diperhatikan-1b5e3b)

</div>

---

## 📌 Daftar Isi

1. [Latar Belakang](#-latar-belakang)
2. [Studi Kasus](#-studi-kasus)
3. [Tujuan](#-tujuan)
4. [Batasan Masalah](#-batasan-masalah)
5. [Persona Pengguna](#-persona-pengguna)
6. [Keterkaitan dengan Materi IMK](#-keterkaitan-dengan-materi-imk)
7. [Fitur](#-fitur)
8. [Struktur Proyek](#-struktur-proyek)
9. [Cara Membuka](#-cara-membuka)
10. [Rencana Evaluasi](#-rencana-evaluasi)
11. [Pengembangan Lanjutan](#-pengembangan-lanjutan)
12. [Mengunggah ke GitHub](#-mengunggah-ke-github)

---

## 🌱 Latar Belakang

Banyak bank sampah tingkat RW mencatat setoran warga di buku atau lembar kerja. Datanya ada, tetapi pengurus kesulitan menjawab pertanyaan sederhana: *apakah setoran bulan ini naik? jenis sampah apa yang paling banyak? RW mana yang perlu didorong lebih aktif?*

Masalahnya bukan kurang data, melainkan **data belum disajikan sesuai cara pengguna berpikir**. Di sinilah prinsip IMK dibutuhkan.

## 🧩 Studi Kasus

Pengurus bank sampah di sebuah kelurahan membutuhkan dasbor untuk memantau setoran sampah dari empat RW selama enam bulan (Mei–Oktober 2026) untuk lima jenis sampah: plastik, kertas, logam, kaca, dan organik.

Dasbor dirancang mengikuti alur **ringkasan → saring → detail**, sehingga pengguna tidak langsung dibebani angka yang banyak.

## 🎯 Tujuan

- Menerapkan pendekatan *User-Centered Design* pada kasus nyata yang sederhana.
- Menyajikan informasi dengan beban memori pengguna yang rendah.
- Memilih jenis grafik yang sesuai dengan jenis data.
- Menyediakan antarmuka yang aksesibel dan ringan untuk jaringan yang kurang stabil.

## 🚧 Batasan Masalah

| Aspek | Batasan |
|---|---|
| Data | Data contoh yang dibangkitkan otomatis, bukan data riil |
| Periode | Enam bulan, Mei–Oktober 2026 |
| Wilayah | Empat RW (RW 01–RW 04) |
| Jenis sampah | Plastik, kertas, logam, kaca, organik |
| Penyimpanan | Tidak ada basis data atau server; seluruh data ada di berkas `data.js` |
| Pengguna | Hanya peran pengurus (lihat saja), tanpa login dan tanpa input data |
| Teknologi | HTML, CSS, JavaScript murni tanpa library eksternal |
| Perangkat | Tampilan responsif untuk ponsel dan komputer; tidak ada aplikasi native |

## 👤 Persona Pengguna

> **Bu Ratna, 48 tahun, pengurus bank sampah**
>
> - **Tujuan:** mengetahui tren setoran dan memutuskan RW mana yang perlu disosialisasi.
> - **Kebiasaan:** memakai ponsel Android, membuka laporan di sela kegiatan, tidak terbiasa dengan istilah teknis.
> - **Masalah:** angka di buku sulit dibandingkan, sinyal internet sering tidak stabil.
> - **Kebutuhan desain:** tulisan jelas, informasi penting langsung terlihat, tombol mudah disentuh, halaman ringan.

## 🧠 Keterkaitan dengan Materi IMK

| Materi | Penerapan di proyek |
|---|---|
| **User-Centered Design** | Persona dirumuskan lebih dulu, lalu seluruh keputusan desain mengacu pada kebutuhan Bu Ratna |
| **Kapasitas memori terbatas** | Empat kartu ringkasan saja di bagian atas; status filter ditulis dalam kalimat sehingga pengguna tidak perlu mengingat pilihannya |
| **Warna, ukuran, bentuk** | Batang terpanjang diberi warna lebih gelap; perubahan bulanan memakai warna dan simbol ▲/▼ serta kata "naik/turun", tidak mengandalkan warna saja |
| **Prinsip Gestalt** | *Proximity* dan *similarity* lewat kartu yang dikelompokkan; *enclosure* lewat bingkai kartu pada setiap grafik |
| **Konteks penggunaan** | Tata letak responsif, target sentuh minimal 44 px, tanpa library atau gambar eksternal sehingga tetap cepat di jaringan lemah dan bisa dibuka offline |
| **Aksesibilitas** | Tautan lompat ke konten, label pada setiap kontrol, `aria-label` pada grafik, tabel sebagai alternatif teks, indikator fokus jelas, menghormati `prefers-reduced-motion` |
| **Etika desain** | Tidak ada iklan, pelacakan, atau pola manipulatif; tombol "Atur ulang" memberi pengguna kendali penuh |
| **Visualisasi data** | *Line chart* untuk tren waktu, *bar chart* untuk perbandingan kategori |
| **Dasbor interaktif** | Alur *overview first, filter, details on demand*: ringkasan → filter → tabel rincian yang dibuka sesuai kebutuhan |
| **Evaluasi** | Dilengkapi daftar *heuristic evaluation* dan skenario *usability testing* di bawah |

## ✨ Fitur

- 4 kartu ringkasan (total, rata-rata bulanan, perubahan bulan ini, jenis terbanyak)
- Grafik garis tren setoran bulanan
- Grafik batang perbandingan jenis sampah
- Filter wilayah dan jenis sampah, plus tombol atur ulang
- Tabel rincian yang bisa dibuka dan ditutup
- Pesan status yang dibacakan pembaca layar saat filter berubah
- Tampilan responsif

## 🗂️ Struktur Proyek

```
bank-sampah-dashboard/
├── index.html    # Struktur halaman
├── style.css     # Tampilan dan responsivitas
├── data.js       # Data contoh setoran sampah
├── app.js        # Logika filter, ringkasan, grafik, dan tabel
└── README.md     # Dokumentasi
```

## 🚀 Cara Membuka

Cukup ekstrak berkas ZIP, lalu **buka `index.html` di peramban** (klik dua kali). Tidak ada instalasi dan tidak ada pengaturan tambahan.

## 🧪 Rencana Evaluasi

### Heuristic Evaluation (Nielsen)

| Heuristik | Bukti pada desain | Status |
|---|---|---|
| Visibilitas status sistem | Kalimat status di bawah filter | ✅ |
| Kesesuaian dengan dunia nyata | Istilah sehari-hari: setoran, wilayah, naik/turun | ✅ |
| Kontrol dan kebebasan pengguna | Tombol atur ulang | ✅ |
| Konsistensi | Warna, kartu, dan istilah seragam | ✅ |
| Pencegahan kesalahan | Filter berupa pilihan tetap, tidak bisa salah ketik | ✅ |
| Mengenali daripada mengingat | Pilihan filter selalu terlihat | ✅ |
| Fleksibilitas dan efisiensi | Filter langsung memperbarui seluruh dasbor | ✅ |
| Desain estetis dan minimalis | Hanya informasi inti yang ditampilkan | ✅ |
| Bantuan mengenali dan memulihkan kesalahan | Tidak ada kondisi galat pada versi ini | ➖ |
| Bantuan dan dokumentasi | Belum ada panduan penggunaan di halaman | ❌ |

### Skenario Usability Testing

Ajak 3–5 calon pengguna, lalu minta mereka menyelesaikan tugas berikut tanpa dibantu:

1. Temukan jenis sampah yang paling banyak disetor.
2. Cari tahu apakah setoran Oktober naik dibanding September.
3. Lihat setoran plastik khusus RW 03.
4. Buka rincian angka per bulan.

**Yang diukur:** tugas berhasil atau tidak, waktu penyelesaian, jumlah kesalahan klik, dan komentar pengguna.

## 🔭 Pengembangan Lanjutan

- Panduan singkat di halaman untuk pengguna baru
- Ekspor tabel ke CSV
- Input setoran oleh petugas
- Mode gelap
- Pengujian nyata dengan pengurus bank sampah

## 📤 Mengunggah ke GitHub

1. Masuk ke GitHub, klik **New repository**, beri nama (misalnya `dasbor-bank-sampah-rw`), lalu **Create repository**.
2. Ekstrak berkas ZIP.
3. Di halaman repositori, pilih **uploading an existing file**.
4. Seret seluruh isi folder `bank-sampah-dashboard` ke halaman tersebut.
5. Klik **Commit changes**.
6. Opsional: aktifkan **Settings → Pages**, pilih cabang `main`, agar dasbor bisa dibuka lewat tautan web.

---

<div align="center">

Dibuat untuk tugas studi kasus Interaksi Manusia dan Komputer. Data bersifat contoh. 🌿

</div>
