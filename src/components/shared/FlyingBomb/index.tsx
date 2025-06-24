import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import s from './styles.module.scss';
import { useAudio } from '@/hooks/useAudio';
import { SOUND_TYPE, BOMB_OVERLAY_ID } from '@/constants';

export type FlyingBombParams = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  onComplete?: () => void;
};

interface FlyingBombProps {
  params: FlyingBombParams;
  withSound?: boolean;
}

const FlyingBomb: React.FC<FlyingBombProps> = ({
  params,
  withSound = false,
}) => {
  const {
    isMuted,
    toggleMute,
    playSound,
    playBackgroundMusic,
    stopBackgroundMusic,
  } = useAudio();
  const [explosion, setExplosion] = useState<{
    isActive: boolean;
    position: { x: number; y: number };
  } | null>(null);

  const { from, to, onComplete } = params;

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const bombVariants = {
    initial: {
      x: from.x,
      y: from.y,
      rotate: angle,
      scale: 1,
      opacity: 1,
    },
    animate: {
      x: to.x,
      y: to.y,
      rotate: angle,
      scale: [1, 1.2, 1, 1.2, 1],
      opacity: [1, 1, 1, 1, 0],
      transition: {
        type: 'spring',
        duration: 0.8,
        bounce: 0.25,
        scale: {
          duration: 0.8,
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: 0,
        },
        opacity: {
          duration: 0.8,
          times: [0, 0.7, 0.8, 0.9, 1],
          ease: 'easeOut',
        },
      },
    },
  };

  useEffect(() => {
    withSound && !isMuted && playSound(SOUND_TYPE.THROW_BOMB);
  }, []);

  const explosionVariants = {
    initial: {
      x: to.x,
      y: to.y + 60,
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      x: to.x,
      y: to.y,
      opacity: 1,
      scale: 1.5,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const handleBombAnimationComplete = () => {
    withSound && !isMuted && playSound(SOUND_TYPE.BUM);
    setExplosion({
      isActive: true,
      position: to,
    });
  };

  const handleExplosionComplete = () => {
    setExplosion(null);
    onComplete?.();
  };

  const bombOverlayElement = document.getElementById(BOMB_OVERLAY_ID);

  if (!bombOverlayElement) return null;

  return createPortal(
    <>
      <motion.div
        className={s.wrapper}
        initial='initial'
        animate='animate'
        variants={bombVariants}
        onAnimationComplete={handleBombAnimationComplete}
        style={{ rotate: angle }}
      >
        <img
          src='/imgs/game/bombIcon.svg'
          alt='Flying bomb'
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      <AnimatePresence>
        {explosion && explosion.isActive && (
          <motion.div
            className={s.explosion}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={explosionVariants}
            onAnimationComplete={handleExplosionComplete}
          >
            <img src='/imgs/game/bum.svg' alt='Explosion' />
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    bombOverlayElement
  );
};

export default FlyingBomb;
