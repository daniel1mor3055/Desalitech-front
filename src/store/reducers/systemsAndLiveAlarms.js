import * as actionTypes from '../actionTypes/systemsAndLiveAlarms/systemsAndLiveAlarms';

const initialState = {
    systems: [],
    fetching: false,
    error: null,
    selectedSystem: localStorage.getItem('selectedSystem')
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPON_SYSTEM_SELECTION:
            return {
                ...state,
                selectedSystem: action.payload.selectedSystem
            };
        case actionTypes.FETCH_SYSTEMS_START:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case actionTypes.FETCH_SYSTEMS_SUCCESS:
            return {
                ...state,
                systems: action.payload.systems,
                fetching: false,
                error: null,
            };
        case actionTypes.FETCH_SYSTEMS_FAIL:
            return {
                ...state,
                fetching: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default reducer;