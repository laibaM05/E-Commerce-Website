import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useParams } from 'react-router-dom';
import './ProductDesc.css';

const ProductDesc = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/allproducts`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        const foundProduct = data.find(p => p.id === parseInt(productId));
        if (!foundProduct) {
          setError('Product not found');
          setLoading(false);
          return;
        }
        setProduct(foundProduct);

        // Find related products (same category, exclude current product)
        const related = data
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 3);
        setRelatedProducts(related);

        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId, API_URL]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  // Product attributes (same logic as your original)
  const productAttributes = {
    color: {
      kids: 'Blue/Pink',
      men: 'Brown/Black',
      women: 'Various',
    }[product.category],
    gender: product.category === 'kids' ? 'Unisex' : product.category === 'men' ? 'Men' : 'Women',
    shirtFabric: {
      kids: 'Cotton Blend',
      men: '100% Cotton',
      women: 'Viscose/Cotton',
    }[product.category],
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert("Item added to cart");
  };

  return (
    <div className="product-description-page">
      <div className="product-detail-container">
        {/* Left Section: Product Image Slider */}
        <div className="product-images-section">
          <div className="image-navigation left-arrow">{'<'}</div>
          <img src={product.image} alt={product.name} className="main-product-image" />
          <div className="image-navigation right-arrow">{'>'}</div>
          <div className="image-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        {/* Right Section: Product Information */}
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-sku">SKU# M-AP-24-405426 -P</p>
          <p className="product-stock-status">In stock</p>
          <p className="product-price">PKR {product.price.toFixed(2)}</p>

          {product.id === 5 && <div className="few-items-tag">FEW ITEMS LEFT</div>}

          <div className="size-selection">
            <h4 className="size-label">{productAttributes.gender} Size</h4>
            <div className="size-options">
              <label className="size-option">
                <input type="radio" name="size" value="S" />
                <span>S</span>
              </label>
              <label className="size-option">
                <input type="radio" name="size" value="M" defaultChecked />
                <span>M</span>
              </label>
              <label className="size-option">
                <input type="radio" name="size" value="L" />
                <span>L</span>
              </label>
              <label className="size-option">
                <input type="radio" name="size" value="XL" />
                <span>XL</span>
              </label>
            </div>
          </div>

          <div className="product-description-text">
            <h4>Description:</h4>
            <p>{product.description}</p>
            <p className="note">Note: Color of the article may vary from the uploaded picture</p>
          </div>

          <div className="product-attributes">
            <div className="attribute-row">
              <span className="attribute-label">Color:</span>
              <span className="attribute-value">{productAttributes.color}</span>
            </div>
            <div className="attribute-row">
              <span className="attribute-label">Gender:</span>
              <span className="attribute-value">{productAttributes.gender}</span>
            </div>
            <div className="attribute-row">
              <span className="attribute-label">Shirt Fabric:</span>
              <span className="attribute-value">{productAttributes.shirtFabric}</span>
            </div>
          </div>

          <button className="add-to-cart-button" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products-section">
        <h2>Related Products</h2>
        <div className="related-product-grid">
          {relatedProducts.map(relatedProduct => (
            <Link
              style={{ textDecoration: 'none' }}
              to={`/product/${relatedProduct.id}`}
              key={relatedProduct.id}
              className="related-product-card"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="related-product-image"
              />
              <div className="related-product-info">
                <p className="related-product-name">{relatedProduct.name}</p>
                <div className="related-product-rating">
                  {'⭐'.repeat(relatedProduct.rating)}
                  {'☆'.repeat(5 - relatedProduct.rating)}
                </div>
                <p className="related-product-name">{relatedProduct.description}</p>
                <span className="related-product-price">${relatedProduct.price.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDesc;
