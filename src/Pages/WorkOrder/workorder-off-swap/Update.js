import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Grid,
  MenuItem,
  Stack,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import moment from "moment";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "Services/Api";
import { toast } from "react-toastify";
import { WorkOrderContext } from "Context";

const Approval = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  // context
  const { user, profileById } = useContext(WorkOrderContext);

  // state
  const [workOrderSwap, setWorkOrderSwap] = useState({});

  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      await API.getWorkOrderSwapById(_id)
        .then((res) => {
          const { data } = res;

          setWorkOrderSwap(data);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error("Terjadi kesalahan!");
        });
    };

    fetchData();
    return () => {
      setWorkOrderSwap({});
    };
  }, [_id]);

  const handleAction = async (type) => {
    if (type === "reject") {
      let reject = "replacement";
      if (workOrderSwap.approve?._id === profileById._id) reject = "approve";
      const data = { reject };
      await API.rejectSwap(_id, data)
        .then((res) => {
          const { message } = res.data;
          toast.error(message);

          navigate(-1);
          return;
        })
        .catch((err) => {
          console.log(err);
          return toast.error("Terjadi kesalahan!");
        });
    }
    if (type === "confirm") {
      console.log("confirm");
      if (!profileById.supervisor?._id)
        return toast.error(
          "Anda belum memiliki supervisor, silahkan menambahkan terlebih dahulu!"
        );
      const data = { supervisor: profileById.supervisor?._id };
      await API.confirmSwap(_id, data)
        .then((res) => {
          const { message } = res.data;
          toast.success(message);

          navigate(-1);
          return;
        })
        .catch((err) => {
          console.log(err);
          return toast.error("Terjadi kesalahan!");
        });
    }

    if (type === "approve") {
      console.log("approve");
      const data = { approveId: profileById._id };
      await API.approveSwap(_id, data)
        .then((res) => {
          const { message } = res.data;
          toast.success(message);

          navigate(-1);
          return;
        })
        .catch((err) => {
          console.log(err);
          return toast.error("Terjadi kesalahan!");
        });
    }
  };

  // color status
  let color = "warning";
  switch (workOrderSwap.status) {
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

  let isAdmin = false;
  if (user._id) {
    const roles = user.role?.map((i) => i.name?.toLowerCase()) || [];
    isAdmin = roles?.join(",")?.includes("admin");
  }

  let userType = "pemohon";
  if (workOrderSwap.replacement?.profile?._id === profileById._id)
    userType = "pengganti";
  if (workOrderSwap.approve?._id === profileById._id || isAdmin)
    userType = "supervisor";

  console.log("user type", userType);

  // button logic
  let rejectBtn = false;
  if (workOrderSwap.status === "requested" && userType === "pengganti")
    rejectBtn = true;
  if (workOrderSwap.status === "confirmed" && userType === "supervisor")
    rejectBtn = true;
  let confirmBtn =
    workOrderSwap.status === "requested" && userType === "pengganti";
  let approveBtn =
    workOrderSwap.status === "confirmed" && userType === "supervisor";

  // console.log("swap data", workOrderSwap);
  console.log("profile by id", profileById);
  return (
    <Box
      sx={{
        pt: 2,
        pb: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography textTransform="uppercase" fontWeight="bold" variant="h5">
            Pengajuan Tukar Libur
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Card
            sx={{
              p: 4,
              // minWidth: { xs: "auto", md: 480 },
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              INFO PENGAJUAN
            </Typography>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Table
                    sx={{
                      // width: "auto",
                      "& > .MuiTableRow-root > .MuiTableCell-root": {
                        borderBottom: "none",
                        width: 20,
                        ":nth-child(1)": {
                          width: "auto",
                          color: "text.semi",
                        },
                        ":nth-child(2)": {
                          width: 170,
                          textAlign: "left",
                        },
                      },
                      "& > .MuiTableRow-root": {
                        height: "auto",
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>
                        <Chip
                          sx={{ textTransform: "capitalize" }}
                          label={workOrderSwap.status}
                          color={color}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tukar Libur</TableCell>
                      <TableCell>
                        {moment(
                          workOrderSwap.replacement?.dailyWorkDate
                        ).format("DD/MM/yyyy")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Shift</TableCell>
                      <TableCell>
                        {`${workOrderSwap.applicant?.workOrder?.shift} -> ${workOrderSwap.replacement?.workOrder?.shift}`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kode Dinas</TableCell>
                      <TableCell>
                        {`${workOrderSwap.applicant?.workOrder?.code} -> ${workOrderSwap.replacement?.workOrder?.code}`}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                  <Table
                    sx={{
                      "& > .MuiTableRow-root > .MuiTableCell-root": {
                        borderBottom: "none",
                        width: 20,
                        ":nth-child(1)": {
                          width: "auto",
                          color: "text.semi",
                        },
                        ":nth-child(2)": {
                          width: 170,
                          textAlign: "left",
                        },
                      },
                      "& > .MuiTableRow-root": {
                        height: "auto",
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell>Nama Pemohon</TableCell>
                      <TableCell>
                        {workOrderSwap.applicant?.profile?.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>NIK</TableCell>
                      <TableCell>
                        {workOrderSwap.applicant?.profile?.idNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jabatan</TableCell>
                      <TableCell>
                        {workOrderSwap.applicant?.profile?.jobRole}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                  <Table
                    sx={{
                      "& > .MuiTableRow-root > .MuiTableCell-root": {
                        borderBottom: "none",
                        width: 20,
                        ":nth-child(1)": {
                          width: "auto",
                          color: "text.semi",
                        },
                        ":nth-child(2)": {
                          width: 170,
                        },
                      },
                      "& > .MuiTableRow-root": {
                        height: "auto",
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell>Nama Pengganti</TableCell>
                      <TableCell>
                        {workOrderSwap.replacement?.profile?.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>NIK</TableCell>
                      <TableCell>
                        {workOrderSwap.replacement?.profile?.idNumber}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jabatan</TableCell>
                      <TableCell>
                        {workOrderSwap.replacement?.profile?.jobRole}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ width: "100%" }} />
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            sx={{
              p: 1.5,
              width: "100%",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" textTransform="uppercase">
                  Riwayat
                </Typography>
              </Grid>
              {workOrderSwap.history?.map((item, index) => {
                let title = "Diajukan Oleh",
                  color = "success";
                switch (item.status) {
                  case "rejected":
                    title = "Ditolak Oleh";
                    color = "error";
                    break;
                  case "confirmed":
                    title = "Dikonfirmasi Oleh";
                    break;
                  case "approved":
                    title = "Disetujui Oleh";
                    break;
                  default:
                    break;
                }
                return (
                  <Grid key={item._id} item xs={12}>
                    <Table
                      sx={{
                        // width: "auto",
                        "& > .MuiTableRow-root > .MuiTableCell-root": {
                          borderBottom: "none",
                          width: 20,
                          ":nth-child(1)": {
                            width: "auto",
                            color: "text.semi",
                          },
                          ":nth-child(2)": {
                            width: 120,
                          },
                          ":nth-child(3)": {
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
                          <CheckCircleOutlinedIcon color={color} />
                        </TableCell>
                        <TableCell>{title}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography fontWeight="bold">
                              {item.name || "-"}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Typography variant="body2" color="text.semi">
                                {moment(item.date).format("DD/MM/yyyy")}
                              </Typography>
                              <Typography variant="body2" color="text.semi">
                                {moment(item.date).format("HH:mm")}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Box>
        <Stack direction="row" gap={1} justifyContent="center">
          {rejectBtn && (
            <Button
              onClick={() => handleAction("reject")}
              fullWidth
              variant="outlined"
              color="error"
            >
              Tolak
            </Button>
          )}
          {confirmBtn && (
            <Button
              onClick={() => handleAction("confirm")}
              fullWidth
              color="secondary"
              variant="contained"
            >
              Terima
            </Button>
          )}
          {approveBtn && (
            <Button
              onClick={() => handleAction("approve")}
              fullWidth
              color="success"
              variant="contained"
            >
              Setuju
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Approval;
