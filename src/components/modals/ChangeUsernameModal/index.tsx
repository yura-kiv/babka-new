import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import s from './ChangeUsernameModal.module.scss';
import { FaUser } from 'react-icons/fa';
import { userApi } from '@/api';
import { notificationService } from '@/services/notification';
import { setUserState } from '@/store/helpers/actions';
import { useAppDispatch } from '@/store/hooks';

interface ChangeUsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChangeUsernameFormData {
  username: string;
}

const ChangeUsernameModal: React.FC<ChangeUsernameModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChangeUsernameFormData>({
    defaultValues: {
      username: ''
    }
  });

  const onSubmit = async (data: ChangeUsernameFormData) => {
    try {
      setIsLoading(true);
      userApi.changeUsername(data.username);
      userApi.changeUsername(data.username);
      userApi.changeUsername(data.username);
      // const res = await userApi.changeUsername(data.username);
      // const { message, data: username } = res.data;

      // dispatch(setUserState({
      //   username: username || null,
      // }));

      // reset();
      // notificationService.success(t(message || 'notifications.user.changeUsernameSuccess'));
      // onClose();
    } catch (error: any) {
      const message = error?.response?.data?.message || t('notifications.user.changeUsernameError');
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
      animation="scale"
    >
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          {...register('username', {
            required: t('validation.required'),
            minLength: {
              value: 3,
              message: t('validation.minLength', { count: 3 })
            },
            maxLength: {
              value: 20,
              message: t('validation.maxLength', { count: 20 })
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: t('validation.usernamePattern')
            }
          })}
          leftIcon={<FaUser />}
          placeholder={t('changeUsername.newUsername')}
          label={t('changeUsername.newUsername')}
          errorMessage={errors.username?.message}
          size='medium'
        />

        <div className={s.actions}>
          <Button
            variant="outline"
            onClick={handleClose}
            type="button"
          >
            {t('cancel')}
          </Button>
          <Button
            variant="green"
            type="submit"
            isLoading={isLoading}
          >
            {t('changeUsername.submit')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangeUsernameModal;
