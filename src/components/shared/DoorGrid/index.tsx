import React from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import { FaLock } from "react-icons/fa";
import s from './styles.module.scss';

export type RowState = 'active' | 'disabled' | 'demo';
export type DoorState = 'closed' | 'open' | 'prize' | 'bomb' | 'locked';

interface DoorGridProps {
  children: ReactNode;
  className?: string;
}

const DoorGrid: React.FC<DoorGridProps> & {
  Row: typeof Row;
  Door: typeof Door;
} = ({ children, className }) => {
  return (
    <div className={classNames(s.grid, className)}>
      {children}
    </div>
  );
};

interface RowProps {
  children: ReactNode;
  className?: string;
  state?: RowState;
}

const Row: React.FC<RowProps> = ({ children, className, state = 'active' }) => {
  return (
    <div className={classNames(s.row, className, s[state])}>
      {children}
    </div>
  );
};

interface DoorProps {
  state: DoorState;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Door: React.FC<DoorProps> = ({
  state,
  className,
  onClick,
}) => {
  return (
    <div 
      className={classNames(s.door, className)} 
      onClick={onClick}
    >
      <img src="/imgs/game/doorOverlay.svg" alt="doorOverlay" className={s.doorOverlay} />
      
      <img 
        src="/imgs/game/doorClose.png" 
        alt="doorClose" 
        className={s.doorImage} 
        style={{ display: state === 'closed' || state === 'locked' ? 'block' : 'none' }} 
      />
      
      <img 
        src="/imgs/game/doorOpen.png" 
        alt="doorOpen" 
        className={s.doorImage} 
        style={{ display: state === 'open' || state === 'prize' || state === 'bomb' ? 'block' : 'none' }} 
      />
      
      <img 
        src="/imgs/game/prize.svg" 
        alt="prize" 
        className={s.prizeImage} 
        style={{ display: state === 'prize' ? 'block' : 'none' }} 
      />
      
      <img 
        src="/imgs/game/bombHappy.svg" 
        alt="bomb" 
        className={s.bombImage} 
        style={{ display: state === 'bomb' ? 'block' : 'none' }} 
      />
      
      {state === 'locked' && <FaLock size={20} className={s.lock} />}
    </div>
  );
}

DoorGrid.Row = Row;
DoorGrid.Door = Door;

export default DoorGrid;
