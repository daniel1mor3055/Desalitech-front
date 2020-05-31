import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {isIOS, isMobile} from 'react-device-detect';

import Header from 'app/components/Header';
import Footer from 'components/Footer';
import Tour from 'components/Tour/index';
import {ABOVE_THE_HEADER, BELOW_THE_HEADER, HORIZONTAL_NAVIGATION,} from 'store/actionTypes';
import TopNav from 'components/TopNav';
import BasicCard from "./BasicCards/BasicCard";
import CircularIndeterminate from "app/components/Progress/CircularIndeterminate";
import ChangeAlarmsSystemTabs from "./SystemsAndLiveAlarmsToolbar/ChangeAlarmsSystemTabs";
import ChangeSystemViewTabs from "./SystemsAndLiveAlarmsToolbar/ChangeSystemViewTabs";
import SearchBox from "components/SearchBox";
import {fetchSystems} from "store/thunk/systemSelect";
import {fetchPolling} from "store/thunk/polling";
import DataTable from 'app/components/DataTable';
import CardBox from "../../../components/CardBox";

class SystemsAndLiveAlarms extends React.Component {
    state = {
        systemIdSearchText: '',
        systemNameSearchText: '',
        activeAlarmSystemIdSearchText: '',
        activeAlarmIdSearchText: '',
        activeAlarmDescriptionSearchText: '',
    };

    componentDidMount() {
        this.props.onFetchSystems();
        this.props.onFetchPolling();
        this.dataPolling = setInterval(
            () => {
                this.props.onFetchPolling();
            },
            30000);
    }

    componentWillUnmount() {
        clearInterval(this.dataPolling);
    }

    updateSearchText(event, fieldToSearch) {
        switch (fieldToSearch) {
            case 'SYSTEM_ID': {
                this.setState({
                    systemIdSearchText: event.target.value,
                });
                return;
            }
            case 'SYSTEM_NAME': {
                this.setState({
                    systemNameSearchText: event.target.value,
                });
                return;
            }
            case 'ACTIVE_ALARM_SYSTEM_ID': {
                this.setState({
                    activeAlarmSystemIdSearchText: event.target.value,
                });
                return;
            }
            case 'ACTIVE_ALARM_ID': {
                this.setState({
                    activeAlarmIdSearchText: event.target.value,
                });
                return;
            }
            case 'ACTIVE_ALARM_DESCRIPTION': {
                this.setState({
                    activeAlarmDescriptionSearchText: event.target.value,
                });
                return;
            }
        }
    }

    handleClickOnSystemRow = (dataObject) => {
        const {sysId} = dataObject;
        const {history} = this.props;
        history.push(`/app/dashboard?sysId=${encodeURIComponent(sysId)}`);
    };

    handleClickOnAlarmRow = (dataObject) => {
        const {sysId} = dataObject;
        const {history} = this.props;
        history.push(`/app/alarm-list?sysId=${encodeURIComponent(sysId)}`);
    };

    getFilterData(systems, systemsStatusIcons) {
        let filteredSystems = systems.filter(system => {
            let {sysId, systemName} = system;
            if (sysId == null) {
                sysId = '';
            }
            if (systemName == null) {
                systemName = '';
            }
            return sysId.toLowerCase().includes(this.state.systemIdSearchText.toLowerCase()) &&
                systemName.toLowerCase().includes(this.state.systemNameSearchText.toLowerCase());
        });
        const badSearch = !filteredSystems.length;
        for (let i = 0; i < filteredSystems.length; i++) {
            filteredSystems[i] = {
                ...filteredSystems[i],
                systemStatus: systemsStatusIcons[filteredSystems[i].sysId],
            };
        }
        return {filteredSystems, badSearch};
    }

    prepareSystemsStatus() {
        const {systemsStatus} = this.props;
        let systemsStatusIcons = {};
        let systemsStatusBorders = {};
        for (let i = 0; i < systemsStatus.length; i++) {
            if (systemsStatus[i].status === 1) {
                systemsStatusIcons[systemsStatus[i].sysId] =
                    <i className={`zmdi zmdi-circle text-green Indicator`}>Online</i>;
                systemsStatusBorders[systemsStatus[i].sysId] = 'GreenBorder';
            }
            if (systemsStatus[i].status === 2) {
                systemsStatusIcons[systemsStatus[i].sysId] =
                    <i className={`zmdi zmdi-circle text-red Indicator`}>Offline</i>;
                systemsStatusBorders[systemsStatus[i].sysId] = 'RedBorder';
            }
        }
        return {
            systemsStatusIcons: systemsStatusIcons,
            systemsStatusBorders: systemsStatusBorders
        };
    }

    getFilteredActiveAlarms() {
        const {activeAlarms} = this.props;
        let filteredActiveAlarms = activeAlarms.filter(activeAlarm => {
            let {sysId, alarmId, description} = activeAlarm;
            if (sysId == null) {
                sysId = '';
            }
            if (alarmId == null) {
                alarmId = '';
            }
            if (description == null) {
                description = '';
            }
            return sysId.toLowerCase().includes(this.state.activeAlarmSystemIdSearchText.toLowerCase()) &&
                alarmId.toLowerCase().includes(this.state.activeAlarmIdSearchText.toLowerCase()) &&
                description.toLowerCase().includes(this.state.activeAlarmDescriptionSearchText.toLowerCase());
        });
        const badSearch = !filteredActiveAlarms.length;
        return {filteredActiveAlarms, badSearch};
    }

