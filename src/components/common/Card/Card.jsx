import React from 'react';
import './Card.css';

const Card = ({ 
  image, 
  title, 
  description, 
  onClick, 
  className = '', 
  children,
  imageAlt = ''
}) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {image && (
        <div className="card-image">
          <img src={image} alt={imageAlt || title} />
        </div>
      )}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default Card;