import React from 'react';
import {
    GestureHandlerRootView,
 
} from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import RNBootSplash from 'react-native-bootsplash';
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './src/context/auth';
import { AuthRoutes } from '@routes/authRoutes';
import { CartProvider } from './src/context/cart';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export default function App() {
    RNBootSplash.hide({ fade: true });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <AuthProvider>
                        <CartProvider>
                            <AuthRoutes />
                            <FlashMessage position="top" />
                        </CartProvider>
                    </AuthProvider>
                </NavigationContainer>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
