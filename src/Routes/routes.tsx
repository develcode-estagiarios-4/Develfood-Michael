import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Tab Navigator/Home';
import { Favorites } from '../screens/Tab Navigator/Favorites';
import { History } from '../screens/Tab Navigator/History';
import { Settings } from '../screens/Tab Navigator/Settings';
import RNBootSplash from 'react-native-bootsplash';

export function AppRoutes() {
    const Tab = createBottomTabNavigator();
    
    useEffect(() => {
        RNBootSplash.hide({ fade: true });
    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen
                options={{ headerShown: false }}
                name="Home"
                component={Home}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Favorites"
                component={Favorites}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="History"
                component={History}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Settings"
                component={Settings}
            />
        </Tab.Navigator>
    );
}
