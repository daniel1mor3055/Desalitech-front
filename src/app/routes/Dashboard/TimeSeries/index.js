import React, {Component} from 'react';

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';
import MultiYChart from "./MultiYChart";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {setDates} from 'store/thunk/dashboard';

class TimeSeries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
        };
    }

    componentDidMount = () => {
        const {startDate, endDate} = this.props;
        this.setState({
            startDate,
            endDate,
        });
    };

    handleDateChange = (startDate, endDate) => {
        if (endDate === this.state.endDate) {
            this.setState({
                startDate,
            });
            return null;
        }
        const {location, tags, times, placement} = this.props;
        const queryParams = new URLSearchParams(location.search);
        const sysId = decodeURIComponent(queryParams.get('sysId'));

        this.setState({
            startDate,
            endDate,
        });

        const timeSeries = {
            startDate,
            endDate,
            tags,
            times,
            placement
        };

        this.props.onSetDates(timeSeries, sysId);
    };

    render() {
        const {tags, times, placement} = this.props;

        return (
            <div className="jr-card">
                <Button className="jr-btn" color="primary">1 Year</Button>
                <Button className="jr-btn" color="primary">6 Months</Button>
                <Button className="jr-btn" color="primary">1 Month</Button>
                <Button className="jr-btn" color="primary">1 Week</Button>
                <Button className="jr-btn" color="primary">1 Day</Button>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="1" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="2" // PropTypes.string.isRequired,
                    onDatesChange={({startDate, endDate}) => this.handleDateChange(startDate, endDate)} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
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
        onSetDates: (timeSeries, sysId) => dispatch(setDates(timeSeries, sysId)),
    };
};

export default withRouter(connect(null, mapDispatchedToProps)(TimeSeries));