import React from 'react';
import { Link } from 'react-router-dom';
import './TravelerDashboard.css';

const TravelerDashboard = () => {
  const activeBookings = [
    {
      id: 1,
      title: 'Kenya Safari Adventure',
      date: 'Dec 15, 2024',
      status: 'Confirmed'
    },
    {
      id: 2,
      title: 'Zanzibar Beach Escape',
      date: 'Jan 20, 2025',
      status: 'Pending'
    }
  ];

  return (
    <div className="traveler-dashboard">
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back, Traveler!</h1>
          <p className="welcome-subtitle">Ready for your next adventure?</p>
        </div>

        <div className="dashboard-content">
          <div className="bookings-summary">
            <h2 className="section-title">Active Bookings</h2>
            {activeBookings.length > 0 ? (
              <div className="bookings-list">
                {activeBookings.map(booking => (
                  <div key={booking.id} className="booking-item">
                    <div className="booking-info">
                      <h3 className="booking-title">{booking.title}</h3>
                      <p className="booking-date">{booking.date}</p>
                    </div>
                    <span className={`booking-status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-bookings">No active bookings yet. Start exploring!</p>
            )}
          </div>

          <div className="quick-links">
            <h2 className="section-title">Quick Actions</h2>
            <div className="links-grid">
              <Link to="/traveler/explore" className="quick-link">
                <h3>Explore Trips</h3>
                <p>Discover new adventures</p>
              </Link>
              <Link to="/traveler/bookings" className="quick-link">
                <h3>My Bookings</h3>
                <p>View all your trips</p>
              </Link>
              <Link to="/traveler/profile" className="quick-link">
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