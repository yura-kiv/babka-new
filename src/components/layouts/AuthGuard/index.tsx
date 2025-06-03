import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Pages } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { isUserAuthenticated } from '@/store/helpers/selectors';

interface AuthGuardProps {
  requireAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ requireAuth = true }) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(isUserAuthenticated);

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={Pages.Auth} state={{ from: location.pathname }} replace />;
  }

  if (isAuthenticated && location.pathname.startsWith(Pages.Auth)) {
    return <Navigate to={Pages.Home} replace />;
  }

  return (
    <Outlet />
  );
};

export default AuthGuard;
