'use client';

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { VideoComponent as VideoComponentType, Style } from '@/lib/schemas/site-schema';
import { cn } from '@/lib/utils';

const VideoComponent: React.FC<VideoComponentType> = ({
  src,
  width,
  height,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  style,
  caption,
  id
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Convert width/height to string format if they're numbers
  const formatDimension = (value: string | number | undefined) => {
    if (typeof value === 'number') return `${value}px`;
    if (typeof value === 'string') {
      // If it's a number string without units, add px
      if (/^\d+$/.test(value)) return `${value}px`;
      // Otherwise return as is (assuming it has units or is a percentage)
      return value;
    }
    return undefined;
  };

  // Extract style properties
  const { 
    className: styleClassName, 
    borderRadius,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    margin,
    // Grid-specific properties
    gridColumn,
    gridRow,
    gridTemplateColumns,
    gridTemplateRows,
    gap,
    // Box dimensions - may be overridden by width/height props
    width: styleWidth,
    height: styleHeight,
    ...restStyle 
  } = style || {} as Style;

  // Determine if we're in a grid context
  const isInGrid = gridColumn || gridRow || gridTemplateColumns || gridTemplateRows;

  // Default width and height if not provided (this defines the bounding box)
  const boxWidth = formatDimension(width) || formatDimension(styleWidth) || '500px';
  const boxHeight = formatDimension(height) || formatDimension(styleHeight) || '300px';

  // Convert dimension to numeric value for calculations
  const getDimensionInPixels = (dimension: string) => {
    // If it's a percentage, we can't calculate exact pixels
    if (dimension.endsWith('%')) return null;
    
    // Extract numeric value
    const match = dimension.match(/^(\d+(?:\.\d+)?)/);
    if (match) {
      return parseFloat(match[1]);
    }
    
    return null;
  };

  // Client-side only rendering to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect to calculate proper dimensions to fit within the bounding box
  useEffect(() => {
    if (!videoRef.current || !isMounted) return;

    const handleVideoMetadata = () => {
      const video = videoRef.current;
      if (!video) return;

      const originalWidth = video.videoWidth;
      const originalHeight = video.videoHeight;
      
      // Get numeric dimensions for calculations
      const numericWidth = getDimensionInPixels(boxWidth) || 500;
      const numericHeight = getDimensionInPixels(boxHeight) || 300;
      
      // Calculate aspect ratios
      const videoRatio = originalWidth / originalHeight;
      const boxRatio = numericWidth / numericHeight;
      
      let newWidth, newHeight;
      
      // Determine which dimension constrains the video
      if (videoRatio > boxRatio) {
        // Video is wider than the box ratio, so width is the limiting factor
        newWidth = numericWidth;
        newHeight = numericWidth / videoRatio;
      } else {
        // Video is taller than the box ratio, so height is the limiting factor
        newHeight = numericHeight;
        newWidth = numericHeight * videoRatio;
      }
      
      setVideoDimensions({ width: newWidth, height: newHeight });
      setIsLoading(false);
    };

    videoRef.current.addEventListener('loadedmetadata', handleVideoMetadata);
    
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleVideoMetadata);
      }
    };
  }, [boxWidth, boxHeight, isMounted]);

  // Styles for the figure element (container)
  const figureStyle = {
    position: 'relative',
    width: isInGrid ? '100%' : undefined,
    height: isInGrid ? '100%' : undefined,
    margin: 0,
    marginBottom: style?.marginBottom,
    gridColumn,
    gridRow,
    display: !isInGrid ? 'flex' : undefined,
    flexDirection: !isInGrid ? 'column' : undefined,
    alignItems: !isInGrid ? 'center' : undefined,
    justifyContent: !isInGrid ? 'flex-start' : undefined,
  } as React.CSSProperties;

  // Styles for the bounding box
  const boxStyle = {
    width: isInGrid ? '100%' : boxWidth,
    height: isInGrid ? '100%' : boxHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius,
    gridTemplateColumns,
    gridTemplateRows,
    gap,
    overflow: 'hidden',
    backgroundColor: 'hsl(var(--muted))',
    flexShrink: 0,
    maxWidth: isInGrid ? '100%' : boxWidth,
  } as React.CSSProperties;

  // Video wrapper styles
  const wrapperStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  } as React.CSSProperties;

  return (
    <figure id={id} style={figureStyle}>
      <div 
        className={cn(
          "relative overflow-hidden",
          borderRadius ? "" : "rounded-lg",
          styleClassName
        )}
        style={boxStyle}
      >
        <div style={wrapperStyle}>
          {isMounted && (
            <>
              <video
                ref={videoRef}
                src={src}
                autoPlay={autoPlay}
                controls={controls}
                loop={loop}
                muted={muted}
                playsInline
                className={cn(
                  "object-contain",
                  isLoading ? "opacity-0" : "opacity-100",
                  "transition-opacity duration-200"
                )}
                style={{
                  width: videoDimensions.width > 0 ? videoDimensions.width : '100%',
                  height: videoDimensions.height > 0 ? videoDimensions.height : '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: borderRadius || undefined,
                  ...(restStyle as CSSProperties)
                }}
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              )}
            </>
          )}
          {!isMounted && (
            <div className="flex items-center justify-center w-full h-full min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          )}
        </div>
      </div>

      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default VideoComponent;
