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
    fetching: false,
    posting: false,
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


function postTagStart(state, action) {
    return {
        ...state,
        posting: true,
        error: null,
    };
}

function postTagSuccess(state, action) {
    const tagToChange = state.tags.find(tag => tag.tagId === action.payload.tagData.tagId);
    const index = state.tags.indexOf(tagToChange);
    const newTags = state.tags.map(tag => {
        if (tag.tagId !== action.payload.tagData.tagId) {
            return tag;
        } else {
            return {...action.payload.tagData};
        }
    });

    return {
        ...state,
        posting: false,
        error: null,
        tags: newTags,
    };
}

function postTagFail(state, action) {
    return {
        ...state,
        posting: false,
        error: action.payload.error,
    };
}

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