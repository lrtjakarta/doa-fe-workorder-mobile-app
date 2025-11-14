import { createContext, useState } from "react";

import moment from "moment";
import API from "Services/Api";

export const CabinRideContext = createContext({});

export default function CabinRideProvider(props) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [cabinrides, setCabinRides] = useState([]);
  const [cabinRideResult, setCabinRideResult] = useState([]);

  const postDataCabinRide = async (sendData, params) => {
    try {
      const res = await API.postCabinRide(sendData);

      return { status: "OK", result: res.data };
    } catch (err) {
      // console.log("error", err)
      return { status: 400, result: err };
    }
  };

  const getMasterCabinRide = async (params) => {
    try {
      const res = await API.getMasterCabinRide(params);
      // console.log("getMasterCabinRide", res.data)
      return { status: "OK", result: res.data };
    } catch (err) {
      return { status: 400, result: err };
    }
  };

  const getCabinRide = async (params) => {
    try {
      const res = await API.getCabinRide(params);
      // console.log("getCabinRide", res.data)
      setCabinRides(res.data);
      return { status: "OK", result: res.data };
    } catch (err) {
      return { status: "Failed", result: [] };
    }
  };
  const getCabinRideResult = async (params) => {
    try {
      const res = await API.getCabinRideResult(params);
      setCabinRideResult(res.data);
      return { status: "OK", result: res.data };
    } catch (err) {
      return { status: "Failed", result: [] };
    }
  };

  const updateCabinRide = async (id, data) => {
    try {
      const res = await API.updateCabinRide(id, data);
      // console.log("response", res)
      return { status: "OK", result: res.data };
    } catch (err) {
      console.log("error", err);
      return { status: "Failed", result: [] };
    }
  };

  const deleteCabinRide = (id) => {
    let month = moment(new Date()).format("YYYY-MM");
    return API.deleteCabinRide(id)
      .then((res) => {
        getCabinRide({ params: { month } });
        return { status: "OK", result: res.data };
      })
      .catch((err) => {
        console.log("error", err);
        return { status: "Failed", result: [] };
      });
  };

  return (
    <CabinRideContext.Provider
      value={{
        postDataCabinRide,
        openSnackbar,
        setOpenSnackbar,
        getCabinRide,
        getMasterCabinRide,
        cabinrides,
        updateCabinRide,
        setCabinRides,
        deleteCabinRide,
        getCabinRideResult,
        cabinRideResult,
      }}
      {...props}
    />
  );
}
