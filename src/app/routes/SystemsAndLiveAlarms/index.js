import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../../../components/Header';
import * as action from '../../../store/actions/index';
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
import IntlMessages from "../../../util/IntlMessages";
import BasicCard from "./BasicCards/BasicCard";
import {Auth0Context} from '../../../Auth0Provider';
import CircularIndeterminate from "../../components/Progress/CircularIndeterminate";
import Table from "../AlarmList/AlarmsTable";
import ChangeAlarmsSystemTabs from "./SystemsAndLiveAlarmsToolbar/ChangeAlarmsSystemTabs";
import ChangeSystemViewTabs from "./SystemsAndLiveAlarmsToolbar/ChangeSystemViewTabs";
import SearchBox from "../../../components/SearchBox";

class SystemsAndLiveAlarms extends React.Component {
    state = {
        searchText: ''
    }
    static contextType = Auth0Context;

    componentDidMount() {
        const {getTokenSilently, getIdTokenClaims} = this.context;
        this.props.onFetchSystems(getTokenSilently, getIdTokenClaims);
    }

    updateSearchText(evt) {
        this.setState({
            searchText: evt.target.value,
        });
    }

    getFilterData(systems) {
        let filteredSystems = systems.filter(system => system.SystemID.includes(this.state.searchText))
        const badSearch = !filteredSystems.length
        filteredSystems = badSearch ? systems : filteredSystems
        return [filteredSystems, badSearch]
    }

    render() {
        const {
            navigationStyle, horizontalNavPosition, systems, fetching, error, admin,
            history, onSystemSelection, onChangeView
        } = this.props;
        //set default height and overflow for iOS mobile Safari 10+ support.
        if (isIOS && isMobile) {
            document.body.classList.add('ios-mobile-view-height');
        } else if (document.body.classList.contains('ios-mobile-view-height')) {
            document.body.classList.remove('ios-mobile-view-height');
        }
        let badSearch = false
        let systemsCards = <CircularIndeterminate/>;
        let systemsTable = <CircularIndeterminate/>;

        if (!error && !fetching && systems.length !== 0) {
            systemsCards =
                <div className="d-sm-inline-block">
                    <div className='d-flex'>
                        {systems.map(system => (
                            <BasicCard
                                key={system}
                                image={require('./assets/large_no_background_top.svg')}
                                title={system.SystemID}
                                recovery={system.Recovery + '%'}
                                production={system.Production + ' gpm'}
                                conductivity={system.Conductivity + ' us/cm'}
                                systemStatus={system.status}
                                onClick={() => {
                                    onSystemSelection(system.SystemID)
                                    history.push("/app/dashboard")
                                }}
                            />
                        ))}
                    </div>
                </div>
            const filteredData = this.getFilterData(systems)
            badSearch = filteredData[1]
            systemsTable =
                <div className="d-sm-inline-block">
                    <SearchBox styleName="d-none d-lg-block"
                               placeholder="Filter by System ID or by System Name"
                               onChange={this.updateSearchText.bind(this)}
                               value={this.state.searchText} badSearch={badSearch}/>
                    <div className="d-flex justify-content-center">
                        <div className="col-12">
                            <div className="jr-card">
                                <Table data={filteredData[0]}
                                       clickable={true}
                                       clickFunction={(SystemID) => {
                                           onSystemSelection(SystemID)
                                           history.push("/app/dashboard")
                                           onChangeView(true)
                                       }}/>
                            </div>
                        </div>
                    </div>
                </div>
        }

        if (error) {
            systemsCards = <p>{"Couldn't fetch systems"}</p>;
            systemsTable = <p>{"Couldn't fetch systems"}</p>;
        }

        const alarmsJSX = 'Live Alarms'
        const systemsJSX = admin ?
            <ChangeSystemViewTabs cardsView={systemsCards} tableView={systemsTable}/> : systemsCards

        return (
            <div className={`app-container collapsible-drawer`}>
                <Tour/>
                <div className="app-main-container">
                    <div
                        className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
                        {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
                        <TopNav styleName="app-top-header"/>}
                        <Header showSidebarIcon={false}/>
                        {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
                        <TopNav/>}
                    </div>

                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                            <ChangeAlarmsSystemTabs alarms={alarmsJSX} systems={systemsJSX}/>
                        </div>
                        <Footer/>
                    </main>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        navigationStyle: state.settings.navigationStyle,
        horizontalNavPosition: state.settings.horizontalNavPosition,
        systems: state.systemSelect.systems,
        fetching: state.systemSelect.fetching,
        error: state.systemSelect.error,
        admin: state.admin.admin
    };
};


const mapDispatchedToProps = dispatch => {
    return {
        onFetchSystems: (getTokenSilently, getIdTokenClaims) => dispatch(action.fetchSystems(getTokenSilently, getIdTokenClaims)),
        onSystemSelection: (selectedSystem) => dispatch(action.uponSystemSelection(selectedSystem))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(SystemsAndLiveAlarms));