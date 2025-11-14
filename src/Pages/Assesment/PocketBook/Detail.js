import { Download } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { StaticVar } from "Config";
import { AssesmentContext } from "Context";
import PreviewPDF from "page-sections/PocketBook/previewPDF";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DetailPocketBook = () => {
  const { _id } = useParams();

  const { pocketBook, getPocketBook } = useContext(AssesmentContext);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  // const [viewPocketBook, setViewPocketBook] = useState({
  //   open: false,
  //   data: null,
  // });

  // effect
  useEffect(() => {
    getPocketBook(_id);
    setLoading(false);

    return () => {};
  }, [_id]);

  useEffect(() => {
    if (pocketBook?._id && !file) {
      setFile(pocketBook.file[0]);
    }
  }, [pocketBook]);

  // const handleViewPDF = () => {
  //   let fileUri = `${StaticVar.URL_API}/uploads/${file?.path}/${file?.uploadedName}`;
  //   setViewPocketBook((prev) => ({ ...prev, open: true, data: fileUri }));
  // };
  let fileUri = `${StaticVar.URL_API}/uploads/${file?.path}/${file?.uploadedName}`;

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(0);

    try {
      const response = await fetch(fileUri, {
        // Untuk track progress download
        signal: AbortSignal.timeout(30000), // timeout 30 detik
      });

      if (!response.ok) toast.error("Failed to download!");

      const reader = response.body.getReader();
      const contentLength = +response.headers.get("Content-Length");
      let receivedLength = 0;
      let chunks = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        receivedLength += value.length;
        setProgress(Math.round((receivedLength / contentLength) * 100));
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "large-file.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) return;

  return (
    <>
      <Box sx={{ pt: 2, pb: 4, px: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              sx={{ flex: 1 }}
              gutterBottom
              variant="h6"
              fontWeight={700}
            >
              {pocketBook.title}
            </Typography>

            <LoadingButton
              color="secondary"
              size="small"
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? `${progress}%` : "File"}
            </LoadingButton>
          </Box>

          {file ? (
            <PreviewPDF source={fileUri} />
          ) : (
            <Typography>No File Loaded</Typography>
          )}
        </Box>
      </Box>

      {/* {viewPocketBook.open && (
        <DialogPreview
          open={viewPocketBook.open}
          onClose={() =>
            setViewPocketBook((prev) => ({ ...prev, open: false, data: null }))
          }
          data={viewPocketBook.data}
        />
      )} */}
    </>
  );
};

export default DetailPocketBook;
