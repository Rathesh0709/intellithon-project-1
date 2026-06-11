import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Award, Users, Target, Activity, BarChart3 } from 'lucide-react';

export default function TeamMonitoringPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const teamStats = {
    overall: 87,
    trend: 'up',
    change: '+5.2%',
  };

  const performanceMetrics = [
    {
      title: 'Goals Scored',
      value: 24,
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: 'blue',
    },
    {
      title: 'Possession Avg',
      value: '62%',
      change: '+3%',
      trend: 'up',
      icon: Activity,
      color: 'green',
    },
    {
      title: 'Pass Accuracy',
      value: '84%',
      change: '-2%',
      trend: 'down',
      icon: Award,
      color: 'orange',
    },
    {
      title: 'Clean Sheets',
      value: 8,
      change: '+25%',
      trend: 'up',
      icon: Users,
      color: 'purple',
    },
  ];

  const playerPerformance = [
    { name: 'Marcus Rashford', position: 'Forward', rating: 8.7, trend: 'up', status: 'excellent' },
    { name: 'Bruno Fernandes', position: 'Midfielder', rating: 8.4, trend: 'up', status: 'excellent' },
    { name: 'Casemiro', position: 'Midfielder', rating: 7.9, trend: 'stable', status: 'good' },
    { name: 'Lisandro Martinez', position: 'Defender', rating: 7.6, trend: 'down', status: 'warning' },
    { name: 'Andre Onana', position: 'Goalkeeper', rating: 7.4, trend: 'up', status: 'good' },
  ];

  const warnings = [
    { player: 'Lisandro Martinez', issue: 'Performance decline detected', severity: 'warning' },
    { player: 'Harry Maguire', issue: 'Below benchmark performance', severity: 'alert' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Performance Monitoring</h1>
          <p className="text-gray-600">
            Track team performance with trend detection, benchmarking, and personalized alerts
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex space-x-2 mb-6">
          {['week', 'month', 'season'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Overall Performance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 mb-8 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-2">Overall Team Performance</p>
              <div className="flex items-end space-x-4">
                <h2 className="text-5xl font-bold">{teamStats.overall}</h2>
                <div className="flex items-center space-x-2 mb-2">
                  {teamStats.trend === 'up' ? (
                    <TrendingUp className="w-6 h-6 text-green-300" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-300" />
                  )}
                  <span className="text-xl font-semibold text-green-300">{teamStats.change}</span>
                </div>
              </div>
            </div>
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-opacity-30">
              <BarChart3 className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Warnings & Alerts */}
        {warnings.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 transition-all duration-300 hover:shadow-xl hover:border-orange-200">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Performance Alerts</h3>
            </div>
            <div className="space-y-3">
              {warnings.map((warning, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-2xl flex items-center justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer ${
                    warning.severity === 'alert'
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-orange-50 border border-orange-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <AlertTriangle
                      className={`w-5 h-5 ${
                        warning.severity === 'alert' ? 'text-red-600' : 'text-orange-600'
                      }`}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{warning.player}</p>
                      <p className="text-sm text-gray-600">{warning.issue}</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-all duration-300 hover:scale-105">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Player Performance Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Player Performance Rankings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {playerPerformance.map((player, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-all duration-300 cursor-pointer hover:shadow-sm group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200">
                          <span className="text-sm font-semibold text-blue-600">
                            {player.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {player.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-gray-900">{player.rating}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {player.trend === 'up' && (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      )}
                      {player.trend === 'down' && (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                      {player.trend === 'stable' && (
                        <div className="w-5 h-0.5 bg-gray-400" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          player.status === 'excellent'
                            ? 'bg-green-100 text-green-700'
                            : player.status === 'good'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 cursor-pointer group">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-200">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 transition-colors group-hover:text-blue-600">Trend Detection</h3>
            <p className="text-sm text-gray-600">
              Automatically identify increasing or decreasing performance patterns
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-green-300 cursor-pointer group">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 transition-colors group-hover:text-green-600">Benchmarking</h3>
            <p className="text-sm text-gray-600">
              Compare performance against competition rankings and standards
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-orange-300 cursor-pointer group">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-200">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 transition-colors group-hover:text-orange-600">Smart Warnings</h3>
            <p className="text-sm text-gray-600">
              Receive personalized alerts for performance anomalies and trends
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ metric }) {
  const Icon = metric.icon;
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colorClasses[metric.color]} rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        {metric.trend === 'up' ? (
          <TrendingUp className="w-5 h-5 text-green-600" />
        ) : (
          <TrendingDown className="w-5 h-5 text-red-600" />
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1 transition-colors group-hover:text-blue-600">{metric.value}</h3>
      <p className="text-sm text-gray-600 mb-2">{metric.title}</p>
      <p
        className={`text-sm font-medium ${
          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {metric.change} from last period
      </p>
    </div>
  );
}
