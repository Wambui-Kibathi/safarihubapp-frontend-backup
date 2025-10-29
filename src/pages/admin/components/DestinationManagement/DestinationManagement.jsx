import React, { useState, useEffect } from 'react';
import destinationApi from '../../../../api/destinationApi';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSync, FaMapMarkerAlt, FaDollarSign, FaGlobe } from 'react-icons/fa';
import './DestinationManagement.css';

const DestinationManagement = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [destinations, searchTerm]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const data = await destinationApi.getAllDestinations();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      alert('Failed to load destinations: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const filterDestinations = () => {
    const filtered = destinations.filter(dest =>
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  const handleDelete = async (destinationId) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await destinationApi.deleteDestination(destinationId);
        await fetchDestinations(); // Refresh list
        alert('Destination deleted successfully');
      } catch (error) {
        alert('Failed to delete destination: ' + error);
      }
    }
  };

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      popular: { label: 'African Safari', color: '#e67e22', icon: <FaGlobe /> },
      international: { label: 'International', color: '#3498db', icon: <FaMapMarkerAlt /> }
    };
    
    const config = categoryConfig[category] || { label: category, color: '#7f8c8d' };
    
    return (
      <span 
        className="category-badge"
        style={{ backgroundColor: config.color }}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="destination-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading destinations...</p>
      </div>
    );
  }

  return (
    <div className="destination-management">
      <div className="section-header">
        <div className="header-title">
          <h1>Destination Management</h1>
          <p>Manage all travel destinations in SafariHub</p>
        </div>
        <div className="header-actions">
          <button onClick={fetchDestinations} className="refresh-btn">
            <FaSync />
            Refresh
          </button>
          <button onClick={() => setShowForm(true)} className="add-btn">
            <FaPlus />
            Add Destination
          </button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="destination-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search destinations by name, country, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="destination-stats">
          <span>Total: {destinations.length}</span>
          <span>African: {destinations.filter(d => d.category === 'popular').length}</span>
          <span>International: {destinations.filter(d => d.category === 'international').length}</span>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="destinations-grid">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map(destination => (
            <div key={destination.id} className="destination-card">
              <div className="card-image">
                <img src={destination.image_url || '/default-destination.jpg'} alt={destination.name} />
                {getCategoryBadge(destination.category)}
              </div>
              
              <div className="card-content">
                <h3 className="destination-name">{destination.name}</h3>
                <p className="destination-country">
                  <FaMapMarkerAlt />
                  {destination.country}
                </p>
                <p className="destination-price">
                  <FaDollarSign />
                  ${destination.price}
                </p>
                <p className="destination-description">
                  {destination.description || 'No description available.'}
                </p>
              </div>

              <div className="card-actions">
                <button 
                  className="edit-btn"
                  onClick={() => {
                    setEditingDestination(destination);
                    setShowForm(true);
                  }}
                >
                  <FaEdit />
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(destination.id)}
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-destinations">
            {searchTerm ? 'No destinations found matching your search.' : 'No destinations found.'}
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <DestinationForm
          destination={editingDestination}
          onClose={() => {
            setShowForm(false);
            setEditingDestination(null);
          }}
          onSuccess={() => {
            setShowForm(false);
            setEditingDestination(null);
            fetchDestinations();
          }}
        />
      )}
    </div>
  );
};

// Destination Form Component
const DestinationForm = ({ destination, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: destination?.name || '',
    country: destination?.country || '',
    price: destination?.price || '',
    description: destination?.description || '',
    category: destination?.category || 'popular',
    image_url: destination?.image_url || ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (destination) {
        // Update existing destination
        await destinationApi.updateDestination(destination.id, formData);
        alert('Destination updated successfully!');
      } else {
        // Create new destination
        await destinationApi.createDestination(formData);
        alert('Destination created successfully!');
      }
      onSuccess();
    } catch (error) {
      alert('Operation failed: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{destination ? 'Edit Destination' : 'Add New Destination'}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="destination-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Destination Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="popular">African Safari</option>
                <option value="international">International</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Image URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe this amazing destination..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Saving...' : (destination ? 'Update Destination' : 'Create Destination')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DestinationManagement;