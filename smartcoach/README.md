# SmartCoachAI - Football Video Analysis Platform

A modern football video analysis platform for coaches and players to analyze performance, track team metrics, and conduct pre/post match analysis.

## Features

- 🎥 Video Upload & Analysis
- 👤 Player Performance Evaluation
- 📊 Team Performance Monitoring
- ⚽ Pre/Post Match Analysis
- 🏥 AI-Powered Injury Risk Assessment
- 💬 Comments & Likes System
- 🔐 User Authentication

## Tech Stack

- **Frontend**: React 18 with Vite
- **Backend**: FastAPI (Python) + Supabase
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **ML Model**: TensorFlow/Keras
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Routing**: React Router v6

## Getting Started

### 🚀 Quick Start (3 Steps)

1. **Set up Supabase Authentication** (5 minutes)
   - See **[AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md)** for step-by-step instructions
   - Create `.env` file with Supabase credentials
   - Run database schema

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### 📖 Detailed Guides

- **Authentication Setup**: [AUTHENTICATION_GUIDE.md](AUTHENTICATION_GUIDE.md) - Quick visual guide
- **Supabase Setup**: [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Comprehensive setup
- **Installation**: [INSTALLATION.md](INSTALLATION.md) - Platform-specific install help

### Injury Risk Assessment API Setup

For the AI-powered injury risk assessment feature, you need to run the FastAPI backend:

1. Install Python dependencies:
```bash
cd src
pip install fastapi uvicorn tensorflow numpy pydantic
```

2. Run the API server:
```bash
uvicorn app:app --reload --port 8000
```

3. The API will be available at `http://localhost:8000`

For detailed setup instructions, see [INJURY_API_SETUP.md](INJURY_API_SETUP.md)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── context/       # React context for state management
├── assets/        # Static assets
└── main.jsx       # Application entry point
```

## Design System

- **Font**: Inter
- **Primary Color**: Blue (#3b82f6)
- **Background**: Clean white
- **UI Elements**: Rounded corners
- **Aspect Ratio**: Videos in 16:9, 33% viewport width

## Current Features

- ✅ Supabase authentication (sign up, login, logout)
- ✅ User profiles with avatars
- ✅ Protected routes
- ✅ Session persistence
- ✅ Row Level Security (RLS)

## Future Enhancements

- Video storage with Supabase Storage
- Real-time comments and notifications
- Like/unlike functionality with database
- Real-time video streaming
- Advanced analytics dashboard
- Mobile app version