    render() {
        const {
            navigationStyle, horizontalNavPosition, systems, fetching, error, admin,
            history,
        } = this.props;
        if (isIOS && isMobile) {
            document.body.classList.add('ios-mobile-view-height');
        } else if (document.body.classList.contains('ios-mobile-view-height')) {
            document.body.classList.remove('ios-mobile-view-height');
        }
        let systemsCards = <CircularIndeterminate/>;
        let systemsTable = <CircularIndeterminate/>;

        if (!error && !fetching && systems.length !== 0) {
            const {systemsStatusIcons, systemsStatusBorders} = this.prepareSystemsStatus();
            systemsCards =
                <div className="d-sm-inline-block">
                    <div className='d-flex'>
                        {systems.map(system => {
                            const {sysId, recovery, production, conductivity, systemName} = system;
                            return (
                                <BasicCard
                                    key={sysId}
                                    image={require('./assets/large_no_background_top.svg')}
                                    title={systemName}
                                    recovery={recovery + '%'}
                                    production={production + ' gpm'}
                                    conductivity={conductivity + ' us/cm'}
                                    systemStatusIcon={systemsStatusIcons[sysId]}
                                    systemStatusBorder={systemsStatusBorders[sysId]}
                                    onClick={() => {
                                        history.push(`/app/dashboard?sysId=${encodeURIComponent(sysId)}`);
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>;
            const {filteredSystems, badSearch} = this.getFilterData(systems, systemsStatusIcons);
            const columnsIds = ['sysId', 'systemName', 'recovery', 'production', 'conductivity', 'systemStatus'];
            const columnsLabels = ['System ID', 'System Name', 'Recovery', 'Production', 'Conductivity', 'Status'];
            systemsTable =
                <div className="d-sm-inline-block">
                    <SearchBox styleName="d-none d-lg-block"
                               placeholder="Filter by System ID"
                               onChange={(event) => this.updateSearchText(event, 'SYSTEM_ID')}
                               value={this.state.systemIdSearchText} badSearch={badSearch}/>
                    <SearchBox styleName="d-none d-lg-block"
                               placeholder="Filter by System Name"
                               onChange={(event) => this.updateSearchText(event, 'SYSTEM_NAME')}
                               value={this.state.systemNameSearchText} badSearch={badSearch}/>
                    <div className="d-flex justify-content-center">
                        <div className="col-12">
                            <div className="jr-card">
                                <DataTable data={filteredSystems}
                                           columnsIds={columnsIds}
                                           columnsLabels={columnsLabels}
                                           initialOrderBy={'sysId'}
                                           cellIdentifier={'sysId'}
                                           onRowClick={this.handleClickOnSystemRow}
                                />
                            </div>
                        </div>
                    </div>
                </div>;
        }

        if (error) {
            systemsCards = <p>{"Couldn't fetch systems"}</p>;
            systemsTable = <p>{"Couldn't fetch systems"}</p>;
        }
        const columnsIds = ['sysId', 'alarmId', 'description', 'timeStamp'];
        const columnsLabels = ['System ID', 'Alarm ID', 'Description', 'Timestamp'];
        const {badSearch, filteredActiveAlarms} = this.getFilteredActiveAlarms();
        const alarmsJSX =
            <div className="row animated slideInUpTiny animation-duration-3">
                <SearchBox styleName="d-none d-lg-block"
                           placeholder="Filter by System ID"
                           onChange={(event) => this.updateSearchText(event, 'ACTIVE_ALARM_SYSTEM_ID')}
                           value={this.state.activeAlarmSystemIdSearchText} badSearch={badSearch}/>
                <SearchBox styleName="d-none d-lg-block"
                           placeholder="Filter by Alarm ID"
                           onChange={(event) => this.updateSearchText(event, 'ACTIVE_ALARM_ID')}
                           value={this.state.activeAlarmIdSearchText} badSearch={badSearch}/>
                <SearchBox styleName="d-none d-lg-block"
                           placeholder="Filter by Description"
                           onChange={(event) => this.updateSearchText(event, 'ACTIVE_ALARM_DESCRIPTION')}
                           value={this.state.activeAlarmDescriptionSearchText} badSearch={badSearch}/>
                <CardBox styleName="col-12" cardStyle=" p-0">
                    <DataTable data={filteredActiveAlarms}
                               columnsIds={columnsIds}
                               columnsLabels={columnsLabels}
                               initialOrderBy={'sysId'}
                               cellIdentifier={'id'}
                               onRowClick={this.handleClickOnAlarmRow}
                    />
                </CardBox>
            </div>;
        const systemsJSX = admin ?
            <ChangeSystemViewTabs cardsView={systemsCards} tableView={systemsTable}/> : systemsCards;

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


const mapStateToProps = ({settings, systems, admin, poll}) => {
    return {
        navigationStyle: settings.navigationStyle,
        horizontalNavPosition: settings.horizontalNavPosition,
        systems: systems.systems,
        fetching: systems.fetching,
        error: systems.error,
        admin: admin.admin,
        activeAlarms: poll.activeAlarms,
        systemsStatus: poll.systemsStatus,
    };
};


const mapDispatchedToProps = dispatch => {
    return {
        onFetchSystems: () => dispatch(fetchSystems()),
        onFetchPolling: () => dispatch(fetchPolling()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(SystemsAndLiveAlarms));