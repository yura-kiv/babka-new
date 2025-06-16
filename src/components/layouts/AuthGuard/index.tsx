import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Pages } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { getUserIsConfirmed, getUserToken } from '@/store/helpers/selectors';

interface AuthGuardProps {
  withAuth?: boolean;
  withoutAuth?: boolean;
  withConfirmed?: boolean;
  withoutConfirmed?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ withAuth = false, withoutAuth = false }) => {
  const location = useLocation();
  const isToken = useAppSelector(getUserToken);
  const isConfirmed = useAppSelector(getUserIsConfirmed);

  return (
    <Outlet />
  );
};

export default AuthGuard;
