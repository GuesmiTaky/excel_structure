import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Upload,
    Modal,
    message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPartnerAction, } from '../../../store/actions/partnerActions';
import './addPartner.css';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const AddPartner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const partnerCreate = useSelector((state) => state.partnerCreate);
    const {
        success: successCreate,
    } = partnerCreate;

    useEffect(() => { }, [successCreate])

    //function add item
    const addModel = async (values) => {
        if (fileList.length === 0) {
            message.error('Veuillez entrer une image de partenaire !');
        } else {
            values.fileList = fileList;
            setLoading(true);
            await dispatch(createPartnerAction(values))
                .then(() => {
                    navigate('../list-partner');
                    setLoading(false);
                }).catch((e) => {
                    console.log(e);
                })
        }
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
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
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
            >
            </div>
        </div>
    );


    return (
        <div>
            <div className="container form-add">
                <h1 className="text-center mb-5">Ajouter un partenaire</h1>
                <Form
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
                        width: 400,
                        maxWidth: 1000,
                    }}
                    encType="multipart/form-data"
                >
                    <Form.Item label="Nom de partenaire"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez entrer nom de partenaire !',
                            },
                            {
                                max: 30,
                                message: 'Le nom de partenaire ne peut pas dépasser 30 caractères !',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        className='mb-5'
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez entrer une image de partenaire !',
                                validator: (_, value) =>
                                    fileList.length !== 0
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Veuillez entrer une image de partenaire !')),
                            },
                        ]}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={() => false}
                            aria-label="Upload your image"
                        >
                            {fileList.length === 1 ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img
                                alt="example"
                                style={{
                                    width: '100%',
                                }}
                                src={previewImage}
                            />
                        </Modal>
                    </Form.Item>

                    <Form.Item wrapperCol={{
                        className: 'group-button d-flex justify-content-between',
                    }}>
                        <Button className='btn-custom-back' shape="round" type="primary" htmlType="submit" loading={loading}>
                            Valider
                        </Button>
                        <Button className='btn-custom-back' shape="round" htmlType="button" onClick={onReset}>
                            Réinitialiser
                        </Button>

                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default AddPartner
