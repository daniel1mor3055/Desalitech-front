import axios from 'axios';
import { camelizeJson, handleApiError } from './utils';

export const fetchSystemsApi = async () => {
    try {
        const response = await axios.get('/');
        camelizeJson(response.data);
        return response.data;
    } catch (err) {
        handleApiError(err);
    }
};