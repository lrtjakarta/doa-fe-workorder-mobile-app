import defaultTheme from "./default";

import { createTheme, responsiveFontSizes } from "@mui/material";

export default {
  default: responsiveFontSizes(createTheme({ ...defaultTheme })),
};
