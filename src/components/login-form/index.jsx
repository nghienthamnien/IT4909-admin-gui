import React, { useEffect } from 'react';
import axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { loginSuccess } from '../../slice/authsSlice';
import { useDispatch } from 'react-redux';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import './index.css';
const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { prevPath } = location.state;
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const user = { ...values };
        (async () => {
            const { data } = await axios.post(
                'http://localhost:8080/api/v1/admin/auth/login',
                user,
                { withCredentials: true },
            );
            console.log(data);
            if (data.success) {
                const { accessToken } = data.payload;
                await localStorage.setItem('auth_token', accessToken);
                dispatch(loginSuccess(true));
                console.log(prevPath);
                return prevPath ? navigate(`${prevPath}`) : navigate('/');
            }
        })();
    };
    return (
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 15, offset: 4 }}
            style={{ minWidth: 600 }}
            size={'large'}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Phone number"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: '180px' }}
                >
                    Log in
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10 }}>
                <a className="login-form-forgot" href="">
                    Forgot password ?
                </a>
            </Form.Item>
        </Form>
    );
};
export default App;
