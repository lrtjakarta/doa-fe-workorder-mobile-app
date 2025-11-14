import { styled, Tab, tabClasses } from "@mui/material";

const TabItem = styled(Tab)(({ theme }) => ({
  opacity: 1,
  overflow: "initial",
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  borderTopLeftRadius: theme.spacing(2),
  borderTopRightRadius: theme.spacing(2),
  color: (theme.vars || theme).palette.common.white,
  // backgroundColor: (theme.vars || theme).palette.common.white,
  backgroundColor: "#A12700",
  transition: "0.2s",
  zIndex: 2,
  marginRight: 12,
  marginTop: theme.spacing(0.5),
  // fontSize: 12,
  // textTransform: "initial",

  [theme.breakpoints.up("md")]: {
    minWidth: 160,
  },
  "&:before": {
    transition: "0.2s",
  },
  "&:not(:first-of-type)": {
    "&:before": {
      content: '" "',
      position: "absolute",
      left: 0,
      display: "block",
      height: 20,
      width: "1px",
      zIndex: 1,
      marginTop: theme.spacing(0.5),
      fontWeight: "bold",
      // backgroundColor: (theme.vars || theme).palette.common.white,
      // backgroundColor: "#A12700",
      backgroundColor: "rgba(255, 255, 255, 0.5)", // Divider color
    },
    // marginRight: 0, // Remove margin on right for last item
  },
  [`& + .${tabClasses.selected}::before`]: {
    opacity: 0,
  },
  "&:hover": {
    [`&:not(.${tabClasses.selected})`]: {
      backgroundColor: "rgba(0 0 0 / 0.2)",
    },
    "&::before": {
      opacity: 0,
    },
    [`& + .${tabClasses.root}::before`]: {
      opacity: 0,
    },
  },
  [`&.${tabClasses.selected}`]: {
    backgroundColor: (theme.vars || theme).palette.common.white,
    color: (theme.vars || theme).palette.text.primary,
  },
  [`&.${tabClasses.selected} + .${tabClasses.root}`]: {
    zIndex: 1,
  },
  [`&.${tabClasses.selected} + .${tabClasses.root}::before`]: {
    opacity: 0,
  },
}));

export default TabItem;
