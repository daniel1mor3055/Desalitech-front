import {fetchPollingApi} from 'api/polling';
import {fetchPollingSuccess, fetchPollingFail, fetchPollingStart} from "../actions/polling";
import {fetchDashboardPollingSuccess, fetchDashboardStart} from '../actions/dashboard';
import {getWidgetsByType} from "api/dashboard";
import {setAdminStatus} from "../actions/admin";

export const fetchPolling = () => (
    async (dispatch) => {
        dispatch(fetchPollingStart());
        try {
            const {activeAlarms, systemsStatus, dashboardData} = await fetchPollingApi();
            if (dashboardData) {
                const {admin, widgets} = dashboardData;
                const {
                    triggers, tags, middleGauges,
                    rightGauges, leftGauges
                } = getWidgetsByType(widgets);
                dispatch(setAdminStatus(admin));
                dispatch(fetchDashboardPollingSuccess(triggers, tags, middleGauges,
                    rightGauges, leftGauges));
            }
            dispatch(fetchPollingSuccess(activeAlarms, systemsStatus));
        } catch (err) {
            dispatch(fetchPollingFail(err));
        }
    });