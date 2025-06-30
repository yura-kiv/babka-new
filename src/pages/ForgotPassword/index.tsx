import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { FaEnvelope } from 'react-icons/fa';
import { Input, Button, PageTitle } from '@/components/ui';
import { authApi } from '@/api/auth';
import { notificationService } from '@/services';
import { Pages } from '@/constants';
import { email as emailValidation } from '@/utils/validations';
import s from './styles.module.scss';

type FormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await authApi.forgotPassword(data.email);

      notificationService.success(
        t('notifications.auth.forgotPasswordSuccess')
      );

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error sending password reset request:', error);
      notificationService.error(t('notifications.auth.forgotPasswordError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <PageTitle
        title={t('forgotPassword.title')}
        as='h1'
        subtitle={t('forgotPassword.description')}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Controller
          name='email'
          control={control}
          rules={emailValidation}
          render={({ field }) => (
            <Input
              {...field}
              label={t('auth.email')}
              placeholder={t('auth.email')}
              leftIcon={<FaEnvelope />}
              errorMessage={errors.email?.message}
              size='medium'
              type='email'
            />
          )}
        />

        <Button
          type='submit'
          variant='yellow'
          fullWidth
          size='large'
          className={s.submitButton}
          isLoading={isSubmitting}
        >
          {t('forgotPassword.submit')}
        </Button>

        <Button variant='subtle' to={Pages.Auth} className={s.backButton}>
          {t('forgotPassword.backToLogin')}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
