import React, { useRef, useEffect, useReducer } from 'react';
import Lottie from 'react-lottie-player';
import { type AnimationItem } from 'lottie-web';
import { useTranslation } from 'react-i18next';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useAudio, useWindowSize, useScroll } from '@/hooks';
import { notificationService } from '@/services';
import { useAppSelector } from '@/store/hooks';
import { getBombPoints, getMoneyView } from '@/utils';
import { gameApi, multipliersApi, userApi } from '@/api';
import {
  ANIMATIONS_TYPE,
  ANIMATIONS,
  SOUND_TYPE,
  BREAKPOINT_SM,
} from '@/constants';
import { setUserState } from '@/store/helpers/actions';
import {
  getUserBalance,
  getUserToken,
  getUserSelectedBalance,
} from '@/store/helpers/selectors';
import { HowToPlayModal } from '@/components/modals';
import {
  Button,
  WidthWrapper,
  NumberInput,
  ProgressBar,
  Loader,
} from '@/components/ui';
import {
  PlayButton,
  DoorGrid,
  DoorState,
  RowState,
  ActivePlayersTable,
  FlyingBomb,
  type FlyingBombParams,
} from '@/components/shared';
import {
  CellTypeResponse,
  GameResultResponse,
  GameStatusFront,
  type BombsCount,
  type CellNumber,
  type GameStateResponse,
  type MultipliersResponse,
  type RowNumber,
  type StartGameResponse,
} from '@/types';
import { initialGameState, gameReducer, GameActionType } from './utils';
import BombDropdown from './components/BombDropdown';

import s from './styles.module.scss';

const bombImg = 'imgs/game/bombHappy.svg';
const chestImg = 'imgs/game/chest.svg';

