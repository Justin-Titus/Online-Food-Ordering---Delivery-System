import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../contexts/CartContext';
import './Header.css';

const formatPrice = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value) || 0);

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleCartClick = () => {
    if (cart.items.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Food Ordering System</Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/menu" className="nav-link">Menu</Link></li>
            {isAuthenticated && (
              <li><Link to="/orders" className="nav-link">Orders</Link></li>
            )}
            {isAuthenticated && user.role === 'ADMIN' && (
              <li><Link to="/admin" className="nav-link admin-link">Admin</Link></li>
            )}
                <li className="cart-indicator">
              <button 
                onClick={handleCartClick}
                className={`cart-button ${cart.items.length > 0 ? 'has-items' : ''}`}
                disabled={cart.items.length === 0}
              >
                    🛒 Cart ({cart.items.length}) - {formatPrice(cart.totalAmount)}
              </button>
            </li>
            {isAuthenticated ? (
              <>
                <li className="user-info">
                  Welcome, {user.email}! {user.role === 'ADMIN' && '(Admin)'}
                </li>
                <li>
                  <button onClick={handleLogout} className="nav-link logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="nav-link">Login</Link></li>
                <li><Link to="/register" className="nav-link">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;