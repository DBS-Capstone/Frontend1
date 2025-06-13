import apiClient from '../config/api';
import birdService from './birdService';

// General API utilities
export const apiService = {
  // Health check
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API health check failed');
    }
  },

  // Upload file (generic)
  async uploadFile(file, endpoint, onProgress = null) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      };

      const response = await apiClient.post(endpoint, formData, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'File upload failed';
      throw new Error(message);
    }
  },

  // Get user statistics
  async getUserStats() {
    try {
      const response = await apiClient.get('/users/stats');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch user stats';
      throw new Error(message);
    }
  },

  // Report issue
  async reportIssue(issueData) {
    try {
      const response = await apiClient.post('/support/report', issueData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to report issue';
      throw new Error(message);
    }
  },

  // Get app configuration
  async getAppConfig() {
    try {
      const response = await apiClient.get('/config');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch app config:', error);
      return {};
    }
  }
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0,
      data: null
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
      data: null
    };
  }
};

// Export services (removed authService)
export { birdService };
export default apiClient;
