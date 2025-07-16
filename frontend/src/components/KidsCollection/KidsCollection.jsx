import React, { useEffect, useState, useMemo } from 'react';
import './KidsCollection.css';
import { Link } from 'react-router-dom';

const KidsCollection = () => {
  const [kidsProducts, setKidsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('popular');
  const API_URL = process.env.REACT_APP_API_URL;

  const sortedProducts = useMemo(() => {
    const sorted = [...kidsProducts];
    if (sortOption === 'price-asc') {
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (sortOption === 'price-desc') {
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
      }
      return sorted;
  }, [kidsProducts, sortOption]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchKidsProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/allproducts`);
        const allProducts = await response.json();
        const filtered = allProducts.filter(product => product.category === 'kids');
        setKidsProducts(filtered);
      } catch (error) {
        console.error('Error fetching kids products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKidsProducts();
  }, [API_URL]);

  return (
    <div className="kids-collection-page">
      <div className="collection-header">
        <h1 className="collection-title">Kid's Collection</h1>
        <p className="products-available">
          Products Available: {loading ? 'Loading...' : kidsProducts.length}
        </p>
        <div className="sort-by-dropdown">
          <label htmlFor="sort">Sort By</label>
          <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : kidsProducts.length === 0 ? (
          <p>No kids' products found.</p>
        ) : (
          sortedProducts.map(product => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
              style={{ textDecoration: 'none' }}
            >
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <div className="product-rating">
                  {'⭐'.repeat(product.rating)}
                  {'☆'.repeat(5 - product.rating)}
                </div>
                <p className="product-description">{product.description}</p>
                <span className="product-price">${product.price.toFixed(2)}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default KidsCollection;
