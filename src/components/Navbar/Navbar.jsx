import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';
import logo from '../Assets/Logo.png';
import carticon from '../Assets/cart.png';
import noti from '../Assets/notification icon.png';
import wishlist from '../Assets/wishlist.png';
import search from '../Assets/search icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import hamburger and close icons

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [menu, setMenu] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "About Us", path: "/aboutus" },
    { label: "More", path: "/more" }
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleIconClick = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (label) => {
    setMenu(label);
    setIsMenuOpen(false); // Close menu after clicking a link
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate('/');
    alert("User logged out successfully");
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Hamburger Menu Icon (Mobile) */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </div>

      {/* Navigation Menu (Desktop & Mobile) */}
      <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        {menuItems.map(({ label, path }) => (
          <li
            key={label}
            className={menu === label ? "active" : ""}
            onClick={() => handleMenuItemClick(label)}
          >
            <Link to={path} style={{ textDecoration: 'none' }}>
              {label}
            </Link>
            {menu === label && <hr />}
          </li>
        ))}
      </ul>

      <div className="search-box">
        <img
          className="search-icon"
          src={search}
          alt="Search"
          onClick={handleIconClick}
          style={{ cursor: 'pointer' }}
        />
        <input
          type="text"
          placeholder="Search for Products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className='icons'>
        <img src={noti} alt="Notifications" className="noti" />
        <img src={wishlist} alt="Wishlist" className="wishlist" />
        <Link to='/cart'><img src={carticon} alt="Cart" className="cart" /></Link>
        <div className='nav-cart-count'><span className="cart-count">{cartCount}</span></div>
        <div className='nav-noti-count'>0</div>
      </div>

      {/* Login Button for Desktop */}
      <div className='nav-login-signup desktop-only'>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}
      </div>
      
      {/* Login Button for Mobile inside Hamburger Menu */}
      {isMenuOpen && (
        <div className='nav-login-signup mobile-only'>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to='/login'><button>Login</button></Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;