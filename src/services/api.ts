import axios from 'axios';

// REACT_APP_API_BASE_URL=http://localhost:5000/api
// REACT_APP_API_KEY=devXApiKey
// REACT_APP_API_VERSION=1.0.0

// Use environment variables with fallback values
const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const API_KEY = import.meta.env.REACT_APP_API_KEY || 'devXApiKey';
const API_VERSION = import.meta.env.REACT_APP_API_VERSION || '1.0.0';

console.log('API_BASE_URL:', API_BASE_URL);
console.log('API_KEY:', API_KEY);
console.log('API_VERSION:', API_VERSION);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.REACT_APP_API_KEY || 'devXApiKey',
    'x-app-version': import.meta.env.REACT_APP_API_VERSION || '1.0.0'
  }
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;