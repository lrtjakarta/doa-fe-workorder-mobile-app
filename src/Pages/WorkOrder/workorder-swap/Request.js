import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  styled,
  Table,
  TableCell,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import SectionSelectField from "Component/Input/SectionSelectField";
import { useContext, useEffect, useState } from "react";
import { WorkOrderContext } from "Context";
import moment from "moment";
import API from "Services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import CustomDatePicker from "page-sections/WorkOrder/CustomDatePicker";
import InfoIcon from "@mui/icons-material/Info";
import DialogLegend from "page-sections/WorkOrder/dialogLegend";

const Approval = () => {
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
  const [replacementWorkOrders, setReplacementWorkOrders] = useState({
    workOrderApplicant: {},
    replacements: [],
  });
  const [search, setSearch] = useState(false);

  const initialValues = {
    workOrderDate: null,
    approve: profileById.supervisor?._id,
    applicant: "",
    replacement: "",
    reason: "",
    status: "requested",
  };

  const validationSchema = Yup.object({
    workOrderDate: Yup.string().required("Tanggal Dinas tidak boleh kosong"),
    status: Yup.string(),
    reason: Yup.string(),
  });

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
        type: "Tukar Dinas",
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

  // effect
  useEffect(() => {
    if (profileById._id) {
      const params = {
        isLimit: false,
        jobPosition: profileById.jobPosition?._id,
      };

      getProfiles(params);
      getCutOff();
      getAvailableDate();
    }
  }, [profileById]);

  // handle chaange date
  useEffect(() => {
    if (watch("workOrderDate")) {
      setValue("applicant", "");
      setValue("replacement", "");
      setReplacementWorkOrders({ workOrderApplicant: {}, replacements: [] });
      setSearch(false);
    }

    return () => {};
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
      type: "Berdinas",
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
  };

  const handleUserToReplacement = (value) => {
    setValue("replacement", value);
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
            // height: "100%",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              textTransform="uppercase"
              fontWeight="bold"
              variant="h6"
              gutterBottom
            >
              Pengajuan Tukar Dinas
            </Typography>

            <Stack justifyContent="center">
              <Paper
                sx={{
                  px: 1,
                  py: 2,
                  width: "100%",
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
                              replacementWorkOrders.workOrderApplicant.workOrder
                                ?.code
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Mulai/Selesai</TableCell>
                          <TableCell>
                            {`${
                              replacementWorkOrders.workOrderApplicant.workOrder
                                ?.start || "-"
                            } / ${
                              replacementWorkOrders.workOrderApplicant.workOrder
                                ?.end || "-"
                            }`}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Shift</TableCell>
                          <TableCell sx={{ textTransform: "uppercase" }}>
                            {
                              replacementWorkOrders.workOrderApplicant.workOrder
                                ?.shift
                            }
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Lokasi</TableCell>
                          <TableCell>
                            {
                              replacementWorkOrders.workOrderApplicant.workOrder
                                ?.location
                            }
                          </TableCell>
                        </TableRow>
                      </Table>
                    </Grid>
                  )}

                  {replacementWorkOrders.replacements.length > 0 && (
                    <Grid item xs={12}>
                      <SectionSelectField
                        onChange={(e) =>
                          handleUserToReplacement(e.target.value)
                        }
                        value={watch("replacement")}
                        fullWidth
                        label="Pilih Pengganti"
                      >
                        {replacementWorkOrders.replacements
                          // .filter((i) => i._id !== profileById._id)
                          .map((item) => (
                            <MenuItem
                              sx={{ textTransform: "uppercase" }}
                              key={item._id}
                              value={item._id}
                            >
                              {`${item.profile?.name} /  ${item.workOrder?.code}`}
                            </MenuItem>
                          ))}
                      </SectionSelectField>
                    </Grid>
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

export default Approval;
