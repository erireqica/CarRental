import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && !hasPermission(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
