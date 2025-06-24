import React from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';

export interface DividerProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  margin?: number | string;
  noMargin?: boolean;
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({
  className = '',
  direction = 'horizontal',
  color,
  thickness,
  margin,
  noMargin = false,
  style = {},
}) => {
  const dividerStyle: React.CSSProperties = {
    ...style,
  };

  if (color) {
    dividerStyle.backgroundColor = color;
  }

  if (thickness) {
    dividerStyle[
      direction === 'horizontal' ? 'height' : 'width'
    ] = `${thickness}px`;
  }

  if (noMargin) {
    dividerStyle.margin = '0';
  } else if (margin) {
    if (typeof margin === 'number') {
      dividerStyle.margin = `${margin}px 0`;
    } else {
      dividerStyle.margin = margin;
    }
  }

  return (
    <div
      className={classNames(
        s.divider,
        {
          [s.horizontal]: direction === 'horizontal',
          [s.vertical]: direction === 'vertical',
          [s.noMargin]: noMargin,
        },
        className
      )}
      style={dividerStyle}
    />
  );
};

export default Divider;
