import { AssesmentContext, CabinRideContext, CheckupContext } from "Context";
import moment from "moment";
import { useContext, useState } from "react";

import API from "Services/Api";

export default function useAchievement() {
  const [date, setDate] = useState(moment().format("YYYY-MM"));
  const [searchText, setSearchText] = useState("");
  const [checkupStatus, setCheckupStatus] = useState("");
  const [absenceSummary, setAbsenceSummary] = useState({});
  const [selectTrainDriver, setSelectTrainDriver] = useState({});

  const { getCabinRideResult, cabinRideResult } = useContext(CabinRideContext);

  const {
    getDataCountCheckup,
    countCheckup,
    checkup,
    filterCheckup,
    setFilterCheckup,
  } = useContext(CheckupContext);
  const { getTotalAssessment, totalAssessment } = useContext(AssesmentContext);

  const getAbsenceSummary = async (trainDriverID, monthly) => {
    if (trainDriverID) {
      API.getAbsenceSummary({ params: { trainDriverID, monthly } })
        .then((res) => {
          if (res.data.length > 0) {
            setAbsenceSummary(res.data[0]);
          } else {
            setAbsenceSummary({ work: 0, cuti: 0, sakit: 0, workTime: 0 });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  const filterData = (value) => {
    var searchQuery = value.toString().toLowerCase();
    let filtertext = checkup.filter(
      (item) =>
        item?.createBy?.name.toString().toLowerCase().indexOf(searchQuery) !==
        -1
    );
    setFilterCheckup(filtertext);
  };
  const handleFilterMedicalStatus = (value) => {
    setCheckupStatus(value);
    if (value !== "10") {
      const resFilter = checkup.filter((item) => item?.status === value);
      setFilterCheckup(resFilter);
    } else {
      setFilterCheckup(checkup);
    }
  };

  const getDataCabinRideResult = (nik, month) => {
    getCabinRideResult({ params: { nik, month } });
  };

  return {
    getDataCountCheckup,
    checkup,
    filterCheckup,
    getTotalAssessment,
    handleFilterMedicalStatus,
    totalAssessment,
    absenceSummary,
    date,
    setDate,
    getAbsenceSummary,
    checkupStatus,
    setCheckupStatus,
    searchText,
    countCheckup,
    handleChange,
    selectTrainDriver,
    setSelectTrainDriver,
    getDataCabinRideResult,
    cabinRideResult,
  };
}
