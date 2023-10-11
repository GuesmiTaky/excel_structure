import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Spin,
    DatePicker,
    ConfigProvider
} from 'antd';
import moment from 'moment';
import 'moment/locale/fr';
import frFR from 'antd/lib/locale/fr_FR';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateNewsAction, } from '../../../store/actions/newsActions';
import './addNews.css';
import '../global.css';

const { TextArea } = Input;

const EditNews = () => {
    moment.locale('fr');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingSpiner, setLoadingSpiner] = useState(true);

    const [form] = Form.useForm();
    const location = useLocation();
    const news = location.state && location.state.news;
    const projetUpdate = useSelector((state) => state.newsUpdate);

    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = projetUpdate;



    useEffect(() => {
        if (news) {
            setLoadingSpiner(false)
        }
    }, [news]);


    useEffect(() => {

    }, [successUpdate]);

    //function edit item
    const editModel = async (values) => {
        setLoading(true);
        await dispatch(updateNewsAction(news.id, values))
            .then(() => {
                navigate('../list-news');
                setLoading(false);
            }).catch(() => {

            })
    };

    //function redirect to list
    const redirectToList = () => {
        navigate('../list-news');
    };

    return (
        <div>
            <Spin style={{ marginTop: '20%' }} spinning={loadingSpiner} tip="" size="large">
                <div className="container form-add">
                    <h1 className="text-center mb-5">Modifier actualité</h1>
                    <ConfigProvider locale={frFR}>
                        <Form
                            className='form-add-news'
                            form={form}
                            onFinish={editModel}
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
                        >

                            {/** titre*/}

                            <Form.Item label="Titre"
                                name="title"
                                initialValue={news.title}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez entrer titre !',
                                    },
                                    {
                                        max: 30,
                                        message: 'Le titre ne peut pas dépasser 30 caractères !',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                            {/** date */}

                            <Form.Item
                                label="Date"
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez sélectionner une date !',
                                    },
                                ]}
                                initialValue={moment(news.date)}
                            >
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>

                            {/** Description */}

                            <Form.Item
                                className='mb-5'
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez sélectionner une description !',
                                    },
                                    {
                                        max: 256,
                                        message: 'La description ne peut pas dépasser 30 caractères !',
                                    },
                                ]}
                                initialValue={news.description}
                            >

                                <TextArea rows={6} maxLength={600} />
                            </Form.Item>

                            <Form.Item wrapperCol={{
                                className: 'group-button d-flex justify-content-between mb-5',
                            }}>
                                <Button className='btn-custom-back' shape="round" type="primary" htmlType="submit" loading={loading}>
                                    Valider
                                </Button>
                                <Button className='btn-custom-back' shape="round" htmlType="button" onClick={redirectToList}>
                                    Retour
                                </Button>

                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
            </Spin>
        </div >
    )
}

export default EditNews
