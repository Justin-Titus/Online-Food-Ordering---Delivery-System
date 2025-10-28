import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

const formatPrice = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value) || 0);

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <p>Your cart is empty</p>
        <p>Add some delicious items from our menu!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h3>Your Cart</h3>
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p className="item-price">{formatPrice(item.price)} each</p>
            </div>
            <div className="item-controls">
              <div className="quantity-controls">
                <button 
                  onClick={() => {
                    if (item.quantity > 1) {
                      updateQuantity(item.id, item.quantity - 1);
                    } else {
                      // if quantity is 1, treat minus as remove
                      removeFromCart(item.id);
                    }
                  }}
                  className="quantity-btn"
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
            </div>
            <div className="item-total">{formatPrice(item.price * item.quantity)}</div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-total">
          <strong>Total: {formatPrice(cart.totalAmount)}</strong>
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