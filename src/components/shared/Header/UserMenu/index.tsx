import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaDoorOpen, FaSignOutAlt } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { Pages } from '@/constants';
import s from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserData } from '@/store/helpers/selectors';
import { logoutUser } from '@/store/helpers/actions';

const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { username, avatarUrl, isAuthenticated } = useAppSelector(getUserData);

  const defaultAvatarUrl = '/imgs/grandma/avatar.svg';
  const displayAvatarUrl = avatarUrl || defaultAvatarUrl;

  const handleLogout = () => {
    dispatch(logoutUser());
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
