import {fetchAlarmsApi} from 'api/alarmsList';
import {fetchAlarmsFail, fetchAlarmsStart, fetchAlarmsSuccess} from '../actions/alarmsList';


export const fetchAlarms = (systemId) => (
    async (dispatch) => {
        dispatch(fetchAlarmsStart());
        try {
            const response = await fetchAlarmsApi(systemId);

            let alarms = response.data.alarms;
            if (alarms.length > 15) {
                alarms = alarms.slice(0, 15);
            }
            dispatch(fetchAlarmsSuccess(alarms));
        } catch (err) {
            dispatch(fetchAlarmsFail(err));
        }
    });