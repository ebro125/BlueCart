import React, { useState } from 'react';
import ProductList from './component/ProductList/ProductList';
import Navbar from './component/NavBar/NavBar';
import Cart from './component/Cart/Cart';
import Checkout from './component/Checkout/Checkout';
import './App.css';

function App() {
  const [page, setPage] = useState('home'); // 'home' | 'cart' | 'checkout' | 'success'

  const handleOrderSuccess = () => {
    setPage('success');
  };

  if (page === 'success') {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h1>Order Placed!</h1>
          <p>Thank you for your purchase. Your order has been saved.</p>
          <button onClick={() => setPage('home')}>Continue Shopping</button>
        </div>
      </div>
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

  if (page === 'cart') {
    return (
      <Cart
        onBack={() => setPage('home')}
        onCheckout={() => setPage('checkout')}
      />
    );
  }

  return (
    <>
      <Navbar onCartClick={() => setPage('cart')} />
      <main>
        <ProductList />
      </main>
    </>
  );
}

export default App;
