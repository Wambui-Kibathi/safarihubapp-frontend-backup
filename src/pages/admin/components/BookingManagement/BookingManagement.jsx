import React, { useState, useEffect } from 'react';
import adminApi from '../../../../api/adminApi';
import './BookingManagement.css';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getBookings();
      setBookings(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="booking-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-management-error">
        <p>{error}</p>
        <button onClick={fetchBookings} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="booking-management">
      <div className="booking-header">
        <h1>Booking Management</h1>
        <p>Manage all bookings in the system</p>
      </div>

      <div className="booking-stats">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p className="stat-number">{bookings.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">
            {bookings.filter(b => b.status === 'pending').length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Confirmed</h3>
          <p className="stat-number">
            {bookings.filter(b => b.status === 'confirmed').length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">
            {bookings.filter(b => b.status === 'completed').length}
          </p>
        </div>
      </div>

      <div className="booking-table-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Traveler</th>
              <th>Guide</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.traveler_name}</td>
                <td>{booking.guide_name}</td>
                <td>{booking.destination_name}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge status-${booking.status}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn view-btn">View</button>
                  <button className="action-btn edit-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;