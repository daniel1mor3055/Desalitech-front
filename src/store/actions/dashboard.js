import {
    FETCH_DASHBOARD_START,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAIL,
    SET_DATES_FAIL,
    SET_DATES_START,
    SET_DATES_SUCCESS,
    CHOOSE_TAGS_FAIL,
    CHOOSE_TAGS_START,
    CHOOSE_TAGS_SUCCESS
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


export const setDatesStart = () => (
    {
        type: SET_DATES_START,
    });

export const setDatesSuccess = (responseTimeSeries) => (
    {
        type: SET_DATES_SUCCESS,
        payload: {
            responseTimeSeries,
        }
    });

export const setDatesFail = (error) => (
    {
        type: SET_DATES_FAIL,
        payload: {
            error
        }
    });

export const chooseTagsStart = () => (
    {
        type: CHOOSE_TAGS_START,
    });

export const chooseTagsSuccess = (responseTimeSeries) => (
    {
        type: CHOOSE_TAGS_SUCCESS,
        payload: {
            responseTimeSeries,
        }
    });

export const chooseTagsFail = (error) => (
    {
        type: CHOOSE_TAGS_FAIL,
        payload: {
            error
        }
    });