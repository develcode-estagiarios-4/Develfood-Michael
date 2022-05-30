import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { api } from './api';

export function useFetch<TResponse = unknown>(url: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState({} as TResponse);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError<any, any> | any>(null);

    
        async function fetchData() {
            try {
                setLoading(true);
                const { data } = await api.get(url, options);
                
                setData(data);
            } catch (e) {
                console.log(e)
                setError(e);
            } finally {
                setLoading(false);
            }
        }


    return { data, loading, error, fetchData };
}
