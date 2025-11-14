import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useSignin from "Hooks/Auth/useSignin";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import headerLogo from "Assets/Images/logo-white.png";
import { NavigationContext } from "Context";

const logoHeight = 64;

const Header = () => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { signOut } = useSignin();

  const navigate = useNavigate();

  // context
  const { openDrawer, setOpenDrawer } = useContext(NavigationContext);

  const handleHome = () => {
    navigate("/app");
    window.location.reload();
  };
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        color: "white",
        background:
          "linear-gradient(90deg, rgba(245,126,31,1) 8%, rgba(212,37,42,1) 100%)",
      }}
    >
      <Toolbar disableGutters>
        <Stack
          width="100%"
          direction={"row"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            onClick={handleHome}
            sx={{
              p: 0.5,
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={headerLogo}
              alt="img"
              sx={{
                height: 38,
                // ml: 2,
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
          {/* <Box px={1}>
            <Typography variant="body2">Hai</Typography>
          </Box> */}

          {/* <IconButton
            onClick={() => setOpenDrawer(true)}
            sx={{ color: "background.default" }}
          >
            <MenuOutlined sx={{ fontSize: 38 }} />
          </IconButton> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
