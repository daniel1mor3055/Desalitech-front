import * as actionTypes from '../actionTypes/AlarmsList/alarmsList';

const initialState = {
    alarms: [],
    fetching: false,
    error: null,
};

const fetchAlarmsStart = (state, action) => {
    return {
        ...state,
        fetching: true,
        error: null,
    };
};

const fetchAlarmsSuccess = (state, action) => {
    return {
        ...state,
        alarms: action.alarms,
        fetching: false,
        error: null,
    };
};

const fetchAlarmsFail = (state, action) => {
    return {
        ...state,
        alarms: [],
        fetching: false,
        error: action.error,
    };
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALARMS_START:
            return fetchAlarmsStart(state, action);
        case actionTypes.FETCH_ALARMS_SUCCESS:
            return fetchAlarmsSuccess(state, action);
        case actionTypes.FETCH_ALARMS_FAIL:
            return fetchAlarmsFail(state, action);
        default:
            return state;
    }
};

export default reducer;