import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Pages } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { getUserIsActivated, getUserToken } from '@/store/helpers/selectors';

interface AccessGuardProps {
  withAuth?: boolean;
  withoutAuth?: boolean;
  withActivated?: boolean;
  withoutActivated?: boolean;
}

const AccessGuard: React.FC<AccessGuardProps> = ({
  withAuth = false,
  withoutAuth = false,
  withActivated = false,
  withoutActivated = false,
}) => {
  const location = useLocation();
  const isToken = useAppSelector(getUserToken);
  const isActivated = useAppSelector(getUserIsActivated);

  if (withAuth && withoutAuth) {
    console.error(
      'AccessGuard: Conflicting conditions - withAuth and withoutAuth cannot be used together'
    );
    return <Navigate to={Pages.Home} replace />;
  }

  if (withActivated && withoutActivated) {
    console.error(
      'AccessGuard: Conflicting conditions - withActivated and withoutActivated cannot be used together'
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
    if (withActivated && !isActivated) {
      return <Navigate to={Pages.AskToConfirmEmail} replace />;
    }

    if (withoutActivated && isActivated) {
      return <Navigate to={Pages.Home} replace />;
    }
  }

  return <Outlet />;
};

export default AccessGuard;
