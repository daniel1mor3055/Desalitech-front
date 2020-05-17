import {FETCH_TAGS_START, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAIL} from '../actionTypes/tagsList';

export const fetchTagsStart = () => (
    {
        type: FETCH_TAGS_START,
    });
export const fetchTagsSuccess = (tags) => (
    {
        type: FETCH_TAGS_SUCCESS,
        payload: {
            tags
        }
    });
export const fetchTagsFail = (error) => (
    {
        type: FETCH_TAGS_FAIL,
        payload: {
            error
        }
    });





