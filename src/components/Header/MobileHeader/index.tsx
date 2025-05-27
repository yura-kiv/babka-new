import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaDoorOpen } from 'react-icons/fa';
import { Pages } from '@/constants';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Balance from '@/components/Balance';
import CustomLink from '@/components/CustomLink';
import Button from '@/components/Button';

import s from './styles.module.scss';
import Divider from '@/components/Divider';

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
];

const MobileHeader: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
    leftIcon={<FaBars size={24} />}
  />

  const logo = <CustomLink to={Pages.Home} variant="default" size='large' className={s.logo}>
    GMSPLAY.PRO
  </CustomLink>

  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <div className={s.leftSection}>
          {logo}
          {menuButton}
        </div>
        <div className={s.rightSection}>
          <Divider />
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
                  leftIcon={<FaTimes size={24} />}
                />
              </div>
              <div className={s.menuContent}>
                <nav className={s.navigation}>
                  {navigation.map((item) => (
                    <CustomLink
                      key={item.path}
                      to={item.path}
                      variant="primary"
                      size="large"
                      fullWidth
                      className={s.navigationLink}
                      isActive={location.pathname === item.path}
                    >
                      {t(item.name)}
                    </CustomLink>
                  ))}
                </nav>
                <div className={s.menuFooter}>
                  <LanguageSwitcher
                    dropdownProps={{
                      placement: 'top-left',
                    }}
                  />
                  <CustomLink
                    to={Pages.Auth}
                    variant="default"
                    icon={<FaDoorOpen />}
                    className={s.loginLink}
                    fullWidth
                  >
                    {t('login')}
                  </CustomLink>
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
