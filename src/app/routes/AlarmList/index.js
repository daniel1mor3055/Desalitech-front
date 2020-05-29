import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import CircularIndeterminate from 'app/components/Progress/CircularIndeterminate';
import {fetchAlarms} from 'store/thunk/alarmsList';
import ContainerHeader from 'components/ContainerHeader';
import SearchBox from "components/SearchBox";
import CardBox from "components/CardBox";
import DataTable from "app/components/DataTable";


class AlarmList extends PureComponent {
    state = {
        searchText: '',
    };

    componentDidMount() {
        const {location, onFetchAlarms} = this.props
        const queryParams = new URLSearchParams(location.search);
        const sysId = queryParams.get('sysId')
        onFetchAlarms(sysId);
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

    render() {
        const {searchText} = this.state;
        const {match, alarms, fetching, error} = this.props;
        const columnsIds = ['alarmId', 'description', 'timeStamp'];
        const columnsLabels = ['Alarm ID', 'Description', 'Timestamp'];
        const {filteredAlarms, badSearch} = this.getFilterData(alarms);

        const alarmsList =
            <div className="row animated slideInUpTiny animation-duration-3">
                <SearchBox styleName="d-none d-lg-block"
                           placeholder="Filter by Alarm ID or by Alarm Description"
                           onChange={(event) => this.updateSearchText(event)}
                           value={searchText} badSearch={badSearch}/>
                <CardBox styleName="col-12" cardStyle=" p-0">
                    <DataTable data={filteredAlarms}
                               columnsIds={columnsIds}
                               columnsLabels={columnsLabels}
                               initialOrderBy={'alarmId'}
                               cellIdentifier={'id'}/>
                </CardBox>
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
        fetching: alarms.fetching,
        error: alarms.error,
    };
};


const mapDispatchedToProps = dispatch => {
    return {onFetchAlarms: (systemId) => dispatch(fetchAlarms(systemId))};
};

export default connect(mapStateToProps, mapDispatchedToProps)(AlarmList);