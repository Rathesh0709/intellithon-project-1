from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
import os, uuid, shutil, traceback
from main import main  # import your main pipeline

app = FastAPI(title="Football Video Analysis API")

INPUT_DIR = "input_videos"
OUTPUT_DIR = "output_videos"

os.makedirs(INPUT_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)


@app.post("/analyze_video/")
async def analyze_video(file: UploadFile = File(...)):
    try:
        # Save uploaded file
        video_id = str(uuid.uuid4())
        input_path = os.path.join(INPUT_DIR, f"{video_id}_{file.filename}")
        output_path = os.path.join(OUTPUT_DIR, f"{video_id}_output.avi")

        with open(input_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # Run your full pipeline
        print(f"[INFO] Processing video: {input_path}")
        processed_path = main(input_path, output_path)

        # Return output video file
        return FileResponse(
            processed_path,
            media_type="video/x-msvideo",
            filename=os.path.basename(processed_path),
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
