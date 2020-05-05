import * as actionTypes from '../actionTypes/systemSelect/systemSelect'

const initialState = {
    systems: [],
    fetching: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_SYSTEMS_START:
            return {
                ...state,
                fetching: true
            }
        case actionTypes.FETCH_SYSTEMS_SUCCESS:
            return {
                ...state,
                systems: action.systems,
                fetching: false
            }
        case actionTypes.FETCH_SYSTEMS_FAIL:
            return{
                ...state,
                fetching: false
            }
        default:
            return state
    }
}

export default reducer