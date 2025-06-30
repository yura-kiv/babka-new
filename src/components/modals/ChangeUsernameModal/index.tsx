import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Modal, Input, Button } from '@/components/ui';
import { FaUser } from 'react-icons/fa';
import { userApi } from '@/api';
import { notificationService } from '@/services';
import { setUserState } from '@/store/helpers/actions';
import { useAppDispatch } from '@/store/hooks';
import { userName as userNameValidation } from '@/utils/validations';
import s from './styles.module.scss';

interface ChangeUsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChangeUsernameFormData {
  username: string;
}

const ChangeUsernameModal: React.FC<ChangeUsernameModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangeUsernameFormData>({
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = async (data: ChangeUsernameFormData) => {
    try {
      setIsLoading(true);
      const res = await userApi.changeUsername(data.username);
      const { message, data: username } = res.data;

      dispatch(
        setUserState({
          username: username || null,
        })
      );

      reset();
      notificationService.success(
        t(message || 'notifications.user.changeUsernameSuccess')
      );
      onClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        t('notifications.user.changeUsernameError');
      console.error('Change username error:', error);
      notificationService.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('changeUsername.title')}
      animation='scale'
    >
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          {...register('username', userNameValidation)}
          leftIcon={<FaUser />}
          placeholder={t('changeUsername.newUsername')}
          label={t('changeUsername.newUsername')}
          errorMessage={errors.username?.message}
          size='medium'
        />

        <div className={s.actions}>
          <Button variant='outline' onClick={handleClose} type='button'>
            {t('cancel')}
          </Button>
          <Button variant='green' type='submit' isLoading={isLoading}>
            {t('changeUsername.submit')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangeUsernameModal;
