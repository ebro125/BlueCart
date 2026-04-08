import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { fetchProducts, fetchProductsByCategory, searchProducts } from '../../services/api';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(state => state.category.selected);
  const searchQuery = useSelector(state => state.search.query);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (searchQuery) {
          data = await searchProducts(searchQuery);
        } else if (selectedCategory) {
          data = await fetchProductsByCategory(selectedCategory);
        } else {
          data = await fetchProducts();
        }
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1
    }));
    setSelectedProduct(null);
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product._id}
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
            <button className="cart-btn" onClick={() => handleAddToCart(selectedProduct)}>
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
