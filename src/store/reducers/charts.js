import moment from 'moment';
import {
    TIME_SERIES_CHANGE_SUCCESS,
    TIME_SERIES_CHANGE_START,
    TIME_SERIES_CHANGE_FAIL,
    TIME_SERIES_ADD_SUCCESS,
    TIME_SERIES_ADD_START,
    TIME_SERIES_ADD_FAIL,
} from '../actionTypes/charts';


const initialState = {
    timeSeries: [{
        times: [],
        tags: [],
        startDate: moment().subtract(1,'days'),
        endDate: moment(),
        placement: 0,
    }],
    posting: false,
    error: null,
    currentPlacement: 1,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TIME_SERIES_CHANGE_START:
            return timeSeriesChangeStart(state, action);
        case TIME_SERIES_CHANGE_SUCCESS:
            return timeSeriesChangeSuccess(state, action);
        case TIME_SERIES_CHANGE_FAIL:
            return timeSeriesChangeFail(state, action);
        case TIME_SERIES_ADD_START:
            return timeSeriesAddStart(state, action);
        case TIME_SERIES_ADD_SUCCESS:
            return timeSeriesAddSuccess(state, action);
        case TIME_SERIES_ADD_FAIL:
            return timeSeriesAddFail(state, action);
        default:
            return state;
    }
};


function timeSeriesChangeSuccess(state, action) {
    const newTimeSeries = state.timeSeries.map((timeSeries) => {
        if (timeSeries.placement !== action.payload.responseTimeSeries.placement) {
            return timeSeries;
        } else {
            return action.payload.responseTimeSeries;
        }
    });

    return {
        ...state,
        posting: false,
        error: null,
        timeSeries: newTimeSeries,
    };
}

function timeSeriesChangeFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function timeSeriesChangeStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
    };
}

function timeSeriesAddSuccess(state, action) {
    return {
        ...state,
        posting: false,
        error: null,
        currentPlacement: state.currentPlacement + 1,
        timeSeries: state.timeSeries.concat(action.payload.responseTimeSeries),
    };
}

function timeSeriesAddFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function timeSeriesAddStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
    };
}


export default reducer;