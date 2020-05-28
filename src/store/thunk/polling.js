import {fetchPollingApi} from 'api/polling';
import {fetchPollingSuccess, fetchSPollingFail} from "../actions/polling";

export const fetchPolling = () => (
    async (dispatch) => {
        try {
            const {activeAlarms, systemsStatus} = await fetchPollingApi();
            dispatch(fetchPollingSuccess(activeAlarms, systemsStatus));
        } catch (err) {
            dispatch(fetchSPollingFail(err));
        }
    });