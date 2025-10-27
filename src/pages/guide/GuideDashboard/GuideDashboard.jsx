import React from 'react';
import { Link } from 'react-router-dom';
import './GuideDashboard.css';

const GuideDashboard = () => {
  const stats = {
    tripsCreated: 12,
    activeBookings: 8,
    totalEarnings: '$4,200',
    subscriptionPlan: 'Premium'
  };

  const recentBookings = [
    {
      id: 1,
      tripTitle: 'Maasai Mara Safari',
      travelerName: 'John Smith',
      date: 'Dec 20, 2024',
      status: 'Confirmed'
    },
    {
      id: 2,
      tripTitle: 'Mount Kenya Hiking',
      travelerName: 'Emma Wilson',
      date: 'Jan 5, 2025',
      status: 'Pending'
    }
  ];

  return (
    <div className="guide-dashboard">
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, Guide!</h1>
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
            {recentBookings.length > 0 ? (
              <div className="bookings-list">
                {recentBookings.map(booking => (
                  <div key={booking.id} className="booking-item">
                    <div className="booking-info">
                      <h3 className="booking-title">{booking.tripTitle}</h3>
                      <p className="booking-traveler">Traveler: {booking.travelerName}</p>
                      <p className="booking-date">{booking.date}</p>
                    </div>
                    <span className={`booking-status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-bookings">No recent bookings</p>
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
              <Link to="/guide/profile" className="action-link">
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