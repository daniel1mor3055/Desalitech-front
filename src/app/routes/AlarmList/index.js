import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import CircularIndeterminate from 'app/components/Progress/CircularIndeterminate';
import {fetchAlarms, setEmailNotification} from 'store/thunk/alarmsList';
import ContainerHeader from 'app/components/ContainerHeader';
import SearchBox from "app/components/SearchBox";
import CardHeader from 'app/components/CardHeader';
import DataTable from "app/components/DataTable";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


class AlarmList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            alarmIdSearchText: '',
            alarmDescriptionSearchText: '',
        };
    }

    componentDidMount() {
        this.props.onFetchAlarms();
    }

    updateSearchText(event, fieldToSearch) {
        switch (fieldToSearch) {
            case 'ID': {
                this.setState({
                    alarmIdSearchText: event.target.value,
                });
                return;
            }
            case 'DESCRIPTION': {
                this.setState({
                    alarmDescriptionSearchText: event.target.value,
                });
                return;
            }
        }
    }

    getFilterData(alarms) {
        let filteredAlarms = alarms.filter(alarm => {
            let {alarmId, description} = alarm;
            if (alarmId == null) {
                alarmId = '';
            }
            if (description == null) {
                description = '';
            }
            return alarmId.toLowerCase().includes(this.state.alarmIdSearchText.toLowerCase()) &&
                description.toLowerCase().includes(this.state.alarmDescriptionSearchText.toLowerCase());
        });
        const badSearch = !filteredAlarms.length;
        return {filteredAlarms, badSearch};
    }

    handleNotificationChange = (event, checked) => {
        event.preventDefault();
        this.props.onSetEmailNotification(checked);
    };


    render() {
        const {alarmIdSearchText, alarmDescriptionSearchText} = this.state;
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
                                   placeholder="Filter by Alarm ID"
                                   onChange={(event) => this.updateSearchText(event,'ID')}
                                   value={alarmIdSearchText} badSearch={badSearch}/>
                        <SearchBox styleName="d-none d-lg-block"
                                   placeholder="Filter by Alarm Description"
                                   onChange={(event) => this.updateSearchText(event,'DESCRIPTION')}
                                   value={alarmDescriptionSearchText} badSearch={badSearch}/>
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
        onFetchAlarms: () => dispatch(fetchAlarms()),
        onSetEmailNotification: (emailNotification) => dispatch(setEmailNotification(emailNotification))
    };
};

export default connect(mapStateToProps, mapDispatchedToProps)(AlarmList);