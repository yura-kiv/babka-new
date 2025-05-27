import React from 'react';
import { useTranslation } from 'react-i18next';
import s from './styles.module.scss';
import Button from '../Button';
import WidthWrapper from '../WidthWrapper';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <WidthWrapper>
        <div className={s.container}>
          {currentYear}
        </div>
      </WidthWrapper>
      <div className={s.supportWrapper}>
        <WidthWrapper className={s.support} >
          <p className={s.label}>24/7 {t('support')}</p>
          <Button
            variant="green"
            padding={{ px: '30px' }}
            size="small"
            borderRadius="small"
            to='#'
            external
          >
            {t('chat')}
          </Button>
        </WidthWrapper>
      </div>
    </footer>
  );
};

export default Footer;
