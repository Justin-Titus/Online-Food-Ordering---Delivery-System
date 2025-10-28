import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import MenuManagement from './MenuManagement';
import OrderManagement from './OrderManagement';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('menu');

  if (!isAdmin()) {
    return (
      <div className="admin-dashboard">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.email}</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu Management
        </button>
        <button 
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Order Management
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'menu' && <MenuManagement />}
        {activeTab === 'orders' && <OrderManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;