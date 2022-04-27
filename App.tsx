import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/Routes/routes';

export default function App() {

    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    );
}
