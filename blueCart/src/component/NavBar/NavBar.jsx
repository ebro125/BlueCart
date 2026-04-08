import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';
import { FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../store/slices/searchSlice';
import { setCategory } from '../../store/slices/categorySlice';
import { fetchCategories, searchProducts } from '../../services/api';

const Navbar = ({ onCartClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const selectedCategory = useSelector(state => state.category.selected);
  const searchQuery = useSelector(state => state.search.query);

  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const dropdownRef = useRef(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Fetch categories from our own backend
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    loadCategories()
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
    dispatch(setCategory(category));
    dispatch(setSearchQuery(''));
    setLocalSearch('');
    setDropdownOpen(false);
  };

  const handleAllProducts = () => {
    dispatch(setCategory(null));
    dispatch(setSearchQuery(''));
    setLocalSearch('');
    setDropdownOpen(false);
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearch));
    dispatch(setCategory(null));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={handleAllProducts} style={{ cursor: 'pointer' }}>
        BLUECART
      </div>

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
                  key={category}
                  className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
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
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="nav-cart">
        <button className="cart-button" onClick={onCartClick}>
          <FaShoppingCart /> Cart {cartCount > 0 && `(${cartCount})`}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
