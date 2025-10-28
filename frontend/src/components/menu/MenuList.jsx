import { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import './MenuList.css';

// Demo data kept at module level to avoid recreating inside the component and triggering
// React Hook exhaustive-deps warnings.
const sampleMenuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh tomatoes, mozzarella cheese, and basil',
    // realistic INR price
    price: 299,
    category: 'Pizza',
    available: true,
    imageUrl: null
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    description: 'Traditional pizza topped with pepperoni and mozzarella cheese',
    price: 349,
    category: 'Pizza',
    available: true,
    imageUrl: null
  },
  {
    id: 3,
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, onion, and our special sauce',
    price: 199,
    category: 'Burgers',
    available: true,
    imageUrl: null
  },
  {
    id: 4,
    name: 'Chicken Burger',
    description: 'Grilled chicken breast with lettuce, tomato, and mayo',
    price: 219,
    category: 'Burgers',
    available: true,
    imageUrl: null
  },
  {
    id: 5,
    name: 'Coca Cola',
    description: 'Refreshing cola drink - 330ml can',
    price: 59,
    category: 'Drinks',
    available: true,
    imageUrl: null
  },
  {
    id: 6,
    name: 'Orange Juice',
    description: 'Fresh squeezed orange juice - 250ml glass',
    price: 89,
    category: 'Drinks',
    available: false,
    imageUrl: null
  }
];

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // sampleMenuItems is defined at module scope (see top of file). We intentionally
  // reference that stable module-level constant inside the effect below. Add a
  // short eslint disable comment so the Hooks linter doesn't require it as a dep.

  useEffect(() => {
    // Simulate API call
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMenuItems(sampleMenuItems);
      } catch (err) {
        setError('Failed to load menu items:' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="menu-list">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading menu items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-list">
        <div className="error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-list">
      <div className="menu-filters">
        <h3>Categories</h3>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-grid">
        {filteredItems.length === 0 ? (
          <div className="no-items">
            <p>No items found in this category.</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default MenuList;