import axios from 'axios';
import {camelizeJson, capitalizeJson} from './utils';

export const fetchAlarmsApi = async (systemId) => {
    try {
        const response = await axios.get(`/system/alarm-list?SysId=${systemId}`);
        camelizeJson(response.data);
        response.data.alarms.forEach(alarm => {
            const {alarmId, timeStamp} = alarm;
            alarm.id = alarmId + timeStamp;
        });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};


export const setEmailNotificationApi = async (systemId, emailNotification) => {
    try {
        const dataToPass = {
            sysId: systemId,
            emailNotification: emailNotification ? 'true' : 'false',
        };
        capitalizeJson(dataToPass);
        const response = await axios.post(`/system/alarm-list`, dataToPass);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};