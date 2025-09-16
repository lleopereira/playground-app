import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user was previously logged in
    const token = localStorage.getItem('auth_token');
    const isValidToken = token === 'true'; // Simple validation for now
    
    setIsAuthenticated(isValidToken);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Update localStorage when auth state changes
    if (isAuthenticated) {
      localStorage.setItem('auth_token', 'true');
    } else {
      localStorage.removeItem('auth_token');
    }
  }, [isAuthenticated]);

  const login = (username, password) => {
    // Here you would typically make an API call to validate credentials
    // For now, we'll just set authenticated to true
    if (username && password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
