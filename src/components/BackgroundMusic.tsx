import { useEffect, useRef, useState } from 'react';
import { useConfig } from '@/hooks/useConfig';

interface Track {
  src: string;
  title: string;
}

interface BackgroundMusicConfig {
  enabled: boolean;
  autoPlay: boolean;
  volume: number;
  playbackMode: 'sequential' | 'shuffle';
  tracks: Track[];
}

export const BackgroundMusic = () => {
  const { config } = useConfig();
  const musicConfig = config.backgroundMusic as BackgroundMusicConfig;
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackQueue, setTrackQueue] = useState<number[]>([]);
  const [showPlayButton, setShowPlayButton] = useState(false);

  // Initialize track queue
  useEffect(() => {
    if (!musicConfig?.tracks?.length) return;
    
    if (musicConfig.playbackMode === 'shuffle') {
      const indices = Array.from({ length: musicConfig.tracks.length }, (_, i) => i);
      const shuffled = indices.sort(() => Math.random() - 0.5);
      setTrackQueue(shuffled);
    } else {
      const indices = Array.from({ length: musicConfig.tracks.length }, (_, i) => i);
      setTrackQueue(indices);
    }
  }, [musicConfig?.tracks, musicConfig?.playbackMode]);

  // Handle track ending
  const handleTrackEnd = () => {
    const currentQueueIndex = trackQueue.indexOf(currentTrackIndex);
    const nextQueueIndex = (currentQueueIndex + 1) % trackQueue.length;
    setCurrentTrackIndex(trackQueue[nextQueueIndex]);
  };

  const startPlayback = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setShowPlayButton(false);
    } catch (error) {
      console.error('Playback failed:', error);
      setIsPlaying(false);
    }
  };

  // Set up audio element and event listeners
  useEffect(() => {
    if (!musicConfig?.enabled) return;

    const audio = new Audio();
    audioRef.current = audio;
    
    audio.volume = musicConfig.volume;
    audio.addEventListener('ended', handleTrackEnd);
    
    if (musicConfig.autoPlay) {
      audio.play().catch(() => {
        // Show play button when autoplay fails
        setShowPlayButton(true);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener('ended', handleTrackEnd);
      audio.pause();
      audio.src = '';
    };
  }, [musicConfig?.enabled]);

  // Update audio source when track changes
  useEffect(() => {
    if (!audioRef.current || !musicConfig?.tracks?.[currentTrackIndex]) return;
    
    audioRef.current.src = musicConfig.tracks[currentTrackIndex].src;
    
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex, musicConfig?.tracks, isPlaying]);

  // Expose controls to window for external control
  useEffect(() => {
    if (!audioRef.current) return;

    window.backgroundMusic = {
      play: startPlayback,
      pause: () => {
        audioRef.current?.pause();
        setIsPlaying(false);
      },
      next: handleTrackEnd,
      setVolume: (volume: number) => {
        if (audioRef.current) {
          audioRef.current.volume = Math.max(0, Math.min(1, volume));
        }
      },
      getCurrentTrack: () => musicConfig?.tracks?.[currentTrackIndex]?.title || '',
      isPlaying: () => isPlaying
    };

    return () => {
      delete window.backgroundMusic;
    };
  }, [currentTrackIndex, isPlaying, musicConfig?.tracks]);

  if (!showPlayButton) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}
    >
      <div style={{ position: 'relative' }}>
        <button
          onClick={startPlayback}
          style={{
            padding: '12px 24px',
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            border: 'none',
            borderRadius: '9999px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Play Background Music
        </button>
        <button
          onClick={() => setShowPlayButton(false)}
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '20px',
            height: '20px',
            padding: '2px',
            backgroundColor: 'hsl(var(--muted))',
            color: 'hsl(var(--muted-foreground))',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = 'hsl(var(--destructive))';
            e.currentTarget.style.color = 'hsl(var(--destructive-foreground))';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
            e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
          }}
          aria-label="Dismiss background music"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};