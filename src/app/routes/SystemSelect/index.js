import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from 'components/Header/index';
import * as action from '../../../store/actions/index'
import Footer from 'components/Footer';
import Tour from '../../../components/Tour/index';
import {
    ABOVE_THE_HEADER,
    BELOW_THE_HEADER,
    COLLAPSED_DRAWER,
    FIXED_DRAWER,
    HORIZONTAL_NAVIGATION,
} from '../../../store/actionTypes';
import {isIOS, isMobile} from 'react-device-detect';
import TopNav from '../../../components/TopNav';
import ContainerHeader from "../../../components/ContainerHeader";
import IntlMessages from "../../../util/IntlMessages";
import BasicCard from "./basicCards/BasicCard";
import { Auth0Context } from '../../../Auth0Provider';

class App extends React.Component {
    static contextType = Auth0Context;

    componentDidMount() {
        const { getTokenSilently, getIdTokenClaims } = this.context;
        this.props.onFetchSystems(getTokenSilently, getIdTokenClaims)
    }

    render() {
        const {match, drawerType, navigationStyle, horizontalNavPosition, systems, fetching} = this.props;
        //set default height and overflow for iOS mobile Safari 10+ support.
        if (isIOS && isMobile) {
            document.body.classList.add('ios-mobile-view-height')
        } else if (document.body.classList.contains('ios-mobile-view-height')) {
            document.body.classList.remove('ios-mobile-view-height')
        }

        return (
            <div className={`app-container collapsible-drawer`}>
                <Tour/>
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
                            <div className="app-wrapper">
                                <ContainerHeader match={match} title={<IntlMessages id="pages.systemSelectPage"/>}/>
                                <div className="d-sm-inline-block">
                                    {fetching ? null :
                                        <div className='d-flex'>
                                            {systems.map(system => (
                                                <BasicCard
                                                    key={system.id}
                                                    image={require('./assets/large_no_background_top.svg')}
                                                    title={system.SystemID}
                                                    rec={system.Recovery + '%'}
                                                    prod={system.Production + ' gpm'}
                                                    cond={system.Conductivity + ' us/cm'}
                                                    status={system.status}
                                                />
                                            ))}
                                        </div>}

                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </main>
                </div>
            </div>
        );
    }
}


// const mapStateToProps = ({settings}) => {
//     const {drawerType, navigationStyle, horizontalNavPosition} = settings;
//     return {drawerType, navigationStyle, horizontalNavPosition}
// };
const mapStateToProps = state => {
    return {
        drawerType: state.settings.drawerType,
        navigationStyle: state.settings.navigationStyle,
        horizontalNavPosition: state.settings.horizontalNavPosition,
        systems: state.systemSelect.systems,
        fetching: state.systemSelect.fetching
    }
};


const mapDispatchedToProps = dispatch => {
    return {onFetchSystems: (getTokenSilently, getIdTokenClaims) => dispatch(action.fetchSystems(getTokenSilently, getIdTokenClaims))}
}

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(App));