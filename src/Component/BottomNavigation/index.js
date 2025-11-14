// icons
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicBottomNavigation from "./custom";

const navigationItems = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Profile", icon: <PersonIcon /> },
];

const CustomBottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleNavigation = (value) => {
    setValue(value);
    switch (value) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/app/profile");
        break;
    }
  };

  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === "/app/home") return setValue(0);
    if (pathname === "/app/profile") return setValue(1);
  }, []);

  return (
    <DynamicBottomNavigation
      items={navigationItems}
      value={value}
      onChange={handleNavigation}
    />
  );
};

export default CustomBottomNavigation;
