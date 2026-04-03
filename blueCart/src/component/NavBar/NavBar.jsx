import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';
import { FaShoppingCart, FaChevronDown } from "react-icons/fa";

const Navbar = ({ selectedCategory, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    onCategorySelect(category.slug);
    setDropdownOpen(false);
  };

  const handleAllProducts = () => {
    onCategorySelect(null);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">BLUECART</div>

      <div className="nav-links">
        <span onClick={handleAllProducts}>Home</span>

        <div className="category-dropdown" ref={dropdownRef}>
          <span 
            className="category-toggle" 
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            {selectedCategory ? selectedCategory : 'Categories'}
            <FaChevronDown className={`chevron ${dropdownOpen ? 'open' : ''}`} />
          </span>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item all-products" onClick={handleAllProducts}>
                All Products
              </div>
              {categories.map((category) => (
                <div
                  key={category.slug}
                  className={`dropdown-item ${selectedCategory === category.slug ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="nav-search">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>

      <div className="nav-cart">
        <button className="cart-button"><FaShoppingCart /> Cart</button>
      </div>
    </nav>
  );
};

export default Navbar;