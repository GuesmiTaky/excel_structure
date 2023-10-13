import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, Modal, Spin } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePartnerAction } from "../../../store/actions/partnerActions";

import "./addPartner.css";
import { api_url_pic } from "../../../store/const";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const partner = location.state && location.state.partner;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSpiner, setLoadingSpiner] = useState(true);

  const [form] = Form.useForm();

  useEffect(() => {
    if (partner && partner.image_relation) {
      const url = api_url_pic + partner.image_relation.image_url;
      setFileList([{ url }]);
      setPreviewImage(url);
      setTimeout(() => {
        setLoadingSpiner(false);
      }, 1000);
    } else {
      setFileList([]);
      setTimeout(() => {
        setLoadingSpiner(false);
      }, 1000);
    }
  }, [partner]);

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

  //function update model
  const updateModel = async (values) => {
    values.fileList = fileList;
    setLoading(true);
    await dispatch(updatePartnerAction(partner.id, values))
      .then(() => {
        navigate("../list-partner");
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCancel = () => setPreviewOpen(false);

  //function add image before submit
  const handleChange = async ({ fileList: newFileList }) => {
    for (let file of newFileList) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
    }
    setFileList(newFileList);
  };

  //function redirect to add
  const redirectToList = () => {
    navigate("../list-partner");
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
    <div>
      <Spin
        style={{ marginTop: "20%" }}
        spinning={loadingSpiner}
        tip=""
        size="large"
      >
        <div className="container form-add">
          <h1 className="text-center mb-5">Modifier partenaire</h1>

          <Form
            form={form}
            onFinish={updateModel}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 20,
            }}
            layout="horizontal"
            style={{
              width: 400,
              maxWidth: 1000,
            }}
          >
            <Form.Item
              label="Nom de partenaire"
              name="name"
              initialValue={partner.name}
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer nom de partenaire !",
                },
                {
                  max: 30,
                  message:
                    "Le nom de partenaire ne peut pas dépasser 30 caractères !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <>
              <Upload
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
                listType="picture-card"
              >
                {fileList.length >= 8 ? null : uploadButton}
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
            </>

            <Form.Item wrapperCol={{ className: "group-button" }}>
              <Button
                className="btn-custom-back"
                shape="round"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Modifier
              </Button>
              <Button
                className="btn-custom-back"
                shape="round"
                htmlType="submit"
                onClick={() => redirectToList()}
              >
                Retour
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </div>
  );
};

export default EditPartner;
