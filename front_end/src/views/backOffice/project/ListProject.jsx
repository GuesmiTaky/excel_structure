import React, { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Spin, Table, notification } from "antd";
import "./listProject.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProjectAction,
  deleteProjectAction,
  resetProjectCreate,
  resetProjectUpdate,
  resetProjectDelete,
} from "../../../store/actions/projectActions";

const ListProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [dataProjects, setDataProjects] = useState([]);
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

  const projectDelete = useSelector((state) => state.projectDelete);
  const projectList = useSelector((state) => state.projectList);
  const { projects, success: successList } = projectList;
  const { success: successDelete, error: errorDelete } = projectDelete;
  const projectCreate = useSelector((state) => state.projectCreate);
  const { success: successCreate } = projectCreate;
  const projectUpdate = useSelector((state) => state.projectUpdate);
  const { success: successUpdate } = projectUpdate;

  const columns = [
    {
      title: "Nom du Projet",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },

    {
      title: "Catégorie",
      dataIndex: "name_category",
      key: "name_category",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Surface",
      dataIndex: "surface",
      key: "surface",
    },

    {
      title: "Mission d'exécution",
      dataIndex: "execution_mission",
      key: "execution_mission",
    },

    {
      title: "Montant",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Maître d’ouvrage",
      dataIndex: "owner",
      key: "owner",
    },

    {
      title: "Architecte",
      dataIndex: "architect",
      key: "architect",
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
            type="primary"
            size="small"
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
            size="small"
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
    dispatch(listProjectAction(currentPage, pageSize));
    setTimeout(() => {
      setLoadingSpiner(false);
    }, 2000);
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    let isDataLoaded = false;
    if (projects && projects.data !== undefined && successList) {
      const updatedData = projects.data.map((project) => ({
        ...project,
        key: project.id,
      }));
      setDataProjects(updatedData);
      setTotalPage(projects.total);
      isDataLoaded = true;
    }

    if (isDataLoaded) {
      setTimeout(() => {
        setLoadingSpiner(false);
      }, 2000);
    }
  }, [projects, successDelete, successList, api]);

  useEffect(() => {
    if (successCreate) {
      dispatch(resetProjectCreate());
      api.success({
        message: "Succès",
        description: "Projet ajoutée avec succès.",
      });
    }
    if (successUpdate) {
      dispatch(resetProjectUpdate());
      api.success({
        message: "Succès",
        description: "Projet modifieé avec succès.",
      });
    }
  }, [dispatch, successCreate, api, successUpdate]);

  useEffect(() => {
    if (successDelete === true) {
      dispatch(listProjectAction());
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
    navigate("../add-project");
  };

  //function redirect to detail
  const handleView = (id, project) => {
    navigate(`../detail-project/${id}`, { state: { project } });
  };

  //function redirect to edit
  const handleEdit = (id, project) => {
    navigate(`../edit-project/${id}`, { state: { project } });
  };

  //function open modal delete
  const handleDelete = (project) => {
    setConfirmLoading(false);
    setOpen(true);
    setDataModal(project);
  };

  // //function delete action
  const handleDeleteAction = async () => {
    setConfirmLoading(true);
    if (dataModal) {
      await dispatch(deleteProjectAction(dataModal.id))
        .then(() => {
          setOpen(false);
          setConfirmLoading(false);
        })
        .catch(() => {})
        .finally(() => {
          dispatch(resetProjectDelete());
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
          <h1 className="text-center">Liste des projets</h1>
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
            dataSource={dataProjects}
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

export default ListProject;
