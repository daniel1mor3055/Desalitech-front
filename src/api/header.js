import axios from 'axios';
import { camelizeJson, extractSystemId } from './utils';


export const fetchSystemNameApi = async () => {
    const sysId = extractSystemId();
    if (sysId == null || sysId === 'null') {
        return null;
    }
    try {
        const response = await axios.get(`/system/info?SysId=${sysId}`);
        camelizeJson(response.data);
        return response.data;
    } catch (err) {
        throw err;
    }
};
