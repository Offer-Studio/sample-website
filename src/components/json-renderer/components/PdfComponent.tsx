'use client';

import React, { useState, useEffect } from 'react';
import { PdfComponent as PdfComponentType } from '@/lib/schemas/site-schema';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Download } from 'lucide-react';

// Dynamically import the PDF viewer with SSR disabled
const ReactPDFViewer = dynamic(
  () => import('./ReactPDFViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full w-full bg-muted/20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }
);

const PdfComponent: React.FC<PdfComponentType> = ({
  src,
  width,
  height,
  style,
  showControls = true,
  id
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // Client-side only rendering to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Extract className if present in style
  const { className: styleClassName, ...restStyle } = style || {};

  // Convert style object to React CSSProperties
  const inlineStyle: React.CSSProperties = {
    ...restStyle as React.CSSProperties,
    width: '100%',
    height: height ? `${height}px` : '600px'
  };

  return (
    <div
      id={id}
      className="pdf-component-container"
      style={inlineStyle}
    >
      <div className={cn("pdf-viewer-wrapper w-full h-full", styleClassName)}>
        {isMounted && src ? (
          <ReactPDFViewer
            file={src}
            width={width}
            height={height}
            showControls={showControls}
          />
        ) : !isMounted ? (
          <div className="flex items-center justify-center h-full w-full bg-muted/20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full bg-muted/10 p-4">
            <p className="text-red-500 mb-4">No PDF file specified</p>
            {src && (
              <a 
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 flex items-center gap-2"
              >
                <Download size={16} />
                <span>Download PDF</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfComponent;
