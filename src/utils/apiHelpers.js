import { UPLOAD_CONSTRAINTS } from './constants';

// Validate file before upload
export const validateAudioFile = (file) => {
  const errors = [];
  
  if (!file) {
    errors.push('No file selected');
    return errors;
  }
  
  // Check file size
  if (file.size > UPLOAD_CONSTRAINTS.AUDIO.MAX_SIZE) {
    errors.push(`File size must be less than ${UPLOAD_CONSTRAINTS.AUDIO.MAX_SIZE / (1024 * 1024)}MB`);
  }
  
  // Check file type
  if (!UPLOAD_CONSTRAINTS.AUDIO.ALLOWED_TYPES.includes(file.type)) {
    errors.push(`File type must be one of: ${UPLOAD_CONSTRAINTS.AUDIO.ALLOWED_EXTENSIONS.join(', ')}`);
  }
  
  return errors;
};

// Format file size for display
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format duration for display
export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Create download link for file
export const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Check if URL is valid audio URL
export const isValidAudioUrl = (url) => {
  const audioUrlPattern = /^https?:\/\/.+\.(mp3|wav|ogg|m4a|webm)(\?.*)?$/i;
  return audioUrlPattern.test(url);
};

// Retry API call with exponential backoff
export const retryApiCall = async (apiCall, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Don't retry on client errors (4xx)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        break;
      }
      
      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

// Parse API error message
export const parseApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

// Check if user is online
export const isOnline = () => {
  return navigator.onLine;
};

// Create FormData for file upload
export const createFormData = (file, additionalData = {}) => {
  const formData = new FormData();
  formData.append('audio', file);
  
  Object.keys(additionalData).forEach(key => {
    formData.append(key, additionalData[key]);
  });
  
  return formData;
};

export default {
  validateAudioFile,
  formatFileSize,
  formatDuration,
  downloadFile,
  isValidAudioUrl,
  retryApiCall,
  parseApiError,
  isOnline,
  createFormData,
};