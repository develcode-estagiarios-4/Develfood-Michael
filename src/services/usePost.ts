import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

const api = axios.create({
    baseURL: 'https://develfood-3.herokuapp.com',
});

export function usePost<T = unknown>(
    url: string,
    body: T,
    options?: AxiosRequestConfig
) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null | unknown>(null);

    async function handlePost() {
        try {
            setLoading(true);
            const response = await api.post(url, body, options);
            setData(response.data);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, handlePost };
}
