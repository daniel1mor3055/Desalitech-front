import {
    FETCH_SYSTEMS_SUCCESS,
    FETCH_SYSTEMS_FAIL,
    FETCH_SYSTEMS_START,
} from '../actionTypes/systemsAndLiveAlarms';


export const fetchSystemsSuccess = (systems) => (
    {
        type: FETCH_SYSTEMS_SUCCESS,
        payload: {
            systems
        }
    });

export const fetchSystemsFail = (error) => (
    {
        type: FETCH_SYSTEMS_FAIL,
        payload: {
            error
        }
    });

export const fetchSystemsStart = () => (
    {
        type: FETCH_SYSTEMS_START
    });

