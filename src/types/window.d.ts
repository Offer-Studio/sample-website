interface BackgroundMusicControls {
  play: () => void;
  pause: () => void;
  next: () => void;
  setVolume: (volume: number) => void;
  getCurrentTrack: () => string;
  isPlaying: () => boolean;
}

declare global {
  interface Window {
    backgroundMusic?: BackgroundMusicControls;
  }
}

export {}; 