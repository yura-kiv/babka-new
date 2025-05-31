import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { AppRootState } from '@/store';
import { Pages } from '@/constants';
import WidthWrapper from '@/components/ui/WidthWrapper';
import s from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

interface AuthLayoutProps {
  requireAuth?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ requireAuth = true }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: AppRootState) => state.user);

  const currentYear = new Date().getFullYear();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={Pages.Auth} state={{ from: location.pathname }} replace />;
  }

  if (isAuthenticated && location.pathname.startsWith(Pages.Auth)) {
    return <Navigate to={Pages.Home} replace />;
  }

  return (
    <WidthWrapper className={s.wrapper}>
      <div className={s.header}>
        <Button to={Pages.Home} variant="simple" size="large" padding={{ p: 0 }} className={s.logo}>
          GMSPLAY.PRO
        </Button>
        <LanguageSwitcher />
      </div>
      <WidthWrapper maxWidth={992} noPadding className={s.content}>
        <div className={s.left}>
          <img src="imgs/auth/grandma.svg" alt="grandma" className={s.img} />
        </div>
        <div className={s.right}>
          <Outlet />
        </div>
      </WidthWrapper>
      <div className={s.footer}>
          <div className={s.rights}>
            <span>Ⓒ</span>
            <span>{currentYear}</span>
            <span>•</span>
            <span>GmsPlay.pro</span>
            <span>•</span>
            <span>{t('allRightReserved')}</span>
          </div>
      </div>
    </WidthWrapper>
  );
};

export default AuthLayout;
