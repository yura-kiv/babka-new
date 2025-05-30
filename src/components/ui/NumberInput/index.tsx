import React, { useCallback } from 'react';
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
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? min : Math.max(min, parseFloat(e.target.value));
    if (!isNaN(newValue) && newValue <= max) {
      onChange(newValue);
    }
  }, [min, max, onChange]);

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  }, [value, max, step, onChange]);

  const handleDecrement = useCallback(() => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
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
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
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
