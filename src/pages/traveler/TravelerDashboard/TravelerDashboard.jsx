import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import bookingApi from '../../../api/bookingApi';
import travelerApi from '../../../api/travelerApi';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './TravelerDashboard.css';

const TravelerDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [travelerProfile, setTravelerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch traveler profile and bookings in parallel
      const [profileData, bookingsData] = await Promise.all([
        travelerApi.getTraveler(user.id),
        bookingApi.getUserBookings(user.id)
      ]);

      setTravelerProfile(profileData);
      setBookings(bookingsData);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <FaCheckCircle className="status-icon confirmed" />;
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'cancelled':
        return <FaExclamationTriangle className="status-icon cancelled" />;
      default:
        return <FaClock className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="traveler-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="traveler-dashboard">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="traveler-dashboard">
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, {travelerProfile?.full_name || user?.full_name || 'Traveler'}!</h1>
          <p className="welcome-subtitle">Ready for your next adventure?</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <div className="stat-number">{bookings.length}</div>
          </div>
          <div className="stat-card">
            <h3>Upcoming Trips</h3>
            <div className="stat-number">
              {bookings.filter(b => new Date(b.start_date) > new Date()).length}
            </div>
          </div>
          <div className="stat-card">
            <h3>Completed Trips</h3>
            <div className="stat-number">
              {bookings.filter(b => b.status === 'completed').length}
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="bookings-summary">
            <h2 className="section-title">Your Bookings</h2>
            {bookings.length > 0 ? (
              <div className="bookings-list">
                {bookings.slice(0, 5).map(booking => (
                  <div key={booking.id} className="booking-item">
                    <div className="booking-info">
                      <h3 className="booking-title">{booking.destination_name || `Trip #${booking.id}`}</h3>
                      <p className="booking-date">
                        <FaCalendarAlt /> {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                      </p>
                      <p className="booking-location">
                        <FaMapMarkerAlt /> {booking.destination_country || 'Location TBD'}
                      </p>
                    </div>
                    <div className="booking-status">
                      {getStatusIcon(booking.status)}
                      <span>{getStatusText(booking.status)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-bookings">
                <p>No bookings yet. Start exploring amazing destinations!</p>
                <Link to="/destinations" className="explore-btn">
                  Explore Destinations
                </Link>
              </div>
            )}
          </div>

          <div className="quick-links">
            <h2 className="section-title">Quick Actions</h2>
            <div className="links-grid">
              <Link to="/destinations" className="quick-link">
                <h3>Explore Trips</h3>
                <p>Discover new adventures</p>
              </Link>
              <Link to="/traveler/bookings" className="quick-link">
                <h3>My Bookings</h3>
                <p>View all your trips</p>
              </Link>
              <Link to="/profile" className="quick-link">
                <h3>Profile</h3>
                <p>Update your information</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerDashboard;