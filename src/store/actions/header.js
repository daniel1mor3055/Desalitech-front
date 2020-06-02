import {
    SET_ADMIN_STATUS,
    FETCH_SYSTEM_NAME_FAIL,
    FETCH_SYSTEM_NAME_START,
    FETCH_SYSTEM_NAME_SUCCESS,
    SET_SYSTEM_NAME,
} from '../actionTypes/header';


export const setAdminStatus = (admin) => (
    {
        type: SET_ADMIN_STATUS,
        payload: {
            admin
        }
    }
);

export const fetchSystemNameStart = () => (
    {
        type: FETCH_SYSTEM_NAME_START,
    });

export const fetchSystemNameSuccess = (systemName) => (
    {
        type: FETCH_SYSTEM_NAME_SUCCESS,
        payload: {
            systemName,
        }
    });

export const fetchSystemNameFail = (error) => (
    {
        type: FETCH_SYSTEM_NAME_FAIL,
        payload: {
            error
        }
    });

export const setSystemName = (systemName) => (
    {
        type: SET_SYSTEM_NAME,
        payload: {
            systemName,
        }
    });