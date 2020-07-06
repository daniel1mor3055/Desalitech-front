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
    TIME_SERIES_ADD_FAIL,
    TIME_SERIES_ADD_START,
    TIME_SERIES_ADD_SUCCESS,
    GAUGE_ADD_SUCCESS,
    GAUGE_ADD_START,
    GAUGE_ADD_FAIL,
    TAG_ADD_SUCCESS,
    TAG_ADD_START,
    TAG_ADD_FAIL,
    TRIGGER_ADD_START,
    TRIGGER_ADD_SUCCESS,
    TRIGGER_ADD_FAIL,
    SEEQ_ADD_SUCCESS,
    SEEQ_ADD_START,
    SEEQ_ADD_FAIL,
    SEEQ_DELETE_SUCCESS,
    SEEQ_DELETE_START,
    SEEQ_DELETE_FAIL,
    TAG_DELETE_SUCCESS,
    TAG_DELETE_START,
    TAG_DELETE_FAIL,
    GAUGE_DELETE_FAIL,
    GAUGE_DELETE_START,
    GAUGE_DELETE_SUCCESS,
    TIME_SERIES_DELETE_FAIL,
    TIME_SERIES_DELETE_START,
    TIME_SERIES_DELETE_SUCCESS,
    TRIGGER_DELETE_FAIL,
    TRIGGER_DELETE_START,
    TRIGGER_DELETE_SUCCESS,
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
    currentPlacement: 0,
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
        case TIME_SERIES_ADD_START:
            return timeSeriesAddStart(state, action);
        case TIME_SERIES_ADD_SUCCESS:
            return timeSeriesAddSuccess(state, action);
        case TIME_SERIES_ADD_FAIL:
            return timeSeriesAddFail(state, action);
        case GAUGE_ADD_START:
            return gaugeAddStart(state, action);
        case GAUGE_ADD_SUCCESS:
            return gaugeAddSuccess(state, action);
        case GAUGE_ADD_FAIL:
            return gaugeAddFail(state, action);
        case TAG_ADD_START:
            return tagAddStart(state, action);
        case TAG_ADD_SUCCESS:
            return tagAddSuccess(state, action);
        case TAG_ADD_FAIL:
            return tagAddFail(state, action);
        case TRIGGER_ADD_START:
            return triggerAddStart(state, action);
        case TRIGGER_ADD_SUCCESS:
            return triggerAddSuccess(state, action);
        case TRIGGER_ADD_FAIL:
            return triggerAddFail(state, action);
        case SEEQ_ADD_START:
            return seeqAddStart(state, action);
        case SEEQ_ADD_SUCCESS:
            return seeqAddSuccess(state, action);
        case SEEQ_ADD_FAIL:
            return seeqAddFail(state, action);
        case SEEQ_DELETE_START:
            return seeqDeleteStart(state, action);
        case SEEQ_DELETE_SUCCESS:
            return seeqDeleteSuccess(state, action);
        case SEEQ_DELETE_FAIL:
            return seeqDeleteFail(state, action);
        case TAG_DELETE_START:
            return tagDeleteStart(state, action);
        case TAG_DELETE_SUCCESS:
            return tagDeleteSuccess(state, action);
        case TAG_DELETE_FAIL:
            return tagDeleteFail(state, action);
        case TIME_SERIES_DELETE_START:
            return timeSeriesDeleteStart(state, action);
        case TIME_SERIES_DELETE_SUCCESS:
            return timeSeriesDeleteSuccess(state, action);
        case TIME_SERIES_DELETE_FAIL:
            return timeSeriesDeleteFail(state, action);
        case GAUGE_DELETE_START:
            return gaugeDeleteStart(state, action);
        case GAUGE_DELETE_SUCCESS:
            return gaugeDeleteSuccess(state, action);
        case GAUGE_DELETE_FAIL:
            return gaugeDeleteFail(state, action);
        case TRIGGER_DELETE_START:
            return triggerDeleteStart(state, action);
        case TRIGGER_DELETE_SUCCESS:
            return triggerDeleteSuccess(state, action);
        case TRIGGER_DELETE_FAIL:
            return triggerDeleteFail(state, action);
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

function triggerDeleteSuccess(state, action) {
    const newTriggers = state.triggers.filter((trigger) =>  (
        trigger.placement !== action.payload.responseTrigger.placement));

    return {
        ...state,
        posting: false,
        error: null,
        triggers: newTriggers,
    };
}

function triggerDeleteFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function triggerDeleteStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
    };
}

function timeSeriesDeleteSuccess(state, action) {
    const newTimeSeries = state.timeSeries.filter((timeSeries) =>  (
        timeSeries.placement !== action.payload.responseTimeSeries.placement) );

    return {
        ...state,
        posting: false,
        error: null,
        timeSeries: newTimeSeries,
    };
}

function timeSeriesDeleteFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function timeSeriesDeleteStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
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
    };
}

function gaugeDeleteFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function gaugeDeleteStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
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

function triggerAddFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function triggerAddStart(state, action) {
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

function seeqDeleteFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function seeqDeleteStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
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

function seeqAddFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function seeqAddStart(state, action) {
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

function tagDeleteFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function tagDeleteStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
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

function tagAddFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function tagAddStart(state, action) {
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
    };
}


function gaugeAddFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

function gaugeAddStart(state, action) {
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
        currentPlacement: action.payload.currentPlacement,
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