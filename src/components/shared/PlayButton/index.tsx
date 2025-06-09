import { useTranslation } from "react-i18next";
import s from './styles.module.scss';
import { Link } from "react-router-dom";
import classNames from "classnames";
import type { ReactNode, ButtonHTMLAttributes } from 'react';

export type PlayButtonSize = 'small' | 'medium' | 'large';

export interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  children?: ReactNode;
  className?: string;
  size?: PlayButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  to,
  children,
  className,
  size = 'large',
  onClick,
  disabled = false,
  text,
  ...rest
}) => {
  const { t } = useTranslation();
  
  const buttonClasses = classNames(
    s.button,
    s[size],
    className,
    disabled && s.disabled
  );
  
  const content = (
    <div className={s.label}>
      {children || text || t('play')}
    </div>
  );
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  
  if (!to) {
    return (
      <button 
        className={buttonClasses} 
        onClick={handleClick}
        disabled={disabled}
        {...rest}
      >
        {content}
      </button>
    );
  }
  
  return (
    <Link 
      to={disabled ? '#' : to} 
      className={buttonClasses}
      onClick={disabled ? (e) => e.preventDefault() : handleClick}
    >
      {content}
    </Link>
  );
};

export default PlayButton;