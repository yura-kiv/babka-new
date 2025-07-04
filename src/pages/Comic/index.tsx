import { useTranslation } from 'react-i18next';
import { Pages } from '@/constants';
import { WidthWrapper, PageTitle } from '@/components/ui';
import {
  PlayButton,
  ComicCard,
  type ComicCardProps,
} from '@/components/shared';
import s from './styles.module.scss';

const cards: ComicCardProps[] = [
  {
    img: 'imgs/comic/grandma.svg',
    align: 'center',
  },
  {
    text: 'comic.content1',
    img: 'imgs/comic/wizard.svg',
  },
  {
    text: 'comic.content2',
    img: 'imgs/comic/mountains.svg',
  },
  {
    text: 'comic.content3',
    img: 'imgs/comic/castle.svg',
  },
  {
    text: 'comic.content4',
    img: 'imgs/comic/doorBoom.svg',
  },
  {
    text: 'comic.content5',
    align: 'center',
  },
];

const Comic: React.FC = () => {
  const { t } = useTranslation();

  return (
    <WidthWrapper>
      <PageTitle title={t('comic')} subtitle={t('comic.subTitle')} as='h1' />
      <div className={s.cards}>
        {cards.map((card, index) => (
          <ComicCard
            key={index}
            {...card}
            align={card.align || (index % 2 !== 0 ? 'left' : 'right')}
          />
        ))}
      </div>
      <PlayButton to={Pages.Game} className={s.playButton} />
    </WidthWrapper>
  );
};

export default Comic;
