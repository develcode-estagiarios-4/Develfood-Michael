import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'https://gorest.co.in',
});

export const usePost = async <T = unknown>(
    url: string,
    body: T,
    options: AxiosRequestConfig
) => {
    try {
        const response = await api.post(url, body, options);
        console.log(response.data);
        return { response };
    } catch (error) {
        console.log(error);
    }
};
