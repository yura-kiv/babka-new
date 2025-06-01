import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { Pages } from '@/constants';
import s from './styles.module.scss';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>404</h2>
      <p className={s.subtitle}>{t('pageNotFound')}</p>
      <Button
        to={Pages.Home}
        variant="green"
        size="large"
      >
        {t('backToHome')}
      </Button>
    </div>
  );
};

export default NotFound;
