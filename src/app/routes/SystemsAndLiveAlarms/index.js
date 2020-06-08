import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {isIOS, isMobile} from 'react-device-detect';

import Header from 'app/components/Header';
import Footer from 'app/components/Footer';
import Tour from 'app/components/Tour/index';
import TopNav from 'app/components/TopNav';
import BasicCard from "./BasicCards/BasicCard";
import CircularIndeterminate from "app/components/Progress/CircularIndeterminate";
import ChangeAlarmsSystemTabs from "./SystemsAndLiveAlarmsToolbar/ChangeAlarmsSystemTabs";
import ChangeSystemViewTabs from "./SystemsAndLiveAlarmsToolbar/ChangeSystemViewTabs";
import SearchBox from "app/components/SearchBox";
import {fetchSystems} from "store/thunk/systemSelect";
import {fetchPolling} from "store/thunk/polling";
import {setSystemName} from 'store/actions/header';
import DataTable from 'app/components/DataTable';
import './index.scss';
import StatusIndicator from "app/components/StatusIndicator";
import {STATUS_OFFLINE, STATUS_ONLINE} from 'constants/systemStatus';
import {SYSTEMS_ALARMS_POLLING_INTERVAL} from "constants/globalConstats";

class SystemsAndLiveAlarms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            systemIdSearchText: '',
            systemNameSearchText: '',
            activeAlarmSystemIdSearchText: '',
            activeAlarmIdSearchText: '',
            activeAlarmDescriptionSearchText: '',
            dataPolling: ''
        };
    }


    componentDidMount() {
        this.props.onFetchSystems();
        this.props.onFetchPolling();
        const dataPolling = setInterval(
            () => {
                this.props.onFetchPolling();
            },
            SYSTEMS_ALARMS_POLLING_INTERVAL);
        this.setState({dataPolling});
    }

    componentWillUnmount() {
        clearInterval(this.state.dataPolling);
    }

    getSearchOptions = () => {
        return {
            'SYSTEM_ID': 'systemIdSearchText',
            'SYSTEM_NAME': 'systemNameSearchText',
            'ACTIVE_ALARM_SYSTEM_ID': 'activeAlarmSystemIdSearchText',
            'ACTIVE_ALARM_ID': 'activeAlarmIdSearchText',
            'ACTIVE_ALARM_DESCRIPTION': 'activeAlarmDescriptionSearchText',
        };
    };

    updateSearchText(event, id) {
        const stateSearchOptions = this.getSearchOptions();

        this.setState({[stateSearchOptions[id]]: event.target.value});
    }

    handleSearchClear(event, id) {
        event.preventDefault();
        const stateSearchOptions = this.getSearchOptions();

        this.setState({[stateSearchOptions[id]]: ''});
    }

    handleClickOnSystemRow = (dataObject) => {
        const {sysId, systemName} = dataObject;
        const {history} = this.props;
        history.push(`/app/dashboard?sysId=${encodeURIComponent(sysId)}`);
        this.props.onSetSystemName(systemName);
    };

    handleClickOnAlarmRow = (dataObject) => {
        const {sysId} = dataObject;
        const {history} = this.props;
        history.push(`/app/alarm-list?sysId=${encodeURIComponent(sysId)}`);
    };

    getFilterData(systems, systemsStatusIcons) {
        const {systemIdSearchText, systemNameSearchText} = this.state;
        let filteredSystems = systems.filter(system => {
            const {sysId, systemName} = system;
            const sysIdToSearch = sysId === null ? '' : sysId;
            const systemNameToSearch = systemName === null ? '' : systemName;

            return sysIdToSearch.toLowerCase().includes(systemIdSearchText.toLowerCase()) &&
                systemNameToSearch.toLowerCase().includes(systemNameSearchText.toLowerCase());
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
            if (systemsStatus[i].status === STATUS_ONLINE) {
                systemsStatusIcons[systemsStatus[i].sysId] =
                    <StatusIndicator systemStatus={STATUS_ONLINE}/>;
                systemsStatusBorders[systemsStatus[i].sysId] = 'GreenBorder';
            }
            if (systemsStatus[i].status === STATUS_OFFLINE) {
                systemsStatusIcons[systemsStatus[i].sysId] =
                    <StatusIndicator systemStatus={STATUS_OFFLINE}/>;
                systemsStatusBorders[systemsStatus[i].sysId] = 'RedBorder';
            }
        }
        return {
            systemsStatusIcons: systemsStatusIcons,
            systemsStatusBorders: systemsStatusBorders
        };
    }

    getFilteredActiveAlarms() {
        const {activeAlarmSystemIdSearchText, activeAlarmIdSearchText, activeAlarmDescriptionSearchText} = this.state;
        const {activeAlarms} = this.props;
        let filteredActiveAlarms = activeAlarms.filter(activeAlarm => {
            const {sysId, alarmId, description} = activeAlarm;
            const sysIdToSearch = sysId == null ? '' : sysId;
            const alarmIdToSearch = alarmId == null ? '' : alarmId;
            const descriptionToSearch = description == null ? '' : description;

            return sysIdToSearch.toLowerCase().includes(activeAlarmSystemIdSearchText.toLowerCase()) &&
                alarmIdToSearch.toLowerCase().includes(activeAlarmIdSearchText.toLowerCase()) &&
                descriptionToSearch.toLowerCase().includes(activeAlarmDescriptionSearchText.toLowerCase());
        });
        const badSearch = !filteredActiveAlarms.length;
        return {filteredActiveAlarms, badSearch};
    }

    render() {
        const {systems, fetching, error, admin, history, errorPoll, fetchingPoll, activeAlarms} = this.props;

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
                <div className='d-flex justify-content-center'>
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
                                    this.props.onSetSystemName(systemName);
                                }}
                            />
                        );
                    })}
                </div>;
            const {filteredSystems, badSearch} = this.getFilterData(systems, systemsStatusIcons);
            const columnsIds = ['sysId', 'systemName', 'recovery', 'production', 'conductivity', 'systemStatus'];
            const columnsLabels = ['System ID', 'System Name', 'Recovery', 'Production', 'Conductivity', 'Status'];
            systemsTable =
                <>
                    <div className='SystemsAndLiveAlarms-searchBoxes row'>
                        <div className='col-2'>
                            <SearchBox
                                showClear={true}
                                styleName="d-none d-lg-block"
                                placeholder="Filter by System ID"
                                onChange={(event) => this.updateSearchText(event, 'SYSTEM_ID')}
                                value={this.state.systemIdSearchText} badSearch={badSearch}
                                handleClear={(event) => this.handleSearchClear(event, 'SYSTEM_ID')}/>
                        </div>
                        <div className='col-2'>
                            <SearchBox
                                showClear={true}
                                styleName="d-none d-lg-block"
                                placeholder="Filter by System Name"
                                onChange={(event) => this.updateSearchText(event, 'SYSTEM_NAME')}
                                value={this.state.systemNameSearchText} badSearch={badSearch}
                                handleClear={(event) => this.handleSearchClear(event, 'SYSTEM_NAME')}/>
                        </div>
                    </div>
                    <DataTable data={filteredSystems}
                               columnsIds={columnsIds}
                               columnsLabels={columnsLabels}
                               initialOrderBy={'sysId'}
                               cellIdentifier={'sysId'}
                               onRowClick={this.handleClickOnSystemRow}
                    />
                </>;
        }

        const columnsIds = ['sysId', 'alarmId', 'description', 'timeStamp'];
        const columnsLabels = ['System ID', 'Alarm ID', 'Description', 'Timestamp'];
        const {badSearch, filteredActiveAlarms} = this.getFilteredActiveAlarms();
        let alarmsJSX = <CircularIndeterminate/>;
        if (!errorPoll && !(fetchingPoll && activeAlarms.length === 1 && activeAlarms[0] === 'null')) {
            alarmsJSX =
                <>
                    <div className='SystemsAndLiveAlarms-searchBoxes row'>
                        <div className='col-2'>
                            <SearchBox
                                showClear={true}
                                styleName="d-none d-lg-block"
                                placeholder="Filter by System ID"
                                onChange={(event) => this.updateSearchText(event, 'ACTIVE_ALARM_SYSTEM_ID')}
                                value={this.state.activeAlarmSystemIdSearchText} badSearch={badSearch}
                                handleClear={(event) => this.handleSearchClear(event, 'ACTIVE_ALARM_SYSTEM_ID')}/>
                        </div>
                        <div className='col-2'>
                            <SearchBox
                                showClear={true}
                                styleName="d-none d-lg-block"
                                placeholder="Filter by Alarm ID"
                                onChange={(event) => this.updateSearchText(event, 'ACTIVE_ALARM_ID')}
                                value={this.state.activeAlarmIdSearchText} badSearch={badSearch}
                                handleClear={(event) => this.handleSearchClear(event, 'ACTIVE_ALARM_ID')}/>
                        </div>
                        <div className='col-2'>
                            <SearchBox
                                showClear={true}
                                styleName="d-none d-lg-block"
                                placeholder="Filter by Description"
                                onChange={(event) => this.updateSearchText(event, 'ACTIVE_ALARM_DESCRIPTION')}
                                value={this.state.activeAlarmDescriptionSearchText} badSearch={badSearch}
                                handleClear={(event) => this.handleSearchClear(event, 'ACTIVE_ALARM_DESCRIPTION')}/>
                        </div>
                    </div>
                    <DataTable data={filteredActiveAlarms}
                               columnsIds={columnsIds}
                               columnsLabels={columnsLabels}
                               initialOrderBy={'sysId'}
                               cellIdentifier={'id'}
                               onRowClick={this.handleClickOnAlarmRow}
                    />
                </>;
        }

        if (error) {
            systemsCards = <p>{"Couldn't fetch systems"}</p>;
            systemsTable = <p>{"Couldn't fetch systems"}</p>;
        }

        if (errorPoll) {
            alarmsJSX = <p>{"Couldn't fetch active alarms"}</p>;
        }

        const systemsJSX = admin ?
            <ChangeSystemViewTabs cardsView={systemsCards} tableView={systemsTable}/> : systemsCards;

        return (
            <div className={`SystemsAndLiveAlarms app-container collapsible-drawer`}>
                <Tour/>
                <div className="app-main-container">
                    <div
                        className={`app-header`}>
                        <TopNav styleName="app-top-header"/>}
                        <Header showSidebarIcon={false}/>
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


const mapStateToProps = ({systems, header, poll}) => {
    return {
        systems: systems.systems,
        fetching: systems.fetching,
        error: systems.error,
        admin: header.admin,
        activeAlarms: poll.activeAlarms,
        systemsStatus: poll.systemsStatus,
        fetchingPoll: poll.fetching,
        errorPoll: poll.error,
    };
};


const mapDispatchedToProps = dispatch => {
    return {
        onFetchSystems: () => dispatch(fetchSystems()),
        onFetchPolling: () => dispatch(fetchPolling()),
        onSetSystemName: (systemName) => dispatch(setSystemName(systemName)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(SystemsAndLiveAlarms));