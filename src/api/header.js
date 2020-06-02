import axios from 'axios';
import {camelizeJson, extractSystemId} from './utils';


export const fetchSystemNameApi = async () => {
    const sysId = extractSystemId();
    try {
        const response = await axios.get(`/system/info?SysId=${sysId}`);
        camelizeJson(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
