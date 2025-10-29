import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import Card from '../Card/Card';
import './DestinationCard.css';

const DestinationCard = ({ destination, onClick }) => {
  const navigate = useNavigate();
  const { name, country, price, image_url, description, id } = destination;

  const handleMoreInfo = (e) => {
    e.stopPropagation();
    navigate(`/destinations/${id}`);
  };

  return (
    <Card
      image={image_url}
      title={name}
      description={description}
      onClick={onClick}
      className="card-compact destination-card"
      imageAlt={name}
    >
      <div className="destination-meta">
        <div className="location-price">
          <span className="location">
            <FaMapMarkerAlt /> {country}
          </span>
          <span className="price">
            <FaDollarSign /> ${price}
          </span>
        </div>
        <button
          onClick={handleMoreInfo}
          className="more-info-btn"
          title="View Details"
        >
          <FaInfoCircle /> More Info
        </button>
      </div>
    </Card>
  );
};

export default DestinationCard;
