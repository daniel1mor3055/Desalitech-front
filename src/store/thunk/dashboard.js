import {fetchDashboardApi, timeSeriesChangeApi} from 'api/dashboard';
import {fetchTags} from './tagsList';
import {
    fetchDashboardFail,
    fetchDashboardStart,
    fetchDashboardSuccess,
    timeSeriesChangeFail,
    timeSeriesChangeStart,
    timeSeriesChangeSuccess,
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

export const timeSeriesChange = (timeSeries) => (
    async (dispatch) => {
        dispatch(timeSeriesChangeStart());
        try {
            const {admin, responseTimeSeries} = await timeSeriesChangeApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(timeSeriesChangeSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(timeSeriesChangeFail(err));
        }
    });