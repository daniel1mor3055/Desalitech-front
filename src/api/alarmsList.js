import axios from 'axios';
import { camelizeJson, capitalizeJson, extractSystemId } from './utils';


export const fetchAlarmsApi = async () => {
    const sysId = extractSystemId();
    try {
        const response = await axios.get(`/system/alarm-list?SysId=${sysId}`);
        camelizeJson(response.data);
        response.data.alarms.forEach(alarm => {
            const { alarmId, timeStamp } = alarm;
            alarm.id = alarmId + timeStamp;
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};


export const setEmailNotificationApi = async (emailNotification) => {
    const sysId = extractSystemId();
    try {
        const dataToPass = {
            sysId,
            emailNotification: emailNotification,
        };
        capitalizeJson(dataToPass);
        const response = await axios.post(`/system/alarm-list`, dataToPass);
        return response;
    } catch (err) {
        camelizeJson(err.response);
        throw err.response;
    }
};