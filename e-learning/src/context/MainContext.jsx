import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [isShowNavbar, setIsShowNavbar] = useState(false);
 
  const handleShowNavbar = (isShow) => {
    setIsShowNavbar(isShow);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    setIsShowNavbar(false);
  }, [pathname]);

  return (
    <MainContext.Provider value={{ isShowNavbar, handleShowNavbar }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);