import {
  Box,
  Card,
  Divider,
  Grid,
  Table,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { WorkOrderContext } from "Context";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import daysInMonth from "Utils/DaysInMonth";

const WorkOrderDaily = () => {
  const numDays = daysInMonth();
  const _thisDate = moment().format("YYYY-MM-DD");

  // context
  const { user, workOrderRealizations, getWorkOrderRealizations } =
    useContext(WorkOrderContext);

  // state
  const [date, setDate] = useState(_thisDate);

  const handleChangeMonth = (value) => {
    console.log("value", value);
    setDate(value);
    // setDataDates((prev) => ({
    //   ...prev,
    //   firstDate: moment(value).day(),
    //   lastDate: moment(value).add(1, "month").daysInMonth(),
    // }));
  };

  useEffect(() => {
    if (user._id) {
      const params = {
        departement: user.departement,
        dailyWorkDate: date,
      };
      getWorkOrderRealizations(params);
    }
  }, [user, date]);

  // console.log("data", dataDates);
  // console.log("datas", workOrderRealizations);
  // console.log("user", user);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          size="small"
          fullWidth
          type="date"
          value={date}
          onChange={(e) => handleChangeMonth(e.target.value)}
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
      </Grid>
      {workOrderRealizations.map((item) => {
        return (
          <Grid item xs={12}>
            <Card elevation={1} sx={{ p: 1, my: 0.5, width: "100%" }}>
              <Box sx={{ ml: 2 }}>
                <Typography fontWeight={600} variant="body1">
                  {item.workOrder?.code}
                </Typography>
                <Typography variant="subtitle2">
                  {item.profile?.name}
                </Typography>
              </Box>
              <Divider sx={{ width: "100%", my: 0.4 }} />
              <Table
                sx={{
                  "& > .MuiTableRow-root > .MuiTableCell-root": {
                    borderBottom: "none",
                    width: 20,
                    ":nth-child(1)": {
                      width: "auto",
                      color: "text.semi",
                      // p: 0,
                    },
                    ":nth-child(2)": {
                      textAlign: "left",
                      p: 0,
                      width: "auto",
                      fontWeight: 600,
                    },
                  },
                  "& > .MuiTableRow-root": {
                    height: "auto",
                  },
                }}
              >
                {/* <TableRow>
                  <TableCell>Kode</TableCell>
                  <TableCell>{item.workOrder?.code}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell>{item.profile?.name}</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell>Jabatan</TableCell>
                  <TableCell>{item.profile?.jobRole}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mulai</TableCell>
                  <TableCell>{item.workOrder?.start}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Habis</TableCell>
                  <TableCell>{item.workOrder?.end}</TableCell>
                </TableRow>
              </Table>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default WorkOrderDaily;
