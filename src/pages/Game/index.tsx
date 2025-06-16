import React, { useRef, useEffect, useReducer } from 'react';
import Lottie from 'react-lottie-player';
import type { AnimationItem } from 'lottie-web';
import { useTranslation } from 'react-i18next';
import ActivePlayersTable from '@/components/shared/ActivePlayersTable';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import WidthWrapper from '@/components/ui/WidthWrapper';
import PlayButton from '@/components/shared/PlayButton';
import ProgressBar from '@/components/ui/ProgressBar';
import DoorGrid, { RowState } from '@/components/shared/DoorGrid';
import HowToPlayModal from '@/components/modals/HowToPlayModal';
import FlyingBomb from '@/components/shared/FlyingBomb';
import Loader from '@/components/ui/Loader';
import BombDropdown from './components/BombDropdown';
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useAudio } from '@/hooks/useAudio';
import { useAppSelector } from '@/store/hooks';
import { notificationService } from '@/services/notification';
import { getUserBalance, getUserToken, getUserSelectedBalance } from '@/store/helpers/selectors';
import { DoorState } from '@/components/shared/DoorGrid';
import { initialGameState, gameReducer, GameActionType } from './utils';
import { ANIMATIONS_TYPE, ANIMATIONS, SOUND_TYPE } from '@/constants';
import { getBombPoints } from '@/utils';
import { BalanceType, type BombsCount, type CellNumber, type RowNumber } from '@/types';
import { gameApi, multipliersApi } from '@/api';

import s from './styles.module.scss'

const bombImg = 'imgs/game/bombHappy.svg';
const chestImg = 'imgs/game/chest.svg';

