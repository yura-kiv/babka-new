import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { AppRootState } from '@/store';

interface AuthLayoutProps {
  requireAuth?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ requireAuth = true }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: AppRootState) => state.user);

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  if (isAuthenticated && location.pathname.startsWith('/auth')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
