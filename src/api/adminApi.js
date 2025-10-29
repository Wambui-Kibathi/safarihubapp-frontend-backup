import api from './api';

const adminApi = {
  getUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch users';
    }
  },

  updateUserRole: async (userId, role) => {
    try {
      const response = await api.patch('/admin/assign-role', {
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
      const response = await api.get('/admin/bookings');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch bookings';
    }
  },

  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch dashboard stats';
    }
  }
};

export default adminApi;