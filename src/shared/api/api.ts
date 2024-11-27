import axios from "axios";


// const baseUrl = __IS_DEV__ ? 'http://localhost:5000/api' : 'http://localhost:5000/api'


export const $api = axios.create({
    baseURL: __API__,
})