const Game: React.FC = () => {
  const { t } = useTranslation();
  const token = useAppSelector(getUserToken);
  const selectedBalance = useAppSelector(getUserSelectedBalance);
  const balance = useAppSelector(getUserBalance);
  const [game, dispatch] = useReducer(gameReducer, initialGameState);

  const isDemo = selectedBalance === BalanceType.DEMO;

  const {
    isLoading,
    progress,
    bomb,
    currentAnimation,
    status,
    level,
    bet,
    bombsCount,
    grid,
    multipliers,
  } = game;

  const {
    isMuted,
    toggleMute,
    playSound,
    playBackgroundMusic,
    stopBackgroundMusic,
  } = useAudio();

  const lottieRef = useRef<AnimationItem | null>(null);

  const playGrandma = () => {
    dispatch({
      type: GameActionType.SET_ANIMATION,
      payload: { loop: false, play: true, type: ANIMATIONS_TYPE.GRANDMA }
    });
    playBackgroundMusic(SOUND_TYPE.GAME);
  };

  const playLoser = () => {
    dispatch({
      type: GameActionType.SET_ANIMATION,
      payload: { loop: true, play: true, type: ANIMATIONS_TYPE.LOSER }
    });
    playSound(SOUND_TYPE.LOSE);
  };

  const playPrize = () => {
    dispatch({
      type: GameActionType.SET_ANIMATION,
      payload: { loop: true, play: true, type: ANIMATIONS_TYPE.PRIZE }
    });
    playSound(SOUND_TYPE.VICTORY);
  };

  const launchBomb = (door: HTMLElement, type: DoorState = DoorState.OPEN) => {
    // @ts-ignore
    const grandmaWrapper = lottieRef.current?.wrapper as HTMLElement;
    if (!grandmaWrapper) return;
    const { from, to } = getBombPoints(grandmaWrapper, door);
    const onComplete = () => {
      dispatch({ type: GameActionType.SET_BOMB, payload: null });
      if (type === DoorState.BOMB) {
        playLoser();
      }
      if (type === DoorState.PRIZE) {
        playPrize();
      }
    };
    dispatch({
      type: GameActionType.SET_BOMB,
      payload: { from, to, onComplete }
    });
  };

  const startGame = async () => {
    // checks
    if (!token) {
      notificationService.warning(t('notifications.game.login'));
      return;
    }

    if (bet === 0 || bombsCount === 0) {
      notificationService.warning(t('notifications.game.empty'));
      return;
    }

    if (Number(balance) < bet) {
      notificationService.warning(t('notifications.game.notEnoughBalance'));
      return;
    }

    const getStartGame = async () => {
      try {
        const res = await gameApi.startGame({ bet, bombsCount }, isDemo);
        const { } = res.data;
        dispatch({ type: GameActionType.START_GAME });
        playGrandma();
      } catch (error) {
        notificationService.error(t('notifications.game.startGameError'));
        console.error('Error starting game:', error);
      }
    };

    await getStartGame();
  };

  const openDoor = async (e: React.MouseEvent<HTMLDivElement>, level: RowNumber, cellId: CellNumber) => {
    const doorElement = e.currentTarget;
    const doorState = DoorState.OPEN;

    const getOpenDoor = async () => {
      try {
        const res = await gameApi.openCell(level, cellId, isDemo);
        const { } = res.data;

        launchBomb(doorElement, doorState);
        dispatch({
          type: GameActionType.OPEN_DOOR,
          payload: { level, cellId, state: doorState }
        });
      } catch (error) {
        notificationService.error(t('notifications.game.openDoorError'));
        console.error('Error opening door:', error);
      }
    };

    await getOpenDoor();
  }

  const stopGame = async () => {
    const getStopGame = async () => {
      try {
        const res = await gameApi.stopGame(level!, isDemo);
        const { } = res.data;

        dispatch({ type: GameActionType.STOP_GAME });
        stopBackgroundMusic();
      } catch (error) {
        notificationService.error(t('notifications.game.stopGameError'));
        console.error('Error stopping game:', error);
      }
    };

    await getStopGame();
  };

  const setBombsCount = (count: BombsCount) => {
    dispatch({ type: GameActionType.SET_BOMBS_COUNT, payload: count });
  };

  const setBet = (value: number) => {
    dispatch({ type: GameActionType.SET_BET, payload: value });
  };

  const setProgress = (value: number) => {
    dispatch({ type: GameActionType.SET_PROGRESS, payload: value });
  };

  const setLoading = (value: boolean) => {
    dispatch({ type: GameActionType.SET_LOADING, payload: value });
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      let isOk = true;

      const getMultipliers = async () => {
        try {
          const res = await multipliersApi.getMultipliers();
          const { data } = res.data;
          dispatch({ type: GameActionType.SET_MULTIPLIERS, payload: data });
        } catch (error) {
          isOk = false;
        }
      };

      const getGameState = async () => {
        try {
          const res = await gameApi.getState();
          const {} = res.data;
          
        } catch (error) {
          isOk = false;
        }
      };

      if (isOk) await getMultipliers();
      if (isOk && token) await getGameState();

      if (!isOk) {
        notificationService.error(t('notifications.game.error'));
        return;
      };

      setLoading(false);
    };

    init();

    return () => {
      stopBackgroundMusic();
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
              <span className={s.count}>{bombsCount}</span>
              <img src={bombImg} alt="bomb" className={s.bomb} />
            </div>
          </div>

          <div className={s.game}>
            <DoorGrid>
              {Object.entries(grid).map(([rowKey, row]) => (
                <DoorGrid.Row
                  key={`row-${rowKey}`}
                  state={level === Number(rowKey) ? RowState.ACTIVE : RowState.DISABLED}
                >
                  {Object.entries(row).map(([cellKey, cell]) => {

                    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
                      if (level !== Number(rowKey)) return;
                      openDoor(e, Number(rowKey) as RowNumber, Number(cellKey) as CellNumber);
                    };

                    return (
                      <DoorGrid.Door
                        key={`cell-${cell}-${rowKey}-${cellKey}`}
                        state={cell}
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

            <div className={s.startGame}>
              <span className={s.label}>{t('startGameToPlay')}</span>
            </div>
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
                  {(bet * (bombsCount ? multipliers?.[bombsCount]?.[3] || 1 : 1)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $
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
              value={bombsCount}
              setValue={setBombsCount}
              disabled={false}
            />
            <NumberInput
              value={bet}
              onChange={setBet}
              min={0}
              step={1}
              disabled={false}
            />
            <PlayButton
              size='medium'
              onClick={startGame}
              text={t('startGame')}
              disabled={false}
            />
          </div>
        </Loader>
      </WidthWrapper>

      <ActivePlayersTable className={s.activePlayersTable} />

      {!isLoading && <HowToPlayModal />}
    </WidthWrapper>
  );
};

export default Game;
