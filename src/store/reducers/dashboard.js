import {
    FETCH_DASHBOARD_SUCCESS,
    TIME_SERIES_CHANGE_SUCCESS,
    GAUGE_CHANGE_SUCCESS,
    TAG_CHANGE_SUCCESS,
    TRIGGER_CHANGE_SUCCESS,
    FETCH_DASHBOARD_POLLING_SUCCESS,
    TIME_SERIES_ADD_SUCCESS,
    GAUGE_ADD_SUCCESS,
    TAG_ADD_SUCCESS,
    TRIGGER_ADD_SUCCESS,
    SEEQ_ADD_SUCCESS,
    SEEQ_DELETE_SUCCESS,
    TAG_DELETE_SUCCESS,
    GAUGE_DELETE_SUCCESS,
    TIME_SERIES_DELETE_SUCCESS,
    TRIGGER_DELETE_SUCCESS,
    SEEQ_CHANGE_SUCCESS,
    DASHBOARD_FETCH_FAIL,
    DASHBOARD_FETCH_START,
    DASHBOARD_POST_FAIL,
    DASHBOARD_POST_START,
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
    postingError: null,
    currentPlacement: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DASHBOARD_SUCCESS:
            return fetchDashboardSuccess(state, action);
        case TIME_SERIES_CHANGE_SUCCESS:
            return timeSeriesChangeSuccess(state, action);
        case GAUGE_CHANGE_SUCCESS:
            return gaugeChangeSuccess(state, action);
        case TAG_CHANGE_SUCCESS:
            return tagChangeSuccess(state, action);
        case TRIGGER_CHANGE_SUCCESS:
            return triggerChangeSuccess(state, action);
        case SEEQ_CHANGE_SUCCESS:
            return seeqChangeSuccess(state, action);
        case FETCH_DASHBOARD_POLLING_SUCCESS:
            return fetchDashboardPollingSuccess(state, action);
        case TIME_SERIES_ADD_SUCCESS:
            return timeSeriesAddSuccess(state, action);
        case GAUGE_ADD_SUCCESS:
            return gaugeAddSuccess(state, action);
        case TAG_ADD_SUCCESS:
            return tagAddSuccess(state, action);
        case TRIGGER_ADD_SUCCESS:
            return triggerAddSuccess(state, action);
        case SEEQ_ADD_SUCCESS:
            return seeqAddSuccess(state, action);
        case SEEQ_DELETE_SUCCESS:
            return seeqDeleteSuccess(state, action);
        case TAG_DELETE_SUCCESS:
            return tagDeleteSuccess(state, action);
        case TIME_SERIES_DELETE_SUCCESS:
            return timeSeriesDeleteSuccess(state, action);
        case GAUGE_DELETE_SUCCESS:
            return gaugeDeleteSuccess(state, action);
        case TRIGGER_DELETE_SUCCESS:
            return triggerDeleteSuccess(state, action);
        case DASHBOARD_FETCH_START:
            return dashboardFetchStart(state);
        case DASHBOARD_FETCH_FAIL:
            return dashboardFetchFail(state, action);
        case DASHBOARD_POST_START:
            return dashboardPostStart(state);
        case DASHBOARD_POST_FAIL:
            return dashboardPostFail(state, action);
        default:
            return state;
    }
};

function dashboardFetchStart(state) {
    return {
        ...state,
        fetching: true,
        error: null,
        postingError: null,
    };
}


function dashboardFetchFail(state, action) {
    return {
        ...state,
        fetching: false,
        error: action.payload.error
    };
}

function dashboardPostStart(state) {
    return {
        ...state,
        posting: true,
        error: null,
        postingError: null,
    };
}


function dashboardPostFail(state, action) {
    return {
        ...state,
        posting: false,
        postingError: action.payload.error.data.code,
    };
}


function triggerChangeSuccess(state, action) {
    const newTriggers = state.triggers.map((trigger) => {
        if (trigger.placement !== action.payload.responseTrigger.placement) {
            return trigger;
        } else {
            return action.payload.responseTrigger;
        }
    });

    return {
        ...state,
        posting: false,
        error: null,
        triggers: newTriggers,
    };
}

