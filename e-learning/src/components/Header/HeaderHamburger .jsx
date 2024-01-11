import React, { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";

export default function HeaderHamburger() {
  const { isShowNavbar, handleShowNavbar } = useMainContext();

  useEffect(() => {
    if (isShowNavbar) {
      $("body").addClass("menu-show");
    } else {
      $("body").removeClass("menu-show");
    }
  }, [isShowNavbar]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    handleShowNavbar?.(!isShowNavbar);
  };
  return (
    <div
      className={`header__humburger ${!!isShowNavbar ? "--close" : ""}`}
      onClick={toggleMenu}
    >
      <div className="header__humburger-button">
        <span />
        <span />
        <span />
      </div>
      <div className="header__humburger-text">
        <span>Menu</span>
        <span>Đóng</span>
      </div>
    </div>
  );
}
