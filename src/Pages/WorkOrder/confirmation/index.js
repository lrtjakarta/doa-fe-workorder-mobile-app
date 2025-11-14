import { Box, Grid, TableCell, TableRow, TextField } from "@mui/material";
import { WorkOrderContext } from "Context";
import moment from "moment";
import CustomTableCalendar from "page-sections/WorkOrder/customTableCalendar";
import { useContext, useEffect, useState } from "react";

// icons
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DialogConfirmation from "page-sections/WorkOrder/dialogConfirmation";

const Confirmation = () => {
  const _thisMonth = moment().format("YYYY-MM");

  // context
  const { user, workOrderConfirmations, getWorkOrderConfirmations } =
    useContext(WorkOrderContext);

  // state
  const [month, setMonth] = useState(_thisMonth);
  const [fetching, setFetching] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState({
    open: false,
    data: [],
    title: "",
  });
  const [dataDates, setDataDates] = useState({
    firstDate: moment(_thisMonth).day(),
    lastDate: moment(_thisMonth).daysInMonth(),
  });

  const handleChangeMonth = (value) => {
    console.log("value", value);
    setMonth(value);
    setDataDates((prev) => ({
      ...prev,
      firstDate: moment(value).day(),
      lastDate: moment(value).daysInMonth(),
    }));
  };

  useEffect(() => {
    if (user._id) {
      const params = {
        departement: user.departement,
        month: month,
      };
      getWorkOrderConfirmations(user._id, params);
    }
  }, [user, month, fetching]);

  const handleClose = (action) => {
    setOpenConfirmation((prev) => ({
      ...prev,
      open: false,
      data: [],
      title: "",
    }));
    if (action === "fetch") {
      setFetching((prev) => !prev);
    }
  };

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            type="month"
            value={month}
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
        <Grid item xs={12}>
          <CustomTableCalendar>
            {[0, 1, 2, 3, 4, 5].map((item) => {
              // Calculate the range of days for this week
              const startDay = item * 7 + 1 - dataDates.firstDate;
              const endDay = startDay + 6; // Days in this week

              // NEW: Check if this week has any valid days
              if (startDay > dataDates.lastDate) {
                return null; // Skip this entire week
              }

              // Jika sudah yakin week ini punya hari yang valid, render
              return (
                <TableRow
                  key={`week-${item}`} // Add key for list rendering
                  sx={{
                    "& > .MuiTableCell-root": {
                      textAlign: "center",
                    },
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((date) => {
                    const dayNumber = item * 7 + date - dataDates.firstDate;

                    // --- Logic untuk cell (sama seperti sebelumnya) ---
                    if (dayNumber <= 0 || dayNumber > dataDates.lastDate) {
                      // Kosongkan cell untuk hari di luar bulan ini
                      return <TableCell key={`empty-${dayNumber}`}></TableCell>;
                    }

                    const dataWORealization = workOrderConfirmations.filter(
                      (i) => parseInt(i.day) === dayNumber && i.status !== "OFF"
                    );
                    const idWorkOrders = dataWORealization.map((i) => ({
                      _id: i._id,
                      name: i.workOrder?.code,
                    }));

                    let isConfirmed = false;
                    const dataConfirmed = dataWORealization.map(
                      (i) => i.confirmed
                    );
                    const everyIsConfirmed = dataConfirmed.every(
                      (i) => i === true
                    );

                    if (dataConfirmed.length !== 0 && everyIsConfirmed) {
                      isConfirmed = true;
                    }

                    let color = "inherit";
                    let textColor = "inherit";
                    if (dataWORealization.length > 0) {
                      color = "success.main";
                      textColor = "white";
                    }

                    return (
                      <TableCell
                        key={`day-${dayNumber}`} // Add key for list rendering
                        onClick={() => {
                          if (!everyIsConfirmed) {
                            setOpenConfirmation((prev) => ({
                              ...prev,
                              open: true,
                              data: idWorkOrders,
                              title: dayNumber,
                            }));
                          }
                        }}
                        sx={{
                          position: "relative",
                          bgcolor: color,
                          color: textColor,
                          cursor:
                            !everyIsConfirmed && dataConfirmed.length !== 0
                              ? "pointer"
                              : undefined,
                        }}
                      >
                        <Box>
                          {dayNumber}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 1,
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            {idWorkOrders.map((wo) => wo.name).join(", ")}
                          </Box>
                        </Box>
                        {isConfirmed && (
                          <FiberManualRecordIcon
                            color="primary"
                            sx={{
                              fontSize: 12,
                              position: "absolute",
                              top: 0,
                              right: 0,
                            }}
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </CustomTableCalendar>
        </Grid>
      </Grid>

      {/* Dialog confirmation */}
      {openConfirmation.open && (
        <DialogConfirmation
          open={openConfirmation.open}
          data={openConfirmation.data}
          title={openConfirmation.title}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default Confirmation;
