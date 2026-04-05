import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import './Cart.css';

const Cart = ({ onBack, onCheckout }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft /> Back to Shopping
        </button>
        <h1>Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <button onClick={onBack}>Continue Shopping</button>
        </div>
      ) : (
        <div className="cart-body">
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
                <p className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Total Items: {cartItems.reduce((sum, i) => sum + i.quantity, 0)}</p>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;