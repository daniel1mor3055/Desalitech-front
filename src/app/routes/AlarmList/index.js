import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import CircularIndeterminate from "../../components/Progress/CircularIndeterminate";
import Table from './AlarmsTable';
import IconButton from "@material-ui/core/IconButton";
import CardMenu from "./CardMenu/CardMenu";
import * as action from '../../../store/actions/alarmsList';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Auth0Context} from '../../../Auth0Provider';


class AlarmList extends React.Component {
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
        const {getTokenSilently, getIdTokenClaims} = this.context;
        const {selectedSystem} = this.props;
        this.props.onFetchAlarms(getTokenSilently, getIdTokenClaims, selectedSystem);
    }

    render() {
        const {match, alarms, fetching, error} = this.props;
        let alarmsTable = <CircularIndeterminate/>;

        if (!error && !fetching && alarms.length !== 0) {
            alarmsTable = <Table data={alarms}/>
        }

        if (error) {
            alarmsTable = <p>{"Coudn't fetch alarms"}</p>
        }

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.alarmListPage"/>}/>
                <div className="d-flex justify-content-center">
                    <div className="col-12">
                        <div className="jr-card">
                            <div className="jr-card-header mb-3 d-flex">
                                <h3 className="mb-0 mr-auto">Alarms List</h3>
                                <IconButton className="icon-btn" onClick={this.onOptionMenuSelect}>
                                    <i className="zmdi zmdi-chevron-down"/>
                                </IconButton>
                            </div>
                            {alarmsTable}
                        </div>
                    </div>
                    <CardMenu menuState={this.state.subMenuState} anchorEl={this.state.anchorEl}
                              handleRequestClose={this.handleRequestClose.bind(this)}/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        alarms: state.alarmsList.alarms,
        fetching: state.alarmsList.fetching,
        error: state.alarmsList.error,
        selectedSystem: state.systemSelect.selectedSystem,
    };
};


const mapDispatchedToProps = dispatch => {
    return {onFetchAlarms: (getTokenSilently, getIdTokenClaims, systemId) => dispatch(action.fetchAlarms(getTokenSilently, getIdTokenClaims, systemId))};
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(AlarmList));