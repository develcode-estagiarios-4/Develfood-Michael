import axios from 'axios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';
import { MessageOptions, showMessage } from 'react-native-flash-message';
import { api } from './api';

export function usePost<T = unknown, TResponse = unknown>(
    endpoint: string,
    body: T,
    options?: AxiosRequestConfig
) {
    const [data, setData] = useState({} as TResponse);
    const [loading, setLoading] = useState(false);

    async function handlePost(
        message: MessageOptions['message'],
        type: MessageOptions['type'],
        description: MessageOptions['description'],
        onSuccess?: (response: TResponse) => void
    ) {
        try {
            setLoading(true);
            const response = await api.post(endpoint, body, options);
            setData(response.data);
            console.log(response.data);
            response.data && onSuccess && onSuccess(response.data);
        } catch (error: AxiosError<any, any> | any) {
            if (axios.isCancel(error)) {
                return false;
            } else {
                error && console.log(error.response.data);
                showMessage({
                    message,
                    description,
                    type,
                });
            }
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, handlePost };
}
