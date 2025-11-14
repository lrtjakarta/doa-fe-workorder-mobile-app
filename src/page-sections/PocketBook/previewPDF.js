import { Box } from "@mui/material";

// Import the styles
import { useRef, useState } from "react";
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

const PreviewPDF = ({ source }) => {
  const containerRef = useRef(null);
  return (
    <Box sx={{ position: "relative", flex: 1 }}>
      <PDFViewer data={source} containerWidth="100%" />
    </Box>
  );
};

export default PreviewPDF;
