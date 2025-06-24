import React from 'react';
import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  ElementType,
} from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import classNames from 'classnames';
import { FaSpinner } from 'react-icons/fa';
import s from './styles.module.scss';

export type ButtonVariant =
  // Solid colored buttons
  | 'green'
  | 'yellow'
  | 'red'

  // Transparent buttons
  | 'outline'
  | 'ghost'

  // Text-only buttons
  | 'text'

  // Link-like styles
  | 'simple' // Basic link with hover opacity
  | 'underline' // Link with underline animation
  | 'subtle' // Subtle link with color change
  | 'tab' // Tab-like navigation link
  | 'bordered'; // Bordered link
export type TextButtonColor =
  | 'white'
  | 'black'
  | 'green'
  | 'yellow'
  | 'red'
  | 'blue';
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
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
  as?: ElementType;
  borderRadius?: BorderRadiusType;
  padding?: PaddingProps;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isActive?: boolean;
};

type ButtonAsButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
    external?: never;
  };

type ButtonAsLinkProps = BaseButtonProps &
  Omit<LinkProps, 'to'> & {
    to: string;
    external?: false;
  };
type ButtonAsAnchorProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
    external: true;
  };

export type ButtonProps =
  | ButtonAsButtonProps
  | ButtonAsLinkProps
  | ButtonAsAnchorProps;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'green',
    size = 'medium',
    textColor = 'white',
    isLoading = false,
    fullWidth = false,
    className = '',
    children,
    to,
    as: Component = 'button',
    external = false,
    borderRadius = 'large',
    padding,
    icon,
    iconPosition = 'left',
    isActive = false,
    ...rest
  } = props;

  const disabled = 'disabled' in rest ? rest.disabled : false;
  const isLinkStyle = [
    'simple',
    'underline',
    'subtle',
    'tab',
    'bordered',
  ].includes(variant);

  const buttonClasses = classNames(
    isLinkStyle ? s.link : s.button,
    s[variant],
    s[size],
    isLoading && s.loading,
    !isLinkStyle && s[`radius-${borderRadius}`],
    {
      [s.fullWidth]: fullWidth,
      [s[textColor]]: variant === 'text',
      [s.active]: isActive,
    },
    className
  );

  const customStyle = padding
    ? {
        paddingTop: padding.pt || padding.py || padding.p,
        paddingRight: padding.pr || padding.px || padding.p,
        paddingBottom: padding.pb || padding.py || padding.p,
        paddingLeft: padding.pl || padding.px || padding.p,
      }
    : {};

  const buttonContent = (
    <>
      {isLoading && (
        <div className={s.loading}>
          <FaSpinner
            size={size === 'small' ? 14 : size === 'medium' ? 18 : 22}
          />
        </div>
      )}
      <div className={s.content}>
        {iconPosition === 'left' && icon && (
          <span className={s.icon}>{icon}</span>
        )}
        {children}
        {iconPosition === 'right' && icon && (
          <span className={s.icon}>{icon}</span>
        )}
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
        target='_blank'
        rel='noopener noreferrer'
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
