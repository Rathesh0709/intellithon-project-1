import { useState } from 'react';
import { useVideos } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import { Upload, Heart, MessageCircle, Play, FileVideo, Brain, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ApiTestComponent from '../components/ApiTestComponent';

export default function PlayerAnalysisPage() {
  const { videos, analyzingVideos, likeVideo } = useVideos();
  const { user } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleLike = (videoId) => {
    likeVideo(videoId, user.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Player Analysis</h1>
          <p className="text-gray-600">Upload and analyze player performance videos</p>
        </div>

        {/* API Test Component */}
        <ApiTestComponent />

        {/* Upload Section */}
        <div className="mb-8">
          <Link
            to="/upload"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Video</span>
          </Link>
        </div>

        {/* Video Grid */}
        {videos.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-200">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:bg-gray-200 hover:scale-110">
              <FileVideo className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos yet</h3>
            <p className="text-gray-600 mb-6">Upload your first video to start analyzing player performance</p>
            <Link
              to="/upload"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Video</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onLike={handleLike}
                onPlay={setSelectedVideo}
                userId={user.id}
                isAnalyzing={analyzingVideos.has(video.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}

function VideoCard({ video, onLike, onPlay, userId, isAnalyzing }) {
  const isLiked = video.likedBy.includes(userId);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 group-card">
      {/* Video Preview */}
      <div className="relative aspect-video bg-gray-900 group cursor-pointer" onClick={() => onPlay(video)}>
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        ) : video.originalVideoUrl ? (
          <video 
            src={video.originalVideoUrl} 
            className="w-full h-full object-cover" 
            muted
            onMouseEnter={e => e.target.play()}
            onMouseLeave={e => e.target.pause()}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileVideo className="w-16 h-16 text-gray-600" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
          <div className="w-16 h-16 bg-white bg-opacity-0 group-hover:bg-opacity-90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
            <Play className="w-8 h-8 text-blue-600 ml-1" />
          </div>
        </div>
        <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-full">
          {video.duration || '10:24'}
        </div>
        
        {/* Analysis Status Indicators */}
        {video.isAnalyzed && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
            <CheckCircle className="w-3 h-3" />
            <span>Analyzed</span>
          </div>
        )}
        
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm font-medium">Analyzing...</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 transition-colors hover:text-blue-600">{video.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{video.creator}</p>
        <p className="text-xs text-gray-500 mb-4 line-clamp-2">{video.description}</p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLike(video.id)}
              className={`flex items-center space-x-1 transition-all duration-300 hover:scale-110 ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{video.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{video.comments.length}</span>
            </button>
          </div>
          
          {/* Analysis Badge */}
          {video.isAnalyzed && (
            <div className="flex items-center space-x-1 text-green-600">
              <Brain className="w-4 h-4" />
              <span className="text-xs font-medium">AI Analyzed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoModal({ video, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75" onClick={onClose}>
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto transition-all duration-500 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Player */}
        <div className="aspect-video bg-gray-900 relative rounded-t-3xl overflow-hidden">
          {video.videoUrl ? (
            <video src={video.videoUrl} controls className="w-full h-full" autoPlay />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileVideo className="w-24 h-24 text-gray-600" />
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{video.title}</h2>
              <p className="text-gray-600 mb-2">{video.creator}</p>
            </div>
            {video.isAnalyzed && (
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">AI Analyzed</span>
              </div>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{video.description}</p>
          
          {video.isAnalyzed && video.analyzedAt && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-800">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Analyzed on {new Date(video.analyzedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-6 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gray-600" />
              <span className="font-medium">{video.likes} likes</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <span className="font-medium">{video.comments.length} comments</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Comments</h3>
            {video.comments.length === 0 ? (
              <p className="text-gray-500 text-sm">No comments yet</p>
            ) : (
              <div className="space-y-4">
                {video.comments.map((comment, index) => (
                  <div key={index} className="flex space-x-3">
                    <img
                      src={comment.userAvatar}
                      alt={comment.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-sm">{comment.username}</p>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
