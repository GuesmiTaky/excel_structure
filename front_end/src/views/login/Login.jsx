import React, { useEffect, useState } from 'react'
import { Button, Form, Input, notification, message } from 'antd';
import './login.css';
import imageLogin from '../../images/image-login.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/userActions';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loadings, setLoadings] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const [messageApi, contextHolderMessage] = message.useMessage();

    const userLogin = useSelector((state) => state.userLogin);
    const { error, userInfo } = userLogin;
    const [messageShown, setMessageShown] = useState(false);

    useEffect(() => {
        const previousLocation = location.state?.from;
        if (previousLocation === '/navbar' && error === undefined && !messageShown) {
            messageApi.open({
                type: 'success',
                content: 'Déconnexion OK - Vous avez été déconnecté(e) de votre session avec succès.',
                duration: 4,
                style: {
                    color: 'green',
                },
            });
            setMessageShown(true);
        } else if (error) {
            api.error({
                message: 'Erreur d\'authentification',
                description: error,
            });
        }
    }, [userInfo, error, location.state?.from, messageShown]);

    const enterLoading = async (index, values) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        await dispatch(login(values))
            .then(() => {
                const token = localStorage.getItem('userInfo');
                if (token) {
                    navigate('/admin/dashbord/list-category', { state: { from: '/login' } });
                }
            })
            .catch(() => {

            })
            .finally(() => {
                setLoadings((prevLoadings) => {
                    const newLoadings = [...prevLoadings];
                    newLoadings[index] = false;
                    return newLoadings;
                });
            });
    };

    return (
        <>
            {contextHolder}
            {contextHolderMessage}
            <div className='container'>
                <div className="shadow-element">
                    <img
                        className="img-login mx-auto rounded-circle shadow"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                        src={imageLogin}
                        alt=""
                    />
                    <h1 className="text-center h1-responsive">S'identifier</h1>
                    <Form
                        form={form}
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        style={{
                            maxWidth: 1000,
                            margin: '0px 15% 0px 15%',
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={(formValues) => enterLoading(0, formValues)}
                    >
                        <Form.Item
                            label="Adresse e-mail"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer votre adresse e-mail !',
                                },
                                {
                                    type: 'email',
                                    message: 'Veuillez entrer une adresse e-mail valide !',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mot de passe"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez entrer votre mot de passe !',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                xs: { span: 24 },
                                sm: { span: 16, offset: 8 },
                                md: { span: 16, offset: 8 },
                            }}
                        >
                            <Button
                                loading={loadings[0]}
                                type="primary"
                                htmlType="submit"
                                shape="round"
                                style={{ width: '100%', maxWidth: '300px' }}
                            >
                                Connexion
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div >
        </>

    )
}

export default Login
