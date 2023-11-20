import React from 'react';
import Logo from './logo';
import './index.css';
import Avatar from './avatar';

export default function Header() {
    return (
        <div className="header-bar">
            <Logo />
            <Avatar />
        </div>
    );
}
