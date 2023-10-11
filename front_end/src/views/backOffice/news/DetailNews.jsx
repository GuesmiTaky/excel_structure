import React from 'react'
import {
    Button,
    Form,
    Input,
} from 'antd';
import './addNews.css';
import { useNavigate, useLocation } from 'react-router-dom';
import './detailNews.css';
import '../global.css';

const { TextArea } = Input;

const DetailNews = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const news = location.state && location.state.news;

    //function redirect to edit
    const redirectToEdit = () => {
        navigate(`../edit-news/${news.id}`, { state: { news } });
    };

    //function redirect to list
    const redirectToList = () => {
        navigate('../list-news');
    };

    return (
        <div>
            <div className="container form-add">
                <h1 className="text-center mb-5">Détail d'actualité</h1>

                <Form
                    className='form-add-news'
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
                    initialValues={{
                        title: news.title,
                        date: news.date,
                        description: news.description,
                    }}
                >

                    <Form.Item className='custom-label-inp-back' label="Titre" name="title">
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item label="Date" name="date">
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item className='mb-5' label="Description" name="description">
                        <TextArea rows={6} maxLength={600} readOnly />
                    </Form.Item>

                    <Form.Item wrapperCol={{
                        className: 'group-button d-flex justify-content-between mb-5',
                    }}>
                        <Button className='btn-custom-back' shape="round" type="primary" htmlType="button" onClick={redirectToEdit}>
                            Modfier
                        </Button>
                        <Button className='btn-custom-back' shape="round" htmlType="button" onClick={redirectToList}>
                            Retour
                        </Button>
                    </Form.Item>
                </Form>



            </div>
        </div >
    )
}

export default DetailNews
