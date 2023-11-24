import React, { useEffect, useState } from "react";
import "./listCatgoryMain.css";
import { Pagination, Skeleton } from "antd";
import MoreDetail from "./../MainPage/MoreDetail/MoreDetail";
import { apiUrl, api_url_pic } from "../../../store/const";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import villa3d from "../../../images/villa3d.jpg";

const ListCategoryMain = () => {
  const [formattedData, setFormattedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [projectsData, setProjectsData] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllProjects, setShowAllProjects] = useState(true);
  const [projectsPerPage] = useState(8);
  const [totalProjectsCount, setTotalProjectsCount] = useState(0);
  const [perPage] = useState(8);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const fetchProjectsData = (page, perPage) => {
    setLoadingSpiner(true);
    axios
      .get(apiUrl + "/list-project", {
        params: {
          page: page,
          per_page: perPage,
        },
      })
      .then((response) => {
        setProjectsData(response.data);
        if (response.data && response.data.data.length > 0) {
          const imgProjects = response.data.data.map((project) => {
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
        }
        setTotalProjectsCount(response.data.total);
        setLoadingSpiner(false);
      })
      .catch((error) => {
        console.error("Error fetching projects: ", error);
      });
  };

  const fetchProjectsDataByCategory = (categoryId, page, perPage) => {
    setLoadingSpiner(true);
    axios
      .get(apiUrl + "/project-by-category/" + categoryId, {
        params: {
          page: page,
          per_page: perPage,
        },
      })
      .then((response) => {
        setProjectsData(response.data);
        if (response.data && response.data.data.length > 0) {
          const imgProjects = response.data.data.map((project) => {
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
        }
        setTotalProjectsCount(response.data.total);
        setLoadingSpiner(false);
      })
      .catch((error) => {
        console.error("Error fetching projects: ", error);
      });
  };

  const handlePageChange = (page) => {
    console.log(
      "🚀 ~ file: ListCategoryMain.jsx:94 ~ handlePageChange ~ page:",
      page
    );
    console.log("selectedCategory ===>", typeof selectedCategory);
    console.log("selectedCategory ===>", selectedCategory);
    setCurrentPage(page);
    if (selectedCategory !== 0) {
      console.log("test if");
      fetchProjectsDataByCategory(
        formattedData[selectedCategory].id,
        page,
        perPage
      );
    } else {
      console.log("test else");
      fetchProjectsData(page, perPage);
    }
  };

  useEffect(() => {
    axios
      .get(apiUrl + "/list-categorie-project")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const newData = response.data.map((item) => {
            const { date, updated_at, image_relation, ...rest } = item;
            return {
              ...rest,
            };
          });
          setFormattedData(newData);
        }
        fetchProjectsData(1, perPage);
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
    setCurrentPage(1);
  }, [perPage]);

  const handleClick = (index, id) => {
    console.log("handleClick index", index);
    setSelectedCategory(id);
    setProjects([]);
    fetchProjectsDataByCategory(id, 1, perPage);
    setCurrentPage(1);
  };

  const findProject = (projectId) => {
    const dataProject = projectsData.data.find((proj) => proj.id === projectId);
    navigate("/project-front/" + projectId, {
      state: { project: dataProject },
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const styles = [
    "image-tall",
    "image-short",
    "image-tall",
    "image-short",
    "image-short",
    "image-tall",
    "image-short",
    "image-tall",
  ];

  const projectItems = projects.map((project, index) => (
    <div key={index} className={`gallery-item-category-main ${styles[index]}`}>
      <div className="image-container-category-main">
        <img
          src={project.src}
          alt={project.alt}
          onClick={() => findProject(project.id)}
        />
      </div>
      <div className="image-title-category-main">{project.title}</div>
    </div>
  ));

  return (
    <>
      <Spin
        style={{ marginTop: "20%", color: "green" }}
        spinning={loadingSpiner}
        tip=""
        size="large"
      >
        <div className="list-category-main">
          <div className="image-background-main">
            <img src={villa3d} alt="villa" />
          </div>
          {loadingSpiner ? (
            <div className="skeleton-category">
              <Skeleton.Button
                active={true}
                size="default"
                shape="round"
                block={true}
              />
            </div>
          ) : (
            <>
              <div className="title-contact-header">Nos Réalisations</div>
              <div className="sub-title-contact-header">
                Accueil / Réalisations
              </div>
              <div className="list-category-content">
                <div className="list-category">
                  <button
                    type="button"
                    className={`span-categorie ${
                      showAllProjects ? "selected" : ""
                    }`}
                    onClick={() => {
                      setShowAllProjects(true);
                      setSelectedCategory(0);
                      fetchProjectsData();
                    }}
                  >
                    Tous
                  </button>
                  {formattedData.map((category, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`span-categorie ${
                        !showAllProjects && selectedCategory === index
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => {
                        setShowAllProjects(false);
                        handleClick(index, category.id);
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* images project */}
                {projects && projects.length > 0 && (
                  <div
                    className={`gallery-category-main ${
                      projects.length < 5 ? "show" : "hide"
                    }`}
                  >
                    <div className="gallery-column">
                      {projectItems.slice(0, 4)}
                    </div>
                    <div className="gallery-column">
                      {projectItems.slice(4, 8)}
                    </div>
                  </div>
                )}
              </div>

              {projects && totalProjectsCount > projectsPerPage && (
                <div className="pagination-container">
                  <Pagination
                    current={currentPage}
                    pageSize={projectsPerPage}
                    total={totalProjectsCount}
                    onChange={handlePageChange}
                    className="my-custom-pagination"
                  />
                </div>
              )}
              {windowWidth > 768 && <MoreDetail />}
            </>
          )}
        </div>
      </Spin>
    </>
  );
};

export default ListCategoryMain;
