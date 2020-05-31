import React, {Component} from 'react';
import {Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {isIOS, isMobile} from 'react-device-detect';

import Header from 'app/components/Header';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import Tour from 'components/Tour';
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from 'store/actionTypes';
import asyncComponent from 'util/asyncComponent';
import TopNav from 'components/TopNav';
import PrivateRoute from 'app/components/PrivateRoute';

class App extends Component {

  render() {
    const {match, drawerType, navigationStyle, horizontalNavPosition} = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height')
    }
    else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height')
    }

    return (
      <div className={`app-container ${drawerStyle}`}>
        <Tour/>

        <Sidebar/>
        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
            <TopNav styleName="app-top-header"/>}
            <Header/>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
            <TopNav/>}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                <PrivateRoute path={`${match.url}/dashboard`}
                         component={asyncComponent(() => import(`app/routes/Dashboard`))}/>
                <PrivateRoute path={`${match.url}/alarm-list`}
                       component={asyncComponent(() => import(`app/routes/AlarmList`))}/>
                <PrivateRoute path={`${match.url}/tag-list`}
                       component={asyncComponent(() => import(`app/routes/TagList`))}/>
                <PrivateRoute path={`${match.url}/documentation`}
                       component={asyncComponent(() => import(`app/routes/Documentation`))}/>
                <PrivateRoute path={`${match.url}/charts`}
                       component={asyncComponent(() => import(`app/routes/Charts`))}/>
                <PrivateRoute path={`${match.url}/reports`}
                       component={asyncComponent(() => import(`app/routes/Reports`))}/>
                <PrivateRoute component={asyncComponent(() => import('components/Error404'))}/>
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
  const {drawerType, navigationStyle, horizontalNavPosition} = settings;
  return {drawerType, navigationStyle, horizontalNavPosition}
};
export default connect(mapStateToProps)(App);