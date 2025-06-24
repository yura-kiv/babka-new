import React, { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { FaCheck } from 'react-icons/fa';
import s from './styles.module.scss';

export type CheckboxVariant = 'default' | 'success' | 'warning' | 'error';
export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  checkboxClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = 'default',
      size = 'medium',
      label,
      error = false,
      errorMessage,
      className,
      wrapperClassName,
      labelClassName,
      checkboxClassName,
      disabled,
      onChange,
      checked,
      ...rest
    },
    ref
  ) => {
    const isError = variant === 'error' || error || !!errorMessage;

    const checkboxWrapperClasses = classNames(
      s.checkboxWrapper,
      s[size],
      {
        [s.error]: isError,
        [s[variant]]: variant !== 'error',
        [s.disabled]: disabled,
      },
      checkboxClassName
    );

    const labelClasses = classNames(
      s.label,
      {
        [s.disabled]: disabled,
      },
      labelClassName
    );

    return (
      <div className={classNames(s.container, wrapperClassName, className)}>
        <label className={s.checkboxContainer}>
          <div className={checkboxWrapperClasses}>
            <input
              type='checkbox'
              ref={ref}
              className={s.hiddenCheckbox}
              disabled={disabled}
              onChange={onChange}
              checked={checked}
              {...rest}
            />
            <div className={s.customCheckbox}>
              {checked && <FaCheck className={s.checkIcon} />}
            </div>
          </div>
          {label && <span className={labelClasses}>{label}</span>}
        </label>
        {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
