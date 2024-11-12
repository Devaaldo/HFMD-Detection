# HFMD Detection System

## Overview
HFMD Detection System adalah aplikasi berbasis web yang dikembangkan menggunakan Flask dan TensorFlow untuk mendeteksi Hand, Foot, and Mouth Disease (HFMD) melalui analisis gambar. Sistem ini menggunakan arsitektur ResNet50 yang telah dilatih khusus untuk mengenali karakteristik HFMD.

## Fitur
- Upload gambar untuk deteksi HFMD
- Preprocessing gambar otomatis
- Visualisasi hasil deteksi
- Penjelasan detail hasil diagnosis
- Rekomendasi tindak lanjut
- Indikator tingkat keparahan
- Interface yang user-friendly

## Teknologi yang Digunakan
- Python 3.8+
- Flask (Web Framework)
- TensorFlow 2.x
- ResNet50 (Pre-trained Model)
- HTML/CSS
- Bootstrap (Styling)

## Persyaratan Sistem
- Python 3.8 atau versi lebih baru
- Pip (Python package installer)
- Virtual Environment
- Minimal RAM 4GB
- Ruang disk kosong minimal 2GB

## Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/hfmd-detection.git
cd hfmd-detection
```

### 2. Membuat Virtual Environment
Untuk Windows:
```bash
python -m venv venv
venv\Scripts\activate
```

Untuk Linux/Mac:
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalasi Dependencies
```bash
pip install -r requirements.txt
```

Atau install manual satu persatu:
```bash
pip install flask
pip install tensorflow
pip install pillow
pip install numpy
pip install werkzeug
```

## Struktur Direktori
```
hfmd-detection/
│
├── app.py                 # File utama aplikasi Flask
├── my_model.h5           # Model ResNet50 yang telah dilatih
├── requirements.txt      # Daftar dependencies
├── README.md            # Dokumentasi
│
├── static/              # Asset statis (CSS, JS, dll)
│   └── style.css
│
├── templates/           # Template HTML
│   └── index.html
│
└── uploads/            # Folder untuk menyimpan gambar yang diupload
```

## Cara Penggunaan

### 1. Menjalankan Aplikasi
Setelah mengaktifkan virtual environment:
```bash
python app.py
```
Aplikasi akan berjalan di `http://localhost:5000`

### 2. Menggunakan Sistem
1. Buka browser dan akses `http://localhost:5000`
2. Klik tombol "Choose File" untuk memilih gambar
3. Pilih gambar yang ingin dianalisis (format: jpg, jpeg, atau png)
4. Klik "Upload dan Deteksi"
5. Sistem akan memproses gambar dan menampilkan hasil:
   - Hasil deteksi (HFMD/Non-HFMD)
   - Tingkat keyakinan (confidence level)
   - Penjelasan detail
   - Rekomendasi tindak lanjut

## Model ResNet50

### Arsitektur Model
Model yang digunakan adalah ResNet50 yang telah dimodifikasi untuk deteksi HFMD:
- Input layer: 224x224x3
- ResNet50 base model (pre-trained pada ImageNet)
- Custom top layers untuk klasifikasi biner
- Output layer dengan aktivasi sigmoid

### Preprocessing Gambar
Sebelum diproses oleh model, gambar akan melalui tahapan preprocessing:
1. Resize ke ukuran 224x224 pixel
2. Normalisasi pixel values (0-1)
3. Ekspansi dimensi untuk batch processing



