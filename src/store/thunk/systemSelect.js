import { fetchSystemsApi } from 'api/systemSelect';
import { fetchSystemsFail, fetchSystemsStart, fetchSystemsSuccess } from '../actions/systemsAndLiveAlarms';
import { setAdminStatus } from "../actions/header";

export const fetchSystems = () => (
    async (dispatch) => {
        dispatch(fetchSystemsStart());
        try {
            const { admin, systems } = await fetchSystemsApi();
            dispatch(setAdminStatus(admin));
            dispatch(fetchSystemsSuccess(systems));
        } catch (err) {
            dispatch(fetchSystemsFail(err));
        }
    });