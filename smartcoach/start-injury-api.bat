@echo off
echo ========================================
echo SmartCoachAI Injury Risk API Server
echo ========================================
echo.
echo Starting FastAPI server on port 8000...
echo.
cd src
uvicorn app:app --reload --port 8000
pause
