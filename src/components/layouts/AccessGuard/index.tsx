import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Pages } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { getUserIsConfirmed, getUserToken } from '@/store/helpers/selectors';

interface AccessGuardProps {
  withAuth?: boolean;
  withoutAuth?: boolean;
  withConfirmed?: boolean;
  withoutConfirmed?: boolean;
}

const AccessGuard: React.FC<AccessGuardProps> = ({
  withAuth = false,
  withoutAuth = false,
  withConfirmed = false,
  withoutConfirmed = false,
}) => {
  const location = useLocation();
  const isToken = useAppSelector(getUserToken);
  const isConfirmed = useAppSelector(getUserIsConfirmed);

  return <Outlet />;
};

export default AccessGuard;
