import React, { useState } from 'react';
import { FaArrowLeft, FaCreditCard, FaLock } from 'react-icons/fa';
import './Checkout.css';
import { useSelector } from 'react-redux';

const Checkout = ({onBack, onOrderSuccess }) => {
     const cartItems = useSelector(state => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isPlacing, setIsPlacing] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Required';
    if (!form.lastName.trim()) newErrors.lastName = 'Required';
    if (!form.email.includes('@')) newErrors.email = 'Invalid email';
    if (!form.address.trim()) newErrors.address = 'Required';
    if (!form.city.trim()) newErrors.city = 'Required';
    if (!form.zip.trim()) newErrors.zip = 'Required';
    if (form.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Must be 16 digits';
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) newErrors.expiry = 'Format: MM/YY';
    if (form.cvv.length !== 3) newErrors.cvv = 'Must be 3 digits';
    return newErrors;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Auto-format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    }
    // Auto-format expiry
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
    }
    // CVV digits only
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsPlacing(true);
    // Simulate order placement delay
    setTimeout(() => {
      onOrderSuccess();
    }, 1500);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft /> Back to Cart
        </button>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-body">
        <div className="checkout-forms">

          {/* Shipping */}
          <div className="form-section">
            <h2>Shipping Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Address</label>
              <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main St" />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input name="city" value={form.city} onChange={handleChange} placeholder="New York" />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input name="zip" value={form.zip} onChange={handleChange} placeholder="10001" />
                {errors.zip && <span className="error">{errors.zip}</span>}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="form-section">
            <h2><FaCreditCard /> Payment Details</h2>
            <div className="form-group">
              <label>Card Number</label>
              <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" />
              {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" />
                {errors.expiry && <span className="error">{errors.expiry}</span>}
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input name="cvv" value={form.cvv} onChange={handleChange} placeholder="123" type="password" />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
              </div>
            </div>
            <p className="secure-note"><FaLock /> Your payment info is secure</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.map(item => (
              <div className="summary-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p className="summary-qty">x{item.quantity}</p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="place-order-btn"
            onClick={handleSubmit}
            disabled={isPlacing}
          >
            {isPlacing ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;