import React, { Component } from 'react';
import { connect } from "react-redux";

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';

import {
    fetchBackgroundTags,
    fetchDashboard,
    gaugeAdd,
    seeqAdd,
    tagAdd,
    timeSeriesAdd,
    timeSeriesChange,
    timeSeriesDelete,
    triggerAdd,
} from "store/thunk/dashboard";
import CircularIndeterminate from "app/components/Progress/CircularIndeterminate";
import Gauge from "./Gauge";
import TimeSeries from './TimeSeries';
import Tag from './Tag';
import Trigger from "./Trigger";
import Seeq from './Seeq';
import IconButton from "@material-ui/core/IconButton";
import WidgetTypesSelector from "./WidgetTypesSelector";
import FormGauge from "./FormGauge";
import FormTag from "./FormTag";
import FormTrigger from "./FormTrigger";
import FormSeeq from "./FormSeeq";
import FormTimeSeries from "./FormTimeSeries";
import moment from "moment";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newGaugetype: null,
            widgetTypesSelectorOpen: false,
            selectedWidgetType: null,
            timeSeriesFormOpen: false,
            gaugeFormOpen: false,
            tagFormOpen: false,
            triggerFormOpen: false,
            seeqFormOpen: false,
        };
    }

    componentDidMount() {
        this.props.onFetchDashboard();
        this.props.onFetchBackgroundTags();
    }

    handleOpenSelectorWidgetType = (event) => {
        event.preventDefault();
        this.setState({ widgetTypesSelectorOpen: true });
    };

    handleCloseSelectorWidgetType = () => {
        this.setState({ widgetTypesSelectorOpen: false });
    };

    handleCloseWidgetForm = () => {
        this.setState({
            widgetTypesSelectorOpen: false,
            gaugeFormOpen: false,
            tagFormOpen: false,
            triggerFormOpen: false,
            seeqFormOpen: false,
            timeSeriesFormOpen: false,
        });
    };

    handleChooseSelectorWidgetType = (event, widgetType) => {
        event.preventDefault();
        const newState = { ...this.state };
        switch (widgetType) {
            case('timeSeries'):
                newState.timeSeriesFormOpen = true;
                break;
            case('tag'):
                newState.tagFormOpen = true;
                break;
            case('trigger'):
                newState.triggerFormOpen = true;
                break;
            case('seeq'):
                newState.seeqFormOpen = true;
                break;
            case('middleGauge'):
                newState.newGaugetype = 'MIDDLE';
                newState.gaugeFormOpen = true;
                break;
            case('leftGauge'):
                newState.newGaugetype = 'LEFT';
                newState.gaugeFormOpen = true;
                break;
            case('rightGauge'):
                newState.newGaugetype = 'RIGHT';
                newState.gaugeFormOpen = true;
                break;
            default:
                break;
        }
        this.setState(newState);
        this.handleCloseSelectorWidgetType(event);
    };

    handleTimeSeriesSubmit = (values) => {
        const { currentPlacement, tagsList } = this.props;
        const tags = Object.keys(values).map((key) => {
            const newTag = tagsList.find(o => o.tagName === values[key]);
            return {
                tagId: newTag == null ? '' : newTag.tagId,
            };
        });

        const timeSeries = {
            startDate: moment().subtract(1, 'days'),
            endDate: moment(),
            placement: currentPlacement,
            tags,
            detail1: 'Day',
        };
        this.props.onTimeSeriesAdd(timeSeries);
    };

    handleGaugesSubmit = (values) => {
        const { newGaugetype } = this.state;
        const { currentPlacement, tagsList } = this.props;
        const {
            measuredTag, lLFromOptionsCheckBox, lLFromOptions, lL, lFromOptionsCheckBox,
            lFromOptions, l, hFromOptionsCheckBox, hFromOptions, h, hHFromOptionsCheckBox, hHFromOptions, hH
        } = values;

        const newLl = tagsList.find(o => o.tagName === lLFromOptions);
        const newL = tagsList.find(o => o.tagName === lFromOptions);
        const newH = tagsList.find(o => o.tagName === hFromOptions);
        const newHh = tagsList.find(o => o.tagName === hHFromOptions);
        const gauge = {
            measuredTag: tagsList.find(o => o.tagName === measuredTag).tagId,
            placement: currentPlacement,
            lL: !lLFromOptionsCheckBox ? lL : newLl.tagId,
            l: !lFromOptionsCheckBox ? l : newL.tagId,
            h: !hFromOptionsCheckBox ? h : newH.tagId,
            hH: !hHFromOptionsCheckBox ? hH : newHh.tagId,
        };

        this.props.onGaugeAdd(newGaugetype, gauge);
    };

    handleTagsSubmit = (values) => {
        const { tagName } = values;
        const { currentPlacement, tagsList } = this.props;

        const tag = {
            tagId: tagsList.find(o => o.tagName === tagName).tagId,
            placement: currentPlacement,
        };
        this.props.onTagAdd(tag);
    };

    handleTriggersSubmit = (values) => {
        const { tagName, controllerTagName } = values;
        const { currentPlacement, tagsList } = this.props;

        const trigger = {
            tagId: tagsList.find(o => o.tagName === tagName).tagId,
            controllerTagId: tagsList.find(o => o.tagName === controllerTagName).tagId,
            placement: currentPlacement,
        };
        this.props.onTriggerAdd(trigger);
    };

    handleSeeqsSubmit = (values) => {
        const { url } = values;
        const { currentPlacement } = this.props;

        const seeq = {
            url,
            placement: currentPlacement,
        };
        this.props.onSeeqAdd(seeq);
    };

    render() {
        const { widgetTypesSelectorOpen, gaugeFormOpen, tagFormOpen, triggerFormOpen, seeqFormOpen, timeSeriesFormOpen } = this.state;
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
                            <div className="add-dashboard-option">
                                <IconButton onClick={this.handleOpenSelectorWidgetType}>
                                    <i className="zmdi zmdi-plus-circle-o text-white"/>
                                </IconButton>
                            </div>

                            <WidgetTypesSelector
                                open={widgetTypesSelectorOpen}
                                handleClose={this.handleCloseSelectorWidgetType}
                                handleChoose={this.handleChooseSelectorWidgetType}/>


                            <FormGauge handleClose={this.handleCloseWidgetForm}
                                       handleSubmit={this.handleGaugesSubmit}
                                       open={gaugeFormOpen}
                            />

                            <FormTag handleClose={this.handleCloseWidgetForm}
                                     handleSubmit={this.handleTagsSubmit}
                                     open={tagFormOpen}/>

                            <FormTrigger handleClose={this.handleCloseWidgetForm}
                                         handleSubmit={this.handleTriggersSubmit}
                                         open={triggerFormOpen}/>


                            <FormSeeq handleClose={this.handleCloseWidgetForm}
                                      handleSubmit={this.handleSeeqsSubmit}
                                      open={seeqFormOpen}/>

                            <FormTimeSeries handleClose={this.handleCloseWidgetForm}
                                            handleSubmit={this.handleTimeSeriesSubmit}
                                            open={timeSeriesFormOpen}/>

                            {timeSeries.map((timeSeries) => {
                                const { startDate, endDate, times, tags, placement, currentPickedRange } = timeSeries;
                                return (
                                    <TimeSeries
                                        onTimeSeriesChange={this.props.onTimeSeriesChange}
                                        onTimeSeriesDelete={this.props.onTimeSeriesDelete}
                                        startDate={startDate}
                                        endDate={endDate}
                                        tags={tags}
                                        times={times}
                                        placement={placement}
                                        currentPickedRange={currentPickedRange}
                                        key={placement}/>);
                            })}
                            <div className="justify-content-around d-flex flex-wrap">
                                {middleGauges.map((middleGauge) => {
                                    const { placement } = middleGauge;
                                    return <Gauge gaugeType={'MIDDLE'} gaugeData={middleGauge} key={placement}/>;
                                })}
                                {leftGauges.map((leftGauge) => {
                                    const { placement } = leftGauge;
                                    return <Gauge gaugeType={'LEFT'} gaugeData={leftGauge} key={placement}/>;
                                })}
                                {rightGauges.map((rightGauge) => {
                                    const { placement } = rightGauge;
                                    return <Gauge gaugeType={'RIGHT'} gaugeData={rightGauge} key={placement}/>;
                                })}
                            </div>
                            <div className="justify-content-around d-flex flex-wrap">
                                {tags.map((tag) => {
                                    const { tagId, tagName, tagValue, tagUnits, placement } = tag;
                                    return <Tag tagId={tagId} tagName={tagName} tagValue={tagValue} tagUnits={tagUnits}
                                                placement={placement} key={placement}/>;
                                })}
                                {triggers.map((trigger) => {
                                    const { controllerTag, tag, placement } = trigger;
                                    return <Trigger controllerTag={controllerTag} tag={tag} placement={placement}
                                                    key={placement}/>;
                                })}
                            </div>
                            {seeqs.map((seeq) => {
                                    const { url, placement } = seeq;
                                    return <Seeq url={url} placement={placement} key={placement}/>;
                                }
                            )}
                        </div>
                    </>}
            </div>
        );
    }
}


const mapStateToProps = ({ dashboard, tags }) => {
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
        tagsList: tags.tags,
        currentPlacement: dashboard.currentPlacement,
    };
};


const mapDispatchedToProps = dispatch => {
    return {
        onFetchDashboard: () => dispatch(fetchDashboard()),
        onFetchBackgroundTags: () => dispatch(fetchBackgroundTags()),
        onTimeSeriesChange: (timeSeries) => dispatch(timeSeriesChange(timeSeries)),
        onTimeSeriesDelete: (timeSeries) => dispatch(timeSeriesDelete(timeSeries)),
        onTimeSeriesAdd: (timeSeries) => dispatch(timeSeriesAdd(timeSeries)),
        onGaugeAdd: (gaugeType, gauge) => dispatch(gaugeAdd(gaugeType, gauge)),
        onTagAdd: (tag) => dispatch(tagAdd(tag)),
        onTriggerAdd: (trigger) => dispatch(triggerAdd(trigger)),
        onSeeqAdd: (seeq) => dispatch(seeqAdd(seeq)),
    };
};


export default connect(mapStateToProps, mapDispatchedToProps)(Dashboard);