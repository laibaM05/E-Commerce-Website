import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${API_URL}/search?q=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query, API_URL]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Search Results for: <em>{query}</em></h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="product-grid">
          {results.map(product => (
            <div key={product._id} className="product-card">
              <Link style={{textDecoration: 'none'}} to={`/product/${product.id}`}><img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <div className="product-rating">
                {'⭐'.repeat(product.rating || 4)}
                {'☆'.repeat(5 - (product.rating || 4))}
              </div>
              <p>{product.description}</p>
              <p>${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
