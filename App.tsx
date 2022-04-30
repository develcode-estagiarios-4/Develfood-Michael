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
import { LogBox } from 'react-native';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function App() {

    return (
        <NavigationContainer>
            <StatusBar
                translucent
                backgroundColor="transparent"
            />
            <AppRoutes />
        </NavigationContainer>
    );
}
