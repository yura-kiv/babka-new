import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Pages } from '@/constants';
import { Button, Divider } from '@/components/ui';
import { Balance, LanguageSwitcher } from '@/components/shared';
import { useAppSelector } from '@/store/hooks';
import { getUserToken } from '@/store/helpers/selectors';
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

const MobileHeader: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isToken = useAppSelector(getUserToken);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuButton = (
    <Button
      variant='text'
      textColor='white'
      className={s.menuButton}
      onClick={toggleMenu}
      icon={<FaBars size={24} />}
    />
  );

  const logo = (
    <Button to={Pages.Home} variant='simple' size='large' className={s.logo}>
      GMSPLAY.PRO
    </Button>
  );

  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <div className={s.leftSection}>
          {logo}
          <Divider noMargin className={s.divider} />
          {menuButton}
        </div>
        <div
          className={classNames(s.rightSection, {
            [s.notAuthenticated]: !isToken,
          })}
        >
          <Divider noMargin className={s.divider} />
          <Balance />
          {menuButton}
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={s.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            <motion.div
              className={s.sideMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className={s.menuHeader}>
                {logo}
                <Button
                  variant='text'
                  textColor='white'
                  className={s.closeButton}
                  onClick={toggleMenu}
                  icon={<FaTimes size={24} />}
                />
              </div>
              <div className={s.menuContent}>
                <nav className={s.navigation}>
                  {navigation.map((item) => (
                    <Button
                      key={item.path}
                      to={item.path}
                      variant='underline'
                      fullWidth
                      isActive={location.pathname === item.path}
                      padding={{ py: '0px' }}
                      size='large'
                      className={s.menuButton}
                    >
                      {t(item.name)}
                    </Button>
                  ))}
                </nav>
                <div className={s.menuFooter}>
                  <LanguageSwitcher
                    dropdownProps={{
                      placement: 'top-left',
                    }}
                  />
                  <UserMenu onLogout={toggleMenu} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MobileHeader;
