import React, { useState, useEffect } from "react";
import "./footer.css";
import Logo from "./../../../assets/Logo";
import { Link } from "react-router-dom";

const Footer = ({ pageRef }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const scrollToTop = () => {
    pageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="global-main">
      <div className="main-footer">
        <div className="first-child-footer">
          <div className="logo-footer">
            <Logo />
          </div>
          {/* <span className="desc-footer">
            Nous sommes un bureau d'études de structures basé à Marseille,
            spécialisé dans l'analyse et la conception de bâtiments en béton
            armé, en métal et en bois. Notre équipe d'experts propose des
            solutions techniques précises et innovantes pour vos projets de
            réhabilitation et de construction neuve. Faites-nous confiance pour
            des réalisations optimisées, durables et de grande qualité.
          </span> */}
        </div>

        <div className="second-child-footer">
          <div className="page-footer">Pages</div>
          <Link
            onClick={scrollToTop}
            to="/"
            className="title-page-footer"
            style={{ color: "gray", textDecoration: "none" }}
          >
            Accueil
          </Link>
          <br />
          <Link
            onClick={scrollToTop}
            to="/list-category-main"
            className="title-page-footer"
            style={{ color: "gray", textDecoration: "none" }}
          >
            Nos Réalisations
          </Link>
          <br />
          <Link
            onClick={scrollToTop}
            to="/contact-page"
            className="title-page-footer"
            style={{ color: "gray", textDecoration: "none" }}
          >
            Contact
          </Link>
          {/* <div className="page-footer">Pages</div>
          <span className="title-page-footer">Accueil</span>
          <br />
          <span className="title-page-footer">Nos Réalisations</span>
          <br />
          <span className="title-page-footer">Contact</span> */}
        </div>

        <div className="three-child-footer">
          <div className="contact-footer">
            <b>Mail:</b>{" "}
            <a
              style={{ color: "gray", textDecoration: "none" }}
              href="mailto:contact@excelstructure.fr"
            >
              contact@excelstructure.fr
            </a>
            <br />
            <b>Tel:</b> 06 67 90 01 84/04 84 49 62 18
            <br />
            30 Av. des Olives - 13013 Marseille
          </div>{" "}
        </div>
      </div>

      <div className="horizontal-bar-footer"></div>
      <div className="footer-footer">
        <div className="title-f">
          Copyright © Excel Structure Ingénierie {currentYear}
        </div>
        <div className="desc-f">
          S.A.S EXCEL STRUCTURE INGENIERIE Marseille B 884 978 644 Siret
          88497864400018 CODE APE 7112B
        </div>
      </div>
    </div>
  );
};

export default Footer;
