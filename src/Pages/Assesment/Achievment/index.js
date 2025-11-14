import { ArrowBackIosNewRounded } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useWorkOrder } from "Context/WorkOrder";
import useAchievement from "Hooks/Achievement/useAchievement";
import useDailyWork from "Hooks/DailyWork/useDailyWork";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Images } from "Themes";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Achievment = () => {
  const navigate = useNavigate();

  const {
    getDataCountCheckup,
    totalAssessment,
    countCheckup,
    getAbsenceSummary,
    absenceSummary,
    getTotalAssessment,
    getDataCabinRideResult,
    cabinRideResult,
  } = useAchievement();

  const {
    getDataDistanceDuration,
    dataReportMonthly,
    dataTotalDistance,
    dataTotalSchedule,
    getDataTotalSchedule,
  } = useDailyWork();

  const { profileById } = useWorkOrder();

  const [monthly, setMonthly] = useState("");

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
            Pencapaian
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <TextField
          type="month"
          value={monthly}
          onChange={async (e) => {
            setMonthly(e.target.value);
            let trainDriverNik = profileById?.idNumber;
            let trainDriverID = profileById?._id;

            if (trainDriverID && trainDriverNik) {
              let monthlyData = e.target.value
                ? e.target.value
                : moment().format("YYYY-MM");
              await getDataCountCheckup(trainDriverNik, monthlyData);
              await getAbsenceSummary(trainDriverID, monthlyData);
              await getDataTotalSchedule(trainDriverID);
              await getTotalAssessment(trainDriverID, monthlyData);
              await getDataDistanceDuration(trainDriverID, monthlyData);
              await getDataDistanceDuration(trainDriverID);
              await getDataCabinRideResult(trainDriverNik, monthlyData);
            }
          }}
          InputProps={{
            style: {
              width: "100%",
              fontSize: 10,
              height: 36,
              backgroundColor: "#fff",
              border: "none",
              borderRadius: 7,
            },
          }}
          sx={{
            width: "100%",
          }}
        />
      </Grid>

      <Grid item xs={4}>
        <Typography sx={{ fontSize: 16, fontWeight: 500, color: "#333333" }}>
          Jumlah Hari
        </Typography>
        <Paper
          elevation={2}
          sx={{ bgcolor: "#fff", borderRadius: 2, height: 110 }}
        >
          <Grid
            container
            sx={{
              py: 1,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={{ m: "auto" }}>
              <Typography sx={{ fontSize: 10 }}>Kerja</Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                {absenceSummary?.work ? absenceSummary?.work : 0}
              </Typography>
            </Box>
            <Box sx={{ m: "auto" }}>
              <Typography sx={{ fontSize: 10 }}>Cuti</Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                {absenceSummary?.cuti ? absenceSummary?.cuti : 0}
              </Typography>
            </Box>
            <Box sx={{ m: "auto" }}>
              <Typography sx={{ fontSize: 10 }}>Sakit</Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                {absenceSummary?.sakit ? absenceSummary?.sakit : 0}
              </Typography>
            </Box>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Typography sx={{ fontSize: 16, fontWeight: 500, color: "#333333" }}>
          Logbook Dinasan
        </Typography>
        <Paper
          elevation={2}
          sx={{ bgcolor: "#fff", borderRadius: 2, height: 110 }}
        >
          <Grid
            container
            sx={{
              py: 1,
              alignItems: "center",
              height: "100%",
            }}
          >
            <Grid item xs={6} sx={{ pl: 0.5 }}>
              <Box>
                <Typography sx={{ fontSize: 10 }}>Total Jam Dinas</Typography>
                <div>
                  <Grid container>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {dataTotalSchedule ? dataTotalSchedule.toFixed(2) : 0}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 10,
                        marginTop: 1,
                        color: "#000",
                      }}
                    >
                      Jam
                    </Typography>
                  </Grid>
                </div>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 10 }}>
                  Total Jarak Tempuh
                </Typography>
                <div>
                  <Grid container>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {dataTotalDistance?.totalDistance
                        ? dataTotalDistance?.totalDistance.toFixed(2)
                        : 0}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 10,
                        marginTop: 1,
                        color: "#000",
                      }}
                    >
                      Km
                    </Typography>
                  </Grid>
                </div>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography sx={{ fontSize: 10 }}>Jam Dinas Bulanan</Typography>
                <div>
                  <Grid container>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {absenceSummary?.workTime
                        ? absenceSummary?.workTime.toFixed(2)
                        : 0}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 10,
                        marginTop: 1,
                        color: "#000",
                      }}
                    >
                      Jam
                    </Typography>
                  </Grid>
                </div>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 10 }}>
                  Jarak Tempuh Bulanan
                </Typography>
                <div>
                  <Grid container>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {dataReportMonthly?.totalDistance
                        ? dataReportMonthly?.totalDistance.toFixed(2)
                        : 0}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 10,
                        marginTop: 1,
                        color: "#000",
                      }}
                    >
                      Km
                    </Typography>
                  </Grid>
                </div>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Typography sx={{ fontSize: 16, fontWeight: 500, color: "#333333" }}>
          Kondisi Kesehatan
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Paper
          sx={{
            height: "auto",
            borderRadius: 2,
            height: 110,
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "primary.white",
          }}
        >
          <div>
            <Img src={Images.heart} width="35px" />
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 10,
                color: "#A2A2A2",
              }}
            >
              Fit to Work
            </Typography>
            <Typography
              sx={{
                color: "#35405B",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {countCheckup?.fittowork ? countCheckup?.fittowork : 0}
            </Typography>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          sx={{
            height: "auto",
            borderRadius: 2,
            height: 110,
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "primary.white",
          }}
        >
          <div>
            <Img src={Images.danger} width="35px" />
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 10,
                color: "#A2A2A2",
              }}
            >
              Unfit to Work
            </Typography>
            <Typography
              sx={{
                color: "#35405B",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {countCheckup?.unfittowork ? countCheckup?.unfittowork : 0}
            </Typography>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          sx={{
            height: "auto",
            borderRadius: 2,
            height: 110,
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "primary.white",
          }}
        >
          <div>
            <Img src={Images.report} width="35px" />
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 10,
                color: "#A2A2A2",
              }}
            >
              Fit to Work with Note
            </Typography>
            <Typography
              sx={{
                color: "#35405B",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {countCheckup?.fittoworkwithnote
                ? countCheckup?.fittoworkwithnote
                : 0}
            </Typography>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{ fontSize: 16, fontWeight: 500, color: "#333333", mt: 1 }}
        >
          Penilaian Harian
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Table size="small" sx={{ bgcolor: "#fff" }}>
          <TableBody>
            <TableRow sx={{ borderRadius: 2, bgcolor: "#ababab" }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, color: "#fff" }}>
                  1. Harian
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, color: "#fff" }}>
                  Total
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, color: "#fff" }}>
                  Rata-rata
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Kehadiran</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.resdata?.kehadiran}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.average?.averagekehadiran}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Kerapihan</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.resdata?.kerapihan}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.average?.averagekerapihan}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Kelengkapan</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.resdata?.kerapihan}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.average?.averagekerapihan}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Uji Pengetahuan</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.resdata?.pengetahuan}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.average?.averagepengetahuan}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>
                  Nilai Tunjuk Sebut
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.resdata?.nilaiTunjukSebut}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {totalAssessment?.average?.averagenilaiTunjukSebut}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Grand Total</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 800 }}>
                  {_.sum([
                    totalAssessment?.resdata?.kehadiran,
                    totalAssessment?.resdata?.kerapihan,
                    totalAssessment?.resdata?.kerapihan,
                    totalAssessment?.resdata?.pengetahuan,
                    totalAssessment?.resdata?.nilaiTunjukSebut,
                    totalAssessment?.resdata?.sikapTunjukSebut,
                  ])}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 800 }}>
                  {_.sum([
                    totalAssessment?.average?.averagekehadiran,
                    totalAssessment?.average?.averagekerapihan,
                    totalAssessment?.average?.averagekerapihan,
                    totalAssessment?.average?.averagepengetahuan,
                    totalAssessment?.average?.averagenilaiTunjukSebut,
                    totalAssessment?.average?.averagesikapTunjukSebut,
                  ])}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2, bgcolor: "#ababab" }}>
              <TableCell width="50%" sx={{ py: 1.5 }} colSpan={3}>
                <Typography sx={{ fontSize: 11, color: "#fff" }}>
                  2. Cabin Ride
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="50%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Cabin Ride</Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {_.sumBy(cabinRideResult, "result")}
                </Typography>
              </TableCell>
              <TableCell width="25%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
                  {cabinRideResult.length > 0
                    ? _.sumBy(cabinRideResult, "result") /
                      cabinRideResult.length
                    : 0}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{ fontSize: 16, fontWeight: 500, color: "#333333", mt: 2 }}
        >
          Learning Hours
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Table size="small" sx={{ bgcolor: "#fff" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#ababab" }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, color: "#fff" }}>
                  Nama
                </Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, color: "#fff" }}>
                  Training
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Judul Training</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>
                  KOMUNIKASI DARURAT
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Tanggal</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>6 Mei 2022</Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Tipe</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>WORKSHOP</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Durasi</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>2</Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Keterangan</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>LRTJ-OCC</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{ fontSize: 16, fontWeight: 500, color: "#333333", mt: 2 }}
        >
          Catatan Kinerja
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Table size="small" sx={{ bgcolor: "#fff" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#ababab" }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, color: "#fff" }}>
                  Judul
                </Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, color: "#fff" }}>
                  Catatan
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Tgl Mulai</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>6/4/2022</Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Tgl Selesai</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>6/4/2022</Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Kategori</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>PESERTA</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Deskripsi</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>LOMBA BULAN K3</Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Keterangan</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}></Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{ fontSize: 16, fontWeight: 500, color: "#333333", mt: 2 }}
        >
          Peforma Ketepatan Lintas
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Table size="small" sx={{ bgcolor: "#fff" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#ababab" }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, color: "#fff" }}>
                  Judul
                </Typography>
              </TableCell>
              <TableCell width="15%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11, color: "#fff" }}>
                  Catatan
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Indikator</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>
                  TINGKAT KETEPATAN WAKTU
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Definisi</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>
                  Ketepatan waktu antar stasiun
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow sx={{ borderRadius: 2 }}>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}>Nilai</Typography>
              </TableCell>
              <TableCell width="35%" sx={{ py: 1.5 }}>
                <Typography sx={{ fontSize: 11 }}></Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default Achievment;
