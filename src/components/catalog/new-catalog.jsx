import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, TreeSelect } from 'antd';
import callAPI from '../../api/callAPI';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const [treeData, setTreeData] = useState([]);
    const [attributeList, setAttributeList] = useState([]);
    const navigate = useNavigate();
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

    useEffect(() => {
        (async () => {
            try {
                const res = await callAPI('/attribute');
                console.log(res.data.payload);
                setAttributeList(res.data.payload);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        callAPI
            .post('/catalog', values)
            .then((res) => {
                console.log(res), navigate(-1);
            })
            .catch((err) => console.log(err));
    };

    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            style={{
                maxWidth: 400,
            }}
            onFinish={onFinish}
        >
            <Form.Item name={'name'}>
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name={'meta_title'}>
                <Input placeholder="Meta title" />
            </Form.Item>
            <Form.Item name={'url_key'}>
                <Input placeholder="URL key" />
            </Form.Item>
            <Form.Item name={'parent_id'}>
                <TreeSelect
                    treeData={treeData}
                    fieldNames={{
                        value: 'id',
                        children: 'children',
                        label: 'name',
                    }}
                    placeholder="Select parent catalog"
                />
            </Form.Item>
            <Form.Item name="attributes">
                <Select mode="multiple" placeholder="Please select attributes">
                    {attributeList.map((element) => (
                        <Select.Option
                            value={element.attribute_id}
                            key={element.attribute_id}
                        >
                            {element.attribute_code}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name={'status'}>
                <Select placeholder="Please select status">
                    <Select.Option value="1">Enable</Select.Option>
                    <Select.Option value="0">Disable</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};
export default App;
