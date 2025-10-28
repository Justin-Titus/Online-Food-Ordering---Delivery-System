import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Food Ordering System</h1>
          <p>Delicious food delivered to your doorstep</p>
          <Link to="/menu" className="cta-button">
            Order Now
          </Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>Fresh Ingredients</h3>
          <p>We use only the freshest ingredients in all our dishes</p>
        </div>
        <div className="feature">
          <h3>Fast Delivery</h3>
          <p>Quick and reliable delivery to your location</p>
        </div>
        <div className="feature">
          <h3>Easy Ordering</h3>
          <p>Simple and intuitive ordering process</p>
        </div>
      </div>
    </div>
  );
};

export default Home;