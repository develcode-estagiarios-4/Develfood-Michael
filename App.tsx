import React, { useEffect } from 'react';
import {
    GestureHandlerRootView,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Keyboard, LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import { Login } from '@screens/StackNavigator/SignIn/Login';
import RNBootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './src/context/auth';
import { AuthRoutes } from '@routes/authRoutes';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function App() {
    RNBootSplash.hide({ fade: true });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <AuthProvider>
                        <AuthRoutes />
                        <FlashMessage position="top" />
                    </AuthProvider>
                </NavigationContainer>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
