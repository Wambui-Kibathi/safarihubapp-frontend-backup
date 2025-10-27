import React, { useState } from 'react';
import './MpesaButton.css';

const MpesaButton = ({ amount = '29.00', onSuccess, onError }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      
      if (success) {
        setMessage('M-PESA payment successful! Check your phone for confirmation.');
        onSuccess && onSuccess({ method: 'mpesa', amount, phoneNumber });
      } else {
        setMessage('Payment failed. Please try again or check your phone number.');
        onError && onError({ method: 'mpesa', error: 'Payment failed' });
      }
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="mpesa-payment">
      <form onSubmit={handleSubmit} className="mpesa-form">
        <div className="form-group">
          <label htmlFor="phone">M-PESA Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+254 700 123 456"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="mpesa-button"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : `Pay KES ${amount} via M-PESA`}
        </button>
      </form>

      {message && (
        <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default MpesaButton;