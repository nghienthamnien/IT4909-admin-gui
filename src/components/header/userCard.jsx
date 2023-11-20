import React from 'react';
import { Card } from 'antd';
const App = () => (
    <Card
        title="User Name"
        bordered={false}
        style={{
            width: 250,
        }}
    >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
    </Card>
);
export default App;
