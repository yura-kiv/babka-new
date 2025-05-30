import React from 'react';
import HomeSwiper from '@/components/shared/HomeSwiper';
import TopPlayersButton from '@/components/shared/TopPlayersButton';
import HowToPlayButton from '@/components/shared/HowToPlayButton';
import PlayButton from '@/components/shared/PlayButton';
import s from './styles.module.scss'
import WidthWrapper from '@/components/ui/WidthWrapper';
import ActivePlayersTable from '@/components/shared/ActivePlayersTable';

const Home: React.FC = () => {
  return (
    <WidthWrapper>
      <HomeSwiper />
      <div className={s.topButtons}>
        <TopPlayersButton />
        <HowToPlayButton />
      </div>
      <PlayButton />
      <ActivePlayersTable />
    </WidthWrapper>
  );
};

export default Home;
