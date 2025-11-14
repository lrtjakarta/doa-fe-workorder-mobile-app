import { TextField } from "@mui/material";
import { forwardRef } from "react";

const CustomTextField = forwardRef((props, ref) => {
  const { name, watch } = props;
  let shrink = false;
  if (watch && name) {
    // console.log(watch(name));
    shrink = !!watch(name);
  }

  // console.log(name, shrink);
  return (
    <TextField ref={ref} {...props} fullWidth InputLabelProps={{ shrink }} />
  );
});

export default CustomTextField;
