import React, { useEffect, useState } from 'react';
import DestinationCard from '../../../components/common/DestinationCard/DestinationCard.jsx';
import axios from 'axios';
import './DestinationsPage.css'; // optional CSS file for page-specific styles

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/destinations'); // adjust API URL if needed
        setDestinations(response.data);
      } catch (err) {
        setError('Failed to fetch destinations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) return <p>Loading destinations...</p>;
  if (error) return <p>{error}</p>;

  // Split destinations into categories
  const popularDestinations = destinations.filter(d => d.category === 'popular');
  const internationalDestinations = destinations.filter(d => d.category === 'international');

  return (
    <div className="destinations-page">
      <h2>Popular Destinations (Kenya)</h2>
      <div className="destinations-grid">
        {popularDestinations.map(dest => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>

      <h2>International Destinations</h2>
      <div className="destinations-grid">
        {internationalDestinations.map(dest => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
