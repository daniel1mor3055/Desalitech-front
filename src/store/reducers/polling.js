import {
    FETCH_POLLING_FAIL,
    FETCH_POLLING_SUCCESS
} from '../actionTypes/polling';

const initialState = {
    systemsStatus: [],
    activeAlarms: [],
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POLLING_FAIL:
            return fetchPollingFail(state, action);
        case FETCH_POLLING_SUCCESS:
            return fetchPollingSuccess(state, action);
        default:
            return state;
    }
};

function fetchPollingSuccess(state, action) {
    return {
        ...state,
        activeAlarms: action.payload.activeAlarms,
        systemsStatus: action.payload.systemsStatus,
        error: null,
    };
}

function fetchPollingFail(state, action) {
    return {
        ...state,
        error: action.payload.error,
    };

}

export default reducer;