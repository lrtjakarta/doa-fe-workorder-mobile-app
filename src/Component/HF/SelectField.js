import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectField = ({
  control,
  name,
  label,
  children,
  // error: _error,
  // helperText,
  disabled,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl disabled={disabled} fullWidth error={!!error}>
            <InputLabel size="small" id="demo-simple-select-label">
              {label}
            </InputLabel>
            <Select
              {...rest}
              {...field}
              label={label}
              size="small"
              labelId="demo-simple-select-label"
            >
              {children}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
};

export default SelectField;
