import React, { useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Upload,
} from 'antd';
const App = ({ attributeList }) => {
    const normFile = (e) => {
        console.log(e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const [fileList, setFileList] = useState([]);

    return (
        <>
            <Form.List name="product_entity">
                {(fields, { add, remove }) => (
                    <div
                        style={{
                            display: 'flex',
                            rowGap: 16,
                            flexDirection: 'column',
                            minWidth: '600px',
                        }}
                    >
                        {fields.map((field) => (
                            <Card
                                size="small"
                                title={`Entity ${field.name + 1}`}
                                key={field.key}
                                extra={
                                    <CloseOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                }
                                style={{ minWidth: '600px' }}
                            >
                                <Form.Item
                                    name={[field.name, 'images']}
                                    valuePropName="fileList"
                                    label="Image"
                                    getValueFromEvent={normFile}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Upload
                                        listType="picture-card"
                                        maxCount={3}
                                        multiple
                                        beforeUpload={(file) => {
                                            setFileList([...fileList, file]);
                                            return false;
                                        }}
                                        fileList={fileList}
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
                                    label="SKU"
                                    name={[field.name, 'sku']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input style={{ maxWidth: '300px' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Quantity"
                                    name={[field.name, 'quantity']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <InputNumber
                                        style={{ maxWidth: '300px' }}
                                    ></InputNumber>
                                </Form.Item>
                                <Form.Item
                                    label="Status"
                                    name={[field.name, 'status']}
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
                                {attributeList.map((attribute) => {
                                    return (
                                        <Form.Item
                                            label={attribute.attribute_name}
                                            name={[
                                                field.name,
                                                `${attribute.attribute_id}`,
                                            ]}
                                            key={attribute.attribute_id}
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Please select attributes value"
                                                key={attribute.attribute_id}
                                                style={{ maxWidth: '300px' }}
                                            >
                                                {attribute.value.map(
                                                    (element) => (
                                                        <Select.Option
                                                            value={
                                                                element.attribute_option_id
                                                            }
                                                            key={
                                                                element.attribute_option_id
                                                            }
                                                        >
                                                            {
                                                                element.attribute_value
                                                            }
                                                        </Select.Option>
                                                    ),
                                                )}
                                            </Select>
                                        </Form.Item>
                                    );
                                })}
                            </Card>
                        ))}

                        <Button type="dashed" onClick={() => add()} block>
                            + Add Entity
                        </Button>
                    </div>
                )}
            </Form.List>
        </>
    );
};
export default App;
