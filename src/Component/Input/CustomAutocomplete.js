import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const CustomAutocomplete = ({
  label,
  options,
  getOptionLabel,
  onChange,
  fullWidth,
  autoComplete = "new-password",
  ...rest
}) => {
  return (
    <Autocomplete
      {...rest}
      size="small"
      fullWidth={fullWidth}
      options={options}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete, // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
