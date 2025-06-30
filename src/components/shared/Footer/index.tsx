import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, WidthWrapper, Divider } from '@/components/ui';
import {
  PrivacyPolicyModal,
  TermsAndConditionsModal,
} from '@/components/modals';
import s from './styles.module.scss';

const marks = [
  {
    img: '/imgs/footerMarks/listing-001.svg',
    alt: 'listing-001',
    href: 'https://bookmaker-ratings.by/ru/review/obzor-bukmekerskoj-kontory-1win',
  },
  {
    img: '/imgs/footerMarks/listing-002.png',
    alt: 'listing-002',
    href: 'https://betraja.net/betting-sites/1win/',
  },
  {
    img: '/imgs/footerMarks/listing-003.png',
    alt: 'listing-003',
    href: 'https://casinomentor.com/reviews/1win-casino',
  },
  {
    img: '/imgs/footerMarks/listing-004.png',
    alt: 'listing-004',
    href: 'https://bookmaker-ratings.by/ru/review/obzor-bukmekerskoj-kontory-1win/',
  },
  {
    img: '/imgs/footerMarks/listing-005.png',
    alt: 'listing-005',
    href: 'https://www.bestbitcoincasino.com/review/1wincasino',
  },
];

const payments = [
  {
    img: '/imgs/payments/visa.svg',
    alt: 'visa',
  },
  {
    img: '/imgs/payments/mcf.svg',
    alt: 'mcf',
  },
  {
    img: '/imgs/payments/g-pay.svg',
    alt: 'g-pay',
  },
  {
    img: '/imgs/payments/pay.svg',
    alt: 'pay',
  },
  {
    img: '/imgs/payments/bitcoin.svg',
    alt: 'bitcoin',
  },
  {
    img: '/imgs/payments/qiwi.svg',
    alt: 'qiwi',
  },
  {
    img: '/imgs/payments/lky.svg',
    alt: 'lky',
  },
  {
    img: '/imgs/payments/skrill.svg',
    alt: 'skrill',
  },
  {
    img: '/imgs/payments/payeer.svg',
    alt: 'payeer',
  },
  {
    img: '/imgs/payments/jcb.svg',
    alt: 'jcb',
  },
];

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <WidthWrapper className={s.container}>
        <div className={s.label}>
          <span>gmsplay</span>
          <Divider noMargin />
        </div>
        <div className={s.information}>
          <p className={s.label}>{t('information')}:</p>
          <div className={s.actions}>
            <Button
              variant='subtle'
              textColor='white'
              size='medium'
              padding={{ p: 0 }}
              onClick={() => setPrivacyPolicyOpen(true)}
            >
              {t('privacyPolicy')}
            </Button>
            <Button
              variant='subtle'
              textColor='white'
              size='medium'
              padding={{ p: 0 }}
              onClick={() => setTermsOpen(true)}
            >
              {t('generalPosition')}
            </Button>
            <Button
              variant='subtle'
              textColor='white'
              size='medium'
              padding={{ p: 0 }}
              external
              to='#'
            >
              {t('affiliateProgram')}
            </Button>
          </div>

          <PrivacyPolicyModal
            isOpen={privacyPolicyOpen}
            onClose={() => setPrivacyPolicyOpen(false)}
          />

          <TermsAndConditionsModal
            isOpen={termsOpen}
            onClose={() => setTermsOpen(false)}
          />
        </div>
        <Divider noMargin />
        {/* <div className={s.payments}>
          {payments.map((payment, index) => (
            <img src={payment.img} alt={payment.alt} key={index} className={s.paymentImg} />
          ))}
        </div> */}
        {/* <Divider noMargin /> */}
        <div className={s.marks}>
          {marks.map((mark, index) => (
            <Button key={index} to={mark.href} variant='text' external>
              <img src={mark.img} alt={mark.alt} className={s.markImg} />
            </Button>
          ))}
        </div>
        <Divider noMargin />
        <div className={s.rights}>
          <span>Ⓒ</span>
          <span>{currentYear}</span>
          <span>•</span>
          <span>GmsPlay.pro</span>
          <span>•</span>
          <span>{t('allRightReserved')}</span>
        </div>
      </WidthWrapper>
      <div className={s.supportWrapper}>
        <WidthWrapper className={s.support}>
          <p className={s.label}>24/7 {t('support')}</p>
          <Button
            variant='green'
            padding={{ px: '30px' }}
            size='small'
            borderRadius='small'
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
