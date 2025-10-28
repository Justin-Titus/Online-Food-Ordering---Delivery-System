import { useState, useEffect } from 'react';
import './OrderManagement.css';

const API_BASE_URL = 'http://localhost:8080/api';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderStatuses = [
    'PENDING',
    'CONFIRMED', 
    'PREPARING',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED'
  ];

  const statusColors = {
    PENDING: '#f39c12',
    CONFIRMED: '#3498db',
    PREPARING: '#9b59b6',
    OUT_FOR_DELIVERY: '#e67e22',
    DELIVERED: '#27ae60',
    CANCELLED: '#e74c3c'
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/orders/admin/all`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status?status=${newStatus}`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (response.ok) {
        await fetchOrders();
        setError(null);
        // Update selected order if it's the one being updated
        if (selectedOrder && selectedOrder.id === orderId) {
          const updatedOrder = orders.find(order => order.id === orderId);
          if (updatedOrder) {
            setSelectedOrder({ ...updatedOrder, status: newStatus });
          }
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update order status');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ');
  };

  const getStatusColor = (status) => {
    return statusColors[status] || '#95a5a6';
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="order-management">
      <div className="order-header">
        <h2>Order Management</h2>
        <div className="order-stats">
          <div className="stat">
            <span className="stat-number">{orders.length}</span>
            <span className="stat-label">Total Orders</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {orders.filter(order => order.status === 'PENDING').length}
            </span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {orders.filter(order => order.status === 'DELIVERED').length}
            </span>
            <span className="stat-label">Delivered</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="orders-container">
        <div className="orders-list">
          {orders.map(order => (
            <div 
              key={order.id} 
              className={`order-card ${selectedOrder?.id === order.id ? 'selected' : ''}`}
              onClick={() => setSelectedOrder(order)}
            >
              <div className="order-card-header">
                <span className="order-number">#{order.orderNumber}</span>
                <span 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {formatStatus(order.status)}
                </span>
              </div>
              
              <div className="order-card-details">
                <p className="order-total">${order.totalAmount.toFixed(2)}</p>
                <p className="order-date">{formatDate(order.createdAt)}</p>
                <p className="order-items">{order.items.length} items</p>
              </div>
            </div>
          ))}
        </div>

        {selectedOrder && (
          <div className="order-details">
            <div className="order-details-header">
              <h3>Order #{selectedOrder.orderNumber}</h3>
              <button 
                className="close-details"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="order-info">
              <div className="info-section">
                <h4>Order Information</h4>
                <p><strong>Status:</strong> 
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                  >
                    {formatStatus(selectedOrder.status)}
                  </span>
                </p>
                <p><strong>Total:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
                <p><strong>Created:</strong> {formatDate(selectedOrder.createdAt)}</p>
                <p><strong>Contact:</strong> {selectedOrder.contactPhone}</p>
              </div>

              <div className="info-section">
                <h4>Delivery Address</h4>
                <div className="address">
                  <p>{selectedOrder.deliveryAddress.street}</p>
                  <p>{selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} {selectedOrder.deliveryAddress.zipCode}</p>
                </div>
              </div>

              <div className="info-section">
                <h4>Order Items</h4>
                <div className="order-items-list">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span className="item-name">{item.menuItemName}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                      <span className="item-price">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="info-section">
                <h4>Update Status</h4>
                <div className="status-buttons">
                  {orderStatuses.map(status => (
                    <button
                      key={status}
                      className={`status-button ${selectedOrder.status === status ? 'current' : ''}`}
                      style={{ 
                        backgroundColor: selectedOrder.status === status ? getStatusColor(status) : '#ecf0f1',
                        color: selectedOrder.status === status ? 'white' : '#2c3e50'
                      }}
                      onClick={() => updateOrderStatus(selectedOrder.id, status)}
                      disabled={selectedOrder.status === status}
                    >
                      {formatStatus(status)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {orders.length === 0 && (
        <div className="empty-state">
          <p>No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;