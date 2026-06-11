import React, { createContext, useState, useContext } from 'react';

const VideoContext = createContext();

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [analyzingVideos, setAnalyzingVideos] = useState(new Set());

  const addVideo = (video) => {
    const newVideo = {
      id: Date.now(),
      ...video,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      likedBy: [],
      // Ensure required fields exist for simplified videos
      title: video.title || `Football Analysis - ${new Date().toLocaleDateString()}`,
      description: video.description || 'AI-analyzed football video',
      thumbnail: video.thumbnail || null,
    };
    setVideos(prev => [newVideo, ...prev]);
  };

  const setVideoAnalyzing = (videoId, isAnalyzing) => {
    setAnalyzingVideos(prev => {
      const newSet = new Set(prev);
      if (isAnalyzing) {
        newSet.add(videoId);
      } else {
        newSet.delete(videoId);
      }
      return newSet;
    });
  };

  const likeVideo = (videoId, userId) => {
    setVideos(prev => prev.map(video => {
      if (video.id === videoId) {
        const hasLiked = video.likedBy.includes(userId);
        return {
          ...video,
          likes: hasLiked ? video.likes - 1 : video.likes + 1,
          likedBy: hasLiked 
            ? video.likedBy.filter(id => id !== userId)
            : [...video.likedBy, userId]
        };
      }
      return video;
    }));
  };

  const addComment = (videoId, comment) => {
    setVideos(prev => prev.map(video => {
      if (video.id === videoId) {
        return {
          ...video,
          comments: [...video.comments, comment]
        };
      }
      return video;
    }));
  };

  const value = {
    videos,
    analyzingVideos,
    addVideo,
    likeVideo,
    addComment,
    setVideoAnalyzing,
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};
