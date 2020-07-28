import { fetchAlarmsApi, setEmailNotificationApi } from 'api/alarmsList';
import {
    fetchAlarmsFail,
    fetchAlarmsStart,
    fetchAlarmsSuccess,
    setEmailNotificationFail,
    setEmailNotificationStart,
    setEmailNotificationSuccess
} from '../actions/alarmsList';
import { setAdminStatus } from '../actions/header';
import createNotification, { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION } from "app/components/Notifications";


export const fetchAlarms = () => (
    async (dispatch) => {
        dispatch(fetchAlarmsStart());
        try {
            const { alarms, admin, emailNotification } = await fetchAlarmsApi();
            dispatch(setAdminStatus(admin));
            dispatch(fetchAlarmsSuccess(alarms, emailNotification));
        } catch (err) {
            dispatch(fetchAlarmsFail(err));
        }
    });

export const setEmailNotification = (emailNotification) => (
    async (dispatch) => {
        dispatch(setEmailNotificationStart());
        try {
            await setEmailNotificationApi(emailNotification);
            dispatch(setEmailNotificationSuccess(emailNotification));
            createNotification(SUCCESS_NOTIFICATION, `Email Notifications ${emailNotification ? 'Activated' : 'Deactivated'}`, "Edit Notifications Request");
        } catch (err) {
            dispatch(setEmailNotificationFail);
            createNotification(ERROR_NOTIFICATION, "Edit Notifications Failure", "Edit Notifications Request");
        }
    }
);