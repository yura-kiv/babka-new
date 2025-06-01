import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaUser, FaLock } from 'react-icons/fa';
import { Pages } from '@/constants';
import Input, { PasswordInput } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import s from './styles.module.scss';

type FormData = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = (data: FormData) => {
    console.log('Login form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Controller
        name="username"
        control={control}
        rules={{
          required: t('validation.required')
        }}
        render={({ field }) => (
          <Input
            {...field}
            label={t('auth.username')}
            placeholder={t('auth.username')}
            leftIcon={<FaUser />}
            errorMessage={errors.username?.message}
            size="medium"
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