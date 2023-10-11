import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navBarMain.css";
import Logo from "../../../assets/Logo";
import Maps from "./../../../assets/Maps";
import Tel from "./../../../assets/Tel";

const NavBarMain = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname || "/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const getActiveClass = (targetLink) => {
    if (targetLink === activeLink) return "active";
    if (
      targetLink === "/list-category-main" &&
      activeLink.startsWith("/project-front/")
    )
      return "active";
    return "";
  };

  return (
    <div className="main-nav">
      <nav className="nav-bar">
        <div className="logo">
          <Logo />
        </div>

        <div
          className={isMenuOpen ? "menu-toggle menu-open" : "menu-toggle"}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`nav-items ${isMenuOpen ? "active" : ""}`}>
          <Link
            className={`nav-item ${getActiveClass("/")}`}
            to="/"
            onClick={() => handleLinkClick("/")}
          >
            Accueil
          </Link>
          <Link
            className={`nav-item ${getActiveClass("/list-category-main")}`}
            to="/list-category-main"
            onClick={() => handleLinkClick("/list-category-main")}
          >
            Réalisations
          </Link>
          <Link
            className={`.no-active nav-item ${getActiveClass("/contact-page")}`}
            to="/contact-page"
            onClick={() => handleLinkClick("/contact-page")}
          >
            Contact
          </Link>
        </div>

        <div className="contact-navbar">
          <div>
            <Maps />
            <span className="contact-text">Marseille / Gardanne</span>
          </div>

          <div className="contact-tel">
            <Tel />
            <span className="contact-text">
              06 67 90 01 84 / 04 84 49 62 18
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBarMain;
