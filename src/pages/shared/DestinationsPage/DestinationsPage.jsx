import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import destinationApi from '../../../api/destinationApi';
import DestinationCard from '../../../components/common/DestinationCard/DestinationCard';
import './DestinationsPage.css';

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [destinations, searchTerm, selectedCategory]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await destinationApi.getAllDestinations();
      setDestinations(data);
      setError(null);
    } catch (err) {
      setError('Failed to load destinations');
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterDestinations = () => {
    let filtered = destinations;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(dest => dest.category === selectedCategory);
    }

    setFilteredDestinations(filtered);
  };

  const handleDestinationClick = (destination) => {
    navigate(`/destinations/${destination.id}`);
  };

  const categories = [
    { value: 'all', label: 'All Destinations' },
    { value: 'popular', label: 'African Safari' },
    { value: 'international', label: 'International' }
  ];

  if (loading) {
    return (
      <div className="destinations-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="destinations-page">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchDestinations} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="destinations-page">
      <div className="destinations-header">
        <h1>Explore Destinations</h1>
        <p>Discover amazing safari experiences and travel destinations</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="destinations-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.value}
              className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>
          {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
          {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="destinations-grid">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map(destination => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onClick={() => handleDestinationClick(destination)}
            />
          ))
        ) : (
          <div className="no-destinations">
            <h3>No destinations found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;
