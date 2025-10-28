import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './AuthForms.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear auth error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors({});
    
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign In</h2>
        <p className="auth-subtitle">Welcome back! Please sign in to your account.</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={validationErrors.email ? 'error' : ''}
            placeholder="Enter your email"
            disabled={loading}
          />
          {validationErrors.email && (
            <span className="field-error">{validationErrors.email}</span>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={validationErrors.password ? 'error' : ''}
            placeholder="Enter your password"
            disabled={loading}
          />
          {validationErrors.password && (
            <span className="field-error">{validationErrors.password}</span>
          )}
        </div>
        
        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        
        <div className="auth-links">
          <p>
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;