import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const App = ({ title, children, isBack = false }) => {
    const navigate = useNavigate();
    return (
        <div className="page-heading">
            <div style={{ display: 'ruby' }}>
                {isBack && (
                    <div
                        style={{
                            borderStyle: 'solid',
                            margin: '0px 8px',
                            borderWidth: '1px',
                            padding: '5px 8px 1px 8px',
                            borderRadius: '2px',
                        }}
                    >
                        <ArrowLeftOutlined
                            style={{ fontSize: '24px' }}
                            onClick={() => navigate(-1)}
                        />
                    </div>
                )}
                <div>
                    <h1 className="page-heading-title">{title}</h1>
                </div>
            </div>
            {children}
        </div>
    );
};
export default App;
