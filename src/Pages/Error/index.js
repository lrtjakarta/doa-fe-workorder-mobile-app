import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Colors } from "Themes";

// styles
import { Images } from "Themes";

export default function Error() {
  // var classes = useStyles();
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: theme.spacing(12),
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      >
        <img
          style={{
            width: 200,
            marginRight: theme.spacing(2),
          }}
          src={Images.hoodaMerchantlogo}
          alt="logo"
        />
        <Typography
          variant="h3"
          color="inherit"
          sx={{
            fontWeight: 500,
            color: "white",
            marginLeft: theme.spacing(2),
          }}
        >
          LRT Akda app
        </Typography>
      </Box>
      <Paper>
        <Typography variant="h1">404</Typography>
        <Typography
          variant="h5"
          sx={{
            marginBottom: theme.spacing(10),
            textAlign: "center",
            color: Colors.background,
          }}
        >
          Oops. Looks like the page you're looking for no longer exists
        </Typography>
        <Typography variant="h6" color="text" colorBrightness="secondary">
          But we're here to bring you back to safety
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          size="large"
          sx={{
            boxShadow: theme.customShadows.widget,
            backgroundColor: Colors.background,
            textTransform: "none",
            color: "#fff",
            fontSize: 22,
          }}
        >
          Back to Home
        </Button>
      </Paper>
    </Grid>
  );
}
