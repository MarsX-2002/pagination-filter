import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 6,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    propertyType: '',
    wifi: false,
    ac: false,
    washer: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch properties with pagination
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:3001/filter', {
        params: {
          page: pagination.currentPage,
          limit: pagination.itemsPerPage,
          ...filters
        }
      });

      setProperties(response.data.properties);
      setPagination(prev => ({
        ...prev,
        ...response.data.pagination
      }));
    } catch (error) {
      setError('Error fetching properties. Please try again.');
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [pagination.currentPage, filters]);

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setPagination(prev => ({
      ...prev,
      currentPage: 1 // Reset to first page when filters change
    }));
  };

  // Render pagination controls
  const renderPaginationControls = () => {
    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${pagination.currentPage === i ? 'active' : ''}`}
          disabled={pagination.currentPage === i}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className="pagination-button"
        >
          Previous
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="property-list">
      {/* Filters */}
      <div className="filters">
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={filters.bedrooms}
          onChange={handleFilterChange}
        />
        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
        </select>
        <label>
          <input
            type="checkbox"
            name="wifi"
            checked={filters.wifi}
            onChange={handleFilterChange}
          />
          WiFi
        </label>
        <label>
          <input
            type="checkbox"
            name="ac"
            checked={filters.ac}
            onChange={handleFilterChange}
          />
          AC
        </label>
        <label>
          <input
            type="checkbox"
            name="washer"
            checked={filters.washer}
            onChange={handleFilterChange}
          />
          Washer
        </label>
      </div>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Loading indicator */}
      {loading && <div className="loading">Loading...</div>}

      {/* Properties grid */}
      <div className="properties-grid">
        {properties.map(property => (
          <div key={property.id} className="property-card">
            <img src={property.img} alt={property.name} />
            <h3>{property.name}</h3>
            <p>Price: ${property.price}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathRooms}</p>
            <div className="amenities">
              {property.wifi && <span>WiFi</span>}
              {property.ac && <span>AC</span>}
              {property.washer && <span>Washer</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {!loading && !error && properties.length > 0 && (
        <div className="pagination">
          {renderPaginationControls()}
          <div className="pagination-info">
            Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
            {pagination.totalItems} properties
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;