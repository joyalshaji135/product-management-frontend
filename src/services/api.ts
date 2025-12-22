import axios from 'axios';

// Use environment variables with fallback values
const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'https://product-fest-dev.onrender.com/api';


// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.REACT_APP_API_KEY || 'prodXApiKey',
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