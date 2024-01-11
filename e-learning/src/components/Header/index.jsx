import React, { useEffect } from "react";
import HeaderHamburger from "./HeaderHamburger ";
import HeaderLogo from "./HeaderLogo ";
import HeaderAuthen from "./HeaderLogged";
import { useLocation } from "react-router-dom";
import PATH from "../../constants/paths";
import HeaderLogged from "./HeaderLogged";
import HeaderAuth from "./HeaderAuth";
export default function Header() {
  const { pathname } = useLocation();
  const isTransparent = [PATH.HOME, PATH.ABOUT].includes(pathname);

  useEffect(() => {
    
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else {
        if (isTransparent) {
          header.removeClass("--bgwhite");
        }
      }
    }
    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($(".header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }
    window.addEventListener("scroll", scrollBgHeader);
    return () => {
      window.addEventListener("scroll", scrollBgHeader);
    };
  }, [isTransparent]);

  return (
    <header
      className={`header --transparent ${!isTransparent ? "--bgwhite" : ""}`}
    >
      <div className="container-fluid">
        <HeaderHamburger />
        <HeaderLogo />
        <HeaderAuth />

        
        {/* user logged */}
        {/* <HeaderLogged /> */}
      </div>
    </header>
  );
}
