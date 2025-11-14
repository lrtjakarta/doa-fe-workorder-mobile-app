import { CheckupContext } from "Context";
import { useContext, useState } from "react";

export default function UseMedical() {
  const [searchText, setSearchText] = useState("");
  const [checkupStatus, setCheckupStatus] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const {
    dateMedical,
    setDateMedical,
    getDataCheckup,
    getDetailDataCheckup,
    detailCheckup,
    checkup,
    filterCheckup,
    setFilterCheckup,
  } = useContext(CheckupContext);

  const handleFilterDate = (event) => {
    setDateMedical(event.target.value);
    let monthly = event.target.value;
    let createBy = JSON.parse(localStorage.getItem("profil"))?.nik;
    getDataCheckup(createBy, monthly);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return {
    getDataCheckup,
    checkup,
    filterCheckup,
    handleFilterMedicalStatus,
    dateMedical,
    setDateMedical,
    checkupStatus,
    setCheckupStatus,
    handleFilterDate,
    searchText,
    getDetailDataCheckup,
    detailCheckup,
    handleChange,
    activeStep,
    handleNext,
    handleBack,
  };
}
