from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os, uuid, shutil, subprocess, traceback
from main import process_video  # Your basketball processing pipeline

app = FastAPI(title="Basketball Video Analysis API")

# ✅ Allow CORS for React frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories
INPUT_DIR = "input_videos"
OUTPUT_DIR = "output_videos"
os.makedirs(INPUT_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

def reencode_mp4(input_file: str, output_file: str) -> str:
    """
    Use system FFmpeg to produce H.264 / MP4 video compatible with browsers.
    """
    cmd = [
        "ffmpeg",
        "-y",
        "-i", input_file,
        "-c:v", "libx264",
        "-preset", "fast",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        output_file
    ]
    subprocess.run(cmd, check=True)
    return output_file

@app.post("/analyze-video/")
async def analyze_video(file: UploadFile = File(...)):
    try:
        # Save uploaded file
        video_id = str(uuid.uuid4())
        input_path = os.path.join(INPUT_DIR, f"{video_id}_{file.filename}")
        output_path = os.path.join(OUTPUT_DIR, f"{video_id}_processed.mp4")
        browser_path = os.path.join(OUTPUT_DIR, f"{video_id}_browser.mp4")

        with open(input_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # Run your basketball processing pipeline
        print(f"[INFO] Processing video: {input_path}")
        process_video(input_path, output_path)

        # Re-encode to browser-compatible MP4
        reencode_mp4(output_path, browser_path)

        return FileResponse(
            browser_path,
            media_type="video/mp4",
            filename=os.path.basename(browser_path),
        )

    except Exception as e:
        print(traceback.format_exc())
        return JSONResponse(
            status_code=500,
            content={"error": str(e), "trace": traceback.format_exc()},
        )

@app.get("/")
def home():
    return {"message": "Basketball Analysis API running successfully!"}
