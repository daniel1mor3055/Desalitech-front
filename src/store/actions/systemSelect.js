import * as actionTypes from '../actionTypes/systemSelect/systemSelect'
import axios from '../../app/routes/SystemSelect/axios-system-select'

export const fetchSystemsSuccess = (systems) =>{
    return {
        type: actionTypes.FETCH_SYSTEMS_SUCCESS,
        systems: systems
    }
}

export const fetchSystemsFail = (error) => {
    return {
        type: actionTypes.FETCH_SYSTEMS_FAIL,
        error: error
    }
}

export const fetchSystemsStart = () =>{
    return{
        type: actionTypes.FETCH_SYSTEMS_START
    }
}

export const fetchSystems = (getTokenSilently, getIdTokenClaims) => {
    return async (dispatch) => {
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
            console.log(response);
            const fetchedSystems = [];
            response.data.forEach((key) => {
                fetchedSystems.push({
                    ...response.data[key],
                    id: key
                })
            });
            dispatch(fetchSystemsSuccess(fetchedSystems))
        } catch (err) {
            dispatch(fetchSystemsFail(err))
        }
    }
};