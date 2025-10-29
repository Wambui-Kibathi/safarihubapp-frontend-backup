import api from './api';
import API_CONFIG from '../config/api';

const travelerApi = {
  getAllTravelers: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.TRAVELERS.LIST);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch travelers';
    }
  },

  getTraveler: async (travelerId) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.TRAVELERS.DETAIL}/${travelerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch traveler';
    }
  },

  createTraveler: async (travelerData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.TRAVELERS.CREATE, travelerData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to create traveler';
    }
  },

  updateTraveler: async (travelerId, travelerData) => {
    try {
      const response = await api.patch(`${API_CONFIG.ENDPOINTS.TRAVELERS.UPDATE}/${travelerId}`, travelerData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to update traveler';
    }
  },

  getTravelerBookings: async (travelerId) => {
    try {
      // This would typically be a separate endpoint, but for now we'll use the general bookings endpoint
      const response = await api.get(API_CONFIG.ENDPOINTS.BOOKINGS.LIST);
      // Filter bookings for this traveler (this should ideally be done on the backend)
      const travelerBookings = response.data.filter(booking => booking.traveler_id === travelerId);
      return travelerBookings;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch traveler bookings';
    }
  }
};

export default travelerApi;