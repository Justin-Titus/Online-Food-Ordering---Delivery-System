import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <p>Your cart is empty</p>
        <p>Add some delicious items from our menu!</p>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart">
      <h3>Your Cart</h3>
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p className="item-price">${item.price.toFixed(2)} each</p>
            </div>
            <div className="item-controls">
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
                title="Remove from cart"
              >
                ×
              </button>
            </div>
            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-total">
          <strong>Total: ${cart.totalAmount.toFixed(2)}</strong>
        </div>
        <button 
          onClick={handleCheckout}
          className="checkout-btn"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;