import {fetchTagsApi} from 'api/tagsList';
import {fetchTagsFail, fetchTagsStart, fetchTagsSuccess} from '../actions/tagsList';


export const fetchTags = (systemId) => (
    async (dispatch) => {
        dispatch(fetchTagsStart());
        try {
            const response = await fetchTagsApi(systemId);

            let tags = response.data.tags;
            if (tags.length > 15) {
                tags = tags.slice(0, 15);
            }
            dispatch(fetchTagsSuccess(tags));
        } catch (err) {
            dispatch(fetchTagsFail(err));
        }
    });