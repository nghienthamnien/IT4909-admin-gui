import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SubMenu({ subMenuItem }) {
    const listMenuItem = subMenuItem.map((item) => (
        <li key={item.id} className="siderbar-submenu-item">
            <Link
                to={item.link}
                style={{
                    textDecoration: 'none',
                    color: '#818181',
                    display: 'block',
                    width: '100%',
                }}
            >
                {item.name}
            </Link>
        </li>
    ));
    return <ul className="siderbar-submenu">{listMenuItem}</ul>;
}

SubMenu.propTypes = {
    subMenuItem: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        }),
    ).isRequired,
};
export default React.memo(SubMenu);
