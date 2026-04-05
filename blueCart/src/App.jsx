import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from './store/slices/categorySlice';
import { setSearchQuery } from './store/slices/searchSlice';
import { clearCart } from './store/slices/cartSlice';
import { useState } from 'react';
import ProductList from './component/ProductList/ProductList';
import Navbar from './component/NavBar/NavBar';
import Cart from './component/Cart/Cart';
import Checkout from './component/Checkout/Checkout';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const selectedCategory = useSelector(state => state.category.selected);
  const searchQuery = useSelector(state => state.search.query);
  const [page, setPage] = useState('home');

  const handleHome = () => {
    dispatch(setCategory(null));
    dispatch(setSearchQuery(''));
  };

  const handleOrderSuccess = () => {
    dispatch(clearCart());
    setPage('success');
  };

  if (page === 'cart') {
    return (
      <Cart
        onBack={() => setPage('home')}
        onCheckout={() => setPage('checkout')}
      />
    );
  }

  if (page === 'checkout') {
    return (
      <Checkout
        onBack={() => setPage('cart')}
        onOrderSuccess={handleOrderSuccess}
      />
    );
  }

  if (page === 'success') {
    return (
      <div className="success-page">
        <div className="success-box">
          <div className="success-icon">✓</div>
          <h1>Order Placed!</h1>
          <p>Thank you for shopping with BlueCart. Your order is on its way!</p>
          <button onClick={() => setPage('home')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar
        onHome={handleHome}
        onCategorySelect={(cat) => dispatch(setCategory(cat))}
        onSearchChange={(q) => dispatch(setSearchQuery(q))}
        onCartClick={() => setPage('cart')}
      />
      <main>
        <ProductList />
      </main>
    </>
  );
}

export default App;