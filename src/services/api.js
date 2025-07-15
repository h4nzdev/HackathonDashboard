import axios from 'axios';

// API Configuration
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://Juvo/Yeah',
  apiKey: process.env.REACT_APP_API_KEY,
};

// Default configuration
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'Authorization': `Bearer ${API_CONFIG.apiKey}`,
    'Content-Type': 'application/json',
  },
});

// Dashboard Statistics API
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    // Fallback to dummy data in development
    return {
      totalReports: 120,
      facebookPages: 15,
      casesFlagged: 34,
      highRiskLocations: 7,
    };
  }
};

// Cases API
export const getCases = async (params = {}) => {
  try {
    const response = await api.get('/cases', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching cases:', error);
    return [];
  }
};

export const createCase = async (caseData) => {
  try {
    const response = await api.post('/cases', caseData);
    return response.data;
  } catch (error) {
    console.error('Error creating case:', error);
    throw error;
  }
};

// Keyword Logs API
export const getKeywordLogs = async (params = {}) => {
  try {
    const response = await api.get('/keyword-logs', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching keyword logs:', error);
    return [];
  }
};

export const createKeywordLog = async (logData) => {
  try {
    const response = await api.post('/keyword-logs', logData);
    return response.data;
  } catch (error) {
    console.error('Error creating keyword log:', error);
    throw error;
  }
};

// Category Statistics API
export const getCategoryStats = async () => {
  try {
    const response = await api.get('/categories/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching category stats:', error);
    return [];
  }
};

// Risk Map Data API
export const getRiskMapData = async () => {
  try {
    const response = await api.get('/risk-map');
    return response.data;
  } catch (error) {
    console.error('Error fetching risk map data:', error);
    return [];
  }
};

// Request Interceptor for handling auth and other headers
api.interceptors.request.use(
  (config) => {
    // You can modify request config here
    // For example, refresh token if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for handling common responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // For example, redirect to login
    }
    return Promise.reject(error);
  }
);
