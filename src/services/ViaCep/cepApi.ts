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

export function useCep(url: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<Data>({} as Data);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

   
        async function handleCep() {
            try {
                setLoading(true);
                setError(null)
                const response = await api.get(url, options);
                setData(response.data);
            } catch (e: AxiosError<any, any> | any) {
                setError(e);
                console.log(e?.response.data)
            } finally {
                setLoading(false);
            }
        }

    return { data, loading, error, handleCep };
}
