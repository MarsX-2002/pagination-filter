import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpotifyPlayer from './components/SpotifyPlayer';

const PropertyList = () => {
  // Get initial filters from URL parameters
  const getInitialFilters = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      bedrooms: params.get('bedrooms') || '',
      propertyType: params.get('propertyType') || '',
      wifi: params.get('wifi') === 'true',
      ac: params.get('ac') === 'true',
      washer: params.get('washer') === 'true'
    };
  };

  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: parseInt(new URLSearchParams(window.location.search).get('page')) || 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 6,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [filters, setFilters] = useState(getInitialFilters());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update URL with current filters and pagination
  const updateURL = (newFilters, newPage) => {
    const params = new URLSearchParams();
    
    // Add pagination
    params.set('page', newPage || pagination.currentPage);
    
    // Add filters
    Object.entries(newFilters || filters).forEach(([key, value]) => {
      if (value !== '' && value !== false && value !== null) {
        params.set(key, value.toString());
      }
    });

    // Update browser URL without reload
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );
  };

  // Fetch properties with pagination
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('http://localhost:3001/properties', {
        params: {
          page: pagination.currentPage,
          limit: pagination.itemsPerPage,
          ...filters
        }
      });

      if (response.data) {
        console.log('Response from server:', response.data);
        setProperties(response.data.properties || []);
        setPagination(prev => ({
          ...prev,
          ...(response.data.pagination || {})
        }));
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        stack: error.stack
      });
      setError(error.response?.data?.error || error.message || 'Error fetching properties');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
    updateURL(null, newPage);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    };
    setFilters(newFilters);
    setPagination(prev => ({
      ...prev,
      currentPage: 1
    }));
    updateURL(newFilters, 1);
  };

  // Effect for URL changes
  useEffect(() => {
    const handlePopState = () => {
      setFilters(getInitialFilters());
      setPagination(prev => ({
        ...prev,
        currentPage: parseInt(new URLSearchParams(window.location.search).get('page')) || 1
      }));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Effect for fetching properties
  useEffect(() => {
    fetchProperties();
  }, [pagination.currentPage, filters]);

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
      {/* Pagination at top */}
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
        
        {/* Bedrooms filter */}
        <div className="filter-group">
          <label>
            Bedrooms:
            <input
              type="range"
              min="-1"
              max="10"
              value={filters.bedrooms}
              onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
            />
            <span>{filters.bedrooms === '-1' ? 'Any' : filters.bedrooms}</span>
          </label>
          <button onClick={() => setFilters(prev => ({ ...prev, bedrooms: 6 }))}>Show 6+</button>
        </div>

        {/* Property Type filter */}
        <div className="filter-group">
          <label>
            Property Type:
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
            </select>
          </label>
        </div>

        {/* Amenities filters */}
        <div className="filter-group">
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
      </div>

      {/* Properties grid */}
      <div className="properties-grid">
        {properties.map(property => (
          <div key={property.id} className="property-card">
            <img src={`http://localhost:3001/${property.img}`} alt={property.name} />
            <h3>{property.name}</h3>
            <p><strong>Price:</strong> ${property.price}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {property.bathRooms}</p>
            <div className="amenities">
              {property.wifi && <span>WiFi</span>}
              {property.ac && <span>AC</span>}
              {property.washer && <span>Washer</span>}
            </div>
          </div>
        ))}
      </div>

      <SpotifyPlayer />
    </div>
  );
};

export default PropertyList;
