import React from 'react';
import PropTypes from 'prop-types';

const SidenavList = ({ children }) => (
    <ul className="nav-menu">
        {children}
    </ul>
);

SidenavList.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};


export default SidenavList;