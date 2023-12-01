import React from 'react';
import { useSelector } from 'react-redux';
import Logo from './logo';
import './index.css';
import Avatar from './avatar';

export default function Header() {
    const isAuthenticate = useSelector((state) => state.auths.isAuthenticate);
    if (isAuthenticate) {
        return (
            <div className="header-bar">
                <Logo />
                <Avatar />
            </div>
        );
    }
    return (
        <div className="header-bar" style={{ justifyContent: 'center' }}>
            <Logo />
        </div>
    );
}
