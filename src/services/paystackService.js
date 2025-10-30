import paymentApi from './paymentApi';
import { initializePayStackPayment, generatePaymentReference } from '../utils/paymentUtils';

// PayStack service for handling payment operations
const paystackService = {
  // Initialize PayStack payment popup
  initializePayment: async (paymentData) => {
    try {
      // First, initialize payment with backend to get reference
      const backendResponse = await paymentApi.initializePayment({
        email: paymentData.email,
        amount: paymentData.amount,
        booking_id: paymentData.bookingId
      });

      if (backendResponse.status !== 'success') {
        throw new Error('Failed to initialize payment with backend');
      }

      // Use the reference from backend or generate one
      const reference = backendResponse.reference || generatePaymentReference();

      // Initialize PayStack popup
      const handler = initializePayStackPayment({
        ...paymentData,
        reference: reference,
        onSuccess: async (response) => {
          try {
            // Verify payment with backend
            const verificationData = await paymentApi.verifyPayment(response.reference);

            if (verificationData.status === 'success' || verificationData.data?.status === 'success') {
              if (paymentData.onSuccess) {
                paymentData.onSuccess(response);
              }
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            if (paymentData.onError) {
              paymentData.onError(error);
            }
          }
        },
        onClose: () => {
          if (paymentData.onClose) {
            paymentData.onClose();
          }
        }
      });

      // Open PayStack popup
      handler.openIframe();

      return { success: true, reference: reference };
    } catch (error) {
      console.error('PayStack initialization error:', error);
      throw error;
    }
  },

  // Verify payment status
  verifyPayment: async (reference) => {
    try {
      const verificationData = await paymentApi.verifyPayment(reference);
      return verificationData;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  },

  // Get payment history for user
  getPaymentHistory: async (userId) => {
    try {
      const history = await paymentApi.getPaymentHistory(userId);
      return history;
    } catch (error) {
      console.error('Payment history error:', error);
      throw error;
    }
  }
};

export default paystackService;