import {
    FETCH_TAGS_START,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_FAIL,
    POST_TAG_FAIL,
    POST_TAG_START,
    POST_TAG_SUCCESS
} from '../actionTypes/tagsList';

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

export const postTagStart = () => (
    {
        type: POST_TAG_START,
    });

export const postTagSuccess = (response,tagData) => (
    {
        type: POST_TAG_SUCCESS,
        payload: {
            response,
            tagData,
        }
    });

export const postTagFail = (error) => (
    {
        type: POST_TAG_FAIL,
        payload: {
            error
        }
    });


