import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { FaEnvelope } from 'react-icons/fa';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import s from './styles.module.scss';
import { Pages } from '@/constants';
import PageTitle from '@/components/ui/PageTitle';

type FormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error sending password reset request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <PageTitle title={t('forgotPassword.title')} as="h1" subtitle={t('forgotPassword.description')} />
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: t('validation.required'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('validation.email')
            }
          }}
          render={({ field }) => (
            <Input
              {...field}
              label={t('auth.email')}
              placeholder={t('auth.email')}
              leftIcon={<FaEnvelope />}
              errorMessage={errors.email?.message}
              size="medium"
              type="email"
            />
          )}
        />

        <Button
          type="submit"
          variant="yellow"
          fullWidth
          size="large"
          className={s.submitButton}
          isLoading={isSubmitting}
        >
          {t('forgotPassword.submit')}
        </Button>

        <Button
          variant="subtle"
          to={Pages.Auth}
          className={s.backButton}
        >
          {t('forgotPassword.backToLogin')}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
