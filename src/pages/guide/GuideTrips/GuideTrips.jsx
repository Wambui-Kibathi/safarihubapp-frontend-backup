import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GuideTrips.css';

const GuideTrips = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: 'Maasai Mara Safari',
      description: 'Experience the Great Migration and Big Five in Kenya\'s premier game reserve.',
      price: '$1,200',
      duration: '5 days',
      status: 'Active',
      bookings: 3
    },
    {
      id: 2,
      title: 'Mount Kenya Hiking',
      description: 'Challenge yourself with a trek to Africa\'s second highest peak.',
      price: '$800',
      duration: '4 days',
      status: 'Active',
      bookings: 1
    },
    {
      id: 3,
      title: 'Samburu Cultural Tour',
      description: 'Immerse yourself in traditional Samburu culture and wildlife.',
      price: '$600',
      duration: '3 days',
      status: 'Draft',
      bookings: 0
    }
  ]);

  const handleDelete = (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      setTrips(trips.filter(trip => trip.id !== tripId));
    }
  };

  return (
    <div className="guide-trips">
      <div className="trips-container">
        <div className="trips-header">
          <h1 className="trips-title">My Trips</h1>
          <Link to="/guide/trips/new" className="create-trip-button">
            Create New Trip
          </Link>
        </div>

        <div className="trips-grid">
          {trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <div className="trip-content">
                <div className="trip-header">
                  <h3 className="trip-title">{trip.title}</h3>
                  <span className={`trip-status ${trip.status.toLowerCase()}`}>
                    {trip.status}
                  </span>
                </div>
                <p className="trip-description">{trip.description}</p>
                <div className="trip-details">
                  <div className="trip-info">
                    <span className="trip-price">{trip.price}</span>
                    <span className="trip-duration">{trip.duration}</span>
                    <span className="trip-bookings">{trip.bookings} bookings</span>
                  </div>
                </div>
              </div>
              <div className="trip-actions">
                <Link to={`/guide/trips/edit/${trip.id}`} className="edit-button">
                  Edit
                </Link>
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(trip.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {trips.length === 0 && (
          <div className="no-trips">
            <p>No trips created yet. Start by creating your first trip!</p>
            <Link to="/guide/trips/new" className="create-first-trip">
              Create Your First Trip
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideTrips;