# HFMD Detection System

Sistem deteksi Hand, Foot, and Mouth Disease (HFMD) menggunakan machine learning dengan frontend Next.js dan backend Flask.

## Struktur Proyek

Proyek ini terdiri dari dua bagian utama:

1. **Frontend (Next.js dengan Tailwind CSS)**

   - Modern UI dengan komponen yang responsif
   - Upload gambar dan visualisasi hasil
   - Halaman riwayat deteksi
   - Chatbot untuk informasi HFMD

2. **Backend (Flask Python)**
   - API untuk klasifikasi gambar menggunakan model ML
   - Penyimpanan data hasil deteksi
   - Manajemen file dan upload
   - Logika chatbot sederhana

## Prasyarat

Pastikan Anda telah menginstal:

- Node.js (versi 14 atau lebih baru)
- Python 3.8 atau lebih baru
- pip (Python package manager)

## Instalasi dan Menjalankan Aplikasi

### 1. Menyiapkan Backend Flask

```bash
# Clone repositori (jika menggunakan git)
git clone [URL_REPO]
cd hfmd-detection-system

# Buat virtual environment Python
python -m venv venv

# Aktifkan virtual environment
# Untuk Windows
venv\Scripts\activate
# Untuk macOS/Linux
source venv/bin/activate

# Instal dependensi Python
pip install flask flask-cors tensorflow pillow werkzeug numpy

# Pastikan folder untuk menyimpan upload tersedia
mkdir -p static/uploads

# Jalankan backend Flask
python app.py
```

Backend akan berjalan di http://localhost:5000

### 2. Menyiapkan Frontend Next.js

```bash
# Buka terminal baru, navigasi ke folder proyek
cd hfmd-detection-nextjs

# Instal dependensi Node.js
npm install

# Jalankan server development
npm run dev
```

Frontend akan berjalan di http://localhost:3000

## Fitur

### Halaman Beranda

- Upload gambar untuk deteksi HFMD
- Visualisasi hasil dengan penjelasan rinci
- Indikator kepercayaan deteksi
- Informasi tentang HFMD

### Halaman Riwayat

- Daftar semua deteksi sebelumnya
- Filter dan pencarian hasil
- Visualisasi data dan statistik

### Fitur Chatbot

- Tanya jawab tentang HFMD
- Informasi tentang gejala, pengobatan, dan pencegahan
- Panduan pertanyaan populer

## Pemeliharaan Model

Model ML yang digunakan dalam sistem ini tersimpan di `./static/my_model.h5`. Untuk memperbarui model:

1. Latih model baru menggunakan dataset yang diperbarui
2. Simpan model dalam format .h5
3. Ganti file model yang ada dengan model baru
4. Restart backend Flask

## Pengembangan Lanjutan

Untuk pengembangan lebih lanjut, Anda dapat:

1. Menambahkan otentikasi pengguna
2. Meningkatkan kemampuan chatbot dengan NLP
3. Menambahkan analitik dan dashboard untuk dokter
4. Mengembangkan fitur notifikasi dan pengingat
5. Integrasi dengan sistem rekam medis elektronik

## Teknologi yang Digunakan

- **Frontend**: Next.js, React, Tailwind CSS, Axios
- **Backend**: Flask, TensorFlow, NumPy
- **Penyimpanan Data**: CSV (bisa dikembangkan ke database SQL/NoSQL)
- **Pengolahan Gambar**: TensorFlow, Pillow
