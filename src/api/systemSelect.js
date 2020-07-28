import axios from 'axios';
import { camelizeJson } from './utils';

export const fetchSystemsApi = async () => {
    try {
        const response = await axios.get('/');
        camelizeJson(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};