import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVideos } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import { Upload, Image as ImageIcon, Video, CheckCircle, AlertCircle } from 'lucide-react';
import { analyzeVideo } from '../utils/api';

export default function UploadVideoPage() {
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { addVideo } = useVideos();
  const { user } = useAuth();
  const navigate = useNavigate();


  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!video) {
      setError('Please select a video file');
      return;
    }

    try {
      setUploading(true);
      setAnalyzing(true);

      // Send video to analysis API - only send the video file
      const response = await analyzeVideo(video);

      // Get the analyzed video blob
      const analyzedVideoBlob = await response.blob();
      const analyzedVideoUrl = URL.createObjectURL(analyzedVideoBlob);

      // Add analyzed video to context with auto-generated metadata
      const newVideo = {
        title: `Football Analysis - ${new Date().toLocaleDateString()}`,
        description: 'AI-analyzed football video',
        thumbnail: null,
        videoUrl: analyzedVideoUrl, // Use analyzed video URL
        originalVideoUrl: videoPreview, // Keep original for reference
        creator: user.username,
        creatorAvatar: user.avatar,
        duration: '10:24', // Mock duration
        isAnalyzed: true,
        analyzedAt: new Date().toISOString(),
      };

      addVideo(newVideo);
      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate('/player-analysis');
      }, 1500);

    } catch (error) {
      console.error('Video analysis error:', error);
      setError(`Failed to analyze video: ${error.message}`);
    } finally {
      setUploading(false);
      setAnalyzing(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Football Video Analyzed!</h2>
          <p className="text-gray-600">Your football video has been processed with AI analysis. Redirecting to player analysis...</p>
        </div>
      </div>
    );
  }

  if (analyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Football Video...</h2>
          <p className="text-gray-600">Our AI is processing your football video. This may take a few moments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Football Video</h1>
          <p className="text-gray-600">Upload your football video for AI analysis</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Video Upload */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Football Video File *
            </label>
            <div className="relative">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-500 cursor-pointer transition-colors bg-gray-50"
              >
                {videoPreview ? (
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <video src={videoPreview} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="text-center">
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 font-medium">Click to upload football video</p>
                    <p className="text-xs text-gray-500 mt-1">MP4, MOV up to 500MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={uploading || analyzing}
              className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : analyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Analyze Football Video</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/player-analysis')}
              disabled={uploading}
              className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
