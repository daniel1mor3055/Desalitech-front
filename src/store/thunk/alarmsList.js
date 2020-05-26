import {fetchAlarmsApi,setEmailNotificationApi} from 'api/alarmsList';
import {
    fetchAlarmsFail,
    fetchAlarmsStart,
    fetchAlarmsSuccess,
    setEmailNotificationFail,
    setEmailNotificationStart,
    setEmailNotificationSuccess
} from '../actions/alarmsList';
import {setAdminStatus} from '../actions/admin';


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
            // should notify success to the user
        } catch (err) {
            dispatch(setEmailNotificationFail);
        }
    }
);