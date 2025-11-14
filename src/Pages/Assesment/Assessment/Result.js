import { ArrowBackIosNewRounded } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useAssessment from "Hooks/Assessment/useAssessment";
import _ from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuery from "Utils/QueryParams";
import TableCustom from "./TableCustom";

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
    <Box
      sx={{
        bgcolor: color,
        width: "100%",
        height: 45,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>
        {label}
      </Typography>
    </Box>
  );
};

const AssessmentResult = () => {
  const navigate = useNavigate();

  let query = useQuery();
  const id = query.get("id");

  const {
    assessmentStatus,
    handleFilterAssessmentStatus,
    date,
    setDate,
    filterAssessment,
    handleFilterDate,
    searchText,
    handleChange,
    getDetailAssessment,
  } = useAssessment();

  useEffect(() => {
    getDetailAssessment(id);
  }, []);

  const detailAssessment =
    filterAssessment.length > 0 ? filterAssessment[0] : {};

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
            Detail Riwayat Penilaian
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Typography sx={{ color: "gray", fontSize: 10, mr: 1 }}>
          Waktu Penilaian
        </Typography>
        <Typography sx={{ fontSize: { md: 16, xs: 12 }, fontWeight: 600 }}>
          {moment(detailAssessment?.timerappearance?.start).format(
            "DD-MM-YYYY HH:mm"
          )}
        </Typography>
        <Typography sx={{ fontSize: { md: 16, xs: 12 }, fontWeight: 600 }}>
          {detailAssessment?.timerPointOut?.end
            ? moment(detailAssessment?.timerPointOut?.end).format(
                "DD-MM-YYYY HH:mm"
              )
            : "-"}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ color: "gray", fontSize: 10, mr: 1 }}>
          Durasi Penilaian
        </Typography>
        <Typography sx={{ fontSize: { md: 16, xs: 12 }, fontWeight: 600 }}>
          {detailAssessment?.timerPointOut?.end
            ? Math.floor(
                moment(detailAssessment?.timerPointOut?.end).diff(
                  moment(detailAssessment?.timerappearance?.start),
                  "seconds"
                ) / 60
              ) +
              " Menit " +
              (moment(detailAssessment?.timerPointOut?.end).diff(
                moment(detailAssessment?.timerappearance?.start),
                "seconds"
              ) %
                60) +
              " detik"
            : ""}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <StatusCondition data={detailAssessment} />
      </Grid>

      {detailAssessment && (
        <>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: 14, mb: 1, mt: 1 }}>
              Hasil Akhir Assessment
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    style={{
                      backgroundColor: "#BB7E36",
                      borderBottom: "2px solid  #F6F7FF",
                    }}
                  >
                    <TableCell
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                        overflow: "hidden",
                        borderRight: "2px solid #F6F7FF",
                        align: "center",
                      }}
                      align="center"
                    >
                      NO
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        borderRight: "2px solid #F6F7FF",
                        alignItems: "center",
                        align: "center",
                      }}
                      align="center"
                    >
                      JENIS ASSESSMENT
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        overflow: "hidden",
                        align: "center",
                      }}
                      align="center"
                    >
                      NILAI
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableCustom
                  no={1}
                  assessment="Kerapihan"
                  value={detailAssessment?.totalPoint?.appearance}
                />
                <TableCustom
                  no={2}
                  assessment="Perlengkapan"
                  value={detailAssessment?.totalPoint?.completeness}
                />
                <TableCustom
                  no={3}
                  assessment="Uji Pengetahuan"
                  value={detailAssessment?.totalPoint?.knowledge}
                />
                <TableCustom
                  no={4}
                  assessment="Tunjuk Sebut"
                  value={detailAssessment?.totalPoint?.pointOut}
                />

                <TableCustom
                  no={5}
                  assessment="Absensi"
                  value={detailAssessment?.totalPoint?.absense}
                />

                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    borderBottom: "none",
                    borderRadius: 3,
                    backgroundColor: "#fff",
                    align: "center",
                    fontStyle: "bold",
                  }}
                >
                  <TableCell
                    colspan={1}
                    sx={{ textAlign: "center" }}
                  ></TableCell>
                  <TableCell
                    style={{
                      fontSize: 13,
                      textTransform: "uppercase",
                      border: "none",
                      fontWeight: 600,
                      borderRight: "2px solid #F6F7FF",
                      borderBottom: "2px solid #F6F7FF",
                    }}
                    align={"center"}
                  >
                    <b>Nilai Akhir</b>
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: 12,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      overflow: "hidden",
                      border: "none",
                      fontWeight: 400,
                      color: "#000",
                      borderBottom: "2px solid #F6F7FF",
                    }}
                    align={"center"}
                  >
                    <b>
                      {_.sum([
                        detailAssessment?.totalPoint?.appearance,
                        detailAssessment?.totalPoint?.completeness,
                        detailAssessment?.totalPoint?.knowledge,
                        detailAssessment?.totalPoint?.pointOut,
                        detailAssessment?.totalPoint?.absense,
                      ])}
                    </b>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default AssessmentResult;
