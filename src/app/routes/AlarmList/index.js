import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import CircularIndeterminate from 'app/components/Progress/CircularIndeterminate';
import {fetchAlarms,setEmailNotification} from 'store/thunk/alarmsList';
import ContainerHeader from 'components/ContainerHeader';
import SearchBox from "components/SearchBox";
import CardHeader from 'app/components/CardHeader';
import DataTable from "app/components/DataTable";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


class AlarmList extends PureComponent {
    state = {
        searchText: '',
    };

    componentDidMount() {
        const {location} = this.props
        const queryParams = new URLSearchParams(location.search);
        const sysId = decodeURIComponent(queryParams.get('sysId'))
        this.props.onFetchAlarms(sysId);
    }

    updateSearchText(event) {
        this.setState({
            searchText: event.target.value,
        });
    }

    getFilterData(alarms) {
        let filteredAlarms = alarms.filter(alarm => {
            const {alarmId, description} = alarm;
            return alarmId.toLowerCase().includes(this.state.searchText.toLowerCase()) ||
                description.toLowerCase().includes(this.state.searchText.toLowerCase());
        });
        const badSearch = !filteredAlarms.length;
        filteredAlarms = badSearch ? alarms : filteredAlarms;
        return {filteredAlarms, badSearch};
    }

    handleNotificationChange = (event, checked) => {
        event.preventDefault();
        const {location} = this.props;
        const queryParams = new URLSearchParams(location.search);
        const sysId = decodeURIComponent(queryParams.get('sysId'))
        this.props.onSetEmailNotification(sysId, checked);
    };


    render() {
        const {searchText} = this.state;
        const {match, alarms, fetching, error, emailNotification} = this.props;
        const columnsIds = ['alarmId', 'description', 'timeStamp'];
        const columnsLabels = ['Alarm ID', 'Description', 'Timestamp'];
        const {filteredAlarms, badSearch} = this.getFilterData(alarms);

        const alarmsList =
            <div className="row animated slideInUpTiny animation-duration-3">
                <div className="col-12">
                    <div className="jr-card jr-full-card">
                        <CardHeader>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color={'primary'}
                                        checked={emailNotification}
                                        onChange={this.handleNotificationChange}
                                        value="checkedEmail"
                                    />
                                }
                                label="E-mail Notification"
                            />
                        </CardHeader>
                        <SearchBox styleName="d-none d-lg-block"
                                   placeholder="Filter by Alarm ID or by Alarm Description"
                                   onChange={(event) => this.updateSearchText(event)}
                                   value={searchText} badSearch={badSearch}/>
                        <DataTable data={filteredAlarms}
                                   columnsIds={columnsIds}
                                   columnsLabels={columnsLabels}
                                   initialOrderBy={'alarmId'}
                                   cellIdentifier={'id'}/>
                    </div>
                </div>
            </div>;

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.alarmListPage"/>}/>
                {fetching ?
                    error ? <p>{"Coudn't fetch alarms"}</p> : <CircularIndeterminate/>
                    : alarmsList}
            </div>
        );
    }
}

const mapStateToProps = ({alarms}) => {
    return {
        alarms: alarms.alarms,
        emailNotification: alarms.emailNotification,
        fetching: alarms.fetching,
        error: alarms.error,
    };
};


const mapDispatchedToProps = dispatch => {
    return {
        onFetchAlarms: (systemId) => dispatch(fetchAlarms(systemId)),
        onSetEmailNotification: (systemId, emailNotification) => dispatch(setEmailNotification(systemId, emailNotification))
    };
};

export default connect(mapStateToProps, mapDispatchedToProps)(AlarmList);