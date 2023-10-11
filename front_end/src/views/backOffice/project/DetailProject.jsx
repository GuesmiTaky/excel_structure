import React, { useEffect, useState } from "react";
import { Button, Form, Input, Row, Col } from "antd";
import "./addProject.css";
import { useNavigate, useLocation } from "react-router-dom";
import { api_url_pic } from "../../../store/const";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import "./detailProject.css";

const { TextArea } = Input;

const DetailProject = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state && location.state.project;
  const [imageUrl, setImageUrl] = useState([]);
  const [goToSlide, setGoToSlide] = useState(0);
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showNavigation, setShowNavigation] = useState(true);
  const [animationConfig, setAnimationConfig] = useState(config.gentle);
  const [dataImageURL, setDataImageURL] = useState([]);

  useEffect(() => {
    if (project && project.image_relations) {
      setImageUrl(project.image_relations);
      const slide = imageUrl.map((item, index) => {
        return {
          id: item.id,

          content: (
            <img
              src={api_url_pic + item.image_url}
              alt={item.altText}
              style={{ borderRadius: "10px" }}
               className="carousel-image"
            />
          ),
          onClick: () => setGoToSlide(index),
        };
      });

      setDataImageURL(slide);
    }
  }, [project, imageUrl]);

  //function redirect to edit
  const redirectToEdit = () => {
    navigate(`../edit-project/${project.id}`, { state: { project } });
  };

  //function redirect to list
  const redirectToList = () => {
    navigate("../list-project");
  };

  return (
    <div>
      <div className="container form-add">
        <h1 className="text-center mb-5">Détail du projet</h1>

        <Form
          className="form-add-project"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="horizontal"
          style={{
            maxWidth: 1000,
          }}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={{ span: 11 }} xl={{ span: 11 }}>
              {" "}
              {/** nom de projet*/}
              <Form.Item label="Nom de projet" name="name">
                <Input readOnly defaultValue={project.name} />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={{ offset: 2, span: 11 }}
              xl={{ offset: 2, span: 11 }}
            >
              {/** Catégories */}
              <Form.Item label="Catégorie">
                <Input readOnly defaultValue={project.name_category} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={{ span: 11 }} xl={{ span: 11 }}>
              {" "}
              {/** Adresse du projet*/}
              <Form.Item label="Adresse du projet" name="adresse">
                <Input readOnly defaultValue={project.adresse} />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={{ offset: 2, span: 11 }}
              xl={{ offset: 2, span: 11 }}
            >
              {" "}
              {/** Surface */}
              <Form.Item label="Surface" name="surface">
                <Input readOnly defaultValue={project.surface} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {" "}
              {/** description */}
              <Form.Item label="Description " name="description">
                <TextArea
                  rows={4}
                  maxLength={600}
                  defaultValue={project.description}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={{ span: 11 }} xl={{ span: 11 }}>
              {" "}
              {/** Mission d'exécution */}
              <Form.Item label="Mission d'exécution" name="execution_mission">
                <Input readOnly defaultValue={project.execution_mission} />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={24}
              md={24}
              lg={{ offset: 2, span: 11 }}
              xl={{ offset: 2, span: 11 }}
            >
              {" "}
              {/** Montant*/}
              <Form.Item label="Montant" name="amount">
                <Input readOnly defaultValue={project.amount} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col xs={24} sm={24} md={24} lg={{ span: 11 }} xl={{ span: 11 }}>
              {" "}
              {/** Maître d’ouvrage */}
              <Form.Item label="Maître d’ouvrage" name="owner">
                <Input readOnly defaultValue={project.owner} />
              </Form.Item>{" "}
            </Col>

            <Col
              xs={24}
              sm={24}
              md={24}
              lg={{ offset: 2, span: 11 }}
              xl={{ offset: 2, span: 11 }}
            >
              {" "}
              {/** Architecte */}
              <Form.Item label="Architecte" name="architect">
                <Input readOnly defaultValue={project.architect} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={{ span: 11 }} xl={{ span: 11 }}>
              {" "}
              {/** Montant*/}
              <Form.Item label="Date" name="date">
                <Input readOnly defaultValue={project.date} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <p>Image</p>
              <div style={{ width: "80%", height: "500px", margin: "50px" }}>
                <Carousel
                  slides={dataImageURL}
                  goToSlide={goToSlide}
                  offsetRadius={offsetRadius}
                  showNavigation={showNavigation}
                  animationConfig={animationConfig}
                />
              </div>
            </Col>
          </Row>

          <Form.Item
            wrapperCol={{
              className: "group-button d-flex justify-content-between mb-5",
            }}
          >
            <Button
              className="btn-custom-back"
              shape="round"
              type="primary"
              htmlType="button"
              onClick={redirectToEdit}
            >
              Modfier
            </Button>
            <Button
              className="btn-custom-back"
              shape="round"
              htmlType="button"
              onClick={redirectToList}
            >
              Retour
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DetailProject;
