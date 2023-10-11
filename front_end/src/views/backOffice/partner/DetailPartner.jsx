import React, { useEffect, useState } from 'react'

import {
    Button,
    Form,
    Input,
    Image,
    Timeline
} from 'antd';
import './addPartner.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { api_url_pic } from '../../../store/const';


const DetailPartner = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const partner = location.state && location.state.partner;
    const [urlImage, setImageUrl] = useState(null);

    useEffect(() => {

        if (partner && partner.image_relation) {
            setImageUrl(partner.image_relation.image_url)
        }

    }, [partner])

    //function redirect to add
    const redirectToEdit = () => {
        navigate(`../edit-partner/${partner.id}`, { state: { partner } });
    };

    //function redirect to add
    const redirectToList = () => {
        navigate('../list-partner');
    };
    return (
        <div>

            <div className="container form-add">
                <h1 className="text-center mb-5">Détail partenaire</h1>
                <Form

                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 1000,
                    }}
                >

                    <Form.Item initialValue={partner.name} label="Nom de partenaire" name="namePartner">
                        <Input readOnly />
                    </Form.Item>

                    {urlImage ? (
                        <Image src={api_url_pic + urlImage}
                            fallback={<div style={{ width: 250, height: 250, borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}></div>}
                            style={{ borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />
                    ) : null}

                    <Form.Item wrapperCol={{ className: 'group-button' }} style={{ marginTop: '20px' }}>
                        <Button className='btn-custom-back' shape="round" type="primary" htmlType="submit" onClick={() => redirectToEdit()}>
                            Modifier
                        </Button>
                        <Button className='btn-custom-back' shape="round" htmlType="submit" onClick={() => redirectToList()}>
                            Retour
                        </Button>

                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default DetailPartner
