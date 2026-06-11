from flask import Flask, request, jsonify, send_file
from ultralytics import YOLO
import cv2
import os
from flask_cors import CORS
import uuid
import subprocess

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])  # Enable CORS

model = YOLO(r"model\best.pt")  # Make sure path is correct

OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def reencode_mp4(input_path: str, output_path: str) -> str:
    """
    Re-encode video with H.264 codec for HTML5 browser compatibility.
    Requires FFmpeg installed and in PATH.
    """
    cmd = [
        "ffmpeg",
        "-y",
        "-i", input_path,
        "-c:v", "libx264",
        "-preset", "fast",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        output_path
    ]
    subprocess.run(cmd, check=True)
    return output_path

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = file.filename
    ext = filename.split('.')[-1].lower()
    video_id = str(uuid.uuid4())
    input_path = os.path.join(OUTPUT_DIR, f"{video_id}_{filename}")
    file.save(input_path)

    if ext in ['mp4', 'avi', 'mov']:
        cap = cv2.VideoCapture(input_path)
        if not cap.isOpened():
            return jsonify({"error": "Failed to read video"}), 500

        frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = cap.get(cv2.CAP_PROP_FPS)
        if fps == 0:
            fps = 25

        temp_output = os.path.join(OUTPUT_DIR, f"{video_id}_temp.mp4")
        out = cv2.VideoWriter(temp_output, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))

        while True:
            ret, frame = cap.read()
            if not ret:
                break
            results = model(frame)
            annotated_frame = results[0].plot()
            if annotated_frame is None:
                return jsonify({"error": "Model returned None"}), 500
            out.write(annotated_frame)

        cap.release()
        out.release()

        final_output = os.path.join(OUTPUT_DIR, f"{video_id}_browser.mp4")
        # Re-encode with FFmpeg to H.264 MP4
        reencode_mp4(temp_output, final_output)

        return send_file(final_output, mimetype='video/mp4', as_attachment=True)

    elif ext in ['jpg', 'jpeg', 'png']:
        frame = cv2.imread(input_path)
        results = model(frame)
        annotated_frame = results[0].plot()
        output_path = os.path.join(OUTPUT_DIR, f"{video_id}_annotated.png")
        cv2.imwrite(output_path, annotated_frame)
        return send_file(output_path, mimetype='image/png', as_attachment=True)
    else:
        return jsonify({"error": "Unsupported file type"}), 400

if __name__ == '__main__':
    app.run(debug=True, host="127.0.0.1", port=5000)
