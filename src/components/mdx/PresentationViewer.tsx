"use client";

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


// Setup worker using unpkg to bypass Next.js bundler quirks
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export function PresentationViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const previousPage = () => {
    setPageNumber(prev => (prev > 1 ? prev - 1 : prev));
  };

  const nextPage = () => {
    setPageNumber(prev => (numPages && prev < numPages ? prev + 1 : prev));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center my-12 bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl ${isFullscreen ? 'w-full h-screen' : 'w-full aspect-video'}`}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-[#040908]">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-aqua border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white/50 text-sm tracking-widest uppercase">Loading Document</span>
            </div>
          }
          className="flex items-center justify-center w-full h-full"
        >
          {/* We use a fixed width or scale depending on fullscreen to make it fit properly */}
          <div className="relative w-full h-full flex items-center justify-center">
            {containerRef.current && (
               <Page 
                 pageNumber={pageNumber} 
                 renderTextLayer={false}
                 renderAnnotationLayer={false}
                 width={isFullscreen ? window.innerWidth * 0.9 : (containerRef.current.clientWidth || 800)}
                 className="shadow-2xl"
               />
            )}
          </div>
        </Document>
      </div>

      {/* Glassmorphic Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-xl z-50">
        <button 
          onClick={previousPage}
          disabled={pageNumber <= 1}
          className="text-white/70 hover:text-white disabled:opacity-30 disabled:hover:text-white/70 transition-colors p-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <span className="text-white font-medium min-w-[80px] text-center text-sm tabular-nums">
          {pageNumber} / {numPages || '-'}
        </span>
        
        <button 
          onClick={nextPage}
          disabled={!numPages || pageNumber >= numPages}
          className="text-white/70 hover:text-white disabled:opacity-30 disabled:hover:text-white/70 transition-colors p-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        <div className="w-px h-6 bg-white/10 mx-2"></div>

        <button 
          onClick={toggleFullscreen}
          className="text-white/70 hover:text-white transition-colors p-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" /></svg>
        </button>
      </div>
    </div>
  );
}
