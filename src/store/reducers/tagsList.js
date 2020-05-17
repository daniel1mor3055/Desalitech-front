import {FETCH_TAGS_START, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAIL} from '../actionTypes/tagsList';

const initialState = {
    tags: [],
    fetching: false,
    error: null,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TAGS_START:
            return fetchTagsStart(state, action);
        case FETCH_TAGS_SUCCESS:
            return fetchTagsSuccess(state, action);
        case FETCH_TAGS_FAIL:
            return fetchTagsFail(state, action);
        default:
            return state;
    }
};

function fetchTagsStart(state, action) {
    return {
        ...state,
        fetching: true,
        error: null,
    };
}

function fetchTagsSuccess(state, action) {
    return {
        ...state,
        tags: action.payload.tags,
        fetching: false,
        error: null,
    };
}

function fetchTagsFail(state, action) {
    return {
        ...state,
        tags: [],
        fetching: false,
        error: action.payload.error,
    };
}


export default reducer;