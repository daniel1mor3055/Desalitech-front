import axios from 'axios';
import {camelizeArrayOfObjects, camelizeObjectKeys} from './utils';

export const fetchSystemsApi = async () => {
    try {
        const response = await axios.get('/');
        camelizeObjectKeys(response.data);
        camelizeArrayOfObjects(response.data.systems);
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
};
