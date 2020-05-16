import * as actionTypes from '../actionTypes/admin';

const initialState = {
    admin: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ADMIN_STATUS:
            return {
                ...state,
                admin: action.payload.admin
            };
        default:
            return state;
    }
};

export default reducer;