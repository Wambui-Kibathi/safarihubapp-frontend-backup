import api from './api';
import API_CONFIG from '../config/api';

const guideApi = {
  getAllGuides: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.GUIDES.LIST);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch guides';
    }
  },

  getGuide: async (guideId) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.GUIDES.DETAIL}/${guideId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch guide';
    }
  },

  createGuide: async (guideData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.GUIDES.CREATE, guideData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to create guide';
    }
  },

  updateGuide: async (guideId, guideData) => {
    try {
      const response = await api.patch(`${API_CONFIG.ENDPOINTS.GUIDES.UPDATE}/${guideId}`, guideData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to update guide';
    }
  },

  getGuideBookings: async (guideId) => {
    try {
      // This would typically be a separate endpoint, but for now we'll use the general bookings endpoint
      const response = await api.get(API_CONFIG.ENDPOINTS.BOOKINGS.LIST);
      // Filter bookings for this guide (this should ideally be done on the backend)
      const guideBookings = response.data.filter(booking => booking.guide_id === guideId);
      return guideBookings;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch guide bookings';
    }
  }
};

export default guideApi;