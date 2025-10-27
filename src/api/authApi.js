import axios from 'axios';

const API_BASE_URL = '/api/auth';

const authApi = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/logout`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Logout failed';
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/me`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get user';
    }
  },

  refreshToken: async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/refresh`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Token refresh failed';
    }
  }
};

export default authApi;