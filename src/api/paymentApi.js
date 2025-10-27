import axios from 'axios';

const API_BASE_URL = '/api/payments';

const paymentApi = {
  processPayment: async (paymentData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/process`, paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Payment processing failed';
    }
  },

  processMpesaPayment: async (mpesaData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/mpesa`, mpesaData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'M-PESA payment failed';
    }
  },

  processPayPalPayment: async (paypalData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/paypal`, paypalData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'PayPal payment failed';
    }
  },

  processCardPayment: async (cardData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/card`, cardData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Card payment failed';
    }
  },

  getPaymentHistory: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get payment history';
    }
  },

  verifyPayment: async (paymentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/verify/${paymentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Payment verification failed';
    }
  }
};

export default paymentApi;