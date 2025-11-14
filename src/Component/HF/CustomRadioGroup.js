import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Controller } from "react-hook-form";

function CustomRadioGroup({
  name,
  label,
  options,
  control,
  defaultValue,
  onChange,
  row,
}) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup
            aria-label={label}
            {...field}
            row={row}
            onChange={(e) => {
              field.onChange(e.target.value);
              onChange && onChange(e.target.value);
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}

export default CustomRadioGroup;
