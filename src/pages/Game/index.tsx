import ActivePlayersTable from '@/components/shared/ActivePlayersTable';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import LottiePlayer from '@/components/ui/LottiePlayer';
import type { LottiePlayerMethods } from '@/components/ui/LottiePlayer';
import WidthWrapper from '@/components/ui/WidthWrapper';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import s from './styles.module.scss'
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import PlayButton from '@/components/shared/PlayButton';
import BombDropdown from './components/BombDropdown';
import ProgressBar from '@/components/ui/ProgressBar';
import DoorGrid from '@/components/shared/DoorGrid';
import type { DoorState } from '@/components/shared/DoorGrid';

const bomb = 'imgs/game/bombHappy.svg';
const chest = 'imgs/game/chest.svg';

const DOOR_GRID: number[][] = [
  [9, 10, 11, 12],
  [5, 6, 7, 8],
  [1, 2, 3, 4]
];

const ANIMATIONS = {
  GRANDMA: 'https://lottie.host/ede8a463-190f-48c8-8888-8c163fe393b0/8DFN7sP0za.json',
  LOSER: 'https://lottie.host/1d78b59a-d4ac-4439-8670-de3656a6e2a5/efm6X6xQf7.json',
  PRIZE: 'https://lottie.host/d54aa7cf-dc80-465c-8175-871edb269141/zdqnzQUoyp.json'
};

const Game: React.FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState<keyof typeof ANIMATIONS>('GRANDMA');
  const [progress, setProgress] = useState(30);
  const [isVolume, setIsVolume] = useState(true);
  const [bombCount, setBombCount] = useState(0);

  const lottieRef = useRef<LottiePlayerMethods>(null);

  const playGrandma = () => {
    setCurrentAnimation('GRANDMA');
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, 100);
  };

  const playLoser = () => {
    setCurrentAnimation('LOSER');
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, 100);
  };

  const playPrize = () => {
    setCurrentAnimation('PRIZE');
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }, 100);
  };

  const activeRow = 2;
  const activeCell = 2;

  return (
    <WidthWrapper>
      <WidthWrapper maxWidth={992} noPadding>
        <div className={s.top}>
          <div className={s.left}>
            <span className={s.label}>{t('maximumPrize')}</span>
            <ProgressBar value={progress} />
          </div>
          <div className={s.bombCount}>
            <span className={s.count}>0</span>
            <img src={bomb} alt="bomb" className={s.bomb} />
          </div>
        </div>

        <DoorGrid>
          {DOOR_GRID.map((row, rowIndex) => (
            <DoorGrid.Row 
              key={`row-${rowIndex}`}
              isActive={rowIndex === activeRow}
            >
              {row.map((cellId) => {
                let doorState: DoorState = 'closed';
                
                if (rowIndex < activeRow || rowIndex > activeRow) {
                  doorState = 'locked';
                } else if (rowIndex === activeRow) {
                  if (cellId === activeCell) {
                    doorState = 'bomb';
                  } else {
                    doorState = 'closed';
                  }
                }
                
                return (
                  <DoorGrid.Door 
                    key={`cell-${cellId}`}
                    state={doorState}
                    isActive={rowIndex === activeRow && cellId === activeCell}
                    onClick={() => {
                      console.log(`Клік на двері ${cellId} в рядку ${rowIndex}`);
                    }}
                  />
                );
              })}
            </DoorGrid.Row>
          ))}
        </DoorGrid>

        <div className={s.grandma}>
          <LottiePlayer
            ref={lottieRef}
            src={ANIMATIONS.GRANDMA}
            width="200px"
            height="200px"
          />
        </div>

        <div className={s.prize}>
          <div className={s.left}>
            <img src={chest} alt="chest" className={s.chest} />
            <div className={s.prizeValue}>
              <span className={s.label}>
                {t('maximumPrize')}:
              </span>
              <span className={s.value}>
                {value} $
              </span>
            </div>
          </div>
          <Button
            size='large'
            variant='outline'
            borderRadius='small'
            onClick={() => setIsVolume(!isVolume)}
            icon={isVolume ? <FaVolumeUp /> : <FaVolumeMute />}
          />
        </div>

        <div className={s.settings}>
          <BombDropdown
            value={bombCount}
            setValue={setBombCount}
          />
          <NumberInput
            value={value}
            onChange={setValue}
            min={0}
            step={1}
          />
          <PlayButton
            size='medium'
            onClick={() => {
              if (value > 0) {
                playGrandma();
              }
            }}
          />
        </div>
      </WidthWrapper>
      <ActivePlayersTable />
    </WidthWrapper>
  );
};

export default Game;
