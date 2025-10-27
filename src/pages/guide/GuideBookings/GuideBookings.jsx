import React from 'react';
import './GuideBookings.css';

const GuideBookings = () => {
  const bookings = [
    {
      id: 1,
      tripTitle: 'Maasai Mara Safari',
      travelerName: 'Sarah Johnson',
      travelerEmail: 'sarah.johnson@email.com',
      bookingDate: 'Nov 20, 2024',
      tripDate: 'Dec 15, 2024',
      duration: '5 days',
      price: '$1,200',
      status: 'Confirmed',
      travelers: 2
    },
    {
      id: 2,
      tripTitle: 'Mount Kenya Hiking',
      travelerName: 'Michael Chen',
      travelerEmail: 'michael.chen@email.com',
      bookingDate: 'Nov 18, 2024',
      tripDate: 'Jan 10, 2025',
      duration: '4 days',
      price: '$800',
      status: 'Pending',
      travelers: 1
    },
    {
      id: 3,
      tripTitle: 'Maasai Mara Safari',
      travelerName: 'Emma Wilson',
      travelerEmail: 'emma.wilson@email.com',
      bookingDate: 'Oct 15, 2024',
      tripDate: 'Nov 5, 2024',
      duration: '5 days',
      price: '$1,200',
      status: 'Completed',
      travelers: 3
    }
  ];

  return (
    <div className="guide-bookings">
      <div className="bookings-container">
        <div className="bookings-header">
          <h1 className="bookings-title">Trip Bookings</h1>
          <p className="bookings-subtitle">Manage your booked trips</p>
        </div>

        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-main">
                <div className="booking-info">
                  <h3 className="booking-trip-title">{booking.tripTitle}</h3>
                  <div className="traveler-info">
                    <div className="traveler-details">
                      <span className="traveler-name">👤 {booking.travelerName}</span>
                      <span className="traveler-email">✉️ {booking.travelerEmail}</span>
                      <span className="traveler-count">👥 {booking.travelers} traveler(s)</span>
                    </div>
                  </div>
                  <div className="booking-dates">
                    <span className="booking-date">📅 Booked: {booking.bookingDate}</span>
                    <span className="trip-date">🗓️ Trip: {booking.tripDate}</span>
                    <span className="trip-duration">⏱️ {booking.duration}</span>
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
            <p>No bookings yet. Your trips will appear here once travelers book them.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideBookings;