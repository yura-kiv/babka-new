import React from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, ElementType } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import classNames from 'classnames';
import { FaSpinner } from 'react-icons/fa';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
  as?: ElementType;
};

type ButtonAsButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: never;
  external?: never;
};

type ButtonAsLinkProps = BaseButtonProps & Omit<LinkProps, 'to'> & {
  to: string;
  external?: false;
};
type ButtonAsAnchorProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  external: true;
};

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsAnchorProps;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'medium',
    leftIcon,
    rightIcon,
    isLoading = false,
    fullWidth = false,
    className = '',
    children,
    to,
    as: Component = 'button',
    external = false,
    ...rest
  } = props;
  
  const disabled = 'disabled' in rest ? rest.disabled : false;
  const buttonClasses = classNames(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.fullWidth]: fullWidth,
    },
    className
  );

  const buttonContent = (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <FaSpinner size={size === 'small' ? 14 : size === 'medium' ? 18 : 22} />
        </div>
      )}
      <div style={{ opacity: isLoading ? 0 : 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        {children}
        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </div>
    </>
  );

  if (to && !external) {
    const linkProps = rest as Omit<LinkProps, 'to'>;
    return (
      <Link
        to={to}
        className={buttonClasses}
        {...linkProps}
      >
        {buttonContent}
      </Link>
    );
  }

  if (to && external) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={to}
        className={buttonClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorProps}
      >
        {buttonContent}
      </a>
    );
  }

  if (Component !== 'button') {
    return (
      <Component
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...rest}
      >
        {buttonContent}
      </Component>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {buttonContent}
    </button>
  );
};

export default Button;