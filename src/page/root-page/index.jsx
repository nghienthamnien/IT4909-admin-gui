import React from 'react';
import Header from '../../components/header';
import SiderBar from '../../components/siderbar';
import './index.css';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticate = useSelector((state) => state.auths.isAuthenticate);
    const location = useLocation();
    return isAuthenticate ? (
        <>
            <Header />
            <SiderBar />
            <div id="detail">
                <Outlet />
            </div>
        </>
    ) : (
        <Navigate
            to={'/auth/login'}
            replace
            state={{ prevPath: location.pathname }}
        />
    );
};

export default ProtectedRoute;
