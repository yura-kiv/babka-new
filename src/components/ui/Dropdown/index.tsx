import React, { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import styles from './styles.module.scss';

export interface DropdownProps {
  disabled?: boolean;
  trigger?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  offset?: number;
  closeOnClickOutside?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  renderTrigger?: (props: { isOpen: boolean; toggle: () => void; disabled?: boolean }) => React.ReactNode;
  renderContent?: (props: { isOpen: boolean; close: () => void }) => React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  className = '',
  contentClassName = '',
  triggerClassName = '',
  placement = 'bottom-left',
  offset = 10,
  closeOnClickOutside = true,
  disabled = false,
  onOpen,
  onClose,
  renderTrigger,
  renderContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const open = useCallback(() => {
    setIsOpen(true);
    if (onOpen) onOpen();
  }, [onOpen]);
  
  const close = useCallback(() => {
    setIsOpen(false);
    if (onClose) onClose();
  }, [onClose]);
  
  const toggle = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    if (disabled) return;
    
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close, disabled]);
  
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return undefined;
    
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    };
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, closeOnClickOutside, close]);
  
  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
        scale: 0.95,
        y: 0,
        transition: {
          duration: 0.2,
        },
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.2,
        },
      },
    };

    if (placement.startsWith('top')) {
      baseVariants.hidden.y = offset;
      baseVariants.visible.y = 0;
    } else {
      baseVariants.hidden.y = -offset;
      baseVariants.visible.y = 0;
    }

    return baseVariants;
  };

  const getPlacementClass = () => {
    switch (placement) {
      case 'bottom-right':
        return styles.bottomRight;
      case 'top-left':
        return styles.topLeft;
      case 'top-right':
        return styles.topRight;
      case 'bottom-left':
      default:
        return styles.bottomLeft;
    }
  };

  const triggerElement = renderTrigger 
    ? renderTrigger({ isOpen, toggle, disabled })
    : (
        <div 
          className={classNames(
            styles.trigger, 
            triggerClassName,
            { [styles.disabled]: disabled }
          )} 
          onClick={toggle}
          aria-disabled={disabled}
        >
          {trigger}
        </div>
      );
  
  const contentElement = renderContent
    ? renderContent({ isOpen, close })
    : children;
  
  return (
    <div 
      className={classNames(
        styles.dropdown, 
        className,
        { [styles.dropdownDisabled]: disabled }
      )} 
      ref={dropdownRef}
    >
      {triggerElement}
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            className={classNames(styles.content, getPlacementClass(), contentClassName)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={getAnimationVariants()}
          >
            {contentElement}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
