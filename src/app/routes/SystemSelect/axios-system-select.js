import axios from 'axios'

const systemSelectInstance = axios.create({
    baseURL: 'https://desalitech-demo.firebaseio.com'
})

export default systemSelectInstance