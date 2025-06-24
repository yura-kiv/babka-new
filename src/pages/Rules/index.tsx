import PageTitle from '@/components/ui/PageTitle';
import WidthWrapper from '@/components/ui/WidthWrapper';
import { useTranslation } from 'react-i18next';
import DoorGrid from '@/components/shared/DoorGrid';
import RulesGameAnimation from '@/components/shared/RulesGameAnimation';
import s from './styles.module.scss';

const Rules: React.FC = () => {
  const { t } = useTranslation();

  return (
    <WidthWrapper>
      <PageTitle
        title={t('gameRules')}
        subtitle={t('generalRules')}
        as='h1'
        className={s.title}
      />

      <RulesGameAnimation />

      <WidthWrapper maxWidth={998} className={s.rules}>
        <p>{t('rules.content1')}</p>
        <p>{t('rules.content2')}</p>
        <p>{t('rules.content3')}</p>
        <p>{t('rules.content4')}</p>
      </WidthWrapper>
    </WidthWrapper>
  );
};

export default Rules;
