import React from 'react';
import DestinationCard from '../DestinationCard/DestinationCard';
import './DestinationGrid.css';

const DestinationGrid = ({ 
  destinations, 
  onDestinationClick, 
  onBookNow,
  loading = false,
  emptyMessage = "No destinations found."
}) => {
  if (loading) {
    return (
      <div className="destination-grid-loading">
        <div className="loading-spinner"></div>
        <p>Loading destinations...</p>
      </div>
    );
  }

  if (!destinations || destinations.length === 0) {
    return (
      <div className="destination-grid-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="destination-grid">
      {destinations.map(destination => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          onClick={() => onDestinationClick && onDestinationClick(destination)}
          onBookNow={() => onBookNow && onBookNow(destination)}
        />
      ))}
    </div>
  );
};

export default DestinationGrid;