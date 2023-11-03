import React from 'react';
// import { Outlet } from 'react-router-dom';
import Header from '../../components/header';
import SiderBar from '../../components/siderbar';
import './index.css';

export default function Root() {
    return (
        <>
            <Header />
            <SiderBar />
            <div id="detail">
                <div>Ae code trong vung mau hong</div>
            </div>
        </>
    );
}
