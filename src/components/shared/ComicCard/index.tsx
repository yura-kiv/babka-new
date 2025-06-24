import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import s from './styles.module.scss';

export interface ComicCardProps {
  text?: string;
  img?: string;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

const ComicCard: React.FC<ComicCardProps> = ({
  text,
  img,
  align = 'left',
  className,
}) => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      x: align === 'center' ? 0 : align === 'left' ? -50 : 50,
      y: align === 'center' ? 50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={classNames(s.card, s[align], className)}
      initial='hidden'
      animate={controls}
      variants={variants}
    >
      {img && (
        <div className={s.imageContainer}>
          <img src={img} alt='Comic illustration' className={s.image} />
        </div>
      )}
      {text && (
        <div className={s.content}>
          <p className={s.text}>{t(text)}</p>
        </div>
      )}
    </motion.div>
  );
};

export default ComicCard;
