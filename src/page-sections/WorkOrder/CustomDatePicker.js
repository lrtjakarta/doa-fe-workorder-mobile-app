import { styled, TextField } from "@mui/material";
import {
  MobileDatePicker,
  PickersDay,
  pickersDayClasses,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import DateIcon from "Component/Icons/Date";
import moment from "moment";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "availDates" && prop !== "colorMain",
})(({ availDates, colorMain, day, theme }) => {
  let status = "";
  let color = colorMain || theme.palette.info.main;

  const availableDate = getAvailDate(day, availDates);
  if (availableDate) {
    status = availableDate?.status;

    switch (status) {
      case "requested":
        color = theme.palette.warning.main;
        break;
      case "rejected":
        color = theme.palette.primary.main;
        break;
      case "confirmed":
        color = theme.palette.secondary.main;
        break;
      case "approved":
        color = theme.palette.success.main;
        break;

      default:
        break;
    }
  }

  return {
    color: color,
    borderRadius: "7px",
    borderWidth: "1px",
    borderColor: color,
    border: "1px solid",
    backgroundColor: theme.palette.common.white,

    "&:focus": {
      backgroundColor: theme.palette.common.white,
    },
    "&.MuiPickersDay-today:not(Mui.selected)": {
      border: `1px solid ${color}`,
      // borderColor: theme.palette.secondary.light,
    },
    // [`&.${pickersDayClasses.today}`]: {
    //   borderColor: color,
    //   color: color,
    //   backgroundColor: theme.palette.common.white,
    // },
    "&:hover": {
      color: theme.palette.warning.light,
      borderColor: theme.palette.common.white,
      backgroundColor: theme.palette.common.white,
    },
    "&.Mui-disabled": {
      // "&.Mui-disabled": {
      //   color: theme.palette.action.disabled,
      // },
      color: theme.palette.warning.light,
      borderColor: theme.palette.common.white,
      backgroundColor: theme.palette.common.white,
    },
    "&.Mui-selected": {
      ":hover": {
        color: theme.palette.warning.light,
        borderColor: theme.palette.common.white,
        backgroundColor: theme.palette.common.white,
      },
      ":focus": {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.secondary.main,
      },
      color: theme.palette.common.white,
      borderColor: theme.palette.secondary.light,
      backgroundColor: theme.palette.secondary.light,
    },
  };
});

const CustomDatePicker = ({
  control,
  name,
  label,
  disabled,
  colorMain,
  workOrderDates = [],
  required = false,
  textRequired = "Tanggal tidak boleh kosong",
  format = undefined,
  onChange,
  ...rest
}) => {
  const memoWorkOrderDates = useMemo(() => workOrderDates, [workOrderDates]);
  // const memoPickersDay = useMemo(() => CustomPickersDay, [workOrderDates]);
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
          <StaticDatePicker
            {...rest}
            label={label}
            disabled={disabled}
            format={format}
            shouldDisableMonth={(date) => !getAvailDate(date, workOrderDates)}
            value={
              field.value
                ? new Date(field.value)
                : typeof field.value === "undefined" ||
                  typeof field.value === "string"
                ? new Date()
                : field.value
            }
            onChange={(newValue) => {
              if (onChange) return onChange(newValue);
              return field.onChange(newValue);
            }}
            slots={{
              // openPickerIcon: DateIcon,
              day: CustomPickersDay,
            }}
            slotProps={{
              actionBar: {
                actions: [""],
              },
              day: {
                availDates: memoWorkOrderDates,
                colorMain,
              },
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

const getAvailDate = (day, arrDates) => {
  const availableDate = arrDates.find(
    (i) =>
      moment(i.dailyWorkDate).format("YYYY-MM-DD") ===
      moment(day).format("YYYY-MM-DD")
  );

  return availableDate;
};

export default CustomDatePicker;
