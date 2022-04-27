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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TelaA } from './src/screens/TelaA';
import { TelaB } from './src/screens/TelaB';

export default function App() {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Tela A" component={TelaA} />
                <Tab.Screen name="Tela B" component={TelaB} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
