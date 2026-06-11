import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VideoProvider } from './context/VideoContext';
import WelcomePage from './pages/WelcomePageNew';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PlayerAnalysisPage from './pages/PlayerAnalysisPage';
import PrePostMatchPage from './pages/PrePostMatchPage';
import TeamMonitoringPage from './pages/TeamMonitoringPage';
import InjuryRiskPage from './pages/InjuryRiskPageEnhanced';
import UploadVideoPage from './pages/UploadVideoPage';
import Layout from './components/Layout';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route wrapper (redirect to player analysis if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/player-analysis" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><WelcomePage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
      
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/player-analysis" element={<PlayerAnalysisPage />} />
        <Route path="/pre-post-match" element={<PrePostMatchPage />} />
        <Route path="/team-monitoring" element={<TeamMonitoringPage />} />
        <Route path="/injury-risk" element={<InjuryRiskPage />} />
        <Route path="/upload" element={<UploadVideoPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <VideoProvider>
          <AppRoutes />
        </VideoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
