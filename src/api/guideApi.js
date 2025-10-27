import axios from 'axios';

const API_BASE_URL = '/api/guides';

const guideApi = {
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

  getTrips: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trips`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get trips';
    }
  },

  createTrip: async (tripData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/trips`, tripData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create trip';
    }
  },

  updateTrip: async (tripId, tripData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/trips/${tripId}`, tripData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update trip';
    }
  },

  deleteTrip: async (tripId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/trips/${tripId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete trip';
    }
  },

  getBookings: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bookings`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get bookings';
    }
  }
};

export default guideApi;