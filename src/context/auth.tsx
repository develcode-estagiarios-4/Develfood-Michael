import { usePost } from '@services/usePost';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { MessageType } from 'react-native-flash-message';

interface AuthContextData {
    logIn(email: string, password: string): void;
    token: string;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface LoginRequest { 
    email: string;
    password: string;
}

interface ResponseData {
    token: string;
}

interface RequestProps {
    endpoint: string;
    body: { email: string; password: string };
    error: { message: string; type: MessageType; description: string };
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState('');
    //const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState({} as RequestProps);

    const { data, loading, error, handlePost } = usePost<LoginRequest, ResponseData>(
        request.endpoint,
        request.body
    );

    useEffect(() => {
        !!request.body &&
            handlePost(
                request?.error.message,
                request?.error.type,
                request?.error.description
            );
    }, [request]);

    useEffect(() => {
        !!data && setToken(data.token); 
    }, [data]);

    function logIn(email: string, password: string) {
        setRequest({
            endpoint: '/auth',
            body: {
                email,
                password,
            },
            error: {
                message: 'Erro de autenticação',
                type: 'danger',
                description:
                    'Ops... Há algo de errado com seu email e/ou senha. Tente novamente.',
            },
        });
        
    }

    return (
        <AuthContext.Provider
            value={{
                logIn,
                token,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
