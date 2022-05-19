import { Login } from '@screens/StackNavigator/Login'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/auth'
import { AppRoutes } from './routes'
import RNBootSplash from 'react-native-bootsplash';

export function AuthRoutes() {

    useEffect(() => {
        RNBootSplash.hide({ fade: true });
     }, []);

    const { token } = useContext(AuthContext)

    return (
        <>
            {token ? <AppRoutes /> : <Login />}   
        </>
    )
}