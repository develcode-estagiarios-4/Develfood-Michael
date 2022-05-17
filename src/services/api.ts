import axios from "axios";


export const api = axios.create({
    baseURL: 'https://develfood-3.herokuapp.com',
});
