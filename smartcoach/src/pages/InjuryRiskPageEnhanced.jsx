import { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, User, Heart, Clock, Target, Shield, AlertCircle } from 'lucide-react';

export default function InjuryRiskPageEnhanced() {
  const [formData, setFormData] = useState({
    age: '',
    height_cm: '',
    weight_kg: '',
    fifa_rating: '',
    pace: '',
    physic: '',
    season_minutes_played: '',
    season_games_played: '',
    total_days_injured: '',
    season_days_injured: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setPrediction(null);

    try {
      const payload = {};
      for (const key in formData) {
        payload[key] = parseFloat(formData[key]);
      }

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError('Failed to get prediction. Make sure the API server is running on http://localhost:8000');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      age: '',
      height_cm: '',
      weight_kg: '',
      fifa_rating: '',
      pace: '',
      physic: '',
      season_minutes_played: '',
      season_games_played: '',
      total_days_injured: '',
      season_days_injured: '',
    });
    setPrediction(null);
    setError('');
  };

  const getRiskColor = (level) => {
    if (level === 'HIGH') return 'text-red-600 bg-red-50 border-red-200';
    if (level === 'MEDIUM') return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'CRITICAL') return 'bg-red-100 text-red-700 border-red-300';
    if (priority === 'HIGH') return 'bg-orange-100 text-orange-700 border-orange-300';
    if (priority === 'MEDIUM') return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-blue-100 text-blue-700 border-blue-300';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-red-200 hover:scale-110 hover:shadow-lg">
              <Activity className="w-6 h-6 text-red-600 transition-transform hover:rotate-12" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Advanced Injury Risk Assessment</h1>
          </div>
          <p className="text-gray-600">
            AI-powered analysis predicting injury probability, specific injury types, and risk factors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl hover:border-blue-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2 group cursor-default">
                <User className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-blue-600 transition-colors">Player Information</span>
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g., 25"
                    required
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    name="height_cm"
                    value={formData.height_cm}
                    onChange={handleChange}
                    placeholder="e.g., 180"
                    required
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight_kg"
                    value={formData.weight_kg}
                    onChange={handleChange}
                    placeholder="e.g., 75"
                    required
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">FIFA Rating</label>
                  <input
                    type="number"
                    name="fifa_rating"
                    value={formData.fifa_rating}
                    onChange={handleChange}
                    placeholder="e.g., 85"
                    required
                    min="40"
                    max="99"
                    step="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pace</label>
                  <input
                    type="number"
                    name="pace"
                    value={formData.pace}
                    onChange={handleChange}
                    placeholder="e.g., 85"
                    required
                    min="0"
                    max="100"
                    step="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Physic</label>
                  <input
                    type="number"
                    name="physic"
                    value={formData.physic}
                    onChange={handleChange}
                    placeholder="e.g., 80"
                    required
                    min="0"
                    max="100"
                    step="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Season Minutes Played</label>
                  <input
                    type="number"
                    name="season_minutes_played"
                    value={formData.season_minutes_played}
                    onChange={handleChange}
                    placeholder="e.g., 2500"
                    required
                    step="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Season Games Played</label>
                  <input
                    type="number"
                    name="season_games_played"
                    value={formData.season_games_played}
                    onChange={handleChange}
                    placeholder="e.g., 30"
                    required
                    step="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Days Injured (Career)</label>
                  <input
                    type="number"
                    name="total_days_injured"
                    value={formData.total_days_injured}
                    onChange={handleChange}
                    placeholder="e.g., 45"
                    required
                    step="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Season Days Injured</label>
                  <input
                    type="number"
                    name="season_days_injured"
                    value={formData.season_days_injured}
                    onChange={handleChange}
                    placeholder="e.g., 15"
                    required
                    step="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      <span>Assess Risk</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1 space-y-6">
            {prediction ? (
              <>
                {/* Overall Risk Card */}
                <div className="bg-white rounded-3xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors cursor-default">Overall Risk</h2>
                  <div className={`p-4 rounded-2xl border-2 ${
                    prediction.overall_risk.level === 'HIGH' 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      {prediction.overall_risk.level === 'HIGH' ? (
                        <AlertTriangle className="w-7 h-7 text-red-600" />
                      ) : (
                        <CheckCircle className="w-7 h-7 text-green-600" />
                      )}
                      <span className={`text-xl font-bold ${
                        prediction.overall_risk.level === 'HIGH' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {prediction.overall_risk.level} RISK
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-medium">Risk Score</span>
                        <span className="font-bold">{prediction.overall_risk.risk_score}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            prediction.overall_risk.level === 'HIGH' ? 'bg-red-600' : 'bg-green-600'
                          }`}
                          style={{ width: `${prediction.overall_risk.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 text-center">
                        {prediction.overall_risk.percentage}% probability
                      </p>
                    </div>
                  </div>
                </div>

                {/* Player Summary */}
                <div className="bg-white rounded-3xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2 group cursor-default">
                    <User className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-blue-600 transition-colors">Player Summary</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-semibold">{prediction.player_summary.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fitness:</span>
                      <span className="font-semibold">{prediction.player_summary.fitness_rating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Games:</span>
                      <span className="font-semibold">{prediction.player_summary.games_played}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minutes:</span>
                      <span className="font-semibold">{prediction.player_summary.minutes_played}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center transition-all duration-300 hover:shadow-lg hover:border-gray-300">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assessment Yet</h3>
                <p className="text-sm text-gray-600">
                  Fill in the form and click "Assess Risk" to get detailed injury predictions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Results Section */}
        {prediction && (
          <div className="mt-8 space-y-8">
            {/* Injury Type Predictions */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl hover:border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2 group cursor-default">
                <Heart className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-blue-600 transition-colors">Injury Type Predictions</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {prediction.injury_predictions.map((injury, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:-translate-y-2 hover:scale-105 cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{injury.type}</h3>
                      <span className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform">{injury.percentage}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{injury.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                        <span className="text-gray-700">Recovery: {injury.recovery_time}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Target className="w-4 h-4 text-gray-500 mt-0.5 group-hover:text-blue-600 transition-colors" />
                        <span className="text-gray-700">Areas: {injury.common_areas.join(', ')}</span>
                      </div>
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${injury.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Factors Breakdown */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl hover:border-orange-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2 group cursor-default">
                <TrendingUp className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-orange-600 transition-colors">Risk Factors Analysis</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(prediction.risk_factors).map(([key, factor]) => (
                  <div key={key} className="border-2 border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 capitalize group-hover:text-blue-600 transition-colors">
                        {key.replace('_', ' ')}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(factor.level)}`}>
                        {factor.level}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Risk Level</span>
                        <span className="font-bold text-gray-900">{factor.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            factor.level === 'HIGH' ? 'bg-red-600' : 
                            factor.level === 'MEDIUM' ? 'bg-orange-600' : 'bg-green-600'
                          }`}
                          style={{ width: `${factor.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl hover:border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2 group cursor-default">
                <Shield className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-blue-600 transition-colors">Prevention Recommendations</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prediction.recommendations.map((rec, index) => (
                  <div key={index} className={`p-4 rounded-2xl border-2 ${getPriorityColor(rec.priority)} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 transition-transform hover:scale-110" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">{rec.category}</h3>
                          <span className="text-xs font-bold px-2 py-1 rounded-full border">
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-sm">{rec.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
