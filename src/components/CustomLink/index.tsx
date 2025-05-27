import React from 'react';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import styles from './styles.module.scss';

interface CustomLinkProps extends Omit<RouterLinkProps, 'className'> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'nav' | 'button';
  size?: 'small' | 'medium' | 'large';
  isActive?: boolean;
  fullWidth?: boolean;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  isActive = false,
  fullWidth = false,
  className = '',
  icon,
  iconPosition = 'left',
  onClick,
  ...props
}) => {
  const linkClasses = [
    styles.link,
    styles[variant],
    styles[size],
    isActive ? styles.active : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <RouterLink className={linkClasses} onClick={handleClick} {...props}>
      {icon && iconPosition === 'left' && <span className={styles.iconLeft}>{icon}</span>}
      <span className={styles.text}>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.iconRight}>{icon}</span>}
    </RouterLink>
  );
};

export default CustomLink;
