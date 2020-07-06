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
    FETCH_DASHBOARD_POLLING_SUCCESS,
    TIME_SERIES_ADD_FAIL,
    TIME_SERIES_ADD_START,
    TIME_SERIES_ADD_SUCCESS,
    GAUGE_ADD_FAIL,
    GAUGE_ADD_START,
    GAUGE_ADD_SUCCESS,
    TAG_ADD_FAIL,
    TAG_ADD_START,
    TAG_ADD_SUCCESS,
    TRIGGER_ADD_FAIL,
    TRIGGER_ADD_START,
    TRIGGER_ADD_SUCCESS,
    SEEQ_ADD_FAIL,
    SEEQ_ADD_START,
    SEEQ_ADD_SUCCESS,
    SEEQ_DELETE_FAIL,
    SEEQ_DELETE_START,
    SEEQ_DELETE_SUCCESS,
    TAG_DELETE_FAIL,
    TAG_DELETE_START,
    TAG_DELETE_SUCCESS,
    GAUGE_DELETE_FAIL,
    GAUGE_DELETE_START,
    GAUGE_DELETE_SUCCESS,
    TIME_SERIES_DELETE_FAIL,
    TIME_SERIES_DELETE_START,
    TIME_SERIES_DELETE_SUCCESS,
    TRIGGER_DELETE_FAIL,
    TRIGGER_DELETE_START,
    TRIGGER_DELETE_SUCCESS,
} from '../actionTypes/dashboard';


export const fetchDashboardStart = () => (
    {
        type: FETCH_DASHBOARD_START,
    });

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

export const timeSeriesAddStart = () => (
    {
        type: TIME_SERIES_ADD_START,
    });

export const timeSeriesAddSuccess = (responseTimeSeries) => (
    {
        type: TIME_SERIES_ADD_SUCCESS,
        payload: {
            responseTimeSeries,
        }
    });

export const timeSeriesAddFail = (error) => (
    {
        type: TIME_SERIES_ADD_FAIL,
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

export const gaugeAddStart = () => (
    {
        type: GAUGE_ADD_START,
    });

export const gaugeAddSuccess = (gaugeType, responseGauge) => (
    {
        type: GAUGE_ADD_SUCCESS,
        payload: {
            responseGauge,
            gaugeType,
        }
    });

export const gaugeAddFail = (error) => (
    {
        type: GAUGE_ADD_FAIL,
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

export const tagDeleteStart = () => (
    {
        type: TAG_DELETE_START,
    });

export const tagDeleteSuccess = (responseTag) => (
    {
        type: TAG_DELETE_SUCCESS,
        payload: {
            responseTag,
        }
    });

export const tagDeleteFail = (error) => (
    {
        type: TAG_DELETE_FAIL,
        payload: {
            error
        }
    });

export const tagAddStart = () => (
    {
        type: TAG_ADD_START,
    });

export const tagAddSuccess = (responseTag) => (
    {
        type: TAG_ADD_SUCCESS,
        payload: {
            responseTag,
        }
    });

export const tagAddFail = (error) => (
    {
        type: TAG_ADD_FAIL,
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

export const triggerDeleteStart = () => (
    {
        type: TRIGGER_DELETE_START,
    });

export const triggerDeleteSuccess = (responseTrigger) => (
    {
        type: TRIGGER_DELETE_SUCCESS,
        payload: {
            responseTrigger,
        }
    });

export const triggerDeleteFail = (error) => (
    {
        type: TRIGGER_DELETE_FAIL,
        payload: {
            error
        }
    });

export const timeSeriesDeleteStart = () => (
    {
        type: TIME_SERIES_DELETE_START,
    });

export const timeSeriesDeleteSuccess = (responseTimeSeries) => (
    {
        type: TIME_SERIES_DELETE_SUCCESS,
        payload: {
            responseTimeSeries,
        }
    });

export const timeSeriesDeleteFail = (error) => (
    {
        type: TIME_SERIES_DELETE_FAIL,
        payload: {
            error
        }
    });

export const gaugeDeleteStart = () => (
    {
        type: GAUGE_DELETE_START,
    });

export const gaugeDeleteSuccess = (gaugeType, responseGauge) => (
    {
        type: GAUGE_DELETE_SUCCESS,
        payload: {
            responseGauge,
            gaugeType,
        }
    });

export const gaugeDeleteFail = (error) => (
    {
        type: GAUGE_DELETE_FAIL,
        payload: {
            error
        }
    });

export const triggerAddStart = () => (
    {
        type: TRIGGER_ADD_START,
    });

export const triggerAddSuccess = (responseTrigger) => (
    {
        type: TRIGGER_ADD_SUCCESS,
        payload: {
            responseTrigger,
        }
    });

export const triggerAddFail = (error) => (
    {
        type: TRIGGER_ADD_FAIL,
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

export const seeqAddStart = () => (
    {
        type: SEEQ_ADD_START,
    });

export const seeqAddSuccess = (responseSeeq) => (
    {
        type: SEEQ_ADD_SUCCESS,
        payload: {
            responseSeeq,
        }
    });

export const seeqAddFail = (error) => (
    {
        type: SEEQ_ADD_FAIL,
        payload: {
            error
        }
    });

export const seeqDeleteStart = () => (
    {
        type: SEEQ_DELETE_START,
    });

export const seeqDeleteSuccess = (responseSeeq) => (
    {
        type: SEEQ_DELETE_SUCCESS,
        payload: {
            responseSeeq,
        }
    });

export const seeqDeleteFail = (error) => (
    {
        type: SEEQ_DELETE_FAIL,
        payload: {
            error
        }
    });