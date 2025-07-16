import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExclusiveBlack.css';

const ExclusiveBlack = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/allproducts`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(product =>
          product.name && product.name.toLowerCase().includes('black')
        );
        // Limit the filtered products to a maximum of 3
        const limitedProducts = filtered.slice(0, 3); // This will take the first 3 items

        setProducts(limitedProducts); // Set the limited array to state
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (products.length === 0) {
    return <p>No black products found.</p>;
  }

  return (
    <div className="exclusive-black-wrapper">
      <div className="back"></div>
      <div className="exclusive-black">
        <h2>Exclusive Black Collection</h2>
        <div className="product-grid">
          {products.map(product => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
              style={{ textDecoration: 'none' }}
            >
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h4>{product.name}</h4>
                <div className="product-rating">
                  {'⭐'.repeat(product.rating)}
                  {'☆'.repeat(5 - product.rating)}
                </div>
                <p className="product-description">{product.description}</p>
                <span className="product-price">${product.price.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveBlack;