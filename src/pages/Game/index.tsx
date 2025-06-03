import ActivePlayersTable from '@/components/shared/ActivePlayersTable';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import Lottie from 'react-lottie-player';
import { type AnimationItem } from 'lottie-web';
import WidthWrapper from '@/components/ui/WidthWrapper';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import s from './styles.module.scss'
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useAudio } from '@/hooks/useAudio';
import PlayButton from '@/components/shared/PlayButton';
import BombDropdown from './components/BombDropdown';
import ProgressBar from '@/components/ui/ProgressBar';
import DoorGrid from '@/components/shared/DoorGrid';
import type { DoorState } from '@/components/shared/DoorGrid';
import { ANIMATIONS } from '@/constants';
import HowToPlayModal from '@/components/modals/HowToPlayModal';
import FlyingBomb, { type FlyingBombCoords } from '@/components/shared/FlyingBomb';
import { getBombPoints } from '@/utils';
import Loader from '@/components/ui/Loader';

const bombImg = 'imgs/game/bombHappy.svg';
const chestImg = 'imgs/game/chest.svg';

const DOOR_GRID: number[][] = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];

const Game: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [bombCount, setBombCount] = useState(0);
  const [progress, setProgress] = useState(30);
  const { isMuted, toggleMute, playSound, playBackgroundMusic, stopBackgroundMusic } = useAudio();
  const [currentAnimation, setCurrentAnimation] = useState<{
    loop: boolean;
    play: boolean;
    type: keyof typeof ANIMATIONS;
  }>({ loop: false, play: false, type: 'GRANDMA' });
  const [bomb, setBomb] = useState<FlyingBombCoords | null>(null);

  const lottieRef = useRef<AnimationItem | undefined>(undefined);
  const lastSelectedDoor = useRef<{ rowIndex: number; cellId: number, type: DoorState } | null>(null);

  const playGrandma = () => {
    setCurrentAnimation({ loop: false, play: true, type: 'GRANDMA' });
    playBackgroundMusic('game');
  };

  const playLoser = () => {
    setCurrentAnimation({ loop: true, play: true, type: 'LOSER' });
    playSound('lose');
  };

  const playPrize = () => {
    setCurrentAnimation({ loop: true, play: true, type: 'PRIZE' });
    playSound('victory');
  };

  const launchBomb = useCallback((doorElement: HTMLElement, rowIndex: number, cellId: number, type: DoorState) => {
    // @ts-ignore
    const grandmaWrapper = lottieRef.current?.wrapper as HTMLElement;
    if (!grandmaWrapper) return;
    lastSelectedDoor.current = { rowIndex, cellId, type };
    const { from, to } = getBombPoints(grandmaWrapper, doorElement);
    setBomb({ from, to });
  }, [playSound]);

  const handleBombAnimationComplete = () => {
    setBomb(null);
    const { type } = lastSelectedDoor.current || {};
    if (type === 'bomb') {
      playLoser();
    }
    if (type === 'prize') {
      playPrize();
    }
    lastSelectedDoor.current = null;
  };

  const startGame = () => {
    playGrandma();
  };

  useEffect(() => {
    return () => {
      stopBackgroundMusic();
    };
  }, [stopBackgroundMusic]);

  const activeRow = 0;
  const bombCell = 2;
  const prizeCell = 1;

  return (
    <WidthWrapper>
      <WidthWrapper maxWidth={992} noPadding relative>
        <Loader isLoading={isLoading} type="absolute">
          <div className={s.top}>
            <div className={s.left}>
              <span className={s.label}>{t('maximumPrize')}</span>
              <ProgressBar value={progress} />
            </div>
            <div className={s.bombCount}>
              <span className={s.count}>{bombCount}</span>
              <img src={bombImg} alt="bomb" className={s.bomb} />
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
                    if (cellId === bombCell) {
                      doorState = 'bomb';
                    } else if (cellId === prizeCell) {
                      doorState = 'prize';
                    } else {
                      doorState = 'closed';
                    }
                  }

                  return (
                    <DoorGrid.Door
                      key={`cell-${cellId}`}
                      state={doorState}
                      onClick={(e) => {
                        if (rowIndex !== activeRow) return;
                        launchBomb(e.currentTarget, rowIndex, cellId, doorState);
                      }}
                    />
                  );
                })}
              </DoorGrid.Row>
            ))}
          </DoorGrid>

          <Lottie
            ref={lottieRef}
            path={ANIMATIONS[currentAnimation.type]}
            loop={currentAnimation.loop}
            play={currentAnimation.play}
            style={{ height: '200px', width: '200px', margin: '0 auto' }}
          />

          {bomb && (
            <FlyingBomb
              withSound
              coords={bomb}
              onAnimationComplete={handleBombAnimationComplete}
            />
          )}

          <div className={s.prize}>
            <div className={s.left}>
              <img src={chestImg} alt="chest" className={s.chest} />
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
              onClick={toggleMute}
              icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
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
              onClick={startGame}
            />
          </div>
        </Loader>
      </WidthWrapper>

      <ActivePlayersTable />
      {!isLoading && <HowToPlayModal />}
    </WidthWrapper>
  );
};

export default Game;
