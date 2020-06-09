import {
    FETCH_DASHBOARD_START,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAIL,
    TIME_SERIES_CHANGE_SUCCESS,
    TIME_SERIES_CHANGE_START,
    TIME_SERIES_CHANGE_FAIL,
    GAUGE_CHANGE_SUCCESS,
    GAUGE_CHANGE_START,
    GAUGE_CHANGE_FAIL,
    TAG_CHANGE_SUCCESS,
    TAG_CHANGE_START,
    TAG_CHANGE_FAIL,
    TRIGGER_CHANGE_SUCCESS,
    TRIGGER_CHANGE_START,
    TRIGGER_CHANGE_FAIL,
    SEEQ_CHANGE_SUCCESS,
    SEEQ_CHANGE_START,
    SEEQ_CHANGE_FAIL,
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
        case GAUGE_CHANGE_START:
            return gaugeChangeStart(state, action);
        case GAUGE_CHANGE_SUCCESS:
            return gaugeChangeSuccess(state, action);
        case GAUGE_CHANGE_FAIL:
            return gaugeChangeFail(state, action);
        case TAG_CHANGE_START:
            return tagChangeStart(state, action);
        case TAG_CHANGE_SUCCESS:
            return tagChangeSuccess(state, action);
        case TAG_CHANGE_FAIL:
            return tagChangeFail(state, action);
        case TRIGGER_CHANGE_START:
            return triggerChangeStart(state, action);
        case TRIGGER_CHANGE_SUCCESS:
            return triggerChangeSuccess(state, action);
        case TRIGGER_CHANGE_FAIL:
            return triggerChangeFail(state, action);
        case SEEQ_CHANGE_START:
            return seeqChangeStart(state, action);
        case SEEQ_CHANGE_SUCCESS:
            return seeqChangeSuccess(state, action);
        case SEEQ_CHANGE_FAIL:
            return seeqChangeFail(state, action);
        case FETCH_DASHBOARD_POLLING_SUCCESS:
            return fetchDashboardPollingSuccess(state, action);
        default:
            return state;
    }
};

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

function triggerChangeFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function triggerChangeStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
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

function seeqChangeFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function seeqChangeStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
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

function tagChangeFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function tagChangeStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
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
    };
}

function gaugeChangeFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function gaugeChangeStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
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