import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Upload,
  Modal,
  Row,
  Col,
  InputNumber,
  Select,
  DatePicker,
  ConfigProvider,
  Spin,
} from "antd";
import moment from "moment";
import "moment/locale/fr";
import frFR from "antd/lib/locale/fr_FR";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProjectAction } from "../../../store/actions/projectActions";
import "./addProject.css";
import French from "rc-picker/lib/locale/fr_FR";
import { apiUrl } from "../../../store/const";
import axios from "axios";

const { TextArea } = Input;
moment.locale("fr");

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [form] = Form.useForm();

  const projetCreate = useSelector((state) => state.projectCreate);

  const [options, setOptions] = useState([]);

  const { success: successCreate } = projetCreate;

  useEffect(() => {
    setLoadingSpiner(true);
    axios
      .get(apiUrl + "/list-categorie")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setOptions(response.data);
          setLoadingSpiner(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }, [successCreate]);

  //function add item
  const addModel = async (values) => {
    values.fileList = fileList;
    setLoading(true);
    await dispatch(createProjectAction(values))
      .then(() => {
        navigate("../list-project");
        setLoading(false);
      })
      .catch(() => {});
  };

  //function reset form
  const onReset = () => {
    form.resetFields();
  };

  //function delete image
  const handleCancel = () => setPreviewOpen(false);

  //function add image
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  //function add image before submit
  const handleChange = async ({ fileList: newFileList }) => {
    for (let file of newFileList) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
    }
    setFileList(newFileList);
  };

  //init button add image
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </div>
  );

  return (
    <>
      <Spin
        style={{ marginTop: "20%" }}
        spinning={loadingSpiner}
        tip=""
        size="large"
      >
        <div className="container form-add">
          <h1 className="text-center mb-5">Ajouter un projet</h1>
          <ConfigProvider locale={frFR}>
            <Form
              className="form-add-project"
              form={form}
              onFinish={addModel}
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
              encType="multipart/form-data"
            >
              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={{ span: 11 }}
                  xl={{ span: 11 }}
                >
                  {" "}
                  {/** nom de projet*/}
                  <Form.Item
                    label="Nom de projet"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez entrer nom de projet !",
                      },
                      {
                        max: 100,
                        message: "Le nom ne peut pas dépasser 100 caractères !",
                      },
                    ]}
                  >
                    <Input />
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
                  <Form.Item
                    label="Catégorie"
                    name="category_id"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez choisir une catégorie !",
                      },
                    ]}
                  >
                    <Select defaultValue="Choisir une option">
                      {options &&
                        options.map((option) => (
                          <Select.Option
                            key={option.id}
                            value={`${option.id}`}
                            disabled={option.disabled}
                          >
                            {option.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={{ span: 11 }}
                  xl={{ span: 11 }}
                >
                  {" "}
                  {/** Adresse du projet*/}
                  <Form.Item label="Adresse du projet" name="adresse">
                    <Input />
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
                    <InputNumber min={0} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  {" "}
                  {/** description */}
                  <Form.Item
                    label="Description "
                    name="description"
                  >
                    <TextArea rows={4} maxLength={50} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={{ span: 11 }}
                  xl={{ span: 11 }}
                >
                  {" "}
                  {/** Mission d'exécution */}
                  <Form.Item
                    label="Mission d'exécution"
                    name="execution_mission"
                  >
                    <Input />
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
                    <InputNumber min={0} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={{ span: 11 }}
                  xl={{ span: 11 }}
                >
                  {" "}
                  {/** Maître d’ouvrage */}
                  <Form.Item label="Maître d’ouvrage" name="owner">
                    <Input />
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
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={{ span: 11 }}
                  xl={{ span: 11 }}
                >
                  {" "}
                  {/** Architecte */}
                  {/** date */}
                  <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                      {
                        required: true,
                        message: "Veuillez sélectionner une date",
                      },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} locale={French} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label="Image">
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      beforeUpload={() => false}
                      aria-label="Upload your image"
                    >
                      {fileList.length === 10 ? null : uploadButton}
                    </Upload>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="example"
                        style={{
                          width: "100%",
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={{ span: 24 }}
                  xl={{ span: 24 }}
                >
                  {" "}
                  {/** Lien vidéo */}
                  <Form.Item className="mb-5" label="Lien vidéo" name="video">
                    <Input />
                  </Form.Item>
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
                  htmlType="submit"
                  loading={loading}
                >
                  Valider
                </Button>
                <Button
                  className="btn-custom-back"
                  shape="round"
                  htmlType="button"
                  onClick={onReset}
                >
                  Réinitialiser
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </Spin>
    </>
  );
};

export default AddProject;
