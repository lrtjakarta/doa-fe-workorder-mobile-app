import { useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";

const MicroPage = ({ uri }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const accessToken = encodeURIComponent(
    localStorage.getItem("access_token") || ""
  );
  const refreshToken = encodeURIComponent(
    localStorage.getItem("refresh_token") || ""
  );

  const query = `?accessToken=${accessToken}&refreshToken=${refreshToken}`;

  console.log("uri", query);
  return (
    <iframe
      src={`${uri + location.pathname}/${query}`}
      width="100%"
      height="100%"
      allow="camera"
      style={{ border: "none", paddingRight: mobile ? 0 : "20px" }}
    ></iframe>
  );
};

export default MicroPage;
