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

export function useFetch(url: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<Data>({} as Data);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await api.get(url, options);
                setData(data);
            } catch (erro) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { data, loading, error };
}
