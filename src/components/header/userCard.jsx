import React from 'react';
import { Card, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { updateAuthenticate } from '../../slice/authsSlice';
const App = () => {
    const user = JSON.parse(localStorage.getItem('user_info'));
    const userName = user ? user.name : 'User Name';
    const dispatch = useDispatch();
    const handleClick = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
        dispatch(updateAuthenticate(false));
    };
    return (
        <Card
            title={`${userName}`}
            bordered={false}
            style={{
                width: 250,
            }}
        >
            <div>
                <p>Card content</p>
            </div>
            <div>
                <p>Card content</p>
            </div>
            <div>
                <p>Card content</p>
            </div>
            <div>
                <Button type="primary" size={'large'} onClick={handleClick}>
                    Log out
                </Button>
            </div>
        </Card>
    );
};
export default App;
