import {FETCH_ALARMS_START, FETCH_ALARMS_SUCCESS, FETCH_ALARMS_FAIL} from '../actionTypes/alarmsList';

const initialState = {
    alarms: [],
    fetching: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALARMS_START:
            return fetchAlarmsStart(state, action);
        case FETCH_ALARMS_SUCCESS:
            return fetchAlarmsSuccess(state, action);
        case FETCH_ALARMS_FAIL:
            return fetchAlarmsFail(state, action);
        default:
            return state;
    }
};

function fetchAlarmsStart(state, action) {
    return {
        ...state,
        fetching: true,
        error: null,
    };
}

function fetchAlarmsSuccess(state, action) {
    return {
        ...state,
        alarms: action.payload.alarms,
        fetching: false,
        error: null,
    };
}

function fetchAlarmsFail(state, action) {
    return {
        ...state,
        alarms: [],
        fetching: false,
        error: action.payload.error,
    };
}


export default reducer;