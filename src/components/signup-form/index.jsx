import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import callAPI from '../../api/callAPI';

const App = () => {
    const handleSubmit = async (value) => {
        const response = await callAPI.post('/auth/signup', value);
        console.log(response);
    };
    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
                offset: 4,
            }}
            layout="horizontal"
            style={{
                maxWidth: 600,
            }}
            onFinish={handleSubmit}
        >
            <Form.Item
                name={'name'}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Họ và tên" />
            </Form.Item>
            <Form.Item
                name={'email'}
                rules={[
                    {
                        required: true,
                    },
                    {
                        type: 'email',
                        message: 'Email không hợp lệ',
                    },
                ]}
            >
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
                name={'phone_number'}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Số điện thoại" type="tel" />
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(
                                    'The new password that you entered do not match!',
                                ),
                            );
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>
            <Form.Item
                name={'role'}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select placeholder="Vai trò">
                    <Select.Option value="0">Super Admin</Select.Option>
                    <Select.Option value="1">Admin</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 9 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                        width: '128px',
                        marginLeft: '10px',
                    }}
                >
                    Tạo tài khoản
                </Button>
            </Form.Item>
        </Form>
    );
};
export default () => <App />;
