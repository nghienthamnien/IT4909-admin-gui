import React, { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SubMenu from './submenu';
import menu from './data';
import './index.css';

export default function SiderBar() {
    const [activeId, setActiveId] = useState([]);
    const handleClick = (elementId) => () => {
        const index = activeId.indexOf(elementId);
        const newActiveId = [...activeId];
        if (index === -1) {
            newActiveId.push(elementId);
            setActiveId(newActiveId);
        } else {
            newActiveId.splice(index, 1);
            setActiveId(newActiveId);
        }
    };

    const listItem = menu.map((element) => {
        if (element.item) {
            return (
                <li key={element.id}>
                    <div
                        onClick={handleClick(element.id)}
                        className="siderbar-item"
                        role="presentation"
                    >
                        <img
                            src={element.icon}
                            className="siderbar-item-icon"
                            alt=""
                        />
                        <span className="siderbar-item-text">
                            {element.title}
                        </span>
                        {activeId.includes(element.id) ? (
                            <UpOutlined className="siderbar-item-up" />
                        ) : (
                            <DownOutlined className="siderbar-item-down" />
                        )}
                    </div>
                    {activeId.includes(element.id) && (
                        <SubMenu subMenuItem={element.item} />
                    )}
                </li>
            );
        }
        return (
            <li key={element.id}>
                <div className="siderbar-item">
                    <Link to={element.link} style={{ textDecoration: 'none' }}>
                        <div>
                            <img
                                src={element.icon}
                                className="siderbar-item-icon"
                                alt=""
                            />
                            <span className="siderbar-item-text">
                                {element.title}
                            </span>
                        </div>
                    </Link>
                </div>
            </li>
        );
    });
    return (
        <div className="siderbar">
            <ul>{listItem}</ul>
        </div>
    );
}
