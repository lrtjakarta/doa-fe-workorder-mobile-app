import { createContext, useState } from "react";
import API from "Services/Api";

export const DailyWorkContext = createContext({});

export default function DailyWorkProvider(props) {
  const [dataScheduleTrainDriver, setDataScheduleTrainDriver] = useState([]);
  const [dataScheduleByLoopTrainDriver, setDataScheduleByLoopTrainDriver] =
    useState([]);
  const [dataScheduleTrainDriverMonthly, setDataScheduleTrainDriverMonthly] =
    useState([]);
  const [filterMonth, setFilterMonth] = useState("");

  const getDataScheduleTrainDriver = async (data) => {
    console.log("getDataScheduleTrainDriver", data);
    return API.getScheduleTrainDriver(data)
      .then((res) => {
        console.log("DataScheduleTrainDriver", res.data);
        setDataScheduleTrainDriver(res.data);
        return res.data;
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const getDataReportMonthly = async (data) => {
    return API.getReportMonthly(data)
      .then((res) => {
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const getTotalSchedule = async (data) => {
    return API.getTotalSchedule(data)
      .then((res) => {
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  const getDataScheduleByLoopTrainDriver = async (data) => {
    return API.getScheduleTrainDriver({ params: data })
      .then((res) => {
        setDataScheduleByLoopTrainDriver(res.data);
        return res.data;
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };

  const getDataScheduleTrainDriverMonthly = async (data) => {
    console.log("getDataScheduleTrainDriverMonthly", data);
    return API.getScheduleTrainDriver(data)
      .then((res) => {
        console.log("DataScheduleTrainDriverMonthly", res.data);
        // setDataScheduleTrainDriverMonthly(res.data)
        return res.data;
      })
      .catch((err) => {
        return { status: 400, result: err };
      });
  };
  const getDataTotalDistance = async (data) => {
    return API.getTotalDistance(data)
      .then((res) => {
        return { status: true, result: res.data };
      })
      .catch((err) => {
        return { status: false, result: err };
      });
  };

  return (
    <DailyWorkContext.Provider
      value={{
        dataScheduleTrainDriver,
        filterMonth,
        setFilterMonth,
        getDataScheduleTrainDriver,
        dataScheduleTrainDriverMonthly,
        dataScheduleByLoopTrainDriver,
        getDataScheduleByLoopTrainDriver,
        getDataScheduleTrainDriverMonthly,
        getDataReportMonthly,
        getDataTotalDistance,
        getTotalSchedule,
      }}
      {...props}
    />
  );
}
