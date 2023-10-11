import React, { useEffect, useState } from 'react'
import {
    Button,
    Form,
    Input,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategoryAction, } from './../../../store/actions/categoryActions';
import './addCategory.css';
import '../global.css';

const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = categoryCreate;

    useEffect(() => { }, [successCreate])

    //function add item
    const addModel = async (values) => {
        setLoading(true);
        await dispatch(createCategoryAction(values))
            .then(() => {
                navigate('../list-category');
                setLoading(false);
            }).catch(() => {

            })
    };

    //function reset form
    const onReset = () => {
        form.resetFields();
    };

    return (
        <div>
            <div className="container form-add">
                <h1 className="text-center mb-5">Ajouter une catégorie</h1>
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
                    <Form.Item
                        className='custom-label-inp-back'
                        label="Nom de categorie"
                        name="name"
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
                        <Button shape="round" htmlType="button" onClick={onReset} className='btn-custom-back'>
                            Réinitialiser
                        </Button>

                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default AddCategory
