import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeSwiper from '../../components/HomeSwiper';
import TopPlayersButton from '../../components/TopPlayersButton';
import HowToPlayButton from '../../components/HowToPlayButton';
import PlayButton from '../../components/PlayButton';

import s from './styles.module.scss'

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <HomeSwiper />
      <div className={s.topButtons}>
        <TopPlayersButton />
        <HowToPlayButton />
      </div>
      <PlayButton />
    </>
  );
};

export default Home;
