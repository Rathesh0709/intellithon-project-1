import { useState } from 'react';
import { Play, Filter, Search, Tag, Clock, Calendar } from 'lucide-react';

export default function PrePostMatchPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const matchClips = [
    {
      id: 1,
      title: 'First Half Opening - High Press',
      match: 'Arsenal vs Manchester United',
      date: '2024-01-15',
      duration: '02:45',
      thumbnail: null,
      tags: ['Pre-Match', 'Tactics', 'High Press'],
      stage: 'First Half',
    },
    {
      id: 2,
      title: 'Goal Scoring Opportunity Analysis',
      match: 'Liverpool vs Chelsea',
      date: '2024-01-14',
      duration: '01:30',
      thumbnail: null,
      tags: ['Post-Match', 'Goals', 'Attack'],
      stage: 'Second Half',
    },
    {
      id: 3,
      title: 'Defensive Formation Breakdown',
      match: 'Barcelona vs Real Madrid',
      date: '2024-01-13',
      duration: '03:20',
      thumbnail: null,
      tags: ['Pre-Match', 'Defense', 'Tactics'],
      stage: 'Full Match',
    },
  ];

  const filteredClips = matchClips.filter(clip => {
    const matchesSearch = clip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         clip.match.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' ||
                      clip.tags.some(tag => tag.toLowerCase().includes(activeTab));
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pre/Post Match Analysis</h1>
          <p className="text-gray-600">
            Study games in depth with automated video tagging and advanced filtering
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search matches or clips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filters</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mt-6 overflow-x-auto">
            {['all', 'pre-match', 'post-match', 'tactics', 'goals'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Tag className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Auto-Tagging</h3>
            <p className="text-sm text-gray-600">Automated clip tagging for faster analysis</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Filter className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Filtering</h3>
            <p className="text-sm text-gray-600">Advanced query system for relevant data</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Stage Analysis</h3>
            <p className="text-sm text-gray-600">Review various stages of the game</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Video Clips</h3>
            <p className="text-sm text-gray-600">Quick access to key moments</p>
          </div>
        </div>

        {/* Match Clips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClips.map((clip) => (
            <MatchClipCard key={clip.id} clip={clip} />
          ))}
        </div>

        {filteredClips.length === 0 && (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-200">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No clips found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MatchClipCard({ clip }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-900 to-blue-700 group cursor-pointer">
        <div className="w-full h-full flex items-center justify-center">
          <Play className="w-16 h-16 text-white opacity-75 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-full">
          {clip.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{clip.title}</h3>
        </div>
        
        <p className="text-sm font-medium text-gray-700 mb-1">{clip.match}</p>
        
        <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{clip.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{clip.stage}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {clip.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
