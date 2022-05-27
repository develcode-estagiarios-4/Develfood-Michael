import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws',
});

interface Data {
    localidade: string;
    logradouro: string;
    bairro: string;
    uf: string;
}

export function useCep<TResponse = unknown>(endpoint: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<Data>({} as Data);
    const [loading, setLoading] = useState(false);

    async function handleCep(onSuccess: (response: TResponse) => void) {
        try {
            setLoading(true);
            const response = await api.get(endpoint, options);
            setData(response.data);
            response.data && onSuccess && onSuccess(response.data);
        } catch (e: AxiosError<any, any> | any) {
            console.log(e?.response.data);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, handleCep };
}
