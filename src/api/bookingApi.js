import api from './api';
import API_CONFIG from '../config/api';

const bookingApi = {
  getAllBookings: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.BOOKINGS.LIST);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch bookings';
    }
  },

  getUserBookings: async (userId) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.BOOKINGS.USER_BOOKINGS}/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch user bookings';
    }
  },

  getBooking: async (bookingId) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.BOOKINGS.DETAIL}/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch booking';
    }
  },

  createBooking: async (bookingData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.BOOKINGS.CREATE, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to create booking';
    }
  },

  updateBooking: async (bookingId, bookingData) => {
    try {
      const response = await api.patch(`${API_CONFIG.ENDPOINTS.BOOKINGS.UPDATE}/${bookingId}`, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to update booking';
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await api.patch(`${API_CONFIG.ENDPOINTS.BOOKINGS.CANCEL}/${bookingId}`, {
        status: 'cancelled'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to cancel booking';
    }
  },

  deleteBooking: async (bookingId) => {
    try {
      const response = await api.delete(`${API_CONFIG.ENDPOINTS.BOOKINGS.DETAIL}/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to delete booking';
    }
  }
};

export default bookingApi;