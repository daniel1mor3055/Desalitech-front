import axios from 'axios';
import {camelizeJson} from './utils';

export const fetchPollingApi = async () => {
    try {
        const response = await axios.get('/polling');
        camelizeJson(response.data);
        response.data.activeAlarms.forEach(activeAlarm => {
            const {alarmId, timeStamp, sysId} = activeAlarm;
            activeAlarm.id = alarmId + timeStamp + sysId;
        });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};