import { ArrowBackIosNewRounded, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useWorkOrder } from "Context/WorkOrder";
import useAssessment from "Hooks/Assessment/useAssessment";
import moment from "moment";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const StatusCondition = ({ data }) => {
  let color, label;
  switch (data?.status) {
    case 1:
      color = "#28A745";
      label = "Laik Bertugas";
      break;
    case 0:
      color = "#ED1C24";
      label = "Tidak Laik Bertugas";
      break;
    default:
      color = "#DCA815";
      label = "Belum Diproses";
      break;
  }

  if (data?.attitudePoint) {
    color = "#ED1C24";
    label = "Tidak Laik Bertugas";
  }

  return (
    <Typography sx={{ fontWeight: "bold", color: color, fontSize: 14 }}>
      {label}
    </Typography>
  );
};

const Assessment = () => {
  const navigate = useNavigate();

  const {
    assessmentStatus,
    handleFilterAssessmentStatus,
    dateAssessment,
    setDateAssessment,
    filterAssessment,
    handleFilterDate,
    searchText,
    handleChange,
    getDataAssessment,
  } = useAssessment();

  const { profileById } = useWorkOrder();

  useEffect(() => {
    if (dateAssessment) {
      let createBy = profileById?.idNumber;
      getDataAssessment(createBy, dateAssessment);
    } else {
      let createAt = moment().format("YYYY-MM");
      let createBy = profileById?.idNumber;
      getDataAssessment(createBy, createAt);
      setDateAssessment(createAt);
    }
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton color="secondary" onClick={() => navigate(-1)}>
            <ArrowBackIosNewRounded sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography
            sx={{ textAlign: "center", flex: 1, fontWeight: 600 }}
            variant="body1"
          >
            Riwayat Penilaian
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="month"
          value={dateAssessment}
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
          sx={{
            width: "100%",
          }}
          onChange={handleFilterDate}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          size="small"
          fullWidth
          select
          label="Pilih Status"
          value={assessmentStatus}
          onChange={(e) => {
            handleFilterAssessmentStatus(e.target.value);
          }}
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
        >
          <MenuItem value={"10"}>Semua</MenuItem>
          <MenuItem value={1}>Laik Bertugas</MenuItem>
          <MenuItem value={0}>Tidak Laik Bertugas</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={searchText}
          placeholder="Pencarian"
          onChange={(e) => handleChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <Search sx={{ fontSize: 15, color: "gray" }} />
                </IconButton>
              </InputAdornment>
            ),
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
        {filterAssessment.length > 0 ? (
          filterAssessment.map((item, index) => (
            <Button
              component={Link}
              to={"/app/assessment/result?id=" + item._id}
              sx={{
                flex: 1,
                display: "flex",
                textTransform: "none",
                p: 0,
                flexDirection: "column",
              }}
            >
              <Paper
                sx={{
                  padding: "10px 7px",
                  marginBottom: "10px",
                  flex: 1,
                  flexDirection: "row",
                  display: "flex",
                  width: "100%",
                }}
                key={index}
              >
                <Grid container>
                  <Grid item xs={9}>
                    <div style={{ display: "flex" }}>
                      <Typography
                        sx={{ color: "primary.greyFont", fontSize: 9, mr: 1 }}
                      >
                        {moment(item.createdAt).format("YYYY-MM-DD")}
                      </Typography>
                      <Typography
                        sx={{ color: "primary.greyFont", fontSize: 9, mr: 1 }}
                      >
                        {moment(item.startTime).format("HH:mm")} -{" "}
                        {moment(item.finishTime).format("HH:mm")}
                      </Typography>
                    </div>
                    <StatusCondition data={item} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      sx={{ color: "primary.greyFont", fontSize: 9, mr: 1 }}
                    >
                      Penyelia
                    </Typography>
                    <Typography
                      sx={{ fontSize: { md: 15, xs: 10 }, fontWeight: 600 }}
                    >
                      {item.createBy?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ fontSize: { md: 15, xs: 10 }, fontWeight: 600 }}
                    >
                      {item.note === "" ? "-" : item.note}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Button>
          ))
        ) : (
          <Paper
            sx={{
              padding: "10px 7px",
              display: "flex",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
              Tidak Ada Data
            </Typography>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default Assessment;
