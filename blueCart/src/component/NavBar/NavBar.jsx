import React from 'react';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">BLUECART</div>
      <div className="nav-links">
        <span>Home</span>
        <span>Categories</span>
      </div>
      <div className="nav-search">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>
      <div className="nav-cart">
        <span>Cart (0)</span>
      </div>
    </nav>
  );
};

export default Navbar;