import {
    FETCH_DASHBOARD_START,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAIL,
    SET_DATES_SUCCESS,
    SET_DATES_START,
    SET_DATES_FAIL,
    CHOOSE_TAGS_SUCCESS,
    CHOOSE_TAGS_START,
    CHOOSE_TAGS_FAIL,
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
        case SET_DATES_START:
            return setDatesStart(state, action);
        case SET_DATES_SUCCESS:
            return setDatesSuccess(state, action);
        case SET_DATES_FAIL:
            return setDatesFail(state, action);
        case CHOOSE_TAGS_START:
            return chooseTagsStart(state, action);
        case CHOOSE_TAGS_SUCCESS:
            return chooseTagsSuccess(state, action);
        case CHOOSE_TAGS_FAIL:
            return chooseTagsFail(state, action);
        default:
            return state;
    }
};


function chooseTagsSuccess(state, action) {
    return setDatesSuccess(state, action);
}

function chooseTagsFail(state, action) {
    return setDatesFail(state, action);
}

function chooseTagsStart(state, action) {
    return setDatesStart(state, action);
}

function setDatesSuccess(state, action) {
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

function setDatesFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function setDatesStart(state, action) {
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