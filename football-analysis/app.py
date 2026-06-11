from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os, uuid, shutil, traceback, subprocess
from main import main  # Your existing pipeline

app = FastAPI(title="Football Video Analysis API")

# ✅ CORS for frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
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

def reencode_with_ffmpeg(input_file: str, output_file: str) -> str:
    """
    Use system FFmpeg to re-encode input video to H.264 / MP4
    compatible with HTML5 browsers.
    """
    try:
        cmd = [
            "ffmpeg",            # FFmpeg must be in PATH
            "-y",                # overwrite output
            "-i", input_file,    # input file
            "-c:v", "libx264",   # H.264 codec
            "-preset", "fast",    # fast encoding
            "-pix_fmt", "yuv420p",  # ensures browser compatibility
            "-movflags", "+faststart",  # enable streaming in browsers
            output_file
        ]
        subprocess.run(cmd, check=True)
        return output_file
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] FFmpeg failed: {e}")
        raise

@app.post("/analyze_video/")
async def analyze_video(file: UploadFile = File(...)):
    try:
        # Save uploaded file
        video_id = str(uuid.uuid4())
        input_path = os.path.join(INPUT_DIR, f"{video_id}_{file.filename}")
        output_path = os.path.join(OUTPUT_DIR, f"{video_id}_output.mp4")
        browser_path = os.path.join(OUTPUT_DIR, f"{video_id}_browser.mp4")

        with open(input_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # Run your main pipeline (it can return path to processed video)
        print(f"[INFO] Processing video: {input_path}")
        processed_path = main(input_path, output_path)

        # ✅ Re-encode to H.264 MP4 with faststart for browser playback
        final_path = reencode_with_ffmpeg(processed_path, browser_path)
        print(f"[INFO] Video re-encoded for browser: {final_path}")

        # Return browser-playable MP4
        return FileResponse(
            final_path,
            media_type="video/mp4",
            filename=os.path.basename(final_path),
        )

    except Exception as e:
        print(traceback.format_exc())
        return JSONResponse(
            status_code=500,
            content={"error": str(e), "trace": traceback.format_exc()},
        )

@app.get("/")
def home():
    return {"message": "Football Analysis API is running successfully!"}
