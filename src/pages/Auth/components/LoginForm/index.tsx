import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Pages } from '@/constants';
import { Input, PasswordInput, Button } from '@/components/ui';
import { notificationService } from '@/services';
import { authApi } from '@/api/auth';
import { setUserState } from '@/store/helpers/actions';
import { BalanceType, type DecodedToken } from '@/types';
import { required, email as emailValidation } from '@/utils/validations';
import s from './styles.module.scss';

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const res = await authApi.login(data);
      const {
        data: { accessToken },
        message,
        status,
        userData,
      } = res.data;
      let tokenData = {} as Partial<DecodedToken>;

      try {
        tokenData = jwtDecode(accessToken) as DecodedToken;
      } catch (decodeError) {
        console.error('Error decoding token:', decodeError);
      }

      const { email, id, username } = tokenData;

      setUserState({
        isActived: true,
        token: accessToken,
        userId: id || null,
        username: username || null,
        email: email || null,
        balance: Number(userData.balance) || 0,
        demoBalance: Number(userData.demoBalance) || 0,
        avatarUrl: userData.avatar || null,
        selectedBalance: BalanceType.REAL,
      });

      reset();
      // notificationService.success(
      //   t(message || 'notifications.auth.loginSuccess')
      // );
      navigate(Pages.Home);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || t('notifications.auth.loginError');
      console.error('Login error:', error);
      notificationService.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

      <Controller
        name='password'
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label={t('auth.password')}
            placeholder={t('auth.password')}
            leftIcon={<FaLock />}
            errorMessage={errors.password?.message}
            size='medium'
          />
        )}
      />

      <Button
        type='submit'
        variant='yellow'
        fullWidth
        size='large'
        className={s.submitButton}
        isLoading={isLoading}
        disabled={isLoading}
      >
        {t('auth.login')}
      </Button>

      <Button
        variant='subtle'
        size='medium'
        to={Pages.ForgotPassword}
        className={s.forgotPassword}
      >
        {t('auth.forgotPassword')}
      </Button>
    </form>
  );
};

export default LoginForm;
