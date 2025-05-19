declare module 'pdfjs-dist' {
  export interface GlobalWorkerOptions {
    workerSrc: string;
  }

  export interface PDFDocumentLoadingTask<T> {
    promise: Promise<T>;
  }

  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
    destroy?(): void;
  }

  export interface PDFPageProxy {
    getViewport(options: { scale: number }): PDFPageViewport;
    render(options: {
      canvasContext: CanvasRenderingContext2D;
      viewport: PDFPageViewport;
    }): { promise: Promise<void> };
  }

  export interface PDFPageViewport {
    width: number;
    height: number;
  }

  export function getDocument(src: string): PDFDocumentLoadingTask<PDFDocumentProxy>;

  export const GlobalWorkerOptions: GlobalWorkerOptions;
}
