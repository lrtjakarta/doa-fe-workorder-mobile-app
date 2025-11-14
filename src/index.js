import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { MultiProvider } from "Config";
import AssesmentProvider from "Context/Assesment";
import CabinRideProvider from "Context/CabinRide";
import CheckupProvider from "Context/Checkup";
import NavigationProvider from "Context/Navigation";
import WorkOrderProvider from "Context/WorkOrder";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import Provider from "./Context";
import reportWebVitals from "./reportWebVitals";
import Themes from "./Themes/Mui";

// console.log("document =========>",document)
// firebaseInit()
const container = document.getElementById("root");

// hidden horizontal scrolling
container.style.overflowX = "hidden";

const root = createRoot(container);
root.render(
  <BrowserRouter>
    <MultiProvider
      providers={[
        <Provider.AuthProvider key={0} />,
        <NavigationProvider key={1} />,
        <WorkOrderProvider key={2} />,
        <AssesmentProvider key={3} />,
        <CheckupProvider key={4} />,
        <CabinRideProvider key={5} />,
      ]}
    >
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <LocalizationProvider
          // dateAdapter={AdapterMoment}
          dateAdapter={AdapterDateFns}
          // defaultValue={dayjs(new Date())}
        >
          <App />
        </LocalizationProvider>
      </ThemeProvider>
      <ToastContainer />
    </MultiProvider>
  </BrowserRouter>
);

reportWebVitals();
