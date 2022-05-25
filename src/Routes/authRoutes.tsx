import { Login } from '@screens/StackNavigator/Login'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/auth'
import { TabScreenRoutes } from './routes'
import RNBootSplash from 'react-native-bootsplash';
import { StackScreenRoutes } from '.';

export function AuthRoutes() {

    useEffect(() => {
        RNBootSplash.hide({ fade: true });
     }, []);

    const { token } = useContext(AuthContext)

    return (
        <>
            {token ? <TabScreenRoutes /> : <StackScreenRoutes />}   
        </>
    )
}