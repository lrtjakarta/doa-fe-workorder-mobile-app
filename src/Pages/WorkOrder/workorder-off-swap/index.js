import { Add } from "@mui/icons-material";
import {
  Box,
  Card,
  Chip,
  Fab,
  Stack,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { WorkOrderContext } from "Context";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "Services/Api";

const WorkOrderSwap = () => {
  const navigate = useNavigate();

  // context
  const { user, profileById } = useContext(WorkOrderContext);

  // state
  const [workOrderSwaps, setWorkOrderSwaps] = useState([]);

  // effect
  useEffect(() => {
    const fetchData = async () => {
      await API.getWorkOrderSwap({
        userId: user._id,
        departement: user.departement,
        date: moment().format("YYYY-MM-DD"),
        type: "OFF",
      })
        .then((res) => {
          const { success, data } = res.data;

          setWorkOrderSwaps(data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Terjadi kesalahan saat mengambil data :(");
        });
    };

    if (user._id) {
      fetchData();
    }
    return () => {};
  }, [user]);

  const handleActions = (type, value) => {
    switch (type) {
      case "detail":
        navigate(`/app/work-order/swap/off/update/${value._id}`);
        break;
      case "add":
        navigate("/app/work-order/swap/off/request");

        break;
      default:
        break;
    }
  };

  console.log("data", workOrderSwaps);
  // console.log("user", user);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            textTransform="uppercase"
            fontWeight="bold"
            variant="h6"
            gutterBottom
          >
            Pengajuan Tukar Libur
          </Typography>
          <Stack spacing={2}>
            {workOrderSwaps.map((item) => {
              let color = "warning";

              switch (item.status) {
                case "rejected":
                  color = "error";
                  break;
                case "confirmed":
                  color = "secondary";
                  break;
                case "approved":
                  color = "success";
                  break;
                default:
                  break;
              }

              return (
                <Card key={item._id} sx={{ p: 2, width: "100%" }}>
                  <Box
                    // component={Button}
                    onClick={() => handleActions("detail", item)}
                    // sx={{ p: 0, color: "inherit" }}
                  >
                    <Stack
                      mb={1}
                      direction="row"
                      justifyContent="space-between"
                    ></Stack>
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
                          },
                        },
                        "& > .MuiTableRow-root": {
                          height: "auto",
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Chip
                            sx={{ textTransform: "capitalize" }}
                            label={item.status}
                            color={color}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {moment(item.updatedAt).format("DD/MM/yyyy HH:mm")}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tanggal Tukar Libur</TableCell>
                        <TableCell>
                          {moment(item.applicant?.dailyWorkDate).format(
                            "DD/MM/yyyy"
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Kode Dinas</TableCell>
                        <TableCell>{item.applicant?.workOrder?.code}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Nama Pengganti</TableCell>
                        <TableCell>{item.replacement?.profile?.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tanggal Pengganti</TableCell>
                        <TableCell>
                          {moment(item.replacement?.dailyWorkDate).format(
                            "DD/MM/yyyy"
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Kode Dinas Pengganti</TableCell>
                        <TableCell>
                          {item.replacement?.workOrder?.code}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Box>
                </Card>
              );
            })}
          </Stack>
        </Box>

        <Fab
          sx={{
            py: 3.5,
            position: "sticky",
            display: "flex",
            ml: "auto",
            right: 0,
            bottom: 90,
          }}
          size="large"
          color="secondary"
          aria-label="add"
          onClick={() => handleActions("add")}
        >
          <Add />
        </Fab>
      </Box>
    </>
  );
};

export default WorkOrderSwap;
