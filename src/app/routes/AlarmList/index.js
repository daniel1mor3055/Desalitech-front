import React, {PureComponent} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux';

import IntlMessages from 'util/IntlMessages';
import {Auth0Context} from 'Auth0Provider';
import CircularIndeterminate from 'app/components/Progress/CircularIndeterminate';
import Table from 'app/components/Table';
import {fetchAlarms} from 'store/thunk/alarmsList';
import ContainerHeader from 'components/ContainerHeader';
import CardMenu from 'app/components/CardMenu/CardMenu';


class AlarmList extends PureComponent {
    static contextType = Auth0Context;

    state = {
        subMenuState: false,
        anchorEl: undefined,
    };


    onOptionMenuSelect = (event) => {
        this.setState({subMenuState: true, anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({subMenuState: false});
    };

    componentDidMount() {
        const {selectedSystem} = this.props;
        this.props.onFetchAlarms(selectedSystem);
    }

    render() {
        const {match, alarms, fetching, error} = this.props;
        let alarmsList = <CircularIndeterminate/>;

        if (!error && !fetching && alarms.length !== 0) {
            alarmsList =
                <div className="col-12">
                    <div className="jr-card">
                        <div className="jr-card-header mb-3 d-flex">
                            <h3 className="mb-0 mr-auto">Alarms List</h3>
                            <IconButton className="icon-btn" onClick={this.onOptionMenuSelect}>
                                <i className="zmdi zmdi-chevron-down"/>
                            </IconButton>
                        </div>
                        <Table data={alarms}/>
                    </div>
                </div>;

        }
        if (error) {
            alarmsList = <p>{"Coudn't fetch alarms"}</p>;
        }

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.alarmListPage"/>}/>
                <div className="d-flex justify-content-center">
                    {alarmsList}
                    <CardMenu menuState={this.state.subMenuState} anchorEl={this.state.anchorEl}
                              handleRequestClose={this.handleRequestClose.bind(this)}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({alarms,systems}) => {
    return {
        alarms: alarms.alarms,
        fetching: alarms.fetching,
        error: alarms.error,
        selectedSystem: systems.selectedSystem
    };
};


const mapDispatchedToProps = dispatch => {
    return {onFetchAlarms: (systemId) => dispatch(fetchAlarms(systemId))};
};

export default connect(mapStateToProps, mapDispatchedToProps)(AlarmList);