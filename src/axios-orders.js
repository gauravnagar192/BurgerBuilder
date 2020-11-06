import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-myburger-c32d2.firebaseio.com/'
})

export default instance;