import * as actionTypes from '../actionTypes/AlarmsList/alarmsList';
import axios from 'axios';

export const fetchAlarmsStart = () => {
    return {
        type: actionTypes.FETCH_ALARMS_START,
    };
};
export const fetchAlarmsSuccess = (alarms) => {
    return {
        type: actionTypes.FETCH_ALARMS_SUCCESS,
        alarms: alarms,
    };
};
export const fetchAlarmsFail = (error) => {
    return {
        type: actionTypes.FETCH_ALARMS_FAIL,
        error: error
    };
};


// systemId should be 'IL_OFFICE_TEST' or 'IL_OFFICE_TEST_2' for now
export const fetchAlarms = (getTokenSilently, getIdTokenClaims, systemId) => {
    return async (dispatch) => {
        dispatch(fetchAlarmsStart());
        try {
            const token = await getTokenSilently();
            const idtoken = await getIdTokenClaims();
            let url = new URL("https://desalistage.eastus2.cloudapp.azure.com/api/system/alarm-list");
            let param = {sysid: systemId};

            url.search = new URLSearchParams(param).toString();
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    UserIdToken: `Id ${idtoken.__raw}`
                }
            });
            let alarms = response.data.alarms;
            if (alarms.length > 15) {
                alarms = alarms.slice(0, 15);
            }
            dispatch(fetchAlarmsSuccess(alarms));
        } catch (err) {
            dispatch(fetchAlarmsFail(err));
        }
    };
};


