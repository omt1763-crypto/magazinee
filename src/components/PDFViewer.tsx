import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export const PDFViewer = ({ pdfUrl, title }: PDFViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const pdfDocRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);

  // Load PDF.js from CDN
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.async = true;
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      loadPDF();
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const loadPDF = async () => {
    try {
      const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise;
      pdfDocRef.current = pdf;
      setTotalPages(pdf.numPages);
      setLoading(false);
      renderPages(1);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setLoading(false);
    }
  };

  const renderPage = async (pageNumber: number, canvas: HTMLCanvasElement | null) => {
    if (!canvas || !pdfDocRef.current || pageNumber < 1 || pageNumber > totalPages) return;

    try {
      const page = await pdfDocRef.current.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext('2d');
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  };

  const renderPages = async (startPage: number) => {
    await renderPage(startPage, leftCanvasRef.current);
    await renderPage(startPage + 1, rightCanvasRef.current);
  };

  useEffect(() => {
    if (pdfDocRef.current && totalPages > 0) {
      renderPages(currentPage);
    }
  }, [currentPage, scale, totalPages]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setIsFlipping(true);
      setTimeout(() => setIsFlipping(false), 400);
      setCurrentPage(Math.max(1, currentPage - 2));
    }
  };

  const handleNextPage = () => {
    if (currentPage + 1 < totalPages) {
      setIsFlipping(true);
      setTimeout(() => setIsFlipping(false), 400);
      setCurrentPage(currentPage + 2);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.3, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.3, 0.8));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full"></div>
          </div>
          <p className="text-on-dark font-sans">Loading magazine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col bg-black">
      <style>{`
        @keyframes flipLeft {
          0% { transform: rotateY(0deg) translateX(0); opacity: 1; }
          50% { transform: rotateY(90deg) translateX(-10px); opacity: 0.5; }
          100% { transform: rotateY(0deg) translateX(-20px); opacity: 1; }
        }
        @keyframes flipRight {
          0% { transform: rotateY(0deg) translateX(0); opacity: 1; }
          50% { transform: rotateY(-90deg) translateX(10px); opacity: 0.5; }
          100% { transform: rotateY(0deg) translateX(20px); opacity: 1; }
        }
        .flip-page-left {
          animation: flipLeft 0.4s ease-in-out;
        }
        .flip-page-right {
          animation: flipRight 0.4s ease-in-out;
        }
      `}</style>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-surface-dark p-4 z-50 border-b border-gold/20">
        <div className="flex items-center gap-3">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gold/10 rounded transition-colors text-muted-foreground hover:text-gold"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-sm font-sans text-gold font-semibold min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gold/10 rounded transition-colors text-muted-foreground hover:text-gold"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
        </div>

        <h2 className="font-serif text-lg text-on-dark flex-1 text-center">{title}</h2>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-gold text-accent-foreground font-sans text-sm uppercase tracking-widest rounded hover:bg-gold/90 transition-colors"
          title="Download PDF"
        >
          <Download size={18} />
          Download
        </button>
      </div>

      {/* Flipbook Container */}
      <div className="flex-1 flex items-center justify-center bg-black p-8">
        <div className="flex gap-12 items-center justify-center w-full h-full max-w-6xl">
          {/* Previous Page Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="flex-shrink-0 p-4 bg-gold/20 hover:bg-gold/40 disabled:opacity-20 text-gold rounded-full transition-all hover:scale-110 disabled:hover:scale-100"
            title="Previous"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Left Page */}
          <div className="flex-1 flex flex-col items-center justify-center max-h-[85vh]">
            <div
              className={`shadow-2xl border-4 border-gold/40 rounded-lg overflow-hidden bg-white transition-all duration-300 ${
                isFlipping ? 'flip-page-left' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              <canvas ref={leftCanvasRef} className="max-h-[80vh] max-w-xl" />
            </div>
            <div className="mt-3 text-center">
              <span className="text-sm font-sans text-gold font-semibold">Page {currentPage}</span>
            </div>
          </div>

          {/* Right Page */}
          <div className="flex-1 flex flex-col items-center justify-center max-h-[85vh]">
            <div
              className={`shadow-2xl border-4 border-gold/40 rounded-lg overflow-hidden bg-white transition-all duration-300 ${
                isFlipping ? 'flip-page-right' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              <canvas ref={rightCanvasRef} className="max-h-[80vh] max-w-xl" />
            </div>
            <div className="mt-3 text-center">
              <span className="text-sm font-sans text-gold font-semibold">
                Page {Math.min(currentPage + 1, totalPages)}
              </span>
            </div>
          </div>

          {/* Next Page Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage + 1 >= totalPages}
            className="flex-shrink-0 p-4 bg-gold/20 hover:bg-gold/40 disabled:opacity-20 text-gold rounded-full transition-all hover:scale-110 disabled:hover:scale-100"
            title="Next"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-4 bg-surface-dark p-4 border-t border-gold/20">
        <span className="font-sans text-sm text-muted-foreground">
          Viewing pages <span className="text-gold font-semibold">{currentPage}</span> -{' '}
          <span className="text-gold font-semibold">{Math.min(currentPage + 1, totalPages)}</span> of{' '}
          <span className="text-gold font-semibold">{totalPages}</span>
        </span>
      </div>
    </div>
  );
};
