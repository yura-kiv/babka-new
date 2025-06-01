import React, { useCallback, useRef } from 'react';
import s from './NumberInput.module.scss';
import { FaPlus, FaMinus } from "react-icons/fa";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  currency = '$',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    
    if (inputValue === '') {
      onChange(min);
      return;
    }
    
    const numericValue = parseInt(inputValue, 10);
    
    if (!isNaN(numericValue)) {
      const constrainedValue = Math.min(Math.max(numericValue, min), max);
      onChange(constrainedValue);
    }
  }, [min, max, onChange]);

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
    <div className={`${s.numberInput} ${className}`}>
      <button 
        className={s.decrementButton} 
        onClick={handleDecrement}
        disabled={value <= min}
        type="button"
        aria-label="Decrease value"
      >
        <FaMinus size={16} />
      </button>
      
      <div className={s.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={handleInputChange}
          className={s.input}
        />
        <span className={s.currency}>{currency}</span>
      </div>
      
      <button 
        className={s.incrementButton} 
        onClick={handleIncrement}
        disabled={value >= max}
        type="button"
        aria-label="Increase value"
      >
        <FaPlus size={16}/>
      </button>
    </div>
  );
};

export default NumberInput;
