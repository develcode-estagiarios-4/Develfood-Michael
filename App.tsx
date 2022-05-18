import React from 'react';
import {
    GestureHandlerRootView,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/Routes/routes';
import { Keyboard, LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import { Login } from '@screens/StackNavigator/Login';
import RNBootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './src/context/auth';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function App() {
    RNBootSplash.hide({ fade: true });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <AuthProvider>
                        <Login />
                        <FlashMessage position="top" />
                    </AuthProvider>
                </NavigationContainer>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
