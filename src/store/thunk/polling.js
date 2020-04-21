import { fetchPollingApi } from 'api/polling';
import { fetchPollingFail, fetchPollingStart, fetchPollingSuccess } from "../actions/polling";
import { fetchDashboardPollingSuccess } from '../actions/dashboard';
import { getWidgetsByType } from "api/dashboard";
import { setAdminStatus } from "../actions/header";
import createNotification, { WARNING_NOTIFICATION } from 'app/components/Notifications';

export const fetchPolling = () => (
    async (dispatch) => {
        dispatch(fetchPollingStart());
        try {
            const { activeAlarms, systemsStatus, dashboardData } = await fetchPollingApi();
            if (dashboardData) {
                const { admin, widgets } = dashboardData;
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
            createNotification(WARNING_NOTIFICATION, "Connection to server failed", "Live Updates");
        }
    });