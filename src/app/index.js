import React, {Component} from 'react';
import {Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {isIOS, isMobile} from 'react-device-detect';

import Header from 'app/components/Header';
import Sidebar from 'containers/SideNav/index';
import Footer from 'app/components/Footer';
import Tour from 'app/components/Tour';
import {COLLAPSED_DRAWER, FIXED_DRAWER,} from 'store/actionTypes';
import asyncComponent from 'util/asyncComponent';
import PrivateRoute from 'app/components/PrivateRoute';
import {fetchPolling} from "../store/thunk/polling";
import {APP_POLLING_INTERVAL} from "constants/globalConstats";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataPolling: ''
        };
    }

    componentDidMount() {
        this.props.onFetchPolling();
        const dataPolling = setInterval(
            () => {
                this.props.onFetchPolling();
            },
            APP_POLLING_INTERVAL);
        this.setState({dataPolling});
    }

    componentWillUnmount() {
        clearInterval(this.state.dataPolling);
    }

    render() {
        const {match, drawerType} = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

        if (isIOS && isMobile) {
            document.body.classList.add('ios-mobile-view-height');
        } else if (document.body.classList.contains('ios-mobile-view-height')) {
            document.body.classList.remove('ios-mobile-view-height');
        }

        return (
            <div className={`app-container ${drawerStyle}`}>
                <Tour/>

                <Sidebar/>
                <div className="app-main-container">
                    <div
                        className={`app-header`}>
                        <Header/>
                    </div>

                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                            <Switch>
                                <PrivateRoute path={`${match.url}/dashboard`}
                                              component={asyncComponent(() => import('app/routes/Dashboard'))}/>
                                <PrivateRoute path={`${match.url}/alarm-list`}
                                              component={asyncComponent(() => import('app/routes/AlarmList'))}/>
                                <PrivateRoute path={`${match.url}/tag-list`}
                                              component={asyncComponent(() => import('app/routes/TagList'))}/>
                                <PrivateRoute path={`${match.url}/charts`}
                                              component={asyncComponent(() => import('app/routes/Charts'))}/>
                                {/*<PrivateRoute path={`${match.url}/reports`}*/}
                                {/*              component={asyncComponent(() => import('app/routes/Reports'))}/>*/}
                                <PrivateRoute component={asyncComponent(() => import('app/components/Error404'))}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </main>
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({settings}) => {
    return {
        drawerType: settings.drawerType,
    };
};

const mapDispatchedToProps = dispatch => {
    return {
        onFetchPolling: () => dispatch(fetchPolling()),
    };
};

export default connect(mapStateToProps, mapDispatchedToProps)(App);