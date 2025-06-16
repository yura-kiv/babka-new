import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { FaLock } from 'react-icons/fa';
import { PasswordInput } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import PageTitle from '@/components/ui/PageTitle';
import { authApi } from '@/api/auth';
import { notificationService } from '@/services/notification';
import { Pages } from '@/constants';
import s from './styles.module.scss';
import { password as passwordValidation } from '@/utils/validations';

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState<string>('');
  
  useEffect(() => {
    const tokenFromUrl = new URLSearchParams(location.search).get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      notificationService.error('Invalid or missing reset token');
      navigate(Pages.Auth);
    }
  }, [location.search]);

  const { control, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    mode: 'onBlur'
  });

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    try {      
      if (!token) {
        notificationService.error('Invalid or missing reset token');
        return;
      }
      await authApi.resetPassword({
        password: data.password,
        token
      });
      notificationService.success(t('notifications.auth.resetPasswordSuccess'));
      setTimeout(() => {
        navigate(Pages.Auth);
      }, 3000);
    } catch (error) {
      console.error('Error resetting password:', error);
      notificationService.error(t('notifications.auth.resetPasswordError'));
    }
  };

  return (
    <div className={s.wrapper}>
      <PageTitle 
        title={t('resetPassword.title')} 
        subtitle={t('resetPassword.description')} 
        as="h1"
      />
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Controller
          name="password"
          control={control}
          rules={passwordValidation}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label={t('resetPassword.newPassword')}
              placeholder={t('resetPassword.newPassword')}
              leftIcon={<FaLock />}
              errorMessage={errors.password?.message}
              size="medium"
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            ...passwordValidation,
            validate: value => 
              value === password || t('validation.passwordMatch')
          }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label={t('resetPassword.confirmPassword')}
              placeholder={t('resetPassword.confirmPassword')}
              leftIcon={<FaLock />}
              errorMessage={errors.confirmPassword?.message}
              size="medium"
            />
          )}
        />

        <Button
          type="submit"
          variant="yellow"
          fullWidth
          size="large"
          isLoading={isSubmitting}
        >
          {t('resetPassword.submit')}
        </Button>

        <Button
          variant="subtle"
          to={Pages.Auth}
          className={s.backButton}
        >
          {t('resetPassword.backToLogin')}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;