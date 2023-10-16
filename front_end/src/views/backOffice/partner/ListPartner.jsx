import React, { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Image, Modal, Space, Spin, Table, notification } from "antd";
import "./listPartner.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listPartnerAction,
  deletePartnerAction,
  resetPartnerCreate,
  resetPartnerUpdate,
  resetPartnerDelete,
} from "../../../store/actions/partnerActions";
import { api_url_pic } from "../../../store/const";

const ListPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [dataPartners, setDataPartners] = useState([]);
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

  const partnerDelete = useSelector((state) => state.partnerDelete);
  const partnerList = useSelector((state) => state.partnerList);
  const { partners, success: successList } = partnerList;
  const { success: successDelete, error: errorDelete } = partnerDelete;
  const partnerCreate = useSelector((state) => state.partnerCreate);
  const { success: successCreate } = partnerCreate;
  const partnerUpdate = useSelector((state) => state.partnerUpdate);
  const { success: successUpdate } = partnerUpdate;

  const columns = [
    {
      title: "Nom du partenaire",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Image",
      dataIndex: "image_relation",
      key: "image",
      render: (image) =>
        image && image.image_url ? (
          <Image src={api_url_pic + image.image_url} width={100} height={100} />
        ) : null,
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
    dispatch(listPartnerAction(currentPage, pageSize));
    setTimeout(() => {
      setLoadingSpiner(false);
    }, 2000);
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    let isDataLoaded = false;
    if (partners && partners.data !== undefined && successList) {
      const updatedData = partners.data.map((partner) => ({
        ...partner,
        key: partner.id,
      }));
      setDataPartners(updatedData);
      setTotalPage(partners.total);
      isDataLoaded = true;
    }
    if (isDataLoaded) {
      setTimeout(() => {
        setLoadingSpiner(false);
      }, 2000);
    }
  }, [partners, successList]);

  useEffect(() => {
    if (successDelete === true) {
      dispatch(listPartnerAction());
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
      dispatch(resetPartnerCreate());
      api.success({
        message: "Succès",
        description: "Partenaire ajouté avec succès.",
      });
    }
    if (successUpdate) {
      dispatch(resetPartnerUpdate());
      api.success({
        message: "Succès",
        description: "Partenaire modifié avec succès.",
      });
    }
  }, [dispatch, successCreate, api, successUpdate]);

  //function redirect to add
  const handleClick = () => {
    navigate("../add-partner");
  };

  //function redirect to detail
  const handleView = (id, partner) => {
    navigate(`../detail-partner/${id}`, { state: { partner } });
  };

  //function redirect to edit
  const handleEdit = (id, partner) => {
    navigate(`../edit-partner/${id}`, { state: { partner } });
  };

  //function open modal delete
  const handleDelete = (partner) => {
    setConfirmLoading(false);
    setOpen(true);
    setDataModal(partner);
  };

  // function delete action
  const handleDeleteAction = async () => {
    setConfirmLoading(true);
    if (dataModal) {
      await dispatch(deletePartnerAction(dataModal.id))
        .then(() => {
          setOpen(false);
          setConfirmLoading(false);
        })
        .catch(() => {})
        .finally(() => {
          dispatch(resetPartnerDelete());
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
          <h1 className="text-center">Liste des partenaires</h1>
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
            dataSource={dataPartners}
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

export default ListPartner;
