import { Link } from 'react-router-dom';
import { TrendingUp, Users, BarChart } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col fade-in">
      {/* Header */}
      <header className="pt-4 px-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 relative group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-0 group-hover:opacity-70 group-hover:animate-pulse transition-opacity duration-300"></div>
              <svg className="w-5 h-5 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">SmartCoachAI</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight transition-all duration-500 hover:scale-105 cursor-default">
            Elevate Your
            <span className="text-blue-600 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] transition-all duration-300"> Football </span>
            Performance
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto transition-all duration-300 hover:text-gray-800 hover:scale-105 hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)] cursor-default">
            Advanced video analysis platform for coaches and players. Analyze matches, track performance, and gain insights that matter.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-300 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Video Analysis</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Upload and analyze game footage with AI-powered insights</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-300 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <BarChart className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Match Analytics</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Pre and post-match analysis with detailed metrics</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-300 hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                <Users className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Team Monitoring</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Track team performance and player development</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 shadow-lg shadow-blue-500/30"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 hover:shadow-lg transition-all duration-300 border-2 border-blue-600 hover:border-blue-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
