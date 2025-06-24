import React from 'react';
import { useDispatch } from 'react-redux';
import { FaCamera } from 'react-icons/fa';
import type { AppDispatch } from '@/store';
import s from './styles.module.scss';
import Button from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { userApi } from '@/api/user';
import { notificationService } from '@/services/notification';
import { setUserState } from '@/store/helpers/actions';

interface UserAvatarProps {
  avatarUrl: string | null;
  username: string | null;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl, username }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);

  const defaultAvatarUrl = '/imgs/grandma/avatar.svg';
  const displayAvatarUrl = avatarUrl || defaultAvatarUrl;

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      notificationService.error(t('notifications.user.invalidImageFormat'));
      return;
    }

    try {
      setIsLoading(true);
      const res = await userApi.changeAvatar(file);
      const {
        message,
        data: { avatarUrl },
      } = res.data;

      dispatch(
        setUserState({
          avatarUrl,
        })
      );

      notificationService.success(
        t(message || 'notifications.user.changeAvatarSuccess')
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        t('notifications.user.changeAvatarError');
      console.error('Change avatar error:', error);
      notificationService.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <div
        className={classNames(
          s.avatarContainer,
          avatarUrl ? s.customAvatar : s.defaultAvatar
        )}
      >
        <img src={displayAvatarUrl} alt={username || 'User avatar'} />
      </div>

      <label
        htmlFor='avatar-upload'
        className={s.changeAvatarButton}
        style={{
          cursor: isLoading ? 'not-allowed' : 'pointer',
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
      >
        <Button
          variant='bordered'
          icon={<FaCamera />}
          fullWidth
          size='small'
          isLoading={isLoading}
        >
          {t('profile.changeAvatar')}
        </Button>
      </label>

      <input
        type='file'
        id='avatar-upload'
        accept='image/*'
        onChange={handleAvatarChange}
        className={s.fileInput}
      />
    </div>
  );
};

export default UserAvatar;
