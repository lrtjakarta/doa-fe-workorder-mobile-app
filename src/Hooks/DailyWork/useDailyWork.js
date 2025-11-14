import { DailyWorkContext } from "Context/DailyWork";
import moment from "moment";
import { useContext, useState } from "react";

export default function useDailyWork() {
  const [searchText, setSearchText] = useState("");

  const {
    dataLoopTrain,
    getDataLoopTrain,
    dataScheduleTrainDriver,
    getDataScheduleTrainDriver,
    dataScheduleByLoopTrainDriver,
    postDataScheduleTrainDriver,
    updateDataScheduleTrainDriver,
    filterMonth,
    getDataReportMonthly,
    getDataScheduleByLoopTrainDriver,
    setFilterMonth,
    updateRouteDataScheduleTrainDriver,
    deleteDataScheduleTrainDriver,
    updateDataScheduleTrainDriverStatus,
    getDataScheduleTrainDriverMonthly,
    getDataTotalDistance,
    getTotalSchedule,
  } = useContext(DailyWorkContext);

  const [dataScheduleTrainDriverMonthly, setDataScheduleTrainDriverMonthly] =
    useState([]);

  const [dataReportMonthly, setDataReportMonthly] = useState({});
  const [dataTotalDistance, setTotalDistance] = useState({});
  const [dataTotalSchedule, setDataTotalSchedule] = useState(0);
  const [dataDailySchedule, setDataDailySchedule] = useState([]);
  const [dateDailyWork, setDateDailyWork] = useState("");

  const [firstDate, setFirstDate] = useState(0);
  const [lastDate, setLastDate] = useState(0);

  const submitDataDailyWork = (data, date) => {
    postDataScheduleTrainDriver(data, date);
  };

  const getDataDistanceDuration = async (trainDriverID, monthly) => {
    if (monthly) {
      const resp = await getDataReportMonthly({
        params: { trainDriverID, monthly },
      });
      if (resp.status) {
        setDataReportMonthly(resp.result[0]);
      }
    } else {
      const resp = await getDataTotalDistance({
        params: { trainDriverID },
      });
      if (resp.status) {
        setTotalDistance(resp.result[0]);
      }
    }
  };

  const getDataTotalSchedule = async (trainDriverID) => {
    const resp = await getTotalSchedule({
      params: { trainDriverID },
    });
    if (resp.status) {
      setDataTotalSchedule(resp.result * 6.66666);
    }
  };

  const startTimeTrain = (data, date) => {
    updateRouteDataScheduleTrainDriver(data, date);
  };

  const stopTimeTrain = (data, date) => {
    updateRouteDataScheduleTrainDriver(data, date);
  };

  const finishWork = (id, data, date) => {
    updateDataScheduleTrainDriver(id, data, date);
  };

  const giveWork = (id, data, date) => {
    updateDataScheduleTrainDriver(id, data, date);
  };

  const cancelDailyWork = (id, date) => {
    deleteDataScheduleTrainDriver(id, date);
  };

  const getDailyWorkById = (id) => {
    return getDataScheduleTrainDriver({ params: { id } });
  };

  const getDailyworkByLoop = (dataresponseLocal) => {
    console.log("dataresponseLocal", dataresponseLocal);
    let query = {
      loop: dataresponseLocal?.loopRouteTrain?.loop,
      dailyWorkDate: moment(dataresponseLocal?.dailyWorkDate).format(
        "YYYY-MM-DD"
      ),
    };
    return getDataScheduleByLoopTrainDriver(query);
  };

  const fetchDataLoop = async (data) => {
    console.log("data params", data);
    let params = {};
    if (data === "Masinis") {
      params = { params: { note: "Bertugas" } };
    }
    if (data === "Cadangan") {
      params = { params: { note: "Cadangan" } };
    }
    if (data === "Penyelia") {
      params = { params: { note: "Penyelia" } };
    }
    console.log("data params", params);
    getDataLoopTrain(params);
    if (dateDailyWork === "") {
      let dateNow = moment().format("YYYY-MM-DD");
      setDateDailyWork(dateNow);
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateNow },
      });
      setDataDailySchedule(dataschedule);
    }
  };

  const fetchDataHandOver = async () => {
    if (dateDailyWork === "") {
      let dateNow = moment().format("YYYY-MM-DD");
      setDateDailyWork(dateNow);
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateNow, note: "Penyelia" },
      });
      setDataDailySchedule(dataschedule);
    } else {
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateDailyWork, note: "Penyelia" },
      });
      setDataDailySchedule(dataschedule);
    }
  };

  const fetchDataHandOverMasinis = async () => {
    if (dateDailyWork === "") {
      let dateNow = moment().format("YYYY-MM-DD");
      setDateDailyWork(dateNow);
      const dataschedule = await getDataScheduleTrainDriver({
        params: {
          dailyWorkDate: dateNow,
          note: "Bertugas",
          trainDriverId: JSON.parse(localStorage.getItem("profil")._id),
        },
      });
      setDataDailySchedule(dataschedule[0]);
    } else {
      const dataschedule = await getDataScheduleTrainDriver({
        params: { dailyWorkDate: dateDailyWork, note: "Bertugas" },
      });
      setDataDailySchedule(dataschedule[0]);
    }
  };

  const getDailyWorkByTrainDriver = (id, date) => {
    getDataScheduleTrainDriver({
      params: { rotationTrainDriverId: id, monthlyWorkDate: date },
    });
  };

  const getDailyWorkByTrainDriverMonthly = (id, date) => {
    getDataScheduleTrainDriver({
      params: { trainDriverId: id, monthlyWorkDate: date },
    });
  };

  const handleFilterDate = (event) => {
    setFirstDate(moment(event.target.value + "-01", "YYYY-MM-DD").day());
    setLastDate(
      getDaysInMonth(
        moment(event.target.value, "YYYY-MM").month(),
        moment(event.target.value, "YYYY-MM").year()
      )
    );
    setFilterMonth(event.target.value);
    let monthly = event.target.value;
    let createBy = JSON.parse(localStorage.getItem("profil"))?._id;
    getDataScheduleTrainDriver({
      params: { trainDriverId: createBy, monthlyWorkDate: monthly },
    });
  };

  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  const filterData = (value) => {
    var searchQuery = value.toString().toLowerCase();
    let filtertext = dataScheduleTrainDriver.filter(
      (item) =>
        item?.createBy?.name.toString().toLowerCase().indexOf(searchQuery) !==
        -1
    );
    // setFilterCheckup(filtertext)
  };

  const getDaysInMonth = function (month, year) {
    return new Date(
      month == 12 ? year + 1 : year,
      month == 12 ? 1 : month + 1,
      0
    ).getDate();
  };

  const getMonthly = async (monthly) => {
    const res = await getDataScheduleTrainDriverMonthly({
      params: {
        monthlyWorkDate: monthly,
        projection: {
          dailyWorkDate: "$dailyWorkDate",
          trainDriverName: "$trainDriver.name",
          trainDriverNIK: "$trainDriver.nik",
          code: "$loopRouteTrain.code",
          loop: "$loopRouteTrain.loop",
        },
      },
    });

    const transform = res
      .filter((x) => x.code !== "OH" && x.code !== "PA" && x.code !== "PB")
      .map((item) => {
        return {
          Tgl: moment(item.dailyWorkDate).format("YYYY-MM-DD"),
          Nama: item.trainDriverName,
          NIK: item.trainDriverNIK,
          Dinas: item.code,
          Loop: item.loop,
          Keterangan: "",
        };
      });
    setDataScheduleTrainDriverMonthly(transform);
  };

  return {
    dataLoopTrain,
    fetchDataLoop,
    dataScheduleTrainDriver,
    getDataScheduleTrainDriver,
    getDailyWorkById,
    getDailyWorkByTrainDriver,
    submitDataDailyWork,
    updateDataScheduleTrainDriver,
    handleFilterDate,
    startTimeTrain,
    stopTimeTrain,
    handleChange,
    finishWork,
    giveWork,
    filterMonth,
    setFilterMonth,
    cancelDailyWork,
    dataDailySchedule,
    setDataDailySchedule,
    dateDailyWork,
    setDateDailyWork,
    fetchDataHandOver,
    updateDataScheduleTrainDriverStatus,
    fetchDataHandOverMasinis,
    firstDate,
    setFirstDate,
    getDaysInMonth,
    lastDate,
    setLastDate,
    getDailyworkByLoop,
    getMonthly,
    dataScheduleByLoopTrainDriver,
    dataScheduleTrainDriverMonthly,
    getDataScheduleTrainDriverMonthly,
    getDailyWorkByTrainDriverMonthly,
    dataReportMonthly,
    setDataReportMonthly,
    dataTotalDistance,
    setTotalDistance,
    dataTotalSchedule,
    getDataTotalSchedule,
    getDataDistanceDuration,
    setDataTotalSchedule,
  };
}
