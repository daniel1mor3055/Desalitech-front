import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from "react-dates";
import React from "react";
import './index.scss';

const DesDateRangePicker = ({ startDate, startDateId, endDate, endDateId, onDatesChange, focusedInput, onFocusChange, numberOfMonths, isOutsideRange }) => {
    return <DateRangePicker
        startDate={startDate} // momentPropTypes.momentObj or null,
        startDateId={startDateId} // PropTypes.string.isRequired,
        endDate={endDate} // momentPropTypes.momentObj or null,
        endDateId={endDateId} // PropTypes.string.isRequired,
        onDatesChange={onDatesChange} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={onFocusChange} // PropTypes.func.isRequired,
        numberOfMonths={numberOfMonths}
        isOutsideRange={isOutsideRange}
    />;
};

export default DesDateRangePicker;