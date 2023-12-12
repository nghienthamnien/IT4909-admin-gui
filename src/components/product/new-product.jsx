import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Radio,
    TreeSelect,
    Upload,
} from 'antd';
import callAPI from '../../api/callAPI';
import ProductEntity from './product-entity';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const FormDisabledDemo = () => {
    const [treeData, setTreeData] = useState([]);
    const [attributeList, setAttributeList] = useState([]);
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await callAPI('/catalog');
                setTreeData(res.data.payload);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    const navigate = useNavigate();
    const handleSelect = (value, node, _) => {
        callAPI
            .get(`attribute/${value}`)
            .then((res) => {
                const newData = res.data.payload;
                setAttributeList(newData);
            })
            .catch((err) => console.log(err));
    };

    const handleFinish = (values) => {
        console.log(values);

        const formData = new FormData();
        formData.append('avatar', values.avatar[0].originFileObj);
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('status', values.status);
        formData.append('visible', values.visible);
        formData.append('catalog', values.catalog);
        formData.append('description', values.description);
        formData.append('short_description', values.short_description);
        formData.append('meta_title', values.meta_title);
        formData.append('meta_keyword', values.meta_keyword);
        formData.append('url_key', values.url_key);
        values.product_entity.forEach((element, index) => {
            element.images.forEach((image) =>
                formData.append(`images[${index}]`, image.originFileObj),
            );
            delete element.images;
            formData.append(
                `product_entity[${index}]`,
                JSON.stringify(element),
            );
        });
        console.log(formData);
        callAPI
            .post('/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(({ data }) => {
                console.log(data);
                navigate('/products');
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Form
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="vertical"
                style={{
                    maxWidth: 600,
                }}
                onFinish={handleFinish}
                encType="multipart/form-data"
            >
                <Form.Item
                    name={'name'}
                    label="Tên sản phẩm"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Tên sản phẩm" />
                </Form.Item>
                <Form.Item
                    name={'avatar'}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    label="Avatar"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={(file) => {
                            setFileList([...fileList, file]);
                            return false;
                        }}
                        fileList
                    >
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name={'price'}
                    label="Giá sản phẩm"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber
                        placeholder="Giá sản phẩm"
                        addonAfter="VND"
                        formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        style={{ minWidth: '200px' }}
                    />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name={'status'}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value="1"> Enable </Radio>
                        <Radio value="0"> Disable </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Visible"
                    name={'visible'}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value="1"> Yes </Radio>
                        <Radio value="0"> No </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name={'catalog'}
                    label="Catalog"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TreeSelect
                        treeData={treeData}
                        fieldNames={{
                            value: 'id',
                            children: 'children',
                            label: 'name',
                        }}
                        placeholder="Select parent catalog"
                        onSelect={handleSelect}
                    />
                </Form.Item>

                {attributeList && (
                    <Form.Item>
                        <ProductEntity
                            attributeList={attributeList}
                        ></ProductEntity>
                    </Form.Item>
                )}
                <Form.Item
                    label="Description"
                    name={'description'}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name={'short_description'}
                    label="Short Description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Short Description" />
                </Form.Item>
                <Form.Item
                    name={'meta_title'}
                    label="Meta title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Meta title" />
                </Form.Item>
                <Form.Item name={'meta_keyword'} label="Meta Keyword">
                    <Input placeholder="Meta Keyword" />
                </Form.Item>
                <Form.Item
                    name={'url_key'}
                    label="URL Key"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="URL key" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Button
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default () => <FormDisabledDemo />;
