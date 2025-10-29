import React, { useState } from 'react';
import paymentApi from '../../../api/paymentApi';
import './PayStackPayment.css';

const PayStackPayment = ({ amount, bookingId, onSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsProcessing(true);

    try {
      const result = await paymentApi.initializePayment({
        email,
        amount,
        booking_id: bookingId
      });

      if (result.status === 'success') {
        // Redirect to PayStack
        window.location.href = result.authorization_url;
      } else {
        alert('Payment initialization failed');
      }
    } catch (error) {
      alert('Payment error: ' + error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="paystack-modal-overlay" onClick={onClose}>
      <div className="paystack-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Complete Your Booking</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="payment-details">
            <div className="amount-display">
              <span className="label">Total Amount:</span>
              <span className="amount">${amount}</span>
            </div>
            <p className="security-note">
              Secure payment powered by PayStack
            </p>
          </div>

          <form onSubmit={handlePayment} className="payment-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isProcessing}
              />
              <small>Payment receipt will be sent to this email</small>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                onClick={onClose} 
                className="btn-secondary"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isProcessing || !email}
                className="btn-primary"
              >
                {isProcessing ? 'Processing...' : `Pay $${amount}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PayStackPayment;