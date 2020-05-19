import axios from 'axios';
import {camelizeArrayOfObjects, camelizeObjectKeys} from './utils';

export const fetchAlarmsApi = async (systemId) => {
    try {
        const response = await axios.get(`/system/alarm-list?SysId=${systemId}`);
        camelizeObjectKeys(response.data);
        camelizeArrayOfObjects(response.data.alarms);
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
};


