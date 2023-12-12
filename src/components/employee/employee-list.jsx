import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Space, Table, message, Badge } from 'antd';
import callAPI from '../../api/callAPI';

function App() {
    const [data, setData] = useState([]);
    const handleDelete = (id) => () => {
        callAPI
            .delete(`/attribute/${id}`)
            .then((res) => {
                const newData = data.filter((item) => item.attribute_id !== id);
                setData(newData);
            })
            .catch();
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await callAPI('/employee');

                setData(res.data.payload);
            } catch (error) {
                message.error(error);
            }
        })();
    }, []);
    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone_number',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            filters: [
                { text: 'Super Admin', value: 0 },
                { text: 'Admin', value: 1 },
                { text: 'All', value: 'all' },
            ],
            onFilter: (value, record) => {
                if (value === 'all') return true;
                return record.role === value;
            },
            filterMultiple: false,
            defaultFilteredValue: ['all'],
            render: (role) => {
                return role ? 'Admin' : 'Super Admin';
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            filters: [
                { text: 'Enable', value: true },
                { text: 'Disable', value: false },
                { text: 'All', value: 'all' },
            ],
            onFilter: (value, record) => {
                if (value === 'all') return true;
                return record.status;
            },
            filterMultiple: false,
            defaultFilteredValue: ['all'],
            render: (status) => {
                if (status) return <Badge status="success" text={'Enable'} />;
                else return <Badge status="error" text={'Disable'} />;
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
                rowKey={'admin_id'}
                bordered={true}
            />
        </>
    );
}
export default App;
