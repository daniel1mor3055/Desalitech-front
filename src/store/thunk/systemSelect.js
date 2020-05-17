import {fetchSystemsApi} from 'api/systemSelect';
import {fetchSystemsFail, fetchSystemsStart, fetchSystemsSuccess} from '../actions/systemSelect';


export const fetchSystems = () => (
    async (dispatch) => {
        dispatch(fetchSystemsStart());
        try {
            const response = await fetchSystemsApi();

            const fetchedSystems = [];
            response.data.systems.forEach((key) => {
                fetchedSystems.push({
                    ...response.data.systems[key],
                    id: key
                });
            });
            dispatch(fetchSystemsSuccess(fetchedSystems));
        } catch (err) {
            dispatch(fetchSystemsFail(err));
        }
    });