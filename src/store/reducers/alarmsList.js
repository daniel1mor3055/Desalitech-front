import {
    FETCH_ALARMS_START,
    FETCH_ALARMS_SUCCESS,
    FETCH_ALARMS_FAIL,
    SET_EMAIL_NOTIFICATION_FAIL,
    SET_EMAIL_NOTIFICATION_START,
    SET_EMAIL_NOTIFICATION_SUCCESS
} from '../actionTypes/alarmsList';

const initialState = {
    alarms: [],
    emailNotification: false,
    posting: false,
    fetching: true,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALARMS_START:
            return fetchAlarmsStart(state);
        case FETCH_ALARMS_SUCCESS:
            return fetchAlarmsSuccess(state, action);
        case FETCH_ALARMS_FAIL:
            return fetchAlarmsFail(state, action);
        case SET_EMAIL_NOTIFICATION_START:
            return setEmailNotificationStart(state);
        case SET_EMAIL_NOTIFICATION_SUCCESS:
            return setEmailNotificationSuccess(state, action);
        case SET_EMAIL_NOTIFICATION_FAIL:
            return setEmailNotificationFail(state, action);
        default:
            return state;
    }
};

function fetchAlarmsStart(state) {
    return {
        ...state,
        fetching: true,
        error: null,
    };
}

function fetchAlarmsSuccess(state, action) {
    return {
        ...state,
        emailNotification: action.payload.emailNotification === 'true' || action.payload.emailNotification,
        alarms: action.payload.alarms,
        fetching: false,
        error: null,
    };
}

function fetchAlarmsFail(state, action) {
    return {
        ...state,
        fetching: false,
        error: action.payload.error,
    };
}

function setEmailNotificationStart(state) {
    return {
        ...state,
        posting: true,
        error: null,
    };
}

function setEmailNotificationSuccess(state, action) {
    return {
        ...state,
        emailNotification: action.payload.emailNotification,
        posting: false,
        error: null,
    };
}

function setEmailNotificationFail(state, action) {
    return {
        ...state,
        alarms: [],
        posting: false,
        emailNotification: false,
        error: action.payload.error,
    };
}


export default reducer;