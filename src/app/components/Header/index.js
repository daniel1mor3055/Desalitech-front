import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import {
    BELOW_THE_HEADER,
    COLLAPSED_DRAWER,
    FIXED_DRAWER,
    HORIZONTAL_NAVIGATION,
    INSIDE_THE_HEADER
} from 'store/actionTypes';
import LiveAlarmsNotifications from 'app/components/LiveAlarmsNotifications';
import CardHeader from 'app/components/CardHeader';
import {switchLanguage, toggleCollapsedNav} from 'store/actions/Setting';
import Menu from 'app/components/TopNav/Menu';
import UserInfoPopup from 'app/components/UserInfo/UserInfoPopup';
import PropTypes from 'prop-types';


class Header extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            searchBox: false,
            searchText: '',
            mailNotification: false,
            userInfo: false,
            langSwitcher: false,
            appNotification: false,
        };
    }

    onAppNotificationSelect = () => {
        const didReadNotifications = JSON.parse(localStorage.getItem('didReadNotifications'));
        if (didReadNotifications === false) {
            localStorage.setItem('didReadNotifications', JSON.stringify(true));
        }
        this.setState({
            appNotification: !this.state.appNotification
        });
    };

    onUserInfoSelect = () => {
        this.setState({
            userInfo: !this.state.userInfo
        });
    };

    handleRequestClose = () => {
        this.setState({
            langSwitcher: false,
            userInfo: false,
            mailNotification: false,
            appNotification: false,
            searchBox: false,
            apps: false
        });
    };

    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    activeAlarmsLocalStorageSync = () => {
        const {activeAlarms, fetching} = this.props;
        if (!fetching && !(activeAlarms.length === 1 && activeAlarms[0] === 'null')) {
            const activeAlarmIdArray = activeAlarms.map((activeAlarm) => {
                    const {id} = activeAlarm;
                    return id;
                }
            );
            const localStorageActiveAlarmIdArray = JSON.parse(localStorage.getItem('activeAlarmIdArray'));
            const localStorageIsDifferent = localStorageActiveAlarmIdArray ?
                activeAlarmIdArray.some(r => localStorageActiveAlarmIdArray.indexOf(r) === -1) : true;
            if (localStorageIsDifferent) {
                localStorage.setItem('activeAlarmIdArray', JSON.stringify(activeAlarmIdArray));
                if (!activeAlarmIdArray.length) {
                    localStorage.setItem('didReadNotifications', JSON.stringify(true));
                }
                if (activeAlarmIdArray.length) {
                    localStorage.setItem('didReadNotifications', JSON.stringify(false));
                }
            }
        }
    };

    notificationsIconToShow = () => {
        const didReadNotifications = JSON.parse(localStorage.getItem('didReadNotifications'));
        if (didReadNotifications == null || didReadNotifications) {
            return '';
        }
        return 'icon-alert animated infinite wobble';
    };

    render() {
        this.activeAlarmsLocalStorageSync();
        const {drawerType, navigationStyle, horizontalNavPosition, showSidebarIcon, admin, activeAlarms} = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-block d-xl-none' : drawerType.includes(COLLAPSED_DRAWER) ? 'd-block' : 'd-none';
        const notificationsIconToShow = this.notificationsIconToShow();
        const sidebarIcon = showSidebarIcon ?
            <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
                        onClick={this.onToggleCollapsedNav}>
                <span className="menu-icon"/>
            </IconButton> : null;
        return (
            <AppBar
                className={`app-main-header ${(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) ? 'app-main-header-top' : ''}`}>
                <Toolbar className="app-toolbar" disableGutters={false}>
                    {navigationStyle === HORIZONTAL_NAVIGATION ?
                        <div className="d-block d-md-none pointer mr-3" onClick={this.onToggleCollapsedNav}>
                            <span className="jr-menu-icon">
                              <span className="menu-icon"/>
                            </span>
                        </div>
                        :
                        sidebarIcon
                    }

                    <Link className="app-logo mr-2 d-none d-sm-block" to="/">
                        <img src={require("assets/images/desalitech-logo.png")} alt="desalitech" title="desalitech"/>
                    </Link>
                    <Typography variant={'h4'} color={'inherit'} align={'center'}>
                        {/*{window.location.pathname.includes('/app/system-select') ? null : selectedSystemName}*/}
                    </Typography>

                    {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER) &&
                    <Menu/>}

                    <ul className="header-notifications list-inline ml-auto">

                        <li className="list-inline-item app-tour">
                            <Typography variant={'h4'} color={'inherit'}>
                                {admin ? 'Admin' : null}
                            </Typography>
                        </li>

                        <li className="list-inline-item app-tour">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.appNotification}
                                toggle={this.onAppNotificationSelect.bind(this)}>
                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <IconButton className="icon-btn">
                                        <i className={`zmdi zmdi-notifications-none ${notificationsIconToShow}`}/>
                                    </IconButton>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <CardHeader styleName="align-items-center"
                                                heading={"Active Alarms"}/>
                                    <LiveAlarmsNotifications activeAlarms={activeAlarms}/>
                                </DropdownMenu>
                            </Dropdown>
                        </li>

                        {navigationStyle === HORIZONTAL_NAVIGATION &&
                        <li className="list-inline-item user-nav">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.userInfo}
                                toggle={this.onUserInfoSelect.bind(this)}>
                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <IconButton className="icon-btn size-30">
                                        <Avatar
                                            alt='...'
                                            src={'https://via.placeholder.com/150x150'}
                                            className="size-30"
                                        />
                                    </IconButton>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <UserInfoPopup/>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                        }
                    </ul>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    showSidebarIcon: PropTypes.bool
};

Header.defaultProps = {
    showSidebarIcon: true
};

const mapStateToProps = ({admin, settings, poll}) => {
    return {
        drawerType: settings.drawerType,
        locale: settings.locale,
        navigationStyle: settings.navigationStyle,
        horizontalNavPosition: settings.horizontalNavPosition,
        // selectedSystemName: systems.selectedSystemName,
        admin: admin.admin,
        activeAlarms: poll.activeAlarms,
        fetching: poll.fetching,
    };
};

export default withRouter(connect(mapStateToProps, {toggleCollapsedNav, switchLanguage})(Header));