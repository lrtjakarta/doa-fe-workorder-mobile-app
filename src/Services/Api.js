import axios from "axios";
import { StaticVar } from "Config";
import { isExpired } from "react-jwt";

let isRefreshing = false;
let refreshQueue = [];

// ===> api create
const api = axios.create({
  baseURL: StaticVar.URL_API,
  timeout: 1000000,
  // json: true
});

api.interceptors.request.use(
  async (config) => {
    // get token
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    // check if token exists
    if (refreshToken && accessToken) {
      const accessTokenIsExpired = isExpired(accessToken);
      const refreshTokenIsExpired = isExpired(refreshToken);

      // check refresh token expire
      if (refreshTokenIsExpired) {
        // const navigate = useNavigate();
        // navigate to login page
        localStorage.clear();
        window.location.href = "/login";
        return;
      } else {
        // check access token expire
        if (accessTokenIsExpired) {
          // if access token has expired and we're not alredy refreshing
          if (!isRefreshing) {
            isRefreshing = true;
            // send refresh token api
            try {
              const data = { refreshToken };
              // console.log("data", data);
              const refresh = await axios.post(
                `${StaticVar.URL_API}/auth/refresh`,
                data
              );
              const newAccesToken = refresh.data.accessToken;
              const newRefreshToken = refresh.data.refreshToken;

              // udpate tokens
              localStorage.setItem("access_token", newAccesToken);
              localStorage.setItem("refresh_token", newRefreshToken);

              // Call all the requests that were waiting for the access token refresh
              refreshQueue.forEach((cb) => cb(newAccesToken));
              refreshQueue = [];
              isRefreshing = false;
              console.log("succes refresh token");
            } catch (error) {
              isRefreshing = false;
              console.log("error refresh", error);
              localStorage.clear();
              return;
              //  throw new Error("Failed to refresh token");
            }
          }

          return new Promise((resolve) => {
            refreshQueue.push((token) => {
              config.headers.Authorization = `Bearer ${token}`;
              resolve(config);
            });
          });
        }

        // If the access token has not expired, set the Authorization header
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "access_token"
        )}`;
      }
    }

    // console.log("return config");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    return response;
  },
  (error) => {
    // console.log("err response", error.response);
    if (error.response.status === 401) {
      localStorage.clear();
      // removeTokensFromLocalStorage();
      window.location.href = "/login?expired";

      return;
    }
    return Promise.reject(error);
  }
);

// ===> api list function request

// auth
const verifySignInRole = (data) => api.post(`/auth/role/verify`, data);
const postSignIn = (data) =>
  api.post(`/auth/login`, data, { withCredentials: true });
const postSignInQR = (data) => api.post(`/auth/loginQR`, data);
const updateToken = (data) => api.post(`/auth/updatetoken`, data);

// user
const getUser = (id, params) => api.get(`/user/${id}`, { params });
const getUsers = (params) => api.get(`/users`, { params });

// data profile & work order
const getDataProfileAndWorkOrderById = (id, params) =>
  api.get(`/work-order/profile/user/${id}`, { params });
const getWorkOrderPlannings = (params) =>
  api.get(`/work-order/planning`, { params });
const getWorkOrderConfirmation = (id, params) =>
  api.get(`/work-order/realization/mobile/confirm/${id}`, { params });
const getWorkOrderRealizations = (params) =>
  api.get(`/work-order/realization`, { params });
const postConfirmationWorkOrder = (data, params) =>
  api.post(`/work-order/realization/mobile/confirm`, data, { params });

// captcha
const getCaptcha = () => api.get(`/auth/captcha/`, { withCredentials: true });

// assesments
const getContents = (params) => api.get(`/assesment/content`, { params });
const getContent = (id, params) =>
  api.get(`/assesment/content/${id}`, { params });
const getContentByTitle = (title, params) =>
  api.get(`/assesment/content/${title}`, { params });

const getPocketBooks = (params) =>
  api.get(`/assesment/pocket-book`, { params });
const getPocketBook = (id, params) =>
  api.get(`/assesment/pocket-book/${id}`, { params });
const getPocketBookByTitle = (title, params) =>
  api.get(`/assesment/pocket-book/${title}`, { params });

// sidebar
const getSidebar = (id, params) => api.get(`/user/menu/${id}`, { params });

const getAvailableDate = (params) =>
  api.get(`/work-order/swap/work-order/date`, { params });
const getAvailableWorkOrderOFFDate = (params) =>
  api.get(`/work-order/swap/work-order/date/off`, { params });

// handover
const checkHandover = (id) =>
  api.get(`/work-order/realization/handover/check/${id}`);

// profiles
const getJobRoles = (params) => api.get("/work-order/job-role", { params });
const getProfiles = (params) => api.get(`/work-order/profile`, { params });
const getProfileByUserId = (id, params) =>
  api.get(`/work-order/profile/user/${id}`, { params });
const updateTemp = (id, data) =>
  api.put(`/work-order/profile/${id}/temp`, data);

const getCutoffs = (params) => api.get("/work-order/cutoff", { params });

// swap
const geReplacementSwaps = (params) =>
  api.get(`/work-order/swap/work-order/replacement`, { params });
const getWorkOrderSwap = (params) =>
  api.get(`/work-order/swap/work-order/mobile`, { params });
const getWorkOrderSwapById = (id, params) =>
  api.get(`/work-order/swap/work-order/${id}`, { params });
const requestSwap = (data, params) =>
  api.post(`/work-order/swap/work-order/request`, data, { params });
const rejectSwap = (id, data) =>
  api.put(`/work-order/swap/work-order/reject/${id}`, data);
const confirmSwap = (id, data) =>
  api.put(`/work-order/swap/work-order/confirm/${id}`, data);
const approveSwap = (id, data) =>
  api.put(`/work-order/swap/work-order/approve/${id}`, data);
const getNotificationSwaps = (params) =>
  api.get(`/work-order/swap/work-order/mobile/notification`, { params });

// Assessment
const getAssessment = (data) => api.get("/assesment/assesment", data);
const getQueryAssessmentTotal = (data) =>
  api.get("/assesment/assesment/query/achievement", data);

// upload
const uploadChunk = (path = "", data, params, onUploadProgress) =>
  api.post(`/uploads/chunk/${path}`, data, { params, onUploadProgress });
const uploadFile = (path = "", data, onUploadProgress) =>
  api.post(`/uploads/multiple/${path}`, data, { onUploadProgress });

// Checkup
const getCheckup = (data) => api.get("/medical/checkup", data);
const getHistoryCheckup = (data) => api.get("/medical/checkup", data);
const getCountCheckup = (data) => api.get("/medical/checkup/count", data);

// Cabin Ride
const postCabinRide = (data) =>
  api.post("/operational/assessmentcabinride/register", data);
const getCabinRide = (data) =>
  api.get("/operational/assessmentcabinride", data);
const getCabinRideResult = (data) =>
  api.get("/operational/assessmentcabinride/result", data);
const updateCabinRide = (id, data) =>
  api.put("/operational/assessmentcabinride/" + id, data);
const deleteCabinRide = (id) =>
  api.delete("/operational/assessmentcabinride/" + id);

const postMasterCabinRide = (data) =>
  api.post("/operational/mastercabinride/register", data);
const deleteMasterCabinRide = (id) =>
  api.delete(`/operational/mastercabinride/${id}`);
const putMasterCabinRide = (id, data) =>
  api.put(`/operational/mastercabinride/${id}`, data);
const getMasterCabinRide = (data) =>
  api.get("/operational/mastercabinride", data);

// Absence
const getAbsenceSummary = (data) =>
  api.get("/work-order/old/absence/summary", data);

// Train Driver
const getScheduleTrainDriver = (data) =>
  api.get("/operational/scheduletraindriver", data);
const getReportMonthly = (data) =>
  api.get("/operational/scheduletraindriver/reportmonthly", data);
const getTotalDistance = (data) =>
  api.get("/operational/scheduletraindriver/totalDistance", data);
const getTotalSchedule = (data) =>
  api.get("/operational/scheduletraindriver/totalwork", data);

export const API = {
  getScheduleTrainDriver,
  getReportMonthly,
  getTotalDistance,
  getTotalSchedule,

  getAbsenceSummary,

  getCheckup,
  getHistoryCheckup,
  getCountCheckup,

  postCabinRide,
  getCabinRide,
  getCabinRideResult,
  updateCabinRide,
  deleteCabinRide,
  postMasterCabinRide,
  deleteMasterCabinRide,
  putMasterCabinRide,
  getMasterCabinRide,

  uploadChunk,
  uploadFile,

  verifySignInRole,
  postSignIn,
  postSignInQR,

  getUsers,
  getUser,

  getContents,
  getContent,
  getContentByTitle,

  getPocketBooks,
  getPocketBook,
  getPocketBookByTitle,

  getDataProfileAndWorkOrderById,
  getWorkOrderPlannings,
  getWorkOrderRealizations,
  postConfirmationWorkOrder,
  getWorkOrderConfirmation,
  checkHandover,

  getAvailableDate,
  getAvailableWorkOrderOFFDate,

  updateToken,
  getCaptcha,
  getSidebar,

  getProfiles,
  getProfileByUserId,
  updateTemp,
  getJobRoles,

  getCutoffs,

  geReplacementSwaps,
  getWorkOrderSwap,
  getWorkOrderSwapById,
  requestSwap,
  rejectSwap,
  confirmSwap,
  approveSwap,
  getNotificationSwaps,

  getAssessment,
  getQueryAssessmentTotal,
};

export default API;
