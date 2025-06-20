import React from 'react';
import { useTranslation } from 'react-i18next';
import WidthWrapper from '@/components/ui/WidthWrapper';
import Button from '@/components/ui/Button';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { Pages } from '@/constants';
import s from './styles.module.scss';
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps {
}

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <WidthWrapper className={s.content}>
          <Button to={Pages.Home} variant="simple" size="large" padding={{ p: 0 }} className={s.logo}>
            GMSPLAY.PRO
          </Button>
          <LanguageSwitcher />
        </WidthWrapper>
      </header>
      <WidthWrapper maxWidth={992} className={s.content}>
        <div className={s.left}>
          <img src="imgs/auth/grandma.svg" alt="grandma" className={s.img} />
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
