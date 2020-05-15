import * as actionTypes from '../actionTypes/systemSelect/systemSelect';

const initialState = {
    systems: [],
    fetching: false,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SYSTEMS_START:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case actionTypes.FETCH_SYSTEMS_SUCCESS:
            return {
                ...state,
                systems: action.systems,
                fetching: false,
                error: null,
            };
        case actionTypes.FETCH_SYSTEMS_FAIL:
            return {
                ...state,
                fetching: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;