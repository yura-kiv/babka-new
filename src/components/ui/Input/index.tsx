import React, { forwardRef, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import s from './styles.module.scss';
import Button from '../Button';

export type InputVariant = 'default' | 'success' | 'warning';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  errorMessage?: string;
  wrapperClassName?: string;
  label?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'medium',
      leftIcon,
      rightIcon,
      errorMessage,
      className,
      wrapperClassName,
      label,
      labelClassName,
      disabled,
      onChange,
      value,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const isError = !!errorMessage;

    const inputClasses = classNames(
      s.input,
      s[size],
      s[variant],
      {
        [s.error]: isError,
        [s.hasLeftIcon]: !!leftIcon,
        [s.hasRightIcon]: !!rightIcon,
      },
      className
    );

    return (
      <div className={classNames(s.inputWrapper, wrapperClassName)}>
        {label && (
          <label className={classNames(s.label, labelClassName)}>{label}</label>
        )}

        <div className={s.inputContainer}>
          {leftIcon && (
            <div className={classNames(s.icon, s.left)}>{leftIcon}</div>
          )}

          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            {...rest}
          />

          {rightIcon && (
            <div className={classNames(s.icon, s.right)}>{rightIcon}</div>
          )}
        </div>

        {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const PasswordToggleIcon = showPassword ? (
      <Button
        variant='simple'
        size='medium'
        onClick={togglePasswordVisibility}
        padding={{ p: 0 }}
        type='button'
      >
        <FaEye />
      </Button>
    ) : (
      <Button
        variant='simple'
        size='medium'
        onClick={togglePasswordVisibility}
        padding={{ p: 0 }}
        type='button'
      >
        <FaEyeSlash />
      </Button>
    );

    return (
      <Input
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        rightIcon={PasswordToggleIcon}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { Input, PasswordInput };
