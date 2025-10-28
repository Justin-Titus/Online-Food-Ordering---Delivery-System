import { useCart } from '../../contexts/CartContext';
import './MenuItem.css';
import { getStockImage } from '../../assets/stockImages';

const formatPrice = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value) || 0);

const MenuItem = ({ item }) => {
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <div className="menu-item">
      <div className="menu-item-image">
        <img
          src={item.imageUrl ? item.imageUrl : getStockImage(item)}
          alt={item.name}
          onError={(e) => {
            try {
              const img = e.currentTarget;
              // Prevent infinite retry loop: only attempt fallback once
              if (img.dataset.fallbackTried) return;
              img.dataset.fallbackTried = 'true';
              const fallback = getStockImage(item);
              if (img.src !== fallback) img.src = fallback;
            } catch {
              // swallow errors
            }
          }}
        />
      </div>
      
      <div className="menu-item-content">
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <div className="menu-item-footer">
          <span className="menu-item-price">{formatPrice(item.price)}</span>
          
          {!item.available ? (
            <button className="add-button disabled" disabled>
              Out of Stock
            </button>
          ) : quantity === 0 ? (
            <button className="add-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={handleDecrement}>
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button className="quantity-btn" onClick={handleIncrement}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;