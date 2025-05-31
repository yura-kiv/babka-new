import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Input from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import s from './styles.module.scss';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    },
    mode: 'onBlur'
  });

  const password = watch('password');

  const onSubmit = (data: FormData) => {
    console.log('Registration form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Controller
        name="username"
        control={control}
        rules={{
          required: t('validation.required'),
          minLength: {
            value: 3,
            message: t('validation.minLength', { count: 3 })
          }
        }}
        render={({ field }) => (
          <Input
            {...field}
            label={t('auth.username')}
            placeholder={t('auth.username')}
            leftIcon={<FaUser />}
            variant={errors.username ? 'error' : 'default'}
            errorMessage={errors.username?.message}
            size="medium"
          />
        )}
      />

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
            variant={errors.email ? 'error' : 'default'}
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
          required: t('validation.required'),
          minLength: {
            value: 6,
            message: t('validation.minLength', { count: 6 })
          }
        }}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label={t('auth.password')}
            placeholder={t('auth.password')}
            leftIcon={<FaLock />}
            variant={errors.password ? 'error' : 'default'}
            errorMessage={errors.password?.message}
            size="medium"
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: t('validation.required'),
          validate: value =>
            value === password || t('validation.passwordMatch')
        }}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label={t('auth.repeatPassword')}
            placeholder={t('auth.repeatPassword')}
            leftIcon={<FaLock />}
            variant={errors.confirmPassword ? 'error' : 'default'}
            errorMessage={errors.confirmPassword?.message}
            size="medium"
          />
        )}
      />

      <Controller
        name="agreeToTerms"
        control={control}
        rules={{
          required: t('validation.agreeToTerms')
        }}
        render={({ field: { onChange, value, ref } }) => (
          <Checkbox
            ref={ref}
            checked={value}
            onChange={onChange}
            label={
              <span className={s.termsLabel}>
                {t('auth.agreeToTerms')}
                <a href="#" className={s.link}>
                  {t('auth.privacyPolicy')}
                </a>
              </span>
            }
            error={!!errors.agreeToTerms}
            errorMessage={errors.agreeToTerms?.message}
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
        {t('auth.registration')}
      </Button>
    </form>
  );
};

export default RegisterForm;