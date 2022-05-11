import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/Routes/routes';
import { LogBox } from 'react-native';

import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import { Login } from '@screens/StackNavigator/Login';
import RNBootSplash from 'react-native-bootsplash';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function App() {

    RNBootSplash.hide({ fade: true });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <Login />
                </NavigationContainer>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
