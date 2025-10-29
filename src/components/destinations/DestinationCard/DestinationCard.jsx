import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GiLion, GiWorld } from 'react-icons/gi';
import './DestinationCard.css';

const DestinationCard = ({ destination, onClick, onBookNow }) => {
  const { name, country, price, image_url, description, category } = destination;

  const getCategoryBadge = (category) => {
    const badges = {
      popular: { 
        label: 'African Safari', 
        color: '#FF6B35', 
        icon: <GiLion className="badge-icon" /> 
      },
      international: { 
        label: 'International', 
        color: '#004E89', 
        icon: <GiWorld className="badge-icon" /> 
      }
    };
    
    const badge = badges[category] || { 
      label: category, 
      color: '#666', 
      icon: <FaMapMarkerAlt className="badge-icon" /> 
    };
    
    return (
      <span 
        className="destination-card-badge"
        style={{ backgroundColor: badge.color }}
      >
        {badge.icon}
        <span className="badge-text">{badge.label}</span>
      </span>
    );
  };

  const handleBookNow = (e) => {
    e.stopPropagation();
    if (onBookNow) {
      onBookNow(destination);
    } else {
      console.log('Book now clicked for:', destination.id);
    }
  };

  return (
    <div className="destination-card" onClick={onClick}>
      <div className="destination-card-image">
        <img src={image_url || '/default-destination.jpg'} alt={name} />
        {getCategoryBadge(category)}
      </div>
      
      <div className="destination-card-content">
        <h3 className="destination-card-name">{name}</h3>
        <p className="destination-card-country">
          <FaMapMarkerAlt className="country-icon" />
          {country}
        </p>
        <p className="destination-card-description">
          {description || 'Experience amazing adventures in this beautiful destination.'}
        </p>
        
        <div className="destination-card-footer">
          <div className="destination-card-price">
            <span className="price-amount">${price}</span>
            <span className="price-label">per person</span>
          </div>
          <button className="destination-card-button" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;