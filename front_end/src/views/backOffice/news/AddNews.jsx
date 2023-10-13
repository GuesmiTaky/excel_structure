import React, { useEffect, useState } from 'react'

import {
    Button,
    Form,
    Input,
    DatePicker,
    ConfigProvider
} from 'antd';
import moment from 'moment';
import 'moment/locale/fr';
import frFR from 'antd/lib/locale/fr_FR';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewsAction, } from '../../../store/actions/newsActions';
import './addNews.css';
import French from 'rc-picker/lib/locale/fr_FR';

const { TextArea } = Input;
moment.locale('fr');


const AddNews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const projetCreate = useSelector((state) => state.newsCreate);

    const {
        success: successCreate,
    } = projetCreate;

    useEffect(() => {
    }, [successCreate])


    //function add item
    const addModel = async (values) => {
        setLoading(true);
        await dispatch(createNewsAction(values))
            .then(() => {
                navigate('../list-news');
                setLoading(false);
            }).catch(() => {

            })
    };

    //function reset form
    const onReset = () => {
        form.resetFields();
    };


    return (
        <>
            <div className="container form-add">
                <h1 className="text-center mb-5">Ajouter une actualité</h1>
                <ConfigProvider locale={frFR}>
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
                    >

                        {/** nom d'actualité*/}
                        <Form.Item label="Titre"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer nom d\'actualité !',
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
                                    message: 'Veuillez sélectionner une date',
                                },
                            ]}
                        >
                            <DatePicker style={{ width: '100%' }} locale={French} />
                        </Form.Item>


                        {/** Description */}

                        <Form.Item
                            className='mb-5'
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez sélectionner une description',
                                },
                                {
                                    max: 256,
                                    message: 'La description ne peut pas dépasser 256 caractères !',
                                },
                            ]}
                        >

                            <TextArea rows={6} maxLength={600} />
                        </Form.Item>
                        <Form.Item wrapperCol={{
                            className: 'group-button d-flex justify-content-between mb-5',
                        }}>
                            <Button className='btn-custom-back' shape="round" type="primary" htmlType="submit" loading={loading}>
                                Valider
                            </Button>
                            <Button className='btn-custom-back' shape="round" htmlType="button" onClick={onReset}>
                                Réinitialiser
                            </Button>

                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div >
        </>
    )
}

export default AddNews
