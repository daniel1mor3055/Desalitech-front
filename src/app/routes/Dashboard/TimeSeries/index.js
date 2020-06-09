import React, {Component} from 'react';
import moment from "moment";
import {connect} from 'react-redux';
import momentPropTypes from 'react-moment-proptypes';
import * as Yup from 'yup';

import MultiYChart from "./MultiYChart";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import ChooseTagsForm from '../ChooseTagsForm';
import Widget from "app/components/Widget";
import DesDateRangePicker from "./DesDateRangePicker";

class TimeSeries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            chooseTagsFormOpen: false,
            buttonsColor: {
                yearColor: 'default',
                halfYearColor: 'default',
                monthColor: 'default',
                weekColor: 'default',
                dayColor: 'primary',
            }
        };
    }

    componentDidMount = () => {
        const {startDate, endDate} = this.props;
        this.setState({
            startDate,
            endDate,
        });
    };

    handleRangePick = ({startDate, endDate}) => {
        if (endDate === this.state.endDate) {
            this.setState({startDate});
            return null;
        } else {
            this.setState({startDate, endDate});
            this.dateTimeSeriesChange(startDate, endDate);
        }
    };

    handlePushedButtonColor = (propertyToColor) => {
        const buttonsColor = {
            yearColor: 'default',
            halfYearColor: 'default',
            monthColor: 'default',
            weekColor: 'default',
            dayColor: 'default',
        };
        buttonsColor[propertyToColor] = 'primary';
        this.setState({buttonsColor: buttonsColor});
    };

    handleFromTodayPick = (delta, scale) => {
        const endDate = moment();
        const startDate = moment().subtract(delta, scale);
        this.setState({
            startDate,
            endDate
        });

        this.dateTimeSeriesChange(startDate, endDate);
    };


    dateTimeSeriesChange = (startDate, endDate) => {
        const {tags, placement} = this.props;
        const timeSeries = {
            startDate,
            endDate,
            tags,
            placement
        };
        this.props.onTimeSeriesChange(timeSeries);
    };

    handleOpenChooseTagsForm = (event) => {
        event.preventDefault();
        this.setState({chooseTagsFormOpen: true});
    };

    handleCloseChooseTagsForm = () => {
        this.setState({chooseTagsFormOpen: false});
    };

    handleFormSubmit = (values) => {
        const {startDate, endDate, placement} = this.props;
        const tags = Object.keys(values).map((key) => ({
            tagId: values[key],
        }));
        const timeSeries = {
            startDate,
            endDate,
            placement,
            tags,
        };
        this.props.onTimeSeriesChange(timeSeries);
    };

    getFormInitialValues = (tags) => {
        let initialValues = {};
        for (let i = 0; i < 3; i++) {
            if (i < tags.length) {
                initialValues[`tag${i + 1}Id`] = tags[i].tagId;
            } else {
                initialValues[`tag${i + 1}Id`] = '';
            }
        }
        return initialValues;
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
        const {chooseTagsFormOpen, buttonsColor: {yearColor, halfYearColor, monthColor, weekColor, dayColor}} = this.state;
        const {tags, times, placement} = this.props;
        const initialFormValues = this.getFormInitialValues(tags);

        return (
            <Widget childrenStyle={'col-12'} onClick={this.handleOpenChooseTagsForm}>
                <>
                    <Button className="jr-btn" color={`${yearColor}`}
                            onClick={() => {
                                this.handlePushedButtonColor('yearColor');
                                this.handleFromTodayPick(1, 'years');
                            }}>1 Year</Button>
                    <Button className="jr-btn" color={`${halfYearColor}`}
                            onClick={() => {
                                this.handlePushedButtonColor('halfYearColor');
                                this.handleFromTodayPick(6, 'months');
                            }}>6 Months</Button>
                    <Button className="jr-btn" color={`${monthColor}`}
                            onClick={() => {
                                this.handlePushedButtonColor('monthColor');
                                this.handleFromTodayPick(1, 'months');
                            }}>1 Month</Button>
                    <Button className="jr-btn" color={`${weekColor}`}
                            onClick={() => {
                                this.handlePushedButtonColor('weekColor');
                                this.handleFromTodayPick(1, 'weeks');
                            }}>1 Week</Button>
                    <Button className="jr-btn" color={`${dayColor}`}
                            onClick={() => {
                                this.handlePushedButtonColor('dayColor');
                                this.handleFromTodayPick(1, 'day');
                            }}>1 Day</Button>
                    <DesDateRangePicker startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                        startDateId={'startDate' + placement.toString()} // PropTypes.string.isRequired,
                                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                        endDateId={'endDate' + placement.toString()} // PropTypes.string.isRequired,
                                        onDatesChange={this.handleRangePick} // PropTypes.func.isRequired,
                                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                        onFocusChange={(focusedInput) => this.setState({focusedInput})} // PropTypes.func.isRequired,
                                        numberOfMonths={1}
                                        isOutsideRange={() => false}/>
                </>
                <>
                    <ChooseTagsForm
                        labels={['Tag1 ID', 'Tag2 ID', 'Tag3 ID']}
                        verifyValues={this.verifyFormValues}
                        validationSchemaObject={this.getFormValidationSchemaObject()}
                        formTitle={'Choose tags to display'}
                        initialValues={initialFormValues}
                        handleClose={this.handleCloseChooseTagsForm}
                        handleSubmit={this.handleFormSubmit}
                        open={chooseTagsFormOpen}/>
                    <MultiYChart data={tags.map(tag => tag.tagTimeValues.map((timeValue) => timeValue.toFixed(2)))}
                                 xData={times}
                                 showYLabels={true}
                                 yLabels={tags.map(tag => tag.tagId+' ('+tag.tagUnits+') ')}
                                 colors={['#2196f3', '#ff6e40', '#ff3a8c']}
                                 key={placement}/>
                </>
            </Widget>
        );
    }
}


TimeSeries.propTypes = {
    startDate: momentPropTypes.momentObj, // Actually its a moment object
    endDate: momentPropTypes.momentObj, // Actually its a moment object
    tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    times: PropTypes.arrayOf(PropTypes.string).isRequired,
    placement: PropTypes.number.isRequired,
    onTimeSeriesChange: PropTypes.func.isRequired
};


const mapStateToProps = ({tags}) => {
    return {
        tagList: tags.tags,
    };
};


export default connect(mapStateToProps)(TimeSeries);

