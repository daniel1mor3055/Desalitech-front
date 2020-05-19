import {fetchAlarmsApi} from 'api/alarmsList';
import {fetchAlarmsFail, fetchAlarmsStart, fetchAlarmsSuccess} from '../actions/alarmsList';


export const fetchAlarms = (systemId) => (
    async (dispatch) => {
        dispatch(fetchAlarmsStart());
        try {
            const {alarms} = await fetchAlarmsApi(systemId);
            dispatch(fetchAlarmsSuccess(alarms));
        } catch (err) {
            dispatch(fetchAlarmsFail(err));
        }
    });