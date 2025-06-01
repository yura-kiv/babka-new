import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FaDoorOpen, FaSignOutAlt } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { Pages } from '@/constants';
import type { RootState } from '@/types/store';
import type { AppDispatch } from '@/store';
import { logout } from '@/store/slices/userSlice';
import s from './styles.module.scss';

const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, username, avatarUrl } = useSelector((state: RootState) => state.user);

  const defaultAvatarUrl = '/imgs/grandma/avatar.svg';
  const displayAvatarUrl = avatarUrl || defaultAvatarUrl;

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isAuthenticated) {
    return (
      <Button 
        size='large' 
        to={Pages.Auth} 
        variant="simple" 
        icon={<FaDoorOpen />}
        padding={{ py: '0px' }}
        className={s.loginButton}
      >
        {t('login')}
      </Button>
    );
  }

  return (
    <div className={s.userMenu}>
      <Button 
        to={Pages.Profile} 
        variant="simple"
        className={s.profileButton}
        size='large'
        padding={{ p: '0px' }}
      >
        <div className={s.userInfo}>
          <img 
            src={displayAvatarUrl} 
            alt={username || 'User'} 
            className={s.avatar} 
          />
          <span className={s.username}>{username || "Username"}</span>
        </div>
      </Button>
      
      <Button 
        variant="simple" 
        size="medium" 
        onClick={handleLogout}
        icon={<FaSignOutAlt />}
        iconPosition="right"
        padding={{ py: '0px' }}
      >
        {t('logout')}
      </Button>
    </div>
  );
};

export default UserMenu;
