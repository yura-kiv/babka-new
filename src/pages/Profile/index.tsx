import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import WidthWrapper from '@/components/ui/WidthWrapper';
import PageTitle from '@/components/ui/PageTitle';
import Button from '@/components/ui/Button';
import ChangePasswordModal from '@/components/modals/ChangePasswordModal';
import ChangeUsernameModal from '@/components/modals/ChangeUsernameModal';
import UserAvatar from './components/UserAvatar';
import type { RootState } from '@/types/store';
import s from './styles.module.scss';
import { FaLock, FaUser } from 'react-icons/fa';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isChangeUsernameModalOpen, setIsChangeUsernameModalOpen] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const openChangeUsernameModal = () => {
    setIsChangeUsernameModalOpen(true);
  };

  const closeChangeUsernameModal = () => {
    setIsChangeUsernameModalOpen(false);
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
            <span className={s.infoValue + ' ' + s.green}>12 000 $</span>
          </div>

          <div className={s.infoRow}>
            <span className={s.infoLabel}>{t('profile.withdrawn')}</span>
            <span className={s.infoValue + ' ' + s.green}>4 317 $</span>
          </div>
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
          onClick={openChangePasswordModal}
          size="medium"
          icon={<FaLock />}
        >
          {t('profile.changePassword')}
        </Button>
      </div>

      <ChangeUsernameModal
        isOpen={isChangeUsernameModalOpen}
        onClose={closeChangeUsernameModal}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={closeChangePasswordModal}
      />
    </WidthWrapper>
  );
};

export default Profile;
