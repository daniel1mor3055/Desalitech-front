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

export const fetchSystems = () => {
    return dispatch => {
        dispatch(fetchSystemsStart())
        axios.get('/systems.json').then(response => {
            console.log('TTTTT',response)
            const fetchedSystems = []
            for (let key in response.data) {
                fetchedSystems.push({
                    ...response.data[key],
                    id: key
                })

            }
            dispatch(fetchSystemsSuccess(fetchedSystems))
        }).catch(err => {
            dispatch(fetchSystemsFail(err))
        })
    }
}