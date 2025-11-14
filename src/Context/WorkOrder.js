import moment from "moment-timezone";
import { createContext, useCallback, useContext, useState } from "react";
import API from "Services/Api";

export const WorkOrderContext = createContext({
  exists: false,
  link: "",
  sidebar: false,
  user: {},
  profiles: [],
  profileById: {},
  notificationSwaps: { active: 0, off: 0 },
  workOrderPlannings: [],
  workOrderRealizations: [],
  workOrderConfirmations: [],
  workOrderById: {},
  jobRoles: [],
  cutoffs: [],
  getWorkOrderConfirmations: (id, params) => {},
  getWorkOrderRealizations: (params) => {},
  getWorkOrderPlannings: (id, params) => {},
  getUser: () => {},
  getJobRoles: (params) => {},
  getProfiles: (params) => {},
  checkHandover: () => {},
  getProfileAndWorkOrderById: () => {},
  getNotificationSwaps: (params) => {},
  getCutoffs: (params) => {},
  getProfileByUser: (id) => {},
});

export const useWorkOrder = () => {
  const contextValue = useContext(WorkOrderContext);

  return contextValue;
};

export default function WorkOrderProvider(props) {
  const [handover, setHandover] = useState({
    exists: false,
    sidebar: false,
    link: "",
  });
  const [user, setUser] = useState({});
  const [workOrderPlannings, setWorkOrderPlannings] = useState([]);
  const [workOrderRealizations, setWorkOrderRealizations] = useState([]);
  const [workOrderConfirmations, setWorkOrderConfirmations] = useState([]);
  const [cutoffs, setCutoffs] = useState([]);

  // profiles
  const [jobRoles, setJobRoles] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const [notificationSwaps, setNotificationSwaps] = useState({
    active: 0,
    off: 0,
  });

  // get profile by Id
  const [profileById, setProfileById] = useState({});
  const [workOrderById, setWorkOrderById] = useState({});

  const getProfileByUser = useCallback(async (id) => {
    return await API.getProfileByUserId(id)
      .then((res) => {
        const { profile } = res.data;

        if (profile) return profile;
      })
      .catch((err) => console.log("err", err));
  }, []);

  const getCutoffs = useCallback(
    async (params) => {
      await API.getCutoffs(params)
        .then((res) => {
          const data = res.data;

          setCutoffs(data);
        })
        .catch((err) => console.log("err", err));
    },
    [cutoffs]
  );

  const getNotificationSwaps = useCallback(
    async (params) => {
      await API.getNotificationSwaps(params)
        .then((res) => {
          const { data: _data, success } = res.data;

          if (success) {
            const { _id, ...data } = _data;
            // console.log("data notif", data);
            setNotificationSwaps(data);
          }
        })
        .catch((err) => console.log("err", err));
    },
    [notificationSwaps]
  );

  const getJobRoles = useCallback(
    async (params) => {
      await API.getJobRoles(params)
        .then((res) => {
          const { data, totalItems, totalCount } = res.data;

          setJobRoles(data);
        })
        .catch((err) => console.log("err", err));
    },
    [jobRoles]
  );

  const checkHandover = useCallback(
    async (id) => {
      await API.checkHandover(id)
        .then((res) => {
          const data = res.data;
          const { success, isAllAccepted } = data;

          console.log("data", data);

          if (success) {
            setHandover((prev) => ({
              ...prev,
              exists: true,
              sidebar: isAllAccepted,
              link: "/app/admin/work-order/handover",
            }));
          } else {
            setHandover((prev) => ({ ...prev, exists: false, link: "" }));
          }
        })
        .catch((err) => console.log("errr check handover", err));
    },
    [handover]
  );

  const getUser = useCallback(
    async (id, params) => {
      await API.getUser(id, params)
        .then((res) => {
          const { data } = res;
          console.log("res", res);
          setUser(data);
        })
        .catch((err) => console.log("error", err));
    },
    [user]
  );

  const getProfiles = useCallback(
    async (params) => {
      await API.getProfiles(params)
        .then((res) => {
          const { data } = res.data;
          // console.log("res", res);
          setProfiles(data);
          // setWorkOrderRealizations(_data.realization);
        })
        .catch((err) => console.log("error", err));
    },
    [profiles]
  );

  const getWorkOrderPlannings = useCallback(
    async (params) => {
      await API.getWorkOrderPlannings(params)
        .then((res) => {
          const { data } = res;
          // console.log("res", res);

          setWorkOrderPlannings(data);
        })
        .catch((err) => console.log("error", err));
    },
    [workOrderPlannings]
  );

  const getWorkOrderRealizations = useCallback(
    async (params) => {
      await API.getWorkOrderRealizations(params)
        .then((res) => {
          const { data } = res.data;
          // console.log("res", res);
          setWorkOrderRealizations(data);
        })
        .catch((err) => console.log("error", err));
    },
    [workOrderRealizations]
  );

  const getWorkOrderConfirmations = useCallback(
    async (id, params) => {
      await API.getWorkOrderConfirmation(id, params)
        .then((res) => {
          const { data } = res;
          const _data = data[0];
          // console.log("res", res);
          setWorkOrderConfirmations(_data.realization);
        })
        .catch((err) => console.log("error", err));
    },
    [workOrderConfirmations]
  );

  const getProfileAndWorkOrderById = useCallback(
    async (id, params) => {
      const timeNow = moment.tz("Asia/Jakarta").format("HH:mm:ss");
      const newParams = {
        ...params,
        // time: timeNow,
        date: moment().format("YYYY-MM-DD"),
      };
      await API.getDataProfileAndWorkOrderById(id, newParams)
        .then((res) => {
          const { profile, workOrder } = res.data;
          console.log("res", res);
          setProfileById(profile || {});
          setWorkOrderById(workOrder || {});
        })
        .catch((err) => console.log("error", err));
    },
    [profileById, workOrderById]
  );

  return (
    <WorkOrderContext.Provider
      value={{
        user,
        profiles,
        exists: handover.exists,
        link: handover.link,
        sidebar: handover.sidebar,
        profileById,
        workOrderById,
        workOrderPlannings,
        workOrderRealizations,
        workOrderConfirmations,
        jobRoles,
        notificationSwaps,
        cutoffs,

        getCutoffs,
        getNotificationSwaps,
        getJobRoles,
        getProfileAndWorkOrderById,
        getWorkOrderConfirmations,
        getWorkOrderRealizations,
        getWorkOrderPlannings,
        checkHandover,
        getUser,
        getProfiles,
        getProfileByUser,
      }}
      {...props}
    />
  );
}
