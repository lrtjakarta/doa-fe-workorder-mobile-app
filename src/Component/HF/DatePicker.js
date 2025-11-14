import { TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import DateIcon from "Component/Icons/Date";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";

const CustomDatePicker = ({
  control,
  name,
  label,
  disabled,
  required = false,
  textRequired = "Tanggal tidak boleh kosong",
  format = undefined,
  // onChange,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      rules={required ? { required: textRequired } : {}}
      render={({ field, fieldState }) => {
        if (!field.value && !!fieldState.error?.message) {
          toast.error(fieldState.error?.message);
        }
        return (
          <MobileDatePicker
            {...rest}
            label={label}
            disabled={disabled}
            format={format}
            value={
              field.value
                ? new Date(field.value)
                : typeof field.value === "undefined" ||
                  typeof field.value === "string"
                ? new Date()
                : field.value
            }
            onChange={(newValue) => field.onChange(newValue)}
            slots={{
              openPickerIcon: DateIcon,
              ...rest.slots,
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!fieldState.error,
                helperText: fieldState.error?.message,
                onBlur: field.onBlur,
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        );
      }}
    />
  );
};

export default CustomDatePicker;
