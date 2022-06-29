import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import RNBootSplash from 'react-native-bootsplash';
import { SignInRoutes } from '.';
import { StackScreenRoutes } from './homeRoutes';

export function AuthRoutes() {
    useEffect(() => {
        RNBootSplash.hide({ fade: true });
    }, []);

    const { token } = useContext(AuthContext);

    return <>{token ? <StackScreenRoutes /> : <SignInRoutes />}</>;
}
