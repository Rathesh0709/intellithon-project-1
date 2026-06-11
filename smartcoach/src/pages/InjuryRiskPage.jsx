import { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, User } from 'lucide-react';

export default function InjuryRiskPage() {
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
      // Convert form data to numbers
      const payload = {};
      for (const key in formData) {
        payload[key] = parseFloat(formData[key]);
      }

      // Make API call to FastAPI backend
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Injury Risk Assessment</h1>
          </div>
          <p className="text-gray-600">
            Predict player injury risk using AI-powered analysis based on physical attributes and playing history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Player Information</span>
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Physical Attributes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age (years)
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FIFA Rating
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pace
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Physic
                  </label>
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

                {/* Season Statistics */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Season Minutes Played
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Season Games Played
                  </label>
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

                {/* Injury History */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Days Injured (Career)
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Season Days Injured
                  </label>
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

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2"
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
                  className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {prediction ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-8 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Risk Assessment</h2>
                
                {/* Risk Level */}
                <div className={`p-6 rounded-2xl mb-6 ${
                  prediction.chance_of_injury === 'HIGH' 
                    ? 'bg-red-50 border-2 border-red-200' 
                    : 'bg-green-50 border-2 border-green-200'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    {prediction.chance_of_injury === 'HIGH' ? (
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    ) : (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    )}
                    <span className={`text-2xl font-bold ${
                      prediction.chance_of_injury === 'HIGH' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {prediction.chance_of_injury} RISK
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-700 font-medium">Injury Probability</span>
                      <span className={`font-bold ${
                        prediction.chance_of_injury === 'HIGH' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {(prediction.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          prediction.chance_of_injury === 'HIGH' ? 'bg-red-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${prediction.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Recommendations</span>
                  </h3>
                  
                  {prediction.chance_of_injury === 'HIGH' ? (
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Increase rest periods between matches</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Focus on injury prevention training</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Consider rotation to reduce playing time</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Regular physiotherapy sessions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Monitor workload closely</span>
                      </li>
                    </ul>
                  ) : (
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Continue current training routine</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Maintain fitness levels</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Regular warm-up and cool-down exercises</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Keep monitoring injury history</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assessment Yet</h3>
                <p className="text-sm text-gray-600">
                  Fill in the player information form and click "Assess Risk" to get injury prediction results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
            <p className="text-sm text-gray-600">
              Machine learning model trained on professional player data to predict injury risk
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Preventive Measures</h3>
            <p className="text-sm text-gray-600">
              Get personalized recommendations to reduce injury risk and optimize player health
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Early Warning System</h3>
            <p className="text-sm text-gray-600">
              Identify high-risk players before injuries occur and take proactive action
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
