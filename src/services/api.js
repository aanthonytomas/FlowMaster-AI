/**
 * API Service Layer
 * Centralized API calls with error handling and logging
 */

import axios from 'axios';
import logger from '../utils/logger';

// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create axios instance
const apiClient = axios.create(API_CONFIG);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = sessionStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request
    logger.apiRequest(config.method.toUpperCase(), config.url, config.data);

    return config;
  },
  (error) => {
    logger.apiError('REQUEST', error.config?.url, error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response
    logger.apiResponse(
      response.config.method.toUpperCase(),
      response.config.url,
      response.status,
      response.data
    );

    return response;
  },
  (error) => {
    // Log error
    logger.apiError(
      error.config?.method?.toUpperCase() || 'UNKNOWN',
      error.config?.url || 'unknown',
      error
    );

    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          logger.warn('Access forbidden', error.response.data);
          break;
        case 404:
          // Not found
          logger.warn('Resource not found', error.response.data);
          break;
        case 500:
          // Server error
          logger.error('Server error', error.response.data);
          break;
        default:
          logger.error('API error', error.response.data);
      }
    } else if (error.request) {
      // Request made but no response
      logger.error('No response from server', error.request);
    } else {
      // Error setting up request
      logger.error('Request setup error', error.message);
    }

    return Promise.reject(error);
  }
);

// API Service
class ApiService {
  // Workflows
  async getWorkflows() {
    try {
      const response = await apiClient.get('/api/workflows');
      return response.data;
    } catch (error) {
      return this._handleError(error, []);
    }
  }

  async getWorkflow(id) {
    try {
      const response = await apiClient.get(`/api/workflows/${id}`);
      return response.data;
    } catch (error) {
      return this._handleError(error, null);
    }
  }

  async createWorkflow(data) {
    try {
      const response = await apiClient.post('/api/workflows', data);
      return response.data;
    } catch (error) {
      return this._handleError(error, null);
    }
  }

  async updateWorkflow(id, data) {
    try {
      const response = await apiClient.put(`/api/workflows/${id}`, data);
      return response.data;
    } catch (error) {
      return this._handleError(error, null);
    }
  }

  async deleteWorkflow(id) {
    try {
      const response = await apiClient.delete(`/api/workflows/${id}`);
      return response.data;
    } catch (error) {
      return this._handleError(error, false);
    }
  }

  // Executions
  async getExecutions(params = {}) {
    try {
      const response = await apiClient.get('/api/executions', { params });
      return response.data;
    } catch (error) {
      return this._handleError(error, []);
    }
  }

  async getExecution(id) {
    try {
      const response = await apiClient.get(`/api/executions/${id}`);
      return response.data;
    } catch (error) {
      return this._handleError(error, null);
    }
  }

  async executeWorkflow(workflowId, input = {}) {
    try {
      const response = await apiClient.post(`/api/workflows/${workflowId}/execute`, input);
      return response.data;
    } catch (error) {
      return this._handleError(error, null);
    }
  }

  async cancelExecution(id) {
    try {
      const response = await apiClient.post(`/api/executions/${id}/cancel`);
      return response.data;
    } catch (error) {
      return this._handleError(error, false);
    }
  }

  // Settings
  async getSettings() {
    try {
      const response = await apiClient.get('/api/settings');
      return response.data;
    } catch (error) {
      return this._handleError(error, {});
    }
  }

  async updateSettings(data) {
    try {
      const response = await apiClient.put('/api/settings', data);
      return response.data;
    } catch (error) {
      return this._handleError(error, null);
    }
  }

  // Error handler
  _handleError(error, fallback) {
    logger.error('API Service Error', error);
    
    // Return fallback value for graceful degradation
    return fallback;
  }

  // Health check
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export default new ApiService();
export { apiClient };
