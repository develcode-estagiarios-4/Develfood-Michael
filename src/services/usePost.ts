import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import { MessageOptions, showMessage } from 'react-native-flash-message';
import { api } from './api';

export function usePost<T = unknown, TResponse = unknown>(
    endpoint: string,
    body: T,
    options?: AxiosRequestConfig
) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown | Error>(null);

    async function handlePost(
        message: MessageOptions['message'],
        type: MessageOptions['type'],
        description: MessageOptions['description']
    ) {
        try {
            setLoading(true);
            setError(null);
            console.log(body)
            const response = await api.post(endpoint, body, options);
            setData(response.data);
        } catch (e: any) {
            setError(e);
            console.log(e);
            showMessage({
                message,
                description,
                type,
            });
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, handlePost };
}
