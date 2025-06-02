import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Pages } from '@/constants';
import Input, { PasswordInput } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import s from './styles.module.scss';
import { notificationService } from '@/services/notification';

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = (data: FormData) => {
    console.log('Login form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <button type="button" onClick={() => notificationService.info('test')}>test</button>
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

      <Controller
        name="password"
        control={control}
        rules={{
          required: t('validation.required')
        }}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label={t('auth.password')}
            placeholder={t('auth.password')}
            leftIcon={<FaLock />}
            errorMessage={errors.password?.message}
            size="medium"
          />
        )}
      />

      <Button
        type="submit"
        variant="yellow"
        fullWidth
        size="large"
        className={s.submitButton}
      >
        {t('auth.login')}
      </Button>

      <Button variant="subtle" size="medium" to={Pages.ForgotPassword} className={s.forgotPassword}>
        {t('auth.forgotPassword')}
      </Button>
    </form>
  );
};

export default LoginForm;