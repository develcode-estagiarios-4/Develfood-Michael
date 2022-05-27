import { useNavigation } from '@react-navigation/native';
import { usePost } from '@services/usePost';
import { AxiosError, AxiosResponse } from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { MessageType, showMessage } from 'react-native-flash-message';

interface AuthContextData {
    logIn(email: string, password: string): void;
    signUp({
        email,
        password,
        firstName,
        lastName,
        cpf,
        phone,
        photo,
        street,
        number,
        neighborhood,
        city,
        zipcode,
        state,
        nickname,
    }: SignUpProps): void;
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

interface SignUpProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    cpf: string;
    phone: string;
    photo: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zipcode: string;
    state: string;
    nickname: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [request, setRequest] = useState({} as RequestProps);

    const { data, loading, handlePost } = usePost<LoginRequest, ResponseData>(
        request.endpoint,
        request.body
    );

    const navigation = useNavigation();

    function createUserSuccess(data: any) {
        data.password &&
            navigation.navigate('SignUpSuccess' as never) &&
            console.log('chamou a tela de sucesso');
    }

    useEffect(() => {
        !!request.body &&
            handlePost(
                request?.error.message,
                request?.error.type,
                request?.error.description,
                createUserSuccess
            );
    }, [request]);

    function signUp({
        email,
        password,
        firstName,
        lastName,
        cpf,
        phone,
        photo,
        street,
        number,
        neighborhood,
        city,
        zipcode,
        state,
        nickname,
    }: SignUpProps) {
        const signUpData = {
            email,
            password,
            creationDate: new Date(),
            role: {
                id: 2,
            },
            costumer: {
                firstName,
                lastName,
                cpf,
                phone,
                photo,
                address: [
                    {
                        street,
                        number,
                        neighborhood,
                        city,
                        zipCode: zipcode,
                        state,
                        nickname,
                    },
                ],
            },
        };

        setRequest({
            endpoint: '/user',
            body: signUpData,
            error: {
                message: 'Erro de autenticação',
                type: 'danger',
                description:
                    'Ops... Não foi possível concluir a sua solicitação. Tente novamente.',
            },
        });
    }

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
                signUp,
                token: data.token,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
