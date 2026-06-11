import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, BarChart3, Users, Shield, TrendingUp, ChevronRight, X, Mail, Lock, Play, Target, Heart, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function WelcomePageNew() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAuth = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    if (isLogin) {
      login({ username: email, email, password });
    } else {
      login({ username, email, password });
    }
    navigate('/player-analysis');
  };

  const features = [
    {
      icon: Heart,
      title: 'Injury Risk Assessment',
      description: 'AI-powered injury prediction with specific injury types and personalized prevention recommendations',
      color: 'red',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Pre-Match Analysis',
      description: 'Comprehensive tactical preparation with opponent analysis and strategic insights',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Post-Match Analysis',
      description: 'Detailed performance review with video breakdowns and key metrics',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Team Monitoring',
      description: 'Real-time performance tracking with trend detection and benchmarking',
      color: 'purple',
      gradient: 'from-purple-500 to-violet-500'
    }
  ];

  const stats = [
    { value: '95%', label: 'Prediction Accuracy' },
    { value: '10K+', label: 'Analyses Completed' },
    { value: '50+', label: 'Professional Teams' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SmartCoachAI</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowLoginModal(true)}
              className="md:hidden bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full font-semibold text-sm"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6 animate-pulse">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">AI-Powered Football Analytics</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Elevate Your
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Football Performance
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
              Advanced video analysis platform with AI-powered injury prediction,
              tactical insights, and real-time team monitoring
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="#features"
                className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Comprehensive Football Analytics
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to optimize team performance, prevent injuries, and gain competitive advantage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden"
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300">
                      <span>Learn more</span>
                      <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Analytics Showcase */}
      <section id="analytics" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300 font-medium">Real-Time Insights</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Data-Driven
                <span className="block text-green-400">Performance Optimization</span>
              </h2>

              <p className="text-xl text-gray-400 mb-8">
                Our advanced analytics platform processes millions of data points to deliver actionable insights
                that transform how you manage your team.
              </p>

              <div className="space-y-4">
                {[
                  'Injury risk prediction with 95% accuracy',
                  'Automated video analysis and tagging',
                  'Real-time performance benchmarking',
                  'Customizable alerts and notifications'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700">
                <div className="space-y-4">
                  {/* Mock Dashboard Elements */}
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <div className="font-semibold">High Injury Risk Detected</div>
                        <div className="text-sm text-gray-400">Player: Marcus Rashford</div>
                      </div>
                    </div>
                    <div className="text-red-400 font-bold">85%</div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-black/40 rounded-2xl border border-gray-700 text-center">
                      <div className="text-2xl font-bold text-blue-400">8.7</div>
                      <div className="text-xs text-gray-400 mt-1">Avg Rating</div>
                    </div>
                    <div className="p-4 bg-black/40 rounded-2xl border border-gray-700 text-center">
                      <div className="text-2xl font-bold text-green-400">24</div>
                      <div className="text-xs text-gray-400 mt-1">Goals</div>
                    </div>
                    <div className="p-4 bg-black/40 rounded-2xl border border-gray-700 text-center">
                      <div className="text-2xl font-bold text-purple-400">92%</div>
                      <div className="text-xs text-gray-400 mt-1">Pass Acc</div>
                    </div>
                  </div>

                  <div className="p-4 bg-black/40 rounded-2xl border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400">Team Performance</span>
                      <span className="text-sm text-green-400">+12%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-4 shadow-2xl animate-pulse">
                <div className="text-center">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-xs opacity-90">Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Team?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join top professional teams using SmartCoachAI for performance optimization
              </p>
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">SmartCoachAI</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 SmartCoachAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Login/Signup Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl max-w-md w-full p-8 relative animate-scale-in">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-400">
                {isLogin ? 'Sign in to continue to SmartCoachAI' : 'Join thousands of teams using SmartCoachAI'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                    placeholder="Enter your username"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 text-gray-400">
                    <input type="checkbox" className="rounded bg-gray-800 border-gray-700" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-full font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>

              <div className="text-center text-sm text-gray-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