function triggerDeleteSuccess(state, action) {
    const newTriggers = state.triggers.filter((trigger) => (
        trigger.placement !== action.payload.responseTrigger.placement));

    return {
        ...state,
        posting: false,
        error: null,
        triggers: newTriggers,
    };
}

function timeSeriesDeleteSuccess(state, action) {
    const newTimeSeries = state.timeSeries.filter((timeSeries) => (
        timeSeries.placement !== action.payload.responseTimeSeries.placement));

    return {
        ...state,
        posting: false,
        error: null,
        timeSeries: newTimeSeries,
    };
}

function gaugeDeleteSuccess(state, action) {
    const gaugeArrayOptions = {
        MIDDLE: 'middleGauges',
        LEFT: 'leftGauges',
        RIGHT: 'rightGauges',
    };

    const newGauge = state[gaugeArrayOptions[action.payload.gaugeType]].filter((gauge) => (
        gauge.placement !== action.payload.responseGauge.placement));

    return {
        ...state,
        posting: false,
        error: null,
        [gaugeArrayOptions[action.payload.gaugeType]]: newGauge,
        postingError: null,
    };
}

function triggerAddSuccess(state, action) {
    return {
        ...state,
        posting: false,
        error: null,
        triggers: state.triggers.concat(action.payload.responseTrigger),
        currentPlacement: state.currentPlacement + 1,
    };
}

function seeqChangeSuccess(state, action) {
    const newSeeqs = state.seeqs.map((seeq) => {
        if (seeq.placement !== action.payload.responseSeeq.placement) {
            return seeq;
        } else {
            return action.payload.responseSeeq;
        }
    });

    return {
        ...state,
        posting: false,
        error: null,
        seeqs: newSeeqs,
    };
}

function seeqDeleteSuccess(state, action) {
    const newSeeqs = state.seeqs.filter((seeq) => (
        seeq.placement !== action.payload.responseSeeq.placement
    ));

    return {
        ...state,
        posting: false,
        error: null,
        seeqs: newSeeqs,
    };
}

function seeqAddSuccess(state, action) {
    return {
        ...state,
        posting: false,
        error: null,
        currentPlacement: state.currentPlacement + 1,
        seeqs: state.seeqs.concat(action.payload.responseSeeq),
    };
}

function tagChangeSuccess(state, action) {
    const newTags = state.tags.map((tag) => {
        if (tag.placement !== action.payload.responseTag.placement) {
            return tag;
        } else {
            return action.payload.responseTag;
        }
    });

    return {
        ...state,
        posting: false,
        error: null,
        tags: newTags,
    };
}

function tagDeleteSuccess(state, action) {
    const newTags = state.tags.filter((tag) => (
        tag.placement !== action.payload.responseTag.placement));

    return {
        ...state,
        posting: false,
        error: null,
        tags: newTags,
    };
}

function tagAddSuccess(state, action) {
    return {
        ...state,
        posting: false,
        error: null,
        currentPlacement: state.currentPlacement + 1,
        tags: state.tags.concat(action.payload.responseTag),
    };
}

function gaugeChangeSuccess(state, action) {
    const gaugeArrayOptions = {
        MIDDLE: 'middleGauges',
        LEFT: 'leftGauges',
        RIGHT: 'rightGauges',
    };

    const newGauge = state[gaugeArrayOptions[action.payload.gaugeType]].map((gauge) => {
        if (gauge.placement !== action.payload.responseGauge.placement) {
            return gauge;
        } else {
            return action.payload.responseGauge;
        }
    });

    return {
        ...state,
        posting: false,
        error: null,
        [gaugeArrayOptions[action.payload.gaugeType]]: newGauge,
        postingError: null,
    };
}

function gaugeAddSuccess(state, action) {
    const gaugeArrayOptions = {
        MIDDLE: 'middleGauges',
        LEFT: 'leftGauges',
        RIGHT: 'rightGauges',
    };

    return {
        ...state,
        posting: false,
        error: null,
        currentPlacement: state.currentPlacement + 1,
        [gaugeArrayOptions[action.payload.gaugeType]]: state[gaugeArrayOptions[action.payload.gaugeType]].concat(action.payload.responseGauge),
        postingError: null,
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
        error: null,
        timeSeries: newTimeSeries,
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
        currentPlacement: action.payload.currentPlacement,
        fetching: false,
        error: null,
    };
}

export default reducer;