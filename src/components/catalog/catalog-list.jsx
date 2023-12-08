import React, { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import callAPI from '../../api/callAPI';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Tên thuộc tính',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: '25%',
    },
    {
        title: 'URL key',
        dataIndex: 'url_key',
        width: '35%',
        key: 'url_key',
    },
    {
        title: 'Action',
        key: 'action',
        sorter: true,
        render: (_, record, index) => {
            const link = `/catalogs/edit/${record.uuid}`;
            return (
                <Space size="middle">
                    <Link to={link}>Edit</Link>
                </Space>
            );
        },
    },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows,
        );
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};
const App = () => {
    const [data, setData] = useState([]);
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
    // const handleOnRow = (record, index) => {
    //     navigate(`catalogs/edit/${record.uuid}`);
    // };
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
                rowSelection={{
                    ...rowSelection,
                }}
                indentSize={25}
                dataSource={data}
                rowKey={'id'}
                // onRow={handleOnRow}
            />
        </>
    );
};
export default App;
