import { Box, Container, useTheme } from "@mui/material";
import BottomNavigation from "Component/BottomNavigation";
import Header from "Component/Header";
import { WorkOrderContext } from "Context";
import { useContext, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { Outlet, useLocation } from "react-router-dom";

let fetch = true;
const Layout = ({ children }) => {
  const theme = useTheme();
  const token = localStorage.getItem("access_token");
  const { sidebar, getUser, user, getProfileAndWorkOrderById } =
    useContext(WorkOrderContext);
  const location = useLocation();
  let displaySidebar = true;

  console.log("sidebar", sidebar);

  switch (location.pathname) {
    case "/app":
    case "/app/":
    case "/app/admin/work-order/handover": {
      displaySidebar = sidebar;
      break;
    }
    default:
      displaySidebar = true;
      break;
  }

  useEffect(() => {
    if (fetch && token) {
      const decodedToken = decodeToken(token);
      const id = decodedToken.id;
      console.log("id", id);

      getUser(id);
      getProfileAndWorkOrderById(id);

      console.log("running");
      fetch = false;
    }
  }, [token, location.pathname]);

  if (fetch) return null;

  return (
    <Box
      component="div"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box component="main" sx={{ flex: 1, overflow: "auto", pb: "120px" }}>
        <Container
          sx={{ overflow: "auto", height: "100%" }}
          fixed
          maxWidth="xs"
        >
          {children || <Outlet />}
        </Container>
      </Box>
      <BottomNavigation />
    </Box>
  );
};

export default Layout;
