import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const subtotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
    const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    paymentMethod: 'COD',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const orderData = {
    customer: formData,
    items: cartItems,
    total: subtotal,
  };

  try {
    const response = await fetch(`${API_URL}/placeorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    if (result.success) {
      alert('Order placed successfully!');
      clearCart();
      setFormData({
        fullName: '',
        email: '',
        address: '',
        paymentMethod: 'COD',
      });
    } else {
      alert('Failed to place order');
    }
  } catch (error) {
    console.error('Order error:', error);
    alert('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Billing Details</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
            <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            required
            />

          <label htmlFor="payment">Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>

        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <p>{item.name} (x{item.quantity})</p>
              <p>PKR {(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
          <hr />
          <h3>Total: PKR {subtotal.toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
