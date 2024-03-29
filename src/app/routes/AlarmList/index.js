import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import CircularIndeterminate from 'app/components/Progress/CircularIndeterminate';
import { fetchAlarms, setEmailNotification } from 'store/thunk/alarmsList';
import SearchBox from "app/components/SearchBox";
import CardHeader from 'app/components/CardHeader';
import DataTable from "app/components/DataTable";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import './index.scss';


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

    getSearchOptions = () => {
        return {
            'ID': 'alarmIdSearchText',
            'DESCRIPTION': 'alarmDescriptionSearchText',
        };
    };

    updateSearchText(event, id) {
        const stateSearchOptions = this.getSearchOptions();

        this.setState({ [stateSearchOptions[id]]: event.target.value });

    }

    handleSearchClear(event, id) {
        event.preventDefault();
        const stateSearchOptions = this.getSearchOptions();

        this.setState({ [stateSearchOptions[id]]: '' });
    }

    getFilterData(alarms) {
        const { alarmIdSearchText, alarmDescriptionSearchText } = this.state;
        let filteredAlarms = alarms.filter(alarm => {
            const { alarmId, description } = alarm;
            const alarmIdToSearch = alarmId === null ? '' : alarmId;
            const descriptionToSearch = description === null ? '' : description;

            return alarmIdToSearch.toLowerCase().includes(alarmIdSearchText.toLowerCase()) &&
                descriptionToSearch.toLowerCase().includes(alarmDescriptionSearchText.toLowerCase());
        });
        const badSearch = !filteredAlarms.length;
        return { filteredAlarms, badSearch };
    }

    handleNotificationChange = (event) => {
        event.preventDefault();
        this.props.onSetEmailNotification(event.target.checked);
    };


    render() {
        const { alarmIdSearchText, alarmDescriptionSearchText } = this.state;
        const { alarms, fetching, error, emailNotification } = this.props;
        const columnsIds = ['alarmId', 'description', 'timeStamp'];
        const columnsLabels = ['Alarm ID', 'Description', 'Timestamp'];
        const { filteredAlarms, badSearch } = this.getFilterData(alarms);

        const alarmList =
            <div className="row animated slideInUpTiny animation-duration-3">
                <div className="col-12">
                    <div className='AlarmList-searchBoxes row'>
                        <div className='col-2'>
                            <SearchBox
                                showClear={true}
                                styleName="d-none d-lg-block"
                                placeholder="Filter by Alarm ID"
                                onChange={(event) => this.updateSearchText(event, 'ID')}
                                value={alarmIdSearchText} badSearch={badSearch}
                                handleClear={(event) => this.handleSearchClear(event, 'ID')}/>
                        </div>
                        <div className='col-2'>
                            <SearchBox
                                showClear={true}
                                styleName="d-none d-lg-block"
                                placeholder="Filter by Description"
                                onChange={(event) => this.updateSearchText(event, 'DESCRIPTION')}
                                value={alarmDescriptionSearchText} badSearch={badSearch}
                                handleClear={(event) => this.handleSearchClear(event, 'DESCRIPTION')}/>
                        </div>
                    </div>
                    <div className="jr-card jr-full-card">
                        <CardHeader styleName={'justify-content-end'}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color={'primary'}
                                        checked={emailNotification}
                                        onChange={this.handleNotificationChange}
                                        value="checkedEmail"
                                    />
                                }
                                label="E-mail Notifications"
                            />
                        </CardHeader>
                        <DataTable data={filteredAlarms}
                                   columnsIds={columnsIds}
                                   columnsLabels={columnsLabels}
                                   initialOrderBy={'timeStamp'}
                                   order={'desc'}
                                   cellIdentifier={'id'}/>
                    </div>
                </div>
            </div>;

        if (error) {
            throw new Error('Could not fetch alarms');
        }
        return (
            <div className="AlarmList app-wrapper">
                {fetching ? <CircularIndeterminate/> : alarmList}
            </div>
        );
    }
}

const mapStateToProps = ({ alarms }) => {
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