import React, { useState } from 'react';
import './TravelerExplore.css';

const TravelerExplore = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const destinations = [
    {
      id: 1,
      image: '/src/assets/images/kenya-safari.jpg',
      title: 'Kenya Safari Adventure',
      description: 'Experience the Big Five in their natural habitat across Kenya\'s iconic national parks.',
      price: '$1,200',
      duration: '7 days'
    },
    {
      id: 2,
      image: '/src/assets/images/tanzania-adventure.jpg',
      title: 'Tanzania Adventure Trails',
      description: 'Discover the Serengeti and climb Mount Kilimanjaro on this epic adventure.',
      price: '$1,500',
      duration: '10 days'
    },
    {
      id: 3,
      image: '/src/assets/images/zanzibar-beach.jpg',
      title: 'Zanzibar Beach Escape',
      description: 'Relax on pristine beaches and explore the rich culture of Zanzibar Island.',
      price: '$800',
      duration: '5 days'
    }
  ];

  const openBookingModal = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDestination(null);
  };

  return (
    <div className="traveler-explore">
      <div className="explore-container">
        <div className="explore-header">
          <h1 className="explore-title">Explore Destinations</h1>
          <p className="explore-subtitle">Choose your next adventure</p>
        </div>

        <div className="destinations-grid">
          {destinations.map(destination => (
            <div key={destination.id} className="destination-card">
              <img 
                src={destination.image} 
                alt={destination.title}
                className="destination-image"
              />
              <div className="destination-content">
                <h3 className="destination-name">{destination.title}</h3>
                <p className="destination-description">{destination.description}</p>
                <div className="destination-details">
                  <span className="destination-price">{destination.price}</span>
                  <span className="destination-duration">{destination.duration}</span>
                </div>
                <button 
                  className="book-button"
                  onClick={() => openBookingModal(destination)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Book {selectedDestination?.title}</h2>
                <button className="close-button" onClick={closeModal}>×</button>
              </div>
              <div className="modal-content">
                <p>Price: {selectedDestination?.price}</p>
                <p>Duration: {selectedDestination?.duration}</p>
                <button className="confirm-booking">Confirm Booking</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelerExplore;