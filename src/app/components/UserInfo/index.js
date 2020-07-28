import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Auth0Context } from "Auth0Provider";
import config from 'auth_config';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class UserInfo extends Component {
    static contextType = Auth0Context;

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            open: false,
        };
    }

    openMenuHandler = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    closeMenuHandler = () => {
        this.setState({ open: false });
    };

    logoutHandler = (e) => {
        e.preventDefault();
        const redirectPath = encodeURIComponent('http://localhost:3000/');
        window.location.assign('https://' + config.domain + '/v2/logout?returnTo=' + redirectPath);
    };

    render() {
        const { admin, fetching } = this.props;
        const { user: { nickname, picture } } = this.context;

        return (
            <div className="user-profile d-flex flex-row align-items-center">
                <Avatar
                    alt='...'
                    src={picture}
                    className="user-avatar "
                />
                <div className="user-detail">
                    <h4 className="user-name" onClick={this.openMenuHandler}>{nickname} <i
                        className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
                    </h4>
                    {fetching ?
                        null : admin ? <small>Administrator</small> : null}
                </div>
                <Menu className="user-info"
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      open={this.state.open}
                      onClose={this.closeMenuHandler}
                      PaperProps={{
                          style: {
                              minWidth: 120,
                              paddingTop: 0,
                              paddingBottom: 0
                          }
                      }}>
                    <MenuItem onClick={this.closeMenuHandler}>
                        <i className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
                        <span>Profile</span>
                    </MenuItem>
                    <MenuItem onClick={this.closeMenuHandler}>
                        <i className="zmdi zmdi-settings zmdi-hc-fw mr-2"/>
                        <span>Setting</span>
                    </MenuItem>
                    <MenuItem onClick={this.logoutHandler}>
                        <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>
                        <span>Logout</span>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = ({ header }) => {
    return {
        admin: header.admin,
        fetching: header.fetching,
    };
};

export default withRouter(connect(mapStateToProps)(UserInfo));


