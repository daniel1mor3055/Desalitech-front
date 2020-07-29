import {
    FETCH_TAGS_START,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_FAIL,
    POST_TAG_SUCCESS,
    POST_TAG_START,
    POST_TAG_FAIL
} from '../actionTypes/tagsList';

const initialState = {
    tags: [],
    fetching: true,
    posting: false,
    error: null,
    postingError: null,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TAGS_START:
            return fetchTagsStart(state, action);
        case FETCH_TAGS_SUCCESS:
            return fetchTagsSuccess(state, action);
        case FETCH_TAGS_FAIL:
            return fetchTagsFail(state, action);
        case POST_TAG_START:
            return postTagStart(state, action);
        case POST_TAG_FAIL:
            return postTagFail(state, action);
        case POST_TAG_SUCCESS:
            return postTagSuccess(state, action);
        default:
            return state;
    }
};


function postTagStart(state) {
    return {
        ...state,
        posting: true,
        postingError: null,
    };
}

function postTagSuccess(state, action) {
    const newTags = state.tags.map(tag => {
        if (tag.tagId !== action.payload.tagData.tagId) {
            return tag;
        } else {
            return action.payload.tagData;
        }
    });

    return {
        ...state,
        posting: false,
        postingError: null,
        tags: newTags,
    };
}

function postTagFail(state, action) {
    return {
        ...state,
        posting: false,
        postingError: action.payload.error.message,
    };
}

function fetchTagsStart(state) {
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
        fetching: false,
        error: action.payload.error.message,
    };
}


export default reducer;