import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Input from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import { authApi } from '@/api/auth';
import { notificationService } from '@/services/notification';
import s from './styles.module.scss';
import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { setUserState } from '@/store/helpers/actions';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch, formState: { errors }, reset } = useForm<FormData>({
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

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const { confirmPassword, agreeToTerms, ...registerData } = data;
      let tokenData = {} as Partial<DecodedToken>;

      const res = await authApi.register(registerData);
      const { accessToken, status } = res.data;

      try {
        tokenData = jwtDecode(accessToken) as DecodedToken;
      } catch (decodeError) {
        console.error('Error decoding token:', decodeError);
      }

      const { email, exp, iat, id, username } = tokenData;

      dispatch(setUserState({
        isAuthenticated: false,
        token: accessToken,
        userId: id || null,
        username: username || null,
        email: email || null,
        selectedBalance: 'real',
        demoBalance: 1000,
      }));

      notificationService.success(t('notifications.auth.registerSuccess'));
      reset();
    } catch (error: any) {
      const message = error?.response?.data?.message || t('notifications.auth.registerError');
      console.error('Registration error:', error);
      notificationService.error(message);
    } finally {
      setIsLoading(false);
    }
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
        isLoading={isLoading}
        disabled={isLoading}
      >
        {t('auth.registration')}
      </Button>
    </form>
  );
};

export default RegisterForm;