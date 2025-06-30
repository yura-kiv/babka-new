import React from 'react';
import classNames from 'classnames';
import { Button, type ButtonProps } from '@/components/ui';
import { FaChevronDown } from 'react-icons/fa';
import s from './styles.module.scss';

const TriggerButtonWithChevron: React.FC<ButtonProps & { isOpen: boolean }> = ({
  isOpen,
  ...props
}) => {
  return (
    <Button
      iconPosition='right'
      icon={
        <FaChevronDown
          size={12}
          className={classNames(s.arrow, { [s.open]: isOpen })}
        />
      }
      {...props}
    />
  );
};

export default TriggerButtonWithChevron;
