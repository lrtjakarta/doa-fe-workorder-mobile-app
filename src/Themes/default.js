import tinycolor from "tinycolor2";
import Fonts from "./Fonts";

const primary = "#ED1C24";
const secondary = "#3E97FF";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";

const lightenRate = 7.5;
const darkenRate = 15;

export default {
  shape: {
    borderRadius: 8,
  },
  typography: {
    // button: {
    //   fontSize: 241,
    // },
    // ...Fonts.style,
    fontFamily: ['"Inter"', "sans-serif"].join(","),
    // fontSize: 12,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: primary,
      secondary: "#FCD30C",
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary).lighten(lightenRate).toHexString(),
      dark: tinycolor(secondary).darken(darkenRate).toHexString(),
      contrastText: "#FFFFFF",
    },
    warning: {
      main: warning,
      light: tinycolor(warning).lighten(lightenRate).toHexString(),
      dark: tinycolor(warning).darken(darkenRate).toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success).lighten(lightenRate).toHexString(),
      dark: tinycolor(success).darken(darkenRate).toHexString(),
      contrastText: "#FFF",
    },
    info: {
      main: info,
      light: tinycolor(info).lighten(lightenRate).toHexString(),
      dark: tinycolor(info).darken(darkenRate).toHexString(),
    },
    text: {
      primary: "#181C32",
      secondary: "#6E6E6E",
      semi: "#A1A5B7",
      disabled: "#7E8299",
    },
    disabled: {
      main: "#7E8299",
    },
    background: {
      // default: "#F6F7FF",
      light: "#F3F5FF",
      gray: "#F9F9F9",
    },
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },

  components: {
    // MuiTableRow: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiTableCell-root": {
    //         borderBottom: "dashed #A1A5B7",
    //       },
    //     },
    //   },
    // },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& th": {
            color: "#A1A5B7", // Set color for text
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: "dense",
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: "#A1A5B7",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#7E8299",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        size: "small",
      },
      // styleOverrides: {
      //   root: {
      //     textTransform: "none",
      //     // fontSize: 18,
      //     // padding: "8px 14px",
      //     // paddingLeft: 3,
      //     // paddingRight: 3,
      //     // paddingTop: 1,
      //     // paddingBottom: 1,
      //     fontWeight: "bold",
      //   },
      // },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          // padding: "12px 16px",
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 10,
          paddingBottom: 10,
          textTransform: "none",
          // fontSize: 16,
          fontWeight: "bold",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 600,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&$selected": {
            backgroundColor: "#F3F5FF !important",
            "&:focus": {
              backgroundColor: "#F3F5FF",
            },
          },
          // fontWeight: 600,
        },
        button: {
          "&:hover, &:focus": {
            backgroundColor: "#F3F5FF",
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "#4A4A4A1A",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow:
            "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#B9B9B9",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&$selected": {
            backgroundColor: "#F3F5FF !important",
            "&:focus": {
              backgroundColor: "#F3F5FF",
            },
          },
        },
        button: {
          "&:hover, &:focus": {
            backgroundColor: "#F3F5FF",
          },
        },
      },
      defaultProps: {
        dense: true,
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
      },
      // styleOverrides: {
      //   "&:hover": {
      //     borderColor: "red",
      //   },
      // },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {
        // "&:hover": {
        //   borderColor: "red",
        // },
        root: {
          minWidth: 120,
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiTouchRipple: {
      styleOverrides: {
        child: {
          backgroundColor: "white",
        },
      },
    },

    MuiOutlinedInput: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: secondary,
            },
          },
          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: secondary,
            },
          },
        },
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    // MuiTableRow: {
    //   styleOverrides: {
    //     root: {
    //       height: 56,
    //     },
    //   },
    // },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(224, 224, 224, .5)",
        },
        head: {
          fontSize: "0.95rem",
        },
        body: {
          fontSize: "0.95rem",
        },
      },
    },
  },

  // overrides: {
  //
  // },
};
