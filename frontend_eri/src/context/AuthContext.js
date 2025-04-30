import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (requiredRole) => {
    if (!user) return false;
    
    const roleHierarchy = {
      'super_admin': ['super_admin', 'admin', 'user'],
      'admin': ['admin', 'user'],
      'user': ['user']
    };

    return roleHierarchy[user.role]?.includes(requiredRole) || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      hasPermission,
      isLoginModalOpen,
      setIsLoginModalOpen
    }}>
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