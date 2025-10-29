import api from './api';
import API_CONFIG from '../config/api';

const authApi = {
  login: async (credentials) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  logout: async () => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Logout failed';
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get profile';
    }
  }
};

export default authApi;