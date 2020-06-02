import {
    FETCH_DASHBOARD_START,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAIL,
    TIME_SERIES_CHANGE_FAIL,
    TIME_SERIES_CHANGE_START,
    TIME_SERIES_CHANGE_SUCCESS,
    GAUGE_CHANGE_FAIL,
    GAUGE_CHANGE_START,
    GAUGE_CHANGE_SUCCESS,
    TAG_CHANGE_FAIL,
    TAG_CHANGE_START,
    TAG_CHANGE_SUCCESS,
    TRIGGER_CHANGE_FAIL,
    TRIGGER_CHANGE_START,
    TRIGGER_CHANGE_SUCCESS,
    SEEQ_CHANGE_FAIL,
    SEEQ_CHANGE_START,
    SEEQ_CHANGE_SUCCESS,
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

export const gaugeChangeStart = () => (
    {
        type: GAUGE_CHANGE_START,
    });

export const gaugeChangeSuccess = (gaugeType, responseGauge) => (
    {
        type: GAUGE_CHANGE_SUCCESS,
        payload: {
            responseGauge,
            gaugeType,
        }
    });

export const gaugeChangeFail = (error) => (
    {
        type: GAUGE_CHANGE_FAIL,
        payload: {
            error
        }
    });

export const tagChangeStart = () => (
    {
        type: TAG_CHANGE_START,
    });

export const tagChangeSuccess = (responseTag) => (
    {
        type: TAG_CHANGE_SUCCESS,
        payload: {
            responseTag,
        }
    });

export const tagChangeFail = (error) => (
    {
        type: TAG_CHANGE_FAIL,
        payload: {
            error
        }
    });

export const triggerChangeStart = () => (
    {
        type: TRIGGER_CHANGE_START,
    });

export const triggerChangeSuccess = (responseTrigger) => (
    {
        type: TRIGGER_CHANGE_SUCCESS,
        payload: {
            responseTrigger,
        }
    });

export const triggerChangeFail = (error) => (
    {
        type: TRIGGER_CHANGE_FAIL,
        payload: {
            error
        }
    });

export const seeqChangeStart = () => (
    {
        type: SEEQ_CHANGE_START,
    });

export const seeqChangeSuccess = (responseSeeq) => (
    {
        type: SEEQ_CHANGE_SUCCESS,
        payload: {
            responseSeeq,
        }
    });

export const seeqChangeFail = (error) => (
    {
        type: SEEQ_CHANGE_FAIL,
        payload: {
            error
        }
    });