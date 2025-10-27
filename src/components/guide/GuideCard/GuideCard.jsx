import React from 'react';
import { StarIcon, LocationIcon } from '@/icons/CommonIcons';
import { calculateRatingStars } from '@/utils/helpers';
import './GuideCard.css';

const GuideCard = ({ 
  guide, 
  onClick,
  className = ''
}) => {
  const {
    name,
    location,
    profileImage,
    rating = 0,
    reviewCount = 0,
    experience,
    specialties = [],
    languages = [],
    tripsCompleted = 0
  } = guide;

  const ratingStars = calculateRatingStars(rating);

  return (
    <div className={`guide-card ${className}`} onClick={onClick}>
      <div className="guide-avatar">
        <img 
          src={profileImage || '/src/assets/images/default-avatar.png'} 
          alt={name}
        />
      </div>
      
      <div className="guide-info">
        <h3 className="guide-name">{name}</h3>
        
        <div className="guide-location">
          <LocationIcon size={16} color="#666666" />
          <span>{location}</span>
        </div>
        
        <div className="guide-rating">
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
        
        <div className="guide-experience">
          <span className="experience-text">{experience} years experience</span>
        </div>
        
        {specialties.length > 0 && (
          <div className="guide-specialties">
            <h4>Specialties:</h4>
            <div className="specialties-list">
              {specialties.slice(0, 3).map((specialty, index) => (
                <span key={index} className="specialty-tag">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {languages.length > 0 && (
          <div className="guide-languages">
            <span className="languages-text">
              Languages: {languages.join(', ')}
            </span>
          </div>
        )}
        
        <div className="guide-stats">
          <div className="stat">
            <span className="stat-number">{tripsCompleted}</span>
            <span className="stat-label">Trips Led</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;