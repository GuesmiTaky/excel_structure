import React, { useEffect, useState } from "react";
import "./galleryMainPage.css";
import ArrowDescovert from "../../../../assets/ArrowDescovert";
import { useNavigate } from "react-router-dom";
import { apiUrl, api_url_pic } from "../../../../store/const";
import axios from "axios";

const GalleryMainPage = ({ toggleLoading }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    toggleLoading(true);
    axios
      .get(apiUrl + "/get-latest-projects")
      .then((response) => {
        const projResponse = response.data;
        setProjectsData(projResponse);

        if (projResponse && projResponse.length > 0) {
          const imgProjects = projResponse.map((project) => {
            const imageUrl =
              project.image_relations && project.image_relations.length > 0
                ? project.image_relations[0].image_url
                : "";

            return {
              id: project.id,
              src: api_url_pic + imageUrl,
              alt: project.name || "",
              title: project.name || "",
            };
          });
          setProjects(imgProjects);
          toggleLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching project data: ", error);
        toggleLoading(false);
      });
  }, []);

  const redirectToProject = () => {
    navigate("/list-category-main");
  };

  const findProject = (projectId) => {
    const dataProject = projectsData.find((proj) => proj.id === projectId);
    navigate("/project-front/" + projectId, {
      state: { project: dataProject },
    });
  };

  return (
    <div className="gallery">
      <div className="group-gallery-title">
        <span className="title-gallery-main">Découvrir nos réalisations</span>
        <div className="horizontal-bar"></div>

        <button
          type="button"
          className="button-gallery-main"
          onClick={() => redirectToProject()}
        >
          Découvrir
          <ArrowDescovert className="arrow-svg-button" />
        </button>
      </div>

      {projects.length > 0 && (
        <>
          <div className="image-row">
            <div
              className="image-container image-width-50"
              onClick={() => findProject(projects[0].id)}
            >
              <img src={projects[0].src} alt={projects[0].alt} />
              <div className="image-title">{projects[0].title}</div>
            </div>
            {projects.length > 1 && (
              <div
                className="image-container image-width-25"
                onClick={() => findProject(projects[1].id)}
              >
                <img src={projects[1].src} alt={projects[1].alt} />
                <div className="image-title">{projects[1].title}</div>
              </div>
            )}
            {projects.length > 2 && (
              <div
                className="image-container image-width-25"
                onClick={() => findProject(projects[1].id)}
              >
                <img src={projects[2].src} alt={projects[2].alt} />
                <div className="image-title">{projects[2].title}</div>
              </div>
            )}
          </div>
          {projects.length > 3 && (
            <div className="image-row">
              {projects.length > 5 && (
                <div
                  className="image-container image-width-25"
                  onClick={() => findProject(projects[5].id)}
                >
                  <img src={projects[5].src} alt={projects[5].alt} />
                  <div className="image-title">{projects[5].title}</div>
                </div>
              )}
              {projects.length > 4 && (
                <div
                  className="image-container image-width-25"
                  onClick={() => findProject(projects[4].id)}
                >
                  <img src={projects[4].src} alt={projects[4].alt} />
                  <div className="image-title">{projects[4].title}</div>
                </div>
              )}
              <div
                className="image-container image-width-50"
                onClick={() => findProject(projects[3].id)}
              >
                <img src={projects[3].src} alt={projects[3].alt} />
                <div className="image-title">{projects[3].title}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GalleryMainPage;
