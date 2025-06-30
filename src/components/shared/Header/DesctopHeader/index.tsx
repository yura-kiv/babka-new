import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Pages } from '@/constants';
import { Button, WidthWrapper } from '@/components/ui';
import { Balance, LanguageSwitcher } from '@/components/shared';
import UserMenu from '../UserMenu';
import s from './styles.module.scss';

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
  {
    name: 'comic',
    path: Pages.Comic,
  },
];

const DesctopHeader: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <header className={s.header}>
      <WidthWrapper className={s.wrapper}>
        <div className={s.left}>
          <Button
            to={Pages.Home}
            variant='simple'
            className={s.logo}
            padding={{ p: 0 }}
            size='large'
          >
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
              variant='underline'
              isActive={location.pathname === item.path}
              padding={{ py: '0px' }}
            >
              {t(item.name)}
            </Button>
          ))}
        </nav>
        <div className={s.right}>
          <Balance />
          <UserMenu />
        </div>
      </WidthWrapper>
    </header>
  );
};

export default DesctopHeader;
