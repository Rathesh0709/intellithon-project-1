from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import pickle

app = FastAPI(title="NBA Player Injury Prediction API")

# Allow all origins (you can restrict this to your frontend domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or e.g. ["http://localhost:3000", "https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example input features (update to match your model input)
feature_names = [
    "SEASON_NUM", "AGE", "PLAYER_HEIGHT_INCHES", "PLAYER_WEIGHT", "GP", "MIN", "USG_PCT", "PACE", "POSS", "FGA_PG",
    "DRIVES", "DRIVE_FGA", "DRIVE_PASSES", "DIST_MILES", "AVG_SPEED", "PULL_UP_FGA", "PULL_UP_FG3A",
    "TOUCHES", "FRONT_CT_TOUCHES", "AVG_SEC_PER_TOUCH", "AVG_DRIB_PER_TOUCH",
    "ELBOW_TOUCHES", "POST_TOUCHES", "PAINT_TOUCHES"
]

# Define input data model
class NBAPlayerFeatures(BaseModel):
    SEASON_NUM: float
    AGE: int
    PLAYER_HEIGHT_INCHES: int
    PLAYER_WEIGHT: int
    GP: int
    MIN: float
    USG_PCT: float
    PACE: float
    POSS: int
    FGA_PG: float
    DRIVES: float
    DRIVE_FGA: float
    DRIVE_PASSES: float
    DIST_MILES: float
    AVG_SPEED: float
    PULL_UP_FGA: float
    PULL_UP_FG3A: float
    TOUCHES: float
    FRONT_CT_TOUCHES: float
    AVG_SEC_PER_TOUCH: float
    AVG_DRIB_PER_TOUCH: float
    ELBOW_TOUCHES: float
    POST_TOUCHES: float
    PAINT_TOUCHES: float


# Load model and scaler
model = tf.keras.models.load_model("injury_keras_nba_best.h5")

with open("scaler_nba.pkl", "rb") as f:
    scaler = pickle.load(f)


@app.get("/")
def home():
    return {"message": "NBA Injury Prediction API is running!"}


@app.post("/predict")
def predict_nba_injury(data: NBAPlayerFeatures):
    # Extract and scale input features
    values = [getattr(data, field) for field in feature_names]
    arr = np.array(values).reshape(1, -1)
    scaled = scaler.transform(arr)

    # Model prediction
    prob = float(model.predict(scaled)[0][0])
    label = "HIGH" if prob > 0.5 else "LOW"

    return {
        "confidence": round(prob, 4),
        "chance_of_injury": label
    }
