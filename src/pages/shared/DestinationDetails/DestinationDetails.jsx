import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaStar, FaDollarSign, FaClock, FaCheck, FaArrowLeft } from 'react-icons/fa';
import destinationApi from '../../../api/destinationApi';
import { useAuth } from '../../../context/AuthContext';
import './DestinationDetails.css';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinationDetails();
  }, [id]);

  const fetchDestinationDetails = async () => {
    try {
      setLoading(true);
      const data = await destinationApi.getDestination(id);
      setDestination(data);
      setError(null);
    } catch (err) {
      setError('Failed to load destination details');
      console.error('Error fetching destination:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/booking/new/${id}`);
  };

  if (loading) {
    return (
      <div className="destination-details">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="destination-details">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error || 'Destination not found'}</p>
          <button onClick={() => navigate('/destinations')} className="back-btn">
            <FaArrowLeft /> Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="destination-details">
      {/* Hero Section */}
      <div className="destination-hero">
        <div className="hero-image">
          <img src={destination.image_url || '/default-destination.jpg'} alt={destination.name} />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>{destination.name}</h1>
              <div className="hero-meta">
                <span className="location">
                  <FaMapMarkerAlt /> {destination.country}
                </span>
                <span className="price">
                  <FaDollarSign /> ${destination.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="details-navigation">
        <button onClick={() => navigate('/destinations')} className="back-btn">
          <FaArrowLeft /> Back to Destinations
        </button>
      </div>

      <div className="details-container">
        <div className="details-main">
          {/* Overview */}
          <section className="details-section">
            <h2>Overview</h2>
            <p className="description">{destination.description}</p>
          </section>

          {/* Key Details */}
          <section className="details-section">
            <h2>Trip Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <div>
                  <h4>Location</h4>
                  <p>{destination.country}</p>
                </div>
              </div>
              <div className="detail-item">
                <FaDollarSign className="detail-icon" />
                <div>
                  <h4>Price</h4>
                  <p>${destination.price} per person</p>
                </div>
              </div>
              <div className="detail-item">
                <FaClock className="detail-icon" />
                <div>
                  <h4>Duration</h4>
                  <p>Flexible (3-7 days)</p>
                </div>
              </div>
              <div className="detail-item">
                <FaUsers className="detail-icon" />
                <div>
                  <h4>Group Size</h4>
                  <p>2-12 people</p>
                </div>
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="details-section">
            <h2>What's Included</h2>
            <div className="included-list">
              <div className="included-item">
                <FaCheck className="check-icon" />
                <span>Professional safari guide</span>
              </div>
              <div className="included-item">
                <FaCheck className="check-icon" />
                <span>All meals during safari</span>
              </div>
              <div className="included-item">
                <FaCheck className="check-icon" />
                <span>Accommodation in lodges/camps</span>
              </div>
              <div className="included-item">
                <FaCheck className="check-icon" />
                <span>Game drives and activities</span>
              </div>
              <div className="included-item">
                <FaCheck className="check-icon" />
                <span>Airport transfers</span>
              </div>
              <div className="included-item">
                <FaCheck className="check-icon" />
                <span>Park entrance fees</span>
              </div>
            </div>
          </section>

          {/* Itinerary Preview */}
          <section className="details-section">
            <h2>Sample Itinerary</h2>
            <div className="itinerary-preview">
              <div className="itinerary-day">
                <div className="day-header">
                  <FaCalendarAlt />
                  <h4>Day 1: Arrival & Welcome</h4>
                </div>
                <p>Arrival at the destination, welcome briefing, and relaxation at the lodge.</p>
              </div>
              <div className="itinerary-day">
                <div className="day-header">
                  <FaCalendarAlt />
                  <h4>Day 2-3: Game Drives</h4>
                </div>
                <p>Morning and afternoon game drives to spot wildlife in their natural habitat.</p>
              </div>
              <div className="itinerary-day">
                <div className="day-header">
                  <FaCalendarAlt />
                  <h4>Day 4: Cultural Experience</h4>
                </div>
                <p>Visit local communities and learn about traditional culture and customs.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Booking Sidebar */}
        <div className="booking-sidebar">
          <div className="booking-card">
            <h3>Book This Safari</h3>
            <div className="price-display">
              <span className="price">${destination.price}</span>
              <span className="per-person">per person</span>
            </div>

            <div className="booking-features">
              <div className="feature">
                <FaCheck className="feature-icon" />
                <span>Expert local guides</span>
              </div>
              <div className="feature">
                <FaCheck className="feature-icon" />
                <span>All-inclusive pricing</span>
              </div>
              <div className="feature">
                <FaCheck className="feature-icon" />
                <span>Flexible dates</span>
              </div>
              <div className="feature">
                <FaCheck className="feature-icon" />
                <span>24/7 support</span>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              className="book-now-btn"
              disabled={!user}
            >
              {user ? 'Book Now' : 'Login to Book'}
            </button>

            {!user && (
              <p className="login-prompt">
                Please log in to book this safari experience.
              </p>
            )}
          </div>

          {/* Quick Info */}
          <div className="quick-info-card">
            <h4>Quick Facts</h4>
            <ul>
              <li><strong>Best Time:</strong> June - September</li>
              <li><strong>Difficulty:</strong> Easy to Moderate</li>
              <li><strong>Language:</strong> English</li>
              <li><strong>Currency:</strong> USD</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;