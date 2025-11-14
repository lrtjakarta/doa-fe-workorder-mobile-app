import React, { useState } from "react"
import { Box, Grid, Typography } from "@mui/material"
import useStyles from "./Styles"
import { useTheme } from "@mui/material/styles"

const TitlePage = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Box
      sx={{
        flex: 1,
        marginTop: 40,
        width: "100%",
        [theme.breakpoints.down("sm")]: {
          marginTop: 0,
        },
      }}
    >
      <Grid container>
        <div>{props.title}</div>
        <div>{props.content}</div>
      </Grid>
    </Box>
  )
}

export default TitlePage
