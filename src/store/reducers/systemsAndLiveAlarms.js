import {
    FETCH_SYSTEMS_START,
    FETCH_SYSTEMS_SUCCESS,
    FETCH_SYSTEMS_FAIL,
    UPON_SYSTEM_SELECTION
} from '../actionTypes/systemsAndLiveAlarms';


const initialState = {
    systems: [],
    fetching: false,
    error: null,
    selectedSystemId: localStorage.getItem('selectedSystemId'),
    selectedSystemName: localStorage.getItem('selectedSystemName'),
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SYSTEMS_START:
            return fetchSystemsStart(state, action);
        case FETCH_SYSTEMS_SUCCESS:
            return fetchSystemsSuccess(state, action);
        case FETCH_SYSTEMS_FAIL:
            return fetchSystemsFail(state, action);
        case UPON_SYSTEM_SELECTION:
            return uponSystemSelection(state, action);
        default:
            return state;
    }
};

function uponSystemSelection(state, action) {
    return {
        ...state,
        selectedSystemId: action.payload.selectedSystem.sysId,
        selectedSystemName: action.payload.selectedSystem.systemName,
    };
}

function fetchSystemsStart(state, action) {
    return {
        ...state,
        fetching: true,
        error: null,
    };
}

function fetchSystemsSuccess(state, action) {
    return {
        ...state,
        systems: action.payload.systems,
        fetching: false,
        error: null,
    };
}

function fetchSystemsFail(state, action) {
    return {
        ...state,
        fetching: false,
        error: action.payload.error,
    };

}

export default reducer;