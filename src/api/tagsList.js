import axios from 'axios';
import {camelizeJson, capitalizeObjectKeys} from "./utils";

export const fetchTagsApi = async (systemId) => {
    try {
        const response = await axios.get(`/system/tag-list?SysId=${systemId}`);
        camelizeJson(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const postTagApi = async (systemId, tagData) => {
    try {
        const tagDataToPass = {
            sysId: systemId,
            ...tagData
        };
        capitalizeObjectKeys(tagDataToPass);
        const response = await axios.post(`/system/tag-list`, tagDataToPass);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};