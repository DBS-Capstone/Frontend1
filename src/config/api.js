import axios from 'axios';
import { toast } from 'react-hot-toast';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds for file uploads
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to handle multipart
apiClient.interceptors.request.use(
  (config) => {
    // Don't override Content-Type for FormData (file uploads)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 403) {
      toast.error('Access denied');
    } else if (response?.status === 404) {
      toast.error('Resource not found');
    } else if (response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (!navigator.onLine) {
      toast.error('No internet connection');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
