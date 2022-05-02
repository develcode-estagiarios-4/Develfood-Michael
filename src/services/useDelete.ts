import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'https://gorest.co.in',
});

export const useDelete = async (url: string, options: AxiosRequestConfig) => {
    try {
        const response = await api.delete(url, options);
        console.log(response.data);
        return { response };
    } catch (error) {
        console.log(Error, error);
    }
};
