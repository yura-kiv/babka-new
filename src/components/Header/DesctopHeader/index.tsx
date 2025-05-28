import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Pages } from '@/constants';
import Balance from '@/components/Balance';
import { FaDoorOpen } from 'react-icons/fa';
import s from './styles.module.scss'
import WidthWrapper from '@/components/WidthWrapper';
import Button from '@/components/Button';

const navigation = [
  {
    name: 'game',
    path: Pages.Game,
  },
  {
    name: 'leaders',
    path: Pages.Leaders,
  },
  {
    name: 'rules',
    path: Pages.Rules,
  },
]

const DesctopHeader: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <header className={s.header}>
      <WidthWrapper className={s.wrapper}>
        <div className={s.left}>
          <Button to={Pages.Home} variant="simple" className={s.logo}>
            GMSPLAY.PRO
          </Button>
          <LanguageSwitcher />
        </div>
        <nav className={s.nav}>
          {navigation.map((item) => (
            <Button
              size='large'
              key={item.path}
              to={item.path}
              variant="underline"
              isActive={location.pathname === item.path}
            >
              {t(item.name)}
            </Button>
          ))}
        </nav>
        <div className={s.right}>
          <Balance />
          <Button size='large' to={Pages.Auth} variant="simple" icon={<FaDoorOpen />}>
            {t('login')}
          </Button>
        </div>
      </WidthWrapper>
    </header>
  );
};

export default DesctopHeader;
