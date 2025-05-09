# HFMD Detection System

Sistem deteksi Hand, Foot, and Mouth Disease (HFMD) menggunakan machine learning dengan frontend Next.js dan backend Flask.

## Struktur Proyek

Proyek ini terdiri dari dua bagian utama:

```
HFMD-Detection/
├── frontend/       # Next.js App Router
│   ├── app/        # Halaman dan struktur routing
│   ├── components/ # Komponen UI yang dapat digunakan kembali
│   └── utils/      # Utility functions
│
└── backend/        # Flask Python API
    ├── static/     # File statis dan uploads
    ├── templates/  # Template HTML
    └── app.py      # Aplikasi Flask utama
```

## Teknologi yang Digunakan

### Frontend
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Axios untuk HTTP requests

### Backend
- Flask Python
- TensorFlow / Keras (untuk model ML)
- Werkzeug (untuk file handling)
- Flask-CORS (untuk menangani cross-origin requests)

## Fitur Utama

- Upload gambar untuk deteksi HFMD
- Visualisasi hasil deteksi dengan confidence level
- Riwayat hasil deteksi
- Chatbot untuk informasi tentang HFMD
- Responsif untuk berbagai ukuran layar

## Prasyarat

Sebelum menjalankan proyek, pastikan Anda memiliki:

- Node.js 18+ dan npm
- Python 3.8+
- pip (Python package manager)

## Instalasi dan Menjalankan Aplikasi

### Backend (Flask)

1. Buka terminal dan navigasi ke folder backend
   ```bash
   cd backend
   ```

2. Buat dan aktifkan virtual environment Python
   ```bash
   # Membuat virtual environment
   python -m venv venv

   # Aktivasi di Windows
   venv\Scripts\activate
   
   # Aktivasi di macOS/Linux
   source venv/bin/activate
   ```

3. Instal dependensi Python
   ```bash
   pip install flask flask-cors pillow numpy werkzeug
   ```

4. Jalankan server dalam mode development
   ```bash
   # Gunakan simple_flask.py untuk simulasi tanpa TensorFlow
   python simple_flask.py

   # ATAU gunakan app.py jika model TensorFlow tersedia
   python app.py
   ```

   Server Flask akan berjalan di http://localhost:5000

### Frontend (Next.js)

1. Buka terminal baru dan navigasi ke folder frontend
   ```bash
   cd frontend
   ```

2. Instal dependensi Node.js
   ```bash
   npm install
   ```

3. Jalankan server development
   ```bash
   npm run dev
   ```

   Frontend akan berjalan di http://localhost:3000

## Panduan Penggunaan

### Halaman Utama
- Upload gambar dengan drag & drop atau klik area upload
- Klik "Detect HFMD" untuk memproses gambar
- Lihat hasil deteksi dengan penjelasan rinci

### Halaman History
- Lihat semua riwayat deteksi yang pernah dilakukan
- Informasi termasuk ID, tanggal/waktu, hasil, confidence level, dan severity
- Klik tombol "View Image" untuk melihat gambar yang diupload

### Halaman Chatbot
- Tanyakan informasi tentang HFMD (gejala, pencegahan, pengobatan, dll.)
- Gunakan tips bertanya untuk mendapatkan jawaban yang lebih spesifik

## Struktur Direktori Detail

### Frontend

```
frontend/
├── app/
│   ├── page.js            # Halaman utama
│   ├── history/
│   │   └── page.js        # Halaman riwayat
│   ├── chatbot/
│   │   └── page.js        # Halaman chatbot
│   ├── api/
│   │   └── image/
│   │       └── [filename]/
│   │           └── route.js  # API route untuk gambar
│   └── layout.js          # Layout utama (berlaku untuk semua halaman)
├── components/
│   ├── ImageUploader/
│   │   └── index.js       # Komponen upload gambar
│   ├── ResultCard/
│   │   └── index.js       # Komponen hasil deteksi
│   └── ...                # Komponen lainnya
├── utils/
│   └── api.js             # Fungsi-fungsi untuk API calls
├── next.config.js         # Konfigurasi Next.js
├── package.json           # Dependensi Node.js
├── tailwind.config.js     # Konfigurasi Tailwind CSS
└── .gitignore             # File gitignore
```

### Backend

```
backend/
├── static/
│   ├── uploads/            # Folder untuk gambar yang diupload
│   ├── my_model.h5         # File model ML (jika menggunakan app.py)
│   └── hfmd_detection_results.csv  # File CSV untuk history
├── templates/
│   ├── index.html          # Halaman utama (versi HTML)
│   └── history.html        # Halaman history (versi HTML)
├── app.py                  # Server Flask dengan TensorFlow
├── simple_flask.py         # Server Flask sederhana (tanpa TensorFlow)
└── .gitignore              # File gitignore
```

## Pengembangan Lanjutan

### Menambahkan Model ML Sendiri

Jika ingin menggunakan model ML Anda sendiri:

1. Latih model TensorFlow/Keras Anda
2. Simpan model dalam format `.h5`
3. Tempatkan file model di `backend/static/my_model.h5`
4. Gunakan `app.py` daripada `simple_flask.py`

### Mode Produksi

Untuk deployment ke produksi:

#### Frontend
```bash
# Build frontend
npm run build

# Jalankan dalam mode produksi
npm start
```

#### Backend
```bash
# Install gunicorn (server produksi)
pip install gunicorn

# Jalankan dengan gunicorn
gunicorn app:app
```

## Pemecahan Masalah

### Frontend

1. **Error "Cannot find module"**
   - Periksa apakah semua dependensi telah diinstal
   - Jalankan `npm install` lagi

2. **Tailwind CSS tidak berfungsi**
   - Periksa konfigurasi di `tailwind.config.js`
   - Periksa import di `globals.css`

3. **Error CORS saat menghubungi backend**
   - Pastikan server Flask berjalan
   - Periksa konfigurasi CORS di backend

### Backend

1. **Error TensorFlow**
   - Jika model tidak ditemukan, gunakan `app2.py`
   - Jika TensorFlow tidak bisa diinstal, gunakan mode simulasi

2. **Error file permission**
   - Pastikan folder `static/uploads` memiliki permission yang benar
   - Pastikan server memiliki akses ke folder tersebut

3. **Server Flask tidak merespons**
   - Periksa apakah server berjalan dengan benar
   - Periksa log error di terminal


## Kontak

Untuk pertanyaan atau masukan, silakan hubungi melalui akbarprdn2512@gmail.com.

---

Dikembangkan oleh Bagas Dwi Santosa (@BagasDwiSantosa) & Muhammad Akbar Pradana (@Devaaldo) © 2025
