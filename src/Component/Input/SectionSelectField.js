import { FormControl, InputLabel, Select } from "@mui/material";
import { forwardRef } from "react";

const SectionSelectField = forwardRef(
  ({ children, label, size = "small", ...rest }, ref) => (
    <FormControl {...rest} size={size}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        label={label}
        ref={ref}
        {...rest}
        size={size}
        labelId="demo-simple-select-label"
      >
        {children}
      </Select>
    </FormControl>
  )
);

export default SectionSelectField;
