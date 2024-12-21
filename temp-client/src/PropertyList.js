import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as ReactRouterDOM from 'react-router-dom';

const PropertyList = () => {
  const location = ReactRouterDOM.useLocation();
  const navigate = ReactRouterDOM.useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [wifi, setWifi] = useState(searchParams.get('wifi') === 'true');
  const [ac, setAc] = useState(searchParams.get('ac') === 'true');
  const [washer, setWasher] = useState(searchParams.get('washer') === 'true');

  // Create query string
  const createQueryString = () => {
    const params = new URLSearchParams();
    params.append('page', page);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (wifi) params.append('wifi', wifi);
    if (ac) params.append('ac', ac);
    if (washer) params.append('washer', washer);
    return params.toString();
  };

  // Fetch properties
  const fetchProperties = async () => {
    const queryString = createQueryString();
    const response = await fetch(`/api/properties?${queryString}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['properties', page, minPrice, maxPrice, wifi, ac, washer],
    queryFn: fetchProperties,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setWifi(false);
    setAc(false);
    setWasher(false);
    setPage(1);
  };

  useEffect(() => {
    const newUrl = createQueryString() ? `?${createQueryString()}` : '';
    navigate(newUrl, { replace: true });
  }, [createQueryString, navigate]);

  return (
    <div className="container">
      {/* Filters */}
      <div className="filters">
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(1);
            }}
            min="0"
          />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
            min="0"
          />
        </div>
        
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={wifi}
              onChange={(e) => {
                setWifi(e.target.checked);
                setPage(1);
              }}
            />
            <i className="fas fa-wifi"></i> WiFi
          </label>
          <label>
            <input
              type="checkbox"
              checked={ac}
              onChange={(e) => {
                setAc(e.target.checked);
                setPage(1);
              }}
            />
            <i className="fas fa-snowflake"></i> AC
          </label>
          <label>
            <input
              type="checkbox"
              checked={washer}
              onChange={(e) => {
                setWasher(e.target.checked);
                setPage(1);
              }}
            />
            <i className="fas fa-tshirt"></i> Washer
          </label>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error?.message || 'Something went wrong. Please try again.'}</p>
          <button onClick={() => refetch()} className="retry-button">
            <i className="fas fa-redo"></i> Retry
          </button>
        </div>
      )}

      {/* No results */}
      {!isLoading && !isError && data?.properties?.length === 0 && (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <p>No properties found with these filters.</p>
          <button onClick={clearFilters} className="clear-filters-button">
            <i className="fas fa-times"></i> Clear Filters
          </button>
        </div>
      )}

      {/* Properties grid */}
      {!isLoading && !isError && data?.properties?.length > 0 && (
        <div className="properties-grid">
          {data.properties.map(property => (
            <div key={property.id} className="property-card">
              <img 
                src={`/api/${property.img}`}
                alt={property.name || 'Property'} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400?text=No+Image+Available';
                }}
                className="property-image"
              />
              <div className="property-info">
                <h3>{property.name || 'Unnamed Property'}</h3>
                <p className="price">${typeof property.price === 'number' ? property.price.toLocaleString() : property.price}</p>
                <p className="bedrooms">{property.bedrooms || 0} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</p>
                <div className="amenities">
                  {property.wifi && <span className="amenity"><i className="fas fa-wifi"></i> WiFi</span>}
                  {property.ac && <span className="amenity"><i className="fas fa-snowflake"></i> AC</span>}
                  {property.washer && <span className="amenity"><i className="fas fa-tshirt"></i> Washer</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.pagination?.totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          {[...Array(data.pagination.totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button 
            onClick={() => setPage(prev => Math.min(data.pagination.totalPages, prev + 1))}
            disabled={page === data.pagination.totalPages}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
