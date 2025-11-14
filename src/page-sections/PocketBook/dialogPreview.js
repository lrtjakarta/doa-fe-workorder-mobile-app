import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@mui/material";

// Import the styles
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const PDFViewer = ({ data, containerWidth }) => {
  const [numPages, setNumPages] = useState(null);

  return (
    <Document
      file={data}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {Array.from({ length: numPages }, (_, i) => (
        <Page
          key={i + 1}
          pageNumber={i + 1}
          width={containerWidth}
          // scale={1}
        />
      ))}
    </Document>
  );
};

const DialogPreview = ({ open, onClose, data }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(300);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
    }
  }, [open]);

  const handleZoomIn = () => {
    setIsLoading(true);
    setZoom((prev) => Math.min(prev + 0.2, 3));
    setIsLoading(false);
  };

  const handleZoomOut = () => {
    setIsLoading(true);
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
    setIsLoading(false);
  };

  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <DialogContent ref={containerRef} sx={{ position: "relative" }}>
        {isLoading ? (
          <Backdrop open={isLoading} sx={{ position: "absolute", zIndex: 2 }}>
            <CircularProgress color="secondary" />
          </Backdrop>
        ) : (
          <PDFViewer data={data} containerWidth={containerWidth * zoom} />
        )}
      </DialogContent>
      {/* <DialogActions>
        <IconButton onClick={handleZoomOut}>
          <ZoomOutIcon />
        </IconButton>
        <IconButton onClick={handleZoomIn}>
          <ZoomInIcon />
        </IconButton>
      </DialogActions> */}
    </Dialog>
  );
};

export default DialogPreview;
