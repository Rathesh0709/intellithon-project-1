from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import pickle

app = FastAPI(title="Football Injury Prediction API")

# --- ✅ CORS setup ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to ["http://localhost:3000"] later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load model and scaler ---
MODEL_PATH = "injury_model_best.h5"
model = tf.keras.models.load_model(MODEL_PATH)

with open("scaler_26features.pkl", "rb") as f:
    scaler = pickle.load(f)

# --- Feature names (must match training order) ---
feature_cols = [
    "age", "height_cm", "weight_kg", "fifa_rating",
    "pace", "physic", "season_minutes_played",
    "season_games_played", "total_days_injured", "season_days_injured"
]
extra_features = [f"extra_feature_{i}" for i in range(16)]
all_features = feature_cols + extra_features

# --- Request body model ---
class InjuryFeatures(BaseModel):
    age: float
    height_cm: float
    weight_kg: float
    fifa_rating: float
    pace: float
    physic: float
    season_minutes_played: float
    season_games_played: float
    total_days_injured: float
    season_days_injured: float

# --- Home route ---
@app.get("/")
def home():
    return {"message": "Football Injury Prediction API is running!"}

# --- Predict route ---
@app.post("/predict")
def predict_injury(features: InjuryFeatures):
    # Convert to correct input order
    input_list = [getattr(features, f) for f in feature_cols] + [0] * 16
    input_array = np.array(input_list).reshape(1, -1)

    # Scale input
    input_scaled = scaler.transform(input_array)

    # Predict probability
    pred_prob = float(model.predict(input_scaled)[0][0])
    risk_label = "HIGH" if pred_prob > 0.5 else "LOW"

    return {
        "confidence": round(pred_prob, 4),
        "chance_of_injury": risk_label
    }
