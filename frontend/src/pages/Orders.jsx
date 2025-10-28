import './Orders.css';

const Orders = () => {
  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Your Orders</h1>
        <p>Track and manage your food orders</p>
      </div>
      
      <div className="orders-content">
        <div className="no-orders">
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start by browsing our menu!</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;