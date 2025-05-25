import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Pages } from '@/constants';
import Balance from '@/components/Balance';
import CustomLink from '@/components/CustomLink';
import { FaDoorOpen } from 'react-icons/fa';
import s from './styles.module.scss'

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
      <div className={s.left}>
        <CustomLink to={Pages.Home} variant="default" className={s.logo}>
          GMSPLAY.PRO
        </CustomLink>
        <LanguageSwitcher />
      </div>
      <nav className={s.nav}>
        {navigation.map((item) => (
          <CustomLink
            key={item.path}
            to={item.path}
            variant="primary"
            isActive={location.pathname === item.path}
          >
            {t(item.name)}
          </CustomLink>
        ))}
      </nav>
      <div className={s.right}>
        <Balance />
        <CustomLink to={Pages.Auth} variant="default" icon={<FaDoorOpen />}>
          {t('login')}
        </CustomLink>
      </div>
    </header>
  );
};

export default DesctopHeader;
