import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import s from './styles.module.scss'

interface FlyingBombProps {
  startPosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  onAnimationComplete: () => void;
}

const FlyingBomb: React.FC<FlyingBombProps> = ({
  startPosition,
  targetPosition,
  onAnimationComplete
}) => {
  const [explosion, setExplosion] = useState<{
    isActive: boolean;
    position: { x: number; y: number };
  } | null>(null);

  const dx = targetPosition.x - startPosition.x;
  const dy = targetPosition.y - startPosition.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  const bombVariants = {
    initial: {
      x: startPosition.x,
      y: startPosition.y,
      rotate: angle,
      scale: 1,
      opacity: 1
    },
    animate: {
      x: targetPosition.x,
      y: targetPosition.y,
      rotate: angle,
      scale: [1, 1.2, 1, 1.2, 1],
      opacity: [1, 1, 1, 1, 0],
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.25,
        scale: {
          duration: 0.8,
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: 0
        },
        opacity: {
          duration: 0.8,
          times: [0, 0.7, 0.8, 0.9, 1],
          ease: "easeOut"
        }
      }
    }
  };
  
  const explosionVariants = {
    initial: {
      x: targetPosition.x,
      y: targetPosition.y + 40,
      opacity: 0,
      scale: 0.5
    },
    animate: {
      x: targetPosition.x,
      y: targetPosition.y,
      opacity: 1,
      scale: 1.5,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleBombAnimationComplete = () => {
    setExplosion({
      isActive: true,
      position: targetPosition
    });
  };

  const handleExplosionComplete = () => {
    setExplosion(null);
    if (onAnimationComplete) {
      onAnimationComplete();
    }
  };

  return (
    <>
      <motion.div
        className={s.wrapper}
        initial="initial"
        animate="animate"
        variants={bombVariants}
        onAnimationComplete={handleBombAnimationComplete}
      >
        <img 
          src="/imgs/game/bombIcon.svg" 
          alt="Flying bomb" 
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      <AnimatePresence>
        {explosion && explosion.isActive && (
          <motion.div
            className={s.explosion}
            variants={explosionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationComplete={handleExplosionComplete}
          >
            <img src="/imgs/game/bum.svg" alt="Explosion" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FlyingBomb;
