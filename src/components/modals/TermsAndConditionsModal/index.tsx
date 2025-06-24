import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/ui/Modal';
import s from './styles.module.scss';

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('generalPosition')}
      animation='scale'
    >
      <div className={s.termsContent}>
        <h3>{t('terms.introduction.title')}</h3>
        <p>{t('terms.introduction.content')}</p>

        <h3>{t('terms.participation.title')}</h3>
        <h4>{t('terms.participation.age.title')}</h4>
        <p>{t('terms.participation.age.content')}</p>

        <h4>{t('terms.participation.legal.title')}</h4>
        <p>{t('terms.participation.legal.content')}</p>

        <h3>{t('terms.account.title')}</h3>
        <h4>{t('terms.account.registration.title')}</h4>
        <p>{t('terms.account.registration.content')}</p>

        <h4>{t('terms.account.confidentiality.title')}</h4>
        <p>{t('terms.account.confidentiality.content')}</p>

        <h3>{t('terms.games.title')}</h3>
        <h4>{t('terms.games.bets.title')}</h4>
        <p>{t('terms.games.bets.content')}</p>

        <h4>{t('terms.games.results.title')}</h4>
        <p>{t('terms.games.results.content')}</p>

        <h4>{t('terms.games.responsible.title')}</h4>
        <p>{t('terms.games.responsible.content')}</p>

        <h3>{t('terms.financial.title')}</h3>
        <h4>{t('terms.financial.transactions.title')}</h4>
        <p>{t('terms.financial.transactions.content')}</p>

        <h4>{t('terms.financial.fees.title')}</h4>
        <p>{t('terms.financial.fees.content')}</p>

        <h4>{t('terms.financial.blocking.title')}</h4>
        <p>{t('terms.financial.blocking.content')}</p>

        <h3>{t('terms.bonuses.title')}</h3>
        <h4>{t('terms.bonuses.conditions.title')}</h4>
        <p>{t('terms.bonuses.conditions.content')}</p>

        <h4>{t('terms.bonuses.wagering.title')}</h4>
        <p>{t('terms.bonuses.wagering.content')}</p>

        <h3>{t('terms.liability.title')}</h3>
        <p>{t('terms.liability.content')}</p>

        <h3>{t('terms.changes.title')}</h3>
        <p>{t('terms.changes.content')}</p>

        <h3>{t('terms.contact.title')}</h3>
        <p>{t('terms.contact.content')}</p>
      </div>
    </Modal>
  );
};

export default TermsAndConditionsModal;
