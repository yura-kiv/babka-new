import React from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import { FaLock } from "react-icons/fa";
import s from './styles.module.scss';

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
  isActive?: boolean;
}

const Row: React.FC<RowProps> = ({ children, isActive, className }) => {
  return (
    <div className={classNames(s.row, isActive && s.active, className)}>
      {children}
    </div>
  );
};

interface DoorProps {
  state: DoorState;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Door: React.FC<DoorProps> = ({
  state,
  className,
  isActive,
  onClick,
}) => {
  return (
    <div 
      className={classNames(s.door, isActive && s.active, className)} 
      onClick={onClick}
    >
      <img src="/imgs/game/doorOverlay.svg" alt="doorOverlay" className={s.doorOverlay} />
      {renderDoorContent(state)}
    </div>
  );
};

function renderDoorContent(state: DoorState) {
  switch (state) {
    case 'closed':
      return <img src="/imgs/game/doorClose.png" alt="door" className={s.doorImage} />;
    
    case 'open':
      return <img src="/imgs/game/doorOpen.png" alt="door" className={s.doorImage} />;
    
    case 'prize':
      return (
        <>
          <img src="/imgs/game/doorOpen.png" alt="door" className={s.doorImage} />
          <img src="/imgs/game/prize.svg" alt="prize" className={s.prizeImage} />
        </>
      );
    
    case 'bomb':
      return (
        <>
          <img src="/imgs/game/doorOpen.png" alt="door" className={s.doorImage} />
          <img src="/imgs/game/bombHappy.svg" alt="bomb" className={s.bombImage} />
        </>
      );
    
    case 'locked':
      return (
        <>
          <img src="/imgs/game/doorClose.png" alt="door" className={s.doorImage} />
          <FaLock size={20} className={s.lock} />
        </>
      );
    
    default:
      return <img src="/imgs/game/doorClose.png" alt="door" className={s.doorImage} />;
  }
}

DoorGrid.Row = Row;
DoorGrid.Door = Door;

export default DoorGrid;
