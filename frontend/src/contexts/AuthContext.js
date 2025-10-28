import { createContext } from 'react';

export const AuthContext = createContext();

// Re-export AuthProvider from AuthContext.jsx
export { AuthProvider } from './AuthContext.jsx';