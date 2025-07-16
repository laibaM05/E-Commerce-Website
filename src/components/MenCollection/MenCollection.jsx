import React, { useEffect, useState, useMemo } from 'react';
import './MenCollection.css';
import { Link } from 'react-router-dom';

const MenCollection = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('popular');
  const API_URL = process.env.REACT_APP_API_URL;

  const sortedProducts = useMemo(() => {
    const sorted = [...menProducts];
    if (sortOption === 'price-asc') {
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (sortOption === 'price-desc') {
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
      }
      return sorted;
  }, [menProducts, sortOption]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/allproducts`);
        const data = await response.json();

        // Filter for men's products
        const menFiltered = data.filter(
          (product) => product.category?.toLowerCase() === "men"
        );

        setMenProducts(menFiltered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  return (
    <div className="men-collection-page">
      <div className="collection-header">
        <h1 className="collection-title">Men's Collection</h1>
        <p className="products-available">Products Available: {menProducts.length}</p>
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
        ) : menProducts.length === 0 ? (
          <p>No men's products found.</p>
        ) : (
          sortedProducts.map((product) => (
            <Link
              style={{ textDecoration: 'none' }}
              to={`/product/${product.id}`} // Use _id from MongoDB
              key={product._id}
              className="product-card"
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3> {/* Added product name */}
              <div className="product-rating">
                {'⭐'.repeat(product.rating || 4)}
                {'☆'.repeat(5 - (product.rating || 4))}
              </div>
              <p className="product-description">{product.description}</p>
              <span className="product-price">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MenCollection;