from flask import Flask, render_template, request, redirect, url_for
import os
from datetime import datetime
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from werkzeug.utils import secure_filename
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Load the model
model = tf.keras.models.load_model('./static/my_model.h5')

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

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('index.html', error="No file part")

        file = request.files['file']
        
        if file.filename == '':
            return render_template('index.html', error="No selected file")

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

            # Get the encoded image for display
            encoded_img = get_encoded_img(filepath)

            # Get detailed explanation based on prediction
            explanation = get_hfmd_explanation(confidence)
            result_type = 'HFMD' if predicted_class == 1 else 'Non-HFMD'
            detailed_result = explanation[result_type]

            return render_template('index.html', 
                                image_data=encoded_img,
                                result=result_type,
                                confidence=f"{confidence * 100:.2f}%",
                                detailed_result=detailed_result)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)