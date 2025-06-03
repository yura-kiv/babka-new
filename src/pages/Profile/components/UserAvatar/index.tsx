import React from 'react';
import { useDispatch } from 'react-redux';
import { FaCamera } from 'react-icons/fa';
import type { AppDispatch } from '@/store';
import s from './styles.module.scss';
import Button from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface UserAvatarProps {
  avatarUrl: string | null;
  username: string | null;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl, username }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const defaultAvatarUrl = '/imgs/grandma/avatar.svg';
  const displayAvatarUrl = avatarUrl || defaultAvatarUrl;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={classNames(s.avatarContainer, { [s.defaultAvatar]: !avatarUrl })}>
        <img
          src={displayAvatarUrl}
          alt={username || 'User avatar'}
        />
      </div>

      <label htmlFor="avatar-upload" className={s.changeAvatarButton}>
        <Button variant="bordered" icon={<FaCamera />} onClick={() => { }} fullWidth size="small">
          {t('profile.changeAvatar')}
        </Button>
      </label>

      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        onChange={handleAvatarChange}
        className={s.fileInput}
      />
    </div>
  );
};

export default UserAvatar;
