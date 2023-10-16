import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listNewsAction,
  deleteNewsAction,
  resetNewsCreate,
  resetNewsUpdate,
  resetNewsDelete,
} from "../../../store/actions/newsActions";
import { Button, Modal, Space, Spin, Table, notification } from "antd";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./listNews.css";

const ListNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [dataNewss, setDataNewss] = useState([]);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Voulez-vous vraiment supprimer cet élément?"
  );
  const [dataModal, setDataModal] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);

  const newsDelete = useSelector((state) => state.newsDelete);
  const newsList = useSelector((state) => state.newsList);
  const { newss, success: successList } = newsList;
  const { success: successDelete, error: errorDelete } = newsDelete;
  const newsCreate = useSelector((state) => state.newsCreate);
  const { success: successCreate } = newsCreate;
  const newsUpdate = useSelector((state) => state.newsUpdate);
  const { success: successUpdate } = newsUpdate;

  const columns = [
    {
      title: "Titre",
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            size="small"
            type="primary"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#91caff",
            }}
            shape="round"
            icon={<EyeOutlined />}
            onClick={() => handleView(record.id, record)}
          />
          <Button
            size="small"
            type="primary"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffa940",
            }}
            shape="round"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id, record)}
          />
          <Button
            size="small"
            type="primary"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ff7875",
            }}
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setLoadingSpiner(true);
    dispatch(listNewsAction(currentPage, pageSize));
    setTimeout(() => {
      setLoadingSpiner(false);
    }, 2000);
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    let isDataLoaded = false;
    if (newss && newss.data !== undefined && successList) {
      const updatedData = newss.data.map((news) => ({
        ...news,
        key: news.id,
      }));
      setDataNewss(updatedData);
      setTotalPage(newss.total);
      isDataLoaded = true;
    }
    if (isDataLoaded) {
      setTimeout(() => {
        setLoadingSpiner(false);
      }, 2000);
    }
  }, [newss, successDelete, successList, api]);

  useEffect(() => {
    if (successCreate) {
      dispatch(resetNewsCreate());
      api.success({
        message: "Succès",
        description: "Actualité ajoutée avec succès.",
      });
    }
    if (successUpdate) {
      dispatch(resetNewsUpdate());
      api.success({
        message: "Succès",
        description: "Actualité modifieé avec succès.",
      });
    }
  }, [dispatch, successCreate, api, successUpdate]);

  useEffect(() => {
    if (successDelete === true) {
      dispatch(listNewsAction());
      api.success({
        message: "Succès",
        description: "Suppression effectuée avec succès.",
      });
    } else if (successDelete === false && errorDelete !== undefined) {
      api.error({
        message: "Erreur de suppression",
        description: errorDelete,
      });
    }
  }, [successDelete, errorDelete, api, dispatch]);

  //function redirect to add
  const handleClick = () => {
    navigate("../add-news");
  };

  //function redirect to detail
  const handleView = (id, news) => {
    navigate(`../detail-news/${id}`, { state: { news } });
  };

  //function redirect to edit
  const handleEdit = (id, news) => {
    navigate(`../edit-news/${id}`, { state: { news } });
  };

  //function open modal delete
  const handleDelete = (news) => {
    setConfirmLoading(false);
    setOpen(true);
    setDataModal(news);
  };

  // //function delete action
  const handleDeleteAction = async () => {
    setConfirmLoading(true);
    if (dataModal) {
      await dispatch(deleteNewsAction(dataModal.id))
        .then(() => {
          setOpen(false);
          setConfirmLoading(false);
        })
        .catch(() => {})
        .finally(() => {
          dispatch(resetNewsDelete());
        });
    }
  };

  //function close modal
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Spin
        style={{ marginTop: "20%" }}
        spinning={loadingSpiner}
        tip=""
        size="large"
      >
        {contextHolder}
        <div className="main-page">
          <h1 className="text-center">Liste des Actualités</h1>
          <Button
            className="btn-custom-back"
            onClick={handleClick}
            type="primary"
            shape="round"
            icon={<PlusCircleOutlined />}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#93C572",
              float: "right",
              margin: "20px",
            }}
          >
            Ajouter
          </Button>

          <Table
            columns={columns}
            dataSource={dataNewss}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalPage,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: false,
              position: "center",
            }}
            scroll={{
              x: 1300,
            }}
          />
        </div>

        {/**modal delete */}
        <Modal
          title="Confirmer la suppression"
          open={open}
          onOk={handleDeleteAction}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText="Supprimer"
          cancelText="Annuler"
          okButtonProps={{ style: { backgroundColor: "#ff7875" } }}
        >
          <p>{modalText}</p>
        </Modal>
      </Spin>
    </div>
  );
};

export default ListNews;
