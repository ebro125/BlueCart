import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import ProductCard from '../ProductCard/ProductCard';
import { FaShoppingCart } from "react-icons/fa";
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(state => state.category.selected);
  const searchQuery = useSelector(state => state.search.query);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let url = 'https://dummyjson.com/products';
    if (searchQuery) {
      url = `https://dummyjson.com/products/search?q=${searchQuery}`;
    } else if (selectedCategory) {
      url = `https://dummyjson.com/products/category/${selectedCategory}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [selectedCategory, searchQuery]);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => setSelectedProduct(product)}
        />
      ))}

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>X</button>
            <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <p>Price: ${selectedProduct.price}</p>
            <p>Brand: {selectedProduct.brand}</p>
            <p>Category: {selectedProduct.category}</p>
            <button className="cart-btn" onClick={() => {
              dispatch(addToCart(selectedProduct));
              setSelectedProduct(null);
            }}>
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;