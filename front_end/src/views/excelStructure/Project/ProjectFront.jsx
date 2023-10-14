import React, { useEffect, useRef, useState } from "react";
import Chateauneuf from "../../../images/Chateauneuf.jpg";
import "./projectFront.css";
import Footer from "./../footer/Footer";
import MoreDetail from "../MainPage/MoreDetail/MoreDetail";
import Gallery from "./Gallery/Gallery";
import RelatedProject from "./RelatedProject/RelatedProject";
import { useParams } from "react-router-dom";
import VideoPlayerYoutube from "./VideoPlayer/VideoPlayerYoutube";
import { Spin } from "antd";
import { apiUrl } from "../../../store/const";
import axios from "axios";

const ProjectFront = () => {
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [projectDetails, setProjectDetails] = useState({});
  const scrollToRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    setLoadingSpiner(true);
    if (id) {
      axios
        .get(`${apiUrl}/project/${id}`)
        .then((response) => {
          setProjectDetails(response.data);
          setLoadingSpiner(false);
        })
        .catch((error) => {
          console.error("Error fetching project: ", error);
        });
    }
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToTop = () => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="image-background-main">
        <img src={Chateauneuf} alt="villa" />
      </div>
      <Spin
        style={{ marginTop: "20%", color: "green" }}
        spinning={loadingSpiner}
        tip=""
        size="large"
      >
        <div ref={scrollToRef} className="title-contact-header">
          {projectDetails.category?.name}
        </div>
        <div className="sub-title-contact-header">
          {" "}
          Accueil / Réalisations/{projectDetails.category?.name}
        </div>
        <div className="project-front-content">
          <div className="group-card-desc">
            <div className="first-card-desc-project">
              <div className="group-item-card-title">
                <div className="row">
                  <span className="col-12 col-md-6 item-card-title">
                    Maître d’ouvrage :
                  </span>
                  <span className="col-12 col-md-6 item-card-data">
                    {projectDetails.owner}
                  </span>
                </div>

                <div className="row">
                  <span className="col-12 col-md-6 item-card-title">
                    Architecte :
                  </span>
                  <span className="col-12 col-md-6 item-card-data">
                    {projectDetails.architect}
                  </span>
                </div>

                <div className="row">
                  <span className="col-12 col-md-6 item-card-title">
                    Mission d’exécution :
                  </span>
                  <span className="col-12 col-md-6 item-card-data">
                    {projectDetails.execution_mission}
                  </span>
                </div>

                <div className="row">
                  <span className="col-12 col-md-6 item-card-title">
                    Date :
                  </span>
                  {projectDetails && projectDetails.date && (
                    <span className="col-12 col-md-6 item-card-data">
                      {new Date(projectDetails.date).getFullYear()}
                    </span>
                  )}
                </div>

                <div className="row">
                  <span className="col-12 col-md-6 item-card-title">
                    Surface de plancher :
                  </span>
                  {projectDetails && projectDetails.surface && (
                    <span className="col-12 col-md-6 item-card-data">
                      {projectDetails.surface} m²
                    </span>
                  )}
                </div>

                <div className="row">
                  <span className="col-12 col-md-6 item-card-title">
                    Montant de projet :
                  </span>
                  {projectDetails && projectDetails.amount && (
                    <span className="col-12 col-md-6 item-card-data">
                      {projectDetails.amount} €
                    </span>
                  )}
                </div>

                <div className="row">
                  <span className="col-12 col-md-6 item-card-title">
                    Adresse du projet :
                  </span>
                  <span className="col-12 col-md-6 item-card-data">
                    {projectDetails.adresse}
                  </span>
                </div>
              </div>
            </div>
            <div className="seconde-card-desc-project">
              <span className="title-desc-project-card">
                {projectDetails.name}
              </span>
              <br />

              <span className="text-desc-project-card">
                {projectDetails.description}
              </span>
            </div>
          </div>

          {projectDetails && <Gallery imagesProject={projectDetails} />}
          {projectDetails && projectDetails.video && (
            <VideoPlayerYoutube lienVideo={projectDetails.video} />
          )}
          {projectDetails && (
            <RelatedProject
              project={projectDetails}
              onProjectClick={() => scrollToTop()}
            />
          )}
          {windowWidth > 768 && <MoreDetail />}
          {windowWidth > 768 && <Footer />}
        </div>
      </Spin>
    </div>
  );
};

export default ProjectFront;
