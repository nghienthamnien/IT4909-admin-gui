import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import callAPI from '../../api/callAPI';
import { Link } from 'react-router-dom';

const App = () => {
    const [data, setData] = useState([]);
    const handleDelete = (id) => () => {
        callAPI
            .delete(`/attribute/${id}`)
            .then((res) => {
                console.log(res.data.msg);
                const newData = data.filter((item) => item.attribute_id !== id);
                setData(newData);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await callAPI('/attribute');
                console.log(res);
                setData(res.data.payload);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    const columns = [
        {
            title: 'Tên thuộc tính',
            dataIndex: 'attribute_name',
        },
        {
            title: 'Code',
            dataIndex: 'attribute_code',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '15%',
            filters: [
                { text: 'Select', value: 0 },
                { text: 'Multi Select', value: 1 },
                { text: 'Text', value: 2 },
                { text: 'All', value: 'all' },
            ],
            onFilter: (value, record) => {
                if (value === 'all') return true;
                return record.type === value;
            },
            filterMultiple: false,
            defaultFilteredValue: ['all'],
            render: (type) => {
                return (
                    <Tag>
                        {((type) => {
                            switch (type) {
                                case 1:
                                    return 'Multi Select';
                                case 2:
                                    return 'Text';
                                default:
                                    return 'Select';
                            }
                        })(type)}
                    </Tag>
                );
            },
        },
        {
            title: 'Visible',
            dataIndex: 'visible',
            key: 'visible',
            filters: [
                { text: 'Yes', value: true },
                { text: 'No', value: false },
                { text: 'All', value: 'all' },
            ],
            onFilter: (value, record) => {
                console.log(value, record);
                if (value === 'all') return true;
                return record.visible;
            },
            filterMultiple: false,
            defaultFilteredValue: ['all'],
            render: (visible) => {
                return visible ? 'Yes' : 'No';
            },
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (_, record, index) => {
                const link = `/attributes/edit/${record.attribute_code}`;
                return (
                    <Space size="middle">
                        <Button>
                            <Link to={link}>Edit</Link>
                        </Button>
                        <Button onClick={handleDelete(record.attribute_id)}>
                            Delete
                        </Button>
                    </Space>
                );
            },
        },
    ];

    return (
        <>
            <Space
                align="center"
                style={{
                    marginBottom: 16,
                }}
            ></Space>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={'attribute_id'}
                bordered={true}
            />
        </>
    );
};
export default App;
