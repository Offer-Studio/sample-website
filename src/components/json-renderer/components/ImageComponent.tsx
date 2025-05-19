'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ImageComponent as ImageComponentType } from '@/lib/schemas/site-schema';
import { cn } from '@/lib/utils';

const ImageComponent: React.FC<ImageComponentType> = ({
  src,
  alt,
  width,
  height,
  style,
  caption,
  id
}) => {
  // Extract alignment-related styles for the bounding box
  const { 
    className: styleClassName, 
    borderRadius,
    border,
    // Alignment properties that should apply to the box
    textAlign,
    alignItems,
    justifyContent,
    margin,
    marginBottom,
    padding,
    position,
    top,
    right,
    bottom,
    left,
    display,
    // Grid-specific properties
    gridColumn,
    gridRow,
    gridTemplateColumns,
    gridTemplateRows,
    gap,
    // Other layout styles for the box
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    overflow,
    zIndex,
    // Box dimensions - may be overridden by width/height props
    width: styleWidth,
    height: styleHeight,
    ...imageStyles 
  } = style || {};

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

  // Default width and height if not provided (this defines the bounding box)
  const boxWidth = formatDimension(width) || formatDimension(styleWidth) || '500px';
  const boxHeight = formatDimension(height) || formatDimension(styleHeight) || '300px';

  // Determine if we're in a grid context by checking for grid-related properties
  const isInGrid = gridColumn || gridRow || gridTemplateColumns || gridTemplateRows;
  
  // Determine if the image is circular (or has very rounded corners)
  const isCircular = borderRadius === '50%' || borderRadius === '9999px';
  
  // Get border width if specified
  const getBorderWidth = () => {
    if (!border) return 0;
    
    // Try to extract the width value from border style
    const borderWidthMatch = border.match(/(\d+)px/);
    if (borderWidthMatch && borderWidthMatch[1]) {
      return parseInt(borderWidthMatch[1], 10);
    }
    
    return 0;
  };

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
  
  const borderWidth = getBorderWidth();
  
  // Styles for the figure element (container for the whole component)
  const figureStyle = {
    position: 'relative',
    width: isInGrid ? '100%' : undefined,
    height: isInGrid ? '100%' : undefined,
    margin: 0, // Reset default figure margin
    marginBottom,
    gridColumn,
    gridRow,
  } as React.CSSProperties;

  // Styles for the bounding box container
  const boxStyle = {
    // Use 100% width/height if in grid, otherwise use specified dimensions
    width: isInGrid ? '100%' : boxWidth,
    height: isInGrid ? '100%' : boxHeight,
    // Centering the image inside the box (unless overridden)
    display: display || 'flex',
    alignItems: alignItems || 'center',
    justifyContent: justifyContent || 'center',
    // Apply alignment-related styles from the style object
    textAlign,
    margin,
    padding,
    position,
    top,
    right,
    bottom,
    left,
    // Grid container properties
    gridTemplateColumns,
    gridTemplateRows,
    gap,
    // Other layout styles
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    overflow,
    zIndex,
    boxSizing: 'border-box',
    borderRadius // Move borderRadius to the box container in grid context
  } as React.CSSProperties;

  // Image-specific styles (excluding border and border-radius)
  const inlineImageStyle = {
    ...imageStyles,
    boxSizing: 'border-box',
    display: 'block', // Prevent any extra space below the image
  } as React.CSSProperties;
  
  // State to hold the actual image dimensions
  const [imageDimensions, setImageDimensions] = useState({ 
    width: getDimensionInPixels(boxWidth) || 500, 
    height: getDimensionInPixels(boxHeight) || 300 
  });
  
  // Effect to calculate proper dimensions to fit within the bounding box
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Get numeric dimensions for calculations
    const numericWidth = getDimensionInPixels(boxWidth) || 500;
    const numericHeight = getDimensionInPixels(boxHeight) || 300;
    
    // For circular images, ensure we maintain a perfect circle
    let targetWidth = numericWidth;
    let targetHeight = numericHeight;
    
    if (isCircular) {
      targetWidth = Math.min(numericWidth, numericHeight);
      targetHeight = targetWidth;
    }
    
    // Create an actual HTML Image element
    const img = document.createElement('img');
    
    // Set up the onload handler before setting src
    img.onload = () => {
      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;
      
      // Calculate aspect ratios
      const imageRatio = originalWidth / originalHeight;
      const boxRatio = targetWidth / targetHeight;
      
      let newWidth, newHeight;
      
      // Determine which dimension constrains the image
      if (imageRatio > boxRatio) {
        // Image is wider than the box ratio, so width is the limiting factor
        newWidth = targetWidth - (borderWidth * 2); // Account for border width
        newHeight = (targetWidth - (borderWidth * 2)) / imageRatio;
      } else {
        // Image is taller than the box ratio, so height is the limiting factor
        newHeight = targetHeight - (borderWidth * 2); // Account for border width
        newWidth = (targetHeight - (borderWidth * 2)) * imageRatio;
      }
      
      setImageDimensions({ width: newWidth, height: newHeight });
    };
    
    // Set src to trigger loading
    img.src = src;
  }, [src, boxWidth, boxHeight, borderWidth, isCircular]);

  // Calculate wrapper dimensions to match image exactly
  const wrapperStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    border,
    borderRadius: isInGrid ? undefined : borderRadius,
    overflow: 'hidden',
    boxSizing: 'border-box',
    flexShrink: 0, // Prevent wrapper from shrinking
  } as React.CSSProperties;

  return (
    <figure id={id} style={figureStyle} className={isInGrid ? 'h-full w-full' : ''}>
      <div 
        className="overflow-hidden"
        style={boxStyle}
      >
        <div style={wrapperStyle}>
          <Image
            src={src}
            alt={alt || ''}
            width={imageDimensions.width}
            height={imageDimensions.height}
            className={cn("object-cover", styleClassName || '')}
            priority={src.includes('hero') || src.includes('banner')}
            style={{
              width: '100%',
              height: '100%',
              ...inlineImageStyle
            }}
          />
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

export default ImageComponent;
