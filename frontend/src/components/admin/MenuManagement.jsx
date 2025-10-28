import { useState, useEffect } from 'react';
import './MenuManagement.css';
import { getStockImage } from '../../assets/stockImages';

const formatPrice = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value) || 0);

const API_BASE_URL = 'http://localhost:8080/api';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    available: true,
    imageUrl: ''
  });

  const categories = ['Pizza', 'Burgers', 'Drinks', 'Appetizers', 'Desserts'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/menu/items`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      } else {
        throw new Error('Failed to fetch menu items');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingItem 
        ? `${API_BASE_URL}/menu/items/${editingItem.id}`
        : `${API_BASE_URL}/menu/items`;
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl || null
        }),
      });

      if (response.ok) {
        await fetchMenuItems();
        resetForm();
        setError(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save menu item');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      available: item.available,
      imageUrl: item.imageUrl || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/menu/items/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        await fetchMenuItems();
        setError(null);
      } else {
        throw new Error('Failed to delete menu item');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAvailability = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/items/${id}/availability`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (response.ok) {
        await fetchMenuItems();
        setError(null);
      } else {
        throw new Error('Failed to update availability');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      available: true,
      imageUrl: ''
    });
    setEditingItem(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="loading">Loading menu items...</div>;
  }

  return (
    <div className="menu-management">
      <div className="menu-header">
        <h2>Menu Management</h2>
        <button 
          className="add-button"
          onClick={() => setShowAddForm(true)}
        >
          Add New Item
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
              <button className="close-button" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="menu-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (₹):</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">Image URL (optional):</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                  />
                  Available
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="cancel-button">
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="menu-items-grid">
        {menuItems.map(item => (
          <div key={item.id} className={`menu-item-card ${!item.available ? 'unavailable' : ''}`}>
              <div className="item-image">
              <img
                src={item.imageUrl ? item.imageUrl : getStockImage(item)}
                alt={item.name}
                onError={(e) => {
                  try {
                    const img = e.currentTarget;
                    if (img.dataset.fallbackTried) return;
                    img.dataset.fallbackTried = 'true';
                    const fallback = getStockImage(item);
                    if (img.src !== fallback) img.src = fallback;
                  } catch {
                    // ignore
                  }
                }}
              />
            </div>
              <div className="item-header">
              <h3>{item.name}</h3>
              <span className="price">{formatPrice(item.price)}</span>
            </div>
            
            <p className="description">{item.description}</p>
            
            <div className="item-details">
              <span className="category">{item.category}</span>
              <span className={`status ${item.available ? 'available' : 'unavailable'}`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            
            <div className="item-actions">
              <button 
                onClick={() => handleEdit(item)}
                className="edit-button"
              >
                Edit
              </button>
              <button 
                onClick={() => toggleAvailability(item.id)}
                className="toggle-button"
              >
                {item.available ? 'Disable' : 'Enable'}
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {menuItems.length === 0 && (
        <div className="empty-state">
          <p>No menu items found. Add your first item to get started!</p>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;