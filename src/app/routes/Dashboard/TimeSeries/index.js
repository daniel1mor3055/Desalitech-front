import React, {Component} from 'react';
import moment from "moment";
import {connect} from 'react-redux';
import momentPropTypes from 'react-moment-proptypes';

import MultiYChart from "./MultiYChart";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Widget from "app/components/Widget";
import DesDateRangePicker from "./DesDateRangePicker";
import FormTimeSeries from "../FormTimeSeries";
import FormDelete from "../FormDelete";

class TimeSeries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            editFormOpen: false,
            deleteFormOpen: false,
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
        const {startDate, endDate, currentPickedRange} = this.props;
        const newButtonColors = {
            yearColor: currentPickedRange === 'Year' ? 'primary' : 'default',
            halfYearColor: currentPickedRange === 'Six Month' ? 'primary' : 'default',
            monthColor: currentPickedRange === 'Month' ? 'primary' : 'default',
            weekColor: currentPickedRange === 'Week' ? 'primary' : 'default',
            dayColor: (currentPickedRange === 'Day' || currentPickedRange == null) ? 'primary' : 'default',
        };

        this.setState({
            startDate,
            endDate,
            buttonsColor: newButtonColors,
        });
    };

    handleRangePick = ({startDate, endDate}) => {
        if (endDate === this.state.endDate) {
            this.setState({startDate});
            return null;
        } else {
            this.handlePushedButtonColor('Custom');
            this.setState({startDate, endDate});
            this.dateTimeSeriesChange(startDate, endDate, 'Custom');
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
        if (propertyToColor !== 'Custom') {
            buttonsColor[propertyToColor] = 'primary';
        }
        this.setState({buttonsColor: buttonsColor});
    };

    handleFromTodayPick = (delta, scale, code) => {
        const endDate = moment();
        const startDate = moment().subtract(delta, scale);
        this.setState({
            startDate,
            endDate
        });
        this.dateTimeSeriesChange(startDate, endDate, code);
    };


    dateTimeSeriesChange = (startDate, endDate, code) => {
        const {tags, placement} = this.props;
        const timeSeries = {
            detail1: code,
            startDate,
            endDate,
            tags,
            placement
        };
        this.props.onTimeSeriesChange(timeSeries);
    };

    handleOpenEditForm = (event) => {
        event.preventDefault();
        this.setState({editFormOpen: true});
    };

    handleCloseForm = () => {
        this.setState({
            editFormOpen: false,
            deleteFormOpen: false,
        });
    };

    handleFormSubmit = (values) => {
        const {startDate, endDate, placement, currentPickedRange, tagList} = this.props;
        const tags = Object.keys(values).map((key) => {
            const newTag = tagList.find(o => o.tagName === values[key]);
            return {
                tagId: newTag == null ? '' : newTag.tagId,
            };
        });
        const timeSeries = {
            startDate,
            endDate,
            placement,
            tags,
            detail1: currentPickedRange,
        };
        this.props.onTimeSeriesChange(timeSeries);
    };

    getFormInitialValues = (tags) => {
        let initialValues = {};
        for (let i = 0; i < 3; i++) {
            if (i < tags.length) {
                initialValues[`tag${i + 1}Name`] = tags[i].tagName;
            } else {
                initialValues[`tag${i + 1}Name`] = '';
            }
        }
        return initialValues;
    };

    handleOpenDeleteForm = () => {
        this.setState({deleteFormOpen: true});
    };

    handleDeleteWidget = () => {
        const {startDate, endDate, placement, currentPickedRange, tags} = this.props;

        const timeSeries = {
            startDate,
            endDate,
            placement,
            tags,
            detail1: currentPickedRange,
        };
        this.props.onTimeSeriesDelete(timeSeries);
    };

    render() {
        const {editFormOpen,deleteFormOpen, buttonsColor: {yearColor, halfYearColor, monthColor, weekColor, dayColor}} = this.state;
        const {tags, times, placement} = this.props;
        const initialFormValues = this.getFormInitialValues(tags);

        return (
            <Widget childrenStyle={'col-12'} onDeleteClick={this.handleOpenDeleteForm} onEditClick={this.handleOpenEditForm}>
                <>
                    <Button className="jr-btn" color={`${yearColor}`}
                            onClick={() => {
                                this.handlePushedButtonColor('yearColor');
                                this.handleFromTodayPick(1, 'years', 'Year');
                            }}>1 Year</Button>
                    <Button className="jr-btn" color={`${halfYearColor}`}
                            onClick={() => {
                                this.handlePushedButtonColor('halfYearColor');
                                this.handleFromTodayPick(6, 'months', 'Six Month');
                            }}>6 Months</Button>
                    <Button className="jr-btn" color={`${monthColor}`}
                            onClick={() => {
                                this.handlePushedButtonColor('monthColor');
                                this.handleFromTodayPick(1, 'months', 'Month');
                            }}>1 Month</Button>
                    <Button className="jr-btn" color={`${weekColor}`}
                            onClick={() => {
                                this.handlePushedButtonColor('weekColor');
                                this.handleFromTodayPick(1, 'weeks', 'Week');
                            }}>1 Week</Button>
                    <Button className="jr-btn" color={`${dayColor}`}
                            onClick={() => {
                                this.handlePushedButtonColor('dayColor');
                                this.handleFromTodayPick(1, 'days', 'Day');
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
                    <FormTimeSeries
                        handleSubmit={this.handleFormSubmit}
                        handleClose={this.handleCloseForm}
                        open={editFormOpen}
                        initialValues={initialFormValues}
                    />
                    <FormDelete
                        handleClose={this.handleCloseForm}
                        handleSubmit={this.handleDeleteWidget}
                        open={deleteFormOpen}
                    />
                    <MultiYChart data={tags.map(tag => tag.tagTimeValues.map((timeValue) => timeValue.toFixed(2)))}
                                 xData={times}
                                 showYLabels={true}
                                 yLabels={tags.map(tag => tag.tagName + ' (' + tag.tagUnits + ') ')}
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
    onTimeSeriesChange: PropTypes.func.isRequired,
    onTimeSeriesDelete: PropTypes.func.isRequired,
    currentPickedRange: PropTypes.string,
};


const mapStateToProps = ({tags}) => {
    return {
        tagList: tags.tags,
    };
};

export default connect(mapStateToProps)(TimeSeries);

