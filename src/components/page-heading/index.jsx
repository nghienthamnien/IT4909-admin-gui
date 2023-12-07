import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';

const App = ({ title, children }) => {
    return (
        <div className="page-heading">
            <div>
                <h1 className="page-heading-title">{title}</h1>
            </div>
            {children}
        </div>
    );
};
export default App;
