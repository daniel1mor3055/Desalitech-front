import {
    TIME_SERIES_CHANGE_FAIL,
    TIME_SERIES_CHANGE_START,
    TIME_SERIES_CHANGE_SUCCESS,
    TIME_SERIES_ADD_FAIL,
    TIME_SERIES_ADD_START,
    TIME_SERIES_ADD_SUCCESS,
    TIME_SERIES_DELETE_SUCCESS,
    TIME_SERIES_DELETE_START,
    TIME_SERIES_DELETE_FAIL
} from '../actionTypes/charts';

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