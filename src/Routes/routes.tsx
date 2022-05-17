import React, { useEffect, useRef, useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Tab Navigator/Home';
import { Favorites } from '../screens/Tab Navigator/Favorites';
import { History } from '../screens/Tab Navigator/History';
import { Profile } from '../screens/Tab Navigator/Profile';
import RNBootSplash from 'react-native-bootsplash';
import { TabBarIcon } from '../components/TabBarIcons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

export function AppRoutes() {
    const Tab = createBottomTabNavigator();

    useEffect(() => {
        RNBootSplash.hide({ fade: true });
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 15,
                    right: 15,
                    height: RFValue(55),
                    borderRadius: 20,
                    padding: 5,
                },
                headerShown: false,
                tabBarActiveTintColor: 'red',
                //tabBarShowLabel: false,
                tabBarLabelStyle: {
                    fontSize: RFValue(12),
                    fontFamily: 'Inter-Regular',
                },
                tabBarButton: (props) => (
                    <RectButton
                        {...props}
                        rippleRadius={50}
                        borderless
                        style={{ flex: 1, height: 50 }}
                    />
                ),
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabBarIcon
                                name={'home'}
                                focused={focused}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabBarIcon
                                name={'heart'}
                                focused={focused}
                            />
                        );
                    },
                    tabBarLabel: 'Favoritos',
                }}
            />
            <Tab.Screen
                name="Historic"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabBarIcon
                                name={'historic'}
                                focused={focused}
                            />
                        );
                    },
                    tabBarLabel: 'Histórico',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabBarIcon
                                name={'profile'}
                                focused={focused}
                            />
                        );
                    },
                    tabBarLabel: 'Perfil',
                }}
            />
        </Tab.Navigator>
    );
}
