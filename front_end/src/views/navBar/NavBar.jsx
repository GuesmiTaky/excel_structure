import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { ProjectOutlined, AppstoreOutlined, LogoutOutlined, OneToOneOutlined, HddOutlined } from '@ant-design/icons';

import { useNavigate, useLocation } from 'react-router-dom';
import { message, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/userActions';
import './navBar.css';
import LogoBackOffice from '../../assets/LogoBackOffice';


const NavBar = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Êtes-vous sûr de vouloir vous déconnecter de votre session ?');
    const [selectedKey, setSelectedKey] = useState(localStorage.getItem("selectedMenuKey") || "1");

    useEffect(() => {
        const previousLocation = location.state?.from;
        if (previousLocation === '/login') {
            messageApi.open({
                type: 'success',
                content: 'Bienvenue à Excel Structure',
                duration: 4,
                style: {
                    color: 'green',
                },
            });
        }
    }, [location]);

    const handleSelect = (selectedItem) => {
        setSelectedKey(selectedItem.key);
        localStorage.setItem("selectedMenuKey", selectedItem.key);
    };

    // Redirection vers la page de projet
    const redirectToProject = () => {
        navigate('/admin/dashbord/list-project');
    };

    // Redirection vers la page de actualités
    const redirectToNews = () => {
        navigate('/admin/dashbord/list-news');
    };

    // Redirection vers la page de catégorie
    const redirectToCategory = () => {
        navigate('/admin/dashbord/list-category');
    };

    // Redirection vers la page de partenaire
    const redirectToPartner = () => {
        navigate('/admin/dashbord/list-partner');
    };


    // Logique de confirmation de déconnexion
    const confirmLogout = () => {
        setConfirmLoading(false);
        setOpen(true);
    };

    //function close modal
    const handleCancel = () => {
        setOpen(false);
        messageApi.open({
            type: 'success',
            content: 'Annulation de la déconnexion.',
            duration: 4,
            style: {
                color: 'info',
            },
        });
    };

    //function redirect to login page
    const redirectToLogout = () => {
        dispatch(logout());
        localStorage.removeItem("selectedMenuKey");
        navigate('/admin/login', { state: { from: '/navbar' } });
    };

    const menuItems = [
        {
            key: '0',
            label: <LogoBackOffice aria-label="Logo Back Office" />,
            style: {
                display: 'flex',
                alignItems: 'center'
            },

        },
        {
            key: '1',
            label: 'Catégorie',
            icon: <AppstoreOutlined />,
            style: {
                display: 'flex',
                alignItems: 'center'
            },
            onClick: redirectToCategory,
        },
        {
            key: '2',
            label: 'Projet',
            icon: <ProjectOutlined />,
            onClick: redirectToProject,
            style: {
                display: 'flex',
                alignItems: 'center'
            },
        },
        {
            key: '3',
            label: 'Actualités',
            icon: <OneToOneOutlined />,
            onClick: redirectToNews,
            style: {
                display: 'flex',
                alignItems: 'center'
            },
        },
        {
            key: '4',
            label: 'Partenaire',
            icon: <HddOutlined />,
            onClick: redirectToPartner,
            style: {
                display: 'flex',
                alignItems: 'center'
            },
        },
        {
            key: '5',
            label: 'Déconnexion',
            icon: <LogoutOutlined />,
            style: {
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center'
            },
            onClick: confirmLogout,
        },
    ];

    return (
        <>
            {contextHolder}
            <Menu mode="horizontal" theme="dark"
                selectedKeys={[selectedKey]}
                onSelect={handleSelect} >
                {menuItems.map(item => (
                    <Menu.Item key={item.key} onClick={item.onClick} style={item.style} aria-label={item.label}>
                        <div className='d-flex justify-content-center align-items-center'>
                            {item.icon && <span style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>{item.icon}</span>}
                            {item.label}
                        </div>
                    </Menu.Item>
                ))}
            </Menu>

            {/**modal logout */}
            <Modal
                title="Alerte"
                open={open}
                onOk={redirectToLogout}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Oui"
                cancelText="Non"
            >
                <p>{modalText}</p>
            </Modal>
        </>

    );
};

export default NavBar;
