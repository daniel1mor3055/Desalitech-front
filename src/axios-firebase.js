import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://desalitech-new.firebaseio.com/'
});

export default instance;