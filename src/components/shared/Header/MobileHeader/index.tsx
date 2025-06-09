import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Pages } from '@/constants';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import Balance from '@/components/shared/Balance';
import Button from '@/components/ui/Button';
import UserMenu from '@/components/shared/Header/UserMenu';
import s from './styles.module.scss';
import Divider from '@/components/ui/Divider';
import classNames from 'classnames';
import { useAppSelector } from '@/store/hooks';
import { isUserAuthenticated } from '@/store/helpers/selectors';

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
  const isAuthenticated = useAppSelector(isUserAuthenticated);

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

  const menuButton = <Button
    variant="text"
    textColor="white"
    className={s.menuButton}
    onClick={toggleMenu}
    icon={<FaBars size={24} />}
  />

  const logo = <Button to={Pages.Home} variant="simple" size='large' className={s.logo}>
    GMSPLAY.PRO
  </Button>

  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <div className={s.leftSection}>
          {logo}
          {menuButton}
        </div>
        <div className={classNames(s.rightSection, { [s.notAuthenticated]: !isAuthenticated })}>
          <Divider noMargin />
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
                  variant="text"
                  textColor="white"
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
                      variant="underline"
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
