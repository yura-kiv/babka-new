import { useCallback } from 'react';
import { audioService } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUiState } from '@/store/helpers/selectors';
import { setUiMuted } from '@/store/helpers/actions';
import { SOUND_TYPE } from '@/constants';

const useAudio = () => {
  const dispatch = useAppDispatch();
  const { isMuted } = useAppSelector(getUiState);

  const playSound = useCallback((type: SOUND_TYPE) => {
    audioService.playSound(type);
  }, []);

  const playBackgroundMusic = useCallback(
    (type: SOUND_TYPE = SOUND_TYPE.GAME) => {
      audioService.playBackgroundMusic(type);
    },
    []
  );

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
    dispatch(setUiMuted(!isMuted));
  }, [dispatch, isMuted]);

  const setMute = useCallback(
    (muted: boolean) => {
      dispatch(setUiMuted(muted));
    },
    [dispatch]
  );

  const setVolume = useCallback((type: SOUND_TYPE, volume: number) => {
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
    getCurrentBackgroundMusic:
      audioService.getCurrentBackgroundMusic.bind(audioService),
  };
};

export default useAudio;
