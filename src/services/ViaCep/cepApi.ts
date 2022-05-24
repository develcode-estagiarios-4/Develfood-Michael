import axios, { AxiosRequestConfig } from 'axios';
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

export function useCep(url: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<Data>({} as Data);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null | unknown>(null);

   
        async function handleCep() {
            try {
                setLoading(true);
                const response = await api.get(url, options);
                setData(response.data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }

    return { data, loading, error, handleCep };
}
