import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForms.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
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
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
    
    const result = await register(formData);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us to start ordering delicious food!</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={validationErrors.firstName ? 'error' : ''}
              placeholder="Enter your first name"
              disabled={loading}
            />
            {validationErrors.firstName && (
              <span className="field-error">{validationErrors.firstName}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={validationErrors.lastName ? 'error' : ''}
              placeholder="Enter your last name"
              disabled={loading}
            />
            {validationErrors.lastName && (
              <span className="field-error">{validationErrors.lastName}</span>
            )}
          </div>
        </div>
        
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
            placeholder="Create a password (min. 6 characters)"
            disabled={loading}
          />
          {validationErrors.password && (
            <span className="field-error">{validationErrors.password}</span>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={validationErrors.confirmPassword ? 'error' : ''}
            placeholder="Confirm your password"
            disabled={loading}
          />
          {validationErrors.confirmPassword && (
            <span className="field-error">{validationErrors.confirmPassword}</span>
          )}
        </div>
        
        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;