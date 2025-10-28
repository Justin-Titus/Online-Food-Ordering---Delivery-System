import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state;

  useEffect(() => {
    // Redirect to home if no order details are available
    if (!orderDetails) {
      navigate('/');
    }
  }, [orderDetails, navigate]);

  if (!orderDetails) {
    return null;
  }

  const { orderNumber, orderData, estimatedDelivery } = orderDetails;
  const totalWithExtras = orderData.totalAmount + 3.99 + (orderData.totalAmount * 0.1);

  const formatDeliveryTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your order. We're preparing your delicious meal!</p>
        </div>

        <div className="order-details-card">
          <div className="order-header">
            <h2>Order Details</h2>
            <div className="order-number">
              Order #{orderNumber}
            </div>
          </div>

          <div className="delivery-info">
            <h3>Delivery Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Estimated Delivery:</strong>
                <span>{formatDeliveryTime(estimatedDelivery)}</span>
              </div>
              <div className="info-item">
                <strong>Delivery Address:</strong>
                <span>
                  {orderData.deliveryAddress.address}<br />
                  {orderData.deliveryAddress.city}, {orderData.deliveryAddress.postalCode}
                </span>
              </div>
              <div className="info-item">
                <strong>Contact:</strong>
                <span>
                  {orderData.contactInfo.firstName} {orderData.contactInfo.lastName}<br />
                  {orderData.contactInfo.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="order-items-section">
            <h3>Order Items</h3>
            <div className="items-list">
              {orderData.items.map(item => (
                <div key={item.id} className="confirmation-item">
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${orderData.totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>$3.99</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${(orderData.totalAmount * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total Paid:</span>
              <span>${totalWithExtras.toFixed(2)}</span>
            </div>
          </div>

          {orderData.specialInstructions && (
            <div className="special-instructions">
              <h3>Special Instructions</h3>
              <p>{orderData.specialInstructions}</p>
            </div>
          )}
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Order Confirmation</h4>
                <p>You'll receive an email confirmation shortly</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Preparation</h4>
                <p>Our kitchen team will start preparing your order</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Delivery</h4>
                <p>Your order will be delivered by {formatDeliveryTime(estimatedDelivery)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            onClick={() => navigate('/orders')} 
            className="btn btn-primary"
          >
            Track Your Order
          </button>
          <button 
            onClick={() => navigate('/menu')} 
            className="btn btn-secondary"
          >
            Order More Food
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-outline"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;