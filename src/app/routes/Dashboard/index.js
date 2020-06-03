import React, {Component} from 'react';
import {connect} from "react-redux";

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';


import ContainerHeader from 'app/components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import TitleCard from 'app/components/TitleCard';
import {fetchBackgroundTags, fetchDashboard} from "store/thunk/dashboard";
import Gauge from "app/components/Gauges";
import SolidCard from "app/components/SolidCards/SolidCards";
import CircularIndeterminate from "app/components/Progress/CircularIndeterminate";
import TimeSeries from './TimeSeries';
import {CardMedia} from '@material-ui/core';

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
                <Gauge gaugeType={'MIDDLE'} gaugeData={middleGauge}/>
            )
        );
        const leftGaugesJSX = leftGauges.map((leftGauge) => (
                <Gauge gaugeType={'LEFT'} gaugeData={leftGauge}/>
            )
        );
        const rightGaugesJSX = rightGauges.map((rightGauge) => (
                <Gauge gaugeType={'RIGHT'} gaugeData={rightGauge}/>
            )
        );
        const tagsJSX = tags.map((tag) => {
            const {tagId, tagName, tagValue, tagUnits} = tag;
            return <div className="col-lg-3 col-sm-6 col-12">
                <TitleCard
                    tagName={(tagName !== '' && tagName != null) ? tagName : tagId}
                    tagValue={tagValue}
                    tagUnits={tagUnits}
                />
            </div>;
        });
        const triggersJSX = triggers.map((trigger) => {
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

        const seeqJSX = seeqs.map((seeq) => {
                const {url} = seeq;
                return (
                    <iframe
                        src={url}
                        title="SEEQ data">
                    </iframe>
                );
            }
        );

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