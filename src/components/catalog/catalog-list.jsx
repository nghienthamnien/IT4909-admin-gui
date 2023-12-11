import React, { useEffect, useState } from 'react';
import { Badge, Button, Space, Table } from 'antd';
import callAPI from '../../api/callAPI';
import { Link } from 'react-router-dom';

const App = () => {
    const [data, setData] = useState([]);
    const handleDelete = (id) => () => {
        callAPI
            .delete(`/catalog/${id}`)
            .then((res) => {
                const newData = data.filter((item) => item.uuid !== id);
                setData(newData);
            })
            .catch((err) => console.log(err));
    };
    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '25%',
            filters: [
                { text: 'Enable', value: ['Enable'] },
                { text: 'Disable', value: ['Disable'] },
                { text: 'All Status', value: ['Enable', 'Disable'] },
            ],
            onFilter: (value, record) => {
                console.log(value);
                return value.indexOf(record.status) >= 0;
            },
            filterMultiple: false,
            defaultFilteredValue: ['Enable', 'Disable'],
            render: (status) => {
                if (status === 'Enable')
                    return <Badge status="success" text={status} />;
                else return <Badge status="error" text={status} />;
            },
        },
        {
            title: 'URL key',
            dataIndex: 'url_key',
            width: '35%',
            key: 'url_key',
            render: (url_key) => <i>{url_key}</i>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => {
                const link = `/catalogs/edit/${record.uuid}`;
                return (
                    <Space size="middle">
                        <Button type="link">
                            <Link to={link}>Edit</Link>
                        </Button>
                        <Button onClick={handleDelete(record.uuid)}>
                            Delete
                        </Button>
                    </Space>
                );
            },
        },
    ];
    useEffect(() => {
        (async () => {
            try {
                const res = await callAPI('/catalog');
                console.log(res);
                setData(res.data.payload);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

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
                indentSize={25}
                dataSource={data}
                rowKey={'id'}
                bordered={true}
            />
        </>
    );
};
export default App;
