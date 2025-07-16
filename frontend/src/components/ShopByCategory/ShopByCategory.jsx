import React, { useEffect } from 'react';
import './ShopByCategory.css';
import { Link } from 'react-router-dom';
import men from '../Assets/Men.png';
import women from '../Assets/Women.png';
import kids from '../Assets/Kids.png';
import all from '../Assets/All.png';


const ShopByCategory = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shop-category">
      <h2>Shop By Category</h2>
      <div className="category-cards">
        <Link style={{textDecoration: 'none'}} to= "/men" className="category-card">
          <img src={men} alt="Men's Collection" />
          <p>Men's Collection</p>
        </Link>
        <Link style={{textDecoration: 'none'}} to= "/women" className="category-card">
          <img src={women} alt="Women's Collection" />
          <p>Women's Collection</p>
        </Link>
        <Link style={{textDecoration: 'none'}} to= "/kids" className="category-card">
          <img src={kids} alt="Kids Collection" />
          <p>Kids Collection</p>
        </Link>
        <Link style={{textDecoration: 'none'}} to= "/shopall" className="category-card">
          <img src={all} alt="Shop All" />
          <p>Shop All</p>
        </Link>
      </div>
    </div>
  );
};

export default ShopByCategory;
