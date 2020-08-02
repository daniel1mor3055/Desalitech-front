import axios from 'axios';
import { camelizeJson, capitalizeJson, extractSystemId, handleApiError } from './utils';
import { AXIOS_TIMEOUT } from 'constants/globalConstats';


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
        handleApiError(err);
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
        const response = await axios.post(`/system/alarm-list`, dataToPass, AXIOS_TIMEOUT);
        return response;
    } catch (err) {
        handleApiError(err);
    }
};