import * as actionTypes from '../actionTypes/TagsList/tagsList';

const initialState = {
    tags: [],
    fetching: false,
    error: null,
};

const fetchTagsStart = (state, action) => {
    return {
        ...state,
        fetching: true,
        error: null,
    };
};

const fetchTagsSuccess = (state, action) => {
    return {
        ...state,
        tags: action.tags,
        fetching: false,
        error: null,
    };
};

const fetchTagsFail = (state, action) => {
    return {
        ...state,
        tags: [],
        fetching: false,
        error: action.error,
    };
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TAGS_START:
            return fetchTagsStart(state, action);
        case actionTypes.FETCH_TAGS_SUCCESS:
            return fetchTagsSuccess(state, action);
        case actionTypes.FETCH_TAGS_FAIL:
            return fetchTagsFail(state, action);
        default:
            return state;
    }
};

export default reducer;