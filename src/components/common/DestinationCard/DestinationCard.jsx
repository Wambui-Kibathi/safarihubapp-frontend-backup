import React from 'react';
import Card from '../Card/Card'; // import the generic card component
import './DestinationCard.css'; // import the Card specific styles

const DestinationCard = ({ destination, onClick }) => {
  const { name, country, price, image_url, description } = destination;

  return (
    <Card
      image={image_url}
      title={name}
      description={description}
      onClick={onClick}
      className="card-compact"
      imageAlt={name}
    >
      <p style={{ fontWeight: '600', marginTop: '0.5rem' }}>
        {country} • ${price}
      </p>
    </Card>
  );
};

export default DestinationCard;
