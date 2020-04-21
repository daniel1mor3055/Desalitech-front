import axios from 'axios';
import { camelizeJson, capitalizeJson, extractSystemId, handleApiError } from "./utils";
import { AXIOS_TIMEOUT } from 'constants/globalConstats';


export const fetchTagsApi = async () => {
    const sysId = extractSystemId();
    try {
        const response = await axios.get(`/system/tag-list?SysId=${sysId}`);
        camelizeJson(response.data);
        return response.data;
    } catch (err) {
        handleApiError(err);
    }
};

export const postTagApi = async (tagData) => {
    const sysId = extractSystemId();
    try {
        const tagDataToPass = {
            sysId,
            ...tagData
        };
        capitalizeJson(tagDataToPass);
        const response = await axios.post(`/system/tag-list`, tagDataToPass,AXIOS_TIMEOUT);
        return response;
    } catch (err) {
        handleApiError(err);
    }
};