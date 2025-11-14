import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const drawerWidth = 320;
const drawerHeight = 1000;

export const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export const ButtonSlide = styled(Link)`
  background: "gray";
  position: "fixed";
  height: 30px;
  padding-left: 0rem;
  display: flex;
  align-items: right;
  text-decoration: none;
  width: 30px;
`;

export const openedMixin = (theme) => ({
  width: drawerWidth,
  // height: drawerHeight,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  // overflowX: "auto",
});

export const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // height: drawerHeight,
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  overflow: "hidden",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const boxHeader = { display: "flex" };

export const appBar = {
  bgcolor: "#ED1C24",
  ml: -5,
  zIndex: (theme) => theme.zIndex.drawer + 1,
};

export const toolBar = {
  ml: -7,
  mt: -1,
};

export const imgApp = { width: 20, height: 10 };

export const Admin = { justifyContent: "right", display: "flex", flexGrow: 1 };

export const adminTittle = { ml: 1, mt: 0.8, color: "#fff", fontWeight: 200 };

export const Icon = { ml: 1, mt: 1.2, color: "#fff" };

export const Maindrawer = {
  display: "flex",
  transition: "all 0.5s",
};

export const boxClose = { bgcolor: "#eee", mt: 0, mr: 1 };

export const iconClose = { color: "grey", fontSize: 28, ml: 4, m: "auto" };

export const boxFooter = { ml: 14.5, mt: -0 };

export const boxTittle = { mt: 7, ml: -6 };

export const Copyright = { fontSize: 12, ml: 1 };

export const LRT = { fontSize: 12, ml: -2, color: "#000" };

export const Versi = { fontSize: 12, ml: -1.5 };

export const drawerHeaderStyle = {
  display: "flex",
  transition: "all 0.5s",
};
