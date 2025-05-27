import React from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';

interface WidthWrapperProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  fullHeight?: boolean;
  centered?: boolean;
  maxWidth?: number | string;
  as?: React.ElementType;
}

const WidthWrapper: React.FC<WidthWrapperProps> = ({ 
  children, 
  className = '',
  noPadding = false,
  fullHeight = false,
  centered = false,
  maxWidth,
  as: Component = 'div'
}) => {
  const style = maxWidth ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : {};
  
  return (
    <Component 
      className={classNames(
        s.widthWrapper,
        {
          [s.noPadding]: noPadding,
          [s.fullHeight]: fullHeight,
          [s.centered]: centered
        },
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
};

export default WidthWrapper;