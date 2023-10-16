import React, { useEffect, useState } from "react";
import "./relatedProject.css";
import axios from "axios";
import { apiUrl, api_url_pic } from "../../../../store/const";
import { useNavigate } from "react-router-dom";
import { Skeleton, Spin } from "antd";

const RelatedProject = ({ project, onProjectClick }) => {
  const navigate = useNavigate();
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  useEffect(() => {
    setLoadingSpiner(true);
    if (project && project.category_id) {
      axios
        .get(
          `${apiUrl}/get-latest-projects-category/${project.category_id}/${project.id}`
        )
        .then((response) => {
          const formattedProjects = response.data.map((project) => {
            const imageUrl =
              project.image_relations && project.image_relations.length > 0
                ? api_url_pic + project.image_relations[0].image_url
                : "";

            return {
              id: project.id,
              src: imageUrl,
              alt: project.name || "",
              title: project.name || "",
            };
          });
          setProjects(response.data);
          setRelatedProjects(formattedProjects);
          setLoadingSpiner(false);
        })
        .catch((error) => {
          console.error("Error fetching related projects: ", error);
        });
    }
  }, [project]);

  const findProject = (projectId) => {
    setLoadingSpiner(true);
    const dataProject = projects.find((proj) => proj.id === projectId);
    navigate("/project-front/" + projectId, {
      state: { project: dataProject },
    });
    setLoadingSpiner(false);
    onProjectClick();
  };

  return (
    <>

        {loadingSpiner ? (
          <>
            <div className="row-skeleton-related-project">
              <Skeleton.Image
                className="container-skeleton-related-project"
                active="true"
                size="large"
              />
            </div>
          </>
        ) : (
          <>
            {relatedProjects && relatedProjects.length > 0 && (
              <div className="related-wrapper">
                <div className="title">Projets Liés</div>
                <div className="related-image-row">
                  {relatedProjects.map((relatedProject, index) => (
                    <div
                      className="related-image-container"
                      key={index}
                      onClick={() => findProject(relatedProject.id)}
                    >
                      <img src={relatedProject.src} alt={relatedProject.alt} />
                      <div className="related-image-title">
                        {relatedProject.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
    </>
  );
};

export default RelatedProject;
