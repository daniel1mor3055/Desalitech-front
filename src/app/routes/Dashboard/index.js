import React, {Component} from 'react';
import {connect} from "react-redux";

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';

import {fetchBackgroundTags, fetchDashboard, timeSeriesChange} from "store/thunk/dashboard";
import CircularIndeterminate from "app/components/Progress/CircularIndeterminate";
import Gauge from "./Gauge";
import TimeSeries from './TimeSeries';
import Tag from './Tag';
import Trigger from "./Trigger";
import Seeq from './Seeq';
import './index.scss';

class Dashboard extends Component {

    componentDidMount() {
        this.props.onFetchDashboard();
        this.props.onFetchBackgroundTags();
    }

    render() {
        const {
            triggers, tags, timeSeries, middleGauges, rightGauges, leftGauges, fetching, error, seeqs
        } = this.props;


        return (
            <div className="Dashboard app-wrapper">

                {fetching ?
                    error ? <p>{"Coudn't fetch dashboard"}</p> : <CircularIndeterminate/>
                    :
                    <>
                        <div className="dashboard animated slideInUpTiny animation-duration-3">
                            {timeSeries.map((timeSeries) => {
                                const {startDate, endDate, times, tags, placement} = timeSeries;
                                return (
                                    <TimeSeries
                                        onTimeSeriesChange={this.props.onTimeSeriesChange}
                                        startDate={startDate}
                                        endDate={endDate}
                                        tags={tags}
                                        times={times}
                                        placement={placement}
                                        key={placement}/>);
                            })}
                            <div className="Dashboard-spaceAround d-flex">
                                {middleGauges.map((middleGauge) => (
                                    <Gauge gaugeType={'MIDDLE'} gaugeData={middleGauge}/>
                                ))}
                                {leftGauges.map((leftGauge) => (
                                    <Gauge gaugeType={'LEFT'} gaugeData={leftGauge}/>
                                ))}
                                {rightGauges.map((rightGauge) => (
                                    <Gauge gaugeType={'RIGHT'} gaugeData={rightGauge}/>
                                ))}
                            </div>
                            <div className="Dashboard-spaceBetween d-flex">
                                {tags.map((tag) => {
                                    const {tagId, tagName, tagValue, tagUnits, placement} = tag;
                                    return <Tag tagId={tagId} tagName={tagName} tagValue={tagValue} tagUnit={tagUnits}
                                                placement={placement}/>;
                                })}
                                {triggers.map((trigger) => {
                                    const {controllerTag, tag, placement} = trigger;
                                    return <Trigger controllerTag={controllerTag} tag={tag} placement={placement}/>;
                                })}
                            </div>
                            {seeqs.map((seeq) => {
                                    const {url, placement} = seeq;
                                    return <Seeq url={url} placement={placement}/>;
                                }
                            )}
                        </div>
                    </>}
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
        onFetchBackgroundTags: () => dispatch(fetchBackgroundTags()),
        onTimeSeriesChange: (timeSeries) => dispatch(timeSeriesChange(timeSeries))
    };
};


export default connect(mapStateToProps, mapDispatchedToProps)(Dashboard);