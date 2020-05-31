import React, {Component} from 'react';
import {connect} from "react-redux";

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';

import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import TitleCard from 'app/components/TitleCard';
import Speedometer from './Speedometer';
import CardHeader from "app/components/CardHeader";
import {fetchDashboard} from "store/thunk/dashboard";
import MultiYChart from "./TimeSeries/MultiYChart";
import CircularIndeterminate from "../../components/Progress/CircularIndeterminate";
import Button from "@material-ui/core/Button";
import TimeSeries from './TimeSeries';

class Dashboard extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         startDate: null,
    //         endDate: null,
    //     };
    // }

    componentDidMount() {
        const {location} = this.props;
        const queryParams = new URLSearchParams(location.search);
        const sysId = decodeURIComponent(queryParams.get('sysId'));
        this.props.onFetchDashboard(sysId);
    }

    render() {
        const {
            match, triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs, fetching,
            error, selectedSystem
        } = this.props;


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
                    error ? <p>{"Coudn't fetch chart"}</p> : <CircularIndeterminate/>
                    : timeSeriesJSX}

                {/*<div className="row mb-md-3">*/}
                {/*    <div className="col-lg-3 col-sm-6 col-12">*/}
                {/*        <TitleCard*/}
                {/*            tagName={"Tag Name"}*/}
                {/*            tagValue={"Tag Value"}*/}
                {/*            tagDescription={"Tag Description"}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="col-lg-3 col-sm-6 col-12">*/}
                {/*        <TitleCard*/}
                {/*            tagName={"Tag Name"}*/}
                {/*            tagValue={"Tag Value"}*/}
                {/*            tagDescription={"Tag Description"}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="col-lg-3 col-sm-6 col-12">*/}
                {/*        <TitleCard*/}
                {/*            tagName={"Tag Name"}*/}
                {/*            tagValue={"Tag Value"}*/}
                {/*            tagDescription={"Tag Description"}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="col-lg-3 col-sm-6 col-12">*/}
                {/*        <TitleCard*/}
                {/*            tagName={"Tag Name"}*/}
                {/*            tagValue={"Tag Value"}*/}
                {/*            tagDescription={"Tag Description"}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="col-xl-3 col-md-4 col-sm-6 col-12 order-xl-4">*/}
                {/*    <div className="jr-card">*/}
                {/*        <div className="jr-card-header">*/}
                {/*            <h3 className="card-heading"><IntlMessages id="dashboard.systemStatus"/></h3>*/}
                {/*        </div>*/}
                {/*        <Speedometer value={90}/>*/}
                {/*        <div className="text-center mt-4">*/}
                {/*            <h4 className="mb-1">Can be defined</h4>*/}
                {/*            <p className="card-text">Can be defined</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
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
    return {onFetchDashboard: (systemId) => dispatch(fetchDashboard(systemId))};
};

export default connect(mapStateToProps, mapDispatchedToProps)(Dashboard);