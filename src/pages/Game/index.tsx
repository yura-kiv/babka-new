import ActivePlayersTable from '@/components/shared/ActivePlayersTable';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import Lottie from 'react-lottie-player';
import { type AnimationItem } from 'lottie-web';
import WidthWrapper from '@/components/ui/WidthWrapper';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import s from './styles.module.scss'
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useAudio } from '@/hooks/useAudio';
import PlayButton from '@/components/shared/PlayButton';
import BombDropdown from './components/BombDropdown';
import ProgressBar from '@/components/ui/ProgressBar';
import DoorGrid, { RowState } from '@/components/shared/DoorGrid';
import { DoorState } from '@/components/shared/DoorGrid';
import { ANIMATIONS } from '@/constants';
import HowToPlayModal from '@/components/modals/HowToPlayModal';
import FlyingBomb, { type FlyingBombParams } from '@/components/shared/FlyingBomb';
import { getBombPoints } from '@/utils';
import Loader from '@/components/ui/Loader';
import { useAppSelector } from '@/store/hooks';
import { notificationService } from '@/services/notification';
import { getDoorState } from './utils';
import { GameStatusFront, type RowNumber } from '@/types';
import {
  getUserData,
  getMultipliers,
  getGameState,
  getUserBalance
} from '@/store/helpers/selectors';
import {
  startGame as startGameAction,
  openCell as openCellAction,
  stopGame as stopGameAction,
  resetGame as resetGameAction,
  loadMultipliers,
  setBombsCount,
  setBet,
} from '@/store/helpers/actions'

const bombImg = 'imgs/game/bombHappy.svg';
const chestImg = 'imgs/game/chest.svg';

const DOOR_GRID: number[][] = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];

const Game: React.FC = () => {
  const { t } = useTranslation();
  const game = useAppSelector(getGameState);
  const user = useAppSelector(getUserData);
  const balance = useAppSelector(getUserBalance);
  const multipliers = useAppSelector(getMultipliers);

  const isLoading = false; // preload data for start game
  const progress = game.activeRow ? (game.activeRow + 1) / DOOR_GRID.length * 100 : 0;

  const [bomb, setBomb] = useState<FlyingBombParams | null>(null);
  const {
    isMuted,
    toggleMute,
    playSound,
    playBackgroundMusic,
    stopBackgroundMusic,
  } = useAudio();
  const [currentAnimation, setCurrentAnimation] = useState<{
    loop: boolean;
    play: boolean;
    type: keyof typeof ANIMATIONS;
  }>({ loop: false, play: false, type: 'GRANDMA' });

  const lottieRef = useRef<AnimationItem | undefined>(undefined);

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

  const launchBomb = (door: HTMLElement, type: DoorState = DoorState.OPEN) => {
    // @ts-ignore
    const grandmaWrapper = lottieRef.current?.wrapper as HTMLElement;
    if (!grandmaWrapper) return;
    const { from, to } = getBombPoints(grandmaWrapper, door);
    const onComplete = () => {
      setBomb(null);
      if (type === DoorState.BOMB) {
        playLoser();
      }
      if (type === DoorState.PRIZE) {
        playPrize();
      }
    };
    setBomb({ from, to, onComplete });
  };

  const openDoor = async (e: React.MouseEvent<HTMLDivElement>, cellId: number) => {
    const res = await openCellAction(cellId);
    // console.log('res', res);
    // launchBomb(e.currentTarget); // door type here to play throw result sound
  }

  const startGame = async () => {
    try {
      // checks
      if (!user.isAuthenticated) {
        notificationService.warning(t('notifications.game.login'));
        return;
      }
      if (game.bet === 0 || game.bombsCount === 0) {
        notificationService.warning(t('notifications.game.empty'));
        return;
      }
      if (balance < game.bet) {
        notificationService.warning(t('notifications.game.notEnoughBalance'));
        return;
      }

      const res = await startGameAction();
      // playGrandma();
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const stopGame = () => {
    stopGameAction();
  };

  useEffect(() => {
    loadMultipliers();

    if (game.status === GameStatusFront.PROGRESS) {
      playGrandma();
    }

    return () => {
      stopBackgroundMusic();

      if (game.status === GameStatusFront.INITIAL) {
        setBet(0);
        setBombsCount(0);
      }
    };
  }, []);

  return (
    <WidthWrapper>
      <WidthWrapper maxWidth={992} noPadding relative>
        <Loader isLoading={isLoading} type="absolute">
          <div className={s.top}>
            <div className={s.left}>
              <span className={s.label}>{t('maximumPrizeProgress')}</span>
              <ProgressBar value={progress} />
            </div>
            <div className={s.bombsCount}>
              <span className={s.count}>{game.bombsCount}</span>
              <img src={bombImg} alt="bomb" className={s.bomb} />
            </div>
          </div>

          <div className={s.game}>
            <DoorGrid>
              {DOOR_GRID.map((row, rowIdx) => (
                <DoorGrid.Row
                  key={`row-${row}`}
                  state={game.status === GameStatusFront.PROGRESS && game.activeRow === rowIdx ? RowState.ACTIVE : RowState.DISABLED}
                >
                  {row.map((cell) => {
                    const state = getDoorState(game, rowIdx as RowNumber, cell);

                    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
                      if (game.status !== GameStatusFront.PROGRESS || game.activeRow !== rowIdx) return;
                      openDoor(e, cell);
                    };

                    return (
                      <DoorGrid.Door
                        key={`cell-${cell}`}
                        state={state}
                        onClick={onClick}
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

            {game.status === GameStatusFront.INITIAL &&
              <div className={s.startGame}>
                <span className={s.label}>{t('startGame')}</span>
              </div>}
          </div>

          {bomb && (
            <FlyingBomb
              withSound
              params={bomb}
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
                  {game.bet} $
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
              value={game.bombsCount}
              setValue={setBombsCount}
              disabled={game.status === GameStatusFront.PROGRESS}
            />
            <NumberInput
              value={game.bet}
              onChange={setBet}
              min={0}
              step={1}
              disabled={game.status === GameStatusFront.PROGRESS}
            />
            <PlayButton
              size='medium'
              onClick={game.status === GameStatusFront.PROGRESS ? stopGame : startGame}
              text={game.status === GameStatusFront.PROGRESS ? t('stopGame') : undefined}
              disabled={
                game.isLoading
                || game.bet === 0
                || game.bombsCount === 0
              }
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
