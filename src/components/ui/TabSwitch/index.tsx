import React from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';

export interface TabOption {
  id: string;
  label: string;
}

export interface TabSwitchProps {
  options: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'accent';
  fullWidth?: boolean;
}

const TabSwitch: React.FC<TabSwitchProps> = ({
  options,
  activeId,
  onChange,
  className,
  size = 'medium',
  variant = 'default',
  fullWidth = false,
}) => {
  return (
    <div
      className={classNames(
        s.tabSwitch,
        s[size],
        s[variant],
        { [s.fullWidth]: fullWidth },
        className
      )}
    >
      <div className={s.tabsContainer}>
        {options.map((option) => (
          <div
            key={option.id}
            className={classNames(s.tabItem, {
              [s.active]: activeId === option.id,
            })}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabSwitch;
