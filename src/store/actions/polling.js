import {
    FETCH_POLLING_FAIL,
    FETCH_POLLING_SUCCESS
} from '../actionTypes/polling';

export const fetchPollingSuccess = (activeAlarms, systemsStatus) => (
    {

        type: FETCH_POLLING_SUCCESS,
        payload: {
            activeAlarms: activeAlarms,
            systemsStatus: systemsStatus
        }
    });

export const fetchSPollingFail = (error) => (
    {
        type: FETCH_POLLING_FAIL,
        payload: {
            error
        }
    });