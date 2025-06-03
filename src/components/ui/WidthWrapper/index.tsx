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
  relative?: boolean;
  as?: React.ElementType;
}

const WidthWrapper: React.FC<WidthWrapperProps> = ({ 
  children, 
  className = '',
  noPadding = false,
  fullHeight = false,
  centered = false,
  maxWidth,
  relative = false,
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
          [s.centered]: centered,
          [s.relative]: relative
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