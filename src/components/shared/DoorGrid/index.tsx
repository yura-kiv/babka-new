import React from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import { FaLock } from 'react-icons/fa';
import s from './styles.module.scss';

export enum RowState {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  DEMO = 'demo',
}

export enum DoorState {
  CLOSED = 'closed',
  OPEN = 'open',
  PRIZE = 'prize',
  BOMB = 'bomb',
  LOCKED = 'locked',
}

interface DoorGridProps {
  children: ReactNode;
  className?: string;
}

const DoorGrid: React.FC<DoorGridProps> & {
  Row: typeof Row;
  Door: typeof Door;
} = ({ children, className }) => {
  return <div className={classNames(s.grid, className)}>{children}</div>;
};

interface RowProps {
  children: ReactNode;
  className?: string;
  state?: RowState;
}

const Row: React.FC<RowProps> = ({ children, className, state = 'active' }) => {
  return (
    <div className={classNames(s.row, className, s[state])}>{children}</div>
  );
};

interface DoorProps {
  state: DoorState;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Door: React.FC<DoorProps> = ({ state, className, onClick }) => {
  return (
    <div className={classNames(s.door, s[state], className)} onClick={onClick}>
      <img
        src='/imgs/game/doorOverlay.svg'
        alt='doorOverlay'
        className={s.doorOverlay}
      />

      <img
        src='/imgs/game/doorClose.png'
        alt='doorClose'
        className={s.doorImage}
        style={{
          display:
            state === DoorState.CLOSED || state === DoorState.LOCKED
              ? 'block'
              : 'none',
        }}
      />

      <img
        src='/imgs/game/doorOpen.png'
        alt='doorOpen'
        className={s.doorImage}
        style={{
          display:
            state === DoorState.OPEN ||
            state === DoorState.PRIZE ||
            state === DoorState.BOMB
              ? 'block'
              : 'none',
        }}
      />

      <img
        src='/imgs/game/prize.svg'
        alt='prize'
        className={s.prizeImage}
        style={{ display: state === DoorState.PRIZE ? 'block' : 'none' }}
      />

      <img
        src='/imgs/game/bombHappy.svg'
        alt='bomb'
        className={s.bombImage}
        style={{ display: state === DoorState.BOMB ? 'block' : 'none' }}
      />

      {state === DoorState.LOCKED && <FaLock size={20} className={s.lock} />}
    </div>
  );
};

DoorGrid.Row = Row;
DoorGrid.Door = Door;

export default DoorGrid;
