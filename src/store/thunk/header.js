import {fetchSystemNameApi} from 'api/header';
import {
    fetchSystemNameFail,
    fetchSystemNameStart,
    fetchSystemNameSuccess
} from '../actions/header';


export const fetchSystemName = () => (
    async (dispatch) => {
        dispatch(fetchSystemNameStart());
        try {
            const {systemInfo: {systemName}} = await fetchSystemNameApi();
            dispatch(fetchSystemNameSuccess(systemName));
        } catch (err) {
            dispatch(fetchSystemNameFail(err));
        }
    });