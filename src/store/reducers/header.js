import {
    SET_ADMIN_STATUS,
    FETCH_SYSTEM_NAME_SUCCESS,
    FETCH_SYSTEM_NAME_START,
    FETCH_SYSTEM_NAME_FAIL,
    SET_SYSTEM_NAME
} from '../actionTypes/header';

const initialState = {
    admin: false,
    systemName: '',
    fetching: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADMIN_STATUS:
            return setAdminStatus(state, action);
        case FETCH_SYSTEM_NAME_START:
            return fetchSystemNameStart(state);
        case FETCH_SYSTEM_NAME_SUCCESS:
            return fetchSystemNameSuccess(state, action);
        case FETCH_SYSTEM_NAME_FAIL:
            return fetchSystemNameFail(state, action);
        case SET_SYSTEM_NAME:
            return setSystemName(state, action);
        default:
            return state;
    }
};

function fetchSystemNameStart(state) {
    return {
        ...state,
        fetching: true,
        error: null,
    };
}

function fetchSystemNameSuccess(state, action) {
    return {
        ...state,
        systemName: action.payload.systemName,
        fetching: false,
        error: null,
    };
}

function fetchSystemNameFail(state, action) {
    return {
        ...state,
        fetching: false,
        error: action.payload.error,
    };
}

function setAdminStatus(state, action) {
    return {
        ...state,
        admin: action.payload.admin
    };
}

function setSystemName(state, action) {
    return fetchSystemNameSuccess(state, action);
}

export default reducer;