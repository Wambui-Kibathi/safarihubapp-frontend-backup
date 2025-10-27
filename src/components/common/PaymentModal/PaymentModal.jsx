import React, { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, amount = '$29.00' }) => {
  const [selectedMethod, setSelectedMethod] = useState('');

  if (!isOpen) return null;

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted with method:', selectedMethod);
    onClose();
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'mpesa':
        return (
          <div className="payment-form">
            <h3>M-PESA Payment</h3>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+254 700 123 456" required />
            </div>
            <p className="payment-info">You will receive an M-PESA prompt on your phone</p>
          </div>
        );
      case 'paypal':
        return (
          <div className="payment-form">
            <h3>PayPal Payment</h3>
            <div className="form-group">
              <label>PayPal Email</label>
              <input type="email" placeholder="your@email.com" required />
            </div>
            <p className="payment-info">You will be redirected to PayPal to complete payment</p>
          </div>
        );
      case 'card':
        return (
          <div className="payment-form">
            <h3>Card Payment</h3>
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input type="text" placeholder="123" required />
              </div>
            </div>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Payment</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="payment-amount">
            <span>Amount: {amount}</span>
          </div>

          {!selectedMethod ? (
            <div className="payment-methods">
              <h3>Select Payment Method</h3>
              <div className="method-options">
                <button 
                  className="method-button mpesa"
                  onClick={() => handleMethodSelect('mpesa')}
                >
                  <span className="method-icon">📱</span>
                  M-PESA
                </button>
                <button 
                  className="method-button paypal"
                  onClick={() => handleMethodSelect('paypal')}
                >
                  <span className="method-icon">💳</span>
                  PayPal
                </button>
                <button 
                  className="method-button card"
                  onClick={() => handleMethodSelect('card')}
                >
                  <span className="method-icon">💳</span>
                  Credit Card
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {renderPaymentForm()}
              <div className="form-actions">
                <button type="button" className="back-button" onClick={() => setSelectedMethod('')}>
                  Back
                </button>
                <button type="submit" className="pay-button">
                  Pay {amount}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;