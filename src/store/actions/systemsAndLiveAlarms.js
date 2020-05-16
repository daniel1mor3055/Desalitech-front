import {FETCH_SYSTEMS_SUCCESS, FETCH_SYSTEMS_FAIL, FETCH_SYSTEMS_START,UPON_SYSTEM_SELECTION} from '../actionTypes/systemsAndLiveAlarms';


export const uponSystemSelection = (selectedSystem) => {
    localStorage.setItem('selectedSystem', selectedSystem)
    return {
        type: UPON_SYSTEM_SELECTION,
        payload: {
            selectedSystem: selectedSystem
        }
    }
};

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

