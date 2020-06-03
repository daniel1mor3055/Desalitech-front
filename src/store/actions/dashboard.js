import {
    FETCH_DASHBOARD_START,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAIL,
    TIME_SERIES_CHANGE_FAIL,
    TIME_SERIES_CHANGE_START,
    TIME_SERIES_CHANGE_SUCCESS,
    FETCH_DASHBOARD_POLLING_SUCCESS
} from '../actionTypes/dashboard';


export const fetchDashboardStart = () => (
    {
        type: FETCH_DASHBOARD_START,
    });

export const fetchDashboardSuccess = (triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs) => (
    {
        type: FETCH_DASHBOARD_SUCCESS,
        payload: {
            triggers,
            tags,
            gauges,
            timeSeries,
            middleGauges,
            rightGauges,
            leftGauges,
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


export const fetchDashboardPollingSuccess = (triggers, tags, middleGauges, rightGauges, leftGauges) => (
    {
        type: FETCH_DASHBOARD_POLLING_SUCCESS,
        payload: {
            triggers,
            tags,
            middleGauges,
            rightGauges,
            leftGauges,
        }
    });



export const timeSeriesChangeStart = () => (
    {
        type: TIME_SERIES_CHANGE_START,
    });

export const timeSeriesChangeSuccess = (responseTimeSeries) => (
    {
        type: TIME_SERIES_CHANGE_SUCCESS,
        payload: {
            responseTimeSeries,
        }
    });

export const timeSeriesChangeFail = (error) => (
    {
        type: TIME_SERIES_CHANGE_FAIL,
        payload: {
            error
        }
    });

