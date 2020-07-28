import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from "react-dates";
import React from "react";
import './index.css';

const DesDateRangePicker = ({ startDate, startDateId, endDate, endDateId, onDatesChange, focusedInput, onFocusChange, numberOfMonths, isOutsideRange }) => {
    return <DateRangePicker
        startDate={startDate}
        startDateId={startDateId}
        endDate={endDate}
        endDateId={endDateId}
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={onFocusChange}
        numberOfMonths={numberOfMonths}
        isOutsideRange={isOutsideRange}
    />;
};

export default DesDateRangePicker;