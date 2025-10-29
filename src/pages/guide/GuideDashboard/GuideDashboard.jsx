import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import guideApi from '../../../api/guideApi';
import bookingApi from '../../../api/bookingApi';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaCheckCircle, FaExclamationTriangle, FaDollarSign } from 'react-icons/fa';
import './GuideDashboard.css';

const GuideDashboard = () => {
  const { user } = useAuth();
  const [guideProfile, setGuideProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    tripsCreated: 0,
    activeBookings: 0,
    totalEarnings: '$0',
    subscriptionPlan: 'Free'
  });
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

      // Fetch guide profile and bookings in parallel
      const [profileData, bookingsData] = await Promise.all([
        guideApi.getGuide(user.id),
        guideApi.getGuideBookings(user.id)
      ]);

      setGuideProfile(profileData);
      setBookings(bookingsData);

      // Calculate stats from real data
      const activeBookings = bookingsData.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
      const totalEarnings = bookingsData
        .filter(b => b.status === 'completed')
        .reduce((sum, booking) => sum + (booking.total_amount || 0), 0);

      setStats({
        tripsCreated: profileData.trips_created || 0,
        activeBookings,
        totalEarnings: `$${totalEarnings.toFixed(2)}`,
        subscriptionPlan: profileData.subscription_plan || 'Free'
      });
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
      <div className="guide-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="guide-dashboard">
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
    <div className="guide-dashboard">
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, {guideProfile?.full_name || user?.full_name || 'Guide'}!</h1>
          <p className="welcome-subtitle">Manage your trips and bookings</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Trips Created</h3>
            <div className="stat-number">{stats.tripsCreated}</div>
          </div>
          <div className="stat-card">
            <h3>Active Bookings</h3>
            <div className="stat-number">{stats.activeBookings}</div>
          </div>
          <div className="stat-card">
            <h3>Total Earnings</h3>
            <div className="stat-number">{stats.totalEarnings}</div>
          </div>
          <div className="stat-card">
            <h3>Plan Status</h3>
            <div className="stat-plan">{stats.subscriptionPlan}</div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="recent-bookings">
            <h2 className="section-title">Recent Bookings</h2>
            {bookings.length > 0 ? (
              <div className="bookings-list">
                {bookings.slice(0, 5).map(booking => (
                  <div key={booking.id} className="booking-item">
                    <div className="booking-info">
                      <h3 className="booking-title">{booking.destination_name || `Trip #${booking.id}`}</h3>
                      <p className="booking-traveler">Traveler: {booking.traveler_name || 'TBD'}</p>
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
                <p>No bookings yet. Create amazing trips to attract travelers!</p>
                <Link to="/guide/trips/new" className="create-trip-btn">
                  Create Your First Trip
                </Link>
              </div>
            )}
          </div>

          <div className="quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <Link to="/guide/trips/new" className="create-trip-button">
              Create New Trip
            </Link>
            <div className="action-links">
              <Link to="/guide/trips" className="action-link">
                Manage Trips
              </Link>
              <Link to="/guide/bookings" className="action-link">
                View All Bookings
              </Link>
              <Link to="/profile" className="action-link">
                Update Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;