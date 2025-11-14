// import { Grid, Typography,Hidden } from "@mui/material";
import React from "react";
import useStyles from "./Styles";
// import { dataPartner, dataSocmed } from "./Data";
// import useSitemap from "Hooks/Sitemap/useSitemap";
import Images from "Themes/Images";
import { useTheme } from "@mui/material/styles";

const Footer = (props) => {
  const classes = useStyles();
  const theme = useTheme()
  // const { dataFooterSitemap } = useSitemap()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        flex: 1,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 460px",
        height: 460,
        padding: 0,
        paddingBottom: 80,
        width: "auto",
        backgroundPosition: "cover",
        [theme.breakpoints.down("sm")]: {
          height: "auto",
          backgroundSize: "auto",
          paddingBottom: 60,
          flexDirection: "column",
          backgroundPosition: "cover",
        },
      }}
    ></div>
  )
}

export default Footer
