import React, { useState } from 'react';
import { LocationIcon, CalendarIcon, MoneyIcon } from '@/icons/CommonIcons';
import './TripForm.css';

const TripForm = ({ trip = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: trip?.title || '',
    description: trip?.description || '',
    location: trip?.location || '',
    duration: trip?.duration || '',
    price: trip?.price || '',
    maxTravelers: trip?.maxTravelers || '',
    difficulty: trip?.difficulty || 'Easy',
    includes: trip?.includes || '',
    excludes: trip?.excludes || '',
    itinerary: trip?.itinerary || '',
    requirements: trip?.requirements || '',
    startDate: trip?.startDate || '',
    endDate: trip?.endDate || ''
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

    if (!formData.title.trim()) {
      newErrors.title = 'Trip title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.maxTravelers || formData.maxTravelers <= 0) {
      newErrors.maxTravelers = 'Maximum travelers must be at least 1';
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
      console.error('Trip submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="trip-form">
      <div className="form-header">
        <h2>{trip ? 'Edit Trip' : 'Create New Trip'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Trip Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Amazing Safari Adventure"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your trip experience..."
            rows="4"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">
              <LocationIcon size={16} />
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Maasai Mara, Kenya"
              className={errors.location ? 'error' : ''}
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="5 days"
              className={errors.duration ? 'error' : ''}
            />
            {errors.duration && <span className="error-message">{errors.duration}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">
              <MoneyIcon size={16} />
              Price (USD)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="1200"
              min="0"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="maxTravelers">Max Travelers</label>
            <input
              type="number"
              id="maxTravelers"
              name="maxTravelers"
              value={formData.maxTravelers}
              onChange={handleChange}
              placeholder="8"
              min="1"
              className={errors.maxTravelers ? 'error' : ''}
            />
            {errors.maxTravelers && <span className="error-message">{errors.maxTravelers}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty Level</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

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
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="includes">What's Included</label>
          <textarea
            id="includes"
            name="includes"
            value={formData.includes}
            onChange={handleChange}
            placeholder="Accommodation, meals, transport..."
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="excludes">What's Excluded</label>
          <textarea
            id="excludes"
            name="excludes"
            value={formData.excludes}
            onChange={handleChange}
            placeholder="International flights, personal expenses..."
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Fitness level, equipment needed..."
            rows="3"
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
            {isSubmitting ? 'Saving...' : trip ? 'Update Trip' : 'Create Trip'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;