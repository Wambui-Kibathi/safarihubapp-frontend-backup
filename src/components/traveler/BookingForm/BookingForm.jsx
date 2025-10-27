import React, { useState } from 'react';
import { CalendarIcon, UserIcon } from '@/icons/CommonIcons';
import { isValidEmail } from '@/utils/helpers';
import './BookingForm.css';

const BookingForm = ({ trip, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    tripId: trip?.id || '',
    travelers: 1,
    startDate: '',
    specialRequests: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (formData.travelers < 1) {
      newErrors.travelers = 'At least 1 traveler is required';
    }

    if (!formData.contactEmail) {
      newErrors.contactEmail = 'Email is required';
    } else if (!isValidEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email';
    }

    if (!formData.contactPhone) {
      newErrors.contactPhone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form">
      <div className="form-header">
        <h2>Book Your Trip</h2>
        {trip && <p className="trip-name">{trip.title}</p>}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">
              <CalendarIcon size={16} />
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={errors.startDate ? 'error' : ''}
            />
            {errors.startDate && <span className="error-message">{errors.startDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="travelers">
              <UserIcon size={16} />
              Number of Travelers
            </label>
            <input
              type="number"
              id="travelers"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              min="1"
              max="10"
              className={errors.travelers ? 'error' : ''}
            />
            {errors.travelers && <span className="error-message">{errors.travelers}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="your@email.com"
            className={errors.contactEmail ? 'error' : ''}
          />
          {errors.contactEmail && <span className="error-message">{errors.contactEmail}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone">Contact Phone</label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            placeholder="+254 700 123 456"
            className={errors.contactPhone ? 'error' : ''}
          />
          {errors.contactPhone && <span className="error-message">{errors.contactPhone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests (Optional)</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Any special requirements or requests..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          {onCancel && (
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Booking...' : 'Book Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;