import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext.js';

const API_BASE_URL = 'http://localhost:8080/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          id: data.id,
          email: data.email,
          role: data.role
        });
      }
    } catch (err) {
      console.log('No active session');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({
          id: data.id,
          email: data.email,
          role: data.role
        });
        return { success: true };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const { email, password, confirmPassword, role = 'CUSTOMER' } = userData;
      
      // Basic validation
      if (!email || !password || !confirmPassword) {
        throw new Error('All fields are required');
      }
      
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({
          id: data.id,
          email: data.email,
          role: data.role
        });
        return { success: true };
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.log('Logout error:', err);
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const isAdmin = () => {
    return user && user.role === 'ADMIN';
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};