const Game: React.FC = () => {
  const { t } = useTranslation();
  const windowSize = useWindowSize();
  const token = useAppSelector(getUserToken);
  const appBalanceType = useAppSelector(getUserSelectedBalance);
  const appBalance = useAppSelector(getUserBalance);
  const [game, dispatch] = useReducer(gameReducer, initialGameState);
  const lottieRef = useRef<AnimationItem | null>(null);
  const isActionBlocked = useRef(false);
  const { scrollToElement } = useScroll();
  const topRef = useRef<HTMLDivElement>(null);
  const {
    isMuted,
    toggleMute,
    playSound,
    playBackgroundMusic,
    stopBackgroundMusic,
  } = useAudio();

  const {
    isOk,
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
    isProcessing,
    balanceType,
  } = game;

  const grandmaSize = windowSize.width < BREAKPOINT_SM ? '40vw' : '200px';

  const blockActions = () => {
    isActionBlocked.current = true;
  };

  const unblockActions = () => {
    isActionBlocked.current = false;
  };

  const playGrandma = () => {
    dispatch({
      type: GameActionType.SET_ANIMATION,
      payload: {
        loop: false,
        play: true,
        type: ANIMATIONS_TYPE.GRANDMA,
      },
    });
    playBackgroundMusic(SOUND_TYPE.GAME);
  };

  const playLoser = () => {
    dispatch({
      type: GameActionType.SET_ANIMATION,
      payload: {
        loop: true,
        play: true,
        type: ANIMATIONS_TYPE.LOSER,
      },
    });
    playSound(SOUND_TYPE.LOSE);
  };

  const playPrize = () => {
    dispatch({
      type: GameActionType.SET_ANIMATION,
      payload: {
        loop: true,
        play: true,
        type: ANIMATIONS_TYPE.PRIZE,
      },
    });
    playSound(SOUND_TYPE.VICTORY);
  };

  const setStartGame = (data: StartGameResponse) => {
    dispatch({ type: GameActionType.START_GAME, payload: data });
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

  const setContinueGame = (data: GameStateResponse) => {
    dispatch({ type: GameActionType.CONTINUE_GAME, payload: data });
  };

  const setMultipliers = (data: MultipliersResponse['data']) => {
    dispatch({ type: GameActionType.SET_MULTIPLIERS, payload: data });
  };

  const setIsProcessing = (value: boolean) => {
    dispatch({ type: GameActionType.SET_PROCESSING, payload: value });
  };

  const setIsOk = (value: boolean) => {
    dispatch({ type: GameActionType.SET_IS_OK, payload: value });
  };

  const setStatus = (value: GameStatusFront) => {
    dispatch({ type: GameActionType.SET_STATUS, payload: value });
  };

  const updateBalance = async () => {
    try {
      const res = await userApi.getBalance();
      const {
        data: { demo = 0, realbalance = 0 },
      } = res.data;
      setUserState({ balance: Number(realbalance), demoBalance: Number(demo) });
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const setOpenDoor = (
    level: RowNumber,
    cellId: CellNumber,
    type: CellTypeResponse,
    newLevel?: RowNumber
  ) => {
    dispatch({
      type: GameActionType.OPEN_DOOR,
      payload: { level, cellId, type, newLevel },
    });
  };

  const setBomb = (payload: FlyingBombParams | null) => {
    dispatch({ type: GameActionType.SET_BOMB, payload });
  };

  const launchBomb = (door: HTMLElement, onComplete: () => void) => {
    // @ts-ignore
    const grandmaWrapper = lottieRef.current?.wrapper as HTMLElement;

    if (!grandmaWrapper) return;

    const { from, to } = getBombPoints(grandmaWrapper, door);
    const _onComplete = () => {
      setBomb(null);
      onComplete();
    };
    setBomb({ from, to, onComplete: _onComplete });
  };

  const startGame = async () => {
    if (isActionBlocked.current || isProcessing || isLoading) return;

    // checks
    if (!token) {
      notificationService.warning(t('notifications.game.login'));
      return;
    }

    if (bet === 0 || bombsCount === 0) {
      notificationService.warning(t('notifications.game.empty'));
      return;
    }

    if (Number(appBalance) < bet) {
      notificationService.warning(t('notifications.game.notEnoughBalance'));
      return;
    }

    const getStartGame = async () => {
      try {
        const res = await gameApi.startGame(
          { bet, bombsCount },
          appBalanceType
        );
        const { data, status } = res;

        if (status === 200) {
          const {
            data: { balance = 0, userDemoBalance = 0 },
          } = data;
          setUserState({
            demoBalance: Number(userDemoBalance),
            balance: Number(balance),
          });
          setStartGame(data);
          playGrandma();
          scrollToElement(topRef.current);
        }
      } catch (error) {
        notificationService.error(t('notifications.game.startGameError'));
        console.error('Error starting game:', error);
      }
    };

    blockActions();
    setIsProcessing(true);

    await getStartGame();

    setIsProcessing(false);
    unblockActions();
  };

  const stopGame = async () => {
    if (isActionBlocked.current || isProcessing || isLoading) return;

    const getStopGame = async () => {
      try {
        const res = await gameApi.stopGame(level!, balanceType);
        const { data, status } = res;
        const { finalWin, balance = 0, userdemoBalance = 0 } = data;

        if (status === 200) {
          setStatus(GameStatusFront.STOPPED);
          stopBackgroundMusic();

          if (finalWin > bet) {
            playPrize();
            playSound(SOUND_TYPE.COINS);
          }

          setUserState({
            demoBalance: Number(userdemoBalance),
            balance: Number(balance),
          });
        }
      } catch (error) {
        notificationService.error(t('notifications.game.stopGameError'));
        console.error('Error stopping game:', error);
      }
    };

    blockActions();
    setIsProcessing(true);

    await getStopGame();

    setIsProcessing(false);
    unblockActions();
  };

  const openDoor = async (
    e: React.MouseEvent<HTMLDivElement>,
    doorLevel: RowNumber,
    doorCell: CellNumber,
    state: DoorState
  ) => {
    if (isActionBlocked.current || isProcessing || isLoading) return;

    if (
      status !== GameStatusFront.IN_PROGRESS ||
      doorLevel !== level ||
      state !== DoorState.CLOSED
    )
      return;

    const doorElement = e.currentTarget;

    const continueProcessing = () => {
      setIsProcessing(false);
      unblockActions();
    };

    const getOpenDoor = async () => {
      try {
        const res = await gameApi.openCell(
          doorLevel + 1,
          doorCell + 1,
          balanceType
        );
        const { data, status } = res;

        if (status === 200) {
          const { gameStatus } = data;

          if (gameStatus === GameResultResponse.IN_PROGRESS) {
            const { cellStatus, cellType, currentLevel, gameStatus } = data;
            launchBomb(doorElement, () => {
              if (cellType === CellTypeResponse.EMPTY) {
                setOpenDoor(doorLevel, doorCell, cellType);
                continueProcessing();
              }

              if (cellType === CellTypeResponse.PRIZE) {
                playSound(SOUND_TYPE.VICTORY);
                setTimeout(() => {
                  setOpenDoor(
                    doorLevel,
                    doorCell,
                    cellType,
                    currentLevel as RowNumber
                  );
                  continueProcessing();
                }, 500);
              }
            });
          }

          if (gameStatus === GameResultResponse.LOST) {
            const { cellType, finalWin, gameEnd, gameStatus, message } = data;
            launchBomb(doorElement, () => {
              stopBackgroundMusic();
              setOpenDoor(doorLevel, doorCell, cellType);
              setStatus(GameStatusFront.LOST);
              playLoser();
              continueProcessing();
              updateBalance();
            });
          }

          if (gameStatus === GameResultResponse.WON) {
            const { finalWin, gameEnd, gameStatus } = data;
            launchBomb(doorElement, () => {
              playPrize();
              playSound(SOUND_TYPE.COINS);
              stopBackgroundMusic();
              setOpenDoor(doorLevel, doorCell, CellTypeResponse.PRIZE);
              setProgress(100);
              setStatus(GameStatusFront.WON);
              continueProcessing();
              updateBalance();
            });
          }
        }
      } catch (error) {
        notificationService.error(t('notifications.game.openDoorError'));
        console.error('Error opening door:', error);
        continueProcessing();
      }
    };

    blockActions();
    setIsProcessing(true);

    await getOpenDoor();
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      let _isOk = true;

      const getMultipliers = async () => {
        try {
          const res = await multipliersApi.getMultipliers();
          const { data } = res.data;
          setMultipliers(data);
        } catch (error) {
          _isOk = false;
        }
      };

      const getGameState = async () => {
        try {
          const res = await gameApi.getState();

          if (res.status === 200) {
            setContinueGame(res.data);
            playGrandma();
          }
        } catch (error: any) {
          if (error?.response?.data?.statusCode === 400) {
            console.log('No active game found');
          } else {
            console.log('Error getting game state:', error);
            _isOk = false;
          }
        }
      };

      if (_isOk) await getMultipliers();

      if (_isOk && token) await getGameState();

      if (!_isOk) {
        setIsOk(false);
        notificationService.error(t('notifications.game.error'));
        return;
      }

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    init();

    return () => {
      stopBackgroundMusic();
    };
  }, []);

  const playButtonText =
    status === GameStatusFront.IN_PROGRESS ? t('stopGame') : t('startGame');

  const playButtonAction = () => {
    if (isActionBlocked.current || isProcessing || isLoading) return;

    if (status === GameStatusFront.IN_PROGRESS) {
      stopGame();
      return;
    }

    startGame();
  };

  return (
    <WidthWrapper>
      <WidthWrapper maxWidth={992} noPadding relative className={s.gameWrapper}>
        <Loader
          isLoading={isLoading}
          containerClassName={s.loaderContainer}
          type='absolute'
        >
          <div ref={topRef} className={s.top}>
            <div className={s.left}>
              <span className={s.label}>{t('maximumPrizeProgress')}</span>
              <ProgressBar value={progress} />
            </div>
            <div className={s.bombsCount}>
              <span className={s.count}>{bombsCount}</span>
              <img src={bombImg} alt='bomb' className={s.bomb} />
            </div>
          </div>

          <DoorGrid>
            {Object.entries(grid).map(([rowKey, row]) => (
              <DoorGrid.Row
                key={`row-${rowKey}`}
                state={
                  status === GameStatusFront.IN_PROGRESS
                    ? level === Number(rowKey)
                      ? RowState.ACTIVE
                      : RowState.DISABLED
                    : RowState.DISABLED
                }
              >
                {Object.entries(row).map(([cellKey, cell]) => {
                  return (
                    <DoorGrid.Door
                      key={`cell-${cell}-${rowKey}-${cellKey}`}
                      state={cell}
                      onClick={(e) =>
                        openDoor(
                          e,
                          Number(rowKey) as RowNumber,
                          Number(cellKey) as CellNumber,
                          cell
                        )
                      }
                    />
                  );
                })}
              </DoorGrid.Row>
            ))}

            {(status === GameStatusFront.WON ||
              status === GameStatusFront.STOPPED) && (
              <div className={s.wonOverlay}>
                <span className={s.label}>{t('wonText')}</span>
              </div>
            )}

            {status === GameStatusFront.LOST && (
              <div className={s.lostOverlay}>
                <span className={s.label}>{t('lostText')}</span>
              </div>
            )}

            {!isLoading && status === GameStatusFront.INITIAL && (
              <div className={s.startGameOverlay}>
                <span className={s.label}>{t('startGameToPlay')}</span>
              </div>
            )}
          </DoorGrid>

          <Lottie
            ref={lottieRef}
            path={ANIMATIONS[currentAnimation.type]}
            loop={currentAnimation.loop}
            play={currentAnimation.play}
            segments={currentAnimation.segment || undefined}
            style={{
              height: grandmaSize,
              width: grandmaSize,
              margin: '0 auto',
            }}
          />

          {bomb && <FlyingBomb withSound params={bomb} />}

          <div className={s.prize}>
            <div className={s.left}>
              <img src={chestImg} alt='chest' className={s.chest} />
              <div className={s.prizeValue}>
                <span className={s.label}>{t('maximumPrize')}:</span>
                <span className={s.value}>
                  {getMoneyView(
                    bet * (bombsCount ? multipliers?.[bombsCount]?.[3] || 1 : 1)
                  )}
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
              disabled={status === GameStatusFront.IN_PROGRESS}
            />
            <NumberInput
              value={bet}
              onChange={setBet}
              min={0}
              step={1}
              disabled={status === GameStatusFront.IN_PROGRESS}
            />
            <PlayButton
              size='medium'
              onClick={playButtonAction}
              text={playButtonText}
              disabled={isLoading || isProcessing || !isOk}
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
