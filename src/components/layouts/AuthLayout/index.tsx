import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pages } from '@/constants';
import { Button, WidthWrapper } from '@/components/ui';
import { LanguageSwitcher } from '@/components/shared';
import s from './styles.module.scss';

interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <WidthWrapper className={s.content}>
          <Button
            to={Pages.Home}
            variant='simple'
            size='large'
            padding={{ p: 0 }}
            className={s.logo}
          >
            GMSPLAY.PRO
          </Button>
          <LanguageSwitcher dropdownProps={{ placement: 'bottom-right' }} />
        </WidthWrapper>
      </header>
      <WidthWrapper maxWidth={992} className={s.content}>
        <div className={s.left}>
          <img src='imgs/auth/grandma.svg' alt='grandma' className={s.img} />
        </div>
        <div className={s.right}>
          <Outlet />
        </div>
      </WidthWrapper>
      <footer className={s.footer}>
        <WidthWrapper className={s.content}>
          <span>Ⓒ</span>
          <span>{currentYear}</span>
          <span>•</span>
          <span>GmsPlay.pro</span>
          <span>•</span>
          <span>{t('allRightReserved')}</span>
        </WidthWrapper>
      </footer>
    </div>
  );
};

export default AuthLayout;
