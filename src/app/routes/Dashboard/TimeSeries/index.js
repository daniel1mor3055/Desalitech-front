import React, {Component} from 'react';
import moment from "moment";

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';

import {DateRangePicker} from 'react-dates';
import MultiYChart from "./MultiYChart";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {timeSeriesChange} from 'store/thunk/dashboard';
import ChooseTagsForm from '../ChooseTagsForm';

class TimeSeries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            chooseTagsFormOpen: false,
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
        const {tags, times, placement} = this.props;
        const timeSeries = {
            startDate,
            endDate,
            tags,
            times,
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

    handleSubmitTagsForm = (values) => {
        const {startDate, endDate, times, placement} = this.props;
        const tags = Object.keys(values).map((key) => ({
            tagId: values[key],
        }));
        const timeSeries = {
            startDate,
            endDate,
            times,
            placement,
            tags,
        };
        this.props.onTimeSeriesChange(timeSeries);
    };

    render() {
        const {chooseTagsFormOpen} = this.state;
        const {tags, times, placement} = this.props;

        return (
            <div className="jr-card">
                <Button className="jr-btn"
                        color="primary"
                        onClick={() => this.handleFromTodayPick(1, 'years')}>1 Year</Button>
                <Button className="jr-btn"
                        color="primary"
                        onClick={() => this.handleFromTodayPick(6, 'months')}>6 Months</Button>
                <Button className="jr-btn"
                        color="primary"
                        onClick={() => this.handleFromTodayPick(1, 'months')}>1 Month</Button>
                <Button className="jr-btn"
                        color="primary"
                        onClick={() => this.handleFromTodayPick(1, 'weeks')}>1 Week</Button>
                <Button className="jr-btn"
                        color="primary"
                        onClick={() => this.handleFromTodayPick(1, 'day')}>1 Day</Button>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId={'startDate' + placement.toString()} // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId={'endDate' + placement.toString()} // PropTypes.string.isRequired,
                    onDatesChange={this.handleRangePick} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <Button className="jr-btn jr-btn-lg" color="primary" onClick={this.handleOpenChooseTagsForm}>
                    <i className="zmdi zmdi-github"/>
                </Button>

                <ChooseTagsForm
                    handleClose={this.handleCloseChooseTagsForm}
                    handleSubmit={this.handleSubmitTagsForm}
                    tagsIds={tags.map(tag => tag.tagId)}
                    numberOfFields={3}
                    open={chooseTagsFormOpen}/>
                <MultiYChart data={tags.map(tag => tag.tagTimeValues)}
                             xData={times}
                             showYLabels={true}
                             yLabels={tags.map(tag => tag.tagId)}
                             colors={['#2196f3', '#ff6e40', '#ff6e40']}
                             key={placement}/>
            </div>);
    }
}


TimeSeries.propTypes = {
    startDate: PropTypes.object.isRequired, // Actually its a moment object
    endDate: PropTypes.object.isRequired, // Actually its a moment object
    tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    times: PropTypes.arrayOf(PropTypes.string).isRequired,
    placement: PropTypes.number.isRequired,
};

const mapDispatchedToProps = dispatch => {
    return {
        onTimeSeriesChange: (timeSeries) => dispatch(timeSeriesChange(timeSeries)),
    };
};

export default withRouter(connect(null, mapDispatchedToProps)(TimeSeries));