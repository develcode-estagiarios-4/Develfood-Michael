import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'https://gorest.co.in',
});

export const usePut = async (
    url: string,
    data?: AxiosRequestConfig,
    options?: AxiosRequestConfig
) => {
    try {
        const response = await api.put(url, data, options);
        console.log(response.data);
        return { response };
    } catch (error) {
        console.log(Error, error);
    }
};
