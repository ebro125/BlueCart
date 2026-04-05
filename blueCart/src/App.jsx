import React, { useState, useEffect } from 'react';
import ProductList from './component/ProductList/ProductList';
import Navbar from './component/NavBar/NavBar';
import Cart from './component/Cart/Cart';
import Checkout from './component/Checkout/Checkout';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on first render
    const saved = localStorage.getItem('blueCart');
    return saved ? JSON.parse(saved) : [];
  });
  const [page, setPage] = useState('home'); // 'home' | 'cart' | 'checkout' | 'success'

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('blueCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleOrderSuccess = () => {
    setCartItems([]); // clear cart
    setPage('success');
  };
  const handleHome = () => {
  setSelectedCategory(null);
  setSearchQuery('');
};

  if (page === 'cart') {
    return (
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        onBack={() => setPage('home')}
        onCheckout={() => setPage('checkout')}
      />
    );
  }

  if (page === 'checkout') {
    return (
      <Checkout
        cartItems={cartItems}
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
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        onCartClick={() => setPage('cart')}
        onHome={handleHome}
      />
      <main>
        <ProductList
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          addToCart={addToCart}
        />
      </main>
    </>
  );
}

export default App;