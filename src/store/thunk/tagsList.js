import {fetchTagsApi, postTagApi} from 'api/tagsList';
import {
    fetchTagsFail,
    fetchTagsStart,
    fetchTagsSuccess,
    postTagFail,
    postTagStart,
    postTagSuccess
} from '../actions/tagsList';
import createNotification, {SUCCESS_NOTIFICATION, ERROR_NOTIFICATION} from 'app/components/Notifications';
import {setAdminStatus} from "../actions/admin";


export const fetchTags = () => (
    async (dispatch) => {
        dispatch(fetchTagsStart());
        try {
            const {tags,admin} = await fetchTagsApi();
            dispatch(setAdminStatus(admin));
            dispatch(fetchTagsSuccess(tags));
        } catch (err) {
            dispatch(fetchTagsFail(err));
        }
    });

export const postTag = (tagData) => (
    async (dispatch) => {
        dispatch(postTagStart());
        try {
            const response = await postTagApi(tagData);
            dispatch(postTagSuccess(tagData));
            createNotification(SUCCESS_NOTIFICATION, "Tag Edited Successfully", "Edit Tag Request");
        } catch (err) {
            dispatch(postTagFail(err));
            createNotification(ERROR_NOTIFICATION, "Tag Edit Failure", "Edit Tag Request");
        }
    });


