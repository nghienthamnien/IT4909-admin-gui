import React, { useState } from 'react';
import callAPI from '../../api/callAPI';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
};

const FormDisabledDemo = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const onTypeChange = (e) => {
        setValue(e.target.value);
    };
    const onFinish = (values) => {
        console.log('Received values of form:', values);
        callAPI
            .post('/attribute', values)
            .then((res) => {
                console.log(res);
                navigate(-1);
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="vertical"
                style={{
                    maxWidth: 400,
                    overflow: 'hidden',
                    marginLeft: '32px',
                }}
                onFinish={onFinish}
                initialValues={{ type: 0, attributeValue: [null] }}
            >
                <Form.Item label="Name" name={'attributeName'}>
                    <Input />
                </Form.Item>
                <Form.Item label="Code" name={'code'}>
                    <Input />
                </Form.Item>
                <Form.Item label="Type" name={'type'}>
                    <Radio.Group onChange={onTypeChange} value={value}>
                        <Radio value={0}>Select</Radio>
                        <Radio value={1}> Multi Select </Radio>
                        <Radio value={2}> Text </Radio>
                    </Radio.Group>
                </Form.Item>
                {((type) => {
                    switch (type) {
                        case 2:
                            return (
                                <Form.Item
                                    label="Value"
                                    name={'attributeValue'}
                                >
                                    <Input />
                                </Form.Item>
                            );
                        default:
                            return (
                                <Form.List name="attributeValue">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    {...formItemLayout}
                                                    label={
                                                        index === 0
                                                            ? 'Value'
                                                            : ''
                                                    }
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder="attribute value"
                                                            style={{
                                                                width: '60%',
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    {fields.length > 1 ? (
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() =>
                                                                remove(
                                                                    field.name,
                                                                )
                                                            }
                                                        />
                                                    ) : null}
                                                </Form.Item>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{
                                                        width: '60%',
                                                    }}
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add field
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            );
                    }
                })(value)}
                <Form.Item label="Sort Order" name={'sortOrder'}>
                    <InputNumber />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default () => <FormDisabledDemo />;
