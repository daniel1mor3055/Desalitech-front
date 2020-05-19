import {fetchTagsApi, postTagApi} from 'api/tagsList';
import {
    fetchTagsFail,
    fetchTagsStart,
    fetchTagsSuccess,
    postTagFail,
    postTagStart,
    postTagSuccess
} from '../actions/tagsList';


export const fetchTags = (systemId) => (
    async (dispatch) => {
        dispatch(fetchTagsStart());
        try {
            const {tags} = await fetchTagsApi(systemId);
            dispatch(fetchTagsSuccess(tags));
        } catch (err) {
            dispatch(fetchTagsFail(err));
        }
    });

export const postTag = (systemId, tagData) => (
    async (dispatch) => {
        dispatch(postTagStart());
        try {
            const response = await postTagApi(systemId,tagData);
            dispatch(postTagSuccess(response,tagData));
        } catch (err) {
            dispatch(postTagFail(err));
        }
    });

