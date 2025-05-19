'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FlipCardComponent as FlipCardComponentType } from '@/lib/schemas/site-schema';
import { cn } from '@/lib/utils';

const FlipCardComponent: React.FC<FlipCardComponentType> = ({
  id,
  frontImage,
  backContent,
  width = 300,
  height = 400,
  style,
  frontStyle,
  backStyle,
  flipTrigger = 'hover',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Handle mouse events for hover flip
  const handleMouseEnter = () => {
    if (flipTrigger === 'hover') {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (flipTrigger === 'hover') {
      setIsFlipped(false);
    }
  };

  const handleClick = () => {
    if (flipTrigger === 'click') {
      setIsFlipped(!isFlipped);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (flipTrigger === 'click') {
        setIsFlipped(!isFlipped);
      }
    }
  };

  // Convert dimensions to string format if they're numbers
  const formatDimension = (value: string | number | undefined) => {
    if (typeof value === 'number') return `${value}px`;
    if (typeof value === 'string') {
      if (/^\d+$/.test(value)) return `${value}px`;
      return value;
    }
    return undefined;
  };

  const boxWidth = formatDimension(width) || '300px';
  const boxHeight = formatDimension(height) || '400px';

  // Combine styles
  const containerStyle = {
    width: boxWidth,
    height: boxHeight,
    perspective: '1000px',
    cursor: 'pointer',
    ...style,
  } as React.CSSProperties;

  const cardStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: isFlipped ? 'rotateY(180deg) scale(1.02)' : 'rotateY(0) scale(1)',
  } as React.CSSProperties;

  const faceStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  } as React.CSSProperties;

  const frontFaceStyle = {
    ...faceStyle,
    backgroundColor: 'white',
    ...frontStyle,
  } as React.CSSProperties;

  const backFaceStyle = {
    ...faceStyle,
    backgroundColor: '#FDFBF7', // Warm white/cream color typical of Polaroid photos
    transform: 'rotateY(180deg)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '1.5rem',
    fontFamily: 'monospace',
    position: 'relative',
    ...backStyle,
  } as React.CSSProperties;

  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Extract filename from src path
  const fileName = frontImage.src.split('/').pop() || 'image.jpg';
  
  // Generate a simple hash from the image alt text
  const generateHash = (text: string) => {
    return text.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
  };
  
  const imageHash = Math.abs(generateHash(frontImage.alt)).toString().slice(0, 6);

  return (
    <div
      id={id}
      style={containerStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Flip card. ${isFlipped ? 'Currently showing back content' : 'Currently showing front image'}`}
    >
      <div style={cardStyle}>
        <div style={frontFaceStyle}>
          <Image
            src={frontImage.src}
            alt={frontImage.alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes={`(max-width: ${boxWidth}) 100vw, ${boxWidth}`}
          />
        </div>
        <div style={backFaceStyle}>
          <div 
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              fontSize: '0.75rem',
              color: '#333',
              letterSpacing: '0.5px',
              opacity: 0.8,
              fontFamily: 'Courier, monospace',
            }}
          >
            {fileName.toUpperCase()}
          </div>
          <div 
            style={{
              position: 'absolute',
              top: '2rem',
              left: '1rem',
              fontSize: '0.75rem',
              color: '#333',
              letterSpacing: '0.5px',
              opacity: 0.8,
              fontFamily: 'Courier, monospace',
            }}
          >
            {currentDate}
          </div>
          <div 
            className={cn(
              "text-foreground/10",
              "uppercase text-center whitespace-nowrap overflow-hidden"
            )}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              left: '0.5rem',
              pointerEvents: 'none',
              fontSize: '1.25rem',
              transform: 'rotate(-45deg)',
              fontFamily: 'Courier, monospace',
            }}
          >
            {frontImage.alt}
          </div>
          <div 
            className={cn(
              "text-foreground",
              "text-center leading-relaxed"
            )}
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              width: '100%',
              fontSize: '1rem',
              fontFamily: 'system-ui, sans-serif',
              padding: '0 1.5rem',
            }}
          >
            {backContent}
          </div>
          <div 
            style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '0.75rem',
              fontSize: '0.75rem',
              color: '#666',
              fontStyle: 'italic',
              opacity: 0.6,
              fontFamily: 'Courier, monospace',
            }}
          >
            ID: {imageHash}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCardComponent; 