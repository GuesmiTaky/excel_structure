import React from 'react'
import {
    Button,
    Form,
    Input,
    Timeline
} from 'antd';
import './addCategory.css';
import { useNavigate, useLocation } from 'react-router-dom';

const DetailCategory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state && location.state.category;

    //function redirect to add
    const redirectToEdit = () => {
        navigate(`../edit-category/${category.id}`, { state: { category } });
    };

    //function redirect to add
    const redirectToList = () => {
        navigate('../list-category');
    };
    return (
        <div>
            <div className="container form-add">
                <h1 className="text-center mb-5">Détail catégorie</h1>
                <Form
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
                        initialValue={category.name}>
                        <Input readOnly />
                    </Form.Item>

                    {/** Liste des projects */}

                    <Timeline>
                        {category.projet.map((p) => (
                            <Timeline.Item key={p.id}>
                                {p.name}
                            </Timeline.Item>
                        ))}
                    </Timeline>

                    <Form.Item wrapperCol={{
                        className: 'group-button d-flex justify-content-between',
                    }}>
                        <Button shape="round" type="primary" htmlType="submit" className='btn-custom-back' onClick={() => redirectToEdit()}>
                            Modifier
                        </Button>
                        <Button shape="round" htmlType="button" onClick={() => redirectToList()} className='btn-custom-back'>
                            Retour
                        </Button>

                    </Form.Item>
                </Form>

            </div>
        </div>

    )
}

export default DetailCategory
