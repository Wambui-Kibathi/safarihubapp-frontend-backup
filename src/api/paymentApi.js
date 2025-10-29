import api from './api';

const paymentApi = {
  initializePayment: async (paymentData) => {
    try {
      const response = await api.post('/payments/initialize', paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Payment initialization failed';
    }
  },

  verifyPayment: async (reference) => {
    try {
      const response = await api.get(`/payments/verify/${reference}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Payment verification failed';
    }
  },

  getPaymentHistory: async () => {
    try {
      const response = await api.get('/payments/history');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to get payment history';
    }
  }
};

export default paymentApi;