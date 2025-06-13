import apiClient from '../config/api';

class BirdService {
  async identifyBird(audioFile, onProgress = null) {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000, // 2 minutes for audio processing
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      };

      const response = await apiClient.post('/birds/upload-audio', formData, config);
      return response.data;
    } catch (error) {
      console.error('Bird identification error:', error);
      const message = error.response?.data?.message || 'Bird identification failed';
      throw new Error(message);
    }
  }

  async getBirdDetails(birdId) {
    try {
      const response = await apiClient.get(`/birds/${birdId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch bird details';
      throw new Error(message);
    }
  }

  async getAllBirds(params = {}) {
    try {
      const response = await apiClient.get('/birds', { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch birds';
      throw new Error(message);
    }
  }

  async searchBirds(query, filters = {}) {
    try {
      const params = { q: query, ...filters };
      const response = await apiClient.get('/birds/search', { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Search failed';
      throw new Error(message);
    }
  }

  async getBirdsByHabitat(habitat) {
    try {
      const response = await apiClient.get(`/birds/habitat/${encodeURIComponent(habitat)}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch birds by habitat';
      throw new Error(message);
    }
  }

  async getBirdByCommonName(name) {
    try {
      const response = await apiClient.get(`/birds/name/${encodeURIComponent(name)}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Bird not found';
      throw new Error(message);
    }
  }
}

export default new BirdService();
