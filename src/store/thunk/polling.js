import {fetchPollingApi} from 'api/polling';
import {fetchPollingSuccess, fetchPollingFail} from "../actions/polling";

export const fetchPolling = () => (
    async (dispatch) => {
        try {
            const {activeAlarms, systemsStatus} = await fetchPollingApi();
            dispatch(fetchPollingSuccess(activeAlarms, systemsStatus));
        } catch (err) {
            dispatch(fetchPollingFail(err));
        }
    });