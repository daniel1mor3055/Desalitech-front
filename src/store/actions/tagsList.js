import * as actionTypes from '../actionTypes/TagsList/tagsList';
import axios from 'axios';

export const fetchTagsStart = () => {
    return {
        type: actionTypes.FETCH_TAGS_START,
    };
};
export const fetchTagsSuccess = (tags) => {
    return {
        type: actionTypes.FETCH_TAGS_SUCCESS,
        tags: tags,
    };
};
export const fetchTagsFail = (error) => {
    return {
        type: actionTypes.FETCH_TAGS_FAIL,
        error: error
    };
};


// systemId should be 'IL_OFFICE_TEST' or 'IL_OFFICE_TEST_2' for now
export const fetchTags = (getTokenSilently, getIdTokenClaims, systemId) => {
    return async (dispatch) => {
        dispatch(fetchTagsStart());
        try {
            const token = await getTokenSilently();
            const idtoken = await getIdTokenClaims();

            let url = new URL("https://desalistage.eastus2.cloudapp.azure.com/api/system/tag-list");
            let param = {sysid: systemId};

            url.search = new URLSearchParams(param).toString();

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    UserIdToken: `Id ${idtoken.__raw}`
                }
            });
            let tags = response.data.tags;
            if (tags.length > 15) {
                tags = tags.slice(0, 15);
            }
            dispatch(fetchTagsSuccess(tags));
        } catch (err) {
            dispatch(fetchTagsFail(err));
        }
    };
};


