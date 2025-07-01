import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaDoorOpen, FaSignOutAlt } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { Pages } from '@/constants';
import s from './styles.module.scss';
import { useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/helpers/selectors';
import { logoutUser } from '@/store/helpers/actions';
import { authApi } from '@/api/auth';

interface UserMenuProps {
  onLogout?: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onLogout }) => {
  const { t } = useTranslation();
  const { username, avatarUrl, token } = useAppSelector(getUser);

  const defaultAvatarUrl = '/imgs/grandma/avatar.svg';
  const displayAvatarUrl = avatarUrl || defaultAvatarUrl;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error: any) {
      console.error('Logout error:', error);
    } finally {
      navigate(Pages.Auth);
      logoutUser();
      onLogout?.();
    }
  };

  if (!token) {
    return (
      <Button
        size='large'
        to={Pages.Auth}
        variant='simple'
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
        variant='simple'
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
          <span className={s.username}>{username || 'Username'}</span>
        </div>
      </Button>

      <Button
        variant='simple'
        size='medium'
        onClick={handleLogout}
        icon={<FaSignOutAlt />}
        iconPosition='right'
        padding={{ py: '0px' }}
      >
        {t('logout')}
      </Button>
    </div>
  );
};

export default UserMenu;
