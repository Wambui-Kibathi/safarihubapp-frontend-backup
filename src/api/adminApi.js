import api from './api';
import API_CONFIG from '../config/api';

const adminApi = {
  getUsers: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.ADMIN.USERS);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch users';
    }
  },

  updateUserRole: async (userId, role) => {
    try {
      const response = await api.patch(API_CONFIG.ENDPOINTS.ADMIN.ASSIGN_ROLE, {
        user_id: userId,
        role: role
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to update user role';
    }
  },

  getBookings: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.ADMIN.BOOKINGS);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch bookings';
    }
  },

  getDashboardStats: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch dashboard stats';
    }
  }
};

export default adminApi;