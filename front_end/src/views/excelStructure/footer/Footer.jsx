import React, { useState, useEffect } from "react";
import "./footer.css";
import Logo from "./../../../assets/Logo";
import phone from "./../../../assets/phone.svg";
import email from "./../../../assets/email.svg";
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
          <div className="desc-footer">
            Nous sommes une équipe expérimentée dédiée de la réussite et à
            l'optimisation de vos projets
          </div>
        </div>

        <div className="second-child-footer">
          <div className="page-footer">Arboresence</div>
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
        </div>

        <div className="three-child-footer">
          <div className="title-footer">Contact</div>
          <div className="contact-footer">
            <div className="footer-adresse">
              30 Av. des Olives - 13013 Marseille
            </div>
            <div style={{ height: "30px" }}>
              <img src={email} alt="email" style={{ marginRight: "10px" }} />
              <b>
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href="mailto:contact@excelstructure.fr"
                >
                  contact@excelstructure.fr
                </a>
              </b>
            </div>
            <div style={{ height: "10px" }}>
              <img src={phone} alt="phone" style={{ marginRight: "10px" }} />
              <b>04 84 49 62 18</b>
            </div>
          </div>
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
