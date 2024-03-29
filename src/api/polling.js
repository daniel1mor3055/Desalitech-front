import axios from 'axios';
import { camelizeJson, extractSystemId, dashboardIsCurrentLocation, pollAllSystems, handleApiError } from './utils';

export const fetchPollingApi = async () => {
    const sysId = extractSystemId();
    const dashboardFlag = dashboardIsCurrentLocation();
    const pollAllSystemsFlag = pollAllSystems();
    const getAddress = pollAllSystemsFlag ? '/polling' : `/system/polling?SysId=${sysId}&Dashboard=${dashboardFlag}`;
    try {
        const response = await axios.get(getAddress);
        camelizeJson(response.data);
        response.data.activeAlarms.forEach(activeAlarm => {
            const { alarmId, timeStamp, sysId } = activeAlarm;
            activeAlarm.id = alarmId + timeStamp + sysId;
        });
        return response.data;
    } catch (err) {
        handleApiError(err);
    }
};