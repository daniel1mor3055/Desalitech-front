import React, {Component} from 'react';
import {connect} from "react-redux";

import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import TitleCard from 'app/components/TitleCard';
import CardHeader from "app/components/CardHeader";
import {fetchDashboard} from "store/thunk/dashboard";
import MultiYChart from "./MultiYChart";
import TimePickers from "app/components/Pickers/TimePickers";
import CircularIndeterminate from "../../components/Progress/CircularIndeterminate";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateAndTimePickers from "../../components/Pickers/DateAndTimePickers";
import Gauge from "app/components/Gauges";
import SolidCard from "../../components/SolidCards/SolidCards";

class Dashboard extends Component {


    componentDidMount() {
        const {location} = this.props;
        const queryParams = new URLSearchParams(location.search);
        const sysId = decodeURIComponent(queryParams.get('sysId'));
        this.props.onFetchDashboard(sysId);
    }

    componentWillUnmount() {
        clearInterval(this.dataPolling);
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
                                <FormControlLabel
                                    control={
                                        <DateAndTimePickers/>
                                    }
                                    label="Start Time"
                                    labelPlacement='start'
                                />
                                <FormControlLabel
                                    control={
                                        <DateAndTimePickers/>
                                    }
                                    label="End Time"
                                    labelPlacement='start'
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
        const middleGaugesToRender = middleGauges.map((middleGauge) => (
                <Gauge gaugeType={'MIDDLE'} gaugeData={middleGauge}/>
            )
        );
        const leftGaugesToRender = leftGauges.map((leftGauge) => (
                <Gauge gaugeType={'LEFT'} gaugeData={leftGauge}/>
            )
        );
        const rightGaugesToRender = rightGauges.map((rightGauge) => (
                <Gauge gaugeType={'RIGHT'} gaugeData={rightGauge}/>
            )
        );
        const tagsToRender = tags.map((tag) => {
            const {tagId, tagName, tagValue, tagUnits} = tag;
            return <div className="col-lg-3 col-sm-6 col-12">
                <TitleCard
                    tagName={(tagName !== '' && tagName != null) ? tagName : tagId}
                    tagValue={tagValue}
                    tagUnits={tagUnits}
                />
            </div>;
        });
        const triggersToRender = triggers.map((trigger) => {
            const {controllerTag, tag} = trigger;
            return <div className="col-lg-3 col-sm-6 col-12">
                <SolidCard
                    tagName={(controllerTag.tagName !== '' && controllerTag.tagName != null) ?
                        controllerTag.tagName : controllerTag.tagId}
                    tagValue={controllerTag.tagValue}
                    tagUnits={controllerTag.tagUnits}
                    colorIndicator={tag.tagValue}
                />
            </div>;
        });
        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.dashboardPage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.dashboardPage.description"/></h1>
                </div>
                {fetching ?
                    error ? <p>{"Coudn't fetch chart"}</p> : <CircularIndeterminate/>
                    : [chart,
                        middleGaugesToRender,
                        leftGaugesToRender,
                        rightGaugesToRender,
                        tagsToRender,
                        triggersToRender]}
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