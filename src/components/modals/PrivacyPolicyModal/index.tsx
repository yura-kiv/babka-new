import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/ui/Modal';
import s from './styles.module.scss';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('privacyPolicy')}
      animation='scale'
    >
      <div className={s.policyContent}>
        <h3>{t('privacyPolicy.introduction.title')}</h3>
        <p>{t('privacyPolicy.introduction.content')}</p>

        <h3>{t('privacyPolicy.collection.title')}</h3>
        <p>{t('privacyPolicy.collection.content')}</p>
        <ul>
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index}>{t(`privacyPolicy.collection.items.${index}`)}</li>
          ))}
        </ul>

        <h3>{t('privacyPolicy.use.title')}</h3>
        <p>{t('privacyPolicy.use.content')}</p>
        <ul>
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>{t(`privacyPolicy.use.items.${index}`)}</li>
          ))}
        </ul>

        <h3>{t('privacyPolicy.sharing.title')}</h3>
        <p>{t('privacyPolicy.sharing.content')}</p>
        <ul>
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index}>{t(`privacyPolicy.sharing.items.${index}`)}</li>
          ))}
        </ul>

        <h3>{t('privacyPolicy.protection.title')}</h3>
        <p>{t('privacyPolicy.protection.content')}</p>

        <h3>{t('privacyPolicy.cookies.title')}</h3>
        <p>{t('privacyPolicy.cookies.content')}</p>

        <h3>{t('privacyPolicy.gaming.title')}</h3>
        <p>{t('privacyPolicy.gaming.content')}</p>

        <h3>{t('privacyPolicy.rights.title')}</h3>
        <p>{t('privacyPolicy.rights.content')}</p>
        <ul>
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index}>{t(`privacyPolicy.rights.items.${index}`)}</li>
          ))}
        </ul>
        <p>{t('privacyPolicy.rights.contact')}</p>

        <h3>{t('privacyPolicy.changes.title')}</h3>
        <p>{t('privacyPolicy.changes.content')}</p>
      </div>
    </Modal>
  );
};

export default PrivacyPolicyModal;
