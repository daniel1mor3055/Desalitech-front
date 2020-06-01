import {fetchDashboardApi, setDatesApi} from 'api/dashboard';
import {fetchTags} from './tagsList';
import {
    fetchDashboardFail,
    fetchDashboardStart,
    fetchDashboardSuccess,
    setDatesFail,
    setDatesStart,
    setDatesSuccess
} from '../actions/dashboard';
import {setAdminStatus} from "../actions/admin";


export const fetchDashboard = () => (
    async (dispatch) => {
        dispatch(fetchDashboardStart());
        try {
            const {
                admin, triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs
            } = await fetchDashboardApi();
            dispatch(setAdminStatus(admin));
            dispatch(fetchDashboardSuccess(triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs));
        } catch (err) {
            dispatch(fetchDashboardFail(err));
        }
    });

export const fetchBackgroundTags = () => (fetchTags());

export const setDates = (timeSeries) => (
    async (dispatch) => {
        dispatch(setDatesStart());
        try {
            const {admin, responseTimeSeries} = await setDatesApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(setDatesSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(setDatesFail(err));
        }
    });