import React, {Component} from 'react';

import {Auth0Context} from "Auth0Provider";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import config from "auth_config.json";

class UserInfoPopup extends Component {
    static contextType = Auth0Context;


    logoutHandler = (e) => {
        e.preventDefault();
        const redirectPath = encodeURIComponent('http://localhost:3000/');
        window.location.assign('https://' + config.domain + '/v2/logout?returnTo=' + redirectPath);
    };

    render() {
        const {user: {nickname, picture}} = this.context;
        const {admin, fetching} = this.props;
        return (
            <div>
                <div className="user-profile">
                    <img className="user-avatar border-0 size-40 rounded-circle"
                         src={picture}
                         alt="User"/>
                    <div className="user-detail ml-2">
                        <h4 className="user-name mb-0">{nickname}</h4>
                        {fetching ?
                            null : admin ? <small>Administrator</small> : null}
                    </div>
                </div>
                <span className="jr-link dropdown-item text-muted">
                     <i className="zmdi zmdi-face zmdi-hc-fw mr-1"/>
                     <span>Profile</span>
                </span>
                <span className="jr-link dropdown-item text-muted">
                    <i className="zmdi zmdi-settings zmdi-hc-fw mr-1"/>
                  <span>Setting</span>
                </span>
                <span className="jr-link dropdown-item text-muted" onClick={this.logoutHandler}>
                    <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-1"/>
                    <span>Logout</span>
                </span>
            </div>
        );
    }
}

const mapStateToProps = ({header}) => {
    return {
        admin: header.admin,
        fetching: header.fetching,
    };
};

export default withRouter(connect(mapStateToProps)(UserInfoPopup));
