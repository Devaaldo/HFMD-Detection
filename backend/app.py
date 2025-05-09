from flask import Flask, render_template, request, redirect, url_for, jsonify, send_from_directory
from flask_cors import CORS
import os
from datetime import datetime
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from werkzeug.utils import secure_filename
import base64
from io import BytesIO
from PIL import Image
import csv
import json

app = Flask(__name__)
CORS(app)  # Aktifkan CORS untuk integrasi dengan Next.js

# Configuration
UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Load the model
model = tf.keras.models.load_model('./static/my_model.h5')

# CSV file path
RESULT_CSV_FILE = './static/hfmd_detection_results.csv'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    return img_array

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

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if file and allowed_file(file.filename):
            # Save the file
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            filename = secure_filename(file.filename)
            file_up_name = f"{timestamp}_{filename}"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], file_up_name)
            file.save(filepath)

            # Preprocess and predict
            preprocessed_img = preprocess_image(filepath)
            predictions = model.predict(preprocessed_img)
            predicted_class = (predictions >= 0.5).astype(int)[0][0]
            confidence = predictions[0][0]

            # Get detailed explanation based on prediction
            explanation = get_hfmd_explanation(confidence)
            result_type = 'HFMD' if predicted_class == 1 else 'Non-HFMD'
            detailed_result = explanation[result_type]

            # Save the detection result to the CSV
            detection_id = save_detection_result(file_up_name, result_type, f"{confidence * 100:.2f}%", detailed_result['severity'])

            # Get the encoded image for display
            encoded_img = get_encoded_img(filepath)

            # Return JSON response for Next.js frontend
            return jsonify({
                "id": detection_id,
                "image_data": encoded_img,
                "result": result_type,
                "confidence": f"{confidence * 100:.2f}%",
                "detailed_result": detailed_result,
                "filename": file_up_name
            })

    # Return template for HTML version (fallback)
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

@app.route('/chatbot', methods=['GET', 'POST'])
def chatbot():
    if request.method == 'POST':
        try:
            data = request.get_json()
            message = data.get('message', '')
            
            # Simple chatbot logic - in real implementation, this could be more sophisticated
            responses = {
                'hallo': 'Halo! Saya adalah HFMD Assistant. Ada yang bisa saya bantu tentang HFMD?',
                'apa itu hfmd': 'HFMD (Hand, Foot, and Mouth Disease) adalah penyakit virus yang umum terjadi pada bayi dan anak-anak. Penyakit ini disebabkan oleh virus dalam kelompok enterovirus, terutama virus Coxsackie A16.',
                'gejala': 'Gejala HFMD biasanya dimulai dengan demam, sakit tenggorokan, dan kehilangan nafsu makan. Setelah 1-2 hari, akan muncul luka di mulut dan ruam tidak gatal di tangan, kaki, dan terkadang bokong.',
                'pengobatan': 'Tidak ada pengobatan spesifik untuk HFMD. Perawatan berfokus pada meringankan gejala seperti obat pereda nyeri, menjaga cairan tubuh, dan istirahat yang cukup.',
                'pencegahan': 'Pencegahan HFMD meliputi mencuci tangan secara teratur, menghindari kontak dekat dengan orang yang terinfeksi, dan membersihkan permukaan yang sering disentuh.',
                'berapa lama': 'HFMD biasanya sembuh sendiri dalam waktu 7-10 hari tanpa pengobatan khusus.'
            }
            
            response = 'Maaf, saya tidak mengerti pertanyaan Anda. Bisakah Anda bertanya tentang gejala HFMD, cara pencegahan, atau pengobatannya?'
            
            # Check if message contains any keywords
            for key, value in responses.items():
                if key in message.lower():
                    response = value
                    break
            
            return jsonify({"reply": response})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    # Return HTML for GET requests
    return render_template('chatbot.html')

# Add a simple healthcheck endpoint
@app.route('/api/healthcheck', methods=['GET'])
def healthcheck():
    return jsonify({"status": "ok", "message": "HFMD Detection API is running"})

if __name__ == '__main__':
    app.run(debug=True)