import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
// import {
//   makeStyles,
//   list,

// } from '@mui/materials';
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { CircularProgress, Collapse, useMediaQuery } from "@mui/material";
import { decodeToken } from "react-jwt";
import { useLocation, useNavigate } from "react-router-dom";
import API from "Services/Api";
import SearchField from "./SearchField";
import { NavigationContext } from "Context";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
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

function MiniDrawer(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const { openDrawer, setOpenDrawer } = useContext(NavigationContext);

  // state
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  // const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [openItem, setOpenItem] = useState({});

  let token = localStorage.getItem("access_token");
  token = decodeToken(token);
  const id = token?.id;

  const handleClick = (id) => {
    setOpenItem((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    handleDrawerOpen();
  };
  const handleNavigation = (link) => {
    navigate(link);
    handleDrawerOpen();
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = (type) => {
    setOpenDrawer(false);
    setOpenItem({});
    // if (type === "drawer") {
    // }
  };

  const filterMenuItems = (items = []) => {
    return items.filter((item) => {
      if (
        item.type === "page" &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return true;
      }

      if (item.children) {
        const filteredChildren = filterMenuItems(item?.children);
        return filteredChildren?.length > 0;
      }

      return false;
    });
  };

  const renderLevels = (menus = [], level = 0, lastItem) => {
    return menus.map((item, index) => {
      const active =
        location.pathname === item.link ||
        (item.children &&
          item.children.some((child) => location.pathname === child.link));

      const itemNameLengthWords = item.name?.split(" ");
      let ItemName = () => (
        <Typography
          sx={{
            display: "inline",
            fontWeight: 600,
          }}
          variant="body2"
        >
          {item.name}
        </Typography>
      );

      // crate multi lines name for length words
      const isLongWords = itemNameLengthWords?.length > 4;
      if (isLongWords) {
        const firstLine = itemNameLengthWords?.slice(0, 4)?.join(" ");
        const secondLine = itemNameLengthWords?.slice(4)?.join(" ");
        ItemName = () => (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                display: "inline",
                fontWeight: 600,
              }}
              variant="body2"
            >
              {firstLine}
            </Typography>
            <Typography
              sx={{
                display: "inline",
                fontWeight: 600,
              }}
              variant="body2"
            >
              {secondLine}
            </Typography>
          </Box>
        );
      }

      if (item.type === "module") {
        return (
          <Fragment key={index}>
            <ListItem
              disablePadding
              sx={{
                display: openDrawer ? "block" : "-webkit-box",
                px: openDrawer ? 2.5 : 0,
                pl: 3,
                mt: index > 0 ? 1.5 : 0,
                // WebkitLineClamp: 1,
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    color="text.semi"
                    sx={{ textTransform: "uppercase", fontWeight: 600 }}
                    variant="body2"
                  >
                    {item.name}
                  </Typography>
                }
                sx={{ opacity: openDrawer ? 1 : 0 }}
              />
              {/* <Typography
                color="text.semi"
                sx={{ textTransform: "uppercase", fontWeight: 600 }}
                variant="body2"
              >
                {item.name}
              </Typography> */}
            </ListItem>
            {item.children &&
              renderLevels(
                item.children,
                level,
                index === item?.children?.length - 1
              )}
          </Fragment>
        );
      }

      if (item.children && item.children?.length > 0) {
        return (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
            }}
          >
            <ListItemButton
              alignItems={isLongWords ? "flex-start" : "center"}
              selected={
                location.pathname === item.link ||
                (item.children &&
                  item.children.some(
                    (child) => location.pathname === child.link
                  ))
              }
              onClick={() => handleClick(item._id)}
              sx={{
                minHeight: 48,
                justifyContent: openDrawer ? "initial" : "center",
                px: 2.5,
                mx: 1,
                color: active ? "primary.main" : "inherit",
                // borderRadius: openItem[item._id] ? 4 : 0,
                "&.Mui-selected": {
                  borderRadius: 1,
                  // backgroundColor: "transparent",
                  // backgroundColor: "background.light",
                  // px: 0,
                  // mx: 0.5,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  pl: `${level * 1}rem`,
                  mr: openDrawer ? 0.5 : "auto",
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                {item.icon ? (
                  <Box
                    component="img"
                    src={item.icon}
                    alt={item.name}
                    sx={{ height: 22 }}
                  />
                ) : (
                  <FiberManualRecordIcon
                    color={active ? "error" : "disabled"}
                    sx={{ fontSize: 12 }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Fragment>
                    <ItemName />
                  </Fragment>
                }
                sx={{ opacity: openDrawer ? 1 : 0, my: 0 }}
              />
              {item.children &&
                openDrawer &&
                (openItem[item._id] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse in={openItem[item._id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderLevels(
                  item.children,
                  level + 1,
                  index === item?.children?.length - 1
                )}
              </List>
            </Collapse>
          </ListItem>
        );
      }

      return (
        <ListItem
          key={index}
          disablePadding
          sx={{
            display: "block",
            "& > :last-child": { mb: 0.3 },
            "& > :first-child": { mt: 0.3 },
          }}
        >
          <ListItemButton
            alignItems={isLongWords ? "flex-start" : "center"}
            selected={
              location.pathname === item.link ||
              (item.children &&
                item.children.some((child) => location.pathname === child.link))
            }
            onClick={() => handleNavigation(item.link)}
            sx={{
              minHeight: 48,
              justifyContent: openDrawer ? "initial" : "center",
              px: 2.5,
              color: active ? "primary.main" : "inherit",
              mx: 1,
              "&:hover": {
                borderRadius: 1,
                backgroundColor: "background.light",
              },
              "&.Mui-selected": {
                borderRadius: 1,
                // backgroundColor: "background.light",
                // px: 0,
                // mx: 0.5,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                pl: `${level * 1}rem`,
                mr: openDrawer ? 0.5 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon ? (
                <Box
                  component="img"
                  src={item.icon}
                  alt={item.name}
                  sx={{ height: 22 }}
                />
              ) : (
                <FiberManualRecordIcon
                  color={active ? "error" : "disabled"}
                  sx={{ fontSize: 12 }}
                />
              )}
            </ListItemIcon>
            <ListItemText
              sx={{
                opacity: openDrawer ? 1 : 0,
              }}
              // primary={item.name}
              primary={
                <Fragment>
                  <ItemName />
                </Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  const getMenu = useCallback(async () => {
    await API.getSidebar(id)
      .then((res) => {
        const data = res.data;
        setMenu(data || []);
      })
      .catch((err) => console.log("error fetch menu", err));
  }, [menu, filteredMenu]);

  useEffect(() => {
    setLoading(true);
    const fetchMenu = async () => {
      await getMenu();
    };
    if (id) {
      fetchMenu();
    }
  }, [id]);

  const handleChangeSearch = (value) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = filterMenuItems(menu);
      setFilteredMenu(filtered);
      if (menu.length > 0) setLoading(false);
    }, 300); // Adjust debounce time as needed

    return () => menu.length > 0 && clearTimeout(timer);
  }, [searchQuery, menu]); // Run effect whenever searchQuery changes

  // console.log("menu", menu);
  // console.log("filter menu", filteredMenu);

  // console.log("open drawer in sidebar", openDrawer);

  return (
    <Box component="nav">
      <Drawer
        // container={container}
        variant={mobile ? "temporary" : "permanent"}
        open={openDrawer}
      >
        <Box role="presentation">
          <List sx={{ mt: "64px" }}>
            <Box
              sx={{
                px: 2.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
                mb: 3,
              }}
            >
              {openDrawer && (
                <SearchField
                  value={searchQuery}
                  onChange={(e) => handleChangeSearch(e.target.value)}
                />
              )}

              <IconButton
                onClick={
                  openDrawer
                    ? () => handleDrawerClose("drawer")
                    : handleDrawerOpen
                }
              >
                {openDrawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </Box>
            <Loading loading={loading}>{renderLevels(filteredMenu)}</Loading>
          </List>
          <Divider sx={{ mt: 3 }} />
        </Box>
      </Drawer>
    </Box>
  );
}

// const container =
//   window !== undefined ? () => window().document.body : undefined;

const Loading = ({ loading, children }) => {
  return loading ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // width: "100%",
        // height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    children
  );
};

export default MiniDrawer;
