import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import 'fontsource-roboto';
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
import {toggleCollapsedNav} from 'store/actions/Setting';
import {fetchSystemName} from 'store/thunk/header';
import Menu from 'app/components/TopNav/Menu';
import UserInfoPopup from 'app/components/UserInfo/UserInfoPopup';
import PropTypes from 'prop-types';
import './index.scss';


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

    componentDidMount() {
        const {systemName} = this.props;
        if (systemName === '') {
            this.props.onFetchSystemName();
        }
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

    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    activeAlarmsLocalStorageSync = () => {
        const {activeAlarms, fetchingPoll} = this.props;
        if (!fetchingPoll && !(activeAlarms.length === 1 && activeAlarms[0] === 'null')) {
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
        const {
            drawerType, showSidebarIcon,
            systemName, fetching, error, activeAlarms
        } = this.props;
        this.activeAlarmsLocalStorageSync();
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-block d-xl-none' : drawerType.includes(COLLAPSED_DRAWER) ? 'd-block' : 'd-none';
        const notificationsIconToShow = this.notificationsIconToShow();


        return (
            <AppBar
                className={`Header app-main-header`}>
                <Toolbar className="app-toolbar" disableGutters={false}>
                    {showSidebarIcon ?
                            <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
                                        onClick={this.onToggleCollapsedNav}>
                                <span className="menu-icon"/>
                            </IconButton> : null
                    }

                    <div className="Header-spaceBetween d-flex">
                        <Link className="app-logo mr-auto d-none d-sm-block" to="/">
                            <img src={require("assets/images/desalitech-logo.png")} alt="desalitech"
                                 title="desalitech"/>
                        </Link>

                        <Typography variant={'h4'} color={'inherit'} align={'center'}>
                            {window.location.pathname.includes('/app/system-select') ?
                                null : fetching ?
                                    null : systemName}
                        </Typography>

                        <ul className="header-notifications list-inline ml-auto">

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
                                        <CardHeader styleName="justify-content-center"
                                                    heading={"Active Alarms"}/>
                                        <LiveAlarmsNotifications activeAlarms={activeAlarms}/>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
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

const mapStateToProps = ({header, settings, poll}) => {
    return {
        drawerType: settings.drawerType,
        locale: settings.locale,
        systemName: header.systemName,
        fetching: header.fetching,
        activeAlarms: poll.activeAlarms,
        fetchingPoll: poll.fetching,
        error: header.error,
    };
};

const mapDispatchedToProps = dispatch => {
    return {
        onFetchSystemName: () => dispatch(fetchSystemName()),
        toggleCollapsedNav: (isNavCollapsed) => dispatch(toggleCollapsedNav(isNavCollapsed)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(Header));