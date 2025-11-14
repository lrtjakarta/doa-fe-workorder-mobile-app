import { useContext, createContext, useState, useCallback } from "react";

export const NavigationContext = createContext({
  openDrawer: false,
  setOpenDrawer: () => {},
});

export default function NavigationProvider(props) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <NavigationContext.Provider
      value={{
        openDrawer,
        setOpenDrawer,
      }}
      {...props}
    />
  );
}
