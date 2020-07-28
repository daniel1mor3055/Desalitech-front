import axios from 'axios';
import { camelizeJson, capitalizeJson, extractSystemId } from "./utils";
import { AXIOS_TIMEOUT } from 'constants/globalConstats';


export const fetchTagsApi = async () => {
    const sysId = extractSystemId();
    try {
        const response = await axios.get(`/system/tag-list?SysId=${sysId}`);
        camelizeJson(response.data);
        return response.data;
    } catch (err) {
        if (err.hasOwnProperty('response')) {
            camelizeJson(err.response);
            throw {
                message: err.response.data.code,
            };
        } else {
            throw err;
        }
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
        if (err.hasOwnProperty('response')) {
            camelizeJson(err.response);
            throw {
                message: err.response.data.code,
            };
        } else {
            throw err;
        }
    }
};