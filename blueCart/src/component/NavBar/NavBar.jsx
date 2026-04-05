import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../../store/slices/categorySlice';
import { setSearchQuery } from '../../store/slices/searchSlice';
import './NavBar.css';
import { FaShoppingCart, FaChevronDown } from "react-icons/fa";

const Navbar = ({ onHome, onCartClick }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(state => state.category.selected);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAllProducts = () => {
    onHome();
    setInputValue('');
    setDropdownOpen(false);
  };

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category.slug));
    setDropdownOpen(false);
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(inputValue));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
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
        <input
          type="text"
          placeholder="Search products..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="nav-cart">
        <button className="cart-button" onClick={onCartClick}>
          <FaShoppingCart /> Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;