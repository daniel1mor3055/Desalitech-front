import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import IntlMessages from 'util/IntlMessages';

const SidenavItem = ({relativePath, icon, id}) => (
    <li className="menu no-arrow">
        <NavLink to={"/app/" + relativePath}>
            <i className={"zmdi " + icon + " zmdi-hc-fw"}/>
            <span className="nav-text"><IntlMessages id={id}/> </span>
        </NavLink>
    </li>);


SidenavItem.propTypes = {
    relativePath: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string,
};

export default SidenavItem;