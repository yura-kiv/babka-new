import React from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, ElementType } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import classNames from 'classnames';
import { FaSpinner } from 'react-icons/fa';
import s from './Button.module.scss';

export type ButtonVariant = 'outline' | 'ghost' | 'red' | 'green' | 'yellow' | 'text';
export type TextButtonColor = 'white' | 'black' | 'green' | 'yellow' | 'red' | 'blue';
export type ButtonSize = 'small' | 'medium' | 'large';
export type BorderRadiusType = 'small' | 'large' | 'none';

export type PaddingProps = {
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  px?: string | number;
  py?: string | number;
  p?: string | number;
};

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  textColor?: TextButtonColor;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
  as?: ElementType;
  borderRadius?: BorderRadiusType;
  padding?: PaddingProps;
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
    variant = 'green',
    size = 'medium',
    textColor = 'white',
    leftIcon,
    rightIcon,
    isLoading = false,
    fullWidth = false,
    className = '',
    children,
    to,
    as: Component = 'button',
    external = false,
    borderRadius = 'large',
    padding,
    ...rest
  } = props;
  
  const disabled = 'disabled' in rest ? rest.disabled : false;
  const buttonClasses = classNames(
    s.button,
    s[variant],
    s[size],
    s[`radius-${borderRadius}`],
    {
      [s.fullWidth]: fullWidth,
      [s[textColor]]: variant === 'text',
    },
    className
  );
  
  const customStyle = padding ? {
    paddingTop: padding.pt || padding.py || padding.p,
    paddingRight: padding.pr || padding.px || padding.p,
    paddingBottom: padding.pb || padding.py || padding.p,
    paddingLeft: padding.pl || padding.px || padding.p
  } : {};

  const buttonContent = (
    <>
      {isLoading && (
        <div className={s.loading}>
          <FaSpinner size={size === 'small' ? 14 : size === 'medium' ? 18 : 22} />
        </div>
      )}
      <div className={s.content}>
        {leftIcon && <span className={s.icon}>{leftIcon}</span>}
        {children}
        {rightIcon && <span className={s.icon}>{rightIcon}</span>}
      </div>
    </>
  );

  if (to && !external) {
    const linkProps = rest as Omit<LinkProps, 'to'>;
    return (
      <Link
        to={to}
        className={buttonClasses}
        style={customStyle}
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
        style={customStyle}
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
        style={customStyle}
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
      style={customStyle}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {buttonContent}
    </button>
  );
};

export default Button;