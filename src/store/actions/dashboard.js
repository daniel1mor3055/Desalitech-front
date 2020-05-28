import {FETCH_DASHBOARD_START, FETCH_DASHBOARD_SUCCESS, FETCH_DASHBOARD_FAIL} from '../actionTypes/dashboard';

export const fetchDashboardStart = () => (
    {
        type: FETCH_DASHBOARD_START,
    });

export const fetchDashboardSuccess = (triggers, tags, gauges, timeSeries,middleGauges,rightGauges, seeqs) => (
    {
        type: FETCH_DASHBOARD_SUCCESS,
        payload: {
            triggers,
            tags,
            gauges,
            timeSeries,
            middleGauges,
            rightGauges,
            seeqs,
        }
    });

export const fetchDashboardFail = (error) => (
    {
        type: FETCH_DASHBOARD_FAIL,
        payload: {
            error
        }
    });


