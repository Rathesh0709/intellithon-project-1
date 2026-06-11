from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import pickle

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Keras model (.h5)
MODEL_PATH = "injury_model_best.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# Load scaler
with open("scaler_26features.pkl", "rb") as f:
    scaler = pickle.load(f)

# Feature names (must match training order)
feature_cols = [
    "age", "height_cm", "weight_kg", "fifa_rating",
    "pace", "physic", "season_minutes_played",
    "season_games_played", "total_days_injured", "season_days_injured"
]
extra_features = [f"extra_feature_{i}" for i in range(16)]
all_features = feature_cols + extra_features

# Request body model (10 main features)
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

# --- Injury Type Classification ---
def predict_injury_type(features: InjuryFeatures, base_probability: float):
    """
    Predict the most likely injury type based on player characteristics.
    Uses rule-based logic considering physical attributes, workload, and injury history.
    """
    
    # Calculate risk factors
    age_risk = features.age / 100  # Normalize age
    workload_risk = (features.season_minutes_played / 3500) * (features.season_games_played / 40)
    injury_history_risk = (features.total_days_injured / 365) + (features.season_days_injured / 90)
    pace_risk = features.pace / 100
    physic_risk = 1 - (features.physic / 100)  # Lower physic = higher risk
    
    # Define injury types with their probability calculations
    injury_types = {
        "Muscle Strain": {
            "probability": base_probability * (0.3 + 0.3 * workload_risk + 0.2 * pace_risk + 0.2 * injury_history_risk),
            "description": "Overstretching or tearing of muscle fibers",
            "recovery_time": "2-6 weeks",
            "common_areas": ["Hamstring", "Quadriceps", "Calf"]
        },
        "Ligament Injury": {
            "probability": base_probability * (0.25 + 0.25 * physic_risk + 0.25 * workload_risk + 0.25 * age_risk),
            "description": "Sprain or tear of ligaments connecting bones",
            "recovery_time": "4-12 weeks",
            "common_areas": ["Knee (ACL/MCL)", "Ankle", "Shoulder"]
        },
        "Tendon Injury": {
            "probability": base_probability * (0.2 + 0.4 * age_risk + 0.2 * workload_risk + 0.2 * injury_history_risk),
            "description": "Inflammation or tear of tendons",
            "recovery_time": "3-8 weeks",
            "common_areas": ["Achilles", "Patellar", "Rotator Cuff"]
        },
        "Joint Injury": {
            "probability": base_probability * (0.2 + 0.3 * physic_risk + 0.3 * age_risk + 0.2 * workload_risk),
            "description": "Damage to joint structures including cartilage",
            "recovery_time": "4-16 weeks",
            "common_areas": ["Knee", "Ankle", "Hip"]
        },
        "Bone Stress": {
            "probability": base_probability * (0.15 + 0.35 * workload_risk + 0.25 * pace_risk + 0.25 * physic_risk),
            "description": "Stress fractures or bone contusions",
            "recovery_time": "6-12 weeks",
            "common_areas": ["Metatarsal", "Tibia", "Fibula"]
        },
        "Overuse Injury": {
            "probability": base_probability * (0.25 + 0.4 * workload_risk + 0.2 * age_risk + 0.15 * injury_history_risk),
            "description": "Repetitive stress causing inflammation",
            "recovery_time": "2-8 weeks",
            "common_areas": ["Knee", "Shin", "Foot"]
        }
    }
    
    # Normalize probabilities to sum to base_probability
    total_prob = sum(injury["probability"] for injury in injury_types.values())
    if total_prob > 0:
        for injury_type in injury_types:
            injury_types[injury_type]["probability"] = min(
                injury_types[injury_type]["probability"] / total_prob * base_probability,
                1.0
            )
    
    # Sort by probability
    sorted_injuries = sorted(
        injury_types.items(),
        key=lambda x: x[1]["probability"],
        reverse=True
    )
    
    # Return top 3 most likely injury types
    top_injuries = []
    for injury_name, injury_data in sorted_injuries[:3]:
        top_injuries.append({
            "type": injury_name,
            "probability": round(injury_data["probability"], 4),
            "percentage": round(injury_data["probability"] * 100, 2),
            "description": injury_data["description"],
            "recovery_time": injury_data["recovery_time"],
            "common_areas": injury_data["common_areas"]
        })
    
    return top_injuries

# --- Calculate Detailed Risk Breakdown ---
def calculate_risk_factors(features: InjuryFeatures):
    """Calculate individual risk factor contributions."""
    
    # Age risk (higher age = higher risk)
    age_risk_score = min((features.age - 20) / 15, 1.0) if features.age > 20 else 0
    
    # Workload risk (minutes and games played)
    avg_minutes = features.season_minutes_played / max(features.season_games_played, 1)
    workload_risk_score = min((avg_minutes / 90) * (features.season_games_played / 35), 1.0)
    
    # Injury history risk
    injury_history_score = min((features.total_days_injured / 180) + (features.season_days_injured / 45), 1.0)
    
    # Physical condition risk (lower physic = higher risk)
    physical_risk_score = max(1 - (features.physic / 100), 0)
    
    # Pace risk (high pace players more prone to muscle injuries)
    pace_risk_score = min(features.pace / 100, 1.0) * 0.7  # Scale down pace importance
    
    return {
        "age": {
            "score": round(age_risk_score, 3),
            "percentage": round(age_risk_score * 100, 1),
            "level": "HIGH" if age_risk_score > 0.7 else "MEDIUM" if age_risk_score > 0.4 else "LOW",
            "description": f"Player age is {features.age} years"
        },
        "workload": {
            "score": round(workload_risk_score, 3),
            "percentage": round(workload_risk_score * 100, 1),
            "level": "HIGH" if workload_risk_score > 0.7 else "MEDIUM" if workload_risk_score > 0.4 else "LOW",
            "description": f"{features.season_games_played} games, {features.season_minutes_played} minutes played"
        },
        "injury_history": {
            "score": round(injury_history_score, 3),
            "percentage": round(injury_history_score * 100, 1),
            "level": "HIGH" if injury_history_score > 0.7 else "MEDIUM" if injury_history_score > 0.4 else "LOW",
            "description": f"{features.total_days_injured} total days injured, {features.season_days_injured} this season"
        },
        "physical_condition": {
            "score": round(physical_risk_score, 3),
            "percentage": round(physical_risk_score * 100, 1),
            "level": "HIGH" if physical_risk_score > 0.7 else "MEDIUM" if physical_risk_score > 0.4 else "LOW",
            "description": f"Physic rating: {features.physic}"
        },
        "pace_intensity": {
            "score": round(pace_risk_score, 3),
            "percentage": round(pace_risk_score * 100, 1),
            "level": "HIGH" if pace_risk_score > 0.7 else "MEDIUM" if pace_risk_score > 0.4 else "LOW",
            "description": f"Pace rating: {features.pace}"
        }
    }

