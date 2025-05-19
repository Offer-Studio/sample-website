'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface AudioComponentProps {
  type: 'audio';
  id: string;
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  style?: Record<string, string | number>;
  caption?: string;
}

const AudioComponent: React.FC<AudioComponentProps> = ({
  id,
  src,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  style = {},
  caption,
}) => {
  return (
    <div className="w-full" id={id}>
      <audio
        className={cn("w-full", style?.className)}
        style={style}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
      >
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center">{caption}</p>
      )}
    </div>
  );
};

export default AudioComponent; 