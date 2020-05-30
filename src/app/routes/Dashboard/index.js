import React, {Component} from 'react';
import {connect} from "react-redux";

import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import TitleCard from 'app/components/TitleCard';
import Speedometer from './Speedometer';
import CardHeader from "app/components/CardHeader";
import {fetchDashboard} from "store/thunk/dashboard";
import MultiYChart from "./MultiYChart";
import TimePickers from "app/components/Pickers/TimePickers";
import CircularIndeterminate from "../../components/Progress/CircularIndeterminate";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateAndTimePickers from "../../components/Pickers/DateAndTimePickers";
import Button from "@material-ui/core/Button";

class Dashboard extends Component {
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

        const chart =
            <div className="pr-xl-5 pt-xl-2" style={{marginBottom: '10px'}}>
                <div className="jr-card">
                    {timeSeries.map((timeSeries) => {
                        const {placement, startDate, endDate, times} = timeSeries;
                        return (
                            <>
                                <Button className="jr-btn" color="primary">1 Year</Button>
                                <Button className="jr-btn" color="primary">6 Months</Button>
                                <Button className="jr-btn" color="primary">1 Month</Button>
                                <Button className="jr-btn" color="primary">1 Week</Button>
                                <Button className="jr-btn" color="primary">1 Day</Button>
                                <FormControlLabel
                                    control={
                                        <DateAndTimePickers/>
                                    }
                                    label="Start Time"
                                    labelPlacement = 'start'
                                />
                                <FormControlLabel
                                    control={
                                        <DateAndTimePickers/>
                                    }
                                    label="End Time"
                                    labelPlacement = 'start'
                                />
                                <MultiYChart data={timeSeries.tags.map(tag => tag.tagTimeValues)}
                                             xData={times}
                                             showYLabels={true}
                                             title={'Custom Title'}
                                             yLabels={timeSeries.tags.map(tag => tag.tagId)}
                                             colors={['#2196f3', '#ff6e40', '#ff6e40']}
                                             key={placement}/>
                            </>);
                    })
                    }
                </div>
            </div>;

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.dashboardPage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.dashboardPage.description"/></h1>
                </div>

                {fetching ?
                    error ? <p>{"Coudn't fetch chart"}</p> : <CircularIndeterminate/>
                    : chart}

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