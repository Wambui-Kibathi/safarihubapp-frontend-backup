import React from 'react';
import './TravelerBookings.css';

const TravelerBookings = () => {
  const bookings = [
    {
      id: 1,
      title: 'Kenya Safari Adventure',
      date: 'Dec 15, 2024',
      duration: '7 days',
      price: '$1,200',
      status: 'Confirmed',
      guide: 'John Mwangi'
    },
    {
      id: 2,
      title: 'Zanzibar Beach Escape',
      date: 'Jan 20, 2025',
      duration: '5 days',
      price: '$800',
      status: 'Pending',
      guide: 'Amina Hassan'
    },
    {
      id: 3,
      title: 'Tanzania Adventure Trails',
      date: 'Aug 10, 2024',
      duration: '10 days',
      price: '$1,500',
      status: 'Completed',
      guide: 'David Kimani'
    }
  ];

  return (
    <div className="traveler-bookings">
      <div className="bookings-container">
        <div className="bookings-header">
          <h1 className="bookings-title">My Bookings</h1>
          <p className="bookings-subtitle">Manage your safari adventures</p>
        </div>

        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-main">
                <div className="booking-info">
                  <h3 className="booking-title">{booking.title}</h3>
                  <div className="booking-details">
                    <span className="booking-date">{booking.date}</span>
                    <span className="booking-duration">{booking.duration}</span>
                    <span className="booking-guide">Guide: {booking.guide}</span>
                  </div>
                </div>
                <div className="booking-meta">
                  <div className="booking-price">{booking.price}</div>
                  <span className={`booking-status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="no-bookings">
            <p>No bookings found. Start exploring to book your first adventure!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelerBookings;