import {fetchSystemsApi} from 'api/systemSelect';
import {fetchSystemsFail, fetchSystemsStart, fetchSystemsSuccess} from '../actions/systemsAndLiveAlarms';
import {setAdminStatus} from "../actions/admin";

export const fetchSystems = () => (
    async (dispatch) => {
        dispatch(fetchSystemsStart());
        try {
            const response = await fetchSystemsApi();
            const { data } = response
            const { admin, systems} = data
            dispatch(setAdminStatus(admin))
            dispatch(fetchSystemsSuccess(systems));
        } catch (err) {
            dispatch(fetchSystemsFail(err));
        }
    });