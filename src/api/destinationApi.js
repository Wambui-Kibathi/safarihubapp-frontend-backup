import api from './api';

const destinationApi = {
  getAllDestinations: async () => {
    try {
      const response = await api.get('/destinations');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch destinations';
    }
  },

  getDestinationsByCategory: async (category) => {
    try {
      const response = await api.get(`/destinations/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch destinations by category';
    }
  },

  getDestination: async (id) => {
    try {
      const response = await api.get(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch destination';
    }
  },

  createDestination: async (destinationData) => {
    try {
      const response = await api.post('/destinations', destinationData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to create destination';
    }
  },

  updateDestination: async (id, destinationData) => {
    try {
      const response = await api.put(`/destinations/${id}`, destinationData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to update destination';
    }
  },

  deleteDestination: async (id) => {
    try {
      const response = await api.delete(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to delete destination';
    }
  }
};

export default destinationApi;