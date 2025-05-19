'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// We'll set the worker in useEffect to ensure it's only done on the client side
// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.js';

interface ReactPDFViewerProps {
  file: string;
  width?: number;
  height?: number;
  showControls?: boolean;
}

const ReactPDFViewer: React.FC<ReactPDFViewerProps> = ({
  file,
  width,
  height = 600,
  showControls = true,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [workerInitialized, setWorkerInitialized] = useState<boolean>(false);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const [hasUserZoomed, setHasUserZoomed] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const renderAttempts = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Initialize the worker on the client side only
  useEffect(() => {
    const initializeWorker = async () => {
      try {
        // Use the correct worker file for version 4.8.69
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf-worker/pdf.worker.min.mjs';
        setWorkerInitialized(true);
      } catch (err) {
        console.error('Error initializing PDF worker:', err);
        setError('Failed to initialize PDF viewer. Please try again later.');
      }
    };

    initializeWorker();
  }, []);

  // Monitor container width changes and handle full screen transitions
  useEffect(() => {
    if (!containerRef.current) return;

    const updateContainerWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        setContainerWidth(newWidth);
        
        // Auto-adjust scale if user hasn't manually zoomed or we're transitioning full screen
        if ((!hasUserZoomed || isFullScreen) && width) {
          const newScale = newWidth / width;
          setScale(Math.min(Math.max(newScale, 0.5), 3)); // Keep scale between 0.5 and 3
        }
      }
    };

    // Initial measurement
    updateContainerWidth();

    // Set up resize observer
    const resizeObserver = new ResizeObserver(updateContainerWidth);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [width, hasUserZoomed, isFullScreen]);

  // Handle full screen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      const newIsFullScreen = document.fullscreenElement === viewerRef.current;
      setIsFullScreen(newIsFullScreen);
      
      // Reset zoom state and recalculate size when toggling full screen
      if (containerRef.current && width) {
        setHasUserZoomed(false);
        const newWidth = containerRef.current.clientWidth;
        const newScale = newWidth / width;
        setScale(Math.min(Math.max(newScale, 0.5), 3));
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [width]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    // Reset render attempts on successful load
    renderAttempts.current = 0;

    // Initial scale calculation if width is provided
    if (width && containerRef.current && !hasUserZoomed) {
      const newScale = containerRef.current.clientWidth / width;
      setScale(Math.min(Math.max(newScale, 0.5), 3));
    }
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    
    // Increment render attempts
    renderAttempts.current += 1;
    
    // If we've tried multiple times, switch to fallback
    if (renderAttempts.current >= 2) {
      console.warn('Multiple render attempts failed. Switching to fallback viewer.');
      setUseFallback(true);
      setLoading(false);
      return;
    }
    
    // Provide more specific error messages based on the error
    if (error.message.includes('version') || 
        error.message.includes('render') || 
        error.message.includes('page') || 
        error.message.includes('display')) {
      console.warn('PDF rendering issue detected. Switching to fallback viewer.');
      // Switch to fallback viewer automatically
      setUseFallback(true);
      setLoading(false);
      return;
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      setError('Failed to load PDF due to network issues. Please check your connection and try again.');
    } else if (error.message.includes('worker')) {
      console.warn('Worker issue detected. Switching to fallback viewer.');
      setUseFallback(true);
      setLoading(false);
      return;
    } else {
      setError('Failed to load PDF. Please check the file and try again.');
    }
    
    setLoading(false);
  };

  const changePage = (offset: number) => {
    if (!numPages) return;
    const newPage = pageNumber + offset;
    if (newPage >= 1 && newPage <= numPages) {
      setPageNumber(newPage);
    }
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => {
    setHasUserZoomed(true);
    setScale(prevScale => Math.min(prevScale + 0.2, 3));
  };

  const zoomOut = () => {
    setHasUserZoomed(true);
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  };

  const resetZoom = () => {
    setHasUserZoomed(false);
    if (width && containerRef.current) {
      const newScale = containerRef.current.clientWidth / width;
      setScale(Math.min(Math.max(newScale, 0.5), 3));
    }
  };

  const downloadPdf = () => {
    try {
      if (file) {
        const link = document.createElement('a');
        link.href = file;
        link.download = file.split('/').pop() || 'document.pdf';
        link.target = '_blank';
        link.click();
      }
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setError('Failed to download PDF. Please try again later.');
    }
  };

  // Add a fallback option if the Document component fails
  const handleRenderError = () => {
    console.warn('Switching to fallback PDF rendering method');
    setUseFallback(true);
  };

  // Add event listener for PDF.js errors
  useEffect(() => {
    const handlePdfJsError = () => {
      console.warn('PDF.js error detected. Switching to fallback viewer.');
      setUseFallback(true);
    };

    // Listen for PDF.js error events
    window.addEventListener('pdfjs-error', handlePdfJsError);
    
    return () => {
      window.removeEventListener('pdfjs-error', handlePdfJsError);
    };
  }, []);

  // Handle page-specific errors
  const onPageLoadError = () => {
    console.warn('Page load error detected. Switching to fallback viewer.');
    setUseFallback(true);
  };

  const toggleFullScreen = async () => {
    try {
      if (!isFullScreen) {
        await viewerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
      
      // Reset zoom state and recalculate size
      if (containerRef.current && width) {
        setHasUserZoomed(false);
        const newWidth = containerRef.current.clientWidth;
        const newScale = newWidth / width;
        setScale(Math.min(Math.max(newScale, 0.5), 3));
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  return (
    <div ref={viewerRef} className={cn(
      "pdf-viewer flex flex-col w-full h-full",
      isFullScreen && "fixed inset-0 bg-background z-50"
    )}>
      {error ? (
        <div className="flex flex-col items-center justify-center h-full w-full bg-muted/10 p-4">
          <p className="text-red-500 mb-4">{error}</p>
          <div className="flex gap-2">
            <button 
              onClick={() => setUseFallback(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Try Alternative Viewer
            </button>
            <a 
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 flex items-center gap-2"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      ) : !workerInitialized ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : useFallback ? (
        <div className="w-full h-full flex flex-col">
          <div className="flex-grow relative">
            {/* Use object tag as primary fallback for better browser compatibility */}
            <object
              data={file}
              type="application/pdf"
              className="w-full h-full"
              aria-label="PDF Document"
            >
              {/* Fallback for browsers that don't support object tag */}
              <iframe 
                src={file} 
                className="w-full h-full border-0"
                title="PDF Document"
              />
            </object>
          </div>
          {showControls && (
            <div className="pdf-controls flex items-center justify-between p-2 bg-muted/10 border-t">
              <div className="flex items-center">
                <span className="text-sm">
                  Using browser&apos;s built-in PDF viewer
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadPdf}
                  className="p-1 rounded hover:bg-muted/20 flex items-center gap-1"
                  aria-label="Download PDF"
                >
                  <Download size={20} />
                  <span>Download</span>
                </button>
                <button
                  onClick={toggleFullScreen}
                  className="p-1 rounded hover:bg-muted/20"
                  aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
                >
                  {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div ref={containerRef} className="pdf-document-container flex-grow overflow-auto relative">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center h-full w-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center h-full w-full bg-muted/10 p-4">
                  <p className="text-red-500 mb-4">Failed to load PDF with the advanced viewer.</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleRenderError}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                    >
                      Try Alternative Viewer
                    </button>
                    <a 
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 flex items-center gap-2"
                    >
                      <Download size={16} />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              }
              className="flex justify-center"
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                width={width}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="shadow-md"
                onLoadError={onPageLoadError}
                onRenderError={onPageLoadError}
              />
            </Document>
          </div>

          {showControls && numPages && (
            <div className="pdf-controls flex items-center justify-between p-2 bg-muted/10 border-t">
              <div className="flex items-center space-x-2">
                <button
                  onClick={previousPage}
                  disabled={pageNumber <= 1}
                  className="p-1 rounded hover:bg-muted/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm">
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={pageNumber >= (numPages || 1)}
                  className="p-1 rounded hover:bg-muted/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={zoomOut}
                  className="p-1 rounded hover:bg-muted/20"
                  aria-label="Zoom out"
                >
                  <ZoomOut size={20} />
                </button>
                <span className="text-sm">
                  {Math.round(scale * 100)}%
                  {hasUserZoomed && (
                    <button
                      onClick={resetZoom}
                      className="ml-2 text-xs text-primary hover:underline"
                      aria-label="Reset zoom"
                    >
                      Reset
                    </button>
                  )}
                </span>
                <button
                  onClick={zoomIn}
                  className="p-1 rounded hover:bg-muted/20"
                  aria-label="Zoom in"
                >
                  <ZoomIn size={20} />
                </button>
                <button
                  onClick={downloadPdf}
                  className="p-1 rounded hover:bg-muted/20"
                  aria-label="Download PDF"
                >
                  <Download size={20} />
                </button>
                <button
                  onClick={toggleFullScreen}
                  className="p-1 rounded hover:bg-muted/20"
                  aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
                >
                  {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReactPDFViewer; 