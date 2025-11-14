import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  styled,
  TableCell,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { WorkOrderContext } from "Context";
import moment from "moment";
import CustomTableCalendar from "page-sections/WorkOrder/customTableCalendar";
import React, { useContext, useEffect, useState } from "react";
import daysInMonth from "Utils/DaysInMonth";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CustomTableWorkOrder from "./CustomTable";
import CustomAutocomplete from "Component/Input/CustomAutocomplete";
import _ from "lodash";
import LoadingScreen from "Component/Loading Screen";

const StickyTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    left: 0,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2,
  },
  "&.MuiTableCell-body": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    left: 0,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 1,
  },
}));

const WorkOrderMonthly = () => {
  const theme = useTheme();
  const numDays = daysInMonth();
  const _thisMonth = moment().format("YYYY-MM");

  // context
  const {
    user,
    profileById,
    workOrderPlannings,
    jobRoles,
    getJobRoles,
    getWorkOrderPlannings,
  } = useContext(WorkOrderContext);

  // state
  const [filters, setFilters] = useState({
    month: _thisMonth,
    departement: user.departement,
    jobRole: profileById.jobPosition?._id ? [profileById.jobPosition?._id] : [],
    profile: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChangeFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (event) => {
    const checked = event.target.checked;
    const name = event.target.name;

    if (checked) {
      handleChangeFilter("jobRole", [profileById.jobPosition?._id]);
      handleChangeFilter(name, profileById._id);
    } else {
      handleChangeFilter(name, "");
    }
  };

  const handleChangeJobRoles = (newValue) => {
    let jobRoleIds = newValue?.map((i) => i._id);
    jobRoleIds = _.uniq(jobRoleIds);

    handleChangeFilter("jobRole", jobRoleIds);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await getWorkOrderPlannings(filters);
      await getJobRoles({ isLimit: false, departement: filters.departement });
      setLoading(false);
    };

    if (user._id) {
      fetchData();
    }
  }, [user, filters]);

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <TextField
          size="small"
          fullWidth
          name="month"
          type="month"
          value={filters.month}
          onChange={(e) => handleChangeFilter(e.target.name, e.target.value)}
          InputProps={{
            style: {
              width: "100%",
              fontSize: 12,
              height: 33,
              backgroundColor: "#fff",
              border: "none",
              borderRadius: 7,
            },
          }}
        />

        <CustomAutocomplete
          multiple
          clearOnBlur
          limitTags={2}
          label="Jabatan"
          options={jobRoles}
          value={jobRoles.filter((i) =>
            filters.jobRole.find((j) => j === i._id)
          )}
          getOptionLabel={(option) => option.name}
          onChange={(e, newValue) => handleChangeJobRoles(newValue)}
        />

        <FormControlLabel
          label={
            <Typography variant="caption">
              Tampilkan hanya dinasan saya
            </Typography>
          }
          control={
            <Checkbox
              size="small"
              checked={Boolean(filters.profile)}
              name="profile"
              onChange={handleCheckbox}
            />
          }
        />
      </Grid>
      <Grid mt={3} mb={3} item xs={12}>
        <Typography gutterBottom variant="body2" fontWeight={600}>
          Legend
        </Typography>
        <Stack gap={1}>
          {legends.map((item) => (
            <Box
              key={item.id}
              sx={{ display: "flex", gap: 0.5, alignItems: "center" }}
            >
              <FiberManualRecordIcon sx={{ fontSize: 18, color: item.color }} />
              <Typography variant="caption">{item.title}</Typography>
            </Box>
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <LoadingScreen loading={loading}>
          <Box sx={{ maxHeight: 500, overflow: "auto" }}>
            <CustomTableWorkOrder
              headers={headers}
              cellWidth={40}
              dayNumber={numDays}
            >
              {workOrderPlannings.map((item, index) => {
                return (
                  <>
                    <TableRow
                      sx={{ borderCollapse: "seperate" }}
                      key={item._id}
                    >
                      <StickyTableCell sx={{ width: 10 }} rowSpan={2}>
                        {index + 1}
                      </StickyTableCell>
                      <StickyTableCell sx={{ width: 50 }} rowSpan={2}>
                        <Box>
                          <Typography fontWeight={600} fontSize={12}>
                            {item.name}
                          </Typography>
                          <Typography fontSize={10}>
                            {item.jobPosition?.name || "-"}
                          </Typography>
                        </Box>
                      </StickyTableCell>
                      {Array.from({ length: numDays }, (_, i) => {
                        let color = "#CFCFCF";
                        let textColor = theme.palette.text.primary;
                        let borderColor = theme.palette.common.white;
                        let workOrder = "";

                        const data = item.data?.filter((data) => {
                          const date = Number(data?.day);

                          return date === i + 1;
                        });
                        let daily = item.realization?.filter((data) => {
                          const date = Number(data?.day);

                          return date === i + 1;
                        });
                        daily = daily?.map((wo) => wo.confirmed);

                        if (data.length > 0) {
                          color = theme.palette.common.white;
                          borderColor = "#CFCFCF";
                          workOrder = data
                            ?.map((data) => data?.workOrder?.code)
                            .join(" & ");

                          const everyIsConfirmed = daily?.every(
                            (i) => i === true
                          );
                          if (daily.length !== 0 && everyIsConfirmed) {
                            color = "secondary.main";
                            textColor = theme.palette.common.white;
                          }
                          if (
                            data?.find((wo) => wo.workOrder?.code === "OFF")
                          ) {
                            color = "primary.main";
                            textColor = theme.palette.common.white;
                            workOrder = "OFF";
                          }
                        }

                        return (
                          <>
                            <TableCell
                              sx={{
                                width: 40,
                                p: 0.3,
                                textAlign: "center",
                                fontSize: "0.6rem",
                                backgroundColor: color,
                                color: textColor,
                                border: `1px solid ${borderColor}`,
                                "& > button": {
                                  display: "none",
                                },
                              }}
                              key={i}
                            >
                              {workOrder}
                            </TableCell>
                          </>
                        );
                      })}
                    </TableRow>
                    <TableRow>
                      {Array.from({ length: numDays }, (_, i) => {
                        let color = "#CFCFCF";
                        let workOrder = "";

                        let monthly = item.data?.filter((data) => {
                          const date = Number(data?.day);

                          return date === i + 1;
                        });
                        let daily = item.realization?.filter((data) => {
                          const date = Number(data?.day);

                          return date === i + 1;
                        });

                        if (daily.length > 0) {
                          color = "success.main";
                          workOrder = daily
                            ?.map((wo) => wo?.workOrder?.code)
                            .join(" & ");

                          if (
                            daily?.find((wo) => wo.workOrder?.code === "OFF")
                          ) {
                            color = "primary.main";
                            workOrder = "OFF";
                          }

                          // set color warning if there's different data workorder in daily & monthly
                          monthly = monthly?.map((wo) => ({
                            day: wo.day,
                            code: wo.workOrder?.code,
                            month: wo.month,
                            departement: wo.departement,
                          }));
                          daily = daily?.map((wo) => ({
                            day: wo.day,
                            code: wo.workOrder?.code,
                            month: wo.month,
                            departement: wo.departement,
                          }));

                          if (!arraysEqualSet(daily, monthly)) {
                            color = "warning.main";
                          }
                        }

                        return (
                          <>
                            <TableCell
                              sx={{
                                width: 40,
                                p: 0.3,
                                textAlign: "center",
                                fontSize: "0.6rem",
                                backgroundColor: color,
                                color: theme.palette.common.white,

                                border: `1px solid ${theme.palette.common.white}`,
                                "& > button": {
                                  display: "none",
                                },

                                position: "relative",
                              }}
                              key={i}
                            >
                              {workOrder}
                            </TableCell>
                          </>
                        );
                      })}
                    </TableRow>
                  </>
                );
              })}
            </CustomTableWorkOrder>
          </Box>
        </LoadingScreen>
      </Grid>
    </Grid>
  );
};

const legends = [
  {
    id: 1,
    title: "Plan dan Realisasi Berubah",
    color: "warning.main",
  },
  {
    id: 2,
    title: "Plan dan Realisasi sesuai",
    color: "success.main",
  },
  {
    id: 3,
    title: "Data Realisasi belum dibuat",
    color: "#CFCFCF",
  },
  {
    id: 4,
    title: "Dinas telah dikonfirmasi",
    color: "secondary.main",
  },
  {
    id: 5,
    title: "Dinas OFF",
    color: "error.main",
  },
];

function arraysEqualSet(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const countOccurrences = (arr) => {
    const map = new Map();
    for (let obj of arr) {
      const key = JSON.stringify(obj);
      map.set(key, (map.get(key) || 0) + 1);
    }
    return map;
  };

  const count1 = countOccurrences(arr1);
  const count2 = countOccurrences(arr2);

  if (count1.size !== count2.size) return false;

  for (let [key, value] of count1) {
    if (count2.get(key) !== value) return false;
  }

  return true;
}

function checkMutation(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const countOccurrences = (arr) => {
    const map = new Map();
    for (let obj of arr) {
      const key = JSON.stringify(obj);
      map.set(key, (map.get(key) || 0) + 1);
    }
    return map;
  };

  const count1 = countOccurrences(arr1);
  const count2 = countOccurrences(arr2);

  if (count1.size !== count2.size) return false;

  for (let [key, value] of count1) {
    if (count2.get(key) !== value) return false;
  }

  return true;
}

function checkOFF(arr1, arr2) {
  const arr1Code = arr1.map((i) => i.workOrder);
  const arr2Code = arr2.map((i) => i.workOrder);

  if (arr1Code.includes("OFF") || arr2Code.includes("OFF")) return true;

  return false;
}

function extractDataWO(arr, num) {
  if (typeof arr === "undefined") return [];
  const extractedData = arr
    .filter((i) => {
      const sameDay = parseInt(i.day) === num;
      return sameDay;
    })
    .map((i) => ({
      month: i.month,
      day: i.day,
      departement: i.departement,
      workOrder: i.workOrder.code,
    }));

  return extractedData;
}

const headers = ["No", "Nama"];

export default WorkOrderMonthly;
