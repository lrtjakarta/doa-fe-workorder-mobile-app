import { Box, Typography } from "@mui/material";
import { StaticVar } from "Config";
import { AssesmentContext } from "Context/Assesment";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // get id params
  const _id = searchParams.get("id");
  console.log("id", _id);

  // context
  const { content, getContent } = useContext(AssesmentContext);

  useEffect(() => {
    getContent(_id);
  }, [_id]);

  return (
    <Box sx={{ pt: 2, pb: 3 }}>
      <Typography gutterBottom variant="h6">
        {content.title}
      </Typography>
      {content.mediaType === "image" && (
        <Box
          component="img"
          sx={{ width: "100%", height: 240, borderRadius: 2 }}
          src={`${StaticVar.URL_API}/uploads/${content.pictures[0]?.path}/${content.pictures[0]?.uploadedName}`}
        />
      )}

      {content.mediaType === "video" && (
        <Box
          component="video"
          sx={{ width: "100%" }}
          src={`${StaticVar.URL_API}/uploads/${content.pictures[0]?.path}/${content.pictures[0]?.uploadedName}`}
        />
      )}

      <Box>
        <Typography variant="caption">{content.caption}</Typography>
        <Typography variant="body2">
          {moment(content.createdAt).format("LL")}
        </Typography>
      </Box>

      <Box
        sx={{ mt: 4 }}
        component="div"
        dangerouslySetInnerHTML={{
          __html: content.content,
        }}
      />
    </Box>
  );
};

export default Content;
