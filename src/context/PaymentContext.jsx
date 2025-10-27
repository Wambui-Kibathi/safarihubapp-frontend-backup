import React, { createContext, useContext, useState } from 'react';
import paymentApi from '@/api/paymentApi';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error
  const [paymentError, setPaymentError] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentError(null);
  };

  const processPayment = async (paymentData) => {
    setPaymentStatus('processing');
    setPaymentError(null);

    try {
      let response;
      
      switch (selectedPaymentMethod) {
        case 'mpesa':
          response = await paymentApi.processMpesaPayment(paymentData);
          break;
        case 'paypal':
          response = await paymentApi.processPayPalPayment(paymentData);
          break;
        case 'card':
          response = await paymentApi.processCardPayment(paymentData);
          break;
        default:
          response = await paymentApi.processPayment(paymentData);
      }

      setPaymentStatus('success');
      return response;
    } catch (error) {
      setPaymentStatus('error');
      setPaymentError(error);
      throw error;
    }
  };

  const getPaymentHistory = async () => {
    try {
      const history = await paymentApi.getPaymentHistory();
      setPaymentHistory(history);
      return history;
    } catch (error) {
      setPaymentError(error);
      throw error;
    }
  };

  const resetPaymentStatus = () => {
    setPaymentStatus('idle');
    setPaymentError(null);
  };

  const value = {
    selectedPaymentMethod,
    paymentStatus,
    paymentError,
    paymentHistory,
    selectPaymentMethod,
    processPayment,
    getPaymentHistory,
    resetPaymentStatus
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext };