import React from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import empty_cart from '../Assets/emptycart.png';

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const subtotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  if (subtotal === 0) {
    return (
      <div className="empty-cart-page">
        <h1 className="cart-title">Your Shopping Bag</h1>
        <p className="empty-message">Your cart is empty.</p>
        <img src= {empty_cart} alt = 'Emptycart' className='emptycart'/>
        <Link style={{textDecoration: 'none'}} to="/" className="continue-shopping">Let's Shop!</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Shopping Bag</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Size: {item.size || 'M'}</p>
                <p>Price: PKR {item.price.toLocaleString()}</p>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
              <div className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>PKR {subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>PKR {subtotal.toLocaleString()}</span>
          </div>
          <Link style={{ textDecoration: 'none' }} to="/checkout">
            <button className="checkout-button">Proceed to Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
