import axios from 'axios';
import {camelizeArrayOfObjects, camelizeObjectKeys} from './utils';

export const fetchPollingApi = async () => {
    try {
        const response = await axios.get('/polling');
        console.log('POLL', response.data)
        camelizeObjectKeys(response.data);
        camelizeArrayOfObjects(response.data.activeAlarms);
        camelizeArrayOfObjects(response.data.systemsStatus);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};