from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
from datetime import datetime
import random
from werkzeug.utils import secure_filename
import base64
import csv

app = Flask(__name__)
CORS(app)  # Aktifkan CORS untuk integrasi dengan Next.js

# Configuration
UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# CSV file path
RESULT_CSV_FILE = './static/hfmd_detection_results.csv'
if not os.path.exists('./static'):
    os.makedirs('./static')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_encoded_img(img_path):
    with open(img_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

def get_hfmd_explanation(confidence):
    confidence_percentage = confidence * 100
    explanation = {
        'HFMD': {
            'title': 'Hand, Foot, and Mouth Disease (HFMD) Detected',
            'description': f"""
            Hasil deteksi menunjukkan ini adalah kasus HFMD dengan tingkat keyakinan {confidence_percentage:.2f}%.
            
            HFMD adalah penyakit virus yang umumnya mempengaruhi anak-anak di bawah usia 5 tahun. 
            Gejala yang terdeteksi mungkin termasuk:
            • Ruam atau bintik merah pada kulit
            • Lepuhan pada mulut
            • Demam
            • Kehilangan nafsu makan
            
            Rekomendasi:
            1. Segera konsultasi dengan dokter
            2. Jaga kebersihan dan hindari kontak langsung
            3. Pastikan cukup istirahat dan hidrasi
            4. Isolasi untuk mencegah penyebaran""",
            'severity': 'tinggi' if confidence_percentage > 85 else 'sedang' if confidence_percentage > 70 else 'ringan'
        },
        'Non-HFMD': {
            'title': 'Bukan HFMD',
            'description': f"""
            Hasil deteksi menunjukkan ini BUKAN kasus HFMD dengan tingkat keyakinan {(1-confidence) * 100:.2f}%.
            
            Meskipun tidak terdeteksi sebagai HFMD, jika ada gejala yang mengkhawatirkan seperti:
            • Demam tinggi
            • Ruam yang tidak biasa
            • Rasa tidak nyaman yang berkelanjutan
            
            Rekomendasi:
            1. Tetap perhatikan perkembangan gejala
            2. Jaga kebersihan dan kesehatan
            3. Jika gejala memburuk, segera konsultasi dengan dokter
            4. Dokumentasikan setiap perubahan kondisi""",
            'severity': 'normal'
        }
    }
    return explanation

def save_detection_result(filename, result_type, confidence, severity):
    # Generate a unique ID for the detection
    detection_id = f"DETECT_{datetime.now().strftime('%Y%m%d%H%M%S')}"

    # Check if the CSV file exists
    file_exists = os.path.isfile(RESULT_CSV_FILE)

    # Open the CSV file in append mode
    with open(RESULT_CSV_FILE, mode='a', newline='') as csvfile:
        fieldnames = ['id', 'filename', 'result_type', 'confidence', 'severity']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        # Write the header if the file is new
        if not file_exists:
            writer.writeheader()

        # Write the detection result to the CSV
        writer.writerow({
            'id': detection_id,
            'filename': filename,
            'result_type': result_type,
            'confidence': confidence,
            'severity': severity
        })

    print(f"Detection result saved to {RESULT_CSV_FILE}")
    return detection_id

# Fungsi untuk memastikan template ada
def ensure_templates_exist():
    if not os.path.exists('templates'):
        os.makedirs('templates')
    
    # Buat file index.html jika tidak ada
    if not os.path.exists('templates/index.html'):
        with open('templates/index.html', 'w') as f:
            f.write("""
            <!DOCTYPE html>
            <html>
            <head>
                <title>HFMD Detection System</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                    h1 { color: #0066cc; }
                    .container { margin-top: 30px; }
                </style>
            </head>
            <body>
                <h1>HFMD Detection System</h1>
                <p>This is a simple API server for HFMD detection. Use POST requests to upload endpoint to detect HFMD from images.</p>
                
                <div class="container">
                    <h2>Upload Form</h2>
                    <form action="/" method="post" enctype="multipart/form-data">
                        <input type="file" name="file" accept="image/*">
                        <button type="submit">Upload & Detect</button>
                    </form>
                </div>
            </body>
            </html>
            """)
    
    # Buat file history.html jika tidak ada
    if not os.path.exists('templates/history.html'):
        with open('templates/history.html', 'w') as f:
            f.write("""
            <!DOCTYPE html>
            <html>
            <head>
                <title>HFMD Detection History</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                    h1 { color: #0066cc; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>HFMD Detection History</h1>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Filename</th>
                            <th>Result</th>
                            <th>Confidence</th>
                            <th>Severity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for item in data %}
                        <tr>
                            <td>{{ item.id }}</td>
                            <td>{{ item.filename }}</td>
                            <td>{{ item.result_type }}</td>
                            <td>{{ item.confidence }}</td>
                            <td>{{ item.severity }}</td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
            </body>
            </html>
            """)

# Pastikan template ada sebelum memulai server
ensure_templates_exist()

@app.route('/', methods=['GET', 'POST'])
def index():
    print(f"Menerima request {request.method}")
    
    if request.method == 'POST':
        print("Memproses POST request")
        
        if 'file' not in request.files:
            print("Tidak ada file dalam request")
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']
        
        if file.filename == '':
            print("Nama file kosong")
            return jsonify({"error": "No selected file"}), 400

        if file and allowed_file(file.filename):
            print(f"File diterima: {file.filename}")
            
            # Save the file
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            filename = secure_filename(file.filename)
            file_up_name = f"{timestamp}_{filename}"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], file_up_name)
            file.save(filepath)
            print(f"File disimpan di: {filepath}")

            # Simulasi prediksi karena model tidak tersedia
            confidence = random.uniform(0.4, 0.9)
            predicted_class = 1 if confidence > 0.5 else 0

            # Get detailed explanation based on prediction
            explanation = get_hfmd_explanation(confidence)
            result_type = 'HFMD' if predicted_class == 1 else 'Non-HFMD'
            detailed_result = explanation[result_type]

            # Save the detection result to the CSV
            detection_id = save_detection_result(file_up_name, result_type, f"{confidence * 100:.2f}%", detailed_result['severity'])

            # Get the encoded image for display
            encoded_img = get_encoded_img(filepath)

            # Prepare response
            response_data = {
                "id": detection_id,
                "image_data": encoded_img,
                "result": result_type,
                "confidence": f"{confidence * 100:.2f}%",
                "detailed_result": detailed_result,
                "filename": file_up_name
            }
            
            print("Mengirim respons: Deteksi berhasil")
            return jsonify(response_data)
        else:
            print("Tipe file tidak didukung")
            return jsonify({"error": "File type not allowed"}), 400

    # Untuk GET request
    print("Mengembalikan halaman HTML")
    return render_template('index.html')

@app.route('/history', methods=['GET'])
def history():
    try:
        data = []
        if os.path.exists(RESULT_CSV_FILE):
            with open(RESULT_CSV_FILE, 'r') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    data.append(row)
        
        # Return JSON data for API requests
        if request.headers.get('Accept') == 'application/json' or request.args.get('format') == 'json':
            return jsonify(data)
        
        # Return HTML for web browser requests
        return render_template('history.html', data=data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/templates/<path:path>')
def serve_template(path):
    return render_template(path)

# Tambahkan header CORS untuk semua respons
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    # Disable auto-reloader
    app.run(debug=True, use_reloader=False, port=5000)