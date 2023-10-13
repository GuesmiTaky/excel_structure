import React from "react";
import "./footer.css";
import Logo from "./../../../assets/Logo";
import ReactGoogleMaps from "./MapGoogle/ReactGoogleMaps";

const Footer = () => {
  return (
    <div className="global-main">
      <div className="main-footer">
        <div className="first-child-footer">
          <div className="logo-footer">
            <Logo />
          </div>
          <span className="desc-footer">
            Nous sommes un bureau d'études de structures basé à Marseille,
            spécialisé dans l'analyse et la conception de bâtiments en béton
            armé, métallique et en bois. Notre équipe d'experts offre des
            solutions techniques précises et innovantes pour vos projets de
            réhabilitation et de construction neuve. Faites confiance à notre
            expertise pour des réalisations optimisées, durables et de qualité.
          </span>
        </div>

        <div className="second-child-footer">
          <div className="page-footer">Pages</div>
          <span className="title-page-footer">Accueil</span>
          <br />
          <span className="title-page-footer">Nos Réalisations</span>
          <br />
          <span className="title-page-footer">Contact</span>
        </div>

        <div className="three-child-footer">
          <div className="rejoindre-nos-footer">Rejoignez nous en un clic</div>
          <ReactGoogleMaps />
        </div>
      </div>

      <div className="horizontal-bar-footer"></div>
      <div className="footer-footer">
        <div className="title-f">Copyright © Excel Structures Ingénierie</div>
        <div className="desc-f">
          S.A.S EXCEL STRUCTURE INGENIERIE Aix-en-Provence B 884 978 644 Siret
          88497864400018 CODE APE 7112B
        </div>
      </div>
    </div>
  );
};

export default Footer;
