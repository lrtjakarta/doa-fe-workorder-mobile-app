import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { StaticVar } from "Config";
import { AssesmentContext } from "Context";
import DialogPreview from "page-sections/PocketBook/dialogPreview";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPocketBook = () => {
  const { _id } = useParams();

  const { pocketBook, getPocketBook } = useContext(AssesmentContext);
  const [file, setFile] = useState(null);

  const [viewPocketBook, setViewPocketBook] = useState({
    open: false,
    data: null,
  });

  // effect
  useEffect(() => {
    getPocketBook(_id);

    return () => {};
  }, [_id]);

  useEffect(() => {
    if (pocketBook?._id && !file) {
      setFile(pocketBook.file[0]);
    }
  }, [pocketBook]);

  const handleViewPDF = () => {
    let fileUri = `${StaticVar.URL_API}/uploads/${file?.path}/${file?.uploadedName}`;
    setViewPocketBook((prev) => ({ ...prev, open: true, data: fileUri }));
  };

  return (
    <>
      <Box sx={{ pt: 2, pb: 4, px: 1 }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{ flexGrow: 1 }}
            gutterBottom
            variant="h6"
            fontWeight={700}
          >
            {pocketBook.title}
          </Typography>

          {/* <Box
            component={Link}
            href={`${StaticVar.URL_API}/uploads/${file?.path}/${file?.uploadedName}`}
            target="_blank"
            sx={{ display: "flex", gap: 0.5, alignItems: "center" }}
          >
            
            <IconButton color="secondary" size="small">
              <FindInPageOutlinedIcon />
            </IconButton>
          </Box> */}
          {file && (
            <IconButton onClick={handleViewPDF} color="secondary" size="small">
              <FindInPageOutlinedIcon />
            </IconButton>
          )}
        </Box>

        <Box
          component="div"
          sx={{ mt: 2 }}
          dangerouslySetInnerHTML={{ __html: pocketBook.contentText }}
        />
      </Box>

      {viewPocketBook.open && (
        <DialogPreview
          open={viewPocketBook.open}
          onClose={() =>
            setViewPocketBook((prev) => ({ ...prev, open: false, data: null }))
          }
          data={viewPocketBook.data}
        />
      )}
    </>
  );
};

export default DetailPocketBook;
