import { PAYMENT_METHODS } from './constants';

// Format payment request data for PayStack
export const formatPaymentRequest = (paymentData, method = PAYMENT_METHODS.PAYSTACK) => {
  const baseRequest = {
    amount: paymentData.amount,
    currency: paymentData.currency || 'KES',
    description: paymentData.description || 'SafariHub Payment',
    metadata: {
      bookingId: paymentData.bookingId,
      userId: paymentData.userId,
      timestamp: new Date().toISOString()
    }
  };

  switch (method) {
    case PAYMENT_METHODS.PAYSTACK:
      return {
        ...baseRequest,
        email: paymentData.email,
        reference: paymentData.reference || generatePaymentReference(),
        callback_url: paymentData.callbackUrl || `${window.location.origin}/payment/verify`,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
      };

    case PAYMENT_METHODS.CARD:
      return {
        ...baseRequest,
        cardNumber: paymentData.cardNumber,
        expiryMonth: paymentData.expiryMonth,
        expiryYear: paymentData.expiryYear,
        cvv: paymentData.cvv,
        cardholderName: paymentData.cardholderName,
        billingAddress: paymentData.billingAddress
      };

    default:
      return baseRequest;
  }
};

// Generate unique payment reference
export const generatePaymentReference = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `SFH_${timestamp}_${random}`.toUpperCase();
};

// Handle payment response for PayStack
export const handlePaymentResponse = (response, method = PAYMENT_METHODS.PAYSTACK) => {
  if (!response) {
    throw new Error('No response received from payment gateway');
  }

  const baseResponse = {
    success: response.success || response.status === 'success',
    transactionId: response.transactionId || response.reference,
    amount: response.amount,
    currency: response.currency,
    status: response.status,
    timestamp: response.timestamp || new Date().toISOString()
  };

  switch (method) {
    case PAYMENT_METHODS.PAYSTACK:
      return {
        ...baseResponse,
        reference: response.reference,
        gateway_response: response.gateway_response,
        paid_at: response.paid_at,
        created_at: response.created_at,
        channel: response.channel,
        customer: response.customer,
        authorization: response.authorization
      };

    case PAYMENT_METHODS.CARD:
      return {
        ...baseResponse,
        cardLast4: response.cardLast4,
        cardBrand: response.cardBrand,
        authorizationCode: response.authorizationCode
      };

    default:
      return baseResponse;
  }
};

// Handle payment errors for PayStack
export const handlePaymentError = (error, method = PAYMENT_METHODS.PAYSTACK) => {
  const baseError = {
    message: error.message || 'Payment failed',
    code: error.code || 'PAYMENT_ERROR',
    method: method,
    timestamp: new Date().toISOString()
  };

  // PayStack-specific error handling
  switch (method) {
    case PAYMENT_METHODS.PAYSTACK:
      if (error.code === 'INSUFFICIENT_FUNDS') {
        baseError.message = 'Insufficient funds in your account';
      } else if (error.code === 'INVALID_ACCOUNT') {
        baseError.message = 'Invalid account details';
      } else if (error.code === 'PAYMENT_CANCELLED') {
        baseError.message = 'Payment was cancelled';
      } else if (error.code === 'CARD_DECLINED') {
        baseError.message = 'Your card was declined';
      } else if (error.code === 'INVALID_CARD') {
        baseError.message = 'Invalid card details provided';
      } else if (error.code === 'EXPIRED_CARD') {
        baseError.message = 'Your card has expired';
      } else if (error.code === 'INVALID_EXPIRY') {
        baseError.message = 'Invalid card expiry date';
      } else if (error.code === 'INVALID_CVV') {
        baseError.message = 'Invalid CVV provided';
      } else if (error.code === 'DUPLICATE_TRANSACTION') {
        baseError.message = 'This transaction has already been processed';
      }
      break;

    case PAYMENT_METHODS.CARD:
      if (error.code === 'CARD_DECLINED') {
        baseError.message = 'Card was declined by bank';
      } else if (error.code === 'INVALID_CARD') {
        baseError.message = 'Invalid card details';
      }
      break;
  }

  return baseError;
};

// Validate payment data for PayStack
export const validatePaymentData = (paymentData, method = PAYMENT_METHODS.PAYSTACK) => {
  const errors = [];

  // Common validations
  if (!paymentData.amount || paymentData.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }

  // PayStack-specific validations
  switch (method) {
    case PAYMENT_METHODS.PAYSTACK:
      if (!paymentData.email) {
        errors.push('Email is required for payment');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentData.email)) {
        errors.push('Invalid email format');
      }
      if (!paymentData.reference) {
        errors.push('Payment reference is required');
      }
      break;

    case PAYMENT_METHODS.CARD:
      if (!paymentData.cardNumber || paymentData.cardNumber.length < 13) {
        errors.push('Valid card number is required');
      }
      if (!paymentData.expiryMonth || !paymentData.expiryYear) {
        errors.push('Card expiry date is required');
      }
      if (!paymentData.cvv || paymentData.cvv.length < 3) {
        errors.push('Valid CVV is required');
      }
      if (!paymentData.cardholderName) {
        errors.push('Cardholder name is required');
      }
      break;
  }

  return errors;
};

// Format amount for display (KES for PayStack)
export const formatPaymentAmount = (amount, currency = 'KES') => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Initialize PayStack payment
export const initializePayStackPayment = (paymentData) => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_paystack_public_key_here';

  if (!window.PaystackPop) {
    throw new Error('PayStack script not loaded');
  }

  const handler = window.PaystackPop.setup({
    key: publicKey,
    email: paymentData.email,
    amount: paymentData.amount * 100, // Convert to kobo
    currency: paymentData.currency || 'KES',
    ref: paymentData.reference || generatePaymentReference(),
    callback: (response) => {
      if (paymentData.onSuccess) {
        paymentData.onSuccess(response);
      }
    },
    onClose: () => {
      if (paymentData.onClose) {
        paymentData.onClose();
      }
    },
    metadata: paymentData.metadata || {}
  });

  return handler;
};