import React, { useState, useEffect } from 'react';
import { GiLion, GiWorld, GiEarthAfricaEurope } from 'react-icons/gi';
import destinationApi from '../../../api/destinationApi';
import DestinationGrid from '../DestinationGrid/DestinationGrid';
import './DestinationCategories.css';

const DestinationCategories = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [activeCategory, destinations]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await destinationApi.getAllDestinations();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDestinations = () => {
    if (activeCategory === 'all') {
      setFilteredDestinations(destinations);
    } else {
      const filtered = destinations.filter(dest => dest.category === activeCategory);
      setFilteredDestinations(filtered);
    }
  };

  const handleDestinationClick = (destination) => {
    console.log('Destination clicked:', destination);
    // Navigate to destination details page
    // navigate(`/destinations/${destination.id}`);
  };

  const handleBookNow = (destination) => {
    console.log('Book now clicked for:', destination);
    // Open booking modal or navigate to booking page
  };

  const categories = [
    { 
      id: 'all', 
      name: 'All Destinations', 
      count: destinations.length,
      icon: <GiEarthAfricaEurope className="filter-icon" />
    },
    { 
      id: 'popular', 
      name: 'African Safaris', 
      count: destinations.filter(d => d.category === 'popular').length,
      icon: <GiLion className="filter-icon" />
    },
    { 
      id: 'international', 
      name: 'International', 
      count: destinations.filter(d => d.category === 'international').length,
      icon: <GiWorld className="filter-icon" />
    }
  ];

  return (
    <div className="destination-categories">
      <div className="destination-categories-header">
        <h2>Explore Our Destinations</h2>
        <p>From African safaris to international adventures - discover amazing places around the world</p>
      </div>

      {/* Category Filter */}
      <div className="destination-category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`destination-category-filter ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon}
            {category.name}
            <span className="destination-category-count">({category.count})</span>
          </button>
        ))}
      </div>

      {/* Destinations Grid */}
      <DestinationGrid
        destinations={filteredDestinations}
        onDestinationClick={handleDestinationClick}
        onBookNow={handleBookNow}
        loading={loading}
        emptyMessage={`No ${activeCategory === 'all' ? '' : activeCategory + ' '}destinations found.`}
      />
    </div>
  );
};

export default DestinationCategories;