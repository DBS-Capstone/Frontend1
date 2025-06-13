// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Birds
  BIRDS: {
    IDENTIFY: '/birds/identify',
    LIST: '/birds',
    DETAIL: (id) => `/birds/${id}`,
    SEARCH: '/birds/search',
    BY_HABITAT: (habitat) => `/birds/habitat/${habitat}`,
    BY_NAME: (name) => `/birds/name/${name}`,
  },
  
  // Identifications
  IDENTIFICATIONS: {
    SAVE: '/identifications',
    HISTORY: '/identifications/history',
    DELETE: (id) => `/identifications/${id}`,
  },
  
  // General
  HEALTH: '/health',
  CONFIG: '/config',
  SUPPORT: '/support/report',
  USER_STATS: '/users/stats',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// File Upload Constraints
export const UPLOAD_CONSTRAINTS = {
  AUDIO: {
    MAX_SIZE: 50 * 1024 * 1024, // 50MB
    ALLOWED_TYPES: ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/webm'],
    ALLOWED_EXTENSIONS: ['.mp3', '.wav', '.ogg', '.m4a', '.webm'],
  },
};

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 60000, // 60 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  BIRD_STORE: 'bird-finder-storage',
  APP_CONFIG: 'app-config',
};

export default {
  API_ENDPOINTS,
  HTTP_STATUS,
  UPLOAD_CONSTRAINTS,
  API_CONFIG,
  STORAGE_KEYS,
};