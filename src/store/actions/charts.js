import {
    TIME_SERIES_CHANGE_SUCCESS,
    TIME_SERIES_ADD_SUCCESS,
    TIME_SERIES_DELETE_SUCCESS,
    CHARTS_POST_FAIL,
    CHARTS_POST_START
} from '../actionTypes/charts';

export const chartsPostStart = () => (
    {
        type: CHARTS_POST_START,
    });

export const chartsPostFail = (error) => (
    {
        type: CHARTS_POST_FAIL,
        payload: {
            error
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

export const timeSeriesDeleteSuccess = (responseTimeSeries) => (
    {
        type: TIME_SERIES_DELETE_SUCCESS,
        payload: {
            responseTimeSeries,
        }
    });

