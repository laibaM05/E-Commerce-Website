import React, { useState } from 'react';
import './Sidebar.css';
import { FaBars, FaTimes, FaPlusCircle, FaListAlt } from 'react-icons/fa';
import {Link} from  'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">Admin Menu</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to={'/admin/addproduct'} style={{textDecoration: 'none'}}>
            <FaPlusCircle className="sidebar-icon" />
            <span>Add Product</span>
            </Link>
          </li>
          <li>
            <Link to={'/admin/listproduct'} style={{textDecoration: 'none'}}>
            <FaListAlt className="sidebar-icon" />
            <span>List Products</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
