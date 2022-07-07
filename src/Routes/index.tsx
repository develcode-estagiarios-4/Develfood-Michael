import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Cadastro1 } from '@screens/StackNavigator/SignIn/Cadastro1';
import { Cadastro2 } from '@screens/StackNavigator/SignIn/Cadastro2';
import { Cadastro3 } from '@screens/StackNavigator/SignIn/Cadastro3';
import { Login } from '@screens/StackNavigator/SignIn/Login';
import { SignUpSuccess } from '@screens/StackNavigator/SignIn/SignUpSuccess';
import { StatusBar } from 'react-native';

export function SignInRoutes() {
    const { Navigator, Screen } = createStackNavigator();

    useEffect(() => { 
        StatusBar.setBackgroundColor('white');
        StatusBar.setBarStyle('dark-content');
    }, []);

    return (
        <>
            <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
            />
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
                <Screen
                    name="Cadastro2"
                    component={Cadastro3}
                />
                <Screen
                    name="SignUpSuccess"
                    component={SignUpSuccess}
                />
            </Navigator>
        </>
    );
}
