export type SoundType = 'bum' | 'coins' | 'game' | 'throwBomb' | 'lose' | 'victory';

export interface Sound {
  type: SoundType;
  volume: number;
}

interface AudioInstance {
  audio: HTMLAudioElement;
  volume: number;
  isPlaying: boolean;
}

const sounds: Sound[] = [
  {
    type: 'bum',
    volume: 0.05,
  },
  {
    type: 'coins',
    volume: 0.4,
  },
  {
    type: 'game',
    volume: 0.4,
  },
  {
    type: 'throwBomb',
    volume: 0.5,
  },
  {
    type: 'lose',
    volume: 0.4,
  },
  {
    type: 'victory',
    volume: 0.4,
  },
]

class AudioService {
  private sounds: Map<SoundType, AudioInstance> = new Map();
  private isMuted: boolean = false;
  private backgroundMusic: AudioInstance | null = null;
  private backgroundMusicType: SoundType | null = null;

  constructor() {
    this.preloadSounds();
  }

  private preloadSounds(): void {   
    sounds.forEach(({type, volume}) => {
      const audio = new Audio(`/sounds/${type}.mp3`);
      
      this.sounds.set(type, {
        audio,
        volume,
        isPlaying: false
      });
      
      audio.addEventListener('ended', () => {
        const instance = this.sounds.get(type);
        if (instance) {
          instance.isPlaying = false;
        }
      });
    });
  }

  public playSound(type: SoundType): void {
    if (this.isMuted) return;
    
    const soundInstance = this.sounds.get(type);
    if (!soundInstance) return;
    
    soundInstance.audio.currentTime = 0;
    soundInstance.audio.volume = soundInstance.volume;
    soundInstance.isPlaying = true;
    
    soundInstance.audio.play().catch(error => {
      console.error(`Error playing sound ${type}:`, error);
      soundInstance.isPlaying = false;
    });
  }

  public playBackgroundMusic(type: SoundType = 'game'): void {
    if (this.isMuted) return;
    
    this.stopBackgroundMusic();
    
    const musicInstance = this.sounds.get(type);
    if (!musicInstance) return;
    
    musicInstance.audio.loop = true;
    musicInstance.audio.volume = musicInstance.volume;
    musicInstance.isPlaying = true;
    
    musicInstance.audio.play().catch(error => {
      console.error(`Error playing background music ${type}:`, error);
      musicInstance.isPlaying = false;
    });
    
    this.backgroundMusic = musicInstance;
    this.backgroundMusicType = type;
  }

  public stopBackgroundMusic(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.audio.pause();
      this.backgroundMusic.audio.currentTime = 0;
      this.backgroundMusic.isPlaying = false;
      this.backgroundMusic = null;
      this.backgroundMusicType = null;
    }
  }

  public pauseBackgroundMusic(): void {
    if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
      this.backgroundMusic.audio.pause();
      this.backgroundMusic.isPlaying = false;
    }
  }

  public resumeBackgroundMusic(): void {
    if (this.backgroundMusic && !this.backgroundMusic.isPlaying && !this.isMuted) {
      this.backgroundMusic.audio.play().catch(error => {
        console.error(`Error resuming background music:`, error);
      });
      this.backgroundMusic.isPlaying = true;
    }
  }

  public setVolume(type: SoundType, volume: number): void {
    const soundInstance = this.sounds.get(type);
    if (soundInstance) {
      soundInstance.volume = Math.max(0, Math.min(1, volume));
      soundInstance.audio.volume = soundInstance.volume;
    }
  }

  public mute(): void {
    this.isMuted = true;
    
    if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
      this.backgroundMusic.audio.pause();
      this.backgroundMusic.isPlaying = false;
    }
    
    this.sounds.forEach(soundInstance => {
      if (soundInstance.isPlaying) {
        soundInstance.audio.pause();
        soundInstance.audio.currentTime = 0;
        soundInstance.isPlaying = false;
      }
    });
  }

  public unmute(): void {
    this.isMuted = false;
    
    if (this.backgroundMusic) {
      this.backgroundMusic.audio.play().catch(error => {
        console.error(`Error resuming background music after unmute:`, error);
      });
      this.backgroundMusic.isPlaying = true;
    }
  }

  public isMutedStatus(): boolean {
    return this.isMuted;
  }

  public getCurrentBackgroundMusic(): SoundType | null {
    return this.backgroundMusicType;
  }

  public isPlaying(type: SoundType): boolean {
    const soundInstance = this.sounds.get(type);
    return soundInstance ? soundInstance.isPlaying : false;
  }
}

const audioService = new AudioService();
export default audioService;
