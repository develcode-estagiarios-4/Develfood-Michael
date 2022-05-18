import { usePost } from '@services/usePost';
import React, { createContext, ReactChild, ReactNode, useState } from 'react';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({});

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState({})

    const { data, loading, error, handlePost } = usePost('/auth', {
        email: 'exemplo@email.com', // exemplo@email.com
        password: '123456', // 123456
    });

    function logIn(email: string, password: string) {
        setUser({
            email: email,
            password: password
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user: {name: 'Michael', email: 'michael.rar@outlook.com'},
                //loading,
                logIn,
                //token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
