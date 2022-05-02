import React, { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Tab Navigator/Home';
import { Favorites } from '../screens/Tab Navigator/Favorites';
import { History } from '../screens/Tab Navigator/History';
import { Profile } from '../screens/Tab Navigator/Profile';
import RNBootSplash from 'react-native-bootsplash';
import { TabBarIcon } from '../components/TabBarIcons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import { Animated, Image, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeConsumer } from 'styled-components/native';
import theme from '../styles/theme';
import { RectButton } from 'react-native-gesture-handler';

export function AppRoutes() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();

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
                    paddingBottom: 10,
                    padding: 10,
                },
                headerShown: false,
                tabBarActiveTintColor: 'red',
                //tabBarShowLabel: false,
                tabBarLabelStyle: {
                    fontSize: RFValue(12),
                    fontFamily: 'Inter-Regular',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <RectButton>
                                <TabBarIcon
                                    name={'home'}
                                    focused={focused}
                                />
                            </RectButton>
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
                    tabBarBadge: 2,
                    tabBarLabel: 'Perfil',
                }}
            />
        </Tab.Navigator>
    );
}
