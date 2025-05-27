import React from 'react';
import HomeSwiper from '@/components/HomeSwiper';
import TopPlayersButton from '@/components/TopPlayersButton';
import HowToPlayButton from '@/components/HowToPlayButton';
import PlayButton from '@/components/PlayButton';
import s from './styles.module.scss'
import WidthWrapper from '@/components/WidthWrapper';

const Home: React.FC = () => {
  return (
    <WidthWrapper>
      <HomeSwiper />
      <div className={s.topButtons}>
        <TopPlayersButton />
        <HowToPlayButton />
      </div>
      <PlayButton />
    </WidthWrapper>
  );
};

export default Home;
