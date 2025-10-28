import MenuList from '../components/menu/MenuList';
import Cart from '../components/cart/Cart';
import './Menu.css';

const Menu = () => {
  return (
    <div className="menu-page">
      <div className="page-header">
        <h1>Our Menu</h1>
        <p>Discover our delicious selection of food items</p>
      </div>
      
      <div className="menu-content">
        <div className="menu-layout">
          <div className="menu-items-section">
            <MenuList />
          </div>
          <div className="cart-section">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;