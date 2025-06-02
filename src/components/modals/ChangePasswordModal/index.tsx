import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import { PasswordInput } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import s from './ChangePasswordModal.module.scss';
import { FaLock } from 'react-icons/fa';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data: ChangePasswordFormData) => {
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('changePassword.title')}
      animation="scale"
      
    >
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <PasswordInput
          {...register('currentPassword', {
            required: t('validation.required')
          })}
          leftIcon={<FaLock />}
          placeholder={t('changePassword.currentPassword')}
          label={t('changePassword.currentPassword')}
          errorMessage={errors.currentPassword?.message}
          size='medium'
        />

        <PasswordInput
          {...register('newPassword', {
            required: t('validation.required'),
            minLength: {
              value: 8,
              message: t('validation.minLength', { count: 8 })
            }
          })}
          leftIcon={<FaLock />}
          placeholder={t('changePassword.newPassword')}
          label={t('changePassword.newPassword')}
          errorMessage={errors.newPassword?.message}
          size='medium'
        />

        <PasswordInput
          {...register('confirmPassword', {
            required: t('validation.required'),
            validate: value =>
              value === newPassword || t('validation.passwordMatch')
          })}
          leftIcon={<FaLock />}
          placeholder={t('changePassword.confirmPassword')}
          label={t('changePassword.confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
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
            {t('changePassword.submit')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
