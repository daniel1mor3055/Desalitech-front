import React from 'react';
import {NavLink} from "react-router-dom";
import IntlMessages from 'util/IntlMessages';
import PropTypes from 'prop-types';

const SidenavItem = ({relativePath, icon, id}) => {
    return (
        <li className="menu no-arrow">
            <NavLink to={"/app/" + relativePath}>
                <i className={"zmdi " + icon + " zmdi-hc-fw"}/>
                <span className="nav-text"><IntlMessages id={id}/> </span>
            </NavLink>
        </li>);
};

SidenavItem.propTypes = {
    relativePath: PropTypes.string,
    icon: PropTypes.string,
    id: PropTypes.string,
};

export default SidenavItem;