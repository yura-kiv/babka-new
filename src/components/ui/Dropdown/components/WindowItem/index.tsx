import React from 'react';
import s from './styles.module.scss';
import classNames from 'classnames';

type WindowItemProps = {
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const WindowItem: React.FC<WindowItemProps> = ({
  active,
  onClick,
  className,
  children,
}) => {
  return (
    <div
      className={classNames(s.windowItem, className, {
        [s.active]: active,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default WindowItem;
