// API utility functions for video analysis

const API_BASE_URL = 'http://127.0.0.1:7000';

export const analyzeVideo = async (videoFile) => {
  try {
    const formData = new FormData();
    formData.append('file', videoFile);

    const response = await fetch(`${API_BASE_URL}/analyze_video`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorText}`);
    }

    // Check if response is a video file
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('video/')) {
      throw new Error('API did not return a video file');
    }

    return response;
  } catch (error) {
    console.error('Video analysis API error:', error);
    throw error;
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};
