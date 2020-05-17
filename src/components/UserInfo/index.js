import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IntlMessages from 'util/IntlMessages';
import {Auth0Context} from "../../Auth0Provider";
import config from '../../auth_config';

class UserInfo extends Component {
    static contextType = Auth0Context;

    state = {
        anchorEl: null,
        open: false,
    };

    openMenuHandler = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    closeMenuHandler = () => {
        this.setState({open: false});
    };

    logoutHandler = (e) => {
        e.preventDefault();
        const redirectPath = encodeURIComponent('http://localhost:3000/');
        window.location.assign('https://' + config.domain + '/v2/logout?returnTo=' + redirectPath);
    };

    render() {
        const {user} = this.context;
        const {nickname, picture} = user;

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
                        <IntlMessages id="popup.profile"/>
                    </MenuItem>
                    <MenuItem onClick={this.closeMenuHandler}>
                        <i className="zmdi zmdi-settings zmdi-hc-fw mr-2"/>
                        <IntlMessages id="popup.setting"/>
                    </MenuItem>
                    <MenuItem onClick={this.logoutHandler}>
                        <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>

                        <IntlMessages id="popup.logout"/>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default UserInfo;


