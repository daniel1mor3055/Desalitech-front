import React from 'react';
import {NavLink} from "react-router-dom";
import IntlMessages from 'util/IntlMessages';

const SidenavElement = (props) => {
    console.log("/app/" + props.relativePath);
    return (
        <li className="menu no-arrow">
            <NavLink to={"/app/" + props.relativePath}>
                <i className={"zmdi " + props.icon + " zmdi-hc-fw"}/>
                <span className="nav-text"><IntlMessages id={props.id}/> </span>
            </NavLink>
        </li>);
};
export default SidenavElement;