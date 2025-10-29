import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaCreditCard, FaCheck, FaArrowLeft } from 'react-icons/fa';
import destinationApi from '../../../api/destinationApi';
import paymentApi from '../../../api/paymentApi';
import { useAuth } from '../../../context/AuthContext';
import PayStackPayment from '../../../components/common/PayStackPayment/PayStackPayment';
import './BookingForm.css';

const BookingForm = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    numberOfTravelers: 1,
    specialRequests: '',
    contactPhone: '',
    emergencyContact: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDestination();
  }, [destinationId, user, navigate]);

  const fetchDestination = async () => {
    try {
      setLoading(true);
      const data = await destinationApi.getDestination(destinationId);
      setDestination(data);
    } catch (err) {
      setError('Failed to load destination details');
      console.error('Error fetching destination:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    if (!destination) return 0;
    const days = Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24));
    return destination.price * formData.numberOfTravelers * (days || 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.startDate || !formData.endDate) {
      setError('Please select travel dates');
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('End date must be after start date');
      return;
    }

    if (formData.numberOfTravelers < 1 || formData.numberOfTravelers > 12) {
      setError('Number of travelers must be between 1 and 12');
      return;
    }

    setError(null);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      setSubmitting(true);

      // Create booking
      const bookingData = {
        destination_id: destinationId,
        start_date: formData.startDate,
        end_date: formData.endDate,
        number_of_travelers: formData.numberOfTravelers,
        total_amount: calculateTotal(),
        special_requests: formData.specialRequests,
        contact_phone: formData.contactPhone,
        emergency_contact: formData.emergencyContact,
        payment_reference: paymentData.reference
      };

      // Create the booking
      const bookingResponse = await bookingApi.createBooking({
        destination_id: destinationId,
        traveler_id: user.id,
        start_date: formData.startDate,
        end_date: formData.endDate,
        number_of_travelers: formData.numberOfTravelers,
        total_amount: calculateTotal(),
        special_requests: formData.specialRequests,
        contact_phone: formData.contactPhone,
        emergency_contact: formData.emergencyContact
      });

      // Create payment record
      const paymentResponse = await paymentApi.initializePayment({
        booking_id: bookingResponse.id,
        amount: calculateTotal(),
        currency: 'USD',
        description: `Safari booking: ${destination.name}`
      });

      // Update booking with payment reference
      await bookingApi.updateBooking(bookingResponse.id, {
        payment_reference: paymentResponse.reference
      });

      // Redirect to success page or dashboard
      navigate('/traveler/dashboard', {
        state: {
          bookingSuccess: true,
          bookingData: {
            ...bookingResponse,
            destination: destination.name,
            paymentReference: paymentResponse.reference
          }
        }
      });
    } catch (err) {
      setError('Failed to complete booking');
      console.error('Booking error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="booking-form">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error && !destination) {
    return (
      <div className="booking-form">
        <div className="error-container">
          <h2>Booking Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/destinations')} className="back-btn">
            <FaArrowLeft /> Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="booking-form">
        <div className="payment-section">
          <div className="payment-header">
            <h2>Complete Your Payment</h2>
            <p>Secure payment powered by PayStack</p>
          </div>

          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-item">
              <span>Destination:</span>
              <span>{destination.name}</span>
            </div>
            <div className="summary-item">
              <span>Travelers:</span>
              <span>{formData.numberOfTravelers}</span>
            </div>
            <div className="summary-item">
              <span>Dates:</span>
              <span>{formData.startDate} to {formData.endDate}</span>
            </div>
            <div className="summary-total">
              <span>Total Amount:</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>

          <PayStackPayment
            amount={calculateTotal()}
            email={user.email}
            onSuccess={handlePaymentSuccess}
            onClose={() => setShowPayment(false)}
          />

          {submitting && (
            <div className="submitting-overlay">
              <div className="loading-spinner"></div>
              <p>Completing your booking...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="booking-form">
      <div className="booking-header">
        <button onClick={() => navigate(`/destinations/${destinationId}`)} className="back-btn">
          <FaArrowLeft /> Back to Details
        </button>
        <h1>Book Your Safari</h1>
        <p>Complete your reservation for {destination?.name}</p>
      </div>

      <div className="booking-container">
        <form onSubmit={handleSubmit} className="booking-form-content">
          {error && <div className="error-message">{error}</div>}

          {/* Traveler Information */}
          <section className="form-section">
            <h2>Traveler Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="contactPhone">Contact Phone *</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1234567890"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact</label>
                <input
                  type="tel"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Emergency contact phone"
                />
              </div>
            </div>
          </section>

          {/* Travel Details */}
          <section className="form-section">
            <h2>Travel Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="startDate">
                  <FaCalendarAlt /> Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">
                  <FaCalendarAlt /> End Date *
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="numberOfTravelers">
                  <FaUsers /> Number of Travelers *
                </label>
                <select
                  id="numberOfTravelers"
                  name="numberOfTravelers"
                  value={formData.numberOfTravelers}
                  onChange={handleInputChange}
                  required
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Traveler' : 'Travelers'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Special Requests */}
          <section className="form-section">
            <h2>Special Requests</h2>
            <div className="form-group">
              <label htmlFor="specialRequests">Additional Requirements</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="4"
                placeholder="Any special dietary requirements, accessibility needs, or other requests..."
              />
            </div>
          </section>

          {/* Booking Summary */}
          <section className="booking-summary-section">
            <h2>Booking Summary</h2>
            <div className="summary-card">
              <div className="summary-header">
                <h3>{destination?.name}</h3>
                <p className="location">
                  <FaMapMarkerAlt /> {destination?.country}
                </p>
              </div>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Price per person:</span>
                  <span>${destination?.price}</span>
                </div>
                <div className="summary-row">
                  <span>Number of travelers:</span>
                  <span>{formData.numberOfTravelers}</span>
                </div>
                {formData.startDate && formData.endDate && (
                  <div className="summary-row">
                    <span>Duration:</span>
                    <span>
                      {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                )}
                <div className="summary-total">
                  <span>Total Amount:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={submitting}>
              <FaCreditCard /> Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;