import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Space, Table, message, Badge } from 'antd';
import callAPI from '../../api/callAPI';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await callAPI('/customer');

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
