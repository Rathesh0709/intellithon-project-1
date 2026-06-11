# Quick Start Guide - Injury Risk Assessment

## 🚀 Getting Started in 3 Steps

### Step 1: Install Backend Dependencies
```bash
cd src
pip install fastapi uvicorn tensorflow numpy pydantic
```

### Step 2: Start the API Server

**Option A - Using Batch File (Windows):**
```bash
# Double-click start-injury-api.bat in the project root
```

**Option B - Manual Start:**
```bash
cd src
uvicorn app:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 3: Start the React App
Open a **new terminal** and run:
```bash
npm run dev
```

## ✅ Verify Setup

1. **API Status**: Visit http://localhost:8000/docs
   - You should see the FastAPI interactive documentation
   
2. **React App**: Visit http://localhost:5173
   - Log in to the application
   - Click "Injury Risk" in the navigation menu

## 📝 Test the Feature

1. Go to **Injury Risk** page
2. Fill in sample data:
   - Age: `25`
   - Height: `180`
   - Weight: `75`
   - FIFA Rating: `85`
   - Pace: `85`
   - Physic: `80`
   - Season Minutes: `2500`
   - Season Games: `30`
   - Total Days Injured: `45`
   - Season Days Injured: `15`
3. Click **"Assess Risk"**
4. View the prediction results!

## 🎯 What to Expect

- **Loading**: Spinner appears while processing
- **Results**: Risk level (HIGH/LOW) with confidence percentage
- **Progress Bar**: Visual representation of risk
- **Recommendations**: Personalized advice based on prediction

## 🔧 Troubleshooting

### API Server Won't Start
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Use different port
uvicorn app:app --reload --port 8001
```
Then update API URL in `InjuryRiskPage.jsx` to `http://localhost:8001`

### CORS Error
Make sure both servers are running:
- FastAPI: http://localhost:8000
- React: http://localhost:5173

### Model File Missing
Ensure these files are in the `src` folder:
- `injury_model_best.h5`
- `scaler_26features.pkl`
- `app.py`

### Connection Refused
1. Check FastAPI is running: Visit http://localhost:8000/docs
2. Check console for errors
3. Verify firewall settings

## 📚 Additional Resources

- **Detailed Setup**: See [INJURY_API_SETUP.md](INJURY_API_SETUP.md)
- **Integration Details**: See [INJURY_RISK_INTEGRATION.md](INJURY_RISK_INTEGRATION.md)
- **Main README**: See [README.md](README.md)

## 🎉 Success!

If you can see the prediction results, congratulations! The injury risk assessment system is working correctly.

## 💡 Tips

- Keep both terminals open while using the app
- API docs available at http://localhost:8000/docs
- Test with different player values to see varying predictions
- HIGH risk threshold is confidence > 0.5

## 🛑 Stopping Servers

- **FastAPI**: Press `CTRL+C` in the API terminal
- **React**: Press `CTRL+C` in the React terminal

---

**Need Help?** Check the troubleshooting section in INJURY_API_SETUP.md
