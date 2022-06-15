import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cadastro1 } from '@screens/StackNavigator/SignIn/Cadastro1';
import { Cadastro2 } from '@screens/StackNavigator/SignIn/Cadastro2';
import { Cadastro3 } from '@screens/StackNavigator/SignIn/Cadastro3';
import { Login } from '@screens/StackNavigator/SignIn/Login';
import { SignUpSuccess } from '@screens/StackNavigator/SignIn/SignUpSuccess';
import { StatusBar } from 'react-native';
// import { SignInSuccess } from '@screens/StackNavigator/SignInSuccess';

export function SignInRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator();

    useEffect(() => { 
        StatusBar.setBarStyle('dark-content', true);
    }, []);

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={'white'}
                //animated={true}
                //showHideTransition="slide"
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
