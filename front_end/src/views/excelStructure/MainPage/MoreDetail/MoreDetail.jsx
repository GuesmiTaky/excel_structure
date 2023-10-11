import React from "react";
import "./moreDetail.css";
import Arrow from "../../../../assets/Arrow";
import Cube from "./../../../../assets/Cube";
import SimpleCube from "../../../../assets/SimpleCube";
import { useNavigate } from "react-router-dom";

const MoreDetail = () => {
  const navigate = useNavigate();

  //function redirect to contact page
  const redirectToContact = () => {
    navigate("/contact-page");
  };
  return (
    <div className="main-more-detail">
      <div className="background">
        <div className="cube-svg">
          <Cube />
        </div>

        <div className="simple-cube-svg">
          <SimpleCube />
        </div>
      </div>
      <div className="content-more-detail">
        <div className="title-more-detail">
          Vous cherchez plus d'informations ?
        </div>
        <div className="sub-title-more-detail">
          Contactez-nous pour une satisfaction garantie
        </div>
        <button
          type="button"
          className="btn-more-detail"
          onClick={() => redirectToContact()}
        >
          Contacter nous
          <Arrow />
        </button>
      </div>
    </div>
  );
};

export default MoreDetail;
