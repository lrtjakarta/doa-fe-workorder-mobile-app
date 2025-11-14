import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

import Layout from "Component/Layout";
import LoadingScreen from "Component/Loading Screen";

const role = localStorage.getItem("role");

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

/* ########################## PAGES #################### */
// Login
const Login = Loadable(lazy(() => import("Pages/Login")));
const VerifyRole = Loadable(lazy(() => import("Pages/Login/VerifyRole")));

// Error
const Error = Loadable(lazy(() => import("Pages/Error")));

// Home
const Home = Loadable(lazy(() => import("Pages/Home")));

// Profile
const Profile = Loadable(lazy(() => import("Pages/Profile")));
const EditProfile = Loadable(lazy(() => import("Pages/Profile/Edit")));

// Content
const Content = Loadable(lazy(() => import("Pages/Content")));

// Pocket book
const PocketBook = Loadable(lazy(() => import("Pages/Assesment/PocketBook")));
const DetailPocketBook = Loadable(
  lazy(() => import("Pages/Assesment/PocketBook/Detail"))
);

// Assesment
const Assessment = Loadable(lazy(() => import("Pages/Assesment/Assessment")));
const AssessmentResult = Loadable(
  lazy(() => import("Pages/Assesment/Assessment/Result"))
);
const Achievement = Loadable(lazy(() => import("Pages/Assesment/Achievment")));

// Work Order
const WorkOrderMonthly = Loadable(
  lazy(() => import("Pages/WorkOrder/monthly"))
);
const WorkOrderDaily = Loadable(lazy(() => import("Pages/WorkOrder/daily")));
const WorkOrderConfirmation = Loadable(
  lazy(() => import("Pages/WorkOrder/confirmation"))
);

// Swap
const WorkOrderSwap = Loadable(
  lazy(() => import("Pages/WorkOrder/workorder-swap"))
);
const RequestWorkOrderSwap = Loadable(
  lazy(() => import("Pages/WorkOrder/workorder-swap/Request"))
);
const UpdateWorkOrderSwap = Loadable(
  lazy(() => import("Pages/WorkOrder/workorder-swap/Update"))
);

const WorkOrderOFFSwap = Loadable(
  lazy(() => import("Pages/WorkOrder/workorder-off-swap"))
);
const RequestWorkOrderOFFSwap = Loadable(
  lazy(() => import("Pages/WorkOrder/workorder-off-swap/Request"))
);
const UpdateWorkOrderOFFSwap = Loadable(
  lazy(() => import("Pages/WorkOrder/workorder-off-swap/Update"))
);

// Medical
const Medical = Loadable(lazy(() => import("Pages/Medical")));
const MedicalResult = Loadable(lazy(() => import("Pages/Medical/Result")));

const routes = (isAuth) => [
  ...authRoutes(isAuth),
  {
    path: "",
    element: isAuth ? <Navigate to="/app/home" /> : <Navigate to="/login" />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: mainRoutes,
  },
  {
    path: "verify-role",
    element: <VerifyRole />,
  },
  {
    path: "*",
    element: <Error />,
  },
];

const mainRoutes = [
  {
    path: "",
    element: <Navigate to="/app/home" />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "profile",
    children: [
      {
        path: "",
        element: <Profile />,
      },
      {
        path: "edit",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "content",
    element: <Content />,
  },
  {
    path: "work-order",
    children: [
      {
        path: "monthly",
        element: <WorkOrderMonthly />,
      },
      {
        path: "daily",
        element: <WorkOrderDaily />,
      },
      {
        path: "confirmation",
        element: <WorkOrderConfirmation />,
      },
      {
        path: "swap",
        children: [
          {
            path: "work-order",
            children: [
              {
                path: "",
                element: <WorkOrderSwap />,
              },
              {
                path: "request",
                element: <RequestWorkOrderSwap />,
              },
              {
                path: "update/:_id",
                element: <UpdateWorkOrderSwap />,
              },
            ],
          },
          {
            path: "off",
            children: [
              {
                path: "",
                element: <WorkOrderOFFSwap />,
              },
              {
                path: "request",
                element: <RequestWorkOrderOFFSwap />,
              },
              {
                path: "update/:_id",
                element: <UpdateWorkOrderOFFSwap />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "assesment",
    children: [
      {
        path: "",
        element: <Assessment />,
      },
      {
        path: "result",
        element: <AssessmentResult />,
      },
      {
        path: "pocket-book",
        children: [
          {
            path: "",
            element: <PocketBook />,
          },
          {
            path: ":_id",
            element: <DetailPocketBook />,
          },
        ],
      },
      {
        path: "achievment",
        element: <Achievement />,
      },
    ],
  },
  {
    path: "medical",
    children: [
      {
        path: "",
        element: <Medical />,
      },
      {
        path: "result",
        element: <MedicalResult />,
      },
    ],
  },
];

const authRoutes = (isAuth) => [
  {
    path: "/",
    element: !isAuth ? <Navigate to="/login" /> : <Navigate to="/app" />,
  },
  {
    path: "login",
    element: !isAuth ? <Login /> : <Navigate to="/app" />,
  },
];

export default routes;
