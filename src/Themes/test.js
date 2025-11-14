import { createTheme } from "@mui/material";

export default {
  default: createTheme({
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiDivider: {
        styleOverrides: {
          root: {
            color: "#A1A5B7",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            textTransform: "none",
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
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  }),
};
