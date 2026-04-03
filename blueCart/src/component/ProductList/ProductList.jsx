import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { FaShoppingCart } from "react-icons/fa";
import './ProductList.css';

const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const url = selectedCategory
      ? `https://dummyjson.com/products/category/${selectedCategory}`
      : 'https://dummyjson.com/products';

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [selectedCategory]);  // re-fetches whenever category changes

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
            <button className="cart-btn">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;