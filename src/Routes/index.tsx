import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Cadastro1 } from '@screens/StackNavigator/Cadastro1';
import { Cadastro2 } from '@screens/StackNavigator/Cadastro2';
import { Login } from '@screens/StackNavigator/Login';
import React from 'react'

export function StackScreenRoutes() {

    const { Navigator, Screen } = createNativeStackNavigator();
    
    return (
        <Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Login"
                component={Login}
            />
            <Screen
                name="Cadastro"
                component={Cadastro1}
            />
            <Screen
                name="Cadastro1"
                component={Cadastro2}
            />
        </Navigator>
    );
}