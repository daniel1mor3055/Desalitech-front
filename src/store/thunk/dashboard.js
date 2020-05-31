import {fetchDashboardApi,setDatesApi} from 'api/dashboard';
import {fetchDashboardFail, fetchDashboardStart, fetchDashboardSuccess,setDatesFail,setDatesStart,setDatesSuccess} from '../actions/dashboard';
import {setAdminStatus} from "../actions/admin";


export const fetchDashboard = (systemId) => (
    async (dispatch) => {
        dispatch(fetchDashboardStart());
        try {
            const {
                admin, triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs
            } = await fetchDashboardApi(systemId);
            dispatch(setAdminStatus(admin));
            dispatch(fetchDashboardSuccess(triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs));
        } catch (err) {
            dispatch(fetchDashboardFail(err));
        }
    });


export const setDates = (timeSeries,sysId) => (
    async (dispatch) => {
        dispatch(setDatesStart());
        try {
            const {admin, responseTimeSeries} = await setDatesApi(timeSeries,sysId);
            dispatch(setAdminStatus(admin));
            dispatch(setDatesSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(setDatesFail(err));
        }
    });