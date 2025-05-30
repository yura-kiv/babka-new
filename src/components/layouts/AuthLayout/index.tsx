import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { AppRootState } from '@/store';
import { Pages } from '@/constants';

interface AuthLayoutProps {
  requireAuth?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ requireAuth = true }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: AppRootState) => state.user);

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={Pages.Auth} state={{ from: location.pathname }} replace />;
  }

  if (isAuthenticated && location.pathname.startsWith(Pages.Auth)) {
    return <Navigate to={Pages.Home} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
