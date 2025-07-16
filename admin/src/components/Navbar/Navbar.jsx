import React from 'react';
import './Navbar.css';
import brandlogo from '../../assets/Logo.png';
import admin from '../../assets/admin1.png';

const Navbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="brand-logo">
        <img src={brandlogo} alt="Brand Logo" />
        <span>Admin Panel</span>
      </div>
      <div className="admin-profile">
        <img src={admin} alt="Admin" />
      </div>
    </nav>
  );
};

export default Navbar;
