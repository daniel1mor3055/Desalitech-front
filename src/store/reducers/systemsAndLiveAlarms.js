import {
    FETCH_SYSTEMS_FAIL,
    FETCH_SYSTEMS_START,
    FETCH_SYSTEMS_SUCCESS,
} from '../actionTypes/systemsAndLiveAlarms';


const initialState = {
    systems: [],
    fetching: true,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SYSTEMS_START:
            return fetchSystemsStart(state, action);
        case FETCH_SYSTEMS_SUCCESS:
            return fetchSystemsSuccess(state, action);
        case FETCH_SYSTEMS_FAIL:
            return fetchSystemsFail(state, action);
        default:
            return state;
    }
};

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