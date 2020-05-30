import {fetchDashboardApi} from 'api/dashboard';
import {fetchDashboardFail, fetchDashboardStart, fetchDashboardSuccess} from '../actions/dashboard';
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