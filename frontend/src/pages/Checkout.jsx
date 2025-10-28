import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import './Checkout.css';

const formatPrice = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value) || 0);

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    postalCode: '',
    specialInstructions: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    return required.every(field => formData[field].trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    if (cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call to create order
      const orderData = {
        items: cart.items,
        totalAmount: cart.totalAmount,
        deliveryAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        contactInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        specialInstructions: formData.specialInstructions
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock order number
      const orderNumber = `ORD-${Date.now()}`;
      
      // Clear cart after successful order
      clearCart();
      
      // Navigate to confirmation page with order details
      navigate('/order-confirmation', { 
        state: { 
          orderNumber,
          orderData,
          estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000) // 45 minutes from now
        } 
      });
      
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="checkout-page">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please log in to place an order.</p>
          <button onClick={() => navigate('/login')} className="btn btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some items to your cart before checking out.</p>
          <button onClick={() => navigate('/menu')} className="btn btn-primary">
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form-section">
            <h2>Delivery Information</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street, Apt 4B"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialInstructions">Special Instructions</label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  placeholder="Any special delivery instructions..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={() => navigate('/menu')} 
                  className="btn btn-secondary"
                >
                  Back to Menu
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>

          <div className="order-summary-section">
            <h2>Order Summary</h2>
            <div className="order-summary">
              <div className="order-items">
                {cart.items.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                      <div className="item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cart.totalAmount)}</span>
                </div>
                <div className="total-row">
                  <span>Delivery Fee:</span>
                  <span>{formatPrice(3.99)}</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>{formatPrice(cart.totalAmount * 0.1)}</span>
                </div>
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>{formatPrice(cart.totalAmount + 3.99 + cart.totalAmount * 0.1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;