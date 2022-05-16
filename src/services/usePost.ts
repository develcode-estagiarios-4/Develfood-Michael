import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { MessageType, showMessage } from 'react-native-flash-message';

const api = axios.create({
    baseURL: 'https://develfood-3.herokuapp.com',
});

interface FlashMessageProps {
    onSuccess: {
        message: string;
        type: string;
        description?: string;
    };
    onError: {
        message: string;
        type: string;
        description?: string;
    };
}

export function usePost<T = unknown>(
    url: string,
    body: T,
    options?: AxiosRequestConfig
) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown | any>(null);

    async function handlePost(error: AxiosError) {
        try {
            setLoading(true);
            setError(error);
            const response = await api.post(url, body, options);
            setData(response.data);
            
        } catch (e) {
            
            setError(e);
            console.log(e);
            
        } finally {
            setLoading(false);
             error
                 ? showMessage({ message: error.message, type: 'danger' })
                 : showMessage({
                       message: 'Login realizado com sucesso!',
                       type: 'success',
                   });
        }
    }

    return { data, loading, error, handlePost };
}
