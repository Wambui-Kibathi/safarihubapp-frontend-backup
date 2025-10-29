import api from './api';

const adminApi = {
  // User Management
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

  // Destination Management
  createDestination: async (destinationData) => {
    try {
      const response = await api.post('/destinations', destinationData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to create destination';
    }
  },

  updateDestination: async (destinationId, destinationData) => {
    try {
      const response = await api.put(`/destinations/${destinationId}`, destinationData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to update destination';
    }
  },

  deleteDestination: async (destinationId) => {
    try {
      const response = await api.delete(`/destinations/${destinationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to delete destination';
    }
  },

  // Booking Management
  getBookings: async () => {
    try {
      const response = await api.get('/admin/bookings');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch bookings';
    }
  },

  updateBookingStatus: async (bookingId, status) => {
    try {
      const response = await api.patch(`/bookings/${bookingId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to update booking status';
    }
  },

  // Analytics
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