import {
    FETCH_DASHBOARD_SUCCESS,
    TIME_SERIES_CHANGE_SUCCESS,
    GAUGE_CHANGE_SUCCESS,
    TAG_CHANGE_SUCCESS,
    TRIGGER_CHANGE_SUCCESS,
    SEEQ_CHANGE_SUCCESS,
    FETCH_DASHBOARD_POLLING_SUCCESS,
    TIME_SERIES_ADD_SUCCESS,
    GAUGE_ADD_SUCCESS,
    TAG_ADD_SUCCESS,
    TRIGGER_ADD_SUCCESS,
    SEEQ_ADD_SUCCESS,
    SEEQ_DELETE_SUCCESS,
    TAG_DELETE_SUCCESS,
    GAUGE_DELETE_SUCCESS,
    TIME_SERIES_DELETE_SUCCESS,
    TRIGGER_DELETE_SUCCESS,
    DASHBOARD_FETCH_FAIL,
    DASHBOARD_FETCH_START,
    DASHBOARD_POST_FAIL,
    DASHBOARD_POST_START
} from '../actionTypes/dashboard';

export const dashboardFetchStart = () => (
    {
        type: DASHBOARD_FETCH_START,
    }
);

export const dashboardFetchFail = (error) => (
    {
        type: DASHBOARD_FETCH_FAIL,
        payload: {
            error
        }
    }
);

export const dashboardPostStart = () => (
    {
        type: DASHBOARD_POST_START,
    }
);

export const dashboardPostFail = (error) => (
    {
        type: DASHBOARD_POST_FAIL,
        payload: {
            error
        }
    }
);

export const fetchDashboardSuccess = (triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs, currentPlacement) => (
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
            currentPlacement,
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

export const timeSeriesChangeSuccess = (responseTimeSeries) => (
    {
        type: TIME_SERIES_CHANGE_SUCCESS,
        payload: {
            responseTimeSeries,
        }
    });

export const timeSeriesAddSuccess = (responseTimeSeries) => (
    {
        type: TIME_SERIES_ADD_SUCCESS,
        payload: {
            responseTimeSeries,
        }
    });

export const gaugeChangeSuccess = (gaugeType, responseGauge) => (
    {
        type: GAUGE_CHANGE_SUCCESS,
        payload: {
            responseGauge,
            gaugeType,
        }
    });

export const gaugeAddSuccess = (gaugeType, responseGauge) => (
    {
        type: GAUGE_ADD_SUCCESS,
        payload: {
            responseGauge,
            gaugeType,
        }
    });

export const tagChangeSuccess = (responseTag) => (
    {
        type: TAG_CHANGE_SUCCESS,
        payload: {
            responseTag,
        }
    });


export const tagDeleteSuccess = (responseTag) => (
    {
        type: TAG_DELETE_SUCCESS,
        payload: {
            responseTag,
        }
    });

export const tagAddSuccess = (responseTag) => (
    {
        type: TAG_ADD_SUCCESS,
        payload: {
            responseTag,
        }
    });

export const triggerChangeSuccess = (responseTrigger) => (
    {
        type: TRIGGER_CHANGE_SUCCESS,
        payload: {
            responseTrigger,
        }
    });

export const triggerDeleteSuccess = (responseTrigger) => (
    {
        type: TRIGGER_DELETE_SUCCESS,
        payload: {
            responseTrigger,
        }
    });

export const timeSeriesDeleteSuccess = (responseTimeSeries) => (
    {
        type: TIME_SERIES_DELETE_SUCCESS,
        payload: {
            responseTimeSeries,
        }
    });

export const gaugeDeleteSuccess = (gaugeType, responseGauge) => (
    {
        type: GAUGE_DELETE_SUCCESS,
        payload: {
            responseGauge,
            gaugeType,
        }
    });

export const triggerAddSuccess = (responseTrigger) => (
    {
        type: TRIGGER_ADD_SUCCESS,
        payload: {
            responseTrigger,
        }
    });

export const seeqChangeSuccess = (responseSeeq) => (
    {
        type: SEEQ_CHANGE_SUCCESS,
        payload: {
            responseSeeq,
        }
    });

export const seeqAddSuccess = (responseSeeq) => (
    {
        type: SEEQ_ADD_SUCCESS,
        payload: {
            responseSeeq,
        }
    });

export const seeqDeleteSuccess = (responseSeeq) => (
    {
        type: SEEQ_DELETE_SUCCESS,
        payload: {
            responseSeeq,
        }
    });