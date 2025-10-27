import React, { useState } from 'react';
import './PayPalButton.css';

const PayPalButton = ({ amount = '29.00', onSuccess, onError }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Simulate PayPal redirect and processing
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        setMessage('PayPal payment completed successfully!');
        onSuccess && onSuccess({ method: 'paypal', amount, email });
      } else {
        setMessage('PayPal payment was cancelled or failed. Please try again.');
        onError && onError({ method: 'paypal', error: 'Payment cancelled' });
      }
      
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="paypal-payment">
      <form onSubmit={handleSubmit} className="paypal-form">
        <div className="form-group">
          <label htmlFor="email">PayPal Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="paypal-button"
          disabled={isLoading}
        >
          {isLoading ? 'Redirecting to PayPal...' : `Pay $${amount} with PayPal`}
        </button>
      </form>

      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default PayPalButton;