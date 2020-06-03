import {
    FETCH_DASHBOARD_START,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAIL,
    TIME_SERIES_CHANGE_SUCCESS,
    TIME_SERIES_CHANGE_START,
    TIME_SERIES_CHANGE_FAIL,
    FETCH_DASHBOARD_POLLING_SUCCESS,
} from '../actionTypes/dashboard';


const initialState = {
    triggers: [],
    tags: [],
    gauges: [],
    timeSeries: [],
    middleGauges: [],
    rightGauges: [],
    leftGauges: [],
    seeqs: [],
    fetching: true,
    posting: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DASHBOARD_START:
            return fetchDashboardStart(state, action);
        case FETCH_DASHBOARD_SUCCESS:
            return fetchDashboardSuccess(state, action);
        case FETCH_DASHBOARD_FAIL:
            return fetchDashboardFail(state, action);
        case TIME_SERIES_CHANGE_START:
            return timeSeriesChangeStart(state, action);
        case TIME_SERIES_CHANGE_SUCCESS:
            return timeSeriesChangeSuccess(state, action);
        case TIME_SERIES_CHANGE_FAIL:
            return timeSeriesChangeFail(state, action);
        case FETCH_DASHBOARD_POLLING_SUCCESS:
            return fetchDashboardPollingSuccess(state, action);
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

function fetchDashboardStart(state, action) {
    return {
        ...state,
        fetching: true,
        error: null,
    };
}


function fetchDashboardPollingSuccess(state, action) {
    return {
        ...state,
        triggers: action.payload.triggers,
        tags: action.payload.tags,
        middleGauges: action.payload.middleGauges,
        rightGauges: action.payload.rightGauges,
        leftGauges: action.payload.leftGauges,
    };
}

function fetchDashboardSuccess(state, action) {
    return {
        ...state,
        triggers: action.payload.triggers,
        tags: action.payload.tags,
        gauges: action.payload.gauges,
        timeSeries: action.payload.timeSeries,
        middleGauges: action.payload.middleGauges,
        rightGauges: action.payload.rightGauges,
        leftGauges: action.payload.leftGauges,
        seeqs: action.payload.seeqs,
        fetching: false,
        error: null,
    };
}

function fetchDashboardFail(state, action) {
    return {
        ...state,
        fetching: false,
        error: action.payload.error,
    };
}


export default reducer;