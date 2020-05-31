import React, {Component} from 'react';
import {connect} from "react-redux";

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';

import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import {fetchDashboard} from "store/thunk/dashboard";
import CircularIndeterminate from "../../components/Progress/CircularIndeterminate";
import TimeSeries from './TimeSeries';

class Dashboard extends Component {

    componentDidMount() {
        this.props.onFetchDashboard();
    }

    render() {
        const {match, timeSeries, fetching, error} = this.props;

        const timeSeriesJSX =
            <div className="pr-xl-5 pt-xl-2" style={{marginBottom: '10px'}}>
                {timeSeries.map((timeSeries) => {
                    const {startDate, endDate, times, tags, placement} = timeSeries;
                    return (
                        <TimeSeries
                            startDate={startDate}
                            endDate={endDate}
                            tags={tags}
                            times={times}
                            placement={placement}
                            key={placement}/>);
                })}
            </div>;

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.dashboardPage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.dashboardPage.description"/></h1>
                </div>

                {fetching ?
                    error ? <p>{"Coudn't fetch dashboard"}</p> : <CircularIndeterminate/>
                    : timeSeriesJSX}
            </div>
        );
    }
}


const mapStateToProps = ({dashboard, systems}) => {
    return {
        triggers: dashboard.triggers,
        tags: dashboard.tags,
        gauges: dashboard.gauges,
        timeSeries: dashboard.timeSeries,
        middleGauges: dashboard.middleGauges,
        rightGauges: dashboard.rightGauges,
        leftGauges: dashboard.leftGauges,
        seeqs: dashboard.seeqs,
        fetching: dashboard.fetching,
        error: dashboard.error,
        selectedSystem: systems.selectedSystem,
    };
};


const mapDispatchedToProps = dispatch => {
    return {onFetchDashboard: () => dispatch(fetchDashboard())};
};

export default connect(mapStateToProps, mapDispatchedToProps)(Dashboard);