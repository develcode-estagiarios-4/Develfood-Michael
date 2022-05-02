import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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

import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <StatusBar
                        translucent
                        backgroundColor="transparent"
                    />
                    <AppRoutes />
                </NavigationContainer>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
