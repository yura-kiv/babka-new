import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/types/store';
import { setMuted } from '@/store/slices/uiSlice';
import audioService, { type SoundType } from '@/services/audioService';

export const useAudio = () => {
  const dispatch = useDispatch();
  const { isMuted } = useSelector((state: RootState) => state.ui);

  const playSound = useCallback((type: SoundType) => {
    audioService.playSound(type);
  }, []);

  const playBackgroundMusic = useCallback((type: SoundType = 'game') => {
    audioService.playBackgroundMusic(type);
  }, []);

  const stopBackgroundMusic = useCallback(() => {
    audioService.stopBackgroundMusic();
  }, []);

  const pauseBackgroundMusic = useCallback(() => {
    audioService.pauseBackgroundMusic();
  }, []);

  const resumeBackgroundMusic = useCallback(() => {
    audioService.resumeBackgroundMusic();
  }, []);

  const toggleMute = useCallback(() => {
    dispatch(setMuted(!isMuted));
  }, [dispatch, isMuted]);

  const setMute = useCallback((muted: boolean) => {
    dispatch(setMuted(muted));
  }, [dispatch]);

  const setVolume = useCallback((type: SoundType, volume: number) => {
    audioService.setVolume(type, volume);
  }, []);

  return {
    // State
    isMuted,
    
    // Sound playback methods
    playSound,
    playBackgroundMusic,
    stopBackgroundMusic,
    pauseBackgroundMusic,
    resumeBackgroundMusic,
    
    // Sound control methods
    toggleMute,
    setMute,
    setVolume,
    
    // Additional helper methods
    isPlaying: audioService.isPlaying.bind(audioService),
    getCurrentBackgroundMusic: audioService.getCurrentBackgroundMusic.bind(audioService),
  };
};
