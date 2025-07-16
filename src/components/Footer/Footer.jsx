import React from 'react';
import './Footer.css'; 
import VisaLogo from '../Assets/VisaLogo.png'; // Assuming 'assets' folder in src
import MastercardLogo from '../Assets/MasterCardLogo.png';
import UnionpayLogo from '../Assets/UnionPayLogo.png'; // Or whatever this blue/red logo is

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        {/* Section 1: CAN WE HELP YOU? */}
        <div className="footer-section help-you">
          <h3 className="footer-heading">CAN WE HELP YOU?</h3>
          <ul className="footer-links">
            <li>
              <a href="mailto:fashionstore@gmail.com" className="footer-email">Send Email</a>
              <p className="email-address">fashionstore@gmail.com</p>
            </li>
            <li><a href="/store-locator">Store Locator</a></li>
          </ul>

          <div className="payment-methods">
            <h3 className="payment-heading">PAYMENT METHOD</h3>
            <div className="payment-logos">
              <img src={VisaLogo} alt="Visa" className="visalogo" />
              <img src={MastercardLogo} alt="Mastercard" className="mastercardlogo" />
              <img src={UnionpayLogo} alt="UnionPay" className="unionpaylogo" /> {/* Adjust alt text */}
            </div>
          </div>
        </div>

        {/* Section 2: ABOUT */}
        <div className="footer-section">
          <h3 className="footer-heading">ABOUT</h3>
          <ul className="footer-links">
            <li><a href="/corporate-orders">Corporate Orders</a></li>
            <li><a href="/store-locator">Store Locator</a></li> {/* Duplicated, but in image */}
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="/career">Career</a></li>
            <li><a href="/size-guide">Size Guide</a></li>
          </ul>
        </div>

        {/* Section 3: HELP */}
        <div className="footer-section">
          <h3 className="footer-heading">HELP</h3>
          <ul className="footer-links">
            <li><a href="/exchange-return">Exchange & Return</a></li>
            <li><a href="/shipping-handling">Shipping & Handling</a></li>
            <li><a href="/terms-conditions">Term & Conditions</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Section 4: ACCOUNT */}
        <div className="footer-section">
          <h3 className="footer-heading">ACCOUNT</h3>
          <ul className="footer-links">
            <li><a href="/login">Login</a></li>
            <li><a href="/checkout">Checkout</a></li>
            <li><a href="/faqs">FAQs</a></li>
          </ul>
        </div>

        {/* Brand Logo - Top Right */}
        <div className="footer-brand-logo">
          <span className="brand-name">Fashion Store</span>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <p className="copyright-text">
          ©2024 Fashion Store. All Rights Reserved. Design & Developed by <a href="https://mean3.com" target="_blank" rel="noopener noreferrer">Mean3 Pvt Ltd.</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;