import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import WidthWrapper from '@/components/ui/WidthWrapper';
import PageTitle from '@/components/ui/PageTitle';
import Button from '@/components/ui/Button';
import ChangeUsernameModal from '@/components/modals/ChangeUsernameModal';
import UserAvatar from './components/UserAvatar';
import s from './styles.module.scss';
import { FaLock, FaUser } from 'react-icons/fa';
import { useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/helpers/selectors';
import { authApi } from '@/api/auth';
import { notificationService } from '@/services/notification';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isChangeUsernameModalOpen, setIsChangeUsernameModalOpen] = useState(false);

  const user = useAppSelector(getUser);

  const openChangeUsernameModal = () => {
    setIsChangeUsernameModalOpen(true);
  };

  const closeChangeUsernameModal = () => {
    setIsChangeUsernameModalOpen(false);
  };

  const sendForgotPasswordRequest = async () => {
    try {
      setIsLoading(true);
      const res = await authApi.forgotPassword(user?.email || '');
      const { message } = res.data;
      notificationService.success(message || t('notifications.auth.forgotPasswordRequestSuccess'));
    } catch (error) {
      console.error('Change password error:', error);
      notificationService.error(t('notifications.auth.forgotPasswordRequestError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WidthWrapper>
      <PageTitle title={t('profile.title')} as="h1" />

      <WidthWrapper maxWidth={992} className={s.profileInfo}>
        <UserAvatar avatarUrl={user.avatarUrl} username={user.username} />

        <div className={s.infoRows}>
          <div className={s.infoRow}>
            <span className={s.infoLabel}>{t('profile.username')}</span>
            <span className={s.infoValue}>{user.username}</span>
          </div>

          <div className={s.infoRow}>
            <span className={s.infoLabel}>{t('profile.email')}</span>
            <span className={s.infoValue}>{user.email}</span>
          </div>

          <div className={s.infoRow}>
            <span className={s.infoLabel}>{t('profile.balance')}</span>
            <span className={s.infoValue + ' ' + s.green}>{user.balance} $</span>
          </div>

          {/*
            <div className={s.infoRow}>
              <span className={s.infoLabel}>{t('profile.withdrawn')}</span>
              <span className={s.infoValue + ' ' + s.green}>{user.withdrawn} $</span>
            </div>
          */}
        </div>
      </WidthWrapper>

      <div className={s.action}>
        <p>{t('profile.changeUsername')}:</p>
        <Button
          variant="outline"
          onClick={openChangeUsernameModal}
          size="medium"
          icon={<FaUser />}
        >
          {t('profile.changeUsername')}
        </Button>
      </div>

      <div className={s.action}>
        <p>{t('profile.changePassword')}:</p>
        <Button
          variant="outline"
          onClick={sendForgotPasswordRequest}
          size="medium"
          icon={<FaLock />}
          isLoading={isLoading}
        >
          {t('profile.changePassword')}
        </Button>
      </div>

      <ChangeUsernameModal
        isOpen={isChangeUsernameModalOpen}
        onClose={closeChangeUsernameModal}
      />
    </WidthWrapper>
  );
};

export default Profile;
