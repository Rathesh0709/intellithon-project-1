# Injury Risk Assessment API Setup Guide

This guide will help you set up and run the FastAPI backend for the Injury Risk Assessment feature.

## Prerequisites

- Python 3.8 or higher
- Required model files:
  - `injury_model_best.h5` (Keras model)
  - `scaler_26features.pkl` (Feature scaler)

## Installation Steps

### 1. Install Required Python Packages

Open a terminal in the `src` directory and run:

```bash
pip install fastapi uvicorn tensorflow numpy pydantic
```

Or create a `requirements.txt` file:

```txt
fastapi==0.104.1
uvicorn==0.24.0
tensorflow==2.15.0
numpy==1.24.3
pydantic==2.5.0
```

Then install:

```bash
pip install -r requirements.txt
```

### 2. Verify Model Files

Make sure these files are in the `src` directory:
- `injury_model_best.h5`
- `scaler_26features.pkl`
- `app.py`

### 3. Run the FastAPI Server

Navigate to the `src` directory and run:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

You should see output like:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### 4. Test the API

Open your browser and visit:
- API docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

You can test the `/predict` endpoint directly from the interactive documentation.

### 5. Run the React Frontend

In a separate terminal, navigate to the project root and run:

```bash
npm run dev
```

The React app should be running on http://localhost:5173

### 6. Access Injury Risk Assessment

1. Log in to the application
2. Click on "Injury Risk" in the navigation menu
3. Fill in player information
4. Click "Assess Risk" to get predictions

## API Endpoint

### POST /predict

**Request Body:**
```json
{
  "age": 25.0,
  "height_cm": 180.0,
  "weight_kg": 75.0,
  "fifa_rating": 85.0,
  "pace": 85.0,
  "physic": 80.0,
  "season_minutes_played": 2500.0,
  "season_games_played": 30.0,
  "total_days_injured": 45.0,
  "season_days_injured": 15.0
}
```

**Response:**
```json
{
  "confidence": 0.6234,
  "chance_of_injury": "HIGH"
}
```

## Troubleshooting

### Port Already in Use
If port 8000 is already in use, you can change it:
```bash
uvicorn app:app --reload --port 8001
```

And update the API URL in `InjuryRiskPage.jsx` to `http://localhost:8001`

### CORS Errors
The API is configured to accept requests from:
- http://localhost:5173 (Vite default)
- http://localhost:3000 (React default)

If your React app runs on a different port, update the `allow_origins` in `app.py`.

### Model Loading Errors
Ensure:
1. TensorFlow version is compatible with the model
2. Model file path is correct
3. Scaler file exists and is accessible

### Connection Refused
Make sure:
1. FastAPI server is running
2. No firewall blocking localhost:8000
3. Correct API URL in the frontend code

## Production Deployment

For production deployment:

1. **Use environment variables** for configuration:
```python
import os
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", "8000"))
```

2. **Run with Gunicorn** (for production):
```bash
pip install gunicorn
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

3. **Update CORS origins** to include your production domain

4. **Add authentication** if needed for production use

## Model Information

The injury prediction model uses the following features:

1. **Physical Attributes:**
   - Age
   - Height (cm)
   - Weight (kg)

2. **Performance Metrics:**
   - FIFA Rating
   - Pace
   - Physic

3. **Season Statistics:**
   - Season Minutes Played
   - Season Games Played

4. **Injury History:**
   - Total Days Injured (Career)
   - Season Days Injured

The model returns a confidence score (0-1) and risk classification (HIGH/LOW).
