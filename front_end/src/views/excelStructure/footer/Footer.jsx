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
          <span className="title-page-footer">Accueil</span>
          <br />
          <span className="title-page-footer">Nos Réalisations</span>
          <br />
          <span className="title-page-footer">Contact</span>
        </div>

        <div className="three-child-footer">
          {/* <div className="rejoindre-nos-footer">Rejoignez nous en un clic</div>
          <ReactGoogleMaps /> */}
          <div className="contact-footer">
            30 Avenue des Olives - 13013 Marseille
            <br />
            Tel: 0667900184/0484496218
            <br />
            Mail. contact@excelstructure.fr
          </div>
        </div>
      </div>

      <div className="horizontal-bar-footer"></div>
      <div className="footer-footer">
        <div className="title-f">Copyright © Excel Structure Ingénierie</div>
        <div className="desc-f">
          S.A.S EXCEL STRUCTURE INGENIERIE Marseille B 884 978 644 Siret
          88497864400018 CODE APE 7112B
        </div>
      </div>
    </div>
  );
};

export default Footer;
