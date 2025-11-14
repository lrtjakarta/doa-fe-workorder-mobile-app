import { TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import DateIcon from "Component/Icons/Date";

const CustomDatePicker = ({
  label,
  disabled,
  textRequired = "Tanggal tidak boleh kosong",
  format = undefined,
  onChange,
  size = "small",
  noFullWidth,
  ...rest
}) => {
  // console.log("no fullwidth", noFullWidth);
  return (
    // <Box component="div" sx={{ display: "flex", flexGrow: 1 }}>
    // </Box>
    <MobileDatePicker
      label={label}
      disabled={disabled}
      format={format}
      onChange={onChange}
      slots={{
        openPickerIcon: DateIcon,
      }}
      slotProps={{
        textField: {
          fullWidth: !noFullWidth,
          size,
          sx: {
            // margin: 0,
            // mb: 0,
            // py: 0.5,
            justifyContent: "center",
          },
        },
      }}
      renderInput={(params) => <TextField {...params} />}
      {...rest}
    />
  );
};

export default CustomDatePicker;
