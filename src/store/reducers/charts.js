import moment from 'moment';
import {
    CHARTS_POST_FAIL,
    CHARTS_POST_START,
    TIME_SERIES_ADD_SUCCESS,
    TIME_SERIES_CHANGE_SUCCESS,
    TIME_SERIES_DELETE_SUCCESS,
} from '../actionTypes/charts';


const initialState = {
    timeSeries: [{
        times: [],
        tags: [],
        startDate: moment().subtract(1, 'days'),
        endDate: moment(),
        placement: 0,
    }],
    posting: false,
    currentPlacement: 1,
    postingError: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TIME_SERIES_CHANGE_SUCCESS:
            return timeSeriesChangeSuccess(state, action);
        case TIME_SERIES_ADD_SUCCESS:
            return timeSeriesAddSuccess(state, action);
        case TIME_SERIES_DELETE_SUCCESS:
            return timeSeriesDeleteSuccess(state, action);
        case CHARTS_POST_START:
            return chartsPostStart(state);
        case CHARTS_POST_FAIL:
            return chartsPostFail(state, action);
        default:
            return state;
    }
};

function chartsPostStart(state) {
    return {
        ...state,
        posting: true,
        postingError: null,
    };
}

function chartsPostFail(state, action) {
    return {
        ...state,
        posting: false,
        postingError: action.payload.error.message,
    };
}

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
        postingError: null,
        timeSeries: newTimeSeries,
    };
}

function timeSeriesDeleteSuccess(state, action) {
    const newTimeSeries = state.timeSeries.filter((timeSeries) => (
        timeSeries.placement !== action.payload.responseTimeSeries.placement));

    return {
        ...state,
        posting: false,
        postingError: null,
        timeSeries: newTimeSeries,
    };
}

function timeSeriesAddSuccess(state, action) {
    return {
        ...state,
        posting: false,
        postingError: null,
        currentPlacement: state.currentPlacement + 1,
        timeSeries: state.timeSeries.concat(action.payload.responseTimeSeries),
    };
}

export default reducer;