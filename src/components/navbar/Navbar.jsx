import { React, useMemo } from "react";
import NavbarLink from "../navbar-link/NavbarLink";
import TestLegend from "../test-legend/TestLegend";
import BtnLogout from "../btn-logout/BtnLogout";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Navbar(props) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // Funzione per determinare la location corrente
  const getCurrentLocation = (pathname) => {
    if (pathname.startsWith("/accessibility-dev/websites")) return "websites";
    if (pathname.startsWith("/accessibility-dev/a11y")) return "a11y";
    if (pathname.startsWith("/accessibility-dev/profile")) return "profile";
    if (pathname.startsWith("/accessibility-dev/tools")) return "tools";
    if (pathname.startsWith("/accessibility-dev/ranking")) return "ranking";
    if (pathname.startsWith("/accessibility-dev/log-in")) return "log-in";
    if (pathname.startsWith("/accessibility-dev/sign-up")) return "sign-up";
    return "/accessibility-dev/"; // Default location
  };

  const currentLocation = getCurrentLocation(location.pathname);

  const legend = useMemo(() => {
    switch (location.pathname) {
      case "/accessibility-dev/a11y/tests":
        return <TestLegend />;
      default:
        return <></>;
    }
  }, [location.pathname]);

  return (
    <div id="navbar" className="shadow-sm">
      <a className="default-anchor visually-hidden" href="#container" id="skipnavbar">
        salta il menù
      </a>
      <nav aria-label="menù principale del sito">
        <ul className="navbar-sx">
          {isAuthenticated ? (
            <>
              <NavbarLink
                icon="websites"
                url="/accessibility-dev/websites"
                text="I miei siti"
                isActive={currentLocation === "websites"}
                location="websites"
              />
              <NavbarLink
                icon="a11y"
                url="/accessibility-dev/a11y"
                text="Accessibilità"
                isActive={currentLocation === "a11y"}
                location="a11y"
              />
              <NavbarLink
                icon="profile"
                url="/accessibility-dev/profile"
                text="Profilo"
                isActive={currentLocation === "profile"}
                location="profile"
              />
              <NavbarLink
                icon="tools"
                url="/accessibility-dev/tools"
                text="Strumenti e risorse"
                isActive={currentLocation === "tools"}
                location="tools"
                border="border-top"
              />
              <NavbarLink
                icon="ranking"
                url="/accessibility-dev/ranking"
                text="Classifica"
                isActive={currentLocation === "ranking"}
                location="ranking"
                border="border-bottom"
              />
            </>
          ) : (
            <>
              <NavbarLink
                icon="log-in"
                url="/accessibility-dev/log-in"
                text="Log-in"
                isActive={currentLocation === "log-in"}
                location="log-in"
                border="border-top"
              />
              <NavbarLink
                icon="sign-up"
                url="/accessibility-dev/sign-up"
                text="Sign-up"
                isActive={currentLocation === "sign-up"}
                location="sign-up"
                border="border-bottom"
              />
            </>
          )}
        </ul>
      </nav>
      {legend}
      {isAuthenticated && <BtnLogout />} {/* per vedere il button di logout {!isAuthenticated && <BtnLogout /> }*/}
      <hr aria-hidden="true" alt="" />
    </div>
  );
}

export default Navbar;
