import {
    FETCH_ALARMS_START,
    FETCH_ALARMS_SUCCESS,
    FETCH_ALARMS_FAIL,
    SET_EMAIL_NOTIFICATION_SUCCESS,
    SET_EMAIL_NOTIFICATION_START,
    SET_EMAIL_NOTIFICATION_FAIL
} from '../actionTypes/alarmsList';

export const fetchAlarmsStart = () => (
    {
        type: FETCH_ALARMS_START,
    });

export const fetchAlarmsSuccess = (alarms, emailNotification) => (
    {
        type: FETCH_ALARMS_SUCCESS,
        payload: {
            alarms,
            emailNotification,
        }
    });

export const fetchAlarmsFail = (error) => (
    {
        type: FETCH_ALARMS_FAIL,
        payload: {
            error
        }
    });

export const setEmailNotificationStart = () => (
    {
        type: SET_EMAIL_NOTIFICATION_START,
    });

export const setEmailNotificationSuccess = (emailNotification) => (
    {
        type: SET_EMAIL_NOTIFICATION_SUCCESS,
        payload: {
            emailNotification,
        }
    });

export const setEmailNotificationFail = (error) => (
    {
        type: SET_EMAIL_NOTIFICATION_FAIL,
        payload: {
            error
        }
    });


