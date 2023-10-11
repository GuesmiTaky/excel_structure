import React, { useState } from 'react'
import {
    Button,
    Form,
    Input,
} from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateCategoryAction } from './../../../store/actions/categoryActions';
import './addCategory.css';
import '../global.css';

const EditCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state && location.state.category;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    //function update model
    const updateModel = async (values) => {
        setLoading(true);
        await dispatch(updateCategoryAction(category.id, values))
            .then(() => {
                navigate('../list-category');
                setLoading(false);
            }).catch((e) => {
                console.log(e);
            })
    };

    //function redirect to add
    const redirectToList = () => {
        navigate('../list-category');
    };

    return (
        <div>
            <div className="container form-add">
                <h1 className="text-center mb-5">Modifier catégorie</h1>
                <Form
                    form={form}
                    onFinish={updateModel}
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
                    <Form.Item
                        className='custom-label-inp-back mb-5'
                        label="Nom de categorie"
                        name="name"
                        initialValue={category.name}
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez entrer nom de categorie !',
                            },
                            {
                                max: 30,
                                message: 'Le nom de categorie ne peut pas dépasser 30 caractères !',
                            },
                        ]}>

                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{
                        className: 'group-button d-flex justify-content-between',
                    }}>
                        <Button shape="round" type="primary" htmlType="submit" loading={loading} className='btn-custom-back'>
                            Valider
                        </Button>
                        <Button shape="round" htmlType="button" onClick={redirectToList()} className='btn-custom-back'>
                            Réinitialiser
                        </Button>

                    </Form.Item>
                </Form>

            </div>
        </div>
    )

}

export default EditCategory
