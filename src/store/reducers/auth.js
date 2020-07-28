import { STORE_TOKEN } from '../actionTypes/auth';

const initialState = {
    accessToken: null,
    idToken: null,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TOKEN:
            return setToken(state, action);
        default:
            return state;
    }
};

function setToken(state, action) {
    return {
        ...state,
        accessToken: action.payload.accessToken,
        idToken: action.payload.idToken,
    };
}


export default reducer;