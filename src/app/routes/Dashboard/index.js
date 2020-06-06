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
import Widget from "app/components/Widget";
import ChooseTagsForm from "./ChooseTagsForm";
import * as Yup from "yup";
import {
    getFormTitle,
    getFormValidationSchemaObject,
    getHandleFormSubmit,
    getInitialValue,
    getLabels,
    getVerifyValuesFunction,
} from './addDashboardWidgetUtils';
import IconButton from "@material-ui/core/IconButton";


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addWidgetFormOpen: false,
            chosenWidgetToAddFormOpen: false,
            chosenWidgetToAdd: ''
        };
    }

    handleOpenChooseAddWidgetForm = (event) => {
        event.preventDefault();
        this.setState({addWidgetFormOpen: true});
    };

    handleCloseChooseAddWidgetForm = () => {
        this.setState({addWidgetFormOpen: false});
    };

    handleCloseChosenWidgetToAddForm = () => {
        this.setState({chosenWidgetToAddFormOpen: false, chosenWidgetToAdd: ''});
    };

    getAddWidgetFormValidationSchemaObject = () => {
        const validationSchema = {
            widget: Yup.string().required('required'),
        };
        return validationSchema;
    };

    handleAddWidgetFormSubmit = (values) => {
        const {widget} = values;
        this.setState({chosenWidgetToAddFormOpen: true, chosenWidgetToAdd: widget});
    };

    verifyAddWidgetFormValues = (values) => {
        const availableWidgets = ['Tag', 'Trigger', 'Time Series', 'Middle Gauge', 'Right Gauge',
            'Left Gauge', 'Seeq'];
        const {widget} = values;

        if (!availableWidgets.some(availableWidget => availableWidget === widget)) {
            return {global: "Make sure to choose a valid widget type"};
        }
        return null;
    };

    componentDidMount() {
        this.props.onFetchDashboard();
        this.props.onFetchBackgroundTags();
    }

    render() {
        const {
            match, triggers, tags, timeSeries, middleGauges, rightGauges, leftGauges, fetching, error, seeqs, tagList
        } = this.props;
        const renderedArray = [];

        middleGauges.forEach((middleGauge) => {
            const {placement} = middleGauge;
            renderedArray[placement] = <div className="dashboard animated slideInUpTiny animation-duration-3">
                <Gauge gaugeType={'MIDDLE'} gaugeData={middleGauge}/>
            </div>;
        });


        leftGauges.forEach((leftGauge) => {
            const {placement} = leftGauge;
            renderedArray[placement] = <div className="dashboard animated slideInUpTiny animation-duration-3">
                <Gauge gaugeType={'LEFT'} gaugeData={leftGauge}/>
            </div>;
        });

        rightGauges.forEach((rightGauge) => {
            const {placement} = rightGauge;
            renderedArray[placement] = <div className="dashboard animated slideInUpTiny animation-duration-3">
                <Gauge gaugeType={'RIGHT'} gaugeData={rightGauge}/>
            </div>;
        });

        tags.forEach((tag) => {
            const {tagId, tagName, tagValue, tagUnits, placement} = tag;
            renderedArray[placement] = <div className="dashboard animated slideInUpTiny animation-duration-3">
                <Tag tagId={tagId} tagName={tagName} tagValue={tagValue} tagUnit={tagUnits} placement={placement}/>
            </div>;
        });

        triggers.forEach((trigger) => {
            const {controllerTag, tag, placement} = trigger;
            renderedArray[placement] = <div className="dashboard animated slideInUpTiny animation-duration-3">
                <Trigger controllerTag={controllerTag} tag={tag} placement={placement}/>
            </div>;
        });

        seeqs.forEach((seeq) => {
            const {url, placement} = seeq;
            renderedArray[placement] = <div className="dashboard animated slideInUpTiny animation-duration-3">
                <Seeq url={url} placement={placement}/>
            </div>;
        });

        timeSeries.forEach((timeSeries) => {
            const {startDate, endDate, times, tags, placement} = timeSeries;
            renderedArray[placement] =
                <div className="dashboard animated slideInUpTiny animation-duration-3">
                    <div className="pr-xl-5 pt-xl-2" style={{marginBottom: '10px'}}>
                        <TimeSeries
                            startDate={startDate}
                            endDate={endDate}
                            tags={tags}
                            times={times}
                            placement={placement}
                            key={placement}/>
                    </div>
                </div>;
        });
        const {addWidgetFormOpen, chosenWidgetToAddFormOpen, chosenWidgetToAdd} = this.state;
        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.dashboardPage"/>}/>
                <div className="add-widget-option">
                    <IconButton onClick={this.handleOpenChooseAddWidgetForm}>
                        <i className="zmdi zmdi-plus-circle-o text-white"/>
                    </IconButton>
                </div>
                <Widget onClick={this.handleOpenChooseAddWidgetForm}>
                    <>
                        {chosenWidgetToAddFormOpen && !addWidgetFormOpen ?
                            <ChooseTagsForm
                            labels={getLabels(chosenWidgetToAdd)}
                            verifyValues={getVerifyValuesFunction(chosenWidgetToAdd, tagList)}
                            validationSchemaObject={getFormValidationSchemaObject(chosenWidgetToAdd)}
                            formTitle={getFormTitle(chosenWidgetToAdd)}
                            initialValues={getInitialValue(chosenWidgetToAdd)}
                            handleClose={this.handleCloseChosenWidgetToAddForm}
                            handleSubmit={getHandleFormSubmit(chosenWidgetToAdd)}
                            open={chosenWidgetToAddFormOpen}/> :
                            <ChooseTagsForm
                            labels={['Widget Type']}
                            verifyValues={this.verifyAddWidgetFormValues}
                            validationSchemaObject={this.getAddWidgetFormValidationSchemaObject()}
                            formTitle={'Choose a Widget to Add'}
                            initialValues={{widget: ''}}
                            handleClose={this.handleCloseChooseAddWidgetForm}
                            handleSubmit={this.handleAddWidgetFormSubmit}
                            open={addWidgetFormOpen}
                            addWidgetFlag={'addWidgetFlag'}
                            asyncFlag={false}/>}
                    </>
                </Widget>
                {fetching ?
                    error ? <p>{"Coudn't fetch dashboard"}</p> : <CircularIndeterminate/>
                    : renderedArray}
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
        tagList: tags.tags,
    };
};


const mapDispatchedToProps = dispatch => {
    return {
        onFetchDashboard: () => dispatch(fetchDashboard()),
        onFetchBackgroundTags: () => dispatch(fetchBackgroundTags())
    };
};

export default connect(mapStateToProps, mapDispatchedToProps)(Dashboard);