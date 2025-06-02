import ActivePlayersTable from '@/components/shared/ActivePlayersTable';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import LottiePlayer from '@/components/ui/LottiePlayer';
import type { LottiePlayerMethods } from '@/components/ui/LottiePlayer';
import WidthWrapper from '@/components/ui/WidthWrapper';
import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import s from './styles.module.scss'
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import PlayButton from '@/components/shared/PlayButton';
import BombDropdown from './components/BombDropdown';
import ProgressBar from '@/components/ui/ProgressBar';
import DoorGrid from '@/components/shared/DoorGrid';
import type { DoorState } from '@/components/shared/DoorGrid';
import { ANIMATIONS } from '@/constants';
import HowToPlayModal from '@/components/modals/HowToPlayModal';
import FlyingBomb from '@/components/shared/FlyingBomb';


const bomb = 'imgs/game/bombHappy.svg';
const chest = 'imgs/game/chest.svg';

const DOOR_GRID: number[][] = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];

const Game: React.FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(30);
  const [isVolume, setIsVolume] = useState(true);
  const [bombCount, setBombCount] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState<keyof typeof ANIMATIONS>('GRANDMA');

  const [bombAnimation, setBombAnimation] = useState<{
    isActive: boolean;
    startPosition: { x: number; y: number };
    targetPosition: { x: number; y: number };
  } | null>(null);

  const lottieRef = useRef<LottiePlayerMethods>(null);
  const grandmaRef = useRef<HTMLDivElement>(null);

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

  const launchBomb = useCallback((doorElement: HTMLElement) => {
    if (!grandmaRef.current) return;

    const scrollY = window.scrollY;

    const grandmaRect = grandmaRef.current.getBoundingClientRect();
    const grandmaCenter = {
      x: grandmaRect.left + grandmaRect.width / 2,
      y: grandmaRect.top + grandmaRect.height / 2 + scrollY
    };

    const doorRect = doorElement.getBoundingClientRect();
    const doorBottom = {
      x: doorRect.left + doorRect.width / 2,
      y: doorRect.top + doorRect.height - 20 + scrollY,
    };

    setBombAnimation({
      isActive: true,
      startPosition: grandmaCenter,
      targetPosition: doorBottom
    });
  }, []);

  const activeRow = 0;
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
              state={rowIndex === activeRow ? 'active' : 'disabled'}
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
                    onClick={(e) => {
                      console.log(`Клік на двері ${cellId} в рядку ${rowIndex}`);
                      launchBomb(e.currentTarget);
                    }}
                  />
                );
              })}
            </DoorGrid.Row>
          ))}
        </DoorGrid>

        <LottiePlayer
          lottieRef={lottieRef}
          containerRef={grandmaRef}
          src={ANIMATIONS.GRANDMA}
          width="200px"
          height="200px"
        />

        {bombAnimation && bombAnimation.isActive && (
          <FlyingBomb
            startPosition={bombAnimation.startPosition}
            targetPosition={bombAnimation.targetPosition}
            onAnimationComplete={() => {
              setBombAnimation(null);
            }}
          />
        )}

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
            disabled={value === 0 || bombCount === 0}
            onClick={() => {
              playGrandma();
            }}
          />
        </div>
      </WidthWrapper>
      <ActivePlayersTable />
      <HowToPlayModal />
    </WidthWrapper>
  );
};

export default Game;
