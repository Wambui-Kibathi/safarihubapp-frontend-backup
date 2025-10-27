import React from 'react';
import { StarIcon, LocationIcon } from '@/icons/CommonIcons';
import { calculateRatingStars } from '@/utils/helpers';
import './TravelerCard.css';

const TravelerCard = ({ 
  traveler, 
  onClick,
  className = ''
}) => {
  const {
    name,
    location,
    profileImage,
    rating = 0,
    reviewCount = 0,
    joinedDate,
    tripsCompleted = 0
  } = traveler;

  const ratingStars = calculateRatingStars(rating);

  return (
    <div className={`traveler-card ${className}`} onClick={onClick}>
      <div className="traveler-avatar">
        <img 
          src={profileImage || '/src/assets/images/default-avatar.png'} 
          alt={name}
        />
      </div>
      
      <div className="traveler-info">
        <h3 className="traveler-name">{name}</h3>
        
        <div className="traveler-location">
          <LocationIcon size={16} color="#666666" />
          <span>{location}</span>
        </div>
        
        <div className="traveler-rating">
          <div className="rating-stars">
            {ratingStars.map((star, index) => (
              <StarIcon 
                key={index}
                size={16}
                color={star === 'full' ? '#f4a261' : star === 'half' ? '#f4a261' : '#e0e0e0'}
              />
            ))}
          </div>
          <span className="rating-text">
            {rating.toFixed(1)} ({reviewCount} reviews)
          </span>
        </div>
        
        <div className="traveler-stats">
          <div className="stat">
            <span className="stat-number">{tripsCompleted}</span>
            <span className="stat-label">Trips</span>
          </div>
          <div className="stat">
            <span className="stat-number">{new Date(joinedDate).getFullYear()}</span>
            <span className="stat-label">Joined</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelerCard;