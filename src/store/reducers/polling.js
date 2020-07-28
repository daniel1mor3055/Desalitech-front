import {
    FETCH_POLLING_FAIL,
    FETCH_POLLING_START,
    FETCH_POLLING_SUCCESS
} from '../actionTypes/polling';

const initialState = {
    systemsStatus: [],
    activeAlarms: ['null'],
    fetching: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POLLING_START:
            return fetchPollingStart(state);
        case FETCH_POLLING_FAIL:
            return fetchPollingFail(state, action);
        case FETCH_POLLING_SUCCESS:
            return fetchPollingSuccess(state, action);
        default:
            return state;
    }
};

function fetchPollingStart(state) {
    return {
        ...state,
        fetching: true,
        error: null,
    };
}

function fetchPollingSuccess(state, action) {
    return {
        ...state,
        activeAlarms: action.payload.activeAlarms,
        systemsStatus: action.payload.systemsStatus,
        error: null,
        fetching: false,
    };
}

function fetchPollingFail(state, action) {
    return {
        ...state,
        error: action.payload.error,
        fetching: false,
    };

}

export default reducer;