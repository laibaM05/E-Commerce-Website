import React, { useState, useEffect, useMemo } from 'react';
import './ShopAll.css';
import { Link } from 'react-router-dom';

const ShopCollection = () => {
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('popular');
  const API_URL = process.env.REACT_APP_API_URL;

  const sortedProducts = useMemo(() => {
    const sorted = [...shuffledProducts];
    if (sortOption === 'price-asc') {
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (sortOption === 'price-desc') {
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
      }
      return sorted;
  }, [shuffledProducts, sortOption]);

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/allproducts`);
        const allProducts = await response.json();
        setShuffledProducts(shuffleArray([...allProducts]));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [API_URL]);

  return (
    <div className="shop-collection-page">
      <div className="collection-header">
        <h1 className="collection-title">Our Collection</h1>
        <p className="products-available">
          Products Available: {loading ? 'Loading...' : shuffledProducts.length}
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
        ) : shuffledProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          sortedProducts.map(product => (
            <Link
              style={{ textDecoration: 'none' }}
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
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

export default ShopCollection;
