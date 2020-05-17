import {FETCH_ALARMS_START, FETCH_ALARMS_SUCCESS, FETCH_ALARMS_FAIL} from '../actionTypes/alarmsList';

export const fetchAlarmsStart = () => (
    {
        type: FETCH_ALARMS_START,
    });
export const fetchAlarmsSuccess = (alarms) => (
    {
        type: FETCH_ALARMS_SUCCESS,
        payload: {
            alarms
        }
    });
export const fetchAlarmsFail = (error) => (
    {
        type: FETCH_ALARMS_FAIL,
        payload: {
            error
        }
    });


