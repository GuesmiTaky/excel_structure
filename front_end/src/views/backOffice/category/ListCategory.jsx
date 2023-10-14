import React, { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Spin, Table, notification } from "antd";
import "./listCategory.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listCategoryAction,
  deleteCategoryAction,
  resetCategoryCreate,
  resetCategoryUpdate,
  resetCategoryDelete,
} from "../../../store/actions/categoryActions";

const ListCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [dataCategorys, setDataCategorys] = useState([]);
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

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const categoryList = useSelector((state) => state.categoryList);
  const { categorys, success: successList } = categoryList;
  const { success: successDelete, error: errorDelete } = categoryDelete;
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: successCreate } = categoryCreate;
  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { success: successUpdate } = categoryUpdate;

  const columns = [
    {
      title: "Nom de catégorie",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
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
    dispatch(listCategoryAction(currentPage, pageSize));
    setTimeout(() => {
      setLoadingSpiner(false);
    }, 2000);
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    let isDataLoaded = false;
    if (categorys && categorys.data !== undefined && successList) {
      const updatedData = categorys.data.map((category) => ({
        ...category,
        key: category.id,
      }));
      setDataCategorys(updatedData);
      setTotalPage(categorys.total);
      isDataLoaded = true;
    }
    if (isDataLoaded) {
      setTimeout(() => {
        setLoadingSpiner(false);
      }, 2000);
    }
  }, [categorys, successList]);

  useEffect(() => {
    if (successDelete === true) {
      dispatch(listCategoryAction(currentPage, pageSize));
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

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCategoryCreate());
      api.success({
        message: "Succès",
        description: "Catégorie ajoutée avec succès.",
      });
    }
    if (successUpdate) {
      dispatch(resetCategoryUpdate());
      api.success({
        message: "Succès",
        description: "Catégorie modifieé avec succès.",
      });
    }
  }, [dispatch, successCreate, api, successUpdate]);

  //function redirect to add
  const handleClick = () => {
    navigate("../add-category");
  };

  //function redirect to detail
  const handleView = (id, category) => {
    navigate(`../detail-category/${id}`, { state: { category } });
  };

  //function redirect to edit
  const handleEdit = (id, category) => {
    navigate(`../edit-category/${id}`, { state: { category } });
  };

  //function open modal delete
  const handleDelete = (category) => {
    setConfirmLoading(false);
    setOpen(true);
    setDataModal(category);
  };

  // function delete action
  const handleDeleteAction = async () => {
    setConfirmLoading(true);
    if (dataModal) {
      await dispatch(deleteCategoryAction(dataModal.id))
        .then(() => {
          setOpen(false);
          setConfirmLoading(false);
        })
        .catch(() => {})
        .finally(() => {
          dispatch(resetCategoryDelete());
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
          <h1 className="text-center">Liste des catégories</h1>
          <Button
            className="btn-custom-back"
            onClick={() => handleClick()}
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
            dataSource={dataCategorys}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalPage,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: false,
              position: "center",
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

export default ListCategory;
