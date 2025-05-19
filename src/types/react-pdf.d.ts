declare module 'react-pdf' {
  import React from 'react';

  export interface DocumentProps {
    file: string | { url: string } | { data: ArrayBuffer | Uint8Array } | { range: Uint8Array };
    onLoadSuccess?: (pdf: { numPages: number }) => void;
    onLoadError?: (error: Error) => void;
    loading?: React.ReactNode;
    noData?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
    error?: React.ReactNode;
    externalLinkTarget?: string;
    rotate?: number;
    options?: object;
  }

  export interface PageProps {
    pageNumber: number;
    width?: number;
    height?: number;
    scale?: number;
    rotate?: number;
    loading?: React.ReactNode;
    className?: string;
    renderTextLayer?: boolean;
    renderAnnotationLayer?: boolean;
    canvasBackground?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onLoadSuccess?: (page: any) => void;
    onLoadError?: (error: Error) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRenderSuccess?: (page: any) => void;
    onRenderError?: (error: Error) => void;
  }

  export interface GlobalWorkerOptions {
    workerSrc: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const pdfjs: {
    GlobalWorkerOptions: GlobalWorkerOptions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };

  // Components
  export const Document: React.FC<DocumentProps>;
  export const Page: React.FC<PageProps>;

  export function readAsArrayBuffer(file: File): Promise<ArrayBuffer>;
}
