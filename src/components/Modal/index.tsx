import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import Button from '@/components/Button';
import classNames from 'classnames';
import s from './Modal.module.scss';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  animation?: 'fade' | 'scale' | 'slideUp' | 'slideDown';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  contentClassName = '',
  overlayClassName = '',
  animation = 'scale',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, closeOnEscape]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const getAnimationVariants = () => {
    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.2 } },
          exit: { opacity: 0, transition: { duration: 0.2 } },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
          exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
        };
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
        };
      case 'slideDown':
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          exit: { opacity: 0, y: -50, transition: { duration: 0.2 } },
        };
      default:
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
          exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
        };
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={classNames(s.overlay, overlayClassName)}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
        >
          <motion.div
            className={classNames(s.modal, className)}
            variants={getAnimationVariants()}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={modalRef}
          >
            {(title || showCloseButton) && (
              <div className={s.header}>
                {title && <h2 className={s.title}>{title}</h2>}
                {showCloseButton && (
                  <Button
                    variant="text"
                    textColor="white"
                    size="large"
                    onClick={onClose}
                    icon={<FaTimes size={24} />}
                  />
                )}
              </div>
            )}
            <div className={classNames(s.content, contentClassName)}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
