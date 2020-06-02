import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

import SidenavContent from './SidenavContent';
import UserInfo from 'app/components/UserInfo';
import {COLLAPSED_DRAWER, FIXED_DRAWER, HORIZONTAL_NAVIGATION} from 'store/actionTypes';
import {toggleCollapsedNav, updateWindowWidth} from 'store/actions/Setting';

class SideNav extends React.PureComponent {

    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.props.updateWindowWidth(window.innerWidth);
        });
    }


    prepareSystemsStatus() {
        const {systemsStatus} = this.props;
        let systemsStatusIcon = null;
        if (systemsStatus.length) {
            const {status} = systemsStatus[0];
            systemsStatusIcon = status ? <i className={`zmdi zmdi-circle text-green Indicator`}>Online</i> :
                <i className={`zmdi zmdi-circle text-red Indicator`}>Offline</i>;
        }
        return systemsStatusIcon;
    }

    render() {
        const {navCollapsed, drawerType, width, navigationStyle} = this.props;
        let drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-xl-flex' : drawerType.includes(COLLAPSED_DRAWER) ? '' : 'd-flex';
        let type = 'permanent';
        if (drawerType.includes(COLLAPSED_DRAWER) || (drawerType.includes(FIXED_DRAWER) && width < 1200)) {
            type = 'temporary';
        }

        if (navigationStyle === HORIZONTAL_NAVIGATION) {
            drawerStyle = '';
            type = 'temporary';
        }
        const systemsStatusIcon = this.prepareSystemsStatus();
        return (
            <div className={`app-sidebar d-none ${drawerStyle}`}>
                <Drawer className="app-sidebar-content"
                        variant={type}
                        open={type.includes('temporary') ? navCollapsed : true}
                        onClose={this.onToggleCollapsedNav}
                        classes={{
                            paper: 'side-nav',
                        }}
                >
                    <UserInfo/>
                    <SidenavContent>{systemsStatusIcon}</SidenavContent>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = ({settings, poll}) => {
    const {navCollapsed, drawerType, width, navigationStyle} = settings;
    const {systemsStatus} = poll;
    return {navCollapsed, drawerType, width, navigationStyle, systemsStatus};
};

export default withRouter(connect(mapStateToProps, {toggleCollapsedNav, updateWindowWidth})(SideNav));

