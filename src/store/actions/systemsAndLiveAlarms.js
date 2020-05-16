import * as actionTypes from '../actionTypes/systemsAndLiveAlarms/systemsAndLiveAlarms';
import axios from 'axios'
import {setAdminStatus} from "./admin";


export const uponSystemSelection = (selectedSystem) => {
    localStorage.setItem('selectedSystem', selectedSystem)
    return {
        type: actionTypes.UPON_SYSTEM_SELECTION,
        payload: {
            selectedSystem: selectedSystem
        }
    }
};


export const fetchSystemsSuccess = (systems) => ({
        type: actionTypes.FETCH_SYSTEMS_SUCCESS,
        payload: {systems: systems}
    }
)

export const fetchSystemsFail = (error) => (
    {
        type: actionTypes.FETCH_SYSTEMS_FAIL,
        payload: {error: error}
    }
)

export const fetchSystemsStart = () => ({
        type: actionTypes.FETCH_SYSTEMS_START
    }
)

export const fetchSystems = (getTokenSilently, getIdTokenClaims) => (
    async (dispatch) => {
        dispatch(fetchSystemsStart());
        try {
            const token = await getTokenSilently();
            const idtoken = await getIdTokenClaims();
            const response = await axios.get('https://desalistage.eastus2.cloudapp.azure.com/api/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    UserIdToken: `Id ${idtoken.__raw}`
                }
            });
            const { data } = response
            const { admin, systems} = data
            dispatch(setAdminStatus(admin))
            dispatch(fetchSystemsSuccess(systems));
        } catch (err) {
            dispatch(fetchSystemsFail(err));
        }
    }
)