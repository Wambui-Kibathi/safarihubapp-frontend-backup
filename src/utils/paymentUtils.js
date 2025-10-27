import { PAYMENT_METHODS } from './constants';

// Format payment request data
export const formatPaymentRequest = (paymentData, method) => {
  const baseRequest = {
    amount: paymentData.amount,
    currency: paymentData.currency || 'USD',
    description: paymentData.description || 'SafariHub Payment',
    metadata: {
      bookingId: paymentData.bookingId,
      userId: paymentData.userId,
      timestamp: new Date().toISOString()
    }
  };

  switch (method) {
    case PAYMENT_METHODS.MPESA:
      return {
        ...baseRequest,
        phoneNumber: paymentData.phoneNumber,
        accountReference: paymentData.bookingId || 'SAFARI',
        transactionDesc: paymentData.description || 'SafariHub Booking Payment'
      };

    case PAYMENT_METHODS.PAYPAL:
      return {
        ...baseRequest,
        returnUrl: paymentData.returnUrl || `${window.location.origin}/payment/success`,
        cancelUrl: paymentData.cancelUrl || `${window.location.origin}/payment/cancel`,
        payerEmail: paymentData.email
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

// Handle payment response
export const handlePaymentResponse = (response, method) => {
  if (!response) {
    throw new Error('No response received from payment gateway');
  }

  const baseResponse = {
    success: response.success || false,
    transactionId: response.transactionId || response.id,
    amount: response.amount,
    currency: response.currency,
    status: response.status,
    timestamp: response.timestamp || new Date().toISOString()
  };

  switch (method) {
    case PAYMENT_METHODS.MPESA:
      return {
        ...baseResponse,
        mpesaReceiptNumber: response.mpesaReceiptNumber,
        phoneNumber: response.phoneNumber,
        checkoutRequestId: response.checkoutRequestId
      };

    case PAYMENT_METHODS.PAYPAL:
      return {
        ...baseResponse,
        paypalTransactionId: response.paypalTransactionId,
        payerEmail: response.payerEmail,
        paymentUrl: response.paymentUrl
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

// Handle payment errors
export const handlePaymentError = (error, method) => {
  const baseError = {
    message: error.message || 'Payment failed',
    code: error.code || 'PAYMENT_ERROR',
    method: method,
    timestamp: new Date().toISOString()
  };

  // Method-specific error handling
  switch (method) {
    case PAYMENT_METHODS.MPESA:
      if (error.code === 'INSUFFICIENT_FUNDS') {
        baseError.message = 'Insufficient funds in M-PESA account';
      } else if (error.code === 'INVALID_PHONE') {
        baseError.message = 'Invalid phone number format';
      }
      break;

    case PAYMENT_METHODS.PAYPAL:
      if (error.code === 'PAYMENT_CANCELLED') {
        baseError.message = 'Payment was cancelled by user';
      } else if (error.code === 'INVALID_ACCOUNT') {
        baseError.message = 'Invalid PayPal account';
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

// Validate payment data
export const validatePaymentData = (paymentData, method) => {
  const errors = [];

  // Common validations
  if (!paymentData.amount || paymentData.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }

  // Method-specific validations
  switch (method) {
    case PAYMENT_METHODS.MPESA:
      if (!paymentData.phoneNumber) {
        errors.push('Phone number is required for M-PESA');
      } else if (!/^\+254\d{9}$/.test(paymentData.phoneNumber)) {
        errors.push('Invalid M-PESA phone number format');
      }
      break;

    case PAYMENT_METHODS.PAYPAL:
      if (!paymentData.email) {
        errors.push('Email is required for PayPal');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentData.email)) {
        errors.push('Invalid email format');
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

// Format amount for display
export const formatPaymentAmount = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};