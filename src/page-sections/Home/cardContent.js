import { Box, Button, Card, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

// sample image
import ImageAsset from "Assets/Images/asessment.jpg";
import { StaticVar } from "Config";
import { useNavigate } from "react-router-dom";

const CardContent = ({ item }) => {
  const navigate = useNavigate();
  const thumbnail = item.pictures[0]?.thumbnailName;

  // const encodedURI = encodeURIComponent(item.title);
  let description = item.description;
  if (description?.length > 30) {
    description = `${description?.slice(0, 25)}...`;
  }

  return (
    <Card
      // onClick={() => navigate(`/app/content/${encodedURI}`)}
      onClick={() => navigate(`/app/content?id=${item._id}`)}
      sx={{ p: 0.5, width: "100%" }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box
          component="img"
          sx={{
            borderRadius: 1,
            objectFit: "cover",
            height: 70,
            width: 120,
          }}
          src={
            thumbnail
              ? `${StaticVar.URL_API}/uploads/${item.pictures[0]?.path}/thumbnail/${thumbnail}`
              : ImageAsset
          }
          alt="Image"
        />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            pb: 1,
            pr: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle">{item.title}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">{description}</Typography>
            <Typography variant="caption">
              {moment(item.createdAt).format("DD/MM/YYYY")}
            </Typography>
          </Box>
          <Button sx={{ alignSelf: "flex-end", mt: 2 }}>Selengkapnya</Button>
        </Box>
      </Box>
    </Card>
  );
};

export default CardContent;
