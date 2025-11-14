import { createContext, useState } from "react";
import API from "Services/Api";

export const CheckupContext = createContext({});

export default function CheckupProvider(props) {
  const [checkup, setCheckup] = useState(null);
  const [historycheckup, setHistoryCheckup] = useState([]);
  const [filterCheckup, setFilterCheckup] = useState([]);
  const [countCheckup, setCountCheckup] = useState({});
  const [detailCheckup, setDetailCheckup] = useState({});
  const [dateMedical, setDateMedical] = useState("");

  const getDataCheckup = (nik, monthly) => {
    return API.getCheckup({ params: { nik, monthly } })
      .then((res) => {
        setCheckup(res.data);
        setFilterCheckup(res.data);
      })
      .catch((err) => console.log("error", err));
  };

  const getDataCountCheckup = (nik, monthly) => {
    return API.getCountCheckup({ params: { nik, monthly } })
      .then((res) => {
        if (res.data.length > 0) {
          setCountCheckup(res.data[0]);
        } else {
          setCountCheckup({
            fittowork: 0,
            fittoworkwithnote: 0,
            retake1: 0,
            retake2: 0,
            unfittowork: 0,
          });
        }
      })
      .catch((err) => console.log("error", err));
  };

  const getHistoryDataCheckup = (idTrainDriver, idCheckUp) => {
    return API.getHistoryCheckup({ params: { idTrainDriver, idCheckUp } })
      .then((res) => {
        setHistoryCheckup(res.data);
        return res.data;
      })
      .catch((err) => console.log("error", err));
  };

  const getDetailDataCheckup = (id) => {
    return API.getHistoryCheckup({ params: { id } })
      .then((res) => {
        if (res.data.length > 0) {
          setDetailCheckup(res.data[0]);
        }
        return res.data;
      })
      .catch((err) => console.log("error", err));
  };

  const handleFilterDate = (event) => {
    setDateMedical(event.target.value);
    let monthly = event.target.value;
    let createBy = JSON.parse(localStorage.getItem("profil"))?.nik;
    getDataCheckup(createBy, monthly);
  };

  return (
    <CheckupContext.Provider
      value={{
        getHistoryDataCheckup,
        getDetailDataCheckup,
        handleFilterDate,
        countCheckup,
        historycheckup,
        dateMedical,
        setDateMedical,
        getDataCountCheckup,
        getDataCheckup,
        checkup,
        setCheckup,
        setFilterCheckup,
        filterCheckup,
        setDetailCheckup,
        detailCheckup,
      }}
      {...props}
    />
  );
}
