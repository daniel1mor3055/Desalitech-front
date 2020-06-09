import React, {Component} from 'react';
import {connect} from "react-redux";
import moment from 'moment';

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import {fetchBackgroundTags, timeSeriesChange, timeSeriesAdd} from 'store/thunk/charts';
import TimeSeries from '../Dashboard/TimeSeries';
import IconButton from "@material-ui/core/IconButton";
import * as Yup from "yup";
import ChooseTagsForm from "../Dashboard/ChooseTagsForm";

class Charts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addTimeSeriesFormOpen: false,
        };
    }

    componentDidMount() {
        this.props.onFetchBackgroundTags();
    }


    handleOpenAddTimeSeriesForm = (event) => {
        event.preventDefault();
        this.setState({addTimeSeriesFormOpen: true});
    };

    handleCloseAddTimeSeriesForm = () => {
        this.setState({addTimeSeriesFormOpen: false});
    };

    handleAddTimeSeriesFormSubmit = (values) => {
        const {currentPlacement} = this.props;
        const tags = Object.keys(values).map((key) => ({
            tagId: values[key],
        }));

        const timeSeries = {
            startDate: moment().subtract(1, 'days'),
            endDate: moment(),
            placement: currentPlacement,
            tags,
        };
        this.props.onTimeSeriesAdd(timeSeries);
    };

    getAddTimeSeriesFormInitialValues = () => {
        return {
            tag1Id: '',
            tag2Id: '',
            tag3Id: '',
        };
    };

    getFormValidationSchemaObject = () => {
        return {
            tag1Id: Yup.string().nullable(),
            tag2Id: Yup.string().nullable(),
            tag3Id: Yup.string().nullable(),
        };
    };

    verifyFormValues = (values) => {
        const {tagList} = this.props;
        let invalidTagsFlag = false;
        let notEmptyValues = [];
        for (let property in values) {
            if (values.hasOwnProperty(property)) {
                if (values[property] === null || values[property] === '') {
                    values[property] = '';
                } else {
                    notEmptyValues.push(values[property]);
                }
            }
        }
        notEmptyValues.forEach((notEmptyValue) => {
            if (!tagList.some(tag => tag.tagId.toLowerCase() === notEmptyValue.toLowerCase())) {
                invalidTagsFlag = true;
            }
        });
        if (invalidTagsFlag) {
            return {global: "Make sure you provide valid tags"};
        }
        if ((new Set(notEmptyValues)).size !== notEmptyValues.length) {
            return {global: 'Tags should be different'};
        }
        if (notEmptyValues.length === 0) {
            return {global: 'Choose at least one tag'};
        }
        return null;
    };

    render() {
        const {addTimeSeriesFormOpen} = this.state;
        const {timeSeries, error, tagList} = this.props;


        return (
            <div className="Charts app-wrapper">
                <div className="add-charts-option">
                    <IconButton onClick={this.handleOpenAddTimeSeriesForm}>
                        <i className="zmdi zmdi-plus-circle-o text-white"/>
                    </IconButton>
                </div>
                <ChooseTagsForm
                    labels={['Tag1 ID', 'Tag2 ID', 'Tag3 ID']}
                    verifyValues={this.verifyFormValues}
                    validationSchemaObject={this.getFormValidationSchemaObject()}
                    formTitle={'Choose tags to display'}
                    initialValues={this.getAddTimeSeriesFormInitialValues()}
                    handleClose={this.handleCloseAddTimeSeriesForm}
                    handleSubmit={this.handleAddTimeSeriesFormSubmit}
                    open={addTimeSeriesFormOpen}/>

                {error ?
                    <p>{"Error in charts"}</p> :
                    <>
                        <div className="animated slideInUpTiny animation-duration-3">
                            {timeSeries.map((timeSeries) => {
                                const {startDate, endDate, times, tags, placement} = timeSeries;
                                const tagsToDisplay = tags.map((tag) => ({
                                    ...tag,
                                    tagUnits: tagList.find(o => o.tagId === tag.tagId).units,
                                }));

                                return (
                                    <TimeSeries
                                        onTimeSeriesChange={this.props.onTimeSeriesChange}
                                        startDate={startDate}
                                        endDate={endDate}
                                        tags={tagsToDisplay}
                                        times={times}
                                        placement={placement}
                                        key={placement}/>);
                            })}
                        </div>
                    </>}
            </div>
        );
    }
}


const mapStateToProps = ({charts, tags}) => {
    return {
        tagList: tags.tags,
        timeSeries: charts.timeSeries,
        error: charts.error,
        currentPlacement: charts.currentPlacement,
    };
};


const mapDispatchedToProps = dispatch => {
    return {
        onFetchBackgroundTags: () => dispatch(fetchBackgroundTags()),
        onTimeSeriesChange: (timeSeries) => dispatch(timeSeriesChange(timeSeries)),
        onTimeSeriesAdd: (timeSeries) => dispatch(timeSeriesAdd(timeSeries)),
    };
};


export default connect(mapStateToProps, mapDispatchedToProps)(Charts);