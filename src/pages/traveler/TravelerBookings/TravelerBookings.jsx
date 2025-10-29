import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import bookingApi from '../../../api/bookingApi';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaEye } from 'react-icons/fa';
import './TravelerBookings.css';

const TravelerBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingApi.getUserBookings(user.id);
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingApi.cancelBooking(bookingId);
        await fetchBookings(); // Refresh the list
      } catch (err) {
        alert('Failed to cancel booking');
        console.error('Error canceling booking:', err);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <FaCheckCircle className="status-icon confirmed" />;
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'completed':
        return <FaCheckCircle className="status-icon completed" />;
      case 'cancelled':
        return <FaTimesCircle className="status-icon cancelled" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status.toLowerCase() === filter;
  });

  if (loading) {
    return (
      <div className="traveler-bookings">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="traveler-bookings">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchBookings} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="traveler-bookings">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>Manage all your safari bookings</p>
      </div>

      <div className="bookings-controls">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({bookings.length})
          </button>
          <button
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({bookings.filter(b => b.status === 'completed').length})
          </button>
        </div>
      </div>

      <div className="bookings-content">
        {filteredBookings.length > 0 ? (
          <div className="bookings-list">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-image">
                  <img
                    src={booking.destination_image || '/default-destination.jpg'}
                    alt={booking.destination_name}
                  />
                </div>

                <div className="booking-details">
                  <h3 className="booking-title">{booking.destination_name || `Trip #${booking.id}`}</h3>
                  <div className="booking-meta">
                    <span className="location">
                      <FaMapMarkerAlt /> {booking.destination_country || 'Location TBD'}
                    </span>
                    <span className="dates">
                      <FaCalendarAlt /> {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="booking-info">
                    <span>Travelers: {booking.number_of_travelers}</span>
                    <span>Total: ${booking.total_amount}</span>
                  </div>
                  {booking.special_requests && (
                    <p className="special-requests">
                      <strong>Special Requests:</strong> {booking.special_requests}
                    </p>
                  )}
                </div>

                <div className="booking-status-section">
                  <div className="status-display">
                    {getStatusIcon(booking.status)}
                    <span className="status-text">{getStatusText(booking.status)}</span>
                  </div>

                  <div className="booking-actions">
                    <Link to={`/destinations/${booking.destination_id}`} className="action-btn view-btn">
                      <FaEye /> View Details
                    </Link>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="action-btn cancel-btn"
                      >
                        <FaTimesCircle /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <h3>No bookings found</h3>
            <p>You haven't made any bookings yet.</p>
            <Link to="/destinations" className="explore-btn">
              Explore Destinations
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelerBookings;