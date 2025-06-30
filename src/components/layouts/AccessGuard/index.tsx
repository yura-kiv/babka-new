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

  if (withAuth && withoutAuth) {
    console.error(
      'AccessGuard: Conflicting conditions - withAuth and withoutAuth cannot be used together'
    );
    return <Navigate to={Pages.Home} replace />;
  }

  if (withConfirmed && withoutConfirmed) {
    console.error(
      'AccessGuard: Conflicting conditions - withConfirmed and withoutConfirmed cannot be used together'
    );
    return <Navigate to={Pages.Home} replace />;
  }

  if (withAuth && !isToken) {
    return <Navigate to={Pages.Auth} replace state={{ from: location }} />;
  }

  if (withoutAuth && isToken) {
    return <Navigate to={Pages.Home} replace />;
  }

  if (isToken) {
    if (withConfirmed && !isConfirmed) {
      return <Navigate to={Pages.AskToConfirmEmail} replace />;
    }

    if (withoutConfirmed && isConfirmed) {
      return <Navigate to={Pages.Home} replace />;
    }
  }

  return <Outlet />;
};

export default AccessGuard;
