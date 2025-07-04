import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, PageTitle, WidthWrapper } from '@/components/ui';
import { authApi } from '@/api/auth';
import { notificationService } from '@/services';
import { FaEnvelope } from 'react-icons/fa';
import s from './styles.module.scss';

const AskToConfirmEmail: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResendEmail = async () => {
    if (cooldown > 0 || isLoading) return;

    setIsLoading(true);
    try {
      await authApi.resendActivationEmail();
      notificationService.success(t('emailConfirmation.resendSuccess'));
      setCooldown(30);
    } catch (error) {
      console.error('Error resending activation email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WidthWrapper className={s.wrapper}>
      <FaEnvelope size={50} className={s.icon} />
      <PageTitle title={t('emailConfirmation.title')} removeOffset />

      <div className={s.text}>
        <p className={s.description}>{t('emailConfirmation.description')}</p>
        <p className={s.spamNote}>{t('emailConfirmation.checkSpam')}</p>
      </div>

      <Button
        variant='green'
        size='medium'
        onClick={handleResendEmail}
        isLoading={isLoading || cooldown > 0}
        disabled={cooldown > 0 || isLoading}
        icon={<FaEnvelope />}
      >
        {t('emailConfirmation.resend')}
      </Button>

      {cooldown > 0
        ? t('emailConfirmation.resendWait', { seconds: cooldown })
        : null}
    </WidthWrapper>
  );
};

export default AskToConfirmEmail;
