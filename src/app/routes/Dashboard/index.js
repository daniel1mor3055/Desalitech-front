import React, {Component} from 'react';
import {connect} from "react-redux";

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';

import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import {fetchDashboard, fetchBackgroundTags} from "store/thunk/dashboard";
import CircularIndeterminate from "app/components/Progress/CircularIndeterminate";
import TimeSeries from './TimeSeries';

class Dashboard extends Component {

    componentDidMount() {
        const {backgroundTagsFetching} = this.props;
        this.props.onFetchDashboard();
        if (!backgroundTagsFetching) {
            this.props.onFetchBackgroundTags();
        }
    }

    render() {
        const {match, timeSeries, fetching, error, backgroundTags} = this.props;

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
                            key={placement}
                            backgroundTags={backgroundTags}/>);
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


const mapStateToProps = ({dashboard, tags}) => {
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
        backgroundTags: tags.tags,
        backgroundTagsFetching: tags.fetching,
    };
};


const mapDispatchedToProps = dispatch => {
    return {
        onFetchDashboard: () => dispatch(fetchDashboard()),
        onFetchBackgroundTags: () => dispatch(fetchBackgroundTags())
    };
};

export default connect(mapStateToProps, mapDispatchedToProps)(Dashboard);