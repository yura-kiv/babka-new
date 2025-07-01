import React, { useCallback, useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  className?: string;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 9999,
  step = 1,
  currency = '$',
  className = '',
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let raw = e.target.value.replace(',', '.');

      if (raw === '' || raw === '.') {
        setInputValue(raw);
        onChange(min);
        return;
      }

      const validFormat = /^\d*\.?\d*$/.test(raw);
      if (!validFormat) return;

      const parts = raw.split('.');
      if (parts.length === 2 && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
        raw = parts.join('.');
      }

      const parsed = parseFloat(raw);

      if (!isNaN(parsed)) {
        if (parsed >= min && parsed <= max) {
          setInputValue(raw);
        }

        const clamped = Math.min(Math.max(parsed, min), max);
        onChange(clamped);
      }
    },
    [min, max, onChange]
  );

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [value, max, step, onChange]);

  const handleDecrement = useCallback(() => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [value, min, step, onChange]);

  return (
    <div
      className={`${s.numberInput} ${disabled ? s.disabled : ''} ${className}`}
    >
      <button
        className={s.decrementButton}
        onClick={handleDecrement}
        disabled={value <= min || disabled}
        type='button'
        aria-label='Decrease value'
      >
        <FaMinus size={16} />
      </button>

      <div className={s.inputWrapper}>
        <input
          ref={inputRef}
          type='text'
          inputMode='decimal'
          pattern='[0-9]*[.,]?[0-9]*'
          value={inputValue}
          onChange={handleInputChange}
          className={s.input}
          disabled={disabled}
        />
        <span className={s.currency}>{currency}</span>
      </div>

      <button
        className={s.incrementButton}
        onClick={handleIncrement}
        disabled={value >= max || disabled}
        type='button'
        aria-label='Increase value'
      >
        <FaPlus size={16} />
      </button>
    </div>
  );
};

export default NumberInput;