# --- Enhanced Prediction Endpoint ---
@app.post("/predict")
def predict_injury(features: InjuryFeatures):
    try:
        # Convert to correct input order
        input_list = [getattr(features, f) for f in feature_cols] + [0] * 16
        input_array = np.array(input_list).reshape(1, -1)

        # Apply dummy (or real) scaler
        input_scaled = scaler.transform(input_array)

        # Predict base probability
        pred_prob = float(model.predict(input_scaled)[0][0])
        risk_label = "HIGH" if pred_prob > 0.5 else "LOW"
        
        # Get injury type predictions
        injury_predictions = predict_injury_type(features, pred_prob)
        
        # Calculate risk factor breakdown
        risk_factors = calculate_risk_factors(features)
        
        # Calculate overall risk level (1-10 scale)
        risk_score = min(int(pred_prob * 10) + 1, 10)

        return {
            # Overall Risk
            "overall_risk": {
                "confidence": round(pred_prob, 4),
                "percentage": round(pred_prob * 100, 2),
                "level": risk_label,
                "risk_score": risk_score,
                "description": f"Risk level {risk_score}/10"
            },
            
            # Injury Type Predictions (Top 3)
            "injury_predictions": injury_predictions,
            
            # Risk Factor Breakdown
            "risk_factors": risk_factors,
            
            # Prevention Recommendations
            "recommendations": generate_recommendations(risk_label, risk_factors, injury_predictions),
            
            # Player Summary
            "player_summary": {
                "age": features.age,
                "fitness_rating": features.fifa_rating,
                "games_played": features.season_games_played,
                "minutes_played": features.season_minutes_played,
                "injury_days_season": features.season_days_injured,
                "injury_days_career": features.total_days_injured
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Recommendation Generator ---
def generate_recommendations(risk_level: str, risk_factors: dict, injury_predictions: list):
    """Generate personalized recommendations based on risk analysis."""
    
    recommendations = []
    
    # High-level recommendations based on risk
    if risk_level == "HIGH":
        recommendations.append({
            "priority": "CRITICAL",
            "category": "Immediate Action",
            "recommendation": "Consider rotating player to reduce immediate workload"
        })
    
    # Age-specific recommendations
    if risk_factors["age"]["level"] in ["HIGH", "MEDIUM"]:
        recommendations.append({
            "priority": "HIGH",
            "category": "Age Management",
            "recommendation": "Implement enhanced recovery protocols between matches"
        })
    
    # Workload recommendations
    if risk_factors["workload"]["level"] == "HIGH":
        recommendations.append({
            "priority": "HIGH",
            "category": "Workload Management",
            "recommendation": "Reduce training intensity and match minutes over next 2-3 weeks"
        })
    
    # Injury history recommendations
    if risk_factors["injury_history"]["level"] in ["HIGH", "MEDIUM"]:
        recommendations.append({
            "priority": "HIGH",
            "category": "Injury Prevention",
            "recommendation": "Schedule regular physiotherapy and strengthening exercises"
        })
    
    # Physical condition recommendations
    if risk_factors["physical_condition"]["level"] in ["HIGH", "MEDIUM"]:
        recommendations.append({
            "priority": "MEDIUM",
            "category": "Physical Training",
            "recommendation": "Focus on strength and conditioning programs"
        })
    
    # Injury-specific recommendations
    if injury_predictions:
        top_injury = injury_predictions[0]
        injury_type = top_injury["type"]
        
        if "Muscle" in injury_type:
            recommendations.append({
                "priority": "MEDIUM",
                "category": "Muscle Care",
                "recommendation": "Emphasize dynamic warm-ups and proper cool-down routines"
            })
        elif "Ligament" in injury_type or "Joint" in injury_type:
            recommendations.append({
                "priority": "MEDIUM",
                "category": "Joint Protection",
                "recommendation": "Include proprioception and balance training"
            })
        elif "Tendon" in injury_type:
            recommendations.append({
                "priority": "MEDIUM",
                "category": "Tendon Health",
                "recommendation": "Implement gradual load progression and eccentric exercises"
            })
    
    # General recommendations
    recommendations.extend([
        {
            "priority": "LOW",
            "category": "Monitoring",
            "recommendation": "Track daily wellness markers (sleep, fatigue, soreness)"
        },
        {
            "priority": "LOW",
            "category": "Nutrition",
            "recommendation": "Ensure adequate nutrition and hydration for recovery"
        }
    ])
    
    return recommendations[:8]  # Return top 8 recommendations
