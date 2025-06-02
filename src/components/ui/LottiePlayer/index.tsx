import React, { useEffect, useRef, useImperativeHandle } from 'react';
import './styles.scss';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        background?: string;
        speed?: string | number;
        loop?: boolean;
        autoplay?: boolean;
        controls?: boolean;
        play?: () => void;
        pause?: () => void;
        stop?: () => void;
      }, HTMLElement>;
    }
  }
}

export interface LottiePlayerMethods {
  play: () => void;
  pause: () => void;
  stop: () => void;
}

interface LottiePlayerProps {
  src: string;
  className?: string;
  background?: string;
  speed?: number;
  loop?: boolean;
  autoplay?: boolean;
  width?: string;
  height?: string;
  id?: string;
  onComplete?: () => void;
  onReady?: () => void;
  lottieRef?: React.RefObject<LottiePlayerMethods | null>;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const LottiePlayer: React.FC<LottiePlayerProps> = (props) => {
  const {
    src,
    className = '',
    background = 'transparent',
    speed = 1,
    loop = false,
    autoplay = false,
    width = '300px',
    height = '300px',
    id,
    onComplete,
    onReady,
    lottieRef,
    containerRef,
  } = props;

  const playerRef = useRef<HTMLElement & {
    src?: string;
    background?: string;
    speed?: string | number;
    loop?: boolean;
    autoplay?: boolean;
    play?: () => void;
    pause?: () => void;
    stop?: () => void;
  } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.querySelector('script[src*="dotlottie-player"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js';
      script.async = true;
      script.onload = initializeLottie;
      document.body.appendChild(script);
    } else {
      initializeLottie();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.removeEventListener('complete', handleComplete);
        playerRef.current.removeEventListener('ready', handleReady);
      }
    };
  }, [src]);

  const initializeLottie = () => {
    if (!ref.current) return;

    if (ref.current.firstChild) {
      ref.current.innerHTML = '';
    }
    const player = document.createElement('dotlottie-player') as HTMLElement & {
      src: string;
      background: string;
      speed: string;
      loop: boolean;
      autoplay: boolean;
    };

    player.src = src;
    player.background = background;
    player.speed = speed.toString();
    player.loop = loop;
    player.autoplay = autoplay;
    player.style.width = width;
    player.style.height = height;

    if (id) {
      player.id = id;
    }

    if (className) {
      className.split(' ').forEach((cls: string) => {
        if (cls) player.classList.add(cls);
      });
    }

    player.addEventListener('complete', handleComplete);
    player.addEventListener('ready', handleReady);

    ref.current?.appendChild(player);
    playerRef.current = player;
  };

  const handleComplete = () => {
    if (onComplete) onComplete();
  };

  const handleReady = () => {
    if (onReady) onReady();

    if (autoplay && playerRef.current && playerRef.current.play) {
      playerRef.current.play();
    }
  };

  const play = () => {
    if (playerRef.current && playerRef.current.play) {
      playerRef.current.play();
    }
  };

  const pause = () => {
    if (playerRef.current && playerRef.current.pause) {
      playerRef.current.pause();
    }
  };

  const stop = () => {
    if (playerRef.current && playerRef.current.stop) {
      playerRef.current.stop();
    }
  };

  useImperativeHandle(lottieRef, () => ({
    play,
    pause,
    stop
  }));

  useImperativeHandle(containerRef, () => ref.current!);

  return <div ref={ref} className="lottie-player-container" />;
}

export default LottiePlayer;
