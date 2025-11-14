import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableCell,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { Search } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import SectionSelectField from "Component/Input/SectionSelectField";
import { WorkOrderContext } from "Context";
import moment from "moment";
import CustomDatePicker from "page-sections/WorkOrder/CustomDatePicker";
import DialogLegend from "page-sections/WorkOrder/dialogLegend";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "Services/Api";
import * as Yup from "yup";

/*
    Alur tukar libur :
      - karyawan yg mengajukan (misal karyawan1) adalah karyawan yg memiliki dinas aktif
      - karyawan1 memilih tanggal dinas, kemudian akan keluar pilihan orang2 yg dinas OFF di tgl tsb
      - setelah memilih karyawan pengganti (misal karyawan2), maka karyawan1 akan memilih tanggal libur pengganti untuk karyawan2
      - tgl libur pengganti yg dpt dipilih adalah tanggal dimana karyawan1 OFF dan karyawan2 berdinas
   */
const validationSchema = Yup.object({
  workOrderDate: Yup.string().required("Tanggal Dinas tidak boleh kosong"),
  status: Yup.string(),
  reason: Yup.string(),
});

const Request = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // context
  const { profileById, getProfiles } = useContext(WorkOrderContext);

  // state
  const [openLegend, setOpenLegend] = useState(false);
  const [cutoff, setCutoff] = useState(0);
  const [workOrderUsers, setWorkOrderUsers] = useState([]);
  const [applicantOptions, setApplicantOptions] = useState({
    option: false,
    data: [],
  });
  const [replacementOptions, setReplacementOptions] = useState({
    option: false,
    data: [],
  });
  const [workOrderOFFUsers, setWorkOrderOFFUsers] = useState([]);
  const [replacementWorkOrders, setReplacementWorkOrders] = useState({
    workOrderApplicant: {},
    replacementOFf: {},
    replacements: [],
  });
  const [search, setSearch] = useState(false);

  const initialValues = {
    workOrderDate: null,
    workOrderDateOFF: null,
    approve: profileById.supervisor?._id,
    applicant: "",
    replacement: "",
    replacementOff: "",
    reason: "",
    status: "requested",
  };

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const getAvailableDate = async () => {
    try {
      const params = {
        profile: profileById._id,
        departement: profileById.departement?._id,
        date: moment().format("YYYY-MM-DD"),
        type: "Berdinas",
      };
      let data = await API.getAvailableDate(params);
      data = data.data;

      console.log("data", data);
      setWorkOrderUsers(data);
    } catch (error) {
      const message = error.response?.data?.message;
      if (message === "Data cutoff is empty") {
        toast.error(
          "Waktu minimum belum didefinisikan! Silahkan hubungi admin departemen Anda :)"
        );
      }
      console.log("error fetch available date", error);
    }
  };

  const getCutOff = async () => {
    try {
      const params = {
        departement: profileById.departement?._id,
        type: "Tukar Libur",
      };

      let data = await API.getCutoffs(params);
      data = data.data;

      if (data?.length > 0) {
        setCutoff(data[0]?.limit);
      }
    } catch (error) {
      console.log("error get cutoff data", error);
    }
  };

  const getOFFDate = async (replacementProfile) => {
    try {
      const params = {
        profile: profileById._id,
        replacement: replacementProfile,
        departement: profileById.departement?._id,
        date: moment().format("YYYY-MM-DD"),
      };
      let data = await API.getAvailableWorkOrderOFFDate(params);
      data = data.data;

      console.log("data", data);
      setWorkOrderOFFUsers(data);
    } catch (error) {
      console.log("error fetch available date", error);
    }
  };

  // effect
  useEffect(() => {
    if (profileById._id) {
      const params = {
        isLimit: false,
        jobPosition: profileById.jobPosition?._id,
      };

      getProfiles(params);
      getAvailableDate();
      getCutOff();
    }
  }, [profileById]);

  useEffect(() => {
    setSearch(false);
  }, [watch("workOrderDate")]);

  const onSubmit = async (values) => {
    console.log("values", values);

    // return error if has no supervisor
    if (!values.approve)
      return toast.error(
        "Anda belum memiliki supervisor, harap menambah pada menu profil"
      );

    await API.requestSwap(values)
      .then((res) => {
        const { message } = res.data;
        toast.success(message);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Terjadi kesalahan!");
      });
  };

  const handleSearchWorkOrdersApplicant = async () => {
    if (!watch("workOrderDate"))
      return toast.error("Harap masukkan tanggal dinas terlebih dahulu");

    const params = {
      type: "OFF",
      profileId: profileById._id,
      departement: profileById.departement?._id,
      selectedDate: moment(watch("workOrderDate")).format("YYYY-MM-DD"),
    };

    try {
      const _data = await API.geReplacementSwaps(params);
      console.log("data", _data.data);
      const { workOrder, others } = _data.data?.data;

      if (Array.isArray(workOrder) && workOrder.length > 1) {
        // reset selected value
        setReplacementWorkOrders((prev) => ({
          ...prev,
          workOrderApplicant: {},
          replacements: others,
        }));

        setApplicantOptions((prev) => ({
          ...prev,
          option: true,
          data: workOrder,
        }));
      } else {
        // reset options
        setApplicantOptions((prev) => ({
          ...prev,
          option: false,
          data: [],
        }));
        setReplacementWorkOrders((prev) => ({
          ...prev,
          workOrderApplicant: workOrder[0] || {},
          replacements: others,
        }));

        setValue("applicant", workOrder[0]._id);
      }

      setSearch(true);
    } catch (error) {
      console.log("error fetch replacements data", error);
      toast.error("Terjadi kesalahan");
    }
  };

  const handleSelectedOptionWorkOrder = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "applicant") {
      setReplacementWorkOrders((prev) => ({
        ...prev,
        workOrderApplicant: value,
      }));

      setValue("applicant", value?._id);
    }
    if (name === "replacement") {
      setReplacementWorkOrders((prev) => ({ ...prev, replacementOFf: value }));
      setValue("replacement", value?._id);
    }
  };

  const handleChangeReplacementDate = (value) => {
    const replacementAvailable = workOrderOFFUsers.find(
      (i) => i.dailyWorkDate === moment(value).format("YYYY-MM-DD")
    )?.replacementAvailable;

    if (
      Array.isArray(replacementAvailable) &&
      replacementAvailable.length > 1
    ) {
      setValue("replacement", "");
      setReplacementOptions((prev) => ({
        ...prev,
        option: true,
        data: replacementAvailable,
      }));
    } else {
      setReplacementOptions((prev) => ({ ...prev, option: false, data: [] }));

      setReplacementWorkOrders((prev) => ({
        ...prev,
        replacementOFf: replacementAvailable[0],
      }));
      setValue("replacement", replacementAvailable[0]?._id);
    }

    setValue("workOrderDateOFF", value);
  };

  const handleUserToReplacement = async (value) => {
    await getOFFDate(value?.profile?._id);
    setValue("replacementOff", value?._id);
  };

  // set start date
  let startDate = new Date(moment().format("YYYY-MM-DD"));

  return (
    <>
      <Box
        sx={{ overflow: "auto", py: 1 }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            gap: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              textTransform="uppercase"
              fontWeight="bold"
              variant="h6"
              gutterBottom
            >
              Pengajuan Tukar Libur
            </Typography>

            <Stack justifyContent="center">
              <Paper
                sx={{
                  px: 1,
                  py: 2,
                  width: "100%",
                  overflow: "auto",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <Alert severity="warning">
                  {`Perhatian! Pengajuan tukar dinas/libur minimal ${cutoff} hari`}
                </Alert>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                  <IconButton
                    onClick={() => setOpenLegend(true)}
                    color="secondary"
                    size="small"
                  >
                    <InfoIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomDatePicker
                      workOrderDates={workOrderUsers}
                      name="workOrderDate"
                      control={control}
                      format="dd/MM/yyyy"
                      label="Tanggal Dinas"
                      minDate={startDate}
                      views={["month", "day"]}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ width: "100%" }} />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      onClick={() => handleSearchWorkOrdersApplicant()}
                      fullWidth
                      variant="contained"
                      color="secondary"
                      startIcon={<Search />}
                    >
                      Cari
                    </Button>
                  </Grid>

                  {search && (
                    <>
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
                            <TableCell>Kode Dinas</TableCell>
                            <TableCell>
                              {applicantOptions.option ? (
                                <SectionSelectField
                                  fullWidth
                                  label="Pilih Dinasan"
                                  name="applicant"
                                  value={applicantOptions.data.find(
                                    (wo) =>
                                      wo.workOrder?.code ===
                                      replacementWorkOrders.workOrderApplicant
                                        .workOrder?.code
                                  )}
                                  onChange={(e) =>
                                    handleSelectedOptionWorkOrder(e)
                                  }
                                >
                                  {applicantOptions.data.map((wo) => (
                                    <MenuItem key={wo._id} value={wo}>
                                      {wo.workOrder?.code}
                                    </MenuItem>
                                  ))}
                                </SectionSelectField>
                              ) : (
                                replacementWorkOrders.workOrderApplicant
                                  .workOrder?.code
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Mulai/Selesai</TableCell>
                            <TableCell>
                              {`${
                                replacementWorkOrders.workOrderApplicant
                                  .workOrder?.start || "-"
                              } / ${
                                replacementWorkOrders.workOrderApplicant
                                  .workOrder?.end || "-"
                              }`}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Shift</TableCell>
                            <TableCell sx={{ textTransform: "uppercase" }}>
                              {replacementWorkOrders.workOrderApplicant
                                .workOrder?.shift || "-"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Lokasi</TableCell>
                            <TableCell>
                              {replacementWorkOrders.workOrderApplicant
                                .workOrder?.location || "-"}
                            </TableCell>
                          </TableRow>
                        </Table>
                      </Grid>

                      {replacementWorkOrders.replacements.length > 0 && (
                        <>
                          <Grid item xs={12}>
                            <SectionSelectField
                              onChange={(e) =>
                                handleUserToReplacement(e.target.value)
                              }
                              value={replacementWorkOrders.replacements.find(
                                (i) => i._id === watch("replacement")
                              )}
                              fullWidth
                              label="Pilih Pengganti"
                            >
                              {replacementWorkOrders.replacements
                                // .filter((i) => i._id !== profileById._id)
                                .map((item) => (
                                  <MenuItem
                                    sx={{ textTransform: "uppercase" }}
                                    key={item._id}
                                    value={item}
                                  >
                                    {`${item.profile?.name} /  ${item.workOrder?.code}`}
                                  </MenuItem>
                                ))}
                            </SectionSelectField>
                          </Grid>
                        </>
                      )}

                      {watch("replacementOff") && (
                        <>
                          <Grid item xs={12}>
                            <Typography fontWeight={600} gutterBottom>
                              Pilih Tanggal Libur Pengganti
                            </Typography>
                            <CustomDatePicker
                              workOrderDates={workOrderOFFUsers}
                              name="workOrderDateOFF"
                              control={control}
                              format="dd/MM/yyyy"
                              label="Tanggal Libur"
                              minDate={startDate}
                              views={["month", "day"]}
                              onChange={(newValue) =>
                                handleChangeReplacementDate(newValue)
                              }
                            />
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
                                <TableCell>Nama</TableCell>
                                <TableCell>
                                  {replacementWorkOrders.replacements.find(
                                    (i) => i._id === watch("replacementOff")
                                  )?.profile?.name || "-"}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Kode Dinas</TableCell>
                                <TableCell>
                                  {replacementOptions.option ? (
                                    <SectionSelectField
                                      fullWidth
                                      label="Pilih Dinasan"
                                      name="replacement"
                                      value={replacementOptions.data.find(
                                        (wo) =>
                                          wo.workOrder?.code ===
                                          replacementWorkOrders.replacementOFf
                                            .workOrder?.code
                                      )}
                                      onChange={(e) =>
                                        handleSelectedOptionWorkOrder(e)
                                      }
                                    >
                                      {replacementOptions.data.map((wo) => (
                                        <MenuItem key={wo._id} value={wo}>
                                          {wo.workOrder?.code}
                                        </MenuItem>
                                      ))}
                                    </SectionSelectField>
                                  ) : (
                                    replacementWorkOrders.replacementOFf
                                      .workOrder?.code
                                  )}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell>Mulai/Selesai</TableCell>
                                <TableCell>
                                  {`${
                                    replacementWorkOrders.replacementOFf
                                      .workOrder?.start || "-"
                                  } - ${
                                    replacementWorkOrders.replacementOFf
                                      .workOrder?.end || "-"
                                  }`}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Shift</TableCell>
                                <TableCell sx={{ textTransform: "uppercase" }}>
                                  {replacementWorkOrders.replacementOFf
                                    .workOrder?.shift || "-"}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Lokasi</TableCell>
                                <TableCell>
                                  {replacementWorkOrders.replacementOFf
                                    .workOrder?.location?.stationName || "-"}
                                </TableCell>
                              </TableRow>
                            </Table>
                          </Grid>
                        </>
                      )}

                      <Grid item xs={12}>
                        <TextField
                          {...register("reason")}
                          fullWidth
                          size="small"
                          label="Alasan"
                          multiline
                          rows={3}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
            </Stack>
          </Box>

          {watch("replacement") && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Ajukan
            </Button>
          )}
        </Box>
      </Box>

      {/* Dialog */}
      <DialogLegend open={openLegend} onClose={() => setOpenLegend(false)} />
    </>
  );
};

const legends = (theme) => [
  {
    id: 1,
    title: "Berdinas",
    color: theme.palette.info.main,
  },
  {
    id: 2,
    title: "Requested",
    color: theme.palette.warning.main,
  },
  {
    id: 3,
    title: "Confirmed",
    color: theme.palette.secondary.main,
  },
  {
    id: 4,
    title: "Approved",
    color: theme.palette.success.main,
  },
  {
    id: 5,
    title: "Rejected",
    color: theme.palette.primary.main,
  },
];

export default Request;
