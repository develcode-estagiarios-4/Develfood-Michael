import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { api } from './api';

export function useFetch<TResponse = unknown>(
    url: string,
    options?: AxiosRequestConfig
) {
    const [data, setData] = useState<TResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError<any, any> | any>(null);

    async function fetchData(onSuccess?: (response: TResponse) => void) {
        try {
            setLoading(true);
            const response = await api.get(url, options);
            response.data && onSuccess && onSuccess(response.data);
            setData(response.data);
        } catch (e) {
            console.log(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, fetchData };
}
