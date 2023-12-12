import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Image, Badge, message } from 'antd';
import callAPI from '../../api/callAPI';
import { Link, useSearchParams } from 'react-router-dom';

const App = () => {
    const [data, setData] = useState([]);
    const [countRow, setCountRow] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const handleDelete = (id) => () => {
        callAPI
            .delete(`/product/${id}`)
            .then((res) => {
                const newData = data.filter((item) => item.uuid !== id);
                setData(newData);
            })
            .catch((err) => console.log(err));
    };
    const handlePageChange = (page, _) => {
        setSearchParams({ page: page });

        callAPI(`/product?page=${page}`).then((res) => setData(res.data.rows));
    };
    const formatter = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'VND',
    });
    const columns = [
        {
            title: 'Image',
            width: '10%',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (link) => (
                <Image
                    width={32}
                    src={`http://localhost:8080/static/product/images/${link}`}
                />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link to={`/products/edit/${record.uuid}`}>{text}</Link>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => formatter.format(price),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '25%',
            filters: [
                { text: 'Yes', value: true },
                { text: 'No', value: false },
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
            render: (_, record, index) => {
                const link = `/products/edit/${record.uuid}`;
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
                const res = await callAPI('/product');
                setData(res.data.rows);
                setCountRow(res.data.count);
            } catch (error) {
                message.error(error);
            }
        })();
    }, []);
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={'product_id'}
                pagination={{
                    total: countRow,
                    PageSize: 10,
                    onChange: handlePageChange,
                }}
            />
        </>
    );
};
export default App;
