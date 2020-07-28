import axios from 'axios';

import { STORE_TOKEN } from '../actionTypes/auth';

export const storeToken = (accessToken, idToken) => (
    {
        type: STORE_TOKEN,
        payload: {
            accessToken,
            idToken,
        }
    });

export const setToken = (accessToken, idToken) => (
    (dispatch) => {
        dispatch(storeToken(accessToken, idToken));

        axios.defaults.baseURL = "https://desalistage.eastus2.cloudapp.azure.com/api";
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        axios.defaults.headers.common['UserIdToken'] = `Id ${idToken.__raw}`;
    });


