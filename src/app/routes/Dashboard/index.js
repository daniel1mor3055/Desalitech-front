import React, {Component} from 'react';
import {connect} from "react-redux";

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';

import ContainerHeader from 'app/components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import {fetchBackgroundTags, fetchDashboard} from "store/thunk/dashboard";
import CircularIndeterminate from "app/components/Progress/CircularIndeterminate";
import Gauge from "./Gauges";
import TimeSeries from './TimeSeries';
import Tag from './Tag';
import Trigger from "./Trigger";
import Seeq from './Seeq';

class Dashboard extends Component {

    componentDidMount() {
        this.props.onFetchDashboard();
        this.props.onFetchBackgroundTags();
    }

    render() {
        const {
            match, triggers, tags, timeSeries, middleGauges, rightGauges, leftGauges, fetching, error, seeqs
        } = this.props;

        const middleGaugesJSX = middleGauges.map((middleGauge) => (
                <div className="dashboard animated slideInUpTiny animation-duration-3">
                    <Gauge gaugeType={'MIDDLE'} gaugeData={middleGauge}/>
                </div>
            )
        );
        const leftGaugesJSX = leftGauges.map((leftGauge) => (
                <div className="dashboard animated slideInUpTiny animation-duration-3">
                    <Gauge gaugeType={'LEFT'} gaugeData={leftGauge}/>
                </div>
            )
        );
        const rightGaugesJSX = rightGauges.map((rightGauge) => (
                <div className="dashboard animated slideInUpTiny animation-duration-3">
                    <Gauge gaugeType={'RIGHT'} gaugeData={rightGauge}/>
                </div>
            )
        );
        const tagsJSX = tags.map((tag) => {
            const {tagId, tagName, tagValue, tagUnits, placement} = tag;
            return (
                <div className="dashboard animated slideInUpTiny animation-duration-3">
                    <Tag tagId={tagId} tagName={tagName} tagValue={tagValue} tagUnit={tagUnits} placement={placement}/>
                </div>);
        });
        const triggersJSX = triggers.map((trigger) => {
            const {controllerTag, tag, placement} = trigger;
            return (
                <div className="dashboard animated slideInUpTiny animation-duration-3">
                    <Trigger controllerTag={controllerTag} tag={tag} placement={placement}/>
                </div>);
        });

        const seeqJSX = seeqs.map((seeq) => {
                const {url, placement} = seeq;
                return (
                    <div className="dashboard animated slideInUpTiny animation-duration-3">
                        <Seeq url={url} placement={placement}/>
                    </div>);
            }
        );

        const timeSeriesJSX =
            <div className="dashboard animated slideInUpTiny animation-duration-10">
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
                </div>
            </div>;

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.dashboardPage"/>}/>

                {fetching ?
                    error ? <p>{"Coudn't fetch dashboard"}</p> : <CircularIndeterminate/>
                    : [timeSeriesJSX,
                        middleGaugesJSX,
                        leftGaugesJSX,
                        rightGaugesJSX,
                        tagsJSX,
                        triggersJSX,
                        seeqJSX]}
            </div>
        );
    }
}


const mapStateToProps = ({dashboard}) => {
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
    };
};


const mapDispatchedToProps = dispatch => {
    return {
        onFetchDashboard: () => dispatch(fetchDashboard()),
        onFetchBackgroundTags: () => dispatch(fetchBackgroundTags())
    };
};

export default connect(mapStateToProps, mapDispatchedToProps)(Dashboard);