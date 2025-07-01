import React, { useState, useEffect, memo } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Table, UserAvatar } from '@/components/ui';
import { userNames, userAvatars } from '@/constants';
import PulseCircle from '@/assets/icons/onlineCircle.svg';
import s from './styles.module.scss';
import { getMoneyView } from '@/utils';

const FIXED_PLAYERS_COUNT = 10;
const rows = Array.from({ length: FIXED_PLAYERS_COUNT }).map((_, idx) => idx);

enum PlayerStatus {
  ACTIVE = 'active',
  LOST = 'lost',
  PENDING = 'pending',
}

interface PlayerData {
  id: string;
  name: string;
  avatar: string;
  spent: number;
  bombs: number;
  prize: number | string;
  status: PlayerStatus;
}

function generateRandomValues() {
  var random = Math.random();
  return {
    spent: Math.floor(Math.random() * (1000 - 5) + 5),
    bombs: +(Math.random() * (3 - 0.5) + 0.5).toFixed(0),
    isWin: random < 0.7,
    isLost: random >= 0.7 && random < 0.85,
    isPending: random >= 0.85,
  };
}

function generateUniqueId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function createPlayer(): PlayerData {
  const name = userNames[Math.floor(Math.random() * userNames.length)];
  const avatar = userAvatars[Math.floor(Math.random() * userAvatars.length)];
  const values = generateRandomValues();

  const prize = values.isWin
    ? Math.floor(values.spent * values.bombs)
    : values.isLost
      ? -values.spent
      : '...';

  const status: PlayerStatus = values.isWin
    ? PlayerStatus.ACTIVE
    : values.isLost
      ? PlayerStatus.LOST
      : PlayerStatus.PENDING;

  return {
    id: generateUniqueId(),
    name,
    avatar,
    spent: values.spent,
    bombs: values.bombs,
    prize,
    status,
  };
}

type Props = {
  className?: string;
};

const ActivePlayersTable: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const [players, setPlayers] = useState<{
    curr: PlayerData[];
    prev: PlayerData[];
  }>(() => {
    const _players = Array.from({ length: FIXED_PLAYERS_COUNT }, createPlayer);
    return { curr: _players, prev: _players };
  });

  useEffect(() => {
    let isCancelled = false;

    function update() {
      setPlayers((prevPlayers) => {
        let newPlayers = [...prevPlayers.curr];

        const randomIndex = Math.floor(Math.random() * FIXED_PLAYERS_COUNT);
        const updatedPlayer = createPlayer();
        newPlayers[randomIndex] = updatedPlayer;

        const lostIndices = newPlayers.reduce((indices, player, index) => {
          if (player.status === PlayerStatus.LOST) indices.push(index);
          return indices;
        }, [] as number[]);

        lostIndices.forEach((index) => {
          if (index !== randomIndex) {
            newPlayers[index] = createPlayer();
          }
        });

        return {
          prev: [...prevPlayers.curr],
          curr: [...newPlayers]
            .sort((a, b) => {
              if (
                a.status === PlayerStatus.PENDING &&
                b.status !== PlayerStatus.PENDING
              )
                return 1;
              if (
                a.status !== PlayerStatus.PENDING &&
                b.status === PlayerStatus.PENDING
              )
                return -1;
              return b.spent - a.spent;
            })
            .slice(0, FIXED_PLAYERS_COUNT),
        };
      });

      if (!isCancelled) {
        const delay = Math.floor(Math.random() * (1000 - 500) + 500);
        setTimeout(update, delay);
      }
    }

    update();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className={classNames(s.wrapper, className)}>
      <div className={s.top}>
        <span className={s.title}>{t('live')}</span>
        <img src={PulseCircle} alt='pulse-circle' className={s.pulseCircle} />
        <span className={s.title}>{t('players')}</span>
      </div>
      <Table hoverable striped variant='dark' size='medium'>
        <Table.Header>
          <Table.Cell width='20%'>{t('name')}</Table.Cell>
          <Table.Cell align='center'>{t('spent')}</Table.Cell>
          <Table.Cell align='center'>{t('numberOfBombs')}</Table.Cell>
          <Table.Cell align='center'>{t('prize')}</Table.Cell>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => {
            const player = players.curr[row];
            const isPending = player?.status === PlayerStatus.PENDING;
            const isInPrev = players.prev.some(
              (prevPlayer) => prevPlayer.id === player.id
            );
            const animation = !isInPrev
              ? isPending
                ? s.fadeInPending
                : s.fadeIn
              : undefined;

            return (
              <Table.Row
                key={row}
                className={classNames(s[player?.status], animation)}
              >
                <Table.Cell width='30%'>
                  <UserAvatar name={player?.name} avatar={player?.avatar} />
                </Table.Cell>
                <Table.Cell align='center'>
                  <div className={s.spentCell}>
                    {player?.spent ? getMoneyView(player.spent) : '...'}
                  </div>
                </Table.Cell>
                <Table.Cell align='center'>{player?.bombs}</Table.Cell>
                <Table.Cell align='center'>
                  <div className={s.prizeCell}>
                    {typeof player?.prize === 'number'
                      ? getMoneyView(player?.prize)
                      : player?.prize}
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default memo(ActivePlayersTable);
