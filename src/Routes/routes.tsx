import React, { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Tab Navigator/Home';
import { Favorites } from '../screens/Tab Navigator/Favorites';
import { History } from '../screens/Tab Navigator/History';
import { Settings } from '../screens/Tab Navigator/Settings';
import RNBootSplash from 'react-native-bootsplash';
import { TabBarIcon } from '../components/TabBarIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import { Animated, Pressable } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { resolvePreset } from '@babel/core';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export function AppRoutes() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();
    
    const progress = useRef(new Animated.Value(0)).current;

    const handleAnimation = () => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        RNBootSplash.hide({ fade: true });
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    height: RFValue(55),
                    borderRadius: 20,
                    paddingBottom: 10,
                    padding: 10,
                },
                headerShown: false,
                tabBarActiveTintColor: 'red',
                tabBarLabelStyle: { fontSize: RFValue(12) },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Pressable onPress={() => {navigation.navigate('Home'), handleAnimation()}}>
                                <LottieView
                                    style={{ height: 80, width: 80 }}
                                    source={require('../assets/icons/65033-home.json')}
                                    progress={progress}
                                />
                            </Pressable>
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
                                focused={focused}
                                name={'favorites'}
                            />
                        );
                    },
                    tabBarLabel: 'Favoritos',
                }}
            />
            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabBarIcon
                                focused={focused}
                                name={'history'}
                            />
                        );
                    },
                    tabBarLabel: 'Histórico',
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabBarIcon
                                focused={focused}
                                name={'profile'}
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
