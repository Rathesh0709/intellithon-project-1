# SmartCoachAI - Installation Guide

## Quick Start

### Option 1: Using Command Prompt (Recommended)
1. Open **Command Prompt** (cmd)
2. Navigate to the project folder:
   ```bash
   cd C:\Users\Prajval\Downloads\archive
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Option 2: Enable PowerShell Scripts
1. Open PowerShell as Administrator
2. Run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Then run:
   ```powershell
   npm install
   npm run dev
   ```

## After Installation

Once the dev server is running, open your browser and go to:
- **http://localhost:5173**

You should see the Welcome Page with:
- SmartCoachAI branding
- "Get Started" and "Sign In" buttons
- Football equipment illustrations at the bottom
- Smooth fade-in animation

## Testing the Application

### 1. Welcome Page
- Visit `http://localhost:5173`
- Click "Get Started" or "Sign In"

### 2. Sign Up
- Create a new account with:
  - Username (minimum 3 characters)
  - Email address
  - Password (minimum 6 characters)

### 3. Player Analysis Page
- After login, you'll be redirected here
- Click "Upload Video" to add a video
- Videos will appear in a grid layout (16:9 aspect ratio, 33% viewport width)
- Like and comment on videos

### 4. Upload Video
- Fill in title and description
- Upload a thumbnail (optional)
- Upload a video file
- Click "Upload Video"

### 5. Pre/Post Match Analysis
- View match clips with automated tagging
- Use search and filter options
- Review different game stages

### 6. Team Monitoring
- View overall team performance
- Check individual player rankings
- Monitor performance trends
- Review alerts and warnings

### 7. Navigation
- Click on your avatar (top right)
- Select "Log Out" to return to Welcome Page

## Project Structure

```
archive/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Layout.jsx
│   │   └── Navbar.jsx
│   ├── context/          # React Context (state management)
│   │   ├── AuthContext.jsx
│   │   └── VideoContext.jsx
│   ├── pages/            # Page components
│   │   ├── WelcomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── PlayerAnalysisPage.jsx
│   │   ├── UploadVideoPage.jsx
│   │   ├── PrePostMatchPage.jsx
│   │   └── TeamMonitoringPage.jsx
│   ├── App.jsx           # Main app with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json
├── tailwind.config.js
├── vite.config.js
└── index.html

## Features Implemented

✅ Welcome Page with fade-in animation and football imagery
✅ Login/Sign Up pages with validation
✅ Player Analysis page with video feed
✅ Video upload with title, description, and thumbnail
✅ Pre/Post Match Analysis with filtering
✅ Team Monitoring with performance tracking
✅ Navigation bar with avatar dropdown
✅ White and blue theme with rounded elements
✅ Inter font family
✅ Responsive design

## Mock Data

Currently, the app uses mock data stored in React Context:
- Users are stored in localStorage
- Videos are stored in memory (Context state)
- Authentication is simulated

## Next Steps (Future Implementation)

- Connect to Supabase for database
- Implement real video storage
- Add real-time comments
- Integrate actual video analysis AI
- Add user profile management
- Implement team management features

## Troubleshooting

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Dependencies Issues
Delete `node_modules` and `package-lock.json`, then run `npm install` again.

### Build Issues
Make sure you have Node.js version 16 or higher installed.

## Support

For any issues or questions, please check the main README.md file.
