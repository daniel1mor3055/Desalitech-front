import axios from 'axios';
import { camelizeJson, capitalizeJson, extractSystemId } from "./utils";


export const fetchTagsApi = async () => {
    const sysId = extractSystemId();
    try {
        const response = await axios.get(`/system/tag-list?SysId=${sysId}`);
        camelizeJson(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
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
        const response = await axios.post(`/system/tag-list`, tagDataToPass);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};