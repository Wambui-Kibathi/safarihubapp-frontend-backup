import api from './api';
import API_CONFIG from '../config/api';

const destinationApi = {
  getAllDestinations: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.DESTINATIONS.LIST);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch destinations';
    }
  },

  getDestinationsByCategory: async (category) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.DESTINATIONS.BY_CATEGORY}/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch destinations by category';
    }
  },

  getDestination: async (id) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.DESTINATIONS.DETAIL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch destination';
    }
  },

  createDestination: async (destinationData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.DESTINATIONS.CREATE, destinationData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to create destination';
    }
  },

  updateDestination: async (id, destinationData) => {
    try {
      const response = await api.patch(`${API_CONFIG.ENDPOINTS.DESTINATIONS.UPDATE}/${id}`, destinationData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to update destination';
    }
  },

  deleteDestination: async (id) => {
    try {
      const response = await api.delete(`${API_CONFIG.ENDPOINTS.DESTINATIONS.DELETE}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to delete destination';
    }
  }
};

export default destinationApi;