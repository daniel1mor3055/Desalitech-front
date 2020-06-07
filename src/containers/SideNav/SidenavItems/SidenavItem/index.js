import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import IntlMessages from 'util/IntlMessages';
import './index.scss';

const SidenavItem = ({relativePath, icon, id}) => (
    <li className="SidenavItem">
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