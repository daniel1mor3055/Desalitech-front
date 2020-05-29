import {fetchAlarmsApi, setEmailNotificationApi} from 'api/alarmsList';
import {
    fetchAlarmsFail,
    fetchAlarmsStart,
    fetchAlarmsSuccess,
    setEmailNotificationFail,
    setEmailNotificationStart,
    setEmailNotificationSuccess
} from '../actions/alarmsList';
import {setAdminStatus} from '../actions/admin';
import createNotification, {SUCCESS_NOTIFICATION, ERROR_NOTIFICATION} from "app/components/Notifications";


export const fetchAlarms = (systemId) => (
    async (dispatch) => {
        dispatch(fetchAlarmsStart());
        try {
            const {alarms, admin, emailNotification} = await fetchAlarmsApi(systemId);
            dispatch(setAdminStatus(admin));
            dispatch(fetchAlarmsSuccess(alarms, emailNotification));
        } catch (err) {
            dispatch(fetchAlarmsFail(err));
        }
    });

export const setEmailNotification = (systemId, emailNotification) => (
    async (dispatch) => {
        dispatch(setEmailNotificationStart());
        try {
            const response = await setEmailNotificationApi(systemId, emailNotification);
            dispatch(setEmailNotificationSuccess(emailNotification));
            createNotification(SUCCESS_NOTIFICATION, `Email Notifications ${emailNotification ? 'Activated' : 'Deactivated'}`, "Edit Notifications Request");
        } catch (err) {
            dispatch(setEmailNotificationFail);
            createNotification(ERROR_NOTIFICATION, "Edit Notifications Failure", "Edit Notifications Request");
        }
    }
);