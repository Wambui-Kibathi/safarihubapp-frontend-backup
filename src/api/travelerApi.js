import axios from 'axios';

const API_BASE_URL = '/api/travelers';

const travelerApi = {
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get profile';
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/profile`, profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update profile';
    }
  },

  getBookings: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get bookings';
    }
  },

  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create booking';
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to cancel booking';
    }
  },

  getTrips: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trips`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get trips';
    }
  }
};

export default travelerApi;