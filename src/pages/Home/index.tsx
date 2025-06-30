import React from 'react';
import { Pages } from '@/constants';
import { WidthWrapper } from '@/components/ui';
import {
  HomeSwiper,
  TopPlayersButton,
  HowToPlayButton,
  PlayButton,
  ActivePlayersTable,
} from '@/components/shared';

import s from './styles.module.scss';

const Home: React.FC = () => {
  return (
    <WidthWrapper>
      <HomeSwiper className={s.swiper} />
      <div className={s.topButtons}>
        <TopPlayersButton />
        <HowToPlayButton />
      </div>
      <PlayButton to={Pages.Game} className={s.playButton} />
      <ActivePlayersTable />
    </WidthWrapper>
  );
};

export default Home;
