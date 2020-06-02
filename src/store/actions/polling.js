import {
    FETCH_POLLING_START,
    FETCH_POLLING_FAIL,
    FETCH_POLLING_SUCCESS
} from '../actionTypes/polling';

export const fetchPollingStart = () => (
    {
        type: FETCH_POLLING_START,
    });

export const fetchPollingSuccess = (activeAlarms, systemsStatus) => (
    {

        type: FETCH_POLLING_SUCCESS,
        payload: {
            activeAlarms: activeAlarms,
            systemsStatus: systemsStatus
        }
    });

export const fetchPollingFail = (error) => (
    {
        type: FETCH_POLLING_FAIL,
        payload: {
            error
        }
    });